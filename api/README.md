# Web Front-end Development (CPSC 349) - Project 1 - API

This is the API part of the project, the back-end.

## Development

To see your changes use: `composer start`.
Please check `classes/database.php` for database configuration.

## Available API

### User

#### Registration

`/user/register.php`

Successful response:

```json
{
  "message": "Success."
}
```

Unsuccessful response:

```json
{
  "message": "Email already in use, please choose another one."
}
```

**Note: `message` will differ depending on the error.**

#### Login

`/user/login.php`

Successful response:

```json
{
  "message": "Success.",
  "jwt": "token"
}
```

Unsuccessful response:

```json
{
  "message": "Email does not exists."
}
```

**Note: `message` will differ depending on the error.**
