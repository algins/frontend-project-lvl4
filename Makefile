install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npm start --watch --verbose-watch

start-frontend:
	npx webpack serve

install-deps:
	npm ci
	npx playwright install

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

test:
	npx playwright test

.PHONY: test
