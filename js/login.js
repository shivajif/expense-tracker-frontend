document
.getElementById("loginForm")
.addEventListener("submit",loginUser);



async function loginUser(e){

    e.preventDefault();



    const email=document.getElementById("email").value;

    const password=document.getElementById("password").value;



    const user={

        email:email,

        password:password

    };



    try{

        const response=await fetch(LOGIN_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(user)

        });

if (response.ok) {

    const data = await response.json();

    console.log("Response:", data);

    console.log("Token:", data.token);

    saveToken(data.token);

    console.log("Saved Token:", localStorage.getItem("token"));

    alert("Login Successful");

    window.location.href = "dashboard.html";

}

        else{

            alert("Invalid Email or Password");

        }

    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }

}
