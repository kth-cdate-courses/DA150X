import { add as ecmaAdd } from "da150x-ecma"
import { add as wasmAdd } from "da150x-wasm"

console.log(ecmaAdd(1, 2))
console.log(wasmAdd(1, 2))
