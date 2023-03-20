import csvtojson from "csvtojson";
import fs from "fs";

const sp = await csvtojson.csv().fromFile("data/species_list.csv")
// copy from app.vue
const regions = [
    {
        region: "midwest",
        states: ["MI", "IN", "KS"],
    },
    {
        region: "colorado",
        states: ["CO4"],
    },
    {
        region: "texas",
        states: ["TX"],
    },
    {
        region: "arizona",
        states: ["AZ"],
    },
    {
        region: "california",
        states: ["CA"],
    },
    {
        region: "mountainwest",
        states: ["UT", "NV", "ID", "ND", "MT"],
    },
    {
        region: "cascadia",
        states: ["WA"],
    },
];

/*
const sp_region = regions.map(r => {
    const spr = sp.filter(s => s.region.includes(r.region))
    return {
        region: r.region,
        species: spr.map(s => {
            return {
                common_name: s.common_name,
                species_code: s.species_code,
                world_lifer: s.world_lifer == "1",
                US_lifer: s.US_lifer == "1",
                exotic: s.exotic,
                target: s.target == "1",
                prob: Math.max.apply(null, r.states.map(st => Number(s["freq_" + st].replace('%', ''))))
            }
        })
    }
})
*/

//const a = sp.map(s => s.region.replace(" ", "").split(',')).flat(1)
//console.log([...new Set(a)])

const sp_region = sp.sort((a, b) => a.taxon_sort - b.taxon_sort).map(s => {
    let so = {
        common_name: s.common_name,
        species_code: s.species_code,
        aba: Number(s.aba ? s.aba : 0),
        world_lifer: s.world_lifer == "1",
        US_lifer: s.US_lifer == "1",
        media_lifer: s.media_lifer == "1",
        exotic: s.exotic,
        target: s.target == "1" | s.target == "",
        region: s.region
    }
    so.prob = regions.map(r => {
        let prob = Number(s[r.region].replace('%', ''))
        //Math.max.apply(null, r.states.map(st => Number(s["freq_" + st].replace('%', ''))))
        prob = prob == undefined ? 0 : prob
        return prob
    })
    return so
})

await fs.writeFileSync('src/assets/species_list.json', JSON.stringify(sp_region));