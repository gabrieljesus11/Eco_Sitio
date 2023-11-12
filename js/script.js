document.querySelector(".menu-toggle").addEventListener("click", function () {
  const menu = document.querySelector(".menu-list");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");

menuToggle.addEventListener("click", function () {
  menuList.classList.toggle("active");
  if (menuList.classList.contains("active")) {
    menuList.style.display = "flex";
  } else {
    menuList.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    menuList.style.display = "flex";
  } else if (!menuList.classList.contains("active")) {
    menuList.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  const cart = [];

  document.querySelectorAll(".purchase-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      cart.push(productId);
      console.log(cart);
    });
  });
});

let cart = [];

const products = [
  {
    id: "1",
    name: "Bolsa Reciclada",
    price: 100,
    imageUrl: "assets/storeImages/BolsaReciclada.jpg",
  },
  {
    id: "2",
    name: "Bombilla Bajo Consumo",
    price: 500,
    imageUrl: "assets/storeImages/BombillaBajoConsumo.jpg"
  {
    id: "3",
    name: "Kit Limpieza Sustentable",
    price: 1500,
    imageUrl: "assets/storeImages/kitLimpieza.jpeg",
  },
  {
    id: "4",
    name: "Kit Ledesma Sustentable",
    price: 2000,
    imageUrl: "assets/storeImages/Ledesma-NAT.jpg",
  },
  {
    id: "5",
    name: "Tenedores de bamboo",
    price: 100,
    imageUrl: "assets/storeImages/tenedores.jpg",
  },
];

function createProductCard(product) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100";

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.className = "card-img-top";
  img.alt = product.name;
  img.style = "width: auto; height: 200px; object-fit: contain;";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body d-flex flex-column";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = product.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = product.description;

  const cardPrice = document.createElement("p");
  cardPrice.className = "card-price";
  cardPrice.textContent = formatAsArgentinePesos(product.price);

  const purchaseBtn = document.createElement("button");
  purchaseBtn.className = "btn purchase-btn";
  purchaseBtn.textContent = "Comprar";
  purchaseBtn.setAttribute("data-product-id", product.id);
  purchaseBtn.onclick = function () {
    addToCart(product.id);
  };

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText);
  cardBodyDiv.appendChild(cardPrice);
  cardBodyDiv.appendChild(purchaseBtn);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBodyDiv);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

function formatAsArgentinePesos(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}

function displayProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}
document.addEventListener("DOMContentLoaded", displayProducts);

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error("Product not found!");
    return;
  }

  cart.push(product);
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartItemList = document.getElementById("cart-item-list");

  cartCount.textContent = cart.length;

  cartItemList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${formatAsArgentinePesos(item.price)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = function () {
      removeFromCart(index);
    };
    removeBtn.classList.add("remove-btn");

    li.appendChild(removeBtn);
    cartItemList.appendChild(li);
  });
}

function checkout() {
  if (cart.length > 0) {
    cart = [];
    updateCartDisplay();
    toggleCartList();
    alert("Muchas Gracias por tu compra!");
  }
}

function toggleCartList() {
  const cartDropdown = document.getElementById("cart-dropdown");
  cartDropdown.classList.toggle("show-cart");
}

document.querySelectorAll(".purchase-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    addToCart(productId);
  });
});
