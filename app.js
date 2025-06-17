// const express = require('express');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const cors = require('cors');

// // Replace with the path to your service account key file
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // POST endpoint to send notification
// app.post('/sendNotification', async (req, res) => {
//   const { title, body, token } = req.body;

//   const message = {
//     notification: {
//       title,
//       body,
//     },
//     token: token
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     res.status(200).json({ message: 'Notification sent', response });
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending notification', error });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`FCM server running at http://localhost:${PORT}`);
// });
// ================================================================= 
// WOrkin in loop of token
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const admin = require("firebase-admin");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Use service account from environment
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// app.post("/sendNotification", async (req, res) => {
//   const { title, body, tokens } = req.body;

//   if (!tokens || tokens.length === 0) {
//     return res.status(400).send("No tokens provided");
//   }

//   const message = {
//     notification: { title, body },
//     tokens,
//   };

//   try {
//     const response = await admin.messaging().sendEachForMulticast(message);
//     res.json({
//       successCount: response.successCount,
//       failureCount: response.failureCount,
//     });
//   } catch (error) {
//     res.status(500).send("Error: " + error.message);
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load your service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔔 Send Notification to Topic
app.post('/send', async (req, res) => {
  const { title, body, topic = "all" } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    topic,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 FCM Server running on port ${PORT}`);
});


