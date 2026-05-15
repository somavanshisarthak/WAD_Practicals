// Get form using ID
let form = document.getElementById("registerForm");

// Run function when form is submitted
form.addEventListener("submit", function(e) {

    // Prevent page refresh
    e.preventDefault();

    // Get input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    // Create user object
    let user = {
        name: name,
        email: email
    };

    // Get old users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user into array
    users.push(user);

    // Save updated array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Alert message
    alert("Registration Successful");

    // Redirect to users page
    window.location.href = "users.html";
});