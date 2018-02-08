# Template front-end starter pack

## Description

- Template front-end starter pack using Gulp modules

## Features

- Live reloading with Google Chrome on save
- Compile languages
  - Compile `PUG` to `HTML`
    - Possibility to set HTML as default or any other HTML preprocessor but additionnal modules are required
  - Compile `STYLUS` to `CSS`
    - Possibility to set CSS as default or any other CSS preprocessor but additionnal modules are required
  - Transpile `ES6` to `ES5`
    - Possibility to set ES5 as default or any other JS preprocessor but additionnal modules are required
  - Minify HTML
  - Minify CSS
  - Minify JS
- Transfer all assets
  - Include audios, fonts, icons, images and videos
  - Minify images
- Libraries included
  - reset.css
  - font-awesome.css
  - modernizr-custom.js
  - need to declare every library in the `index.pug` file and the views files
- Several folders with different usages
  - `config/` folder to edit any configuration
  - `app/` folder to preview unminified files
    - folder not existed in the pack but automatically created when Gulp is running
  - `dist/` folder to export final work
    - folder not existed in the pack but automatically created when Gulp is running
  - `src/` folder to work in it
  - Location of each view page except the index at `(app|dist|src)/views/` by default
    - Requirement of editing `path` object in gulpfile.js if changing path for the URL
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

- Run Gulp to initialize `app/` and `dist/`
```
gulp
```

- Check all assets in `src/` and keep those needed or edit them and remove the unused ones

- Press `ctrl` + `C` to cancel Gulp and rerun Gulp in case of new files added

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
│   └─ package.json
└─ src
    ├─ index.pug
    ├─ assets
    ├─ scripts
    │   ├─ main.js
    │   ├─ components
    │   │   ├─ log.js
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
