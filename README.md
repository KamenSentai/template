# Template front-end starter pack

## Description

- Template front-end starter pack using Gulp modules

## Features

- Compile PUG to HTML
- Compile STYLUS to CSS
- Compile ES6 to ES5
- Minify HTML
- Minify CSS
- Minify JS
- Minify images
- Transfer all assets
- Reset.css library
- Font-awesome.css library
- Modernizr-custom.js library
- config/ folder to edit any configuration
- app/ folder to preview unminified files
- dist/ folder to export final work
- src/ folder to work in it
- CSScomb
- ESLint

## Setup

- Require [Node.js](https://nodejs.org/en/) & [Gulp](https://gulpjs.com/)

- Get in `config` folder
```
cd [path/to/template/config]
```
- Install modules

MacOS
```
sudo npm install
```

Windows
```
npm install
```

- Run Gulp
```
gulp
```

## Structure

```
┌─ README.md
├─ LICENCE
├─ .gitignore
├─ config
│   ├─ .babelrc
│   ├─ .csscomb.json
│   ├─ .editorconfig
│   ├─ .eslintignore
│   ├─ .eslintrc.js
│   ├─ gulpfile.js
│   ├─ package-lock.json
│   └─ package.json
├─ app
│   └─ assets
│       ├─ audios
│       ├─ fonts
│       ├─ icons
│       ├─ images
│       ├─ scripts
│       │   └─ lib
│       ├─ styles
│       │   └─ lib
│       ├─ videos
│       └─ views
├─ dist
│   └─ assets
│       ├─ audios
│       ├─ fonts
│       ├─ icons
│       ├─ images
│       ├─ scripts
│       │   └─ lib
│       ├─ styles
│       │   └─ lib
│       ├─ videos
│       └─ views
└ src
    ├─ index.pug
    └─ assets
        ├─ audios
        ├─ fonts
        ├─ icons
        ├─ images
        ├─ scripts
        │   ├─ main.js
        │   ├─ components
        │   │   ├─ test.js
        │   │   └─ variables.js
        │   └─ lib
        │       └─ modernizr-custom.js
        ├─ styles
        │   ├─ main.styl
        │   ├─ components
        │   │   ├─ init.styl
        │   │   └─ variables.styl
        │   └─ lib
        │       ├─ font-awesome.css
        │       └─ reset.css
        ├─ videos
        └─ views
            ├─ about.pug
            └─ includes
                ├─ head.pug
                ├─ body.pug
                └─ components
                    ├─ header.pug
                    └─ footer.pug
```

## Repository

- [GitHub](https://github.com/KamenSentai/template)

## Credits
- Author : [Alain Cao Van Truong](https://github.com/KamenSentai)
- Inspiration : [Loris Marino](https://github.com/LorisMarino)