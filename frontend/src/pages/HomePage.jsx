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
  }, []);

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
      <div className={classes.page}>
        <header className={classes.header}>
          <h1>QR Code <span className={classes.headerspan}>Generator</span></h1>
          <p>Generate a unique QR code based on your location</p>
        </header>
        <div className={classes.containerr}>
          <button className={classes.generateBtn} onClick={handleGenerateQr}>
            Generate QR
          </button>
          <div className={classes.qr}>
            {loading ? (
              <p className={classes.message}>Loading...</p>
            ) : url ? (
              <QRCodeSVG value={url} />
            ) : (
              <p className={classes.message}>Please generate a QR</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
