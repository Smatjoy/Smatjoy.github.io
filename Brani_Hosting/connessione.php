<?php
$mysqli = new mysqli("127.0.0.1", "root", "", "music", 3307); // connessione al DBMS con: host, user, password, nome del DB, porta
$mysqli->set_charset("utf8"); // serve per fare si che funzionano le lettere accentate

if ($mysqli->connect_errno) { // se c'è un errore nella connessione al DB
    // risposta al richiedente
    http_response_code(500); // codice http
    header("content-type: application/JSON; charset: ISO-8859-1"); // header http, charset serve per le lettere accentate
    $risposta = new stdClass(); // creo un oggetto vuoto
    $risposta->message = "MYSQL internal error"; // aggiungo una proprietà message all'oggetto e gli assegno il valore "MYSQL internal error"
    $risposta->error = $mysqli->connect_error; // aggiungo una proprietà error all'oggetto e gli assegno il valore dell'errore di connessione al DB
    die(json_encode($risposta)); // ritorno l'ogetto in formato JSON, die serve per terminare l'esecuzione dello script e ritornare la risposta al richiedente
    // al posto di die() si può usare exit()
}
?>