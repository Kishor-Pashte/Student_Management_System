import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL = "https://student-management-system-yhqs.onrender.com/";

  const register = async () => {
    await axios.post(`${BACKEND_URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    alert("Registered");

    navigate("/"); //login
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          width: "340px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={register}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
