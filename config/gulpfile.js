/* -------------------------------------------------- *\
|*
|* REQUIRES
|*
\* -------------------------------------------------- */

const browser_sync  = require('browser-sync').create()

const gulp          = require('gulp'),
      gulp_babel    = require('gulp-babel'),
      gulp_concat   = require('gulp-concat'),
      gulp_cssnano  = require('gulp-cssnano'),
      gulp_imagemin = require('gulp-imagemin'),
      gulp_notify   = require('gulp-notify'),
      gulp_plumber  = require('gulp-plumber'),
      gulp_sass     = require('gulp-sass'),
      gulp_uglify   = require('gulp-uglify')

/* -------------------------------------------------- *\
|*
|* PATHS
|*
\* -------------------------------------------------- */

const path =
{
    app:
    {
        root:    './../app/',
        audios:  './../app/assets/audios/',
        fonts:   './../app/assets/fonts/',
        icons:   './../app/assets/icons/',
        images:  './../app/assets/images/',
        scripts: './../app/assets/scripts/',
        styles:  './../app/assets/styles/',
        videos:  './../app/assets/videos/',
        views:   './../app/assets/views/'
    },
    dist:
    {
        root:    './../dist/',
        audios:  './../dist/assets/audios/',
        fonts:   './../dist/assets/fonts/',
        icons:   './../dist/assets/icons/',
        images:  './../dist/assets/images/',
        scripts: './../dist/assets/scripts/',
        styles:  './../dist/assets/styles/',
        videos:  './../dist/assets/videos/',
        views:   './../dist/assets/views/'
    },
    src:
    {
        root:    './../src/',
        audios:  './../src/assets/audios/',
        fonts:   './../src/assets/fonts/',
        icons:   './../src/assets/icons/',
        images:  './../src/assets/images/',
        scripts: './../src/assets/scripts/',
        styles:  './../src/assets/styles/',
        videos:  './../src/assets/videos/',
        views:   './../src/assets/views/'
    }
}

/* -------------------------------------------------- *\
|*
|* TASKS
|*
\* -------------------------------------------------- */

gulp.task('libs', () =>
{
    gulp.src(`${path.src.styles}lib/*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Styles lib',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.styles}/lib`))
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(`${path.dist.styles}/lib`))

    gulp.src(`${path.src.scripts}lib/*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Scripts lib',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(`${path.app.scripts}/lib`))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(`${path.dist.scripts}/lib`))
})

gulp.task('index', () =>
{
    return gulp.src(`${path.src.root}index.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Index',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.root))
        .pipe(gulp.dest(path.dist.root))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Index',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('views', () =>
{
    return gulp.src(`${path.src.views}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Views',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.views))
        .pipe(gulp.dest(path.dist.views))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Views',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('styles', () =>
{
    return gulp.src(`${path.src.styles}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Styles',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp_sass())
        .pipe(gulp.dest(path.app.styles))
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(path.dist.styles))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Styles',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('scripts', () =>
{
    return gulp.src(
            [
                `${path.src.scripts}components/variables.*`,
                `${path.src.scripts}components/*.*`,
                `${path.src.scripts}main.*`
            ])
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Scripts',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp_babel(
            {
                presets: ['babel-preset-env'].map(require.resolve)
            }))
        .pipe(gulp_concat('main.js'))
        .pipe(gulp.dest(path.app.scripts))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Scripts',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('fonts', () =>
{
    return gulp.src(`${path.src.fonts}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Fonts',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.fonts))
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Fonts',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('icons', () =>
{
    return gulp.src(`${path.src.icons}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Icons',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.icons))
        .pipe(gulp.dest(path.dist.icons))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Icons',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('audios', () =>
{
    return gulp.src(`${path.src.audios}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Audios',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.audios))
        .pipe(gulp.dest(path.dist.audios))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Audios',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('images', () =>
{
    return gulp.src(`${path.src.images}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Images',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.images))
        .pipe(gulp_imagemin())
        .pipe(gulp.dest(path.dist.images))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Images',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('videos', () =>
{
    return gulp.src(`${path.src.videos}*.*`)
        .pipe(gulp_plumber(
            {
                errorHandler: gulp_notify.onError(
                    {
                        title: 'Videos',
                        message: '<%= error.message %>',
                        sound: 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.videos))
        .pipe(gulp.dest(path.dist.videos))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title: 'Videos',
                message: 'success',
                sound: 'beep'
            }))
})

gulp.task('watch', () =>
{
    browser_sync.init(
        {
            server: path.dist.root,
            browser: 'Google Chrome'
        })
    
    gulp.watch(`${path.src.root}*.*`, ['index'])
    gulp.watch(`${path.src.views}*.*`, ['views'])

    gulp.watch(`${path.src.styles}*.*`, ['styles'])
    gulp.watch(`${path.src.styles}components/*.*`, ['styles'])
    gulp.watch(`${path.src.styles}components/lib/*.*`, ['libs'])

    gulp.watch(`${path.src.scripts}*.*`, ['scripts'])
    gulp.watch(`${path.src.scripts}components/*.*`, ['scripts'])
    gulp.watch(`${path.src.scripts}components/lib/*.*`, ['libs'])

    gulp.watch(`${path.src.fonts}*.*`, ['fonts'])
    gulp.watch(`${path.src.icons}*.*`, ['icons'])

    gulp.watch(`${path.src.audios}*.*`, ['audios'])
    gulp.watch(`${path.src.images}*.*`, ['images'])
    gulp.watch(`${path.src.videos}*.*`, ['videos'])
})

gulp.task('default', ['libs', 'index', 'views', 'styles', 'scripts', 'fonts', 'icons', 'audios', 'images', 'videos', 'watch'])