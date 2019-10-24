<?php

include_once "../../tools/getHeaders.php";

include_once "../../classes/Database.php";
include_once "../../classes/User.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

if ($user->exists("link", $_GET["link"])) {
    // create array
    $userData = array(
        "fullName" => $user->fullName,
        "email" => $user->email,
        "image" => $user->image,
        "link" => $user->link,
        "summary" => $user->summary,
        "location" => $user->location,
        "ocupation" => $user->ocupation,
        "pro" => $user->pro,
        "github" => $user->github,
        "linkedIn" => $user->linkedIn,
        "facebook" => $user->facebook,
        "twitter" => $user->twitter,
        "instagram" => $user->instagram,
        "youtube" => $user->youtube,
        "projects" => $user->projects,
    );

    http_response_code(200);
    echo json_encode($userData);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "User does not exist."));
}
