    
  // Initial array of reactions
var reactions = ["good luck", "positivity", "shrug", "fingers crossed"];
var gifViewer = $("#reaction-view");

  // Function for displaying reaction data
  function renderButtons() {

    // Deleting the reaction buttons prior to adding new reaction buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of reactions
    for (var i = 0; i < reactions.length; i++) {

      // Then dynamicaly generating buttons for each reaction in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("reaction");
      // Adding a data-attribute with a value of the reaction at index i
      a.attr("data-name", reactions[i]);
      // Providing the button's text with a value of the reaction at index i
      a.text(reactions[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-reaction").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var reaction = $("#reaction-input").val().trim();
    // The reaction from the textbox is then added to our array
    reactions.push(reaction);

    console.log(reactions);
    // calling renderButtons which handles the processing of our reaction array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of reactions


  function displayReactionGifs(){

    var reaction = $(this).attr("data-name");
    var APIKey = "FAJScj5piDVt2TzZdC1hgKns1BADzvK4";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + reaction + "&limit=10&offset=0&lang=en";

    console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response.data);
        var currentGifs = response.data;
        renderGifs(currentGifs);

    });
  }

   function renderGifs (data){
     html = "";

    for (i = 0; i < data.length; i++) {
       html += "<img src=" 
       + data[i].images.fixed_width.url 
       + " style=\"width:200px;height:230px;padding:5px\">"
       + "<p>"
       + data[i].rating
       + "</p>"
    }

    gifViewer.html(html);
   }

  $(document).on("click", ".reaction", displayReactionGifs);


  renderButtons();

  