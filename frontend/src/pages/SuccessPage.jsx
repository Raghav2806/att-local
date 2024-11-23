import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SuccessPage.module.css";

export default function SuccessPage() {

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <h1>Attendance Marked Successfully!</h1>
        <p>Your attendance has been recorded. Thank you!</p>
      </div>
    </div>
  );
}
