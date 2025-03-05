## User Registration System
#### A full-stack user registration system using React.js (Frontend), Node.js with Express (Backend), and MongoDB (Database).

## 🚀 Features
- ✔ User Registration (Name, Age, DOB, Password, Gender, About)
- ✔ CRUD Operations (Create, Read, Update, Delete Users)
- ✔ Form Validation (Ensures correct input format)
- ✔ REST API (Handles user management)
- ✔ Error Handling (Proper HTTP status codes)

### 🛠 Tech Stack
- Frontend: React.js (Hooks, Axios)
- Backend: Node.js, Express.js
- Database: MongoDB
- State Management: React Hooks
  
📌 Installation & Setup
1️⃣ Clone the Repository
## Clone the project
 - git clone ([https://github.com/vengadesh-max/Registration-system.git](https://github.com/vengadesh-max/Registration-system.git)).
## 2️⃣ Backend Setup
#### Backend Dependencies
Library	Command	Purpose
 - Express.js ->	npm install express->	Backend framework
 - Mongoose	-> npm install mongoose ->	MongoDB ORM for database management
 - dotenv	-> npm install dotenv	-> Loads environment variables from .env file
 - CORS	-> npm install cors	-> Enables Cross-Origin Resource Sharing (CORS)
 - Body-parser ->	npm install body-parser	-> Parses incoming request bodies
 - Nodemon (Dev) ->	npm install --save-dev nodemon ->	Automatically restarts the server on file changes
## Move to backend directory 
      cd user-registration-backend

## Setup Database (.env)

   - Create  - .env file (Create & Add MongoDB connection string)
   - Enter your - MONGO_URI=your-mongodb-connection-string
                  - PORT=5000
## Start the backend server
  - npm start
  - Server will run at http://localhost:5000

## 3️⃣ Frontend Setup
#### Frontend Dependencies
Library	Command	Purpose
 - React.js	-> create-react-app ->	Core frontend framework
 - Axios ->	npm install axios ->	For making API requests
 - React Router	-> npm install react-router-dom	-> For navigation between pages
## Move to frontend directory
    cd user-registration-frontend

## Start the frontend application
  - npm start
  - App will run at http://localhost:3000

📡 API Endpoints
 - User Routes (/api/users)
- Method	Endpoint	Description	Request Body
- POST	/register	Register a new user	{ name, age, dob, password, gender, about }
- GET	/	Get all users	-
- GET	/:id	Get user by ID	-
- PUT	/:id	Update user	{ name, age, dob, gender, about }
- DELETE	/:id	Delete user	-
## ✅ Validation Rules
- ✔ Name: Min 2 characters
- ✔ Age: 0 - 120
- ✔ Password: Min 10 characters, must include letters & numbers
- ✔ Gender: Must be Male, Female, or Other
- ✔ About: Max 5000 characters

## 🛠 Error Handling
  Status Code	Description
 - 400	Bad Request (Invalid input)
 - 404	Not Found (User does not exist)
 - 500	Internal Server Error (Unexpected issue)
📌 Future Enhancements
🔹 Add JWT Authentication
🔹 Deploy using Vercel (Frontend) & Render (Backend)
## 📹 Live Project Walkthrough
[([https://www.youtube.com/watch?v=AOrDoOj4IXA](https://youtu.be/sS-fz1x0gsM))]

## 📜 License
 - MIT License

