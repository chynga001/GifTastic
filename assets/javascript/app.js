$(document).ready(function () {
    var movies = ["New York", "Miami", "Baltimore","Chicago" ];
	var movie = [];
	// Add buttons for original movies array
	function renderButtons() {
		$("#movie-buttons").empty();
		// for (i = 0; i < movies.length; i++) {
		// 	$("#movie-buttons").append("<button class='btn btn-success' data-movie=" + movies[i] + ">" + movies[i] + "</button>");
        // }
        for (var i = 0; i < movies.length; i++){
            // dynamically makes buttons for every show in the array
            var a = $('<button>') 
            a.addClass('movie'); // add a class
            a.attr('data-movie', movies[i]); // add a data-attribute
			a.text(movies[i]); // make button text
			movie.push(a);
            $('#movie-buttons').append(a); // append the button to buttonsView div
        }
        
	}

	renderButtons();

	// Adding a button for movie entered
	$("#add-movie").on("click", function (event) {
		event.preventDefault();
		// console.log(event)
		movie = $("#movie-input").val().trim();
		var b = $('<button>') 
		b.addClass('movie'); // add a class
		b.attr('data-movie', movie); // add a data-attribute
		b.text(movie); // make button text
		// movie.push(a);
		$('#movie-buttons').append(b);
		// movies.push(movie);
		// $('#movie-buttons').append(movie);
		// renderButtons();
		// return;
	});


	// Getting gifs from api... onto html
	$("#movie-buttons").on("click", function (event) {
		console.log(event)
		var movie = $(event.target).attr("data-movie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=VUyrDCYI9BaLHto1DiocGfqlbwnrEHny&limit=10"
            // VUyrDCYI9BaLHto1DiocGfqlbwnrEHny

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			var results = response.data;
			$("#movies").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $('<div style="float:left;" width="" >' );
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");

				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
				$("#movies").append(movieDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	
	$(document).on("click", ".gif", changeState);

});







