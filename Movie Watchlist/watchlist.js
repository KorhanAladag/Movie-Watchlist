const watchlistContainer = document.getElementById('watchlist-container')
const retrievedArrayString = localStorage.getItem('watchlistMovies')
const retrievedArray = JSON.parse(retrievedArrayString)
let moviesArray = []

document.addEventListener('click', (e) => {
    if (e.target.dataset.imdbId) {
        handleRemoveMovie(e.target.dataset.imdbId)
    }
})

function handleRemoveMovie(movieId) {
    const index = moviesArray.findIndex(movie => movie.imdbID === movieId)
    if (index !== -1) {
        moviesArray.splice(index, 1)
        updateLocalStorage()
        renderWatchlist()
    }
}

function updateLocalStorage() {
    // Convert the array to a string using JSON.stringify()
    const arrayString = JSON.stringify(moviesArray)
    // Store the string in localStorage
    localStorage.setItem('watchlistMovies', arrayString)
}

function renderMovies() {
    if (localStorage.length && retrievedArray) {
        retrievedArray.forEach(item => {
            moviesArray.unshift(item)
        })
        renderWatchlist()
    }
}

function renderWatchlist() {
    watchlistContainer.innerHTML = ``
    moviesArray.map(movie => {
        const { Title, Poster, imdbRating, Runtime, Genre, imdbID, Plot } = movie
        watchlistContainer.innerHTML += `
        <div>
            <div class="movie-detail">
                <div>
                    <img class="poster" src=${Poster}>
                </div>
                <div class="detail-container">
                    <div class="title-container">
                        <h2 class="title">${Title}</h2>
                        <h5 class="rating"><i class="fa-solid fa-star"></i>${imdbRating}</h5>
                    </div>
                    <div class="runtime-container">
                        <p class="runtime">${Runtime}</p>
                        <P class="genre">${Genre}</P>
                        <button class="watchlist-btn" id="watchlist-btn" data-imdb-Id=${imdbID}><i class="fa-solid fa-circle-minus"></i>watchlist</button>
                    </div>
                    <p class="plot">${Plot}</p>
                </div>
            </div>
            <hr class="custom-line">
        </div>`
    })
}

renderMovies()