set shell := ["bash", "-c"]
build:
	just build-ecma
	just build-wasm-cpp
	rm -rf build
	pnpm build
	
source:
	echo "source ./projects/emsdk/emsdk_env.sh"

build-ecma:
	cd projects/ecma && npm run build
build-wasm:
	cd projects/wasm && wasm-pack build --target nodejs
wasm-init:
	./projects/emsdk/emsdk install latest
	./projects/emsdk/emsdk activate latest
build-wasm-cpp:
	source ./projects/emsdk/emsdk_env.sh --build=Release && \
	rm -rf build && \
	rm -rf ./projects/wasm-cpp/pkg && \
	rm -rf ./projects/wasm-cpp/build && \
	mkdir ./projects/wasm-cpp/pkg && \
	emcc ./projects/wasm-cpp/src/*.c ./projects/wasm-cpp/src/*.cpp -o ./projects/wasm-cpp/pkg/algorithms.mjs -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_cppAdd','_cppBfs','_cppLud']" -s EXPORT_NAME=loadWASM -s EXPORTED_RUNTIME_METHODS=ccall,cwrap -s ALLOW_MEMORY_GROWTH -v && \
	cd ./projects/wasm-cpp && npm run build && cp ./build/lib/* ./pkg && cd ../../ && \
	pnpm uninstall da150x-ecma && pnpm install ./projects/ecma

start:
	pnpm run start

dev:
	just build
	just start