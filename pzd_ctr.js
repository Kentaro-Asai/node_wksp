/*
 cd C:\Users\kent\Documents\YUF-4G-WH\wksp
 node pzd_ctr.js
*/
var flnm2 = "pazd_clon.js";
var sleep = require('sleep-async')();
var fs = require('fs');

var ar = require('./pazd_clon_import.js');
var mns_no = ar.mnsNo();

var func = require('./pazd_clon.js');


main_ctr(0);
function main_ctr(num){
	var str = func.pazd_clon(mns_no[num]);
	sleep.sleep(3000, function(){
		/*
		console.log(str);
		fs.appendFile('writetest.txt', str,'utf8', function (err) {
			 if (mns_no.length > num + 1) {
			 	//再帰関数
			 	return main_ctr(num + 1);
			 } else {
			 	console.log("it's end.");
			 }
		});
		*/
		if (mns_no.length > num + 1) {
		 	//再帰関数
		 	return main_ctr(num + 1);
		 } else {
		 	console.log("it's end.");
		 }
	});
}