<?php

class User
{
    private $db;
    private $mainTable = "users";
    private $projectsTable = "projects";

    public $id;
    public $fullName;
    public $email;
    public $password;
    public $image;
    public $link;
    public $location;
    public $ocupation;
    public $summary;
    public $pro;
    public $github;
    public $linkedIn;
    public $facebook;
    public $twitter;
    public $instagram;
    public $youtube;
    public $projects;

    // for $projects
    public $proID;
    //public userID;
    public $proTitle;
    public $proImage;
    public $proSummary;
    public $proDemo;
    public $proCode;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->mainTable . "
              SET fullName = :fullName,
                  email = :email,
                  password = :password,
                  image = :image,
                  link = :link,
                  summary = :summary,
                  location = :location,
                  ocupation = :ocupation";

        $stmt = $this->db->prepare($query);

        $this->fullName = htmlspecialchars(strip_tags($this->fullName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->summary = htmlspecialchars(strip_tags($this->summary));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->ocupation = htmlspecialchars(strip_tags($this->ocupation));

        $passwordHash = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(":fullName", $this->fullName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(':password', $passwordHash);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":summary", $this->summary);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":ocupation", $this->ocupation);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update()
    {
        $passwordSet = !empty($this->password) ? "password = :password" : "";

        $query = "UPDATE " . $this->mainTable . "
                  SET fullName=:fullName
                      email=:email,
                      {$passwordSet},
                      image=:image,
                      link=:link,
                      location=:location,
                      ocupation=:ocupation,
                      summary=:summary,
                      pro=:pro,
                      github=:gihub,
                      linkedIn=:linkedIn
                      facebook=:facebook,
                      twitter=:twitter,
                      instagram=:instagram,
                      youtube=:youtube
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);

        $this->fullName = htmlspecialchars(strip_tags($this->fullName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->summary = htmlspecialchars(strip_tags($this->summary));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->ocupation = htmlspecialchars(strip_tags($this->ocupation));
        $this->pro = htmlspecialchars(strip_tags($this->pro));
        $this->github = htmlspecialchars(strip_tags($this->github));
        $this->linkedIn = htmlspecialchars(strip_tags($this->linkedIn));
        $this->facebook = htmlspecialchars(strip_tags($this->facebook));
        $this->twitter = htmlspecialchars(strip_tags($this->twitter));
        $this->instagram = htmlspecialchars(strip_tags($this->instagram));
        $this->youtube = htmlspecialchars(strip_tags($this->youtube));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":fullName", $this->fullName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":summary", $this->summary);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":ocupation", $this->ocupation);
        $stmt->bindParam(":pro", $this->pro);
        $stmt->bindParam(":github", $this->github);
        $stmt->bindParam(":linkedIn", $this->linkedIn);
        $stmt->bindParam(":facebook", $this->facebook);
        $stmt->bindParam(":twitter", $this->twitter);
        $stmt->bindParam(":instagram", $this->instagram);
        $stmt->bindParam(":youtube", $this->youtube);

        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));

            $passwordHash = password_hash($this->password, PASSWORD_BCRYPT);

            $stmt->bindParam(":password", $passwordHash);
        }
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM " . $this->mainTable . " WHERE id = ?";
        $stmt = $this->db->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function exists($field, $value)
    {
        $query = "SELECT *
                FROM " . $this->mainTable . "
                WHERE {$field} = ?
                LIMIT 1";

        $stmt = $this->db->prepare($query);

        $value = htmlspecialchars(strip_tags($value));

        $stmt->bindParam(1, $value);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row["id"];
            $this->fullName = $row["fullName"];
            $this->email = $row["email"];
            $this->password = $row["password"];
            $this->image = $row["image"];
            $this->link = $row["link"];
            $this->summary = $row["summary"];
            $this->location = $row["location"];
            $this->ocupation = $row["ocupation"];
            $this->pro = $row["pro"];
            $this->github = $row["github"];
            $this->linkedIn = $row["linkedIn"];
            $this->facebook = $row["facebook"];
            $this->twitter = $row["twitter"];
            $this->instagram = $row["instagram"];
            $this->youtube = $row["youtube"];
            $this->projects = array();

            $query = "SELECT *
                FROM " . $this->mainTable . "
                WHERE user_id = ?
                LIMIT 1";

            $stmt = $this->db->prepare($query);

            $stmt->bindParam(1, $this->id);
            $stmt->execute();

            $projects = 4;

            if ($this->pro) {
                $projects = 8;
            }

            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $project = array(
                        "id" => $row["id"],
                        "title" => $row["title"],
                        "image" => $row["image"],
                        "summary" => $row["summary"],
                        "demo" => $row["demo"],
                        "code" => $row["code"],
                    );

                    array_push($this->projects, $project);
                }
            }

            if (count($this->projects) > $projects) {
                for ($i = $projects; $i < $project; $i++) {
                    unset($this->projects[$i]);
                }
            }

            return true;
        }

        return false;
    }

    public function createProjects()
    {
        $query = "INSERT INTO " . $this->$projectsTable . "
              SET user_id = :user_id,
                  title = :tile,
                  image = :image,
                  summary = :summary,
                  demo = :demo,
                  code = :code";

        $stmt = $this->db->prepare($query);

        //$this->user_id = htmlspecialchars(strip_tags($this->id));
        $this->proTitle = htmlspecialchars(strip_tags($this->$proTitle));
        $this->proImage = htmlspecialchars(strip_tags($this->$proImage));
        $this->proSummary = htmlspecialchars(strip_tags($this->$proSummary));
        $this->proDemo = htmlspecialchars(strip_tags($this->preDemo));
        $this->proCode = htmlspecialchars(strip_tags($this->proCode));

        $stmt->bindParam(":user_id", $this->id);
        $stmt->bindParam(":title", $this->proTitle);
        $stmt->bindParam(':image', $this->proImage);
        $stmt->bindParam(":summary", $this->proSummary);
        $stmt->bindParam(":demo", $this->proDemo);
        $stmt->bindParam(":code", $this->proCode);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }



}
