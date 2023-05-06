import loadWASM from "../pkg/algorithms.mjs"

const wasm_module = await loadWASM()
export const trivial: (a: number) => typeof a = wasm_module._cppTrivial
export const add: (a: number, b: number) => number = wasm_module._cppAdd
export const bfs: (numNodes: number) => number = wasm_module._cppBfs
export const lud: (matrix_dim: number) => number = wasm_module._cppLud
export const pageRank: (n?: number) => number = wasm_module._cppPageRank
export const crc: (pageSize?: number) => number = wasm_module._cppCrc
export const lavaMD: (boxes: number) => number = wasm_module._cppLavaMD
export const backprop: (boxes: number) => number = wasm_module._cppBackprop
