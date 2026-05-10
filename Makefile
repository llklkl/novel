.PHONY: server build dev install clean

server:
	cd server && npm run build && npm run server

build:
	cd server && npm run build

dev:
	cd server && npm run dev

install:
	cd server && npm install

clean:
	rm -rf server/node_modules server/public server/dist