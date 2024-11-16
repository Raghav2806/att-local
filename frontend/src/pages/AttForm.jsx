import { useEffect, useState } from "react";
import { useParams, Form } from "react-router-dom";
import { getCurrentLocation } from "./HomePage";

import classes from "./AttForm.module.css";

export default function AttForm() {
  const { formId } = useParams();
  const [accessGranted, setAccessGranted] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    async function checkLocationAccess() {
      try {
        const location = await getCurrentLocation();

        const response = await fetch(
          `http://localhost:3000/verify-access/${formId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location),
          }
        );

        const data = await response.json();
        setAccessGranted(data.accessGranted);
      } catch (err) {
        setAccessGranted(false);
      }
    }
    setChecking(true);
    checkLocationAccess();
    setChecking(false);
  }, [formId]);

  return (
    <div>
      {checking ? (
        <p>Checking your location...</p>
      ) : accessGranted ? (
        <Form method="post">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="BITS ID"
              name="bits_id"
              required
            />
            <label for="floatingInput">BITS ID</label>
          </div>
          <div className={classes.centre}>
            <button type="submit" className="btn btn-light">
              Submit
            </button>
          </div>
        </Form>
      ) : (
        <p>
          Access Denied: You must be in the class to gain access. Please provide
          access to location if you are in the class.
        </p>
      )}
    </div>
  );
}
