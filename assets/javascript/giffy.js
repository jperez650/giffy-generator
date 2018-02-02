$(document).ready(function() {


	var cartoons = ["Dragon Ball", "Captain Tsubasa", "The Simpsons"];

	function createButton(){
		for (var i = 0; i < cartoons.length; i++){
			// console.log(cartoons[i]);
			var button = $("<button>");
			button.addClass("choices")
			button.text(cartoons[i]);
			$("#buttons-container").prepend(button)
		}
	}
	createButton()
	// %20
	$("#buttons-container").on("click", ".choices", function(){
		//console.log("button clicked");
		// console.log($(this).text())
		var selectedButton = $(this).text();
		console.log(selectedButton);
		var baseURL = "http://api.giphy.com/v1/gifs/search?q="
		var limit = "&limit=10"
		var queryURL = baseURL+selectedButton+limit+apiKey;
		console.log(queryURL);
		//http://api.giphy.com/v1/gifs/search?q=cats&api_key=WREXec1W9jT7Dk4N5G3KIH0F3zaTF4Gj
	});

});