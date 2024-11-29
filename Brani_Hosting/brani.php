<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("./connessione.php");

// Verifica la connessione al database
if ($mysqli->connect_error) {
  die("Connessione fallita: " . $mysqli->connect_error);
}

// Prendo il link della copertina
$querySQL = "SELECT `Immagine` FROM `Album` WHERE `Nome` = 'ALASKA BABY'";
$mysqli_result = $mysqli->query($querySQL);
$immagine = $mysqli_result->fetch_all(); // fetch_all() restituisce un array di array con tutti i risultati della query

// Prendo le informazioni delle canzoni
$querySQL = "SELECT * FROM `brani` WHERE `Album` = 12;";
$mysqli_result = $mysqli->query($querySQL);
$informazioni_brani = $mysqli_result->fetch_all();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Brani</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <?php
  // Genera un div per ciascun brano
  foreach ($informazioni_brani as $brano) {
    $id = $brano[0];           // ID del brano
    $titolo = $brano[1];       // Titolo del brano
    $albumId = $brano[2];      // ID dell'album
    $urlCanzone = $brano[3];   // URL della canzone
    ?>
    <div id="brano">
      <?php
      if (!empty($immagine)) {
        $imageLink = $immagine[0][0]; // Recupera il link dell'immagine dal database
        echo "<img src='$imageLink' alt='Song Image' />";
      } else {
        echo "<img src='default.jpg' alt='Default Image' />";
      }
      ?>
      <h3><?php echo $titolo; ?></h3>
      <p>Album: ALASKA BABY</p>
      <p>Artist: Cesare Cremonini</p>
      <audio controls>
        <source src="<?php echo $urlCanzone; ?>" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  <?php
  }
  ?>
</body>

</html>