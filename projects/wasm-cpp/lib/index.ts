import loadWASM from "../pkg/algorithms.mjs"

const wasm_module = await loadWASM()
export const add: (a: number, b: number) => number = wasm_module._cppAdd
export const bfs: (numNodes: number) => number = wasm_module._cppBfs
