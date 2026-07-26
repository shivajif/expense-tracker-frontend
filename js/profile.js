// ==========================================
// Expense Tracker
// Profile Module
// ==========================================

// ===============================
// Login Check
// ===============================

checkLogin();


// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadProfile();

};


// ===============================
// Sidebar Toggle
// ===============================

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    if (window.innerWidth <= 900) {

        sidebar.classList.toggle("show");

        overlay.classList.toggle("show");

    }

    else {

        sidebar.classList.toggle("collapsed");

    }

}


// ===============================
// Close Sidebar
// ===============================

function closeSidebar() {

    document
        .getElementById("sidebar")
        .classList
        .remove("show");

    document
        .getElementById("overlay")
        .classList
        .remove("show");

}


// ===============================
// Auto Close Sidebar
// ===============================

document.addEventListener("click", function (event) {

    if (window.innerWidth > 900) {

        return;

    }

    const sidebar =
        document.getElementById("sidebar");

    const menu =
        document.querySelector(".menu-btn");

    if (

        !sidebar.contains(event.target)

        &&

        !menu.contains(event.target)

    ) {

        closeSidebar();

    }

});


// ===============================
// Load Profile
// ===============================

async function loadProfile() {

    try {

        const response =

            await fetch(

                PROFILE_API,

                {

                    method: "GET",

                    headers: getHeaders()

                }

            );

        console.log(
            "Profile Status:",
            response.status
        );

        if (response.status === 401) {

            logout();

            return;

        }

        if (!response.ok) {

            throw new Error("Unable to Load Profile");

        }

        const user =
            await response.json();

        console.log(user);

        document
            .getElementById("profileName")
            .innerHTML =
            user.name;

        document
            .getElementById("profileEmail")
            .innerHTML =
            user.email;

        document
            .getElementById("name")
            .value =
            user.name;

        document
            .getElementById("email")
            .value =
            user.email;

        document
            .getElementById("welcomeText")
            .innerHTML =
            "Welcome " + user.name;

    }

    catch (error) {

        console.log(error);

        alert("Profile Loading Failed");

    }

}
function updatePassword() {

    alert("Password update feature is under development.");

}
// ===============================
// Update Profile
// ===============================

async function updateProfile() {

    let name =
        document
        .getElementById("name")
        .value
        .trim();

    let email =
        document
        .getElementById("email")
        .value
        .trim();

    if (name === "") {

        alert("Name Required");

        return;

    }

    const data = {

        name: name,

        email: email

    };

    try {

        const response =

            await fetch(

                PROFILE_API,

                {

                    method: "PUT",

                    headers: getHeaders(),

                    body: JSON.stringify(data)

                }

            );

        console.log(
            "Update Status:",
            response.status
        );

        if (response.status === 401) {

            logout();

            return;

        }

        if (!response.ok) {

            throw new Error("Profile Update Failed");

        }

        const user =
            await response.json();

        console.log(user);

        alert("Profile Updated Successfully");

        loadProfile();

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

}


// ===============================
// Close Sidebar After Menu Click
// ===============================

document
.querySelectorAll(".sidebar li")
.forEach(item => {

    item.addEventListener("click", () => {

        if (window.innerWidth <= 900) {

            closeSidebar();

        }

    });

});


// ===============================
// Window Resize
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        document
        .getElementById("sidebar")
        .classList
        .remove("show");

        document
        .getElementById("overlay")
        .classList
        .remove("show");

    }

});


// ===============================
// Sidebar State (Desktop)
// ===============================

if (window.innerWidth > 900) {

    document
    .getElementById("sidebar")
    .classList
    .remove("collapsed");

}


// ==========================================
// End Profile Module
// ==========================================