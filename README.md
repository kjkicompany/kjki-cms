title: KjKi - Cms

is: Gestor Cms

language: javascript

motor: node-js

version: 1.0.0

requirements:

-   node-js:
    -   version min: 16.5.0
    -   web: [https://nodejs.org](https://nodejs.org)
-   mongodb:
    -   version min: 5.0.6
    -   web: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

config:

-   npm i
-   rename src/config/config.js.example to config.js
-   change src/config/config.js
-   change src/public/humans.txt
-   change src/public/robots.txt
-   change src/public/sitemap.txt

run:

-   check-l
-   npm run check-l
-   npm run check-g
-   npm run update-l
-   npm run upgrade-l
-   npm run update-g
-   npm run upgrade-g
-   npm start
-   npm run dev

links:

-   development: [http://127.0.0.1:4000](http://127.0.0.1:4000) | [http://127.0.0.1:4000/panel](http://127.0.0.1:4000/panel)
-   production: [http://127.0.0.1:3000](http://127.0.0.1:3000) | [http://127.0.0.1:3000/panel](http://127.0.0.1:3000/panel)
