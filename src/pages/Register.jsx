import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import registerImage from "../assets/login.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
        toast.success("User registered successfully!", { position: "top-center" });
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl">
        
        {/* Left Illustration */}
        <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-4">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Right Registration Form */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            Already registered? <a href="/" className="text-blue-600 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
