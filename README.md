# Far West

## 1. Aims & Objective

### Temporal

- **Past** the app should be still useful in the futur when we want to show it to our friends/kids or for ourself. Make sure the data pipeline will not be broken (e.g. google photo? ). Maybe making modification after the end?
- **Present** During the trip, the app should run mostly on its own with little time on our side.
- **Future** The app should be joyful and motivational for the trip. With live information and also info looking forward.

### Audience

- **Us** the app should contain some key information summuarsing the trip:
  - trajectory where we went (can we do better than google location?),
  - bird target/list/total (can we do better than tripreport?),
  - photos (can we do better than google phot?)
  - some story to rememeber.
- **family/friend**: what would be intresting for our family?
  - light info load
  - photo + story always nicer
  - little bird oriented?
  - live position/info could be motivating?
  - hide secret/game?
- **Open** Do we want it accessible to anyone? Password?

The only way we can make this app better than a combinaison of the other is to merge them together: story (text) + photo + birds + trajectory/planning.

## 2. Data pipeline

### Birds

- Barchart: global/regional/hotspot level: prepare in advence. as csv or json
- Target list per region/hotspot: prepare in advence. as csv or json

- Tripreport (live info through API) region+global if combined.
  - species lists: lifer, species count, photos counts etc...
  - checklist list: date?

### Maps

- map background, states boundary
- planned trajectory (geojson)
- live position?
- past trajectory (google location?, ebird checklist?)

### Tourisme/NP

- Google map link/wiki link to where we want to go? photo of places?

### Photos

- Google photo API : photo + description but not location!

### Story

How to write easily stories

## 3. Structure

### Global view/Home view

Main map

- subregion polygone? states?
- current position marker? circle? red/blinking, last update?
- past trajectory in a different color than futur?
- maybe some hotspot but noe clicable

|     | **Region**          | Date         | States            | Target (lifer)    |
| --- | ------------------- | ------------ | ----------------- | ----------------- |
| 1   | Midwest             | 1--7 April   | OH,MI,ID,IL,MI,KS | 4(3)              |
| 2   | Colorado            | 8--15 April  | CO                | 13(8)             |
| 3   | Texas               | 16--31 April | TX                | 39(39)            |
| 4   | Arizona             | 1--11 May    | AZ                | 46(44)            |
| 5   | California          | 12--23 May   | CA                | 60(46)            |
| 5.1 | Southern California | 12--18 May   | CA                |                   |
| 5.2 | Northern California | 19--21 May   | CA                |                   |
| 5.3 | Sierra Nevada       | 22--23 May   | CA                |                   |
| 6   | Mountain West       | 24--31 May   | NV,UT,ID,MO       | 13(9)             |
| 7   | Cascadia            | June         | WA,CA             | 3(3) not complete |

Some global stat:

- number of lifer + current life list?
- kilometer?
- date/duration
- ???

Photos ?
latest story ?

### Regional view

## 4. Tools

Vitejs + Vue + Leaflet or Mapbox?
