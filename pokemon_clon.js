//exports.pazd_clon = function (mns_no){

var fs = require('fs');

//Initialize instance
var request = require("request");
var cheerio = require("cheerio");
//var Iconv = require('iconv').Iconv;
var iconv = require('iconv-lite');

// Define request url
let mns_no = 72;
var requestUrl = "https://yakkun.com/sm/zukan/n" + mns_no;

// Send http request
request({url: requestUrl, encoding: null}, function(error, response, body) {
	// If request succeed
	if (!error && response.statusCode == 200) {
		//let iconv = new Iconv('EUC-JP', 'UTF-8//TRANSLIT//IGNORE');
		//body = iconv.convert(body).toString();
		var buf = new Buffer(body, 'binary');
		body = iconv.decode(buf, "EUC-JP"); 
		$ = cheerio.load(body); // Create cheerio instance
		// Get response data
		var url = response.request.href;
		console.log(body);
		let rtn = extractParam($('table'), mns_no);
		fileSave("pokemon.txt", body);
		/*
		var mns_nm = $('h2').text().substr($('h2').text().search(" ")+1);
		zk = {'main':0, 'sub':0};
		var zk = getAttr($('.mb-2 > i'));
		var type = $('.icon-mtype > a');
		var type_str = "";
		var type_ary = [];
		for (var i = 0; i < type.length; i++) {
			type_ary.push(getType(type[i].attribs['href']));
			type_str += "'" + getType(type[i].attribs['href']) + "', ";
		}
		type_str = type_str.substr(0, type_str.length - 2)
		//console.log(type_str);
		var hp = $('.table-monster-status > tr')[1].children[2].children[0]['data'];
		var atk = $('.table-monster-status > tr')[1].children[3].children[0]['data'];
		var re = $('.table-monster-status > tr')[1].children[4].children[0]['data'];
		hp = delComma(hp);
		atk = delComma(atk);
		re = delComma(re);
		//console.log(hp+" "+ atk +" "+ re);
		var hs_aw = $('.list-kakusei-skill-desc > li > a');
		var aw = '';
		aw = getAwStr(hs_aw);
		var rtn = mns_no + ":{'nm':'"+mns_nm+"','main':"+zk['main']+",'sub':"+zk['sub']+",'type':["+type_str+"],'hp':"+hp+",'atk':"+atk+",'re':"+re+",'aw':{"+aw+"}},\r\n";
		console.log(rtn);

		//return rtn;

		fs.appendFile('writetest.txt', rtn,'utf8', function (err) {
		 	//再帰関数
		 	return rtn;
		});
*/
		
		// If error occured
	} else {
		console.log("--------------------------------------------------");
		if (error && "code" in error) {
			console.log("Error Code:" + error.code);
		}
		if (error && "errno" in error) {
			console.log("Error No:" + error.errno);
		}
		if (error && "syscall" in error) {
			console.log("Error Syscall:" + error.syscall);
		}
		if (response && "statusCode" in response) {
			console.log("Status Code:" +  response.statusCode);
		}
	}
});

function extractParam(tbls, mns_no){
	for(let i in tbls){
		console.log(i, tbls[i]);
	}
	return {};
};

function getAttr(atr){
	var rtn = {'main':0, 'sub':0};
	var zk = 0;
	for (var i=0; i < atr.length; i++) {
		if (atr[i].attribs['class'] === 'icon-attr-fire') {
			zk = 1;
		} else if (atr[i].attribs['class'] === 'icon-attr-water') {
			zk = 2;
		} else if (atr[i].attribs['class'] === 'icon-attr-wood') {
			zk = 3;
		} else if (atr[i].attribs['class'] === 'icon-attr-light') {
			zk = 4;
		} else if (atr[i].attribs['class'] === 'icon-attr-dark') {
			zk = 5;
		}
		if (i === 0) rtn['main'] = zk;
		else rtn['sub'] = zk;
	}

	return rtn;
};

function getType(type){
	return type.substr(1);
};

function delComma(status){
	return status.replace(',', '');
};

function fileSave(file_name, str){
	fs.writeFile(file_name, str, function(err){
	  if(err){
			throw err;
		}
	});
	return true;
};

//}