function collectData() {
    const productName = document.getElementById('productName').value
    const productPrice = parseInt(document.getElementById('productPrice').value)
    const productCategory = document.getElementById('productCategory').value; 
    const imageUrl = document.getElementById('imageUrl').value

    if (productPrice <= 0) {
        alert('Please enter a valid price.');
        return null;
    }

    return {
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory,
        imageUrl: imageUrl
    };
}

function addProductToTable(event) {
    event.preventDefault()

    const data = collectData()
    saveProductToLocalStorage(data); 
    renderProductToTable(data); 
    clearForm(); 
}


//saving to localStorage
function saveProductToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || []; 
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));  
}

// Show product in cart
function renderProductToTable(product) {
    const tableBody = document.getElementById('productContainer');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${product.productName}</td>
        <td>${product.productPrice}</td>
        <td>${product.productCategory}</td>
        <td><img src="${product.imageUrl}" alt="Product Image" width="100"></td>
        <td><button class="delete-btn" onclick="deleteProduct(event, '${product.productName}')">Delete</button></td>
        `;

    tableBody.appendChild(row);
}

// Form cleaning
function clearForm() {
    document.getElementById('productForm').reset();
}

    // Deleting a product from a table

function deleteProduct(event, productName) {
    const row = event.target.closest('tr');
    row.remove();

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.productName !== productName); 
    localStorage.setItem('products', JSON.stringify(products)); 
}

function loadProductsFromLocalStorage() {
    const productsJSON = localStorage.getItem('products');
    if (productsJSON) {
        const products = JSON.parse(productsJSON);
        products.forEach(product => renderProductToTable(product));
    }
} 
window.onload = function() {
loadProductsFromLocalStorage();
}