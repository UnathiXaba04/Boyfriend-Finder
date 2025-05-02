// Select elements
const signInSection = document.querySelector('.Signin');
const signUpSection = document.querySelector('.Signup');
const welcomeSection = document.querySelector('.Welcome');
const returnSection = document.querySelector('.return');
const signUpButton = document.querySelector('.Welcome button');
const returnSignInButton = document.querySelector('.return button');
const signUpForm = document.querySelector('.form_signup button');
const signInForm = document.querySelector('.form_signin button');
const homeLink = document.querySelector('.home-link');

// By default, show Sign In and Welcome, hide others
signInSection.style.display = 'block';
welcomeSection.style.display = 'block';
signUpSection.style.display = 'none';
returnSection.style.display = 'none';

// When "Sign up" button is clicked
signUpButton.addEventListener('click', () => {
    signInSection.style.display = 'none';
    welcomeSection.style.display = 'none';
    signUpSection.style.display = 'block';
    returnSection.style.display = 'block';
});

// When "Sign In" button (on return page) is clicked
returnSignInButton.addEventListener('click', () => {
    signUpSection.style.display = 'none';
    returnSection.style.display = 'none';
    signInSection.style.display = 'block';
    welcomeSection.style.display = 'block';
});

// Handle Sign Up
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('Name').value;
    const surname = document.getElementById('Surname').value;
    const username = document.getElementById('signup-username').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('Email').value;
    const createPassword = document.getElementById('Create_password').value;
    const reenterPassword = document.getElementById('password').value;

    // Simple validation (ensure passwords match)
    if (createPassword !== reenterPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already taken');
        return;
    }

    // Save new user to localStorage
    users.push({ name, surname, username, phone, email, password: createPassword });
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to Home page
    window.location.href = 'home.html';  // Change this URL if you have a specific home page
});

// Handle Sign In
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username and password match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Redirect to Home page
        window.location.href = 'home.html';  // Change this URL if you have a specific home page
    } else {
        alert('Invalid username or password');
    }
});

