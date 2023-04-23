import {
  add as ecmaAdd,
  ludRun as ecmaLudRun,
  bfs as ecmaBfs,
  pageRank as ecmaPageRank,
  runCRC as ecmaCrc,
} from "da150x-ecma"
import {
  add,
  bfs as wasmBfs,
  lud as wasmLud,
  pageRank as wasmPageRank,
  crc as wasmCrc,
} from "wasm"
import { cuda, displayDiff, gather, wrap } from "./utils.js"
async function runBenchmarks() {
  gather([
    {
      test: "LUD",
      results: await wrap(
        [1000],
        [
          { name: "ecma", func: ecmaLudRun },
          { name: "C/C++ wasm", func: wasmLud },
          {
            name: "Cuda",
            func: cuda("returner"),
          },
        ]
      ),
    },
    {
      test: "BFS",
      results: await wrap(
        [1048576 / 2, 1048576],
        [
          { name: "ecma", func: ecmaBfs },
          { name: "C/C++ wasm", func: wasmBfs },
        ]
      ),
    },
    {
      test: "PageRank",
      results: await wrap(
        [10000],
        [
          { name: "ecma", func: ecmaPageRank },
          { name: "C/C++ wasm", func: wasmPageRank },
        ]
      ),
    },
    {
      test: "CRC",
      results: await wrap(
        [8000],
        [
          { name: "ecma", func: ecmaCrc },
          { name: "C/C++ wasm", func: wasmCrc },
        ]
      ),
    },
  ])
}
runBenchmarks()
