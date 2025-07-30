step -1 Created backend and frontend setup with type Script support.

 HighwayDelite_Backend/
│
├── src/                      # Source code
│   ├── controllers/          # Route controllers (business logic)
│   ├── routes/               # API route definitions
│   ├── middlewares/          # Custom Express middlewares
│   ├── models/               # Database models (if using ORM)
│   ├── lib/                  # Configuration files (e.g., DB, env)
│   ├── index.ts              # Entry point of your app
│
├── dist/                     # Compiled JS files (after build)
│
├── .env                      # Environment variables
├── .gitignore                # Files to ignore in git
├── package.json              # Project metadata & npm scripts
├── tsconfig.json             # TypeScript config
└── README.md                 # Project readme
===============================================================================================================================================================

HighwayDelite_Frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│
│   ├── Components/
│   │   ├── ContextApi.tsx
│   │   ├── ProtectedUI.tsx
│   │   ├── CreateNotePopup/
│   │   │   ├── CreateNotePopup.tsx
│   │   │   └── CreateNotePopup.css
│   │   └── DashboardHeader/
│   │       ├── DashboardHeader.tsx
│   │       └── DashboardHeader.css
│
│   ├── Pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   └── LoginAndSignup/
│   │       ├── Login.tsx
│   │       ├── Signup.tsx
│   │       └── LoginAndSignup.css
│
│   ├── App.tsx
│   ├── Main.tsx
│   └── index.css
===========================================================================================================================================================

********************* PROBLEMS FACED ***************************
1.) Since i was using login with google so I have to add google_client_id and google_client_secret, so gitHub was not pushing my code due to security, I manually upload files then 


============================================================================================================================================================

********************* IMPORTANT NOTE ****************************

I have used render free version for deployment so it automatically shuts when no one is using for 15 minutes, so, when you login it will initially take 10-15 seconds on on backend.
