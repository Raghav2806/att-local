import { useEffect, useState } from "react";
import { useParams, Form } from "react-router-dom";
import { getCurrentLocation } from "./HomePage";

export default function AttForm() {
  const {formId} = useParams();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    async function checkLocationAccess() {
      try{
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
    checkLocationAccess();
  }, [formId]);

  return (
    <div>
      {accessGranted ? (
        <Form method="post">
          <label>BITS ID</label>
          <input type="text" name="bits_id" required />
          <button type="submit">Submit</button>
        </Form>
      ) : (
        <p>Access Denied: You must be in the class to gain access.</p>
      )}
    </div>
  );
}
