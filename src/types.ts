import { Transform } from "stream";
const fs = require("fs");
const https = require("https");
/**
 * @interface BaseEntry Contains attributes which all entries have
 */
interface BaseEntry {
    /**
     * Name of the category of the entry
     * @type {string}
     * @memberof BaseEntry
     * @readonly
     */
    readonly category: string
    /**
     * Common locations of entry
     * @type {string[]}
     * @memberof BaseEntry
     * @readonly
     */
    readonly common_locations: string[]
    /**
     * Description of entry
     * @type {string}
     * @memberof BaseEntry
     * @readonly
     */
    readonly description: string
    /**
     * ID of entry
     * @type {number}
     * @memberof BaseEntry
     * @readonly
     */
    readonly id: number
    /**
     * Name of entry
     * @type {string}
     * @memberof BaseEntry
     * @readonly
     */
    readonly name: string
    /**
     * Image of entry as a link, can be downloaded with `compendium.download_entry_image`
     * @type {string}
     * @memberof BaseEntry
     * @readonly
     */
    readonly image: string
}
/**
 * @interface CreatureEntry An entry of the "creatures" category
 * @extends BaseEntry
 */
export interface CreatureEntry extends BaseEntry {
    /**
     * Entry' drops when defeated, attribute only exists on entries of sub-category 'non_food'
     * @type {?string[]}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly drops?: string[]
    /**
     * Entry' hearts recovered when eaten, attribute only exists on entries of sub-category 'food'
     * @type {?number}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly hearts_recovered?: number
    /**
     * Entry' cooking effect when eaten after cooked
     * @type {?("extra hearts" | "stamina recovery" | "heat resistance" | "cold resistance" | "shock resistance" | "stealth up" | "attack up" | "defense up" | "flame guard" | "speed up" | "extra stamina")}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly cooking_effect?: "" |
        "extra hearts" |
        "stamina recovery" |
        "heat resistance" |
        "cold resistance" |
        "shock resistance" |
        "stealth up" |
        "attack up" |
        "defense up" |
        "flame guard" |
        "speed up" |
        "extra stamina"
}
/**
 * @interface EquipmentEntry An entry of the "equipment" category
 * @extends BaseEntry
 */
export interface EquipmentEntry extends BaseEntry {
    /**
     * Damage done of entry when attacked with
     * @type {number}
     * @memberof EquipmentEntry
     * @readonly
     */
    readonly attack: number
    /**
     * Defense points of entry
     * @type {number}
     * @memberof EquipmentEntry
     * @readonly
     */
    readonly defense: number
}
/**
 * @interface MaterialEntry An entry of "materials" category
 * @extends BaseEntry
 */
export interface MaterialEntry extends BaseEntry {
    /**
     * Hearts recovered of entery when eaten
     * @type {number}
     * @memberof MaterialEntry
     * @readonly
     */
    readonly hearts_recovered: number
}
/**
 * @interface MonsterEntry An entry of "monsters" category
 * @extends BaseEntry
 */
export interface MonsterEntry extends BaseEntry {
    /**
     * Entry's materials dropped when defeaten.
     * @type {string[]}
     * @memberof MonsterEntry
     * @readonly
     */
    readonly drops: string[]
}
/**
 * @interface TreasureEntry An entry of "treasure" category
 * @extends BaseEntry
 */
export interface TreasureEntry extends BaseEntry {
    /**
     * Entry's materials dropped when broken open.
     * @type {string[]}
     * @memberof TreasureEntry
     * @readonly
     */
    readonly drops: string[]
}
/**
 * @alias EntryType Represents the type of an entry
 */
export type EntryType = string | number
/**
 * @alias AnyEntry Represents an entry of any category
 */
export type AnyEntry = CreatureEntry | EquipmentEntry | MaterialEntry | MonsterEntry | TreasureEntry
/**
 * @alias AnyCategory Represents any category
 */
export type AnyCategory = AnyEntry[] | {food: CreatureEntry[], non_food: CreatureEntry[]}
/**
 * @interface EntryCallback Callback function for `compendium.get_entry`
 */
export interface EntryCallback {
    /**
     * @type {void}
     * @memberof EntryCallback
     */
    (
        /**
         * @param {AnyEntry} data API data
         */
        data: AnyEntry
    ): void
}
/**
 * @interface CategoryCallback Callback function for `compendium.get_category`
 */
export interface CategoryCallback {
    /**
     * @type {void}
     * @memberof CategoryCallback
     */
    (
        /**
         * @param {AnyCategory} data API data
         */
        data: AnyCategory
    ): void
}
/**
 * @interface AllCallback Callback function for `compendium.get_all`
 */
 export interface AllCallback {
     /**
      * @type {void}
      * @memberof AllCallback
      */
    (
        /**
         * @param {AnyCategory[]} data API data
         */
         data: {
            creatures: {food: AnyEntry[], non_food: AnyEntry[]},
            equipment: EquipmentEntry[],
            materials: MaterialEntry[],
            monsters: MonsterEntry[],
            treasure: TreasureEntry[]
        }
    ): void
}
/** 
 * Converts items of a category to their respective data types
 * @param category_data API response of category
 * @returns {AnyCategory}
 */
export function type_category(category_data: AnyCategory): AnyCategory {
    let res: any = []
    if (Object.keys(category_data).length===2) {
        res = category_data as {food: CreatureEntry[], non_food: CreatureEntry[]}
    } else {
        category_data = category_data as AnyEntry[]
        if (category_data[0].category === "equipment") {
            res = category_data as EquipmentEntry[]
        } else if (category_data[0].category === "materials") {
            res = category_data as MaterialEntry[]
        } else if (category_data[0].category === "monsters") {
            res = category_data as MonsterEntry[]
        } else if (category_data[0].category === "treasure") {
            res = category_data as TreasureEntry[]
        }
    }
    return res
}
/**
 * Callback for `compendium.entry_image.get_stream` @param callback
 */
export interface ImageGetStreamCallback {
    /**
     * @type {void}
     * @memberof ImageGetStreamCallback
     */
    (
        /**
         * @param {Transform} stream Image data
         */
        stream: Transform
    ): void
}
/**
 * Represents the image of an entry.
 * @param {compendium} compendium_instance Instance of `compendium`
 * @param {EntryType} entry ID or name of entry
 */
export class EntryImage {
    compendium_instance: any
    entry: EntryType
    constructor(compendium_instance: any, entry: EntryType) {
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
                    let strm = new Transform();
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
     * @param {EntryType} entry ID or name of entry
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
                    let strm = new Transform();
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