var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
    type: 'gcc',
    language: 'ECMASCRIPT5',
    //options: ["--compilation_level='SIMPLE_OPTIMIZATIONS'"],
    fileIn: 'public/js/**/*.js',
    fileOut: 'public/rocq.js',
    callback: function(err, min){
        console.log(err);
//        console.log(min);
    }
});

// // Array
// new compressor.minify({
//     type: 'gcc',
//     fileIn: ['public/js/base.js', 'public/js/base2.js'],
//     fileOut: 'public/js-dist/base-onefile-gcc.js',
//     callback: function(err, min){
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Only concatenation of files (no compression)
// new compressor.minify({
//     type: 'no-compress',
//     fileIn: ['public/js/base.js', 'public/js/base2.js'],
//     fileOut: 'public/js-dist/base-onefile-gcc.js',
//     callback: function(err, min){
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using YUI Compressor for CSS
// new compressor.minify({
//     type: 'yui-css',
//     fileIn: 'public/css/base.css',
//     fileOut: 'public/css/base-min-yui.css',
//     callback: function(err, min){
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using YUI Compressor for JS
// new compressor.minify({
//     type: 'yui-js',
//     fileIn: 'public/js/base.js',
//     fileOut: 'public/js-dist/base-min-yui.js',
//     callback: function(err, min){
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using UglifyJS for JS
// new compressor.minify({
//     type: 'uglifyjs',
//     fileIn: 'public/js/base.js',
//     fileOut: 'public/js-dist/base-onefile-uglify.js',
//     callback: function(err, min){
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using Sqwish for CSS
// new compressor.minify({
//     type: 'sqwish',
//     fileIn: ['public/css/base.css', 'public/css/base2.css'],
//     fileOut: 'public/css/base-min-sqwish.css',
//     callback: function(err, min){
//         console.log('Sqwish');
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using public folder option
// new compressor.minify({
//     type: 'yui-js',
//     publicFolder: 'public/js/',
//     fileIn: 'base.js',
//     fileOut: 'public/js-dist/base-min-yui-publicfolder.js',
//     callback: function(err, min){
//         console.log('YUI JS with publicFolder option');
//         console.log(err);
// //        console.log(min);
//     }
// });

// // Using Clean-css for CSS
new compressor.minify({
    type: 'clean-css',
    fileIn: 'public/css/**/*.css',
    fileOut: 'public/rocq.css',
    callback: function(err, min){
        console.log('Clean-css');
        console.log(err);
//        console.log(min);
    }
});