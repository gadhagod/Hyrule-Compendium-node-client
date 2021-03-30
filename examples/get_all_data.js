const hyrule_compendium = require("hyrule-compendium")

let comp = new hyrule_compendium.compendium

comp.get_all(function(data){
    console.log(data)
})