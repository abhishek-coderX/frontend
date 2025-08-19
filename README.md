# DevTinder Frontend Documentation

Welcome to the DevTinder frontend documentation! 🚀 This guide provides an overview of the user-facing application, its features, and how it interacts with the backend API.

The DevTinder frontend is a single-page application built with React, designed to provide a smooth, Tinder-like experience for developers. It focuses on intuitive UI/UX for profile management, user discovery, and connection management.

---

## Features

- **User Authentication**: Secure sign-up and log-in processes.
- **Profile Management**: Users can create and edit their profiles, including skills, age, and a short bio.
- **User Discovery**: A "feed" of potential connections based on user preferences and interests.
- **Connection Requests**: Send and manage connection requests.
- **Real-Time Chat**: Direct messaging with accepted connections.
- **Password Management**: Features to change and reset passwords.

---

## API Interactions

The frontend application communicates with the DevTinder backend to perform all major operations. Below are the key endpoints used and their corresponding frontend functionality.

### Authentication

| Frontend Action | Backend Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Sign Up** | `/signup` | `POST` | Registers a new user with their details. |
| **Log In** | `/login` | `POST` | Authenticates the user and receives a JWT token. |
| **Log Out** | `/logout` | `POST` | Clears the JWT token from the browser's cookies. |

---

### User Profile

| Frontend Action | Backend Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **View Profile** | `/profile/view` | `GET` | Fetches the logged-in user's profile data. |
| **Edit Profile** | `/profile/edit` | `PATCH` | Updates the user's profile information. |
| **Change Password** | `/profile/password/edit` | `PATCH` | Updates the user's password. |
| **Forgot Password** | `/profile/password/forgot` | `PATCH` | Initiates a password reset via email. |

---

### Connection Management

| Frontend Action | Backend Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Send Request** | `/request/send/:status/:toUserId` | `POST` | Sends a connection request to another user. The status is `interested` or `ignored`. |
| **Review Request** | `/request/review/:status/:requestId` | `POST` | Accepts or rejects a received connection request. |
| **View Requests** | `/user/requests/received` | `GET` | Fetches all pending connection requests for the logged-in user. |
| **View Connections** | `/user/connections` | `GET` | Fetches a list of all accepted connections. |

---

### User Feed

| Frontend Action | Backend Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Get Feed** | `/feed` | `GET` | Retrieves a paginated list of new user profiles for swiping. |

---

### Chat

| Frontend Action | Backend Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Fetch Messages** | `/messages/:receiverId` | `GET` | Retrieves all messages in a conversation with a specific user. |

---

## Status Values

The frontend uses the following status values when interacting with the backend API for connection requests:

- `ignored`: The user is not interested in the profile.
- `interested`: The user is interested and has sent a request.
- `accepted`: The user has accepted a connection request.
- `rejected`: The user has rejected a connection request.

---

## Live Demo

You can view the live application here: [frontend-neon-iota.vercel.app](https://frontend-neon-iota.vercel.app) 🌟
