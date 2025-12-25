# Chatify

A modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js).

## Acknowledgement

**This project is based on the original work by my friend.** The codebase has been enhanced and modified for educational purposes. I am grateful for the foundation they provided.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login and signup with JWT
- **User Profiles**: Customize your profile with avatars
- **Online Status**: See who's online in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Support**: Share images using Cloudinary integration
- **Dark Mode**: Toggle between light and dark themes
- **Invite Option**: Add new users to your contacts with the + button
- **Message History**: View all previous messages with contacts

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time communication
- **Cloudinary** - Image storage

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (cloud database)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatify?retryWrites=true&w=majority&appName=ChatApp
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Running the Project

Both backend and frontend need to run simultaneously:

1. **Terminal 1** - Start backend:
```bash
cd backend
npm run dev
```

2. **Terminal 2** - Start frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser and go to **http://localhost:5173**

## How to Use

1. **Sign Up**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **View Contacts**: Default shows users you've chatted with
4. **Add New Users**: Click the `+` button to invite new users to chat
5. **Start Chatting**: Click on a user to open chat and send messages
6. **Update Profile**: Go to settings to change profile picture
7. **Switch Theme**: Toggle light/dark mode in settings

## Project Structure

```
Chatify/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Auth middleware
│   │   ├── lib/              # Utilities (DB, Socket, Cloudinary)
│   │   └── index.js          # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand stores
│   │   ├── lib/              # Utilities
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Messages
- `GET /api/messages/users` - Get all users
- `GET /api/messages/contacts` - Get only users with existing chats
- `GET /api/messages/:userId` - Get messages with a user
- `POST /api/messages/send/:userId` - Send a message

## License

This project is licensed under the ISC License.

## Support

For issues or questions, please open an issue on GitHub.

---

**Happy Chatting! 💬**
