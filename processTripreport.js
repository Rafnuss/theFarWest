import fs from "fs";

const tripreport = [
    {
        id: 51870,
        status: "past",
        region: "africa"
    },
    {
        id: 34758,
        status: "past",
        region: "africa-2"
    },
    {
        id: 86087,
        status: "live",
        region: "florida"
    },
    {
        id: 112348,
        status: "futur",
        region: "midwest"
    },
    {
        id: 112349,
        status: "future",
        retion: "colorado",
    },
    {
        id: 112350,
        status: "future",
        retion: "texas",
    },
    {
        id: 112351,
        status: "future",
        retion: "arizona",
    },
    {
        id: 112352,
        status: "future",
        retion: "california",
    },
    {
        id: 112353,
        status: "future",
        retion: "mountainwest",
    },
    {
        id: 112354,
        status: "future",
        retion: "cascadia",
    }
];

tripreport.map(trip => {
    console.log(trip)
    if (trip.status == "past") {
        console.log(`Reading ${trip.region}`);
        const data = fs.readFileSync("data/tripreport/taxon-list-" + trip.id + ".json");
        trip.taxons = JSON.parse(data);
        const data2 = fs.readFileSync("data/tripreport/locations-" + trip.id + ".json");
        trip.locations = JSON.parse(data2);
    }
    return trip
})


const outputData = JSON.stringify(tripreport);
fs.writeFileSync('src/assets/tripreport.json', outputData);
console.log(`Merged data`);