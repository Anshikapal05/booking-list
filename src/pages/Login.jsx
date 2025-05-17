import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.js";
import { toast } from "react-toastify";
import loginImage from "../assets/login.png"; 

const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!", { position: "top-center" });
      window.location.href = "/role";
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Signed in with Google!", { position: "top-center" });
        window.location.href = "/role";
      })
      .catch((error) => {
        toast.error("Google sign-in failed: " + error.message, { position: "bottom-center" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl">
        
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-4">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Right Login Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@gmail.com"
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Submit
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            New user? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or sign in with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-700">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
