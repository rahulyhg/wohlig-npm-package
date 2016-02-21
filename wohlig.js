#!/usr/bin/env node

var program = require('commander');
var Download = require('download');
var extract = require('extract-zip');
var del = require('delete');
var mv = require('mv');
// async



program
  .version('0.0.1')
  .option('-a, --angular [foldername]', 'Angular Frontend Framework')
  .parse(process.argv);

var i = 0;

function complete() {
  i++;
  if (i == 2) {
    console.log('Angular Frontend Framework is successfully installed');
  }
}


if (program.angular) {
  if (program.angular === true) {
    console.log("Please provide a Folder Name");
  } else {
    console.log('Downloading Angular Framework Frontend');
    new Download({
        mode: '755'
      })
      .get('https://github.com/WohligTechnology/AngularFrameworkFrontend/archive/master.zip')
      .dest('./')
      .run(function(err) {
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
