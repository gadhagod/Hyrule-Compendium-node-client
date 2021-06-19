c = require('../dist/src')

describe 'Default timeout', ->
    comp = new (c.compendium)(0.01 / 99) # arbitrary tiny number
    describe 'Get entry', ->
        it 'should timeout', (done) ->
            comp.get_entry 1, (->
            ), undefined, ->
                done()

    describe 'Get category', ->
        it 'should timeout', (done) ->
            comp.get_category 'creatures', (->
            ), undefined, ->
                done()

    describe 'Get all', ->
        it 'should timeout', (done) ->
            comp.get_all (->
            ), undefined, ->
                done()

describe 'Function timeouts', ->
    comp = new (c.compendium)(100 * 100 * 100) # arbitrary big number
    describe 'Get entry', ->
        it 'should timeout', (done) ->
            comp.get_entry 1, (->
            ), 100 / 100 / 100, ->
                done()

    describe 'Get category', ->
        it 'should timeout', (done) ->
            comp.get_category 'creatures', (->
            ), 100 / 100 / 100, ->
                done()

    describe 'Get all', ->
        it 'should timeout', (done) ->
            comp.get_all (->
            ), 100 / 100 / 100, ->
                done()