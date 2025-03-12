Globetrotter Challenge (Headout Assessment)

Globetrotter is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that challenges users to guess famous travel destinations based on cryptic clues. Users can play individually or challenge friends to compete. The game is enhanced with fun facts, trivia, and an engaging UI built with Tailwind CSS.

🚀 Features

Destinations

GET /api/destinations/random – Get a random destination with cryptic clues.

GET /api/destinations/:id/reveal – Reveal details after guessing.

Users

POST /api/users – Create a new user.

GET /api/users/:username – Get user profile and score.

PUT /api/users/:id/score – Update user score.

Challenges

POST /api/challenges – Create a challenge and invite friends.

GET /api/challenges/:accessCode – Retrieve challenge details.

🛠 Tech Stack

Frontend: React.js, Tailwind CSS, React Router

Backend: Node.js, Express.js, MongoDB (Mongoose)

Deployment: Render
