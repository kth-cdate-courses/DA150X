import loadWASM from "../pkg/algorithms.mjs"

const wasm_module = await loadWASM()
export const add: (a: number, b: number) => number = wasm_module._cppAdd
export const bfs: (numNodes: number) => number = wasm_module._cppBfs
export const lud: (matrix_dim: number) => number = wasm_module._cppLud
export const pageRank: (
  n?: number
  /*   iter?: number,
  thresh?: number,
  divisor?: number */
) => number = wasm_module._cppPageRank
