<?php
  if($_SERVER["REQUEST_METHOD"] == "POST")
  {
    echo file_get_contents('php://input');
    $text = file_get_contents('php://input');
    if (file_exists("file.xml")) {
      unlink("file.xml");
    }

    // Открываем файл в нужном нам режиме. Нам же, нужно его создать и что то записать.
    $fp = fopen("file.xml", "w");//поэтому используем режим 'w'
              
    // записываем данные в открытый файл
    fwrite($fp, $text);
              
    //не забываем закрыть файл, это ВАЖНО
    fclose($fp);
  } 

?>