"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { useState } from "react";


export default function Home() {
  const [error, setError] = useState("");
  const [result, setResult] = useState(""); // Store the result
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState(""); // State for the second drug

  const checkCompatibility = () => {
    // Reset previous error and result state
    setError("");
    setResult("");

    // Validate inputs
    if (!drug1 || !drug2) {
      setError("Please enter both drug names.");
      return;
    }

    fetch('/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        drug1: drug1,
        drug2: drug2,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log(data) //i think issue here
        setResult(data.result); // Store the response in result state
        
      })
      .catch(error => {
        setError("An error occurred while checking compatibility.");
      });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand mx-3 p-2 text-teal" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-capsule-pill mx-2" viewBox="0 0 16 16">
              <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
            </svg>
            SafeSync.AI
          </a>
        </div>
      </nav>

      {/* Main content */}
      <div className="container my-5">
        <div className="p-3 text-center rounded-3">
          <h1 className="text-body-emphasis">Check drugs compatibility</h1>

          <div className="input-group">
            <span className="input-group-text">Drugs</span>
            <input
              type="text"
              aria-label="drug1"
              className="form-control"
              onChange={(e) => setDrug1(e.target.value)} // First drug input
            />
            <input
              type="text"
              aria-label="drug2"
              className="form-control"
              onChange={(e) => setDrug2(e.target.value)} // Second drug input
            />
      
          </div>
          {result == "true" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
</svg>}
 {result == "false" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>} {/* Show result */}
            {error && <div className="form-text text-danger" id="basic-addon4">{error}</div>} {/* Show error */}
              
              {result=="true" && <div className="form-text text-success" id="result">Compatibility: {result}</div>} {/* Show result */}
              {result=="false" && <div className="form-text text-danger" id="result">Compatibility: {result}</div>} {/* Show result */}
          <div className="col-lg-6 col-xxl-4 my-3 mx-auto">
            <div className="d-grid gap-2">
              
              <Button variant="contained" className="btn-color" onClick={checkCompatibility}>
                Check
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
