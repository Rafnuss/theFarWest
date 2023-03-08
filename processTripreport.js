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
        status: "future",
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

const taxonList = tripreport.reduce((acc2, trip) => {
    if (trip.status == "past") {
        const data = fs.readFileSync("data/tripreport/taxon-list-" + trip.id + ".json");
        const data2 = JSON.parse(data)
        acc2 = [...acc2, ...data2].reduce((acc, curr) => {
            const foundIndex = acc.findIndex((item) => item.speciesCode === curr.speciesCode);
            if (foundIndex !== -1) {
                acc[foundIndex].numIndividuals += curr.numIndividuals;
                acc[foundIndex].numChecklists += curr.numChecklists;
                acc[foundIndex].numPhotos += curr.numPhotos;
                acc[foundIndex].numAudio += curr.numAudio;
                acc[foundIndex].numVideo += curr.numVideo;
                acc[foundIndex].numMedia += curr.numMedia;
                acc[foundIndex].isLifer = acc[foundIndex].isLifer || curr.isLifer;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
    }
    return acc2;
}, []);

const taxonListOutput = JSON.stringify(taxonList);
fs.writeFileSync('src/assets/taxon-list.json', taxonListOutput);



const locations = tripreport.reduce((acc, trip) => {
    console.log(trip)
    if (trip.status == "past") {
        const data = fs.readFileSync("data/tripreport/checklists-" + trip.id + ".json");
        acc = [...acc, ...JSON.parse(data)];
    }
    return acc
}, [])

const locationsData = JSON.stringify(locations);
fs.writeFileSync('src/assets/checklists.json', locationsData);
