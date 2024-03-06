<?php
/**
 * receive_body___send_response.php
 */

/* Get content type */
if($_SERVER["REQUEST_METHOD"] == "POST"){
  $contentType = trim($_SERVER["CONTENT_TYPE"] ?? ''); // PHP 8+
  // Otherwise:
  // $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  /* Send error to Fetch API, if unexpected content type */
  if ($contentType !== "application/json")
    die(json_encode([
      'value' => 0,
      'error' => 'Content-Type is not set as "application/json"',
      'data' => null,
    ]));

  /* Receive the RAW post data. */
  $content = trim(file_get_contents("php://input"));

  /* $decoded can be used the same as you would use $_POST in $.ajax */
  $decoded = json_decode($content, true);

  /* Send error to Fetch API, if JSON is broken */
  if(! is_array($decoded))
    die(json_encode([
      'value' => 0,
      'error' => 'Received JSON is improperly formatted',
      'data' => null,
    ]));

  /* NOTE: For some reason I had to add the next line as well at times, but it hadn't happen for a while now. Not sure what went on */
  // $decoded = json_decode($decoded, true);

  /* Do something with received data and include it in response */
  // dumb e.g.
  $response = $decoded['file1'];
  $response2 = $decoded['file2'];
  
  if (file_exists("fanvil.xml")) {
    unlink("fanvil.xml");
  }
  if (file_exists("yealink.xml")) {
    unlink("yealink.xml");
  }
    // Открываем файл в нужном нам режиме. Нам же, нужно его создать и что то записать.
    $fp = fopen("fanvil.xml", "w");//поэтому используем режим 'w'
    $fp2 = fopen("yealink.xml", "w");  

    // записываем данные в открытый файл
    fwrite($fp, $response);
    fwrite($fp2, $response2);

    //не забываем закрыть файл, это ВАЖНО
    fclose($fp);
    fclose($fp2);


  /* Send success to fetch API */
  die(json_encode([
    'value' => 1,
    'error' => null,
    'data' => 'ready', // or ?array of data ($response) you wish to send back to JS
  ]));
}
?>