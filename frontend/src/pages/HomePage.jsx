import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import classes from "./Home.module.css";

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject("Location access denied or unavailable");
        },
        { enableHighAccuracy: true }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}


export default function HomePage() {
  const [url, setUrl] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setLocation(loc))
      .catch((error) => console.error(error));
  },[])

  async function handleGenerateQr() {
    if (location) {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/gen-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });

      const data = await response.json();
      setUrl(data.url);
      setLoading(false);
    }
  }
  return (
    <>
    <div className={classes.containerr}>
      <button className="btn btn-light" onClick={handleGenerateQr}>Generate QR</button>
      <div className={classes.qr}>
      {loading ? (
          <p>Loading...</p> 
        ) : url ? (
          <QRCodeSVG value={url} />
        ) : (
          <p>Please generate a QR</p>
        )}
      </div>
      </div>
    </>
  );
}
