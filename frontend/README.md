# 🚀 Poll Voting App (MERN Stack)

## 📌 Project Overview

This is a full-stack Poll/Voting application built using the MERN stack.
Users can create polls, vote on options, and view live results with percentage-based visualizations.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **HTTP Client:** Axios

---

## ✨ Features

* Create polls with 2–4 options
* Vote on polls
* Real-time-like result updates (percentages)
* Animated progress bars
* Delete polls
* Prevent duplicate voting using localStorage
* Modern UI with animations

---

## 📂 Project Structure

```
poll-app/
  ├── backend/
  │     ├── models/
  │     ├── routes/
  │     ├── controllers/
  │     └── server.js
  ├── frontend/
        ├── src/
        ├── public/
        └── package.json
```

---

## ⚙️ Setup & Run Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd poll-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

👉 Runs on: http://localhost:5000

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

👉 Runs on: http://localhost:3000

---

## 🔌 API Endpoints

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| GET    | /api/polls          | Get all polls |
| POST   | /api/polls          | Create poll   |
| POST   | /api/polls/:id/vote | Vote on poll  |
| DELETE | /api/polls/:id      | Delete poll   |

---

## 📊 How It Works

1. User creates a poll → stored in MongoDB
2. User votes → backend updates vote count
3. Frontend fetches updated data
4. Results displayed as percentages

---

## 🔐 Duplicate Voting Prevention

Currently implemented using **localStorage** on the client side.
For production, this can be improved using:

* Authentication (JWT)
* IP-based tracking

---

## 🎨 UI Highlights

* Glassmorphism design
* Gradient backgrounds
* Animated progress bars
* Smooth transitions using Framer Motion

---

## ⚠️ Limitations

* Duplicate voting prevention is client-side
* No authentication system yet

---

## 🚀 Future Improvements

* Add user authentication (JWT)
* Real-time updates using Socket.IO
* Chart-based visualization (Chart.js)
* Deploy to cloud (Vercel / Render / MongoDB Atlas)

---

## 🤖 AI Usage

AI tools were used to assist in UI design and code structuring.
All logic, API design, and implementation were understood and customized.

---

## 👨‍💻 Author

**R.Srikar**

---

## ⭐ Conclusion

This project demonstrates full-stack development skills including API design, state management, database integration, and modern UI development.
