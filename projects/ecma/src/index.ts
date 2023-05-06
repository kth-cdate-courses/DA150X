export { ludRun } from "./lud.js"
export { bfs } from "./bfs.js"
export { pageRank } from "./pagerank.js"
export { runCRC } from "./crc.js"
export { runLavaMD } from "./lavamd.js"
export { runBackProp } from "./backprop.js"

export function trivial(a: number): typeof a {
  return a
}

export function add(a: number, b: number): number {
  return a + b
}
