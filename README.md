For Admin Login - Email - prek97344@gmail.com  Password - 123456
# 🤖 AI Customer Support Chat Platform (MERN + Gemini API)

A full-stack AI-powered customer support chat application built with the MERN stack, featuring Gemini API integration to simulate virtual assistant conversations and handle user queries using custom company FAQs or documents.

---

## 🚀 Tech Stack

- **Frontend**: React (with routing and component-based architecture)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **AI Integration**: Gemini API (Google Generative AI)

---

## 🧠 Key Features

### 🌐 Frontend
- Built with React
- User-friendly chat interface
- Admin and user login (auth protected routes)
- Components for chat, navbar, sidebar, and admin views
- FAQ and file upload support
- Auto-scroll to latest message
- Modular page separation: `home`, `authPages`, `admin`, `chatPages`

### 🖥 Backend
- Express-based RESTful API
- JWT-based authentication
- Gemini API integration for intelligent chat responses
- MongoDB for storing:
  - User data
  - Conversation logs
  - Uploaded company content
- Controllers and routes modularized:
  - `authRoutes`, `adminRoutes`, `geminiRoutes`, `uploadRoutes`
- Upload support for FAQs or documents (PDF/text)

### 🔐 Authentication
-  login using JWT (admin/user separation)
- Protected routes for admin dashboard

### 📥 File Upload + Contextual Answers
- Admins can upload PDFs or plain text
- Parsed content used for context-aware answers
- Basic matching or Gemini prompt conditioning

---

## 📁 Project Structure

### 🔹 Frontend (`/my-app/src`)
```

src/
├── components/
│   ├── admin/
│   ├── chat/
│   ├── navbar/
│   ├── sidebar/
│   └── protectedRoutes/
├── pages/
│   ├── admin/
│   ├── authPages/
│   ├── chatPages/
│   └── home/
├── App.jsx
└── App.css

```

### 🔹 Backend (`/server`)
```

server/
├── config/
│   └── db.js
├── controllers/
├── models/
├── routes/
├── server.js
└── .env

````

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js and npm
- MongoDB Atlas account
- Gemini API Key (Google Generative AI)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/prem1kr/Full-Stack-Ai-integrated-Chat-Support-web-App.git
cd ai-chat-support
````

### 2️⃣ Set Up Backend

```bash
cd server
npm install
cp .env.example .env
# Replace .env values accordingly
npm start
```

### 3️⃣ Set Up Frontend

```bash
cd my-app
npm install
npm run dev
```

---

## 🔐 .env Configuration (Backend)

```env
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/
GEMINI_API-ID=gen-lang-client-0224512030
GEMINI_API_KEY=AIzaSyA5L2Ikf-1vG3fJ6HD-3nSUaVjPHJzdJzE
SECRET_KEY=premkumar
```


---

## 🌐 Available Routes

### ➤ Auth Routes

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/auth/login`  | User/Admin login       |
| POST   | `/auth/signup` | (Optional) User signup |

### ➤ Gemini Routes

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| POST   | `/gemini/message` | Get AI response from Gemini |

### ➤ Upload Routes

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| POST   | `/upload/faq`  | Upload file (PDF or text) |
| GET    | `/upload/faqs` | Get all uploaded data     |

---

## 🧪 Bonus Features

* Agent typing indicator (`"Agent is typing..."`)
* Download chat history as `.txt` or `.pdf`
* Optional embedding-based similarity (e.g., via LangChain)

---

## 📸 Screenshots



