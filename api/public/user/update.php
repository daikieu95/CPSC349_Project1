<?php

include_once "../../tools/postHeaders.php";

include_once "../../config/core.php";
include_once "../../classes/Database.php";
include_once "../../classes/User.php";

require "../../vendor/autoload.php";
use \Firebase\JWT\JWT;

$database = new Database();

$db = $database->getConnection();

$link = $_POST["link"];

if (!empty($_POST["fullName"]) &&
    !empty($_POST["email"]) &&
    $_FILES["image"] &&
    !empty($link) &&
    !empty($_POST["summary"])) {
    if ($_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $imageName = preg_replace('/\s+/', '-', $_FILES["image"]["name"]);
        $imageTmpName = $_FILES["image"]["tmp_name"];
        $uploadUrl = "/images/" . uniqid() . "-" . $imageName;
        $uploadName = ".." . $uploadUrl;

        $user = new User($db);

        if ($user->exists("email", $_POST["email"])) {
            if (move_uploaded_file($imageTmpName, $uploadName)) {
                $user->fullName = $_POST["fullName"];
                $user->email = $_POST["email"];
                //$user->password = $_POST["password"];
                $user->image = $uploadUrl;
                $user->link = $link;
                $user->location = $_POST["location"];
                $user->ocupation = $_POST["ocupation"];
                $user->summary = $_POST["summary"];

                if (!empty($_POST["github"])) {
                  $user->update = $_POST["github"];
                }
                if (!empty($_POST["linkedIn"])) {
                  $user->update = $_POST["linkedIn"];
                }
                if (!empty($_POST["facebook"])) {
                  $user->update = $_POST["facebook"];
                }
                if (!empty($_POST["twitter"])) {
                  $user->update = $_POST["twitter"];
                }
                if (!empty($_POST["instagram"])) {
                  $user->update = $_POST["intagram"];
                }
                if (!empty($_POST["youtube"])) {
                  $user->update = $_POST["youtube"];
                }

                if ($user->update()) {
                  $token = array(
                    "iss" => $iss,
                    "aud" => $aud,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "data" => array(
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
                      ),
                  );
    
                    $jwt = JWT::encode($token, $key);

                    http_response_code(200);
                    echo json_encode(array("message" => "Success.", "jwt" => $jwt));
                } else {
                    http_response_code(202);
                    echo json_encode(array("message" => "Unable to create user."));
                }
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to upload image."));
            }
        } else {
            http_response_code(202);
            echo json_encode(array("message" => "Email does not exists."));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to upload image."));
    }

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
