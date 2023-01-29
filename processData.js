import csvtojson from "csvtojson";
import fs from "fs";

const GOOGLE_MAP_API = "AIzaSyCaVWdIpSvq8BoF7PvEK4oY3LByPYTQ2Xs"

let regions = await csvtojson.csv().fromFile("data/regions.csv")
const highlights = await csvtojson.csv().fromFile("data/highlights.csv")

regions = regions.map(r => {
    r.highlights = highlights.filter(h => h.region == r.region)
    return r
})

const highlights_route = await Promise.all(regions.map(async (region) => {
    if (region.highlights.length > 0) {
        const h_latlon = region.highlights.map(h => h.lon + "," + h.lat);

        const waypoints = h_latlon.splice(1, h_latlon.length - 2).join("|")
        console.log(waypoints)

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${h_latlon[0]}&destination=${h_latlon.at(-1)}&waypoints=${waypoints}&key=${GOOGLE_MAP_API}`
        console.log(url)
        const response = await fetch(url);
        const route = await response.json()
        region.route = route.routes[0].overview_polyline.points
    }
    return region
}));

fs.writeFileSync('src/assets/regions.json', JSON.stringify(highlights_route));