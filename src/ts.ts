import {compendium} from "./api"
let comp = new compendium()

describe("things", ()=>{
    it("should yoit", (done) => {
        comp.get_entry(1, ()=>{}, 100/100/100, ()=>{done()})
    })
})