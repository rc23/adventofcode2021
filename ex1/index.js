import { get } from "https";
import config from "config";

const options = {
  hostname: "adventofcode.com",
  port: 443,
  path: "/2021/day/1/input",
  method: "GET",
  headers: {
    cookie: config.get("cookie"),
  },
};

const req = get(options, (res) => {
  res.on("data", (d) => {
    const data = d.toString("utf8").split("\n").map(Number);

    const filterfn = (element, index, array) => {
      return element < array[index + 1];
    };

    const mapFn = (_element, index) =>
      data[index - 2] + data[index - 1] + data[index];

    let measurements = data.filter(filterfn).length;

    console.log("part 1 - measurements :", measurements);

    measurements = data.map(mapFn).filter(filterfn).length;

    console.log("part 2 - measurements :", measurements);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
