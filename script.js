/////////////////////////////////////////////////
// SELECT ELEMENTS
/////////////////////////////////////////////////
const search = document.getElementById('search'),
    homeDisplay = document.getElementById('homeDisplay'),
    home = document.getElementById('home'),
    curry = document.getElementById('curry'),
    soup = document.getElementById('soup'),
    pie = document.getElementById('pie'),
    submit = document.getElementById('submit'),
    weekly = document.getElementById('weekly'),
    random = document.getElementById('random'),
    mealsElement = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealElement = document.getElementById('single-meal');


/////////////////////////////////////////////////
// SEARCHING
/////////////////////////////////////////////////
//search meal and fetch from api
const searchMeal = (e) => {
    //prevent default of submit
    e.preventDefault();
    //clear single meal upon researching
    singleMealElement.innerHTML = '';
    // store what is searched into a variable
    const searchedTerm = search.value;
    //return searched term barring white space
    if (searchedTerm.trim()) {
        //fetch the api interpolate the searchedterm
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedTerm}`)
            .then(res => res.json())
            .then(data => {
                homeDisplay.innerHTML = ''; //hides home display
                // console.log(data);
                resultHeading.innerHTML = `<h2 style="text-align: center">Search results for <b>'${searchedTerm}'</b>:</h2>`
                //if meal found/not found
                if (data.meals === null || data.meals === '') {
                    resultHeading.innerHTML = `<p style="text-align: center;"><b>${searchedTerm}</b> is not found try searching for something else</p>`
                } else {
                    //map through the meals Elements
                    mealsElement.innerHTML = data.meals.map(meal => `
                    <div class="card meals" style="text-align: center">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body meal-info" data-mealID="${meal.idMeal}">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">${meal.strArea}</li>
                    </ul>
                    <a href="${meal.strYoutube}" class="btn btn-primary">Check out the Tutorial</a>
                    </div>
                    </div>
                    `)
                        //to make it display as a string since we looped through an array
                        .join('');
                }
            });
        //clear search text
        search.value = '';

    } else {
        alert('Please enter a search term')
        homeDisplay
    }
}
/////////////////////////////////////////////////
// RETURN ID OF CLICKED
/////////////////////////////////////////////////
const getMealByID = (mealID) => {
    // make a another fetch this time by ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);//returns data attached to id
            const meal = data.meals[0]; //returns data of clicked card

            addMealToDOM(meal); //introduced fn here create below
        })
}

/////////////////////////////////////////////////
// I'M FEELING HUNGRY BUTTON
/////////////////////////////////////////////////
// fetch random meal
function getRandomMeal() {
    // clear meals and heading
    homeDisplay.innerHTML = '';
    mealsElement.innerHTML = '';
    resultHeading.innerHTML = '';


    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

/////////////////////////////////////////////////
// RECIPE OF THE WEEK
/////////////////////////////////////////////////
// hard code weekly meal
function getWeeklyMeal() {
    homeDisplay.innerHTML = '';
    mealsElement.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53000')
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealToDOM(meal);
        });
}

/////////////////////////////////////////////////
// Curry
/////////////////////////////////////////////////
function getCurry() {
    homeDisplay.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52820')
        .then(res => res.json())
        .then(data => {
            const curry = data.meals[0]

            addMealToDOM(curry)
        })
}

/////////////////////////////////////////////////
// Soup
/////////////////////////////////////////////////
function getSoup() {
    homeDisplay.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52842')
        .then(res => res.json())
        .then(data => {
            const soup = data.meals[0]

            addMealToDOM(soup)
        })
}
/////////////////////////////////////////////////
// Pie
/////////////////////////////////////////////////
function getPie() {
    homeDisplay.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52882')
        .then(res => res.json())
        .then(data => {
            const pie = data.meals[0]

            addMealToDOM(pie)
        })
}

/////////////////////////////////////////////////
// ADD MEALS TO DOM
/////////////////////////////////////////////////
function addMealToDOM(meal) {
    const ingredients = [];
    //for loop to get ingredients bc of the way they're listed in api
    for (let i = 1; i <= 20; i++) {
        //to mimick this structure "strIngredient1" interpolate the index
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break; //if it's empty break out of the loop
        }
    }
    singleMealElement.innerHTML = `
                <div class= "single-meal card meal">
                <h1 class="card-title">${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal} class="card-img-top" />
                <div class="single-meal-info">
                ${meal.Area ? `<p>${meal.Area}</p>` : ''}
                </div>
                <h3>Instructions</h3>
                <p class="card-text p">${meal.strInstructions}</p>
                <br>
                <div class="main">
                    <h3>Ingredients</h3>
                    <ul class="ing-list">
                    ${ingredients.map(ing => `<li class="ing-li">${ing}</li>`).join(' ')} 
                    </ul>
                    </div>
                <a href="${meal.strYoutube}" class="btn btn-primary">Check out the tutorial here!</a>
                <br>
                </div>
                </div>
    `

}

/////////////////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////////////////

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
weekly.addEventListener('click', getWeeklyMeal);
curry.addEventListener('click', getCurry);
soup.addEventListener('click', getSoup);
pie.addEventListener('click', getPie);




mealsElement.addEventListener('click', e => {
    mealsElement.innerHTML = ''; //clear searches
    resultHeading.innerHTML = '';
    //in the mealinfo container path find 
    const mealInfo = e.path.find(item => {
        // console.log(item); returns all the elements/items in the container
        //if the item has a class
        if (item.classList) {
            //return the one that contains meal-info 
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        // console.log(mealID) //when clicked gets id
        getMealByID(mealID);
    }
})

