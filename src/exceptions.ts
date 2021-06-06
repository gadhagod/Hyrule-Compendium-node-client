export class NoCategoryError extends Error {
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

export class NoEntryError extends Error {
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