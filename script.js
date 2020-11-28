const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    weekly = document.getElementById('weekly'),
    random = document.getElementById('random'),
    mealsElement = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealElement = document.getElementById('single-meal');


//functions/event handlers

//search meal and fetch from api
const searchMeal = (e) => {
    //prevent default of submit
    e.preventDefault();
    //clear single meal upon researching
    singleMealElement.innerHTML = '';
    // store what is searched into a variable
    const searchedTerm = search.value;
    //check for empty
    if (searchedTerm.trim()) {
        //fetch the api interpolate the searchedterm
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedTerm}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for <b>'${searchedTerm}'</b>:</h2>`
                //if meal found/not found
                if (data.meals === null) {
                    resultsHeading.innerHTML = `<b>${searchedTerm}</b> not found`
                } else {
                    //map through the meals Elements
                    mealsElement.innerHTML = data.meals.map(meal => `
                    <div class="card meal" style="width: 18rem;">
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
    }
}



//Event listeners

submit.addEventListener('submit', searchMeal);
mealsElement.addEventListener('click', e => {
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

    }
})
