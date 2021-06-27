require("dotenv").config();

const usePort = () => {
  if (process.env.REACT_APP_PORT === undefined) {
    process.env.REACT_APP_PORT = Math.floor(Math.random() * 1000) + 1;
  }
  // const port =
  //   process.env.REACT_APP_PORT || Math.floor(Math.random() * 1000) + 1;
  // const port = 8000;
  // console.log("jojo", port);
  console.log("jojo", process.env.REACT_APP_PORT);
};

console.log("jojo2", process.env.REACT_APP_PORT);

exports.usePort = usePort;
