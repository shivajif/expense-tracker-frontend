// ==========================================
// Smart Expense Tracker
// API Configuration File
// ==========================================

// ==========================
// BACKEND URL
// ==========================

const API_BASE_URL = "https://expense-tracker-production-c35c.up.railway.app/api";


// ==========================
// AUTH APIs
// ==========================

const LOGIN_API = API_BASE_URL + "/auth/login";
const REGISTER_API = API_BASE_URL + "/users";


// ==========================
// USER PROFILE API
// ==========================

const PROFILE_API = API_BASE_URL + "/users/profile";


// ==========================
// DASHBOARD API
// ==========================

const DASHBOARD_API = API_BASE_URL + "/dashboard";


// ==========================
// CATEGORY APIs
// ==========================

const CATEGORY_API = API_BASE_URL + "/categories";


// ==========================
// TRANSACTION APIs
// ==========================

const TRANSACTION_API = API_BASE_URL + "/transactions";


// ==========================
// REPORT APIs
// ==========================

const MONTHLY_REPORT_API = API_BASE_URL + "/reports/monthly";
const YEARLY_REPORT_API = API_BASE_URL + "/reports/yearly";
const CATEGORY_REPORT_API = API_BASE_URL + "/reports/category";


// ==========================================
// TOKEN MANAGEMENT
// ==========================================

function saveToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function removeToken() {
    localStorage.removeItem("token");
}

function isLoggedIn() {
    return getToken() !== null;
}

function logout() {
    removeToken();
    window.location.href = "login.html";
}


// ==========================================
// COMMON HEADERS
// ==========================================

function getHeaders() {

    const token = getToken();

    return {
        "Content-Type": "application/json",
        "Authorization": token ? "Bearer " + token : ""
    };
}


// ==========================================
// LOGIN CHECK
// ==========================================

function checkLogin() {

    if (!isLoggedIn()) {

        alert("Please Login First");

        window.location.href = "login.html";
    }
}


// ==========================================
// RESPONSE HANDLER
// ==========================================

async function handleResponse(response) {

    if (response.status === 401) {

        alert("Session Expired");

        logout();

        return null;
    }

    if (!response.ok) {

        throw new Error(await response.text());
    }

    return await response.json();
}


// ==========================================
// GET
// ==========================================

async function apiGet(url) {

    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders()
    });

    return await handleResponse(response);
}


// ==========================================
// POST
// ==========================================

async function apiPost(url, data) {

    const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });

    return await handleResponse(response);
}


// ==========================================
// PUT
// ==========================================

async function apiPut(url, data) {

    const response = await fetch(url, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });

    return await handleResponse(response);
}


// ==========================================
// DELETE
// ==========================================

async function apiDelete(url) {

    const response = await fetch(url, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (response.status === 401) {
        logout();
        return false;
    }
    return response.ok;
}