import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// const mini_port = require("./Port")("usePort");
require("dotenv").config();

const Toolbar = (props) => {
  const [status, setStatus] = useState(false);
  const [long, setLong] = useState(false);

  function saveData() {
    console.log("this is the points", props.savePoints);
    socket.emit("savePath", props.savePoints);
  }

  // console.log("qqwqw", process.env.REACT_APP_PORT);
  const ENDPOINT = `https://resuim-maps.herokuapp.com/:${process.env.PORT}`;

  let socket = io(ENDPOINT);
  let TS = new Date().getTime();

  useEffect(() => {
    // console.log("qqwqw11111111", process.env.REACT_APP_PORT);

    socket.on("connect", () => {
      setStatus(true);
      TS = new Date().getTime();
      setLong(false);
    });
    socket.on("disconnect", () => {
      setStatus(false);
    });
    const interval = setInterval(() => {
      if (status) {
        TS = new Date().getTime();
      } else {
        if (new Date().getTime() - TS >= 2000) {
          setLong(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [status, long]);

  return long ? (
    <div>
      <h1 style={{ left: "870px", top: "0px", position: "fixed" }}>
        Disconnected
      </h1>
    </div>
  ) : (
    <div>
      <button
        style={{ left: "780px", top: "38px", position: "fixed" }}
        onClick={() => saveData()}
      >
        Save Path
      </button>
      <h1 style={{ left: "870px", top: "0px", position: "fixed" }}>
        Connected
      </h1>
    </div>
  );
};

export default Toolbar;
