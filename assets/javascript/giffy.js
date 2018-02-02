$(document).ready(function() {


	var cartoons = ["dragon ball", "captain tsubasa", "the simpsons"];

	function createButton(){
		$("#buttons-container").empty();
		for (var i = 0; i < cartoons.length; i++){
			// console.log(cartoons[i]);
			var button = $("<button>");
			button.addClass("choices")
			button.text(cartoons[i]);
			$("#buttons-container").prepend(button)
		}
	}
	createButton();

	$("#buttons-container").on("click", ".choices", function(){
		$("#pictures-container").empty();
		//console.log("button clicked");
		// console.log($(this).text())
		var selectedButton = $(this).text();
		//console.log(selectedButton);

		// base api endpoint url for searching for a string in giphy 
		var baseURL = "http://api.giphy.com/v1/gifs/search?q="
		// the limit for the items we are asking for
		var limit = "&limit=10"
		/* here we are addind together our baseURL with our search string (seletedButtoon value),the limit to how many items we are getting back from our search and our API key creddentials which we store separately to keep it private */
		var queryURL = baseURL+selectedButton+limit+apiKey;
		//console.log(queryURL);
		$.get( queryURL, function(response) {
		  //console.log(response.data);
		  var results = response.data;
		  for (var i = 0; i < results.length; i++) {
		  	// console.log(results[i].rating);
		  	// console.log(results[i].images.original_still);
		  	// console.log(results[i].images.original.url);
		  	var imageWrapper = $("<div>")
		  	imageWrapper.addClass("wrap");
		  	var images = $("<img>");
		  	images.attr("alt", selectedButton+i);
		  	images.attr("data-still", results[i].images.original_still.url);
		  	images.attr("data-animate", results[i].images.original.url);
		  	images.attr("data-state","still");
		  	images.attr("src", results[i].images.original_still.url);
		  	var rating = $("<h4>");
		  	rating.text("rated: "+results[i].rating);
		  	$(imageWrapper).append(images, rating);
		  	$("#pictures-container").append(imageWrapper);
		  }

		});
	});
	// create an input and get the value 
	//event.preventDefault();
	$("#submit").on("click", function(event){
		event.preventDefault();

		var newCartoon = ($("#cartoon-input").val().trim());
		newCartoon = newCartoon.toLowerCase();
		// console.log(newCartoon)
		// console.log(cartoons.indexOf(newCartoon));
		// dont add doubles to array
		if (cartoons.indexOf(newCartoon) === -1){
			cartoons.push(newCartoon)
		}else {
			$("#alert").text("cartoon already added! try another.");
		}
		createButton();
		$("#cartoon-input").val("");
	}); 

	$("#pictures-container").on("click", "img", function(){
		//console.log($(this).attr("data-state"));
		var currentState = $(this).attr("data-state");
		console.log(currentState);

		if (currentState === "still") {
			console.log("helloooo");
			// change the image souce to be the not still image 
			$(this).attr("src", $(this).attr("data-animate"));
			// update the state
			$(this).attr("data-state", "moving")
		}
		else {
			// console.log("ooo nooooo");
			$(this).attr("src", $(this).attr("data-still"));
			// update the state
			$(this).attr("data-state", "still")
			// change the image to the still image
			//$(this)
			// update the state
		}
	});
	// logic for clicking to animate and make still again
	// on click get the button we clicked √
	// get its data-state value √
	// check if it is moving or still √
	// change the image accordingly

});