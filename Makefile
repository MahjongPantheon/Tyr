SHELL := /bin/bash

deps:
	if [ -e "`which yarn`" ]; then yarn; else npm install; fi

build:
	./node_modules/.bin/ng build --prod --aot

deploy:
	sed -i 's/http:\/\/staging./https:\/\//' src/app/config/index.ts && \
	make build && \
	cd dist && \
	gzip -9 -f *.js *.css && \
	tar cf mstat.tar assets *.gz *.html && \
	scp -P2022 mstat.tar heilage@furiten.ru:/srv/www/m.furiten.ru/ && \
	ssh -p2022 heilage@furiten.ru "bash -c \"cd /srv/www/m.furiten.ru/ && tar xf mstat.tar\"" && \
	cd .. && git checkout -- src/app/config/index.ts

dev:
	./node_modules/.bin/ng serve
