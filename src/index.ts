import {
  add as ecmaAdd,
  ludRun as ecmaLudRun,
  bfs as ecmaBfs,
  pageRank as ecmaPageRank,
  runCRC as ecmaCrc,
  trivial as ecmaTrivial,
  runLavaMD as ecmaLavaMD,
  runBackProp as ecmaBackProp,
  runNeedle as ecmaNeedle,
} from "da150x-ecma"
import {
  add,
  bfs as wasmBfs,
  lud as wasmLud,
  pageRank as wasmPageRank,
  crc as wasmCrc,
  trivial as wasmTrivial,
  lavaMD as wasmLavaMD,
  backprop as wasmBackProp,
  needle as wasmNeedle,
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
          { name: "Cuda", func: cuda("cuda/lud/cuda/lud_cuda", "-s") },
        ]
      ),
    },
    {
      test: "BFS",
      results: await wrap(
        [65536, 262144, 1048576, 4194304],
        [
          { name: "ecma", func: ecmaBfs },
          { name: "C/C++ wasm", func: wasmBfs },
          { name: "Cuda Kernel", func: cuda("cuda/bfs-local/bfs.out") }
        ]
      ),
    },
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
    },*/
    /*
    {
      test: "Lava MD",
      results: await wrap(
        [4, 6, 8, 12],
        [
          { name: "ecma", func: ecmaLavaMD },
          {
            name: "C/C++ wasm",
            func: wasmLavaMD,
          },
          { name: "Cuda", func: cuda("cuda/lavaMD/lavaMD", "-boxes1d")}
        ]
      ),
    },
    */
   /*
    {
      test: "Backprop",
      results: await wrap(
        [1048576, 2097152, 4194304, 8388608],
        [
          { name: "ecma", func: ecmaBackProp },
          {
            name: "C/C++ wasm",
            func: wasmBackProp,
          },
          { name: "Cuda", func: cuda("cuda/backprop/backprop") }
        ]
      ),
    },*/

   
    {
      test: "Dynamic programming",
      results: await wrap(
        [4096, 8192, 12288],
        [
          {
            name: "ecma",
            func: ecmaNeedle,
          },
          {
            name: "C/C++ wasm",
            func: wasmNeedle,
          },
          { name: "Cuda", func: cuda("cuda/nw/needle", "", "1") }
        ]
      ),
    },
    
  ])
}
runBenchmarks()



    