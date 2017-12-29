# Template front-end starter pack

## Description

- Template front-end starter pack using Gulp modules

## Features

- Live reloading with Google Chrome on save
- Compiling languages
  - Conversion of PUG to HTML
    - Possibility to set HTML as default or any other HTML preprocessor but additionnal modules are required
  - Conversion of STYLUS to CSS
    - Possibility to set CSS as default or any other CSS preprocessor but additionnal modules are required
  - Conversion of ES6 to ES5
    - Possibility to set ES5 as default or any other JS preprocessor but additionnal modules are required
  - Minifying HTML
  - Minifying CSS
  - Minifying JS
- Transfer of all assets
  - Including audios, fonts, icons, images and videos
  - Minifying images
- Libraries included
  - reset.css
  - font-awesome.css
  - modernizr-custom.js
  - need to declare every library in the index file and the views files
- Several folders with different usages
  - config/ folder to edit any configuration
  - app/ folder to preview unminified files
    - folder not existed in the pack but automatically created when Gulp is running
  - dist/ folder to export final work
    - folder not existed in the pack but automatically created when Gulp is running
  - src/ folder to work in it
- Tools
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
└─ src
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
