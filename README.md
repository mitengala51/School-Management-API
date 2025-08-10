# School Management API

A RESTful API for managing school data with location-based features. This API allows you to add schools and retrieve them sorted by distance from a given location.

## 🚀 Features

- **Add Schools**: Add new schools with their location coordinates
- **Location-based Search**: Get schools sorted by distance from your location
- **Distance Calculation**: Automatic calculation of distances using the Haversine formula
- **Input Validation**: Comprehensive validation for all API endpoints
- **MySQL Database**: Hosted database with connection pooling for better performance

## 📋 Table of Contents

- [Installation](#installation)
- [Live Demo](#live-demo)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mitengala51/School-Management-API.git
   cd School-Management-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## 🌐 Live Demo

The API is deployed and accessible at: **https://school-management-api-5o97.onrender.com**

**⚠️ Important Note**: This API is deployed on Render's free tier. Due to resource management:
- The server automatically **shuts down after periods of inactivity**
- When inactive, the **first request may take 50+ seconds** to respond as the server restarts
- If your first request fails or times out, **please try again** - subsequent requests will be fast

You can test the live API endpoints directly:

## 📡 API Endpoints

### Add School

**POST** `/api/addSchool`

Add a new school to the database.

**Request Body:**
```json
{
  "name": "Springfield Elementary",
  "address": "123 Main Street, Springfield, IL",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Response:**
```json
{
  "schools": {
    "id": 1,
    "name": "Springfield Elementary",
    "address": "123 Main Street, Springfield, IL",
    "latitude": 39.7817,
    "longitude": -89.6501
  }
}
```

### List Schools

**GET** `/api/listSchools?latitude={lat}&longitude={lng}`

Retrieve all schools sorted by distance from the provided coordinates.

**Query Parameters:**
- `latitude` (required): User's latitude coordinate
- `longitude` (required): User's longitude coordinate

**Response:**
```json
[
  {
    "id": 1,
    "name": "Springfield Elementary",
    "address": "123 Main Street, Springfield, IL",
    "latitude": 39.7817,
    "longitude": -89.6501,
    "distance": 2.34
  },
  {
    "id": 2,
    "name": "Lincoln High School",
    "address": "456 Oak Avenue, Springfield, IL",
    "latitude": 39.7901,
    "longitude": -89.6440,
    "distance": 3.67
  }
]
```

## 💡 Usage Examples

### Adding a School (Live API)

```bash
curl -X POST https://school-management-api-5o97.onrender.com/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Washington Middle School",
    "address": "789 Pine Street, Springfield, IL",
    "latitude": 39.7956,
    "longitude": -89.6444
  }'
```

### Getting Schools by Location (Live API)

```bash
curl "https://school-management-api-5o97.onrender.com/api/listSchools?latitude=39.7817&longitude=-89.6501"
```

### Local Development

```bash
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Washington Middle School",
    "address": "789 Pine Street, Springfield, IL",
    "latitude": 39.7956,
    "longitude": -89.6444
  }'
```

```bash
curl "http://localhost:3000/api/listSchools?latitude=39.7817&longitude=-89.6501"
```

### Using JavaScript Fetch

```javascript
// Add a school (Live API)
const addSchool = async (schoolData) => {
  const response = await fetch('https://school-management-api-5o97.onrender.com/api/addSchool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schoolData)
  });
  return response.json();
};

// Get schools by location (Live API)
const getSchools = async (latitude, longitude) => {
  const response = await fetch(`https://school-management-api-5o97.onrender.com/api/listSchools?latitude=${latitude}&longitude=${longitude}`);
  return response.json();
};
```

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

### Add School Errors

- **400 Bad Request**: Invalid input data
  ```json
  {
    "error": "Invalid input data"
  }
  ```

- **500 Internal Server Error**: Database or server error
  ```json
  {
    "message": "We couldn't add the school due to a system error. Please try again later"
  }
  ```

### List Schools Errors

- **400 Bad Request**: Missing or invalid coordinates
  ```json
  {
    "message": "Latitude and longitude are required and must be numbers"
  }
  ```

- **500 Internal Server Error**: Database error
  ```json
  {
    "message": "Database error"
  }
  ```

## 🏗️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database management system
- **mysql2**: MySQL client for Node.js with connection pooling
- **Haversine Formula**: For accurate distance calculations between coordinates

## 🧮 Distance Calculation

The API uses the Haversine formula to calculate the great-circle distance between two points on Earth given their latitude and longitude coordinates. This provides accurate distance measurements in kilometers.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any problems or have questions, please open an issue on GitHub.

---

**Note**: The database is hosted and pre-configured. Simply clone the repository, install dependencies, and start the server.
