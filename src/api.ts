import { NoEntryError, NoCategoryError } from "./exceptions";
import { AnyEntry, CreatureEntry, EntryCallback, EquipmentEntry, MaterialEntry, MonsterEntry, TreasureEntry, type_category } from "./types"

const https = require("https");
const Stream = require("stream").Transform
const fs = require("fs");

export class compendium {
    /*
    Base class for hyrule-compendium.

    Parameters:
        * `url`: The base URL for the API.
            - default: "https://botw-compendium.herokuapp.com/api/v2"
            - type: string
        * `default_timeout`: Default milliseconds to wait for response for all API calling functions until executing `error_callback`.
    */

    url: string
    default_timeout: number
    constructor(default_timeout=10000, url="https://botw-compendium.herokuapp.com/api/v2"){
        this.default_timeout=default_timeout
        this.url=url;
    }

    get_entry(
        entry: string|number, 
        callback: EntryCallback, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw(err)}
    ) {
        /*
        Gets an entry from the compendium.
        Parameters:
            * `entry`: The entry to be retrieved.
                - type: string, int
            * `callback`: Function to be executed with metadata on the entry.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `error_callback`.
                - type: number
                - default: `this.default_timeout`
            * `error_callback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */

        let req = https.get(this.url + "/entry/" + String(entry), (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                let entry_data = JSON.parse(data)["data"];
                if (Object.keys(entry_data).length === 0){
                    throw new NoEntryError(entry)
                }
                if (entry_data.category === "monsters") {
                    callback(entry_data as MonsterEntry);
                } else if (entry_data.category === "equipment") {
                    callback(entry_data as EquipmentEntry)
                } else if (entry_data.category === "creatures") {
                    callback(entry_data as CreatureEntry)
                } else if (entry_data.category === "materials") {
                    callback(entry_data as MaterialEntry)
                } else if (entry_data.category === "treasure") {
                    callback(entry_data as TreasureEntry)
                } else {
                    throw new NoCategoryError(entry_data.category)
                }

            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy);
    }

    get_category(
        category: string, 
        callback: Function, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) {
        /*
        Gets all entries from a category in the compendium.

        Parameters:
            * `category`: The name of the category to be retrieved. Must be one of the compendium categories.
                - type: string
                - notes: must be in ["creatures", "equipment", "materials", "monsters", "treasure"]
            * `callback`: Function to be executed with all entries in the category.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `error_callback`.
                - type: number
                - default: `this.default_timeout`
            * `error_callback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        
        Notes: the response schema of `creatures` is different from the others, as it has two sub categories: food and non_food
        */

        if (!(
            ["creatures", "equipment", "materials", "monsters", "treasure"].includes(category)
        )){
            throw new NoCategoryError(category)
        }
        let req = https.get(this.url + "/category/" + String(category), (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                let categoryData = JSON.parse(data)["data"];
                if (Object.keys(categoryData).length===0){
                    throw new NoCategoryError(category)
                }
                callback(type_category(categoryData));
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy);
    }

    get_all(
        callback: Function, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ){
        /*
        Get all entries from the compendium.

        Parameters:
            * `callback`: Function to be executed with all items in the compendium with their metadata, nested in categories.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `error_callback`.
                - type: number
                - default: `this.default_timeout`
            * `error_callback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */

        let req = https.get(this.url, (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                let allData = (JSON.parse(data)["data"])
                console.log(typeof(allData))
                for (const categoryName in allData) {
                    allData[categoryName] = type_category(allData[categoryName])
                }
                callback(allData)
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy)
    }

    download_entry_image(
        entry: string|number, 
        output_file: string|null=null, 
        callback=function(){}, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) {
        /*
        Download the image of a compendium entry.

        Parameters:
            * `entry`: The ID or name of the entry of the image to be downloaded.
                - type: str, int
            * `output_file`: The output file's path.
                - type: str
                - default: entry's name with a ".png" extension with spaces replaced with underscores
            * `callback`: The function to executed with image binary
                type: function
                default: `function(){}` (empty function)
            * `timeout`: Milliseconds to wait for server response until executing `error_callback`.
                - type: number
                - default: `this.default_timeout`
            * `error_callback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */
        
        this.get_entry(entry, (data: any) => {
            let req = https.get(data["image"], (resp: any) => {
                    let strm = new Stream();
                    resp.on("data", (chunk: string) => {
                        strm.push(chunk);
                    });
        
                    resp.on("end", () => {
                        fs.writeFile(output_file ?? (data["name"]+".png").replace(" ", "_"), strm.read(), callback)
                    })
               }).on("error", error_callback)
            req.on("timeout", req.destroy)
        }, timeout, error_callback)
    }
}