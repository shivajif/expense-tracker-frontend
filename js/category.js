// ==========================================
// Expense Tracker
// Categories Module
// ==========================================

checkLogin();

let categories = [];

let editCategoryId = null;


// ===============================
// Load Categories
// ===============================

window.onload = function(){

    loadCategories();

}



// ===============================
// Get All Categories
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



        if(!response.ok){

            throw new Error("Unable to load categories");

        }



        categories = await response.json();



        displayCategories(categories);

    }

    catch(error){

        console.log(error);

        alert("Failed to load categories");

    }

}



// ===============================
// Display Categories
// ===============================

function displayCategories(categoryList){

    const container = document.getElementById("categoryList");

    container.innerHTML="";



    if(categoryList.length==0){

        container.innerHTML=`

        <h2 style="color:white;text-align:center;width:100%;">

            No Categories Found

        </h2>

        `;

        return;

    }



    categoryList.forEach(category=>{

        container.innerHTML += `

        <div class="category-card">

            <h3>

                <i class="fa-solid fa-folder"></i>

                ${category.name}

            </h3>

            <div class="actions">

                <button

                    class="edit"

                    onclick="editCategory(${category.id})">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                </button>



                <button

                    class="delete"

                    onclick="deleteCategory(${category.id})">

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



    document

    .getElementById("categoryName")

    .value="";



    editCategoryId=null;

}



// ===============================
// Close Popup
// ===============================

function closePopup(){

    document

    .getElementById("popup")

    .style.display="none";



    document

    .getElementById("categoryName")

    .value="";



    editCategoryId=null;

}



// ===============================
// Save Category
// ===============================

async function saveCategory(){

    const name = document

    .getElementById("categoryName")

    .value

    .trim();



    if(name===""){

        alert("Enter Category Name");

        return;

    }



    const category={

        name:name

    };



    let url = CATEGORY_API;

    let method="POST";



    if(editCategoryId!=null){

        url += "/" + editCategoryId;

        method="PUT";

    }



    try{

        const response = await fetch(

            url,

            {

                method:method,

                headers:getHeaders(),

                body:JSON.stringify(category)

            }

        );



        if(!response.ok){

            const msg = await response.text();

            alert(msg);

            return;

        }



        if(method=="POST"){

            alert("Category Added Successfully");

        }

        else{

            alert("Category Updated Successfully");

        }



        closePopup();

        loadCategories();

    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }

}
// ===============================
// Edit Category
// ===============================

async function editCategory(id){

    try{

        const response = await fetch(

            CATEGORY_API + "/" + id,

            {

                method:"GET",

                headers:getHeaders()

            }

        );



        if(!response.ok){

            throw new Error("Category Not Found");

        }



        const category = await response.json();



        editCategoryId = id;



        document

        .getElementById("categoryName")

        .value = category.name;



        document

        .getElementById("popup")

        .style.display = "flex";



    }

    catch(error){

        console.log(error);

        alert("Unable to Load Category");

    }

}





// ===============================
// Delete Category
// ===============================

async function deleteCategory(id){

    const confirmDelete = confirm(

        "Are you sure you want to delete this category?"

    );



    if(!confirmDelete){

        return;

    }



    try{

        const response = await fetch(

            CATEGORY_API + "/" + id,

            {

                method:"DELETE",

                headers:getHeaders()

            }

        );



        if(!response.ok){

            throw new Error("Delete Failed");

        }



        alert("Category Deleted Successfully");



        loadCategories();

    }

    catch(error){

        console.log(error);

        alert("Unable to Delete Category");

    }

}





// ===============================
// Search Category
// ===============================

function searchCategory(){

    const keyword = document

        .getElementById("search")

        .value

        .toLowerCase();



    const filteredCategories = categories.filter(

        category =>

            category.name

            .toLowerCase()

            .includes(keyword)

    );



    displayCategories(filteredCategories);

}





// ===============================
// Refresh Categories
// ===============================

function refreshCategories(){

    loadCategories();

}





// ===============================
// Escape HTML (Security)
// ===============================

function escapeHtml(text){

    return text

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}





// ===============================
// Keyboard Support
// ===============================

document.addEventListener(

    "keydown",

    function(event){

        if(event.key==="Escape"){

            closePopup();

        }

    }

);





// ===============================
// Popup Outside Click Close
// ===============================

window.onclick = function(event){

    const popup = document.getElementById("popup");



    if(event.target==popup){

        closePopup();

    }

}





// ===============================
// Authentication Check
// ===============================

if(!getToken()){

    window.location.href="login.html";

}





// ===============================
// End of Categories Module
// ===============================