c = require('../dist')
assert = require('assert')
comp = new (c.compendium)(undefined, 'https://botw-compendium.herokuapp.com/api/v1') # v1

describe 'Configured URL API calls', ->
    it 'Should work', (done) ->
        comp.get_all done(), undefined, ->
            assert.fail