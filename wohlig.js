#!/usr/bin/env node

var program = require('commander');
var download = require('url-download');
var fs = require("fs");
var extract = require('extract-zip');
var del = require('delete');
var mv = require('mv');
var copyfiles = require('copyfiles');
// async



program
    .version('0.0.5')
    .option('-a, --angular [foldername]', 'Angular Frontend Framework')
    .option('-g, --generate [foldername]', 'Generate Frontend Framework')
    .parse(process.argv);

var i = 0;

function complete() {
    i++;
    if (i == 2) {
        console.log('Angular Frontend Framework is successfully installed');
    }
}

if (program.generate) {
    if (program.generate === true) {
        console.log("Please provide a name for the Controller and Service");
    } else {
        console.log("Copying the Content");

        var contoller = fs.readFileSync("lib/Controller.js");
        fs.writeFileSync("./api/controllers",controller);

        // fs.writeFile("", "Hey there!", function(err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });
    }
}

if (program.angular) {
    if (program.angular === true) {
        console.log("Please provide a Folder Name");
    } else {
        console.log('Downloading Angular Framework Frontend');
        download('https://github.com/WohligTechnology/AngularFrameworkFrontend/archive/master.zip', './')
            .on('close', function(err) {
                if (err) {
                    console.log("Error Downloading Angular Framework Frontend");
                    console.log(err);
                } else {
                    console.log("Downloading Completed");
                    extract("master.zip", {
                        dir: "./"
                    }, function(err) {
                        if (err) {
                            console.log("Error while Extracting");
                            console.log(err);
                        } else {
                            console.log("Completed Extraction");
                            mv('AngularFrameworkFrontend-master', program.angular, function(err) {
                                if (err) {
                                    console.log("Error Renaming the folder");
                                    console.log(err);
                                } else {
                                    complete();
                                }

                            });
                            del(['master.zip'], function(err) {
                                if (err) {
                                    console.log("Error Deleting the Zip");
                                    console.log(err);
                                } else {
                                    complete();
                                }
                            });
                        }
                    });
                }
            });
    }
}
