# Express CRUD API

## Description
A simple REST API built with Express.js that supports CRUD operations using an in-memory data store.

## Setup Instructions

1. Clone the repo:
git clone <repo-url>
cd express-crud-api


2. Install dependencies:
npm install


3. Run the server:
npm run dev
node index.js


Server will run on `http://localhost:8080`

## API Routes

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | /             | Returns "Hello, World!"  |
| GET    | /users        | Get all users            |
| GET    | /users/:id    | Get a single user        |
| POST   | /users       | Create a new user       |
| PUT    | /users/:id    | Update an existing user  |
| DELETE | /users/:id    | Delete a user          |

## Data Format

```json
{
"name": "John Doe",
"email": "John@gmail.com",
"age":"16"
}
```
## Testing
Use Postman or Thunder client in Vscode to test the API endpoints.


