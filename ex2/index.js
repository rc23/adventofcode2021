import { get } from "https";
import config from "config";

const options = {
  hostname: "adventofcode.com",
  port: 443,
  path: "/2021/day/2/input",
  method: "GET",
  headers: {
    cookie: config.get("cookie"),
  },
};

const req = get(options, (res) => {
  res.on("data", (d) => {
    const data = d.toString("utf8").split("\n");

    let x = 0;
    let y = 0;

    // naive first approach 😅
    // const x = data.reduce((prev, curr) => {
    //   if (curr.includes("forward")) {
    //     return (prev += Number(curr.replace("forward ", "")));
    //   }

    //   return prev;
    // }, 0);

    // const y = data.reduce((prev, curr) => {
    //   if (curr.includes("down")) {
    //     return (prev += Number(curr.replace("down ", "")));
    //   }

    //   if (curr.includes("up")) {
    //     return (prev -= Number(curr.replace("up ", "")));
    //   }

    //   return prev;
    // }, 0);

    data.forEach((element) => {
      const [dir, val] = element.split(" ");
      const num = Number(val);

      switch (dir) {
        case "forward":
          x += num;
          break;
        case "up":
          y -= num;
          break;
        case "down":
          y += num;
          break;
        default:
          break;
      }
    });

    console.log("part 1 - pos :", x * y);

    x = 0;
    y = 0;
    let aim = 0;

    data.forEach((element) => {
      const [dir, val] = element.split(" ");
      const num = Number(val);

      switch (dir) {
        case "forward":
          x += num;
          y += aim * num;
          break;
        case "up":
          aim -= num;
          break;
        case "down":
          aim += num;
          break;
        default:
          break;
      }
    });

    console.log("part 2 - pos :", x * y);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
