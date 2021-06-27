import {
  Entity,
  PolylineGraphics,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  Viewer,
} from "resium";
import {
  Cartesian2,
  Cartesian3,
  ScreenSpaceEventType,
  KeyboardEventModifier,
} from "cesium";
import React, { useState } from "react";
import io from "socket.io-client";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  const [points, setPoints] = useState([]);

  const getLocationFromScreenXY = (x, y) => {
    const scene = viewer.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(
      new Cartesian2(x, y),
      ellipsoid
    );
    if (!cartesian) return;
    const { latitude, longitude, height } =
      ellipsoid.cartesianToCartographic(cartesian);
    return Cartesian3.fromRadians(longitude, latitude, height);
  };
  let viewer;

  const rightClicked = (e) => {
    const point = getLocationFromScreenXY(e.position.x, e.position.y);
    setPoints([...points, point]);
  };

  return (
    <div className="cesium-toolbar-button">
      <Toolbar savePoints={points} />
      <Viewer
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        ref={(e) => {
          viewer = e ? e.cesiumElement : null;
        }}
      >
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            action={rightClicked}
            type={ScreenSpaceEventType.RIGHT_CLICK}
          />
          <ScreenSpaceEvent
            action={() => setPoints([])}
            type={ScreenSpaceEventType.RIGHT_CLICK}
            modifier={KeyboardEventModifier.SHIFT}
          />
        </ScreenSpaceEventHandler>
        <Entity>
          <PolylineGraphics positions={points} />
        </Entity>
      </Viewer>
    </div>
  );
}

export default App;
