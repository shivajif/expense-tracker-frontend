// ==========================================
// Expense Tracker
// Registration Module
// ==========================================



async function registerUser(){



let name =
document.getElementById("name").value.trim();



let email =
document.getElementById("email").value.trim();



let password =
document.getElementById("password").value.trim();



let confirmPassword =
document.getElementById("confirmPassword").value.trim();






if(
name === "" ||
email === "" ||
password === "" ||
confirmPassword === ""
){

alert("Please fill all fields");

return;

}






let emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(!emailPattern.test(email)){


alert("Enter valid email");

return;

}







let passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



if(!passwordPattern.test(password)){


alert(
"Password must contain minimum 8 characters with uppercase, lowercase and number"
);


return;

}






if(password !== confirmPassword){


alert("Passwords do not match");


return;

}








let user = {


name:name,

email:email,

password:password


};









try{


let response =
await fetch(

REGISTER_API,

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(user)


}


);








let data =
await response.json();






if(!response.ok){


alert(
data.message || "Registration Failed"
);


return;


}







alert(
"Registration Successful"
);




window.location.href =
"login.html";




}



catch(error){



console.log(error);


alert(
"Server Error"
);


}



}