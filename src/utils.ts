import { execFile } from "child_process"
import { parse } from "json2csv"

interface Benchmark {
  actualTime: number
  localTime: number
}

interface WrappedResult {
  name: string
  benchmarks: [number, Benchmark][]
}

export async function wrap(
  input: number[],
  tests: { name: string; func: (num: number) => Promise<number> | number }[]
): Promise<WrappedResult[]> {
  const results: WrappedResult[] = []
  for (const test of tests) {
    const benchmarks: Map<number, Benchmark> = new Map()
    for (const num of input) {
      let innerResults: Benchmark[] = []

      const AVERAGES = 10
      for (let i = 0; i < AVERAGES; i++) {
        const start = performance.now()
        const localTime = await test.func(num)
        const actualTime = performance.now() - start
        innerResults.push({ actualTime, localTime })
      }

      // Get the average of the results
      benchmarks.set(num, {
        actualTime:
          innerResults.reduce(
            (total, current) => total + current.actualTime,
            0
          ) / AVERAGES,
        localTime:
          innerResults.reduce(
            (total, current) => total + current.localTime,
            0
          ) / AVERAGES,
      })
    }

    results.push({ name: test.name, benchmarks: [...benchmarks] })
  }
  return results
}

export function displayDiff(test: string, results: WrappedResult[]) {
  console.log(`====== ${test} ======`)
  for (const result of results) {
    for (const [input, benchmark] of result.benchmarks) {
      console.log(
        `[${input}] [A] ${result.name}: ${Math.round(benchmark.actualTime)}ms`
      )
      console.log(
        `[${input}] [L] ${result.name}: ${Math.round(benchmark.localTime)}ms`
      )
    }
  }
  console.log("\n")
}

export function cuda(executableName: string) {
  return (input: number) =>
    new Promise<number>((resolve) => {
      execFile(
        `./projects/gpu-rodinia/${executableName}`,
        ["-s", input.toString()],
        (err, stdout, stderr) => {
          resolve(parseFloat(stdout.split("\n")[1].trim()))
        }
      )
    })
}

export function gather(
  algorithms: { test: string; results: WrappedResult[] }[]
) {
  const data: {
    algorithm: string
    kind: string
    input: number
    actualTime: string
    localTime: string
  }[] = []
  for (const algorithm of algorithms) {
    displayDiff(algorithm.test, algorithm.results)
    for (const benchmarks of algorithm.results) {
      for (const [input, benchmark] of benchmarks.benchmarks) {
        data.push({
          algorithm: algorithm.test,
          kind: benchmarks.name,
          input,
          actualTime: benchmark.actualTime.toFixed(2),
          localTime: benchmark.localTime.toFixed(2),
        })
      }
    }
  }
  console.log(
    parse(data, {
      fields: ["algorithm", "kind", "input", "actualTime", "localTime"],
    })
  )
}
