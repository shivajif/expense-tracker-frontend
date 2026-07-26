// ==========================================
// Expense Tracker
// Reports Module Updated
// ==========================================


checkLogin();


let reportData=null;

let categoryChart=null;

let incomeExpenseChart=null;



window.onload=function(){

    setCurrentMonth();

    changeTableHeader();

    loadReport();

};




// ===============================
// Current Month
// ===============================


function setCurrentMonth(){


    let date=new Date();


    let month=date.getMonth()+1;

    let year=date.getFullYear();



    if(month<10){

        month="0"+month;

    }



    document.getElementById("month").value =
    year+"-"+month;


}









// ===============================
// Load Report
// ===============================


async function loadReport(){


try{


let type =
document.getElementById("reportType").value;



let selectedDate =
document.getElementById("month").value;



let year =
selectedDate.split("-")[0];


let month =
selectedDate.split("-")[1];



let url;



if(type==="monthly"){


url =
MONTHLY_REPORT_API+
"?month="+
Number(month)+
"&year="+
Number(year);


}



else if(type==="yearly"){


url =
YEARLY_REPORT_API+
"?year="+
Number(year);


}



else{


url =
CATEGORY_REPORT_API+
"?month="+
Number(month)+
"&year="+
Number(year);


}





const response =
await fetch(

url,

{

headers:getHeaders()

}

);




if(!response.ok){

throw new Error("Report Loading Failed");

}



reportData =
await response.json();




displayReport(reportData);



}

catch(error){


console.log(error);

alert(error.message);


}


}











// ===============================
// Display Report
// ===============================


async function displayReport(data){



let income =
data.totalIncome || 0;


let expense =
data.totalExpense || 0;


let balance =
data.balance || 0;





document.getElementById("income").innerHTML =
"₹"+income.toLocaleString();



document.getElementById("expense").innerHTML =
"₹"+expense.toLocaleString();



document.getElementById("balance").innerHTML =
"₹"+balance.toLocaleString();





loadCategorySpending();



loadIncomeExpenseChart(

income,

expense

);



loadTable(data);



}









// ===============================
// Category Spending
// ===============================


async function loadCategorySpending(){



try{


let selectedDate =
document.getElementById("month").value;



let year =
selectedDate.split("-")[0];


let month =
selectedDate.split("-")[1];




let response =
await fetch(

CATEGORY_REPORT_API+
"?month="+
Number(month)+
"&year="+
Number(year),

{

headers:getHeaders()

}

);





let data =
await response.json();





loadCategoryChart(

data.categoryTotals || {}

);



}


catch(error){

console.log(error);

}


}









// ===============================
// Category Chart
// ===============================


function loadCategoryChart(data){



if(categoryChart){

categoryChart.destroy();

}




categoryChart =

new Chart(

document.getElementById("categoryChart"),

{


type:"doughnut",



data:{


labels:Object.keys(data),


datasets:[{


data:Object.values(data)


}]


},




options:{


responsive:true,


plugins:{


legend:{


position:"bottom"


}


}


}



}

);



}











// ===============================
// Income Expense Chart
// ===============================


function loadIncomeExpenseChart(
income,
expense
){



if(incomeExpenseChart){

incomeExpenseChart.destroy();

}





incomeExpenseChart =

new Chart(

document.getElementById("incomeChart"),

{


type:"bar",



data:{


labels:[

"Income",

"Expense"

],



datasets:[{


label:"Amount",


data:[

income,

expense

]


}]


},




options:{


responsive:true,


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
// Table
// ===============================


function loadTable(data){


    let table =
    document.getElementById("reportTable");


    let header =
    document.getElementById("tableHeader");


    let type =
    document.getElementById("reportType").value;



    table.innerHTML="";



    // CATEGORY WISE

    if(type==="category"){


        header.innerHTML=`

        <th>
        Category
        </th>

        <th>
        Amount
        </th>

        `;



        let categories =
        data.categoryTotals || {};



        Object.keys(categories).forEach(category=>{


            table.innerHTML += `

            <tr>

            <td>
            ${category}
            </td>


            <td>
            ₹${categories[category]}
            </td>


            </tr>

            `;


        });



        return;


    }






    // MONTHLY / YEARLY SUMMARY


    header.innerHTML=`

    <th>
    Title
    </th>

    <th>
    Amount
    </th>

    <th>
    Type
    </th>

    <th>
    Date
    </th>

    `;



    table.innerHTML +=


    `

    <tr>

    <td>
    Total Income
    </td>

    <td>
    ₹${data.totalIncome || 0}
    </td>

    <td>
    INCOME
    </td>

    <td>
    ${data.month || data.year}
    </td>

    </tr>




    <tr>

    <td>
    Total Expense
    </td>

    <td>
    ₹${data.totalExpense || 0}
    </td>

    <td>
    EXPENSE
    </td>

    <td>
    ${data.month || data.year}
    </td>

    </tr>





    <tr>

    <td>
    Balance
    </td>

    <td>
    ₹${data.balance || 0}
    </td>

    <td>
    BALANCE
    </td>

    <td>
    ${data.month || data.year}
    </td>

    </tr>


    `;


}











// ===============================
// Change Report
// ===============================


function changeReport(){



let type =
document.getElementById("reportType").value;


let month =
document.getElementById("month");





if(type==="yearly"){


month.style.display="none";


}

else{


month.style.display="block";


}




changeTableHeader();



}











// ===============================
// Dynamic Table Header
// ===============================


function changeTableHeader(){



let type =
document.getElementById("reportType").value;



let header =
document.getElementById("dateHeader");




if(type==="monthly"){


header.innerHTML="Month";


}



else if(type==="yearly"){


header.innerHTML="Year";


}



else{


header.innerHTML="Category";


}



}









// ===============================
// Download CSV
// ===============================

function downloadReport(){

    if(reportData==null){

        alert("Generate Report First");

        return;

    }

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    let type=document.getElementById("reportType").value;

    doc.setFontSize(20);
    doc.text("Expense Tracker Report",15,20);

    doc.setFontSize(12);

    doc.text("Report Type : "+type.toUpperCase(),15,32);

    if(type==="monthly"){

        doc.text(
            "Month : "+reportData.month+" / "+reportData.year,
            15,
            40
        );

    }

    if(type==="yearly"){

        doc.text(
            "Year : "+reportData.year,
            15,
            40
        );

    }

    doc.autoTable({

        startY:50,

        head:[

            [
                "Title",
                "Amount",
                "Type"
            ]

        ],

        body:[

            [
                "Total Income",
                "₹"+reportData.totalIncome,
                "INCOME"
            ],

            [
                "Total Expense",
                "₹"+reportData.totalExpense,
                "EXPENSE"
            ],

            [
                "Balance",
                "₹"+reportData.balance,
                "BALANCE"
            ]

        ]

    });

    if(type==="category"){

        let rows=[];

        Object.keys(reportData.categoryTotals).forEach(function(key){

            rows.push([

                key,

                "₹"+reportData.categoryTotals[key]

            ]);

        });

        doc.autoTable({

            head:[

                [
                    "Category",
                    "Amount"
                ]

            ],

            body:rows,

            startY:doc.lastAutoTable.finalY+15

        });

    }

    doc.save("Expense_Report.pdf");

}