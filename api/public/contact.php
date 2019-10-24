<?php

include_once "../tools/postHeaders.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($_POST["fullName"]) &&
    !empty($_POST["email"]) &&
    !empty($_POST["subject"]) &&
    !empty($_POST["message"])) {
    // Here we would send an email to our company relationships manager.

    http_response_code(201);
    echo json_encode(array("message" => "Success."));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
