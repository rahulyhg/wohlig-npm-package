#!/usr/bin/env node

//all dependencies
var _ = require('lodash');
var program = require('commander');
var chalk = require('chalk');
var async = require('async');
var fs = require("fs");
var del = require('delete');
var mv = require('mv');
var download = require('download-file');
var downloadGit = require('download-github-repo');

//colored console
global.blue = function (data) {
    console.log(chalk.blue(data));
};
global.red = function (data) {
    console.log(chalk.red(data));
};
global.green = function (data) {
    console.log(chalk.green(data));
};
global.log = function (data) {
    console.log(data);
};



program
    .version('0.0.17')
    .option('-n, --new [foldername]', 'Generate New  Framework')
    .option('-g, --generate [foldername]', 'Generate Frontend Framework')
    .parse(process.argv);



if (program.generate) {

    if (program.generate === true) {
        console.log("Please provide a name for the Controller and Service");
    } else {
        console.log("Copying the Content");
        var apiName = _.upperFirst(program.generate);

        var controller = fs.readFileSync(__dirname + "/lib/Controller.js");
        fs.exists('api/controllers', function (isExist) {
            if (isExist) {
                controller = _.replace(controller, new RegExp('NewController', "g"), apiName);
                var write = fs.writeFileSync("api/controllers/" + apiName + "Controller.js", controller);
                console.log("Controller " + apiName + " Generated");
            } else {
                console.log("Controller Folder not found");

            }

        });

        var service = fs.readFileSync(__dirname + "/lib/Service.js");
        fs.exists('./api/services', function (isExist) {
            if (isExist) {
                service = _.replace(service, new RegExp('NewService', "g"), apiName);
                var write = fs.writeFileSync("api/services/" + apiName + ".js", service);
                console.log("Service " + apiName + " Generated");
            } else {
                console.log("Service Folder not found");
            }

        });


    }
}

if (program.new) {
    if (program.new === true) {
        red("Please provide a Folder Name");
    } else {
        var folderName = program.new;
        async.waterfall([
            function (callback) { // Downloading file 
                console.log("Downloading from Github");
                downloadGit("WohligTechnology/nodeFramework", folderName, callback);
            }
        ], function (err) {
            if (err) {
                red("Error Occured ");
                console.error(err);
            } else {
                green("Your New New Framework is Ready in Folder " + folderName);
            }
        });
    }
}