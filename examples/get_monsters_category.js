const hyrule_compendium = require("hyrule-compendium")

let comp = new hyrule_compendium.compendium

comp.get_category("monsters", function(data){
    console.log(data)
})