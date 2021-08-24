# Account

# LogIn / LogOut / SignUp

## POST: Log In

### Request

Path: `/account/login`

- Content-Type: json
- No cookie is required. Valid jwt-token will be rejected.
- Body:
    - username: [string]
    - password: [string]

### Response

- ✅ 201: Created

    Successfully logged in

    - Set-Cookie: a valid jwt-token
    - Content-Type: json
    - Body
        - msg: `Successfully logged in`
        - data:
            - username: [string]
- ⛔️ 400: Bad Request

    When no username or password detected or they are invalid

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    When username or password is wrong

    - Content-Type: json
    - Body
        - msg: `Wrong username or password`
- ⛔️ 409: Conflict

    Already logged in

    - Content-Type: json
    - Body
        - msg: `Already logged in`

## POST: Sign Up

### Request

Path: `/account/signup`

- Content-Type: json
- Body:
    - username: [string]
    - password: [string]

### Response

- ✅ 201: Created

    Successfully signed up

    - Content-Type: json
    - Body
        - msg: `Successfully signed up`
- ⛔️ 400: Bad Request

    When no username or password detected or they are invalid

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 409: Conflict

    When username alreay exists

    - Content-Type: json
    - Body
        - msg: `User already exists`

## POST: Log Out

### Request

Path: `/account/logout`

- Cookie: a valid jwt-token

### Response

- ✅ 200: OK

    Successfully logged out

    - Content-Type: json
    - Body
        - msg: `Successfully logged out`
- ⛔️ 400: Bad Request

    When there is no cookie

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    When jwt-token is expired

    - Content-Type: json
    - Body
        - msg: `Token expired`
- ⛔️ 409: Conflict

    When username alreay exists

    - Content-Type: json
    - Body
        - msg: `User already exists`

## GET: LogIn Check

### Request

Path: `/account/check`

- Cookie: a valid jwt-token

### Response

- ✅ 200: OK

    The user is being logged in.

    - Content-Type: json
    - Body
        - msg: `The user is being logged in`
- ⛔️ 400: Bad Request

    When there is no jwt-token

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    When jwt-token is expired

    - Content-Type: json
    - Body
        - msg: `Token expired`
- ⛔️ 403: Forbidden

    When there is no cookie

    - Content-Type: json
    - Body
        - msg: `Not logged in`