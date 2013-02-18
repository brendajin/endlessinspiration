//grab words from curated JSON file
$.ajax({type: "GET",
	url: "words.json",
	dataType: "json",
	success: function(mainword) {
		var start = Math.floor(Math.random()*mainword.syn.length);
		
		document.getElementById('mainword').innerHTML = mainword.syn[start].toUpperCase();
	}
});



//flickr search API
//http://www.flickr.com/search/?q=animal+OR+landscape&l=deriv&ss=0&ct=0&mt=photos&w=all&adv=1
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	{
		tags: "animal,landscape,cute,bleak",
		tagmode: "any",
		format: "json",
		license: "7",
		privacy_filter: "1",
		safe_search: "1",
		content_type: "1",
		media: "photos",
		per_page:"10",
		page: "1",
	},

	function(data) {
		console.log(Math.floor(Math.random()*10));
		document.getElementById('inspireimg').src = data.items[Math.floor(Math.random()*10)].media.m.replace("_m.jpg","_b.jpg");
	});



//Twitter search API
function onLoad(json) {
	var results = json.results;
	var tweetsArray = [];

	// for (var i = 0; i < results.length;i++){
	// 	if (results[i].text.indexOf("@") == -1 && results[i].text.indexOf("#") == -1 && results[i].text.indexOf("://") == -1 &&results[i].text.indexOf("\"") == -1) {
	// 		document.getElementById('posterText').innerHTML = results[i].text;
	// 	}
	// }

	for (var i =0; i < results.length; i++) {
		if (results[i].text.indexOf("@") == -1 && results[i].text.indexOf("#") == -1 && results[i].text.indexOf("://") == -1 && results[i].text.indexOf("\"") == -1) {
			console.log(results[i].text);
			tweetsArray.push(String(results[i].text));
		}
	}
	document.getElementById('posterText').innerHTML = tweetsArray[Math.floor(Math.random()*tweetsArray.length)];
}

function fetchJSON(query) {
	var script = document.createElement('script');
	//%20%3A results in positive sentiment
	script.src = 'http://search.twitter.com/search.json?q=' + query + '&page=1&rpp=20&callback=onLoad&lang=en&truncated=false&possibly_sensitive=false%20%3A)';
	document.getElementsByTagName('body')[0].appendChild(script);
}

fetchJSON("haiku OR nature OR water OR bridge OR STONE or rock OR volcano OR reach OR try OR never OR always OR forever OR sometimes OR fire OR earth OR wind");