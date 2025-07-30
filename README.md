step -1 Created backend and frontend setup with type Script support.

step -2 Get the MONGODB_URL from mongoDB atlas and paste it in .env of backend and created a JWT_SECRET in backend too.

frontend run command - npm run dev 

backend run command - npm run dev

step -3 I created two schemas otpVeification.js and user.js and in user.js an extra field named isGoogleUser:Boolean so that if anyone login with with it becomes true else false.

step -4 for google login I use OAuth functionality in which we need client ID and Client Secret keys and which will be stored in .env in frontend.

step -5 after successfull complete of code i run npm run build in backend terminal for creation of /dist and then deployed both backend and frontend in render.



********************* PROBLEMS FACED ***************************

1.) Since i was using login with google so I have to add google_client_id and google_client_secret, so gitHub was not pushing my code due to security, I manually upload files then 



********************* IMPORTANT NOTE ****************************

I have used render free version for deployment so it automatically shuts when no one is using for 15 minutes, so, when you login it will initially take 10-15 seconds on on backend.
