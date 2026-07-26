// ==========================================
// Smart Expense Tracker
// API Configuration File
// ==========================================



// ==========================
// BACKEND URL
// ==========================

const API_BASE_URL = "http://localhost:8080";



// ==========================
// AUTH APIs
// ==========================


const LOGIN_API =
API_BASE_URL + "/api/auth/login";


const REGISTER_API =
API_BASE_URL + "/api/users";




// ==========================
// USER PROFILE API
// ==========================


const PROFILE_API =
API_BASE_URL + "/profile";




// ==========================
// DASHBOARD API
// ==========================


const DASHBOARD_API =
API_BASE_URL + "/dashboard";




// ==========================
// CATEGORY APIs
// ==========================


const CATEGORY_API =
API_BASE_URL + "/categories";




// ==========================
// TRANSACTION APIs
// ==========================


const TRANSACTION_API =
API_BASE_URL + "/transactions";




// ==========================
// REPORT APIs
// ==========================


const MONTHLY_REPORT_API =
API_BASE_URL + "/reports/monthly";


const YEARLY_REPORT_API =
API_BASE_URL + "/reports/yearly";


const CATEGORY_REPORT_API =
API_BASE_URL + "/reports/category";




// ==========================================
// TOKEN MANAGEMENT
// ==========================================



function saveToken(token){


    localStorage.setItem(
        "token",
        token
    );


}





function getToken(){


    return localStorage.getItem(
        "token"
    );


}





function removeToken(){


    localStorage.removeItem(
        "token"
    );


}





function isLoggedIn(){


    return getToken() !== null;


}





function logout(){


    removeToken();


    window.location.href =
    "login.html";


}






// ==========================================
// COMMON HEADERS
// ==========================================



function getHeaders(){



    const token =
    getToken();




    return {


        "Content-Type":
        "application/json",



        "Authorization":

        token

        ?

        "Bearer " + token

        :

        ""

    };



}






// ==========================================
// LOGIN CHECK
// ==========================================



function checkLogin(){



    if(!isLoggedIn()){



        alert(
            "Please Login First"
        );



        window.location.href =
        "login.html";


    }


}






// ==========================================
// COMMON RESPONSE HANDLER
// ==========================================



async function handleResponse(response){



    if(response.status === 401){



        alert(
            "Session expired. Login again"
        );



        logout();


        return null;


    }




    if(!response.ok){



        const error =
        await response.text();



        throw new Error(error);


    }




    return await response.json();


}






// ==========================================
// GET REQUEST
// ==========================================



async function apiGet(url){



    const response =

    await fetch(

        url,

        {


            method:"GET",


            headers:getHeaders()


        }

    );



    return await handleResponse(response);


}






// ==========================================
// POST REQUEST
// ==========================================



async function apiPost(url,data){



    const response =

    await fetch(

        url,

        {


            method:"POST",


            headers:getHeaders(),


            body:
            JSON.stringify(data)


        }

    );



    return await handleResponse(response);


}







// ==========================================
// PUT REQUEST
// ==========================================



async function apiPut(url,data){



    const response =

    await fetch(

        url,

        {


            method:"PUT",


            headers:getHeaders(),


            body:
            JSON.stringify(data)


        }

    );



    return await handleResponse(response);


}







// ==========================================
// DELETE REQUEST
// ==========================================



async function apiDelete(url){



    const response =

    await fetch(

        url,

        {


            method:"DELETE",


            headers:getHeaders()


        }

    );



    if(response.status === 401){


        logout();


        return false;


    }



    return true;


}