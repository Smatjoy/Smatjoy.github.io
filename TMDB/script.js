const key = "444e3073d14891167f35d22f20e11bd8";
let currentPage;
let films = [];

function getFilm(input) {
    if (input !== "") {
        document.getElementById("film").innerHTML = "";
        currentPage = 1;
        loadResults(input);
    } else {
        alert("Inserisci un titolo");
    }
}

function loadResults(input) {
    let url = "https://api.themoviedb.org/3/search/movie?query=" + input + "&api_key=" + key + "&page=" + currentPage;
    let richiesta = new XMLHttpRequest();
    richiesta.open("GET", url, true);

    richiesta.onreadystatechange = function () {
        if (richiesta.readyState == 4) {
            if (richiesta.status == 200) {
                let variabile = JSON.parse(richiesta.responseText);
                films = variabile.results; // Assegna direttamente l'array dei film
                currentPage++;
                showResults(); // Mostra i risultati dopo averli caricati
                // Carica i risultati della prossima pagina se ci sono altre pagine da recuperare
                if (currentPage <= variabile.total_pages) {
                    loadResults(input);
                }
            } else if (richiesta.status == 404) {
                console.log("Film non trovato");
            }
        }
    };
    richiesta.send();
}

function showResults() {
    sortFilms(); // Ordina i film
    let filmContainer = document.getElementById("film"); // Dichiarare filmContainer qui
    const filmTemplate = document.getElementById("film-template"); // Dichiarare filmTemplate qui
    // Visualizza i film ordinati
    films.forEach(film => {
        const clone = filmTemplate.content.cloneNode(true);
        let h5 = clone.querySelector(".card-title");
        let p = clone.querySelector(".card-text");
        let p2 = clone.querySelector(".text-body-secondary");
        let img = clone.querySelector("#card-poster");
        h5.textContent = film.title;
        if (film.overview === "") {
            film.overview = "Nessuna descrizione disponibile";
        } else if (film.overview.length > 150) {
            film.overview = film.overview.substring(0, 200) + "...";
        }
        p.textContent = film.overview;
        // Salva la data nel formato "GG/MM/AAAA"
        p2.textContent = new Date(film.release_date).toLocaleDateString("it-IT");
        if (film.poster_path === null) {
            img.src = "./media/404.jpg";
        } else {
            img.src = "https://image.tmdb.org/t/p/w500" + film.poster_path;
        }
        filmContainer.appendChild(clone);
    });
}

function sortFilms(){
    // Converte le date nel formato "AAAA-MM-GG" in oggetti Date
    films.forEach(film => {
        film.release_date = new Date(film.release_date);
    });

    // Ordina i risultati per data di uscita crescente
    films.sort((a, b) => a.release_date - b.release_date);
}
