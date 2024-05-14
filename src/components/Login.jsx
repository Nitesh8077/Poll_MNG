import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("voter");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userType) {
      setUserType(location.state.userType);
    }
  }, [location.state]);

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);

    if (email) {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUserType(userData.userType);
      } else {
        setUserType("voter"); // default type if no user found
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError("Email field is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password field is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserType(userData.userType);

        setLoginSuccess(true);
        setTimeout(() => setLoginSuccess(false), 3000);

        // Navigate to the appropriate dashboard based on user type
        if (userData.userType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.log(error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-black h-screen flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-24">
      <div className="w-full md:w-1/2">
        <img src="./src/assets/login.svg" alt="Login" className="w-full" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
        <h1 className="text-white text-4xl md:text-6xl">Login</h1>

        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
        />
        {emailError && <div className="text-red-500">{emailError}</div>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter password"
        />
        {passwordError && <div className="text-red-500">{passwordError}</div>}

        <div className="flex space-x-4">
          <label className="text-white">
            <input
              type="radio"
              value="admin"
              checked={userType === "admin"}
              readOnly
              className="mr-2"
            />
            Admin
          </label>
          <label className="text-white">
            <input
              type="radio"
              value="voter"
              checked={userType === "voter"}
              readOnly
              className="mr-2"
            />
            Voter
          </label>
        </div>

        {loginSuccess && (
          <div className="text-green-500">Login successful!</div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
