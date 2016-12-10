SHELL := /bin/bash

deps:
	if [ -e "`which yarn`" ]; then yarn; else npm install; fi

build:
	./node_modules/.bin/ng build --prod --aot

deploy: build
	cd dist && \
	tar czf mstat.tar.gz assets *.js *.css *.html && \
	scp -P2022 mstat.tar.gz heilage@furiten.ru:/srv/www/mstat.furiten.ru/ && \
	ssh -p2022 heilage@furiten.ru "cd /srv/www/mstat.furiten.ru/ && tar xf mstat.tar.gz"

dev:
	./node_modules/.bin/ng serve
