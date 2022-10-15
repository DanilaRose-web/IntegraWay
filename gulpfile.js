const { src, dest, series, parallel, watch } = require('gulp');

const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio'); // убирает атрибуты у svg (fill, stroke)
const webp = require('gulp-webp');
// const webphtml = require('gulp-webp-html');
const fileinclude = require('gulp-file-include');


function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: true,
        online: true
    });
}

function styles() {
    return src([
        'src/css/style.css',
        'src/css/header.css',
        'src/css/submenu.css',
        'src/css/mobile-menu.css',
        'src/css/accordion.css',
        'src/css/main-slider.css',
        'src/css/index.css',
        'src/css/features.css',
        'src/css/category-block.css',
        'src/css/contact.css',
        'src/css/form.css',
        'src/css/footer.css',
        'src/css/card-slider.css',
        'src/css/card-page.css',
        'src/css/cards-list.css',
        'src/css/category-page.css',
        'src/css/pagination.css',
        'src/css/error.css',
        'src/css/preloader.css',
        'src/css/search-page.css',
        'src/css/search-form.css',
        'src/css/select.css',
        'src/css/checkbox-group.css',
        'src/css/search-small-from.css',
        'src/css/languages.css'
    ])
    // .pipe(sass()) 
    .pipe(concat('style.min.css')) // для конкатинации файлов необходимо перечислить все файлы и в том порядке, в которм нужно их объединить
    .pipe(autoprefixer({ overrideBrowserslist: ['last 70 versions'], grid: true }))
    .pipe(cleancss({ 
        level: {
            2: { 
                all: false,  // устанавливает для всех значений значение `false` 
                removeDuplicateRules: true
        } } }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.min.js',
        'src/js/script.js'  
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream());
}

function html() {
    return src(['src/**/*.html', '!src/**/_*.html'])
        .pipe(fileinclude())
        // .pipe(webphtml())
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function lib() {
    return src('src/lib/**/*')
        .pipe(dest('app/lib/'));
}

function models() {
    return src('src/models/**/*')
        .pipe(dest('app/models/'));
}

function fonts() {
    return src('src/fonts/*')
        .pipe(dest('app/fonts/'));
}

function images() {
    return src('src/img/src/**/*')
        .pipe(webp({
            quality: 70
        }))
        // .pipe(webphtml())
        .pipe(src('src/img/src/**/*'))
        .pipe(newer('src/img/dist/'))
        .pipe(imagemin({
            progressive: true,
            svgjPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(dest('src/img/dist/'));
}

function cleanimg() {
    return del('src/img/dist/**/*', { force: true });
}

// function svgsprite() {
//     return src('src/iconsprite/**/*.svg')
//         .pipe(svgSprite({
//             mode: {
//                 stack: {
//                     sprite: '../sprite.svg', // sprite file name
//                     example: true
//                 }
//             }
//         }))
//         .pipe(dest('app/img/')); 
// }

function svgSprites() {
    return src('src/img/dist/svg-sprite.svg/*.svg')
        .pipe(dest('app/img/'));
}




function cleandist() {
    return del('app/**/*', { force: true });
}

function buildcopy() {
    return src([
        'src/css/**/*.min.css',
        'src/js/**/*.min.js',
        'src/img/dist/**/*',
        // 'src/**/*.html'
        'src/lib/',
        'src/models/',
        'src/fonts/'
    ], { base: 'src/' })
        .pipe(dest('app/'));
}

function startWatch() {
    watch(['src/**/*.css', '!src/css/**/*.min.css'], styles);
    watch(['src/**/*.js', '!src/js/**/*.min.js'], scripts);
    watch(['src/**/*.html'], html);
    watch(['src/**/svg-sprite.svg'], svgSprites);
    watch(['src/lib/*'], lib);
    watch(['src/models/*'], models);
    watch('src/img/src/**/*', images);
    // watch('src/img/src/**/*.svg', svgsprite);
    watch('src/img/dist/svg-sprite.svg');
}

exports.styles = styles;
exports.html = html;
exports.lib = lib;
exports.models = models
exports.fonts = fonts;
exports.scripts = scripts;
exports.images = images;
// exports.svgsprite = svgsprite;
exports.svgSprites = svgSprites;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.buildcopy = buildcopy;
exports.browsersync = browsersync;

exports.build = series(cleandist, styles, scripts, images, lib, models, svgSprites, buildcopy);

exports.default = parallel(styles, html, scripts, images, svgSprites, fonts, lib, models, startWatch, buildcopy, browsersync);