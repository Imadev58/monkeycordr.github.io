<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $dob = $_POST['dob'];
    $ip_address = $_SERVER['REMOTE_ADDR'];

    // Create a directory for the user if it doesn't exist
    $dir = 'users';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    // Create a new file with the username
    $file_path = $dir . '/' . $username . '.txt';
    $file_content = "Email: $email\nUsername: $username\nPassword: $password\nDate of Birth: $dob\nIP Address: $ip_address\n";

    file_put_contents($file_path, $file_content);

    // Redirect to the app page
    header("Location: app.html");
    exit();
}
?>
