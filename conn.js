// conn.js

const admin = require('firebase-admin');
require('dotenv').config();
const serviceAccount = require('../chat-api-7-d90f24ef963d.json');

// Initialize Firebase Admin with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL, // Your database URL
});

const db = admin.firestore();
module.exports = db;
