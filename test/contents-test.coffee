assert = require('assert')
c = require('../dist/src')

comp = new (c.compendium)

###*
# Tests `AnyEntry` for correct data
# @param {string} entryName
# @param {string} expectedCategory
# @param {string[]} expectedCommonLocations
# @param {string} expectedDescription 
# @param {number} expectedId 
# @param {string} expectedName
# @param {string} expectedImage
###
testBaseEntry = (entryName, expectedCategory, expectedCommonLocations, expectedDescription, expectedId, expectedName, expectedImage) ->
    it 'Should have expected category ('.concat(expectedCategory, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            console.log entryData.category
            console.log expectedCategory
            assert.strictEqual entryData.category, expectedCategory
            done()

    it 'Should have expected common locations ('.concat(expectedCommonLocations, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.deepStrictEqual entryData.common_locations, expectedCommonLocations
            done()

    it 'Should have expected description ('.concat(expectedDescription, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.description, expectedDescription
            done()

    it 'Should have expected ID ('.concat(expectedId, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.id, expectedId
            done()

    it 'Should have expected name ('.concat(expectedName, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.name, expectedName
            done()

    it 'Should have expected image ('.concat(expectedImage, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.image, expectedImage
            done()

###*
# Tests `CreatureEntry` for correct data
# @param {string} entryName
# @param {string[]} expectedDrops
# @param {number} expectedHeartsRecovered
# @param {string} expectedCookingEffect
###
testCreatureEntry = (entryName, expectedDrops, expectedHeartsRecovered, expectedCookingEffect) ->
    if expectedDrops
        it 'Should have expected drops ('.concat(expectedDrops, ')'), (done) ->
            comp.get_entry entryName, (entryData) ->
                assert.deepStrictEqual entryData.drops, expectedDrops
                done()
    if expectedHeartsRecovered
        it 'Should have expected hearts recovered ('.concat(expectedHeartsRecovered, ')'), (done) ->
            comp.get_entry entryName, (entryData) ->
                assert.strictEqual entryData.hearts_recovered, expectedHeartsRecovered
                done()
    if expectedCookingEffect
        it 'Should have expected cooking effect ('.concat(expectedCookingEffect, ')'), (done) ->
            comp.get_entry entryName, (entryData) ->
                assert.strictEqual entryData.cooking_effect, expectedCookingEffect
                done()

###*
# Tests `EquipmentEntry` for correct data
# @param {string} entryName
# @param {number} expectedAttack
# @param {number} expectedDefense
###
testEquipmentEntry = (entryName, expectedAttack, expectedDefense) ->
    it 'Should have expected attack ('.concat(expectedAttack, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.attack, expectedAttack
            done()

    it 'Should have expected defense ('.concat(expectedDefense, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.defense, expectedDefense
            done()

###*
# Tests `MaterialEntry` for correct data
# @param {string} entryName
# @param {number} expectedHeartsRecovered
###
testMaterialEntry = (entryName, expectedHeartsRecovered) ->
    it 'Should have expected hearts recovered ('.concat(expectedHeartsRecovered, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.strictEqual entryData.hearts_recovered, expectedHeartsRecovered
            done()

###*
# Tests `MonsterEntry` for correct data
# @param {string} entryName
# @param {number} expectedDrops
###
testMonsterEntry = (entryName, expectedDrops) ->
    it 'Should have expected drops ('.concat(expectedDrops, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.deepStrictEqual entryData.drops, expectedDrops
            done()

###*
# Tests `TreasureEntry` for correct data
# @param {string} entryName
# @param {string[]} expectedDrops
###
testTreasureEntry = (entryName, expectedDrops) ->
    it 'Should have expected drops ('.concat(expectedDrops, ')'), (done) ->
        comp.get_entry entryName, (entryData) ->
            assert.deepStrictEqual entryData.drops, expectedDrops
            done()

describe 'Entry', ->
    describe 'Creatures entry (horse)', ->
        testBaseEntry 'horse', 'creatures', [
            'Hyrule Field'
            'Faron Grasslands'
        ], 'These can most often be found on plains. Their usefulness as transportation has made them valuable since ancient times. That said, wild horses do tend to get spooked and run off when approached, so if you\'re looking to snag one, it\'s best to sneak up on it.', 1, 'horse', 'https://botw-compendium.herokuapp.com/api/v2/entry/horse/image'
        testCreatureEntry 'horse', [], 0

        describe 'Equipment entry (master sword)', ->
        testBaseEntry 'master sword', 'equipment', null, 'The legendary sword that seals the darkness. Its blade gleams with a sacred luster that can oppose the Calamity. Only a hero chosen by the sword itself can wield it.', 201, 'master sword', 'https://botw-compendium.herokuapp.com/api/v2/entry/master_sword/image'
        testEquipmentEntry 'master sword', 30, 0

    describe 'Material entry (apple)', ->
        testBaseEntry 'apple', 'materials', [
            'Hyrule Field'
            'East Necluda'
        ], 'A common fruit found on trees all around Hyrule. Eat it fresh, or cook it to increase its effect.', 165, 'apple', 'https://botw-compendium.herokuapp.com/api/v2/entry/apple/image'
        testMaterialEntry 'apple', 0.5

    describe 'Monster entry (chuchu)', ->
        testBaseEntry 'chuchu', 'monsters', [
            'Hyrule Field'
            'West Necluda'
        ], 'This low-level, gel-based monster can be found all over Hyrule. It tends to spring its attacks on unsuspecting prey from the ground or from trees. Its strength varies by size, and the type of jelly it drops varies depending on whether the Chuchu was heated up, cooled down, or shocked.', 84, 'chuchu', 'https://botw-compendium.herokuapp.com/api/v2/entry/chuchu/image'
        testMonsterEntry 'chuchu', [ 'chuchu jelly' ]

    describe 'Treasure entry (treasure chest)', ->
        testBaseEntry 'treasure chest', 'treasure', [ 'Greater Hyrule' ], 'Fortunes untold (potentially) await the lucky adventurer who finds one of these. Chests can often be found within shrines or at enemy camps, but there may be some crafty folks who think they\'re safer underground.', 386, 'treasure chest', 'https://botw-compendium.herokuapp.com/api/v2/entry/treasure_chest/image'
        testTreasureEntry 'treasure chest', [ 'treasures' ]