import express from "express";
import mysql from "mysql2";

const app = express();

app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "school_management",
//   port: 3306,
// });

// const db = mysql.createConnection({
//   host: "mysql-schools.alwaysdata.net",
//   user: "schools",
//   password: "gl^ePYj2K%PgVF@#r#y%3X84K0igvv%fZrb",
//   database: "schools_db",
//   port: 3306,
// });

const db = mysql.createPool({
  host: "mysql-schools.alwaysdata.net",
  user: "schools",
  password: "gl^ePYj2K%PgVF@#r#y%3X84K0igvv%fZrb",
  database: "schools_db",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5, // adjust for free tier limits
  queueLimit: 0
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL DB Connected");
// });

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.post("/api/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      !latitude ||
      !longitude ||
      typeof name !== "string" ||
      typeof address !== "string" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    db.query(
      "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)",
      [name, address, latitude, longitude],
      (err, result) => {
        if (err) throw err;
        const id = result.insertId;
        console.log("1 row inserted");

        db.query("SELECT * FROM schools WHERE id=?", [id], (err, rows) => {
          if (err) throw err;

          return res.status(201).json({ schools: rows[0] });
        });
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message:
        "We couldn’t add the school due to a system error. Please try again later",
    });
  }
});

app.get("/api/listSchools", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).json({
        message: "Latitude and longitude are required and must be numbers",
      });
    }

    db.query("SELECT * FROM schools", (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      let result = rows.map((school) => {
        let dist = getDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        );
        return { ...school, distance: +dist.toFixed(2) };
      });

      result.sort((a, b) => a.distance - b.distance);

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Sever Listening to port 3000");
});
