import {
  add as ecmaAdd,
  ludRun as ecmaLudRun,
  bfs as ecmaBfs,
} from "da150x-ecma"
import { add, bfs as wasmBfs } from "wasm"

function displayDiff(
  test: string,
  jsMilliseconds: number,
  wasmMilliseconds: number
) {
  console.log("====== BFS ======")
  console.log(`JS:           ${Math.round(jsMilliseconds)}ms`)
  console.log(`WASM (C/C++): ${Math.round(wasmMilliseconds)}ms`)
  console.log(
    `Difference:   ${Math.round(Math.abs(jsMilliseconds - wasmMilliseconds))}ms`
  )
  console.log("\n")
}

console.log(add(20, 13))

/*console.log(ecmaAdd(7, 8))

console.log(ecmaLudRun(1025))*/
displayDiff("BFS", ecmaBfs(4000000).time, wasmBfs(4000000))
