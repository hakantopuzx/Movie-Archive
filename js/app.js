 const searchBox = document.querySelector("#searchBox");
 const searchButton = document.querySelector("#searchButton");
 const filmList = document.querySelector("#filmList");
 const filmListDetail = document.querySelector("#filmListDetails");
 const filmInfo = document.querySelector("#info");
 const api = "http://www.omdbapi.com/?apikey=5399efe3&s=";
 const apiImbd = "http://www.omdbapi.com/?apikey=5399efe3&i=";
 let films;
 
 class Request {
    
    get(url){
        
        return new Promise((resolve,reject) => {
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        });
    };     
};

const request = new Request();

searchButton.addEventListener("click",addFilm);

function addFilm(e){
    let searchKey = searchBox.value;
    if(searchBox.value === ""){
        showAlert("dark","Boş değer aranamaz!");
    }else{
        request.get(api+searchKey)
        .then(films => {
            let filmAll = films.Search;
            filmList.innerHTML = "";
            searchBox.value = "";
            filmAll.forEach(allFilm => {
                filmInfo.innerHTML = `<strong>Aranan Kelime:</strong> <span style='font-size:18px'> ${searchKey} </span>`; // Aranan Kelime
                filmList.innerHTML += `
                <div class="col-lg-4">
                    <div class="film">
                        <div class="filmTitle">${allFilm.Title}</div>
                            <div class="filmPoster">
                                <img src="${allFilm.Poster}" alt="Movie Poster">
                            </div>
                            <div class="filmDetail">
                                <a class="btn btn-dark" href="#" onclick="getFilmDetails('${allFilm.imdbID}')"> Film Detay </a>
                            </div>
                    </div>
                </div>`;
            })
        })
        .catch(err => console.log(err))
    }
    
    e.preventDefault();
}


function getFilmDetails(id){
    
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false; 
}

function getMovie(){
    let movieId = sessionStorage.getItem("movieId");
    
    request.get(apiImbd+movieId)
    .then(films => {
        
        filmListDetail.innerHTML += `
        
        <div class="col-lg-4 poster">
        <img src="${films.Poster}">
        </div>
        <div class="col-lg-8">
            <ul class="list-group">
                <li class="list-group-item"><strong>Film Adı: </strong>${films.Title}</li>
                <li class="list-group-item"><strong>Film Çıkış Yılı: </strong>${films.Year}</li>
                <li class="list-group-item"><strong>Film Süresi: </strong>${films.Runtime}</li>
                <li class="list-group-item"><strong>Film Türü: </strong>${films.Genre}</li>
                <li class="list-group-item"><strong>Film Yönetmeni: </strong>${films.Director}</li>
                <li class="list-group-item"><strong>Film Oyuncuları: </strong>${films.Actors}</li>
                <li class="list-group-item"><strong>Film IMDB Puanı: </strong>${films.imdbRating}</li>
            </ul>
        <div class="bg-light p-3 mt-3 border">
            <h5 class="text-center">Film Konusu</h5>
            <p>${films.Plot}</p>
            <a href="http://imdb.com/title/${films.imdbID}" class="btn btn-dark" target="_blank">Filmi IMDB'de incele</a>
            <a href="index.html" class="btn btn-dark">Geri Git</a>
        </div>
        </div>`;
    })
}

function showAlert(type,message){
    let element = document.createElement("div");
    element.className = `alert alert-${type}`;
    element.textContent = message;
    element.style = "width:51%;margin:auto;text-align:center;font-size:20px;box-shadow:0 0 15px .5px black";
    filmList.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    },800)
    
    
}