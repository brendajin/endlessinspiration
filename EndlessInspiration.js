var imagesReady, wordsReady, tweetsReady;

var onRequestFinished = function(){
  if(imagesReady && wordsReady && tweetsReady){
    allReady();
  }
};

var allReady = function(){
  makeNewPoster();
};

var makeNewPoster = function() {
	var randomNumber = Math.floor(Math.random() * 20);
	$('#mainword').html(words[randomNumber]);
	$('#inspireimg').attr('src', images[randomNumber].media.m.replace("_m.jpg","_b.jpg"));
	$('#posterText').html(tweets[randomNumber]);
};



$.ajax({
	type: "GET",
	url: "words.json",
	dataType: "json",
	success: function(words) {
		window.words = words;
		wordsReady = true;
		onRequestFinished();
	}
});

// todo: get the two question marks out of this url
// todo: move the jsoncallback param into the data hash
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
	tags: "animal,landscape,cute,bleak",
	tagmode: "any",
	format: "json",
	license: "7",
	privacy_filter: "1",
	safe_search: "1",
	content_type: "1",
	media: "photos",
	per_page:"60",
	page: "1"
}, function(data) {
	window.images = data.items;
	imagesReady = true;
	onRequestFinished();
});


$.ajax({
	url: "http://search.twitter.com/search.json?",
	type: "GET",
	dataType: "jsonp",
	data: { 'q': "haiku OR nature OR water OR bridge OR STONE OR rock OR volcano OR reach OR try OR never OR always OR forever OR sometimes OR fire OR earth OR wind",
		'sensitive': false,
		'truncated': false,
		'lang': 'en',
		'possibly_sensitive': false,
		'page': 1,
		'rpp': 100},
	success: function(json) {
		var results = json.results;

		window.tweets = [];
		for (var i =0; i < results.length; i++) {
			if (results[i].text.indexOf("@") == -1 && results[i].text.indexOf("#") == -1 && results[i].text.indexOf("://") == -1 && results[i].text.indexOf("\"") == -1) {
				tweets.push(results[i].text.toUpperCase());
			}
		}
	tweetsReady = true;
	onRequestFinished();
	}
});



setInterval(function(){
  makeNewPoster();
}, 15000);
