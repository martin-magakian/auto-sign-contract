#! /usr/bin/env node
var PDFImage = require("pdf-image").PDFImage;
var gm = require('gm');
var path = require('path');
var Promise = require("es6-promise").Promise;
var fs = require('fs');

var argv = require('yargs')
    .demand(['pdf', 'signature', 'initials'])
    .default('signature', __dirname+'/img/signature.png')
    .default('initials', __dirname+'/img/initials.png')
    .describe('pdf', '/path/to/pdf_to_sign.pdf')
    .describe('signature', '**FULL** path to signature.png')
    .describe('initials', '**FULL** path to initials.png')
    .example('$0 --pdf /path/to/pdf_to_sign.pdf')
    .example('$0 --pdf /path/to/pdf_to_sign.pdf --signature /path/to/signature.png --initials /path/to/initials.png')
    .argv;

var pdfImage = new PDFImage(argv.pdf);
pdfImage.setConvertOptions(["-density", "400", "-colorspace", "RGB", "-resize", "2331"]);




var page2 = function (imagePath1) {
  console.log("[Create] - TMP page 1");
  var signeAction = function(imagePath2) {
    console.log("[Create] - TMP page 2");
    addSingatureAndInitial(imagePath1, imagePath2);
  };
  pdfImage.convertPage(1).then(signeAction,signeAction);
}


pdfImage.convertPage(0).then(page2, page2);


function addSingatureAndInitial(page1, page2){
  var page1Final = page1.replace(/\.[^/.]+$/, "") + ".jpg";
  var page2Final = page2.replace(/\.[^/.]+$/, "") + ".jpg";

  var promise = new Promise(function (resolve, reject) {
    // signe + initials -> page1
    gm().in('-page','+0+0')
        .in(page1)
        .in('-page','+1650+2300')
        .in(argv.signature)
        .in('-page','+1650+3000')
        .in(argv.initials)
        .mosaic()
        .write(page1Final, function(err){
            if (!err){
              console.log("[SIGNE] - page 1");
              resolve();
            } else {
              reject(err);
            }
        });
    }).then(() => {
      return new Promise(function (resolve, reject) {
        // initials -> page2
        gm().in('-page','+0+0')
            .in(page2)
            .in('-page','+1750+3000')
            .in(argv.initials)
            .mosaic()
            .write(page2Final, function(err){
                if (!err){
                  console.log("[SIGNE] - page 2");
                  resolve();
                } else {
                  reject();
                }
            });
        });
    }).then(()=>{
      console.log("[DELETE] - TMP page 1");
      fs.unlinkSync(process.cwd()+"/"+page1);
      console.log("[DELETE] - TMP page 2");
      fs.unlinkSync(process.cwd()+"/"+page2);
      console.log("done...");
    }).catch((err) => {
      console.log(err);
    });

  /*
  gm().in('-page','+0+0')
      .in(page1)
      .in('-page','+1650+2300')
      .in(argv.signature)
      .in('-page','+1650+3000')
      .in(argv.initials)
      .mosaic()
      .write(page1Final, function(err){
          if (!err){
            console.log("ok");
          } else {
            console.log(err);
          }
      });

  gm().in('-page','+0+0')
      .in(page2)
      .in('-page','+1750+3000')
      .in(argv.initials)
      .mosaic()
      .write(page2Final, function(err){
          if (!err){
            console.log("ok");
          } else {
            console.log(err);
          }
      });*/
}

function deletePagePromise(pageToDelete){
  console.log(pageToDelete);
  return new Promise(function (resolve, reject) {
    
    //resolve();
  });
}

/*
var h = pdfImage.numberOfPages().then(function(number){
  console.log(number);
  console.log("ok");


  gm('/path/to/image.jpg')
    .resize(353, 257)
    .autoOrient()
    .write(writeStream, function (err) {
      if (!err){
        console.log(' hooray! ');
      }
    });

}, function(err) {
  console.log(err);
  console.log("ko");
});*/
