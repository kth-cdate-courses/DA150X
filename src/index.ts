import { add as ecmaAdd } from "da150x-ecma"
import { add } from "da150x-wasm"

console.log(add(1, 1))

console.log(ecmaAdd(1, 2))
