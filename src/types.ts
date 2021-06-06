interface BaseEntry {
    category: string
    common_locations: string[]
    description: string
    id: number
    name: string
    image: string
}

export interface CreatureEntry extends BaseEntry {
    drops?: string
    hearts_recovered?: number
    cooking_effect?: string
}

export interface EquipmentEntry extends BaseEntry {
    attack: number
    defense: number
}

export interface MaterialEntry extends BaseEntry {
    hearts_recovered: number
}

export interface MonsterEntry extends BaseEntry {
    drops: string[]
}

export interface TreasureEntry extends BaseEntry {
    drops: string[]
}

export type AnyEntry = CreatureEntry | EquipmentEntry | MaterialEntry | MonsterEntry | TreasureEntry

export interface EntryCallback {
    (data: AnyEntry): void
}

export function type_category(category_data: {food: CreatureEntry[], non_food: CreatureEntry[]} | AnyEntry[]): AnyEntry {
    console.log(Object.keys(category_data as any))
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