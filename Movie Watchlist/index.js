const searchBtn = document.getElementById('search-btn')
const mainContainer = document.getElementById('main-container')

let searchArr = []
let isSearched = false
let addToLocalStorage = []

let idleArr =`
    <div>
      <img src="images/idle-icon.png" alt="image of a movie roller" class="idle-img"/>  
    </div>
    
    <div>
      <h2 class="idle-text">Start exploring</h2>
    </div>
    `


if(!isSearched)
    mainContainer.innerHTML = idleArr    
    
document.addEventListener('click', (e) => {
    if(e.target.dataset.imdbId){
        handleAddMovie(e.target.dataset.imdbId)
    }
})

function handleAddMovie(movieId) {
    
    const movieExists = addToLocalStorage.some(movie => movie.imdbID === movieId)
  
    if (!movieExists) {
        const movie = searchArr.find(movie => movie.imdbID === movieId)
        if (movie) {
            addToLocalStorage.unshift(movie)
        }
      
        // Convert the array to a string using JSON.stringify()
        const arrayString = JSON.stringify(addToLocalStorage)
        // Store the string in localStorage
        localStorage.setItem('watchlistMovies', arrayString)
    }
}

searchBtn.addEventListener('click', ()=> {
    mainContainer.innerHTML = ''
    const searchInput = document.getElementById('search-input').value
    fetch(`https://www.omdbapi.com/?apikey=9408e33a&s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            isSearched = true
            data.Search.map( movie => {
                fetch(`https://www.omdbapi.com/?apikey=9408e33a&t=${movie.Title}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log("data 2 below")
                        console.log(data)
                        searchArr.push(data)
                        renderMoviesHtml(data)
                     })
            })
        })
})

function renderMoviesHtml(movie){
    mainContainer.innerHTML += `
        <div>
            <div class="movie-detail">
                <div>
                    <img class="poster" src=${movie.Poster}>
                </div>
                <div class="detail-container">
                    <div class="title-container">
                        <h2 class="title">${movie.Title} </h2>
                        </i><h5 class="rating"><i class="fa-solid fa-star"></i>${movie.imdbRating}</h5>
                    </div>
                    <div class="runtime-container">
                        <p class="runtime">${movie.Runtime}</p>
                        <P class="genre">${movie.Genre}</P>
                        <button class="watchlist-btn" id="watchlist-btn" data-imdb-Id=${movie.imdbID}><i id="icon" class="fa-solid fa-circle-plus"></i> watchlist</button>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            <hr class="custom-line">
        </div>` 
}

localStorage.clear()