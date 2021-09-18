
// Import the functions from SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

//Config
const firebaseConfig = {
apiKey: "AIzaSyB18Ya9atX4hpn2IttGIwbwTXsnxRaM2fg",
authDomain: "pendle-website.firebaseapp.com",
projectId: "pendle-website",
storageBucket: "pendle-website.appspot.com",
messagingSenderId: "660806916774",
appId: "1:660806916774:web:75f4c61fcf368bf6ca3267",
measurementId: "G-XEEZX6NKTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
