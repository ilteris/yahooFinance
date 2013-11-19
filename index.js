var request     = require('request');
var cheerio     = require('cheerio');
var ticker  = process.argv[2];
var yUrl    = "http://finance.yahoo.com/q/op?s=" + ticker;
//grab all the options symbols
//and query them one by one in a queue
//return the data
//crond this every 10 minutes
//save it in a db
//

var financeDetails = new Array();
var keyStr = new Array();
request(yUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
 
    // the keys - We get them from a certain class attribute
    var td = $('.yfnc_tablehead1');
    $(td).each(function(j, val) {
      keyStr[j] = $(val).text();
    });
 
    // the values
    var tData = $('.yfnc_tabledata1');
    $(tData).each(function(j, val) {
      financeDetails[j] = $(val).text();
    });
 
    // Let's do something with the data we have
    for (var i=0; i < financeDetails.length; i++) {
      console.log (i + ") " + keyStr[i] + " " + financeDetails[i]);
    }

    }
});
