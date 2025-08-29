# 📒 Note-Taking Application

A full-stack note-taking application built with **ReactJS (TypeScript)**, **Node.js (TypeScript)**, and **MongoDB**.  
Users can sign up using **Email + OTP** or **Google Authentication**, create and delete notes, and stay authenticated using **JWT**.  
The app is fully responsive and closely replicates the provided design.  

🔗 **Live Demo:** [Deployed on Render](https://your-app-url.onrender.com)  
📂 **Repository:** [GitHub Repo](https://github.com/your-repo-link)  

---

## 🚀 Features

- 🔑 **Authentication**
  - Sign up with Email + OTP flow.  
  - Sign up/Login with Google account (if registered with Google).  
  - JWT-based authentication & authorization.  

- 📝 **Notes Management**
  - Create personal notes.  
  - Delete notes securely.  
  - Notes are linked to the authenticated user.  

- ⚡ **Error Handling & Validation**
  - Real-time form validation.  
  - Friendly error messages for invalid inputs, expired OTP, or failed API requests.  

- 📱 **Responsive Design**
  - Mobile-first, closely matching the provided design.  

---

## 🛠️ Tech Stack

**Frontend:**  
- ReactJS (TypeScript)  
- Axios (API calls)  
- React Router DOM  
- React Toastify (notifications)  

**Backend:**  
- Node.js (TypeScript) with Express  
- JWT (Authentication)  
- Bcrypt.js (Password security)  
- Passport.js (Google OAuth2)  

**Database:**  
- MongoDB with Mongoose  

**Deployment:**  
- Render (Frontend + Backend)  
- MongoDB Atlas (Database)  

**Version Control:**  
- Git & GitHub  

---

## 📂 Project Structure

note-taking-app/
│── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── config/ # DB & auth configs
│ │ ├── controllers/ # API controllers
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes
│ │ └── utils/ # Helper functions
│ └── server.ts # Entry point
│
│── frontend/ # ReactJS App
│ ├── src/
│ │ ├── assets/ # Static assets
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages (Login, Signup, Notes, etc.)
│ │ ├── context/ # API & Auth context
│ │ └── App.tsx # Root component
│
│── README.md
│── package.json
│── .gitignore

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Amanmalik5211/notemaking.git
cd notemaking

2️⃣ Setup Backend
cd backend
npm install

Create a .env file inside /backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.onrender.com


Run the server:

npm run dev

3️⃣ Setup Frontend
cd ../frontend
npm install


Create a .env file inside /frontend:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REACT_APP_API_URL=https://your-backend.onrender.com


Run the client:

npm start
