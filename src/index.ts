import {
  add as ecmaAdd,
  ludRun as ecmaLudRun,
  bfs as ecmaBfs,
  pageRank as ecmaPageRank,
  runCRC as ecmaCrc,
  trivial as ecmaTrivial,
} from "da150x-ecma"
import {
  add,
  bfs as wasmBfs,
  lud as wasmLud,
  pageRank as wasmPageRank,
  crc as wasmCrc,
  trivial as wasmTrivial,
} from "wasm"
import { cuda, displayDiff, gather, wrap } from "./utils.js"
async function runBenchmarks() {
  gather([
    {
      test: "Trivial",
      results: await wrap(
        [0],
        [
          { name: "ecma", func: ecmaTrivial },
          { name: "C/C++ wasm", func: wasmTrivial },
          { name: "External binary", func: cuda("trivial") },
        ]
      ),
    },
/*
    {
      test: "LUD",
      results: await wrap(
        [128, 256, 512, 1024],
        [
          { name: "ecma", func: ecmaLudRun },
          { name: "C/C++ wasm", func: wasmLud },
          { name: "Cuda", func: cuda("cuda/lud/cuda/lud_cuda") },
        ]
      ),
    },
*/
    {
      test: "BFS",
      results: await wrap(
        [65536, 262144, 1048576, 4194304],
        [
          { name: "ecma", func: ecmaBfs },
          { name: "C/C++ wasm", func: wasmBfs },
          { name: "Cuda", func: cuda("cuda/bfs/bfs.out") }
        ]
      ),
    },
/*
    {
      test: "PageRank",
      results: await wrap(
        [1024, 2048, 4096, 8192],
        [
          { name: "ecma", func: ecmaPageRank },
          { name: "C/C++ wasm", func: wasmPageRank },
        ]
      ),
    },
    {
      test: "CRC",
      results: await wrap(
        [32768, 65536, 131072, 262144],
        [
          { name: "ecma", func: ecmaCrc },
          { name: "C/C++ wasm", func: wasmCrc },
        ]
      ),
    },
*/
  ])
}
runBenchmarks()
