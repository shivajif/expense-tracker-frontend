// ==========================================
// Expense Tracker
// Transactions Module
// ==========================================


checkLogin();


let transactions=[];

let categories=[];

let editTransactionId=null;



// ===============================
// Load Data
// ===============================


window.onload=function(){

    loadCategories();

    loadTransactions();

};




// ===============================
// Load Categories Dropdown
// ===============================


async function loadCategories(){


    try{


        const response = await fetch(

            CATEGORY_API,

            {

                method:"GET",

                headers:getHeaders()

            }

        );



        categories = await response.json();



        const select =
        document.getElementById("category");



        select.innerHTML="";



        categories.forEach(category=>{


            select.innerHTML += `

            <option value="${category.id}">

                ${category.name}

            </option>

            `;


        });



    }


    catch(error){

        console.log(error);

    }



}







// ===============================
// Load Transactions
// ===============================


async function loadTransactions(){



    try{


        const response = await fetch(

            TRANSACTION_API,

            {

                method:"GET",

                headers:getHeaders()

            }

        );



        if(!response.ok){

            throw new Error();

        }



        transactions =
        await response.json();



        displayTransactions(
            transactions
        );



    }



    catch(error){


        console.log(error);


        alert(
            "Unable to load transactions"
        );


    }



}








// ===============================
// Display Transactions
// ===============================


function displayTransactions(list){


    const container =
    document.getElementById(
        "transactionList"
    );



    container.innerHTML="";




    if(list.length===0){


        container.innerHTML=`

        <h2 style="color:white">

        No Transactions Found

        </h2>

        `;


        return;


    }






    list.forEach(transaction=>{



        let colorClass =
        transaction.type==="INCOME"
        ?
        "income"
        :
        "expense";




        container.innerHTML += `


        <div class="transaction-card ${colorClass}">


            <h3>

            <i class="fa-solid fa-money-bill">

            </i>

            ${transaction.title}

            </h3>



            <p>

            ${transaction.description || ""}

            </p>



            <p>

            Date :
            ${transaction.transactionDate}

            </p>



            <h2 class="amount">

            ₹ ${transaction.amount}

            </h2>



            <p>

            Type :
            ${transaction.type}

            </p>




            <div class="actions">


            <button

            class="edit"

            onclick="editTransaction(${transaction.id})">


            <i class="fa-solid fa-pen"></i>

            Edit


            </button>





            <button

            class="delete"

            onclick="deleteTransaction(${transaction.id})">


            <i class="fa-solid fa-trash"></i>

            Delete


            </button>



            </div>



        </div>



        `;



    });



}







// ===============================
// Open Popup
// ===============================


function openPopup(){


    document
    .getElementById("popup")
    .style.display="flex";



    clearForm();


}






// ===============================
// Close Popup
// ===============================


function closePopup(){


    document
    .getElementById("popup")
    .style.display="none";



    clearForm();


}






function clearForm(){



    document.getElementById("title").value="";

    document.getElementById("amount").value="";

    document.getElementById("type").value="EXPENSE";

    document.getElementById("date").value="";

    document.getElementById("description").value="";


    editTransactionId=null;


}







// ===============================
// Save Transaction
// ===============================


async function saveTransaction(){



    const transaction={



        title:
        document.getElementById("title").value,



        amount:
        Number(
        document.getElementById("amount").value
        ),



        type:
        document.getElementById("type").value,



        transactionDate:
        document.getElementById("date").value,



        description:
        document.getElementById("description").value,



        category:{


            id:
            Number(
            document.getElementById("category").value
            )


        }


    };





    let url=TRANSACTION_API;


    let method="POST";





    if(editTransactionId!=null){


        url += "/" + editTransactionId;


        method="PUT";


    }





    try{


        const response =
        await fetch(

            url,

            {

                method:method,

                headers:getHeaders(),

                body:
                JSON.stringify(transaction)

            }

        );





        if(!response.ok){


            const msg =
            await response.text();


            alert(msg);


            return;


        }





        if(method==="POST"){


            alert(
                "Transaction Added Successfully"
            );


        }

        else{


            alert(
                "Transaction Updated Successfully"
            );


        }





        closePopup();


        loadTransactions();



    }




    catch(error){


        console.log(error);


        alert(
            "Server Error"
        );


    }




}








// ===============================
// Edit Transaction
// ===============================


async function editTransaction(id){



    try{


        const response =
        await fetch(

            TRANSACTION_API+"/"+id,

            {

                headers:getHeaders()

            }

        );



        const transaction =
        await response.json();




        editTransactionId=id;



        document
        .getElementById("title")
        .value =
        transaction.title;



        document
        .getElementById("amount")
        .value =
        transaction.amount;



        document
        .getElementById("type")
        .value =
        transaction.type;




        document
        .getElementById("date")
        .value =
        transaction.transactionDate;



        document
        .getElementById("description")
        .value =
        transaction.description;




        document
        .getElementById("category")
        .value =
        transaction.category.id;




        document
        .getElementById("popup")
        .style.display="flex";



    }



    catch(error){

        console.log(error);

        alert(
            "Unable to load transaction"
        );

    }



}









// ===============================
// Delete Transaction
// ===============================


async function deleteTransaction(id){



    if(!confirm(
        "Delete this transaction?"
    )){

        return;

    }





    try{


        const response =
        await fetch(

            TRANSACTION_API+"/"+id,

            {

                method:"DELETE",

                headers:getHeaders()

            }

        );




        if(!response.ok){

            throw new Error();

        }




        alert(
            "Transaction Deleted Successfully"
        );



        loadTransactions();



    }




    catch(error){


        console.log(error);


        alert(
            "Unable to delete transaction"
        );


    }



}








// ===============================
// Search
// ===============================


function searchTransaction(){


    const keyword =
    document
    .getElementById("search")
    .value
    .toLowerCase();




    const filtered =
    transactions.filter(t=>

        t.title
        .toLowerCase()
        .includes(keyword)

    );



    displayTransactions(filtered);


}








// ===============================
// Filter
// ===============================


function filterTransaction(){



    const type =
    document
    .getElementById("typeFilter")
    .value;



    if(type==="ALL"){


        displayTransactions(
            transactions
        );


        return;

    }




    const filtered =
    transactions.filter(t=>

        t.type===type

    );



    displayTransactions(
        filtered
    );


}







// ===============================
// Popup Outside Click
// ===============================


window.onclick=function(event){


    const popup =
    document.getElementById("popup");



    if(event.target===popup){


        closePopup();


    }


};




// Escape close

document.addEventListener(
"keydown",
function(event){


    if(event.key==="Escape"){

        closePopup();

    }


});



// ==========================================
// End Transaction Module
// ==========================================