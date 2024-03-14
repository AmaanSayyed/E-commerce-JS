//initializing data 
let shoppingList = [];

//when page is loaded the data from local storage is retrieved
window.addEventListener('load', () => {
    const storedShoppingList = localStorage.getItem('shoppingList');
    if (storedShoppingList) {
        shoppingList = JSON.parse(storedShoppingList);
        updateList(); // Update the displayed shopping list
    }
}); 

const prod_data = [
    {
        name: 'TOSHIBA LAPTOP|Dynabook Satellite Pro C40',
        price: 42000,
        quantity: 8,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp',
    },
    {
        name: 'Apple iPad (10th Generation)',
        price: 80000,
        quantity: 5,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/2.webp',
    },
    {
        name: 'Macbook Air ',
        price: 120000,
        quantity: 3,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp',
    },
    {
        name: 'Sony 55-inch 4K TV',
        price: 70000,
        quantity: 2,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/14.webp',
    },
    {
        name: 'Chromebook i9 Infinity',
        price: 55000,
        quantity: 10,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp',
    },
    {
        name: 'Canon DSLR Camera',
        price: 35000,
        quantity: 7,
        image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/9.webp',
    }
];

//1. Adding prewritten data to empty/input shoppingList[] 
const productContainer = document.getElementById('product-container');

const addToShoppingList = (itemName, itemQuantity, itemPrice) => {
    if(itemQuantity<=0) {
        alert('Please enter valid item details.');
        return;
    }

    // Check for duplicates
    if (shoppingList.some(item => item.name.toLowerCase() === itemName.toLowerCase())) {
        alert('Item already exists in the list.');
        return;
    }
    shoppingList.push({ name: itemName, quantity: itemQuantity, cost: itemPrice });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    alert("Item added successfully");
    window.location.href='cart.html';
    updateList();
}

//2.Display Data 
const DisplayData = () => {
    //iterate over prod_data 
    prod_data.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-12 col-lg-4 mb-4 mb-lg-0';
        productCard.innerHTML = `
            <div class="card mt-5">
                <img src="${item.image}" class="card-img-top" alt="${item.name}" />
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <p class="small"><a href="#!" class="text-muted">${item.name}</a></p>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <h5 class="mb-0 itemName" style="height: 50px; overflow: hidden;">${item.name}</h5>
                        <h5 class="text-dark mb-0" itemPrice>${item.price}₹</h5>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <p class="text-muted mb-0">Available: <span class="fw-bold itemQuantity">${item.quantity}</span></p>
                        <div class="ms-auto text-warning">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <div class="input-group">
                            <input type="number" class="form-control quantityInput" value="1" min="1" max="${item.quantity}">
                            <button class="btn btn-success add_product"> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);

        // Add event listener to the "Add to Cart" button
        const addToCartBtn = productCard.querySelector('.add_product');

        addToCartBtn.addEventListener('click', () => {
            const quantityInput = productCard.querySelector('.quantityInput');
            const quantity = parseInt(quantityInput.value);
            
            addToShoppingList(item.name, quantity, item.price);
        });
    });
}

DisplayData();

//script for adding item from input field


//Adding user input items to shopingList
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    // Validate input
    if (itemName.trim() === '' || itemQuantity <= 0) {
        alert('Please enter valid item details.');
        return;
    }

    // Check for duplicates
    if (shoppingList.some(item => item.name.toLowerCase() === itemName.toLowerCase())) {
        alert('Item already exists in the list.');
        return;
    }

    const item = {
        name: itemName,
        quantity: parseInt(itemQuantity),
        cost: Math.floor(Math.random() * (40000 - 20000 + 1)) + 20000

    };

    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateList();
}
//updating list after adding/removing items 
function updateList() {
    const shoppingListContainer = document.getElementById('shoppingList');
    const totalCostElement = document.getElementById('totalCost');

    shoppingListContainer.innerHTML = '';

    let totalCost = 0;

    shoppingList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'mb-2';

        itemDiv.innerHTML = `
            <div class="d-flex justify-content-between">
                <p>${item.name} - ${item.quantity} units</p>
                <p>₹${(item.quantity * item.cost).toFixed(2)}</p>
                <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;

        totalCost += item.quantity * item.cost;

        shoppingListContainer.appendChild(itemDiv);
    });

    totalCostElement.innerText = totalCost.toFixed(2);
}

//removeItem passed to button will remove that item 
function removeItem(itemName) {
    shoppingList = shoppingList.filter(item => item.name.toLowerCase() !== itemName.toLowerCase());
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateList();
}

//emptying the whole list 
function clearList() {
    shoppingList = [];
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    updateList();
}

function searchItems() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();

    const filteredList = shoppingList.filter(item => item.name.toLowerCase().includes(keyword));
    updateListWithFilter(filteredList);
}
//when searching for item list will be displayed according to keyword
function updateListWithFilter(filteredList) {
    const shoppingListContainer = document.getElementById('shoppingList');
    const totalCostElement = document.getElementById('totalCost');

    shoppingListContainer.innerHTML = '';

    let totalCost = 0;

    filteredList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'mb-2';

        itemDiv.innerHTML = `
            <div class="d-flex justify-content-between">
                <p>${item.name} - ${item.quantity} units</p>
                <p>$${(item.quantity * item.cost).toFixed(2)}</p>
                <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;

        totalCost += item.quantity * item.cost;

        shoppingListContainer.appendChild(itemDiv);
    });

    totalCostElement.innerText = totalCost.toFixed(2);
}

// Function to clear the search and show the entire list
function clearSearch() {
    document.getElementById('searchKeyword').value = '';
    updateList();
}
