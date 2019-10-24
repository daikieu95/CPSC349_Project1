<?php

include_once "../../../tools/postHeaders.php";

include_once "../../../config/core.php";
include_once "../../../classes/Database.php";
include_once "../../../classes/User.php";

$database = new Database();

$db = $database->getConnection();

if (!empty($_POST["title"]) &&
    !empty($_POST["summary"]) &&
    $_FILES["image"] &&
    !empty($_POST["code"]) &&
    !empty($_POST["demo"])) {
    if ($_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $imageName = preg_replace('/\s+/', '-', $_FILES["image"]["name"]);
        $imageTmpName = $_FILES["image"]["tmp_name"];
        $uploadUrl = "/images/" . uniqid() . "-" . $imageName;
        $uploadName = "../.." . $uploadUrl;

        $user = new User($db);

        if (!$user->exists("id", $_POST["user"])) {
                if (move_uploaded_file($imageTmpName, $uploadName)) {

                    $user->proTitle = $_POST["title"];
                    $user->proImage = $uploadUrl;
                    $user->proDemo = $_POST["demo"];
                    $user->proCode = $_POST["code"];
                    $user->proSummary = $_POST["summary"];

                    if ($user->create()) {
                        http_response_code(201);
                        echo json_encode(array("message" => "Success."));
                    } else {
                        http_response_code(202);
                        echo json_encode(array("message" => "Unable to create project."));
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Unable to upload image."));
                }
            }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to upload image."));
    }

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
