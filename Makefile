
.PHONY: cmake configure copyjs

all: cmake build/libTest.js build/libTestAsm.js copyjs

build/libTest.js: build/src/libTest.a
	emcc -s WASM=1 -s MODULARIZE=1 build/src/libTest.a -o build/libTest.js

build/libTestAsm.js: build/src/libTest.a
	emcc -s WASM=0 -s MODULARIZE=1 build/src/libTest.a -o build/libTestAsm.js

copyjs:
	rsync -r --include '*.js' --include '*/' --exclude '*' src/ build
	rsync -r --include '*.mjs' --include '*/' --exclude '*' src/ build

cmake:
	cd build; emmake make

build:
	mkdir build

configure: build
	cd build; emconfigure cmake ../
