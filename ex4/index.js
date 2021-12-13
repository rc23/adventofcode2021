import { get } from "https";
import config from "config";

const options = {
  hostname: "adventofcode.com",
  port: 443,
  path: "/2021/day/4/input",
  method: "GET",
  headers: {
    cookie: config.get("cookie"),
  },
};

const req = get(options, (res) => {
  res.on("data", (d) => {
    const data = d.toString("utf8").split("\n");

    const [numbers, ...cards] = data;

    const draws = numbers.split(",");

    let cardsArr = [];

    for (let index = 1; index < cards.length; index += 6) {
      cardsArr.push(cards.slice(index, index + 5));
    }

    let markedCards = cardsArr.map((card) =>
      card.map((line) => line.split(" ").filter((e) => e))
    );

    let bingo = false;
    let draw = -1;

    const checkBingo = (arr) => arr.filter((val) => val === "x").length === 5;

    do {
      draw = draws.shift();

      markedCards = markedCards.map((card, h) => {
        const rows = card.map((row, i) => {
          const columns = row.map((col, j) => {
            if (col === draw) {
              col = "x";
            }

            return col;
          });

          if (checkBingo(columns)) {
            bingo = h;
          }

          return columns;
        });

        if (checkBingo(rows)) {
          bingo = h;
        }

        return rows;
      });
    } while (draws.length > 0 && !bingo);

    const rest = markedCards.map((card, h) => {
      const rows = card.map((row) => {
        const columns = row.filter((col) => {
          return col !== "x";
        });

        return columns;
      });

      return rows;
    });

    const result =
      rest.map((card) =>
        card.reduce((prev, curr) => {
          const sum = curr.reduce((p, c) => {
            return p + Number(c);
          }, 0);

          return prev + sum;
        }, 0)
      )[bingo] * draw;

    console.log("part 1 - score :", result);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
