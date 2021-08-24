# Post

## POST: Write Post

### Request

Path: `/post`

- Content-Type: json
- Cookie: a valid json-token
- Body:
    - title: [string]: up to 80 characters
    - content(*optional*): [string]: up to 1000 characters

### Response

- ✅ 201: Created

    Successfully posted

    - Content-Type: json
    - Body
        - msg: `Successfully posted`
        - data:
            - postId: [integer]
- ⛔️ 400: Bad Request

    When the body is invalid

    - Content-Type: json
    - Body
        - msg: `Bad request`
- ⛔️ 401: Unauthorized

    Not logged in

    - Content-Type: json
    - Body
        - msg: `Not logged in`
- ⛔️ 409: Conflict

    No corresponding user to the jwt-token

    - Content-Type: json
    - Body
        - msg: `Not a valid id`

## DELETE: Delete Reply

### Request

Path: `/reply`

- Cookie: a valid json-token. The user must be author.
- Query:
    - reply_id: id of the targeted reply

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

    When the user is not the author of the post

    - Content-Type: json
    - Body
        - msg: `Not a valid user`
- ⛔️ 409: Conflict

    When there is no corresponding post to the id

    - Content-Type: json
    - Body
        - msg: `Not a valid id`

## PUT: Edit Post

### Request

Path: `/post`

- Cookie: a valid jwt-token
- Query:
    - post_id: [integer] id of the targeted post
- Body:
    - title(*optional)*: [string] up to 80 characters
    - content(*optional)*: [string]: up to 1000 characters

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

    When the user is not the author of the post

    - Content-Type: json
    - Body
        - msg: `Not a valid user`
- ⛔️ 409: Conflict

    When there is no corresponding post to the id

    - Content-Type: json
    - Body
        - msg: `Not a valid id`

## GET: Get a Post

Get a post by post id

### Request

Path: `/post`

- Cookie: a valid jwt-token
- Query:
    - post_id(*optional)*: [integer] the id of the post

### Response

- ✅ 200: OK

    Successfully inquired

    - Content-Type: json
    - Body
        - msg: `Successfully fetched`
        - data:
            - id: [integer] post id.
            - username: [string]
            - title: [string]
            - content(*optional)*: [string]
            - createdAt: [date]
            - updatedAt: [date]
            - userId: [integer]
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

## GET: Get Posts

Get recent N posts (from a user), if there is no post id in query.

### Request

Path: `/post`

- Cookie: a valid jwt-token
- Query:
    - user(*optional)*: [string] the author of the posts
    - number: [integer] maximum number of inquiring posts

### Response

- ✅ 200: OK

    Successfully inquired

    - Content-Type: json
    - Body
        - msg: `Successfully fetched`
        - data:
            - (Array of the objects which have following properties)
                - id: [integer] post id.
                - username: [string]
                - title: [string]
                - content(*optional)*: [string]
                - createdAt: [date]
                - updatedAt: [date]
                - userId: [integer]
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