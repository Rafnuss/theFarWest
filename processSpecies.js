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

await fs.writeFileSync('src/assets/species_list.json', JSON.stringify(sp_region));