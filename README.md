# Live Streaming Server Backend



## Overview



This is the backend server for a live streaming application built using NestJS and MongoDB. It provides robust APIs for user authentication, stream management, real-time chat, and various interactive features to enhance the live streaming experience.



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



## Prerequisites



- Node.js (v16 or later)

- MongoDB

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



- POST `/auth/register`: Register a new user

- POST `/auth/login`: Login and receive JWT token



### Streams



- GET `/streams`: Get all live streams

- POST `/streams`: Create a new stream

- GET `/streams/:id`: Get stream details

- PATCH `/streams/:id`: Update stream details

- DELETE `/streams/:id`: Delete a stream

- POST `/streams/:id/start`: Start a stream

- POST `/streams/:id/end`: End a stream



### Chat



- WebSocket connection for real-time chat: `ws://localhost:3000/chat`



### Users



- GET `/users/:username`: Get user profile

- PATCH `/users/:username`: Update user profile



## WebSocket Events



- `joinStream`: Join a stream's chat room

- `leaveStream`: Leave a stream's chat room

- `chatMessage`: Send a chat message

- `newMessage`: Receive a new chat message



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



The application can be deployed to various cloud services. Here are general steps:



1. Set up a MongoDB instance (e.g., MongoDB Atlas)

2. Configure environment variables for production

3. Build the application: `npm run build`

4. Start the application: `npm run start:prod`



For containerized deployment:



1. Build the Docker image

2. Push the image to a container registry

3. Deploy using Kubernetes or your preferred orchestration tool



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