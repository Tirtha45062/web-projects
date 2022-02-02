<?php
require_once "config.php";
//intializing variables with empty string

$username=$password=$confirm_password="";
$username_err=$password_err=$confirm_password_err="";

//username checking
if($_SERVER['REQUEST_METHOD']=="POST"){ //If any user posting username
   
    //checking whether username is empty or not by trimming whitespace and other characters from username
    if(empty(trim($_POST["username"]))){ 
        $username_err="Username cannot left blank";
    }
    else{
        $sql="SELECT id FROM users WHERE username=?";
        $stmt=mysqli_prepare($conn,$sql); //preparing above sql statement
        if($stmt)
        {
            mysqli_stmt_bind_param($stmt,"s",$param_username);//binding variable with statement
            //setting the value of param_username
            $param_username=trim($_POST['username']);

            //exicuting this statement
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt)==1){ //if taken username is already in database
                    $username_err="This username is alreday taken";
                }
                else{
                    $username=trim($_POST['username']);
                }
            }
            else{ // if statement does not execute
                echo "something went wrong";
            }
        }
    }
   
    

    //password checking
    if(empty(trim($_POST['password']))){ //if password is empty
        $password_err="Password cannot be blank";
        
    }
    elseif (strlen(trim($_POST['password'])) < 8) { //if password lenth is less than 8
        $password_err="Password must be atleast 8 characters";
    
    }
    else{
        $password=trim($_POST['password']);
    }

    //confirm_password checking
    if(trim($_POST['password']) != trim($_POST['confirm_password'])){ //if confirm_password not equals to password
        $confirm_password_err="Password should match";
    }

    //if there were no error in username and password and confirm_password then insert values into database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_error)){
        $sql="INSERT INTO users (username,password) VALUES (?,?)";
        $stmt=mysqli_prepare($conn,$sql); //preparing above sql statement
            if($stmt)
            {
                mysqli_stmt_bind_param($stmt,"ss",$param_username,$param_password);//binding variable with statement
                //setting the value of param_username and param_password
                $param_username=$username;
                $param_password=password_hash($password,PASSWORD_DEFAULT);//creating hash(mask) of the password by default hashing function for security reasons

                //executing query
                if(mysqli_stmt_execute($stmt)){
                    header("location:login.php"); //values inserted into database and redirecting the user to login page

                }
                else{
                    echo "Something went wrong......cannot redirect!";
                }
            }
               
    }
    mysqli_close($conn); //closing connection
}
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <style>
        * {
            margin: 10px;
            padding: 0px;
            text-align:center;
            position:flex;
        }

        .container {
            max-width: 50%;
            padding: 34px;
            margin: auto;
            background-color: aqua;
        }

        .container h1 {
            text-align: center;
            margin: 10px;
        }

        form {
            padding: 15px 100px;
        }

        input {
            width: 50%;
            margin: 11px 90px;
            padding: 7px;
            font-size: 16px;
            border: 1px solid black;
            border-radius: 6px;
            display: block;
        }
        

        .btn {
            background: blue;
            color: white;
            width: auto;
            margin: auto;
            margin: auto 90px;
            padding: 5px 5px;
            border: 1px solid white;
            border-radius: 6px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Register Here</h1>
        <p><b>Note:</b>Required fields are marked with (<span style="color:red;">*</span>)</p>
        <form action="" method="post">
            Name
            <input type="text" name="name" id="name" placeholder="Enter your name here" required>
            Email<input type="email" name="email" id="email" placeholder="Email">
            Username<span style="color:red;">*</span><input type="text" name="username" id="username"
                placeholder="username" required>
            <span style="color:red;">
                <?php echo $username_err;?>
            </span>
            Password<span style="color:red;">*</span><input type="password" name="password" id="password" minlenth="8" placeholder="password" required>
            <span style="color:red;">
                <?php echo $password_err;?>
            </span>
            Confirm Password<span style="color:red;">*</span><input type="password" name="confirm_password"
                id="confirm_password" placeholder="Type password again" required><br>
            <span style="color:red;">
                <?php echo $confirm_password_err;?>
            </span>
            <button class="btn">Register</button>
        </form>
    </div>
</body>

</html>