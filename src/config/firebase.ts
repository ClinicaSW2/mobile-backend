// import "dotenv/config";
import firebase from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const { credential } = firebase;

// Initialize Firebase
const appFirebase = initializeApp({
  credential: credential.cert("./firebase.json"),
});

// console.log("credenciales", appFirebase.options.credential);
console.log("name: ", appFirebase.name);

export const firebaseMessaging = getMessaging();


// import { firebaseMessaging } from "../config/firebase.js";
// const requestMessage: Message = {
//   token: userFound.tokenMovil,
//   notification: {
//     title: `${newNotification.title}`,
//     body: `${newNotification.description}`,
//   },
//   data: {
//     comida: "Hello world, backend",
//     complaint: `{
//       "_id": "${updatedComplaint._id}",
//       "state": "${updatedComplaint.state}",
//       "observation": "${updatedComplaint.observation}"
//     }`,
//     notification: `{
//       "_id": "${newNotification._id}",
//       "title": "${newNotification.title}",
//       "description": "${newNotification.description}"
//     }`,
//   },
//   android: { priority: "high" },
// };

// firebaseMessaging.send(requestMessage);
