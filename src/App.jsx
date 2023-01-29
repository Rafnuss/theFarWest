import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g";
import region_geojson from "./assets/region.json";

const layerStyle = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#007cbf",
    "fill-opacity": 0.8,
  },
};

function App() {
  return (
    <Container fluid className="vh-100 px-0">
      <Row className="vh-100 gx-0">
        <Col>
          <Map
            initialViewState={{
              longitude: 0,
              latitude: 0,
              zoom: 5,
            }}
            id="map"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            projection="globe"
            fog={{}}
            attributionControl={false}
          >
            <NavigationControl />
            <Source type="geojson" data={region_geojson}>
              <Layer {...layerStyle} />
            </Source>
          </Map>
        </Col>
        <Col xs={12} lg={6} xl={4}>
          left menu
        </Col>
      </Row>
    </Container>
  );
}

export default App;
