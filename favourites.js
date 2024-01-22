// Getting the HTML element representing the favorite superhero list
let favouritebarList = document.getElementById('favlistitem');

// Initializing an empty array to store favorite superhero IDs, and fetching it from local storage
let list = [];
list = JSON.parse(localStorage.getItem('favlistarr'));

// Function to fetch the updated list and load the details of each superhero
function fetching(list) {
    for (var i = 0; i < list.length; i++) {
        loadhero(list[i]);
    }
}

// Async function to load superhero details based on the ID
async function loadhero(heroid) {
    const URL = "https://www.superheroapi.com/api.php/3078862828893622/" + heroid.trim();
    console.log(URL);
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    if (data) {
        herolistdis(data);
    }
}

// Function to display the details of a superhero in the favorite list
function herolistdis(hero) {
    let herolistitem = document.createElement('div');
    herolistitem.innerHTML = "";
    herolistitem.innerHTML = `
        <div id="outerbox">
            <div id="innerbox">
                <img src="${hero.image.url}"  id="favlistimg">
            </div> 
            <H5>${hero.name}</H5>
            <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
        </div>
    `;
    favouritebarList.appendChild(herolistitem);
}

// Function to remove a superhero from the list
function remove(value) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
            list.splice(i, 1);
        }
    }
    localStorage.setItem('favlistarr', JSON.stringify(list));
    favouritebarList.innerHTML = ""; // Clearing the content of the favorite list
    fetching(list); // Fetching the updated list after removal
}

// Fetching and displaying the favorite superhero list on page load
fetching(list);
