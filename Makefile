
.PHONY: cmake configure

all: cmake build/libTest.js build/libTestAsm.js

build/libTest.js: build/src/libTest.a
	emcc -s WASM=1 build/src/libTest.a -o build/libTest.js

build/libTestAsm.js: build/src/libTest.a
	emcc -s WASM=0 build/src/libTest.a -o build/libTestAsm.js

cmake:
	cd build; emmake make

build:
	mkdir build

configure: build
	cd build; emconfigure cmake ../
