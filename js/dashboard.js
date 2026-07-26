// ==========================================
// Expense Tracker
// Dashboard Module
// ==========================================

// ===============================
// Login Check
// ===============================

checkLogin();

// ===============================
// Global Variables
// ===============================

let expenseChart = null;
let incomeExpenseChart = null;

// ===============================
// Page Load
// ===============================

window.onload = function () {

    loadDashboard();

    loadRecentTransactions();

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
// Close Sidebar (Mobile)
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
// Load Dashboard
// ===============================

async function loadDashboard() {

    try {

        const response =
            await fetch(

                DASHBOARD_API,

                {

                    method: "GET",

                    headers: getHeaders()

                }

            );

        if (response.status === 401) {

            logout();

            return;

        }

        if (!response.ok) {

            throw new Error("Dashboard Error");

        }

        const data =
            await response.json();

        document
            .getElementById("income")
            .innerHTML =
            "₹" +
            Number(data.totalIncome)
                .toLocaleString();

        document
            .getElementById("expense")
            .innerHTML =
            "₹" +
            Number(data.totalExpense)
                .toLocaleString();

        document
            .getElementById("balance")
            .innerHTML =
            "₹" +
            Number(data.balance)
                .toLocaleString();

        document
            .getElementById("username")
            .innerHTML =
            "Welcome Back 👋";

        loadCharts(data);

    }

    catch (error) {

        console.log(error);

        alert("Unable to load dashboard");

    }

}
// ===============================
// Load Charts
// ===============================

function loadCharts(data){

    const categoryNames =
        Object.keys(
            data.categorySpending || {}
        );

    const categoryAmounts =
        Object.values(
            data.categorySpending || {}
        );

    // Destroy old charts

    if(expenseChart){

        expenseChart.destroy();

    }

    if(incomeExpenseChart){

        incomeExpenseChart.destroy();

    }

    // ===============================
    // Expense By Category
    // ===============================

    expenseChart =

        new Chart(

            document.getElementById(
                "expenseChart"
            ),

            {

                type:"doughnut",

                data:{

                    labels:categoryNames,

                    datasets:[

                        {

                            label:"Expense",

                            data:categoryAmounts,

                            borderWidth:2

                        }

                    ]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    plugins:{

                        legend:{

                            position:"bottom"

                        }

                    }

                }

            }

        );



    // ===============================
    // Income vs Expense
    // ===============================

    incomeExpenseChart =

        new Chart(

            document.getElementById(
                "incomeExpenseChart"
            ),

            {

                type:"bar",

                data:{

                    labels:[

                        "Income",

                        "Expense"

                    ],

                    datasets:[

                        {

                            label:"Amount",

                            data:[

                                data.totalIncome,

                                data.totalExpense

                            ],

                            borderWidth:1

                        }

                    ]

                },

                options:{

                    responsive:true,

                    maintainAspectRatio:false,

                    scales:{

                        y:{

                            beginAtZero:true

                        }

                    }

                }

            }

        );

}
// ===============================
// Load Recent Transactions
// ===============================

async function loadRecentTransactions(){

    try{

        const response =

            await fetch(

                TRANSACTION_API + "/recent",

                {

                    method:"GET",

                    headers:getHeaders()

                }

            );

        if(response.status===401){

            logout();

            return;

        }

        if(!response.ok){

            throw new Error("Unable to load transactions");

        }

        const transactions =
            await response.json();

        const recent =
            document.getElementById(
                "recentTransactions"
            );

        recent.innerHTML="";

        if(transactions.length===0){

            recent.innerHTML=

            `

            <h3 style="text-align:center;padding:20px">

                No Transactions Found

            </h3>

            `;

            return;

        }

        transactions.forEach(transaction=>{

            recent.innerHTML +=

            `

            <div class="transaction">

                <div>

                    <h3>

                        ${transaction.title}

                    </h3>

                    <p>

                        ${
                            transaction.category
                            ?
                            transaction.category.name
                            :
                            "No Category"
                        }

                    </p>

                    <small>

                        ${transaction.transactionDate}

                    </small>

                </div>

                <div class="${
                    transaction.type==="INCOME"
                    ?
                    "incomeText"
                    :
                    "expenseText"
                }">

                    ${
                        transaction.type==="INCOME"
                        ?
                        "+"
                        :
                        "-"
                    }

                    ₹${Number(transaction.amount).toLocaleString()}

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}



// ===============================
// Close Sidebar After Menu Click
// ===============================

document
.querySelectorAll(".sidebar li")
.forEach(item=>{

    item.addEventListener("click",()=>{

        if(window.innerWidth<=900){

            closeSidebar();

        }

    });

});



// ===============================
// Window Resize
// ===============================

window.addEventListener("resize",()=>{

    if(window.innerWidth>900){

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

if(window.innerWidth>900){

    document
    .getElementById("sidebar")
    .classList
    .remove("collapsed");

}



// ==========================================
// End Dashboard Module
// ==========================================