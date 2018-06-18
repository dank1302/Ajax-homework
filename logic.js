var topics=['Thor', 'Captain America', 'Spiderman', 'Ironman', 'Hulk', 'Starlord', 'Hawkeye', 'Black Widow', 'Drax the Destroyer', 'Gamora'];
var currentGif; var pausedGif; var movingGif; var stillGif;

function buttons(){
    $('#avengersButtons').empty();
    for (var i = 0;i < topics.length;i++){
     var newButton = $('<button>').text(topics[i]).addClass('newButton').attr({'data-name': topics[i]});
     $(`#avengersButtons`).append(newButton);
    }
    $('.newButton').on('click',function(){
        $('#avengers').empty()

        var movies = $(this).data('name');
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=movies+" + movies + "&limit=10&api_key=uOr94PTw9a3dedUBzCCMM4JZ5zopmDc4";
        $.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
    }

    var rating = $('<h6>').html('Rated: '+thisRating).addClass('rating');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnClick');
				var gif = $('<button>').append(rating, stillGif);
                $('#avengers').append(gif);
                
        });
    });
});
}


$('#addAvenger').on('click', function(){
var newAvenger = $('#avengers-input').val().trim();
movies.push(newAvenger);
buttons();
return false;
});

buttons();
