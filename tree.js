const fs = require('fs');
const os = require('os');
const path = require('path');

var dirDef = path.normalize(os.homedir() + '/' + 'node_modules');
var dir = process.argv[2] ? process.argv[2] : dirDef;

var results = {
    'FolderS': [],
    'FileS': [],
};

var tree = function(dir, done) {

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = dir + '\/' + file;
            fs.stat(file, function(err, stats) {
                if (stats.isDirectory()) {
                    tree(file, function(err, res) {
                        results.FolderS.push(path.normalize(file));
                        next();
                    });
                } else {
                    results.FileS.push(path.normalize(file));
                    next();
                }
            });
        })();
    });
};

//////////////////////////////////////////

tree(dir, function(err, results) {
    if (err) throw err;
    console.log(dir, results);
});