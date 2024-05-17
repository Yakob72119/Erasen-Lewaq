import React, { useState } from "react";
import examT from "../assets/taken-exam.svg";
import Compliment from "../assets/complain.svg";

const StudentComplainComponent = () => {
  const _id = sessionStorage.getItem("_id");
  const department = sessionStorage.getItem("department");
  const email = sessionStorage.getItem("email");
  const [complainData, setComplainData] = useState({
    email: email,
    userId: _id,
    examDepart: department,
    examId: "",
    complainBox: "",
  });
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComplainData({ ...complainData, [name]: value });
  };

  const handleComplainPost = (event) => {
    event.preventDefault();
    setSubmit(true);

    const emptyFields = Object.entries(complainData).filter(
      ([key, value]) => value === ""
    );
    if (emptyFields.length === 0) {
      console.log("Submitting:", complainData);
      // Reset form fields
      setComplainData({
        email: email,
        userId: _id,
        examDepart: department,
        examId: "",
        complainBox: "",
      });
      setSubmit(false);
      setErrors({});
    } else {
      // Set errors for empty fields
      const errorObj = {};
      emptyFields.forEach(([key]) => {
        errorObj[key] = "This field is required";
      });
      setErrors(errorObj);
    }
  };

  return (
    <div className="complain">
      <img className="image-1" src={Compliment} alt="" />
      <img className="image-2" src={examT} alt="" />
      <h3>
        If You have any complain on the exam we provide you can told for us!
      </h3>
      <form className="complainForm" onSubmit={handleComplainPost}>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
          value={complainData.email}
          disabled
          onChange={handleInputChange}
          {...(submit && complainData.email === "" && { required: true })}
        />
        <span className="error">{errors.email}</span>

        <input
          type="text"
          name="userId"
          className="input"
          placeholder="Full Name"
          value={complainData.userId}
          disabled
          onChange={handleInputChange}
          {...(submit && complainData.userId === "" && { required: true })}
        />
        <span className="error">{errors.userId}</span>

        <input
          type="text"
          name="examDepart"
          className="input"
          placeholder="Exam Department"
          value={complainData.examDepart}
          disabled
          onChange={handleInputChange}
          {...(submit && complainData.examDepart === "" && { required: true })}
        />
        <span className="error">{errors.examDepart}</span>

        <input
          type="text"
          name="examId"
          className="input"
          placeholder="Exam ID"
          value={complainData.examId}
          onChange={handleInputChange}
          {...(submit && complainData.examId === "" && { required: true })}
        />
        <span className="error">{errors.examId}</span>

        <textarea
          name="complainBox"
          className="input complainBox"
          placeholder="Write Your Complain here..."
          value={complainData.complainBox}
          onChange={handleInputChange}
          {...(submit && complainData.complainBox === "" && { required: true })}
        />

        <span className="error">{errors.complainBox}</span>

        <input type="submit" value="Submit" className="input submitBtn" onClick={handleComplainPost}/>
      </form>
    </div>
  );
};

export default StudentComplainComponent;
