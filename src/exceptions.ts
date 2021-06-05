export class NoCategoryError extends Error {
    /*
    Raised when a given category does not exist in the compendium

    Parameters:
        * `targetCategory`: Non-existant input category that causes error.
            - type: string
    */

    constructor(targetCategory: string) {
        super("Category '" + String(targetCategory) + "' not found. Available categories are 'creatures', 'equipment', 'materials', 'monsters', or 'treasure'")
    }
}

export class NoEntryError extends Error {
    /*
    Raised when a given entry does not exist in the compendium

    Parameters:
        * `targetEntry`: Non-existant input entry that causes error.
            - type: string
    */

    constructor(targetEntry: string|number){
        if (typeof(targetEntry) == "number"){
            super("Entry with ID "+ String(targetEntry) + " not found.")
        } else if (typeof(targetEntry) == "string"){
            super("Entry with name '" + targetEntry + "' not found.")
        } else {
            super("Type '" + typeof(targetEntry) + "' not a valid entry type. Must be INT or STR")
        }
    }
}