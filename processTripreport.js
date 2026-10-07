import fs from "fs";

const tripreport = [
    {
        id: 112348,
        status: "past",
        region: "midwest"
    },
    {
        id: 112349,
        status: "past",
        region: "colorado",
    },
    {
        id: 112350,
        status: "past",
        region: "texas",
    },
    {
        id: 112351,
        status: "past",
        region: "arizona",
    },
    {
        id: 112352,
        status: "past",
        region: "california",
    },
    {
        id: 112353,
        status: "past",
        region: "cascadia",
    },
    {
        id: 112354,
        status: "past",
        region: "pothole",
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

// Keep only the fields used by the app to keep the bundle small.
const taxonListOutput = JSON.stringify(
    taxonList.map((t) => ({
        speciesCode: t.speciesCode,
        category: t.category,
        numIndividuals: t.numIndividuals,
        numMedia: t.numMedia,
    }))
);
fs.writeFileSync('src/assets/taxon-list.json', taxonListOutput);



const locations = tripreport.reduce((acc, trip) => {
    if (trip.status == "past") {
        const data = fs.readFileSync("data/tripreport/checklists-" + trip.id + ".json");
        acc = [...acc, ...JSON.parse(data)];
    }
    return acc
}, [])

// Keep only the fields used by the app to keep the bundle small.
const locationsData = JSON.stringify(
    locations.map((c) => ({
        locId: c.locId,
        subId: c.subId,
        numSpecies: c.numSpecies,
        obsDt: c.obsDt,
        obsTime: c.obsTime,
        loc: {
            name: c.loc.name,
            subnational2Name: c.loc.subnational2Name,
            lat: c.loc.lat,
            lng: c.loc.lng,
        },
    }))
);
fs.writeFileSync('src/assets/checklists.json', locationsData);
