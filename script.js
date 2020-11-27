const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    weekly = document.getElementById('weekly'),
    random = document.getElementById('random'),
    mealsElement = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealElement = document.getElementById('single-meal');


//functions/event handles

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
                    <div class="card" style="width: 25rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions}</p>
                    <a href="${meal.strYoutube}" class="btn btn-primary">Check out the Tutorial</a>
                    </div>
                    </div>
                    `)
                }
            })

    } else {
        alert('Please enter a search term')
    }
}



//Event listeners
submit.addEventListener('submit', searchMeal);
