import {
  add as ecmaAdd,
  ludRun as ecmaLudRun,
  bfs as ecmaBfs,
  pageRank as ecmaPageRank,
} from "da150x-ecma"
import {
  add,
  bfs as wasmBfs,
  lud as wasmLud,
  pageRank as wasmPageRank,
} from "wasm"

interface WrappedResult {
  name: string
  actualTime: number
  localTime: number
}

function wrap(
  input: number,
  tests: { name: string; func: (num: number) => number }[]
): WrappedResult[] {
  const results: WrappedResult[] = []
  for (const test of tests) {
    let innerResults: WrappedResult[] = []

    const AVERAGES = 3
    for (let i = 0; i < AVERAGES; i++) {
      const start = performance.now()
      const localTime = test.func(input)
      const actualTime = performance.now() - start
      innerResults.push({ name: test.name, actualTime, localTime })
    }

    // Get the average of the results
    results.push({
      name: test.name,
      actualTime:
        innerResults.reduce((total, current) => total + current.actualTime, 0) /
        AVERAGES,
      localTime:
        innerResults.reduce((total, current) => total + current.localTime, 0) /
        AVERAGES,
    })
  }
  return results
}

function displayDiff(test: string, results: WrappedResult[]) {
  console.log(`====== ${test} ======`)
  for (const result of results) {
    console.log(`[A] ${result.name}: ${Math.round(result.actualTime)}ms`)
    console.log(`[L] ${result.name}: ${Math.round(result.localTime)}ms`)
  }
  console.log("\n")
}

displayDiff(
  "LUD",
  wrap(1000, [
    { name: "ecma", func: ecmaLudRun },
    { name: "C/C++ wasm", func: wasmLud },
  ])
)
displayDiff(
  "BFS",
  wrap(1000, [
    { name: "ecma", func: ecmaBfs },
    { name: "C/C++ wasm", func: wasmBfs },
  ])
)
displayDiff(
  "PageRank",
  wrap(10000, [
    { name: "ecma", func: ecmaPageRank },
    { name: "C/C++ wasm", func: wasmPageRank },
  ])
)
