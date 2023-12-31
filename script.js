"use strict"
let selectedOptionIndex = null;
let currentLevel = 1;
let points = 0;

const questions = [
  {
    // Livello 1
    text: "Qual è il nome della principale piazza nella Città Alta di Bergamo?",
    options: ["Piazza Vecchia", "Piazza del Duomo", "Piazza Maggiore"],
    correctIndex: 0,
  },
  {
    // Livello 2
    text: "Questa fortezza domina la Città Alta e offre una vista panoramica. Come si chiama?",
    options: [
      "Castello di San Vigilio",
      "Rocca di Bergamo",
      "Fortezza di Santa Maria",
    ],
    correctIndex: 1,
  },
  {
    // Livello 3
    text: "Questo importante edificio religioso a Bergamo è noto per i suoi affreschi rinascimentali. Qual è il suo nome?",
    options: [
      "Basilica di Santa Maria Maggiore",
      "Duomo di Bergamo",
      "Chiesa di San Bartolomeo",
    ],
    correctIndex: 0,
  },
  {
    // Livello 4
    text: "Questo museo d'arte ospita opere di artisti come Raffaello, Bellini e Tintoretto. Come si chiama?",
    options: [
      "Accademia Carrara",
      "Galleria d'Arte Moderna",
      "Museo Civico di Bergamo",
    ],
    correctIndex: 0,
  },
  {
    // Livello 5
    text: "Il nome di questa collina è associato a una torre panoramica e a una chiesa. Qual è il nome della collina?",
    options: ["Monte Alto", "Colle Aperto", "San Vigilio"],
    correctIndex: 2,
  },
  {
    // Livello 6
    text: "Questo edificio storico ha un grande orologio sulla sua facciata. Qual è il suo nome?",
    options: ["Palazzo Vecchio", "Palazzo della Ragione", "Palazzo Nuovo"],
    correctIndex: 1,
  },
  {
    // Livello 7
    text: "Questa lunga strada alberata è una delle vie principali di Bergamo. Come si chiama?",
    options: ["Il Sentierone", "Corso Vittorio Emanuele", "Via Colleoni"],
    correctIndex: 0,
  },
  {
    // Livello 8
    text: "Questo parco naturale offre un'area verde per rilassarsi e godere della natura. Qual è il suo nome?",
    options: [
      "Parco della Cittadella",
      "Giardini Margherita",
      "Parco dei Colli",
    ],
    correctIndex: 2,
  },
  {
    // Livello 9
    text: "Questa cappella monumentale è famosa per la sua ricca decorazione. Come si chiama?",
    options: [
      "Cappella degli Sforza",
      "Cappella degli Scrovegni",
      "Cappella Colleoni",
    ],
    correctIndex: 2,
  },
  {
    // Livello 10
    text: "Nel cuore della Città Bassa, si trova una piazza famosa per i suoi negozi e caffè. Come si chiama questa piazza?",
    options: ["Piazza Vecchia", "Piazza Pontida", "Piazza della Repubblica"],
    correctIndex: 1, // Indice dell'opzione corretta
  },
];

function selectOption(index) {
  selectedOptionIndex = index;

  // Rimuovi la classe "selected" da tutti i bottoni
  const buttons = document.querySelectorAll(".options button"); // Seleziona tutti i tag button
  buttons.forEach((button) => button.classList.remove("selected"));

  checkAnswer();
}

function checkAnswer() {
  if (selectedOptionIndex !== null) {
    const userAnswer = questions[currentLevel - 1].options[selectedOptionIndex]; // Opzione selezionata dall'utente
    const correctAnswer = questions[currentLevel - 1].options[questions[currentLevel - 1].correctIndex];

    if (userAnswer === correctAnswer) {
      // La risposta è corretta

      // Riproduce il suono della risposta corretta
      const correctAudio = document.getElementById("correctAudio");
      correctAudio.play();

      //console.log("Risposta corretta!");
      currentLevel++; // Incrementa il livello

      if (currentLevel >= 11) {
        // controlla se ha vinto e finito i livelli
        victory();
      }

      points = points + 2; // Incrementa il punteggio

      // Cambia il percorso dell'immagine con id "game-image"
      if (currentLevel !== 11) {
        document.getElementById("game-image").src =
          "./media/livello" + currentLevel + ".png";
      }

      // Cambia il testo del paragrafo con id "question"
      document.getElementById("question").textContent =
        questions[currentLevel - 1].text;

      // Aggiorna il punteggio
      document.getElementById("informations").textContent =
        "Livello: " + currentLevel + " Punteggio: " + points;

      // Le opzioni dei pulsanti vengono aggiornate in base alle opzioni associate alla domanda corrente.
      const buttons = document.querySelectorAll(".options button"); // Seleziona tutti i tag button
      questions[currentLevel - 1].options.forEach((option, index) => {
        buttons[index].textContent = option;
      });

    } else {
      // Riproduce il suono della risposta sbagliata
      const wrongAudio = document.getElementById("wrongAudio");
      wrongAudio.play();

      // La risposta è sbagliata
      alert("Risposta errata, meno un punto. Riprova");

      if (currentLevel !== 1) {
        // Non si può perdere al primo livello
        points--;; // Decrementa il punteggio
      }

      if (points <= 0 && currentLevel !== 1) {
        // controlla se ha perso e se non sei al primo livello
        const gameOverAudio = document.getElementById("gameOver");
        gameOverAudio.play();
        alert("Hai perso! Hai perso tutti i punti");
        location.reload(); // Ricarica la pagina
      }


      // Aggiorna il punteggio
      document.getElementById("informations").textContent =
        "Livello: " + currentLevel + " Punteggio: " + points;
    }
  } else {
    // Nessuna opzione selezionata
    console.log("Seleziona un'opzione prima di controllare la risposta.");
  }
}

//in caso di vittoria, quando il livello arriva a 11
function victory() {
  // Riproduce il suono della risposta sbagliata
  const win = document.getElementById("win");
  win.play();

  const buttons = document.querySelectorAll(".options button");
  // Nascondo i bottoni
  document.getElementById("question").style.display = "none";
  buttons.forEach((button) => (button.style.display = "none"));

  // Creo un nuovo elemento div per i nuovi bottoni
  const newButtonsContainer = document.createElement("div");
  newButtonsContainer.id = "newButtonsContainer"; // Assegno un id al nuovo elemento div

  // Aggiungo il bottone per rigiocare
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Rigioca";
  playAgainButton.onclick = function () {
    location.reload(); // Ricarica la pagina
  };
  const homeButton = document.createElement("button");
  homeButton.id = "homeButton";
  homeButton.textContent = "Torna alla Home";
  homeButton.onclick = function () {
    window.location.href = './index.html'; // Reindirizza alla Home
  };

  // Aggiungo il bottone al nuovo elemento div
  newButtonsContainer.appendChild(playAgainButton);
  newButtonsContainer.appendChild(homeButton);

  // Aggiungo il nuovo elemento div al DOM, inserendolo all'interno di #game-container
  const gameContainer = document.getElementById("game-container");
  gameContainer.appendChild(newButtonsContainer);

  // Aggiorno il testo informativo
  document.getElementById("game-image").src = "./media/victory.gif";

  // Aggiorno le informazioni
  document.getElementById("informations").textContent =
    "Hai vinto! Hai totalizzato " + points + " punti.";

  // Mostra il pulsante "Torna alla Home"
  document.getElementById("homeButton").style.display = "block";
}

//info button
document.getElementById("info-button").addEventListener("click", function () { // Al click del bottone "Info"
  document.getElementById("info-window").style.display = "block";
});

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("info-window").style.display = "none";
});
