exports.pazd_clon = function (mns_no){

var fs = require('fs');

//Initialize instance
var request = require("request");
var cheerio = require("cheerio");

// Define request url
var requestUrl = "http://pd.appbank.net/m" + mns_no;

// Send http request
request({url: requestUrl}, function(error, response, body) {
	// If request succeed
	if (!error && response.statusCode == 200) {
		$ = cheerio.load(body); // Create cheerio instance
		// Get response data
		var url = response.request.href;

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

function getAwStr(aw){
	var aw_ary = {
		'2way':0, 'hi':0, 'mz':0, 'ki':0, 'hk':0, 'ym':0, 'ht':0,
	    'hir':0, 'mzr':0, 'kir':0, 'hkr':0, 'ymr':0,
	    'hp':0, 'atk':0, 'kaihuku':0, 're':0,
	    'hidec':0, 'mzdec':0, 'kidec':0, 'hkdec':0, 'ymdec':0,
	    'birs':0, 'gls':0, 'jm':0, 'dk':0, 'bire':0,
	    'skb':0, 'huin':0, 'yb':0,
	    'mlb':0, 'kilr':0, 'cmbs':0, 'brk':0, 'add':0, 'tmHP':0, 'tmRE':0,
		'noDmg':0
	};
	var aw_str = '';

	for (var i=0; i < aw.length; i++) {
		switch (aw[i].attribs['href'].substr(9)){ // '/kakusei/27'
			case '1': 
				aw_ary.hp += 1;
				break;
			case '2': 
				aw_ary.atk += 1;
				break;
			case '3': 
				aw_ary.kaihuku += 1;
				break;
			case '4': 
				aw_ary.hidec += 1;
				break;
			case '5': 
				aw_ary.mzdec += 1;
				break;
			case '6': 
				aw_ary.kidec += 1;
				break;
			case '7': 
				aw_ary.hkdec += 1;
				break;
			case '8': 
				aw_ary.ymdec += 1;
				break;
			case '9': 
				aw_ary.re += 1;
				break;
			case '10': // bind resistance
				aw_ary.birs += 1;
				break;
			case '11': 
				aw_ary.gls += 1;
				break;
			case '12': 
				aw_ary.jm += 1;
				break;
			case '13': 
				aw_ary.dk += 1;
				break;
			case '14': 
				aw_ary.hi += 1;
				break;
			case '15': 
				aw_ary.mz += 1;
				break;
			case '16': 
				aw_ary.ki += 1;
				break;
			case '17': 
				aw_ary.hk += 1;
				break;
			case '18': 
				aw_ary.ym += 1;
				break;
			case '19': 
				aw_ary.yb += 1;
				break;
			case '20':  // bind recover
				aw_ary.bire += 1;
				break;
			case '21': 
				aw_ary.skb += 1;
				break;
			case '22': 
				aw_ary.hir += 1;
				break;
			case '23': 
				aw_ary.mzr += 1;
				break;
			case '24': 
				aw_ary.kir += 1;
				break;
			case '25': 
				aw_ary.hkr += 1;
				break;
			case '26': 
				aw_ary.ymr += 1;
				break;
			case '27': 
				aw_ary['2way'] += 1;
				break;
/*
			case '28': 
				aw_ary.ym += 1;
				break;
*/
			case '29': 
				aw_ary.huin += 1;
				break;
			case '30':
				aw_ary.ht += 1;
				break;
			case '31': 
				aw_ary.mlb += 1;
				break;
			case '44':
				aw_ary.cmbs += 1;
				break;
			case '45': 
				aw_ary.brk += 1;
				break;
			case '46': 
				aw_ary.add += 1;
				break;
			case '47': 
				aw_ary.tmHP += 1;
				break;
			case '48': 
				aw_ary.tmRE += 1;
				break;
			case '49':
				aw_ary.noDmg += 1;
				break;
			default : 
				aw_ary.kilr += 1;
				break;
		}
	}

	for (var k in aw_ary) {
		if (aw_ary[k] > 0) {
			aw_str += "'" + k + "': " + aw_ary[k] + ", ";
		}
	}
	aw_str = aw_str.substr(0, aw_str.length - 2);

	return aw_str;
};

}