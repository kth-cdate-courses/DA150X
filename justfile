build:
	just build-ecma
	just build-wasm-cpp
	rm -rf build
	nr build
	
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
	rm -rf ./projects/wasm/pkg && \
	rm -rf ./projects/wasm/build && \
	mkdir ./projects/wasm/pkg && \
	emcc ./projects/wasm/src/algorithms.cpp -o ./projects/wasm/pkg/algorithms.mjs -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS=_cppAdd -s EXPORT_NAME=loadWASM -s EXPORTED_RUNTIME_METHODS=ccall,cwrap && \
	cd ./projects/wasm && npm run build && cp ./build/lib/* ./pkg && cd ../../

start:
	nr start