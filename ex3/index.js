import { get } from "https";
import config from "config";

const options = {
  hostname: "adventofcode.com",
  port: 443,
  path: "/2021/day/3/input",
  method: "GET",
  headers: {
    cookie: config.get("cookie"),
  },
};

const filterBitsWithGivenValueInGivenPosition = (bits, value, bitPosition) => {
  return Number(bits.charAt(bitPosition)) === value;
};

const nrOfOnes = (arr, bitPosition) =>
  arr.reduce(
    (prev, currValue) =>
      filterBitsWithGivenValueInGivenPosition(currValue, 1, bitPosition)
        ? ++prev
        : prev,
    0
  );

const req = get(options, (res) => {
  res.on("data", (d) => {
    const data = d.toString("utf8").split("\n");

    let gr = "";
    let er = "";

    // naive first approach 😅
    for (let i = 0; i < data[0].length; i++) {
      const hasMoreOnesThanZeroes = nrOfOnes(data, i) >= data.length / 2;

      if (hasMoreOnesThanZeroes) {
        gr += "1";
        er += "0";
      } else {
        gr += "0";
        er += "1";
      }
    }

    console.log("part 1 - pc :", parseInt(gr, 2) * parseInt(er, 2));

    // convoluted first approach 😅
    const recursiveSearch = (bitPosition, shouldFindMostCommonBit, arr) => {
      const bits = bitPosition === 0 ? data : arr;

      if (bitPosition >= bits[0].length || bits.length === 1) {
        return arr;
      }

      const hasMoreOnesThanZeroes =
        nrOfOnes(bits, bitPosition) >= bits.length / 2;

      if (shouldFindMostCommonBit) {
        hasMoreOnesThanZeroes
          ? (arr = bits.filter((value) =>
              filterBitsWithGivenValueInGivenPosition(value, 1, bitPosition)
            ))
          : (arr = bits.filter((value) =>
              filterBitsWithGivenValueInGivenPosition(value, 0, bitPosition)
            ));
      } else {
        hasMoreOnesThanZeroes
          ? (arr = bits.filter((value) =>
              filterBitsWithGivenValueInGivenPosition(value, 0, bitPosition)
            ))
          : (arr = bits.filter((value) =>
              filterBitsWithGivenValueInGivenPosition(value, 1, bitPosition)
            ));
      }

      bitPosition++;
      return recursiveSearch(bitPosition, shouldFindMostCommonBit, arr);
    };

    const ogr = parseInt(recursiveSearch(0, true), 2);
    const csr = parseInt(recursiveSearch(0, false), 2);

    console.log("part 2 - lsr :", ogr * csr);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
