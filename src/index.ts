const https = require("https");
const Stream = require("stream").Transform
const fs = require("fs");

class NoCategoryError extends Error {
    /*
    Raised when a given category does not exist in the compendium

    Parameters:
        * `target_category`: Non-existant input category that causes error.
            - type: string
    */

    constructor(target_category: string) {
        super("Category '" + String(target_category) + "' not found. Available categories are 'creatures', 'equipment', 'materials', 'monsters', or 'treasure'")
    }
}

class NoEntryError extends Error {
    /*
    Raised when a given entry does not exist in the compendium

    Parameters:
        * `target_entry`: Non-existant input entry that causes error.
            - type: string
    */

    constructor(target_entry: string|number){
        if (typeof(target_entry) == "number"){
            super("Entry with ID "+ String(target_entry) + " not found.")
        } else if (typeof(target_entry) == "string"){
            super("Entry with name '" + target_entry + "' not found.")
        } else {
            super("Type '" + typeof(target_entry) + "' not a valid entry type. Must be INT or STR")
        }
    }
}

class compendium {
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

    get_entry(entry: string|number, callback: Function, timeout: number=this.default_timeout, error_callback: Function=function(err: any){throw err}){
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
                data = JSON.parse(data)["data"];
                if (Object.keys(data).length===0){
                    throw new NoEntryError(entry)
                }
                callback(data);
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy);
    }

    get_category(category: string, callback: Function, timeout: number=this.default_timeout, error_callback: Function=function(err: any){throw err}){
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
                data = JSON.parse(data)["data"];
                if (Object.keys(data).length===0){
                    throw new NoCategoryError(category)
                }
                callback(data);
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy);
    }

    get_all(callback: Function, timeout: number=this.default_timeout, error_callback: Function=function(err: any){throw err}){
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
                data=JSON.parse(data)["data"];
                callback(data)
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy);
    }

    download_entry_image(entry: string|number, output_file: string|null=null, callback=function(){}, timeout: number=this.default_timeout, error_callback: Function=function(err: any){throw err}){
        /*
        Download the image of a compendium entry.

        Parameters:
            * `entry`: The ID or name of the entry of the image to be downloaded.
                - type: str, int
            * `output_file`: The output file's path.
                - type: str
                - default: entry's name with a ".png" extension
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
        
        this.get_entry(entry, function(data: any) {
            let req = https.get(data["image"], (resp: any) => {
                    let strm = new Stream();
                    resp.on("data", (chunk: string) => {
                        strm.push(chunk);
                    });
        
                    resp.on("end", () => {
                        fs.writeFile(output_file ?? data["name"]+".png", strm.read(), callback)
                    })
               }).on("error", error_callback)
            req.on("timeout", req.destroy)
        }, timeout, error_callback)
    }
}

exports.NoEntryError = NoEntryError
exports.NoCategoryError = NoCategoryError
exports.compendium = compendium