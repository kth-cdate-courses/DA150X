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
	emcc ./projects/wasm-cpp/src/algorithms.cpp ./projects/wasm-cpp/src/bfs.cpp ./projects/wasm-cpp/src/common.c -o ./projects/wasm-cpp/pkg/algorithms.mjs -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_cppAdd','_cppBfs']" -s EXPORT_NAME=loadWASM -s EXPORTED_RUNTIME_METHODS=ccall,cwrap -s ALLOW_MEMORY_GROWTH && \
	cd ./projects/wasm-cpp && npm run build && cp ./build/lib/* ./pkg && cd ../../

start:
	pnpm run start