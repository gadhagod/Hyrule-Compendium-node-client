import { NoEntryError, NoCategoryError } from "./exceptions";

const https = require("https");
const Stream = require("stream").Transform
const fs = require("fs");

export class HyruleCompendium {
    /*
    Base class for hyrule-compendium.

    Parameters:
        * `url`: The base URL for the API.
            - default: "https://botw-compendium.herokuapp.com/api/v2"
            - type: string
        * `defaultTimeout`: Default milliseconds to wait for response for all API calling functions until executing `errorCallback`.
    */

    url: string
    defaultTimeout: number
    constructor(defaultTimeout=10000, url="https://botw-compendium.herokuapp.com/api/v2"){
        this.defaultTimeout=defaultTimeout
        this.url=url;
    }

    getEntry(entry: string|number, callback: Function, timeout: number=this.defaultTimeout, errorCallback: Function=function(err: any){throw err}){
        /*
        Gets an entry from the compendium.
        Parameters:
            * `entry`: The entry to be retrieved.
                - type: string, int
            * `callback`: Function to be executed with metadata on the entry.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `errorCallback`.
                - type: number
                - default: `this.defaultTimeout`
            * `errorCallback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */

        let req = https.get(this.url + "/entry/" + String(entry), (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                data = JSON.parse(data)["data"];
                if (Object.keys(data).length===0){
                    throw new NoEntryError(entry)
                }
                callback(data);
            })
        }).on("error", errorCallback)
        req.setTimeout(timeout, req.destroy);
    }

    getCategory(category: string, callback: Function, timeout: number=this.defaultTimeout, errorCallback: Function=function(err: any){throw err}){
        /*
        Gets all entries from a category in the compendium.

        Parameters:
            * `category`: The name of the category to be retrieved. Must be one of the compendium categories.
                - type: string
                - notes: must be in ["creatures", "equipment", "materials", "monsters", "treasure"]
            * `callback`: Function to be executed with all entries in the category.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `errorCallback`.
                - type: number
                - default: `this.defaultTimeout`
            * `errorCallback`: Function to be executed on request errors.
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
                data = JSON.parse(data)["data"];
                if (Object.keys(data).length===0){
                    throw new NoCategoryError(category)
                }
                callback(data);
            })
        }).on("error", errorCallback)
        req.setTimeout(timeout, req.destroy);
    }

    getAll(callback: Function, timeout: number=this.defaultTimeout, errorCallback: Function=function(err: any){throw err}){
        /*
        Get all entries from the compendium.

        Parameters:
            * `callback`: Function to be executed with all items in the compendium with their metadata, nested in categories.
                - type: function
            * `timeout`: Milliseconds to wait for response until executing `errorCallback`.
                - type: number
                - default: `this.defaultTimeout`
            * `errorCallback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */

        let req = https.get(this.url, (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                data=JSON.parse(data)["data"];
                callback(data)
            })
        }).on("error", errorCallback)
        req.setTimeout(timeout, req.destroy);
    }

    downloadEntryImage(entry: string|number, outputFile: string|null=null, callback=function(){}, timeout: number=this.defaultTimeout, errorCallback: Function=function(err: any){throw err}){
        /*
        Download the image of a compendium entry.

        Parameters:
            * `entry`: The ID or name of the entry of the image to be downloaded.
                - type: str, int
            * `outputFile`: The output file's path.
                - type: str
                - default: entry's name with a ".png" extension with spaces replaced with underscores
            * `callback`: The function to executed with image binary
                type: function
                default: `function(){}` (empty function)
            * `timeout`: Milliseconds to wait for server response until executing `errorCallback`.
                - type: number
                - default: `this.defaultTimeout`
            * `errorCallback`: Function to be executed on request errors.
                - type: function
                - default: Throws error
        */
        
        this.getEntry(entry, function(data: any) {
            let req = https.get(data["image"], (resp: any) => {
                    let strm = new Stream();
                    resp.on("data", (chunk: string) => {
                        strm.push(chunk);
                    });
        
                    resp.on("end", () => {
                        fs.writeFile(outputFile ?? (data["name"]+".png").replace(" ", "_"), strm.read(), callback)
                    })
               }).on("error", errorCallback)
            req.on("timeout", req.destroy)
        }, timeout, errorCallback)
    }
}

export { NoCategoryError, NoEntryError }