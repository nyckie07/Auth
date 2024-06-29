import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfws1U3INEZ0iVgD34I4SPHxJkICZG7cA",
    authDomain: "carros-d6437.firebaseapp.com",
    projectId: "carros-d6437",
    storageBucket: "carros-d6437.appspot.com",
    messagingSenderId: "673686792734",
    appId: "1:673686792734:web:26c1b26601022d742adc0f",
    measurementId: "G-HM0Y5N798M"
};

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const app = initializeApp(firebaseConfig);

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
    });

    const signIn=document.getElementById('submitSignIn');
    signIn.addEventListener('click', (event) =>{
        event.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const auth=getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            showMessage('login is successful', 'signInMessage');
            const user=userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href='homepage.html';
        }) 
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode==='auth/invalid-credential'){
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else{
                showMessage('Account does not exist', 'signInMessage');
            }
        })
    })
