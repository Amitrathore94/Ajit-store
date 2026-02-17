const container = document.getElementById("ordersContainer");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  container.innerHTML = "<p>No orders placed yet</p>";
} else {

  orders.reverse().forEach(order => {

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `
        <li>
          ${item.name} - ₹${item.price} × ${item.qty}
        </li>
      `;
    });

    container.innerHTML += `
      <div class="order-card">
        <h3>Order ID: ${order.id}</h3>
        <p><b>Date:</b> ${order.date}</p>
        <p><b>Name:</b> ${order.name}</p>
        <p><b>Address:</b> ${order.address}</p>
        <p><b>Payment:</b> ${order.payment}</p>

        <b>Items:</b>
        <ul>${itemsHTML}</ul>
        <hr>
      </div>
    `;
  });
}