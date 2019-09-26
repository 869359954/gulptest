const { src,pipe,dest,series,task,watch,parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const watcher = watch('src/*.js');
const connect = require('gulp-connect');
// const rev = require('gulp-rev-append');
watcher.on('change',function(path,stats){
    console.log(`file ${path} was changed`);
    getjs();
});
function getjs(){
    return src('src/*.js')
    .pipe(uglify())
    .pipe(dest('dist'));
}
function serve(){
     connect.server({
         livereload:true,port:9123
     });
} 
function gethtml(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return src('src/*.html')
    .pipe(htmlmin(options))
    // .pipe(rev())
    .pipe(dest('dist'))
    .pipe(connect.reload());
}
function watchfile(){
    watch('src/*.html',{events:'all'},gethtml);
}
task(gethtml);
exports.default = parallel(gethtml,getjs,watchfile,serve);