$(document).ready(function() {

	//Created an array with the starting elements (buttons)
	var cartoons = ["dragon ball", "captain tsubasa", "the simpsons"];
	//created a function that creates buttons for each of the items in the array
	function createButton(){
				//make sure we delete previous buttons when we create new ones so that they dont keep duplicating
		$("#buttons-container").empty();
		//for loop to loop through the array of cartoons and create a button for each of them
		for (var i = 0; i < cartoons.length; i++){
			// console.log(cartoons[i]);
			//assign the variable of button to the buttons being created
			var button = $("<button>");
			//added a class of choices to the buttons
			button.addClass("choices")
			//added the text from the array to the buttons
			button.text(cartoons[i]);
			//preppend the buttons to the div of button-container
			$("#buttons-container").prepend(button)
		}
	}
	//called the createButton function
	createButton();

	$("#buttons-container").on("click", ".choices", function(){
		//empty the pictures-container everytime we add new pictures
		$("#pictures-container").empty();
		// console.log("button clicked");
		// console.log($(this).text())
		//grab a hold of the button we clicked on and store it in a variable called selectedButton
		var selectedButton = $(this).text();
		//console.log(selectedButton);

		// base api endpoint url for searching for a string in giphy 
		var baseURL = "https://api.giphy.com/v1/gifs/search?q="
		// the limit for the items we are asking for
		var limit = "&limit=10"
		var apiKey = "&api_key=dc6zaTOxFJmzC"
		/* here we are addind together our baseURL with our search string (seletedButtoon value),the limit to how many items we are getting back from our search and our API key creddentials which we store separately to keep it private */
		var queryURL = baseURL+selectedButton+limit+apiKey;
		//console.log(queryURL);
		//this is a new method to get a json request
		$.get( queryURL, function(response) {
		  //console.log(response.data);
		  //got the data response from the jason called and stored it in a variable called results
		  var results = response.data;
		  //created a for loop to loop through all the results(10)
		  for (var i = 0; i < results.length; i++) {
		  	// console.log(results[i].rating);
		  	// console.log(results[i].images.original_still);
		  	// console.log(results[i].images.original.url);
		  	//created a new div and stored it in a variable called imageWrapper
		  	var imageWrapper = $("<div>")
		  	//added the class of wrap to the imageWrapper div we created
		  	imageWrapper.addClass("wrap");
		  	//created an image tag and stored it in a variable called images
		  	var images = $("<img>");
		  	//gave the images tag the 'alt' attibute of the selected buttom plus i (name of the button)
		  	images.attr("alt", selectedButton+i);
		  	//gave the images tag the 'data-stil' of the stil image url from the results
		  	images.attr("data-still", results[i].images.original_still.url);
		  	//gave the images tag the 'data-animate' of the original image url from the results
		  	images.attr("data-animate", results[i].images.original.url);
		  	//gave the images tag the attributes of data-state and still
		  	images.attr("data-state","still");
		  	//gave the images tag the 'src' attribute  of the stil image url from the results
		  	images.attr("src", results[i].images.original_still.url);
		  	//created a new h4 tag and stored it in a variable called rating
		  	var rating = $("<h4>");
		  	//added the text rated; plus the results rating to the rating tag
		  	rating.text("rated: "+results[i].rating);
		  	//appended the images and rating variables to the imageWrapper
		  	$(imageWrapper).append(images, rating);
		  	//appended the imageWrapper to the pictures-container div of the html
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
		// console.log(currentState);

		if (currentState === "still") {
			// console.log("helloooo");
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
