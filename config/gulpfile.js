/* ---------------------------------------------------------------------------------------------------- *\
|*
|* REQUIRES
|*
\* ---------------------------------------------------------------------------------------------------- */

const browser_sync      = require('browser-sync').create()
const babelify          = require('babelify')
const browserify        = require('browserify')
const buffer            = require('vinyl-buffer')
const source            = require('vinyl-source-stream')

const gulp              = require('gulp'),
      gulp_autoprefixer = require('gulp-autoprefixer'),
      gulp_cssnano      = require('gulp-cssnano'),
      gulp_imagemin     = require('gulp-imagemin'),
      gulp_htmlmin      = require('gulp-htmlmin'),
      gulp_notify       = require('gulp-notify'),
      gulp_plumber      = require('gulp-plumber'),
      gulp_pug          = require('gulp-pug'),
      gulp_stylus       = require('gulp-stylus'),
      gulp_uglify       = require('gulp-uglify')

/* ---------------------------------------------------------------------------------------------------- *\
|*
|* LAYOUTS
|*
\* ---------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------- *\
|* PATHS
\* -------------------------------------------------- */

const path =
{
    app  :
    {
        root    : './../app/',
        scripts : './../app/scripts/',
        styles  : './../app/styles/',
        views   : './../app/views/',
        assets  : './../app/assets/',
        audios  : './../app/assets/audios/',
        fonts   : './../app/assets/fonts/',
        icons   : './../app/assets/icons/',
        images  : './../app/assets/images/',
        videos  : './../app/assets/videos/'
    },
    dist :
    {
        root    : './../dist/',
        scripts : './../dist/scripts/',
        styles  : './../dist/styles/',
        views   : './../dist/views/',
        assets  : './../dist/assets/',
        audios  : './../dist/assets/audios/',
        fonts   : './../dist/assets/fonts/',
        icons   : './../dist/assets/icons/',
        images  : './../dist/assets/images/',
        videos  : './../dist/assets/videos/'
    },
    src  :
    {
        root    : './../src/',
        scripts : './../src/scripts/',
        styles  : './../src/styles/',
        views   : './../src/views/',
        assets  : './../src/assets/',
        audios  : './../src/assets/audios/',
        fonts   : './../src/assets/fonts/',
        icons   : './../src/assets/icons/',
        images  : './../src/assets/images/',
        videos  : './../src/assets/videos/'
    }
}

/* -------------------------------------------------- *\
|* FOLDERS
\* -------------------------------------------------- */

const folder =
{
    any        : '**/',
    components : 'components/',
    includes   : 'includes/',
    lib        : 'lib/'
}

/* -------------------------------------------------- *\
|* FILES
\* -------------------------------------------------- */

const file =
{
    any    : '*',
    app    : 'app',
    bundle : 'bundle',
    index  : 'index',
    main   : 'main'
}

/* -------------------------------------------------- *\
|* EXTENSIONS
\* -------------------------------------------------- */

const extension =
{
    any  : '.*',
    cda  : '.cda',
    mp3  : '.mp3',
    ogg  : '.ogg',
    wav  : '.wav',
    wma  : '.wma',
    eot  : '.eot',
    otf  : '.otf',
    ttf  : '.ttf',
    woff : '.woff',
    bmp  : '.bmp',
    gif  : '.gif',
    jpeg : '.jpeg',
    jpg  : '.jpg',
    png  : '.png',
    svg  : '.svg',
    js   : '.js',
    ts   : '.ts',
    css  : '.css',
    less : '.less',
    sass : '.sass',
    scss : '.scss',
    styl : '.styl',
    avi  : '.avi',
    mov  : '.mov',
    mp4  : '.mp4',
    mpeg : '.mpeg',
    mpg  : '.mpg',
    ra   : '.ra',
    wmf  : '.wmf',
    xvid : '.xvid',
    haml : '.haml',
    html : '.html',
    php  : '.php',
    pug  : '.pug'
}

/* -------------------------------------------------- *\
|* MESSAGES
\* -------------------------------------------------- */

const message =
{
    compiled   : 'compiled',
    exported   : 'exported',
    transpiled : 'transpiled'
}

/* ---------------------------------------------------------------------------------------------------- *\
|*
|* TASKS
|*
\* ---------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------- *\
|* ASSETS
\* -------------------------------------------------- */

gulp.task('assets', () =>
{
    return gulp.src([`${path.src.assets}${folder.any}${file.any}${extension.any}`])
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Assets',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.assets))
        .pipe(gulp.dest(path.dist.assets))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Assets',
                message : `<%= file.relative %> : ${message.exported}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* LIBS
\* -------------------------------------------------- */

gulp.task('libs', () =>
{
    // Update styles libraries
    gulp.src(`${path.src.styles}${folder.lib}${file.any}${extension.css}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Styles lib',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.styles}`))
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(`${path.dist.styles}`))
        .pipe(gulp_notify(
            {
                title   : 'Style libraries',
                message : `<%= file.relative %> : ${message.exported}`,
                sound   : 'beep'
            }))

    // Update scripts libraries
    gulp.src(`${path.src.scripts}${folder.lib}${file.any}${extension.js}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Scripts lib',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.scripts}`))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(`${path.dist.scripts}`))
        .pipe(gulp_notify(
            {
                title   : 'Script libraries',
                message : `<%= file.relative %> : ${message.exported}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* SCRIPTS
\* -------------------------------------------------- */

gulp.task('scripts', () =>
{
	return browserify(
        {
            debug   : true,
            entries : `${path.src.scripts}${file.main}${extension.js}`
        })
        .transform(babelify.configure(
            {
                presets : ['babel-preset-env'].map(require.resolve)
            }))
        .bundle()
        .pipe(source(`${file.main}${extension.js}`))
        .pipe(buffer())
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Scripts',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.scripts}`))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(`${path.dist.scripts}`))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Scripts',
                message : `<%= file.relative %> : ${message.transpiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* STYLES
\* -------------------------------------------------- */

gulp.task('styles', () =>
{
    return gulp.src(`${path.src.styles}${file.main}${extension.styl}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Styles',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_stylus())
        .pipe(gulp_autoprefixer())
        .pipe(gulp.dest(path.app.styles))
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(path.dist.styles))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Styles',
                message : `<%= file.relative %> : ${message.compiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* VIEWS
\* -------------------------------------------------- */

gulp.task('views', () =>
{
    return gulp.src(`${path.src.views}${file.any}${extension.pug}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Views',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_pug(
            {
                pretty : true
            }))
        .pipe(gulp.dest(path.app.views))
        .pipe(gulp_htmlmin(
            {
                collapseWhitespace : true
            }))
        .pipe(gulp.dest(path.dist.views))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Views',
                message : `<%= file.relative %> : ${message.compiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* INDEX
\* -------------------------------------------------- */

gulp.task('index', () =>
{
    return gulp.src(`${path.src.root}${file.index}${extension.pug}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Index',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_pug(
            {
                pretty : true
            }))
        .pipe(gulp.dest(path.app.root))
        .pipe(gulp_htmlmin(
            {
                collapseWhitespace : true
            }))
        .pipe(gulp.dest(path.dist.root))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Index',
                message : `<%= file.relative %> : ${message.compiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* WATCH
\* -------------------------------------------------- */

gulp.task('watch', () =>
{
    // Run browser
    browser_sync.init(
        {
            server  : path.app.root,
            browser : 'Google Chrome',
            port    : 5000
        })

    // Watch assets
    gulp.watch(`${path.src.assets}${folder.any}${file.any}${extension.any}`, ['assets'])

    // Watch libs
    gulp.watch(
        [
            `${path.src.styles}${folder.lib}${file.any}${extension.any}`,
            `${path.src.scripts}${folder.lib}${file.any}${extension.any}`
        ], ['libs'])

    // Watch scripts
    gulp.watch(
        [
            `${path.src.scripts}${file.any}${extension.any}`,
            `${path.src.scripts}${folder.components}${file.any}${extension.any}`
        ], ['scripts'])

    // Watch styles
    gulp.watch(
        [
            `${path.src.styles}${file.any}${extension.any}`,
            `${path.src.styles}${folder.components}${file.any}${extension.any}`
        ], ['styles'])

    // Watch views
    gulp.watch(
        [
            `${path.src.views}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${folder.components}${file.any}${extension.any}`
        ], ['views'])

    // Watch index
    gulp.watch(
        [
            `${path.src.root}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${folder.components}${file.any}${extension.any}`
        ], ['index'])
})

/* -------------------------------------------------- *\
|* DEFAULT
\* -------------------------------------------------- */

gulp.task('default',
    [
        'assets',
        'libs',
        'scripts',
        'styles',
        'views',
        'index',
        'watch'
    ])