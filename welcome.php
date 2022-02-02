<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>welcome</title>
    <style>
        .container{
            margin:100px 0px;
            
        }
        button{
            background: yellow;
            color:black;
            margin:15px 50px;
            width: 4%;
            padding: 5px;
            border: 1px solid white;
            border-radius:6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <center><h1><?php echo "Welcome ".$_SESSION['username']?></h1></center><br>
        <center><button><a href="logout.php"><b>Logout</a></button></center>
    </div>
</body>
</html>