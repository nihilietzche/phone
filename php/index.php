<?php
    echo '<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <input type="file" name="inputfile" id="inputfile">
        <button class="dispnone" onclick = "downloadFile()"> save File </button>
        <pre id="output"></pre>
        
        <script src="script.js"></script>
      </body>
    </html>';
?>