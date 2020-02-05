import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="https://raw.githubusercontent.com/nst-guide/osm-liberty-topo/gh-pages/style.json"
    />
  );
}

export class ClassMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'hello world'}
  }

  render() {
    return (
      <p>{this.state.test}</p>
    )
  }
}

export default Map
