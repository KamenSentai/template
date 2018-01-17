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
|* SETTINGS
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
|* MESSAGES
\* -------------------------------------------------- */

const message =
{
    compiled   : '<%= file.relative %> : file compiled',
    exported   : '<%= file.relative %> : file exported',
    transpiled : '<%= file.relative %> : file transpiled',
    error      : '<%= error.message %>'
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
    return gulp.src([`${path.src.assets}**/*.*`])
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Assets',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.assets))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Assets',
                message : `${message.exported}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* LIBS
\* -------------------------------------------------- */

gulp.task('libs', () =>
{
    // Update styles libraries
    gulp.src(`${path.src.styles}lib/*.css`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Styles lib',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.styles}`))
        .pipe(gulp_notify(
            {
                title   : 'Style libraries',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Update scripts libraries
    gulp.src(`${path.src.scripts}lib/*.js`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Scripts lib',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.scripts}`))
        .pipe(gulp_notify(
            {
                title   : 'Script libraries',
                message : `${message.exported}`,
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
            entries : `${path.src.scripts}main.js`
        })
        .transform(babelify.configure(
            {
                presets : ['babel-preset-env'].map(require.resolve)
            }))
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Scripts',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.scripts}`))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Scripts',
                message : `${message.transpiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* STYLES
\* -------------------------------------------------- */

gulp.task('styles', () =>
{
    return gulp.src(`${path.src.styles}main.styl`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Styles',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_stylus())
        .pipe(gulp_autoprefixer())
        .pipe(gulp.dest(path.app.styles))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Styles',
                message : `${message.compiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* VIEWS
\* -------------------------------------------------- */

gulp.task('views', () =>
{
    return gulp.src(`${path.src.views}*.pug`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Views',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_pug(
            {
                pretty : true
            }))
        .pipe(gulp.dest(path.app.views))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Views',
                message : `${message.compiled}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* INDEX
\* -------------------------------------------------- */

gulp.task('index', () =>
{
    return gulp.src(`${path.src.root}index.pug`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Index',
                        message : `${message.error}`,
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp_pug(
            {
                pretty : true
            }))
        .pipe(gulp.dest(path.app.root))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Index',
                message : `${message.compiled}`,
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
    gulp.watch(`${path.src.assets}**/*.*`, ['assets'])

    // Watch libs
    gulp.watch(
        [
            `${path.src.styles}lib/*.*`,
            `${path.src.scripts}lib/*.*`
        ], ['libs'])

    // Watch scripts
    gulp.watch(
        [
            `${path.src.scripts}*.*`,
            `${path.src.scripts}components/**.*`
        ], ['scripts'])

    // Watch styles
    gulp.watch(
        [
            `${path.src.styles}*.*`,
            `${path.src.styles}components/**.*`
        ], ['styles'])

    // Watch views
    gulp.watch(
        [
            `${path.src.views}*.*`,
            `${path.src.views}includes/*.*`,
            `${path.src.views}includes/components/**.*`
        ], ['views'])

    // Watch index
    gulp.watch(
        [
            `${path.src.root}*.*`,
            `${path.src.views}includes/*.*`,
            `${path.src.views}includes/components/**.*`
        ], ['index'])
})

/* -------------------------------------------------- *\
|* PRODUCTION
\* -------------------------------------------------- */

gulp.task('production', () =>
{
    // Minify and export images
    gulp.src(`${path.app.images}*.*`)
        .pipe(gulp_imagemin())
        .pipe(gulp.dest(path.dist.images))
        .pipe(gulp_notify(
            {
                title   : 'Images',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Export assets
    gulp.src(
        [
            `${path.app.assets}**/*.*`,
            `!${path.app.images}*.*`
        ])
        .pipe(gulp.dest(path.dist.assets))
        .pipe(gulp_notify(
            {
                title   : 'Assets',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Minify and export scripts
    gulp.src([`${path.app.scripts}*.js`])
        .pipe(gulp_uglify())
        .pipe(gulp.dest(`${path.dist.scripts}`))
        .pipe(gulp_notify(
            {
                title   : 'Styles',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Minify and export styles
    gulp.src([`${path.app.styles}*.css`])
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(`${path.dist.styles}`))
        .pipe(gulp_notify(
            {
                title   : 'Scripts',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Minify and export views
    gulp.src([`${path.app.views}*.html`])
        .pipe(gulp_htmlmin(
            {
                collapseWhitespace : true
            }))
        .pipe(gulp.dest(path.dist.views))
        .pipe(gulp_notify(
            {
                title   : 'Views',
                message : `${message.exported}`,
                sound   : 'beep'
            }))

    // Minify and export index
    gulp.src(`${path.app.root}index.html`)
        .pipe(gulp_htmlmin(
            {
                collapseWhitespace : true
            }))
        .pipe(gulp.dest(path.dist.root))
        .pipe(gulp_notify(
            {
                title   : 'Index',
                message : `${message.exported}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* DEFAULT
\* -------------------------------------------------- */

gulp.task('default', ['assets', 'libs', 'scripts', 'styles', 'views', 'index', 'watch'])