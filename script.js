function toggleMenu(){
    document.getElementById("nav").classList.toggle("show");
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}
function goBack(){
        window.history.back();
     }


function filterCategory(category){
    const products = document.querySelectorAll(".product-card");

    products.forEach(product=>{
        if(category === "all"){
            product.style.display="block";
        }else{
            if(product.classList.contains(category)){
                product.style.display="block";
            }else{
                product.style.display="none";
            }
        }
    });
}

/* ---------- ADD TO CART ---------- */
function addToCart(name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

/* ---------- LOAD CART PAGE ---------- */
function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cartItems");
    let total = 0;

    if(!cartDiv) return;

    if(cart.length === 0){
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    let html = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.qty;
        total += itemTotal;

        html += `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.qty}</p>
            </div>

            <div class="cart-actions">
                <button onclick="changeQty(${index},1)">+</button>
                <button onclick="changeQty(${index},-1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>

            <div class="cart-price">
                ₹${itemTotal}
            </div>
        </div>
        `;
    });

    cartDiv.innerHTML = html;
    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}

function checkout(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0){
        alert("cart is empty!");
        return;
    }

    window.location.herf = "checkout.html";
}

/* ---------- CHANGE QTY ---------- */
function changeQty(index, change){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += change;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

/* ---------- REMOVE ITEM ---------- */
function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

/* ---------- CLEAR CART ---------- */
function clearCart(){
    localStorage.removeItem("cart");
   

    const cartContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("totalPrice");

    if (cartContainer){
        cartContainer.innerHTML  = "<p>Your Cart is Empty</p>";    }

        if(totalElement){
            totalElement.innerText = "₹0"
        }
    loadCart();
}