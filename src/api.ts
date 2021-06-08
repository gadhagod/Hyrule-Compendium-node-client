import { NoEntryError, NoCategoryError } from "./exceptions";
import { AllCallback, CategoryCallback, CreatureEntry, EntryCallback, EquipmentEntry, MaterialEntry, MonsterEntry, TreasureEntry, type_category, ImageGetStreamCallback } from "./types"

const https = require("https");
import { Transform as Stream } from "stream";
const fs = require("fs");

/**
 * Base class for hyrule-compendium
 * @param {string} [url=https://botw-compendium.herokuapp.com/api/v2] Base URL for API
 * @param {number} [default_timeout=20000] Default milliseconds to wait for response for all API calling functions until error
 */
export class compendium {
    url: string
    default_timeout: number
    constructor(default_timeout=20000, url="https://botw-compendium.herokuapp.com/api/v2"){
        this.default_timeout=default_timeout
        this.url=url;
    }
    /**
     * Gets an entry
     * @param {string | number} entry The entry to be retrieved
     * @param {EntryCallback} callback Function to be executed with API data
     * @param {number} [timeout=this.default_timeout] Time to wait for response before executing @param `error_callback`
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     * @throws {NoEntryError} Entry must exist
     */
    get_entry(
        entry: string|number, 
        callback: EntryCallback, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw(err)}
    ) {
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
    /**
     * Gets all entries from a category
     * @param {"creatures" | "equipment" | "equipment" | "materials" | "monsters" | "treasure"} category Name of category
     * @param {CategoryCallback} callback Function to be executed with all entries in the category.
     * @param {number} [timeout=this.default_timeout] Time to wait for response before executing @param `error_callback`
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     */
    get_category(
        category: "creatures" | "equipment" | "equipment" | "materials" | "monsters" | "treasure", 
        callback: CategoryCallback, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) {
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
    /**
     * Gets all entries
     * @param {AllCallback} callback Function to be executed with all entries
     * @param {number} timeout Time to wait for response before executing @param `error_callback`
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     */
    get_all(
        callback: AllCallback, 
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ){
        let req = https.get(this.url, (resp: any) => {
            let data = "";
            resp.on("data", (chunk: string) => {
                data += chunk;
            });

            resp.on("end", () => {
                let allData = (JSON.parse(data)["data"])
                for (const categoryName in allData) {
                    allData[categoryName] = type_category(allData[categoryName])
                }
                callback(allData)
            })
        }).on("error", error_callback)
        req.setTimeout(timeout, req.destroy)
    }
    /**
     * Retrieves an entry image
     * @param {string | number} entry ID or name of entry
     */
    get_entry_image(entry: string | number) {
        return new (class {
            compendium_instance: compendium
            entry: string | number
            constructor(compendium_instance: compendium, entry: string | number) {
                this.compendium_instance = compendium_instance
                this.entry = entry
            }
            /**
             * Gets the `stream.Transform` object of image, useful for file uploads
             * @param {ImageGetStreamCallback} callback Function to be executed with image
             * @param {number} timeout Time to wait for response before executing @param error_callback
             * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
             */
            get_stream(
                callback: ImageGetStreamCallback,
                timeout: number=this.compendium_instance.default_timeout, 
                error_callback: Function=(err: any)=>{throw err}
            ) {
                this.compendium_instance.get_entry(this.entry, (data: any) => {
                    let req = https.get(data["image"], (resp: any) => {
                            let strm = new Stream();
                            resp.on("data", (chunk: string) => {
                                strm.push(chunk);
                            });
                
                            resp.on("end", () => {
                                callback(strm)
                            })
                    }).on("error", error_callback)
                    req.on("timeout", req.destroy)
                }, timeout, error_callback)
            }
            /**
             * Downloads the image of an entry
             * @param {string | number} entry ID or name of entry
             * @param {string} [output_file] File path of which image is to saved, default: "./[entry name].png"
             * @param {Function} [callback=(err)=>{throw err}] @param callback of https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
             * @param {number} timeout Time to wait for response before executing @param error_callback
             * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
             */
            download(
                output_file?: string, 
                callback: Function=()=>{},
                timeout: number=this.compendium_instance.default_timeout, 
                error_callback: Function=(err: any)=>{throw err}
            ) { 
                this.compendium_instance.get_entry(this.entry, (data: any) => {
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
        })(this, entry)
    }
    /**
     * Downloads the image of an entry
     * @deprecated Since v1.5.0. Use compendium.entry_image.download()
     * @param {string | number} entry ID or name of entry
     * @param {string} [output_file] File path of which image is to saved, default: "./[entry name].png"
     * @param {Function} [callback=(err: any)=>{throw err}] @param callback of https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
     * @param {number} timeout Time to wait for response before executing @param error_callback
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     */
    download_entry_image(
        entry: string|number, 
        output_file?: string, 
        callback: Function=()=>{},
        timeout: number=this.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) { 
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