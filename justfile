build:
	just build-ecma
	just build-wasm

build-ecma:
	cd projects/ecma && npm run build
build-wasm:
	cd projects/wasm && wasm-pack build --target nodejs

start:
	npm start