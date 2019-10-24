<?php

class Database
{
    private $host = "localhost";
    private $name = "fewdprojectone";
    private $user = "root";
    private $password = "";
    private $connection;

    public function getConnection()
    {
        $this->connection = null;

        try {
            $this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->name, $this->user, $this->password);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->connection;
    }
}
