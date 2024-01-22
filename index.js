// Logging a message to the console
console.log("Superhero Hunter");

// Getting DOM elements
let search = document.getElementById("search"); // Input field for searching superheroes
const ul = document.getElementById("auto-complete"); // List to display autocomplete suggestions

// Declaring arrays and variables
let hero = [];                 // Array to store superhero data
let favarray = [];             // Array to store favorite superheroes
var heroid = 0;                // Variable to store the current superhero ID
var favid = 0;                 // Variable to store the current favorite superhero ID

// Fetching data when the user types in the search input
search.onkeyup = function () {
  var searchname = search.value;                          // Getting the value from the search input
  if (searchname !== "") {                                // Checking if the search input is not empty
// Fetching data from the superhero API based on the search input
    fetch(
      "https://superheroapi.com/api.php/ 1577442289688409/search/" +
        searchname.trim()
    )
      .then((response) => response.json())                // Parsing the response as JSON
      .then((data) => {
        console.log(data);
// Function to display superhero names as suggestions
        function showhero() {
          var heronames = data.results;                  // Extracting superhero results from the data
          console.log(data.results);
          ul.innerText = " ";                            // Clearing the content of the autocomplete list
          for (var i of heronames) {
            var li = document.createElement("li");       // Creating a list item element
            li.innerHTML = i.name;                       // Setting the innerHTML of the list item
            li.id = i.id;                                // Setting the ID of the list item

            // Adding click event listener to the list item
            li.addEventListener("click", function () {
              heroid = this.id;                          // Setting the current superhero ID
              console.log(heroid + "this is id");
              loadDetails(heroid);                       // Loading details for the selected superhero
              ul.innerText = " ";                        // Clearing the autocomplete list
            });
            li.setAttribute("style", "display: block;"); // Removing the bullets from the list items
            ul.appendChild(li);                          // Appending the list item to the autocomplete list
          }
        }
        showhero();                                      // Calling the function to display superhero names
      })
      .catch((err) => console.log(err));                // Handling errors during the fetch
  }
};

// Function to display superhero details on the screen
function loadDetails(heroid) {
// Fetching details of a superhero based on the ID
  fetch(`https://superheroapi.com/api.php/ 1577442289688409/${heroid}`)
    .then((response) => response.json())                // Parsing the response as JSON
    .then((data) => {
      console.log(data);

      // Updating the style of the details container
      var details = document.getElementById('details');
      details.setAttribute("style","background-color:rgba(0,0,0,0.8);")

      // Updating the superhero image source
      var img = document.getElementById("img");
      img.setAttribute("src", data.image.url);

      // Updating the superhero name
      var name = document.getElementById("name");
      name.innerHTML = data.name;

      // Updating the superhero biography information
      var bio = document.getElementById("bio");
      bio.innerHTML = " Relatives :" +  data.connections.relatives ;

      // Updating the superhero alignment information
      var good = document.getElementById("good");
      good.innerText = "Nature :" + data.biography.alignment;

      // Updating the superhero work information
      var base = document.getElementById("base");
      base.innerHTML = "Work :" + data.work.base;

      // Updating the superhero occupation information
      var occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation :" + data.work.occupation;

      // Updating the superhero power statistics
      var powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence : " +
        data.powerstats.intelligence +
        ", Combat : " +
        data.powerstats.combat +
        ", Power : " +
        data.powerstats.power +
        ", Speed : " +
        data.powerstats.speed +
        ", Strength : " +
        data.powerstats.strength;

      // Updating the style and value of the favorite button
      var favv= document.getElementById("favbtn");
      favv.setAttribute("style","display:flex;");
      favv.setAttribute('value',data.id)

    })
    .catch((error) => console.log(error)); // Handling errors during the fetch
}

// Function to push data to favarray and set it into local storage
function favpush (favid){ 
  console.log(favid);
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
}
  favarray.push(favid);
  console.log(favarray);
  localStorage.setItem('favlistarr', JSON.stringify(favarray)); // Storing favarray in local storage
}
