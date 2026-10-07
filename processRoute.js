import csvtojson from "csvtojson";
import fs from "fs";

// Provide the key via the environment, e.g. `GOOGLE_MAP_API=... npm run processRoute`. Never commit it.
const GOOGLE_MAP_API = process.env.GOOGLE_MAP_API
if (!GOOGLE_MAP_API) {
    console.error("Missing GOOGLE_MAP_API environment variable.")
    process.exit(1)
}

const route_stops = await csvtojson.csv().fromFile("data/route_stops.csv")

const regions = [...new Set(route_stops.map(rs => rs.region))]

const route = await Promise.all(regions.map(async (r, i) => {

    const stops_r = route_stops.filter(h => h.region == r)


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
                        "latitude": stops_r[0].lat,
                        "longitude": stops_r[0].lon
                    }
                },
                "via": false
            },
            "destination": {
                "location": {
                    "latLng": {
                        "latitude": stops_r.at(-1).lat,
                        "longitude": stops_r.at(-1).lon
                    }
                },
                "via": false
            },
            "intermediates": stops_r.slice(1, stops_r.length - 1).map(h => {
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
        console.log(route)
    }
    return {
        region: r,
        route: route.routes[0].polyline.encodedPolyline
    }
}));

await fs.writeFileSync('src/assets/route.json', JSON.stringify(route));