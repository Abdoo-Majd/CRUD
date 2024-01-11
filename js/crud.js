// --- Vars ---- // 
const priceInput = document.getElementById("price");
const taxesInput = document.getElementById("taxes");
const adsInput = document.getElementById("ads");
const discountInput = document.getElementById("discount");
const totalElement = document.getElementById("total");

let create = document.getElementById("create");
let tbody = document.getElementById("tbody");
let count = document.getElementById("count") ; 

// Total //

// Function to calculate and update the total dynamically

function getTotal() {


    // Get numeric values from input fields or default to 0 if input is not a number
    
    const price = parseFloat(priceInput.value);
    const taxes = parseFloat(taxesInput.value);
    const ads = parseFloat(adsInput.value);
    const discount = parseFloat(discountInput.value);

    // Calculate the total
    const totalValue = price + taxes + ads - discount;

    // Update the total element
    totalElement.textContent = totalValue.toFixed(2);

    // Adjust the background color based on the input
    const isEmpty = price === 0 && taxes === 0 && ads === 0 && discount === 0;
    const isNegative = totalValue < 0;

    if (isEmpty) {
        totalElement.style.background = 'red';
    } else if (isNegative) {
        totalElement.style.background = 'yellow';
    } else {
        totalElement.style.background = 'green';
    }
}

// Attach the input event listener to all relevant input fields


// Call the getTotal function initially to set the initial state
getTotal();


let dataPro = [];

create.addEventListener("click", function(e) {
    e.preventDefault();

    // Check if all input fields are empty

    const areAllInputsEmpty = (
        title.value.trim() === '' ||
        price.value.trim() === '' ||
        taxes.value.trim() === '' ||
        ads.value.trim() === '' ||
        discount.value.trim() === ''
    );

    // Toggle background class based on empty inputs

    if (areAllInputsEmpty) {
        create.classList.add('red-background');
        create.classList.remove('green-background');
    } else {
        create.classList.remove('red-background');
        create.classList.add('green-background');
    }

    // Create data only if no input fields are empty

    if (!areAllInputsEmpty) {
        let newPro = {
            title: title.value.toLowerCase(),
            price: parseFloat(price.value),
            taxes: parseFloat(taxes.value),
            ads: parseFloat(ads.value),
            discount: parseFloat(discount.value),
            total: total.innerHTML,
            count : parseFloat(count.value)
        }

        if(1 < newPro.count < 6 ) {
            for (let i = 0; i < newPro.count; i++) {
                  // Push the data to the array
                  dataPro.push(newPro);
            }
        }         
        else { 
         dataPro.push(newPro)
        }
 
        // Save it in localStorage
        localStorage.setItem("product", JSON.stringify(dataPro));

        // Show data in the table
        showData();
    }

});

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td><button class="btn update" onclick="updateData(${i})" id="update">Update</button></td>
                <td><button class="btn delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `
    }

    tbody.innerHTML = table;
}


// Load data from localStorage when the page loads

if (localStorage.product) {
    dataPro = JSON.parse(localStorage.product);
    showData();
}


// Delete Line 

function deleteData(i) {
    dataPro.splice(i ,1) ; 
    localStorage.product = JSON.stringify(dataPro) ; 
}

// Update Data 

function updateData(i) { 
    price.value =  dataPro[i].title  ; 
    taxesInput.value = dataPro[i].taxes ; 
    adsInput.value = dataPro[i].ads ; 
    
}

