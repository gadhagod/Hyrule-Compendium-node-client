import { expectType } from "ts-expect";
import compendium from "../dist";
import * as types from "../dist/types"

interface FoodSubCategory extends types.BaseEntry {
    hearts_recovered: number
    cooking_effect: types.entryCookingEffect
}

interface NonFoodSubCategory extends types.BaseEntry {
    drops: types.entryDrop[]
}

const comp = new compendium;

const testBaseEntry = (entry: types.BaseEntry) => {
    expectType<types.entryCategory>(entry.category);
    expectType<types.entryLocation[]>(entry.common_locations);
    expectType<string>(entry.description);
    expectType<types.entryId>(entry.id);
    expectType<types.entryImageUrl>(entry.image);
}

const testCreatureEntry = (entry: types.CreatureEntry, subCategory: "food" | "non_food") => {
    if(subCategory === "food") {
        entry = entry as FoodSubCategory;
        expectType<number>(entry.hearts_recovered as number);
        expectType<types.entryCookingEffect>(entry.cooking_effect as types.entryCookingEffect);
    } else {
        entry = entry as NonFoodSubCategory;
        expectType<types.entryDrop[]>(entry.drops as []);
    }
}

const testEquipmentEntry = (entry: types.EquipmentEntry) => {
    expectType<number>(entry.attack);
    expectType<number>(entry.defense);
}

const testMaterialEntry = (entry: types.MaterialEntry) => {
    expectType<number>(entry.hearts_recovered);
}

const testMonsterEntry = (entry: types.MonsterEntry) => {
    expectType<types.entryDrop[]>(entry.drops);
}

const testTreasureEntry = (entry: types.TreasureEntry) => {
    expectType<types.entryDrop[]>(entry.drops);
}

describe("Entry type checking", () => {
    it("Entries' values should have correct types", (done) => {
        comp.get_all((res) => {
            Object.keys(res).forEach(categoryKey => {
                if (categoryKey === "creatures") {
                    res[categoryKey].food.forEach((entry: types.CreatureEntry) => {
                        testBaseEntry(entry);
                        testCreatureEntry(entry, "food" as "food" | "non_food");
                    })
                    res[categoryKey].non_food.forEach((entry: types.CreatureEntry) => {
                        testBaseEntry(entry);
                        testCreatureEntry(entry, "food" as "food" | "non_food");
                    })
                } else if (categoryKey === "equipment") {
                    res[categoryKey].forEach((entry) => {
                        testBaseEntry(entry);
                        testEquipmentEntry(entry);
                    })
                } else if (categoryKey === "materials") {
                    res[categoryKey].forEach((entry) => {
                        testBaseEntry(entry);
                        testMaterialEntry(entry);
                    })
                } else if (categoryKey === "monsters") {
                    res[categoryKey].forEach((entry) => {
                        testBaseEntry(entry);
                        testMonsterEntry(entry);
                    })
                } else if (categoryKey === "treasure") {
                    res[categoryKey].forEach((entry) => {
                        testBaseEntry(entry);
                        testTreasureEntry(entry);
                    })
                }
            });
            done();
        })
    })
})