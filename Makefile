SHELL := /bin/bash

deps:
	if [ -e "`which yarn`" ]; then yarn; else npm install; fi

build:
	./node_modules/.bin/ng build --prod --aot

dev:
	./node_modules/.bin/ng serve
