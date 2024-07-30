# Live Streaming Server Backend



## Overview



This is a robust backend server for a live streaming application built using NestJS and MongoDB. It provides comprehensive APIs for user authentication, stream management, real-time chat, and various interactive features to enhance the live streaming experience.



## Features



- User authentication and authorization using JWT

- Live stream creation, management, and viewing

- Real-time chat functionality

- Multi-quality streaming with adaptive bitrate

- Virtual backgrounds for streamers

- Automatic stream highlights generation

- Interactive overlays (polls, quizzes, donation goals)

- AI-powered content moderation for video and chat

- Detailed analytics dashboard for streamers

- Multi-platform streaming support

- Custom emotes and badges for chat

- Collaborative streaming (co-hosting)

- Donation and subscription system

- Logging and monitoring with Winston and Prometheus



## Prerequisites



- Node.js (v16 or later)

- MongoDB (v4.4 or later)

- Docker and Docker Compose (for containerized deployment)



## Installation



1. Clone the repository:

```

  git clone https://github.com/Dancode-188/livestream-backend.git

  cd livestream-backend

```



2. Install dependencies:

```

  npm install

```



3. Set up environment variables:

  Create a `.env` file in the root directory and add the following variables:

```

  PORT=3000

  MONGODB_URI=mongodb://localhost:27017/livestream

  JWT_SECRET=your_jwt_secret_here

  JWT_EXPIRES_IN=1d

```



## Running the Application



### Development Mode



```

npm run start:dev

```



### Production Mode



```

npm run build

npm run start:prod

```



### Using Docker



1. Build the Docker image:

```

  docker-compose build

```



2. Run the containers:

```

  docker-compose up

```



## API Documentation



### Authentication



- POST `/auth/register`

- Request body: `{ "username": string, "password": string }`

- Response: User object



- POST `/auth/login`

- Request body: `{ "username": string, "password": string }`

- Response: `{ "access_token": string }`



### Streams



- GET `/streams`

- Response: Array of stream objects



- POST `/streams`

- Request body: `{ "title": string, "description": string }`

- Response: Created stream object



- GET `/streams/:id`

- Response: Stream object



- PATCH `/streams/:id`

- Request body: `{ "title"?: string, "description"?: string }`

- Response: Updated stream object



- DELETE `/streams/:id`

- Response: Deleted stream object



- POST `/streams/:id/start`

- Response: Started stream object



- POST `/streams/:id/end`

- Response: Ended stream object



### Users



- GET `/users/:username`

- Response: User object (excluding password)



- PATCH `/users/:username`

- Request body: `{ "email"?: string, "bio"?: string }`

- Response: Updated user object



## WebSocket Events



Connect to WebSocket server at `ws://localhost:3000/chat`



### Client to Server Events



- `joinStream`: Join a stream's chat room

- Payload: `{ streamId: string }`



- `leaveStream`: Leave a stream's chat room

- Payload: `{ streamId: string }`



- `chatMessage`: Send a chat message

- Payload: `{ streamId: string, content: string }`



### Server to Client Events



- `newMessage`: Receive a new chat message

- Payload: `{ userId: string, username: string, content: string, timestamp: Date }`



- `userJoined`: Notification when a user joins the chat

- Payload: `{ username: string }`



- `userLeft`: Notification when a user leaves the chat

- Payload: `{ username: string }`



## Testing



Run the test suite with:



```

npm run test

```



For end-to-end tests:



```

npm run test:e2e

```



## Deployment



### Standard Deployment



1. Set up a MongoDB instance (e.g., MongoDB Atlas)

2. Configure environment variables for production

3. Build the application: `npm run build`

4. Start the application: `npm run start:prod`



### Containerized Deployment



1. Build the Docker image:

```

  docker build -t livestream-backend .

```



2. Push the image to a container registry:

```

  docker push your-registry/livestream-backend:latest

```



3. Deploy using Kubernetes:

  - Create a Kubernetes deployment YAML file

  - Apply the deployment: `kubectl apply -f deployment.yaml`



### Cloud Deployment (Example: Heroku)



1. Install the Heroku CLI and log in:

```

heroku login

```


2. Create a new Heroku app:

```

heroku create your-app-name

```


3. Add the MongoDB add-on to your Heroku app:

```

heroku addons:create mongodbatlas:sandbox

```


4. Set up environment variables on Heroku:

```

heroku config:set JWT_SECRET=your_jwt_secret_here
heroku config:set JWT_EXPIRES_IN=1d

```


5. Add a Procfile to your project root:

```

web: npm run start:prod

```


6. Deploy your application on Heroku:

```

git push heroku main

```

7. Ensure at least one instance of the app is running:

```

heroku ps:scale web=1

```


8. Open the deployed application:

```

heroku open

```



## Monitoring and Logging



- Prometheus metrics available at: `http://localhost:3000/metrics`

- Grafana dashboard for visualizing metrics (set up separately)

- Logs are written to `combined.log` and `error.log` files



## Contributing



1. Fork the repository

2. Create your feature branch: `git checkout -b feature/AmazingFeature`

3. Commit your changes: `git commit -m 'Add some AmazingFeature'`

4. Push to the branch: `git push origin feature/AmazingFeature`

5. Open a pull request



## License



This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



## Acknowledgments



- NestJS team for the awesome framework

- MongoDB for the robust database solution

- All contributors who have helped shape this project