import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("voter");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userExistsError, setUserExistsError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name) {
      setNameError("Name field is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email field is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!mobile) {
      setMobileError("Mobile number field is required.");
      isValid = false;
    } else {
      setMobileError("");
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
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setUserExistsError("You are already a user.");
        return;
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          mobile: mobile,
          email: email,
          userType: userType,
        });
      }
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setUserType("voter");
      setUserExistsError("");
      setRegistrationSuccess(true);
      navigate("/login", { state: { userType } }); // Navigate to login with userType state
    } catch (error) {
      console.log(error.message);
      alert("You are already a user. You can log in directly.");
    }
  };

  return (
    <div className="bg-black flex justify-center flex-wrap md:space-x-20 md:flex-nowrap">
      <div className="mt-10">
        <img src="./src/assets/Figure.svg" className="w-full h-auto" />
      </div>

      <div className="flex flex-col items-center space-y-3 md:w-1/2">
        <div className="text-white text-3xl md:text-6xl mt-10">
          Registration form
        </div>
        <form onSubmit={handleSubmit} className="w-full md:w-96">
          <div className="text-white text-xl">Name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter text"
          />
          {nameError && <div className="text-red-500">{nameError}</div>}
          <div className="text-white text-xl">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter text"
          />
          {emailError && <div className="text-red-500">{emailError}</div>}
          {userExistsError && (
            <div className="text-red-500">{userExistsError}</div>
          )}
          <div className="text-white text-xl">Mobile.No</div>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter text"
          />
          {mobileError && <div className="text-red-500">{mobileError}</div>}
          <div className="text-white text-xl">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter text"
          />
          {passwordError && <div className="text-red-500">{passwordError}</div>}
          <div className="text-white text-xl">User Type</div>
          <div className="flex space-x-4">
            <label className="text-white">
              <input
                type="radio"
                value="admin"
                checked={userType === "admin"}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-2"
              />
              Admin
            </label>
            <label className="text-white">
              <input
                type="radio"
                value="voter"
                checked={userType === "voter"}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-2"
              />
              Voter
            </label>
          </div>
          {registrationSuccess && (
            <div className="text-green-500">Registration successful!</div>
          )}
          <button
            type="submit"
            className="text-white mt-10 bg-blue-500 w-full md:w-32 h-10 text-xl rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
