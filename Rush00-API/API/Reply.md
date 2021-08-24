# Reply

## POST: Write Reply

### Request

Path: `/reply`

- Content-Type: json
- Cookie: a valid json-token
- Query:
    - post_id: [integer]
- Body:
    - content: [string]: up to 200 characters

### Response

- ✅ 201: Created

    Successfully replied

    - Content-Type: json
    - Body
        - msg: `Successfully replied`
        - data:
            - replyId: [number]
- ⛔️ 400: Bad Request

    When the body is invalid

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Not logged in

    Not logged in

    - Content-Type: json
    - Body
        - msg: `Not logged in`

## DELETE: Delete Reply

### Request

Path: `/reply`

- Cookie: a valid json-token. The user must be author.
- Query:
    - reply_id: id of the targeted post

### Response

- ✅ 200: OK

    Successfully deleted

    - Content-Type: json
    - Body
        - msg: `Successfully deleted`
- ⛔️ 400: Bad Request

    When the query is wrong

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    Not logged in

    - Content-Type: json
    - Body
        - msg: `Not logged in`
- ⛔️ 403: Forbidden

    When the user is not the author of the reply

    - Content-Type: json
    - Body
        - msg: `Not a valid user`
- ⛔️ 409: Conflict

    When there is no corresponding reply to the id

    - Content-Type: json
    - Body
        - msg: `Not a valid id`

## PUT: Edit Reply

### Request

Path: `/reply`

- Cookie: a valid jwt-token
- Query:
    - reply_id: id of the targeted reply
- Body:
    - content: [string]: up to 200 characters

### Response

- ✅ 200: OK

    Successfully edited

    - Content-Type: json
    - Body
        - msg: `Successfully edited`
- ⛔️ 400: Bad Request

    When the query or the body is wrong

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    Not logged in

    - Content-Type: json
    - Body
        - msg: `Not logged in`
- ⛔️ 403: Forbidden

    When the user is not the author of the reply

    - Content-Type: json
    - Body
        - msg: `Not a valid user`
- ⛔️ 409: Conflict

    When there is no corresponding reply to the id

    - Content-Type: json
    - Body
        - msg: `Not a valid id`

## GET: Get Replies

Get recent N replies from a post

### Request

Path: `/reply`

- Cookie: a valid jwt-token
- Query:
    - reply_id: an id of a post
    - number: maximum number of inquiring replies

### Response

- ✅ 200: OK

    Successfully inquired

    - Content-Type: json
    - Body
        - msg: `Successfully fetched`
        - data:
            - (Array of the objects which have following properties)
                - id: [Integer] reply id
                - username: [string]
                - content: [string]
                - createdAt: [date]
                - updatedAt: [date]
                - userId: [Integer]
                - postId: [Integer]
- ⛔️ 400: Bad Request

    When the query is wrong

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    Not logged in

    - Content-Type: json
    - Body
        - msg: `Not logged in`
- ⛔️ 409: Conflict

    When there is no corresponding user to the user_id

    - Content-Type: json
    - Body
        - msg: `Not a valid id`