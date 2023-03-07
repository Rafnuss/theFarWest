import csvtojson from "csvtojson";
import fs from "fs";

const GOOGLE_MAP_API = "AIzaSyCaVWdIpSvq8BoF7PvEK4oY3LByPYTQ2Xs"

let regions = await csvtojson.csv().fromFile("data/regions/regions.csv")
const highlights = await csvtojson.csv().fromFile("data/regions/highlights.csv")


const highlights_route = await Promise.all(regions.map(async (r, i) => {

    r.highlights = highlights.filter(h => h.region == r.region)

    if (r.highlights.length > 0) {

        //const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${h_latlon[0]}&destination=${h_latlon.at(-1)}&waypoints=${waypoints}&key=${GOOGLE_MAP_API}`
        //console.log(url)
        //await new Promise(resolve => setTimeout(resolve, i * 1000));
        //console.log(i * 1000)
        const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
            method: "POST",
            headers: {
                'X-Goog-Api-Key': GOOGLE_MAP_API,
                'X-Goog-FieldMask': 'routes.polyline.encodedPolyline'
            },
            body: JSON.stringify({
                "origin": {
                    "location": {
                        "latLng": {
                            "latitude": r.highlights[0].lat,
                            "longitude": r.highlights[0].lon
                        }
                    },
                    "via": false
                },
                "destination": {
                    "location": {
                        "latLng": {
                            "latitude": r.highlights.at(-1).lat,
                            "longitude": r.highlights.at(-1).lon
                        }
                    },
                    "via": false
                },
                "intermediates": r.highlights.slice(1, r.highlights.length - 1).map(h => {
                    return {
                        "location": {
                            "latLng": {
                                "latitude": h.lat,
                                "longitude": h.lon
                            }
                        },
                        "via": false
                    }
                })
            })
        })


        const route = await response.json()
        if (!route.routes) {
            //console.log(r.highlights)
        }
        r.route = route.routes[0].polyline.encodedPolyline
    }
    return r
}));

await fs.writeFileSync('src/assets/regions.json', JSON.stringify(highlights_route));