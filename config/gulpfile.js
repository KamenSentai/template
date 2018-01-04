/* ---------------------------------------------------------------------------------------------------- *\
|*
|* REQUIRES
|*
\* ---------------------------------------------------------------------------------------------------- */

const browser_sync  = require('browser-sync').create()
const babelify      = require('babelify')
const browserify    = require('browserify')
const buffer        = require('vinyl-buffer')
const source        = require('vinyl-source-stream')

const gulp          = require('gulp'),
      gulp_cssnano  = require('gulp-cssnano'),
      gulp_imagemin = require('gulp-imagemin'),
      gulp_htmlmin  = require('gulp-htmlmin'),
      gulp_notify   = require('gulp-notify'),
      gulp_plumber  = require('gulp-plumber'),
      gulp_pug      = require('gulp-pug'),
      gulp_stylus   = require('gulp-stylus'),
      gulp_uglify   = require('gulp-uglify')

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
        assets  : './../app/assets/',
        audios  : './../app/assets/audios/',
        fonts   : './../app/assets/fonts/',
        icons   : './../app/assets/icons/',
        images  : './../app/assets/images/',
        scripts : './../app/assets/scripts/',
        styles  : './../app/assets/styles/',
        videos  : './../app/assets/videos/',
        views   : './../app/assets/views/'
    },
    dist :
    {
        root    : './../dist/',
        assets  : './../dist/assets/',
        audios  : './../dist/assets/audios/',
        fonts   : './../dist/assets/fonts/',
        icons   : './../dist/assets/icons/',
        images  : './../dist/assets/images/',
        scripts : './../dist/assets/scripts/',
        styles  : './../dist/assets/styles/',
        videos  : './../dist/assets/videos/',
        views   : './../dist/assets/views/'
    },
    src  :
    {
        root    : './../src/',
        assets  : './../src/assets/',
        audios  : './../src/assets/audios/',
        fonts   : './../src/assets/fonts/',
        icons   : './../src/assets/icons/',
        images  : './../src/assets/images/',
        scripts : './../src/assets/scripts/',
        styles  : './../src/assets/styles/',
        videos  : './../src/assets/videos/',
        views   : './../src/assets/views/'
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
    compiled    : 'compiled',
    distributed : 'distributed',
    transpiled  : 'transpiled'
}

/* ---------------------------------------------------------------------------------------------------- *\
|*
|* TASKS
|*
\* ---------------------------------------------------------------------------------------------------- */

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
        .pipe(gulp.dest(`${path.app.styles}${folder.lib}`))
        .pipe(gulp_cssnano())
        .pipe(gulp.dest(`${path.dist.styles}${folder.lib}`))

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
        .pipe(gulp.dest(`${path.app.scripts}${folder.lib}`))
        .pipe(gulp_uglify())
        .pipe(gulp.dest(`${path.dist.scripts}${folder.lib}`))
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
|* FONTS
\* -------------------------------------------------- */

gulp.task('fonts', () =>
{
    return gulp.src(`${path.src.fonts}${file.any}${extension.any}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Fonts',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.fonts))
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Fonts',
                message : `<%= file.relative %> : ${message.distributed}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* ICONS
\* -------------------------------------------------- */

gulp.task('icons', () =>
{
    return gulp.src(`${path.src.icons}${file.any}${extension.any}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Icons',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.icons))
        .pipe(gulp.dest(path.dist.icons))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Icons',
                message : `<%= file.relative %> : ${message.distributed}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* AUDIOS
\* -------------------------------------------------- */

gulp.task('audios', () =>
{
    return gulp.src(`${path.src.audios}${file.any}${extension.any}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Audios',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.audios))
        .pipe(gulp.dest(path.dist.audios))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Audios',
                message : `<%= file.relative %> : ${message.distributed}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* IMAGES
\* -------------------------------------------------- */

gulp.task('images', () =>
{
    return gulp.src(`${path.src.images}${file.any}${extension.any}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Images',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.images))
        .pipe(gulp_imagemin())
        .pipe(gulp.dest(path.dist.images))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Images',
                message : `<%= file.relative %> : ${message.distributed}`,
                sound   : 'beep'
            }))
})

/* -------------------------------------------------- *\
|* VIDEOS
\* -------------------------------------------------- */

gulp.task('videos', () =>
{
    return gulp.src(`${path.src.videos}${file.any}${extension.any}`)
        .pipe(gulp_plumber(
            {
                errorHandler : gulp_notify.onError(
                    {
                        title   : 'Videos',
                        message : '<%= error.message %>',
                        sound   : 'beep'
                    })
            }))
        .pipe(gulp.dest(path.app.videos))
        .pipe(gulp.dest(path.dist.videos))
        .pipe(browser_sync.stream())
        .pipe(gulp_notify(
            {
                title   : 'Videos',
                message : `<%= file.relative %> : ${message.distributed}`,
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
            server  : path.dist.root,
            browser : 'Google Chrome'
        })

    // Watch libs
    gulp.watch(
        [
            `${path.src.styles}${folder.lib}${file.any}${extension.any}`,
            `${path.src.scripts}${folder.lib}${file.any}${extension.any}`
        ], ['libs'])

    // Watch index
    gulp.watch(
        [
            `${path.src.root}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${folder.components}${file.any}${extension.any}`
        ], ['index'])

    // Watch views
    gulp.watch(
        [
            `${path.src.views}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${file.any}${extension.any}`,
            `${path.src.views}${folder.includes}${folder.components}${file.any}${extension.any}`
        ], ['views'])

    // Watch styles
    gulp.watch(
        [
            `${path.src.styles}${file.any}${extension.any}`,
            `${path.src.styles}${folder.components}${file.any}${extension.any}`
        ], ['styles'])

    // Watch scripts
    gulp.watch(
        [
            `${path.src.scripts}${file.any}${extension.any}`,
            `${path.src.scripts}${folder.components}${file.any}${extension.any}`
        ], ['scripts'])

    // Watch assets
    gulp.watch(`${path.src.fonts}${file.any}${extension.any}`, ['fonts'])
    gulp.watch(`${path.src.icons}${file.any}${extension.any}`, ['icons'])
    gulp.watch(`${path.src.audios}${file.any}${extension.any}`, ['audios'])
    gulp.watch(`${path.src.images}${file.any}${extension.any}`, ['images'])
    gulp.watch(`${path.src.videos}${file.any}${extension.any}`, ['videos'])
})

/* -------------------------------------------------- *\
|* DEFAULT
\* -------------------------------------------------- */

gulp.task('default',
    [
        'libs',
        'index',
        'views',
        'styles',
        'scripts',
        'fonts',
        'icons',
        'audios',
        'images',
        'videos',
        'watch'
    ])