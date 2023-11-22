// src/App.tsx
import React, { useState, ChangeEvent } from "react";
import "./App.css";
import axios from "axios";
import picture from "./assets/pic.png";

interface ApplicantInfo {
  id: number;
  name: string;
  hobby: string;
  favorite_language: string;
  message: string;
}

function App() {
  const [applicantInfo, setApplicantInfo] = useState<ApplicantInfo | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/awesome/applicant"
      );
      setApplicantInfo(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setApplicantInfo((prevInfo) => ({
      ...prevInfo!,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("http://localhost:3001/awesome/applicant", applicantInfo);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Awesome Applicant Info</h1>
        <p>
          Welcome to my profile page! Click the "Get Info" button to learn more
          about me.
        </p>
        <button className="info-button" onClick={handleButtonClick}>
          Get Info
        </button>
        {applicantInfo && (
          <div className="info-container">
            <img src={picture} alt="Your Name" className="profile-picture" />
            {editMode ? (
              <>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={applicantInfo.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Hobby:
                  <input
                    type="text"
                    name="hobby"
                    value={applicantInfo.hobby}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Favorite Language:
                  <input
                    type="text"
                    name="favorite_language"
                    value={applicantInfo.favorite_language}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Message:
                  <textarea
                    name="message"
                    value={applicantInfo.message}
                    onChange={handleInputChange}
                  />
                </label>
                <button className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="info-item">Name: {applicantInfo.name}</p>
                <p className="info-item">Hobby: {applicantInfo.hobby}</p>
                <p className="info-item">
                  Favorite Language: {applicantInfo.favorite_language}
                </p>
                <p className="info-item">Message: {applicantInfo.message}</p>
                <button className="edit-button" onClick={handleEditClick}>
                  Edit
                </button>
              </>
            )}
          </div>
        )}
      </header>
      <section className="additional-content">
        <h2>More About Me</h2>
        <p>
          I am Robert Guzman, an aspiring Software Engineer with a diverse skill
          set encompassing both front-end and back-end technologies. I am poised
          to graduate soon with a degree in Computer Science from Lehman College
          check my portfolio at https://robertguzman-port.net/ .
        </p>
        <h2>My Projects</h2>
        <ul>
          <li>Attendance Tracking System</li>
          <li>Guess Game</li>
          <li>Learn Android</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
