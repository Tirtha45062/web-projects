<?php

session_start();

if(isset($_SESSION['username'])){ //if user is already logged in 
    header("location:welcome.php"); //then send user to welcome page
}
require_once "config.php"; //if user not logged in then connect to database for checking username and password

$username=$password="";
$err="";
if($_SERVER['REQUEST_METHOD']=="POST"){ //taking username and password from the user
    if(empty(trim($_POST["username"])) || empty(trim($_POST["password"])))//if username and password field is left empty by the user
    {
        $err="please enter username + password";
    }
    else{ 
        $username=trim($_POST['username']);//storing given useranme in variable
        $password=trim($_POST['password']);//storing given password in variable
    }


    if(empty($err)) //if no error occured
    {
        $sql="SELECT id,username,password FROM users WHERE username=?";
        $stmt=mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($stmt,"s",$param_username);
        $param_username=$username;
        if(mysqli_stmt_execute($stmt))
        {
            mysqli_stmt_store_result($stmt);
            if(mysqli_stmt_num_rows($stmt)==1){ //if taken username is in database
                 mysqli_stmt_bind_result($stmt,$id,$username,$hashed_password);//binding statement
                 if(mysqli_stmt_fetch($stmt)){
                    if(password_verify($password,$hashed_password))//matching given password with database
                    {
                        session_start();
                        $_SESSION["username"]=$username;//storing data in variables
                        $_SESSION["id"]=$id;
                        $_SESSION["loggedin"]=true;

                        header("location:welcome.php"); //redirecting user to welcome page
                    }
                }   
            }
        }
    }
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login Form</title>
    <style>
        * {
            margin: 10px;
            padding: 0px;
        }

        .container {
            max-width: 50%;
            padding: 34px;
            margin: auto;
            background-color:aquamarine;
        }

        .container h1 {
            text-align: center;
            margin: 10px;
        }

        form {
            padding: 15px;
            align-items: center;
            justify-content: center;
        }

        input{
            width: 50%;
            margin: 11px 120px;
            padding: 7px;
            font-size: 16px;
            border: 1px solid black;
            border-radius: 6px;
            display:block
        }
        .btn{
            background: blue;
            color:white;
            width: auto;
            margin:11px 120px;
            padding: 5px;
            border: 1px solid white;
            border-radius: 6px;
            cursor:pointer;
        }
        .btn2{
            background: yellow;
            color:white;
            width: auto;
            margin:11px 120px;
            padding: 5px;
            border: 1px solid white;
            border-radius: 6px;
            cursor:pointer;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Login Here</h1>
        <p><b>Note:</b>Required fields are marked with (<span style="color:red;">*</span>)</p>
        <form action="" method="post">
           
            Username<span style="color:red;">*</span><input type="text" name="username" id="username" placeholder="username" required>
            Password<span style="color:red;">*</span><input type="text" name="password" id="password" placeholder="password" required>
            
            <button class="btn">Login</button>
            <button class="btn2"><a href="register.php">Register</a></button>
        </form>
    </div>
</body>

</html>