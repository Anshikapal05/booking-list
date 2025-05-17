# Admin Dashboard with Firebase (React)

This is a **React** application with **role-based authentication** that allows administrators to manage user records via a form. Authenticated **Admin** users can **Add**, **Edit**, **Delete**, and **View** records, while **Guest** users can only **view** the records.

Firebase is used for both **Authentication** and **Firestore Database** storage.

## 🔧 Features

- 🔐 Role-based login using Firebase Auth (Gmail Sign-In)
- 🧾 Add, Edit, Delete records (Admin only)
- 👁️ View records (All users)
- ✅ Form validation using `react-hook-form`
- 📦 Data persistence with Firestore
- 🚪 Logout functionality
- 📱 Responsive UI with Tailwind CSS
- 🔔 Toast notifications for success and error feedback

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Forms & Validation**: react-hook-form
- **Notifications**: react-toastify
- **Authentication & Database**: Firebase (Auth + Firestore)
