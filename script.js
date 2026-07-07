const listaProductos = document.getElementById("lista-productos");
const itemsCarrito = document.getElementById("items-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const totalElemento = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const nombresClases = [
  "Clase Inicial",
  "Clase Intermedia",
  "Clase Avanzada",
  "Improvisación y Solos",
  "Armonía Moderna",
  "Técnicas Profesionales"
];

fetch("https://fakestoreapi.com/products?limit=6")
  .then(res => res.json())
  .then(productos => {
    productos.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${producto.image}" alt="${nombresClases[index]}" width="120">
        <h3>${nombresClases[index]}</h3>
        <p>$${producto.price}</p>

        <button onclick="agregarAlCarrito(${producto.id}, '${nombresClases[index]}', ${producto.price})">
          Agregar al carrito
        </button>
      `;

      listaProductos.appendChild(card);
    });
  });
  
function agregarAlCarrito(id, titulo, precio) {
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id,
      titulo,
      precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  renderizarCarrito();
}

function renderizarCarrito() {
  itemsCarrito.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;

    const div = document.createElement("div");

    div.innerHTML = `
      <p>
        ${producto.titulo}
        - $${producto.precio}
        x ${producto.cantidad}

        <button onclick="sumarCantidad(${producto.id})">+</button>
        <button onclick="restarCantidad(${producto.id})">-</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </p>
    `;

    itemsCarrito.appendChild(div);
  });

  contadorCarrito.textContent = cantidadTotal;
  totalElemento.textContent = total.toFixed(2);
}

function sumarCantidad(id) {
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad++;
  }

  guardarCarrito();
  renderizarCarrito();
}

function restarCantidad(id) {
  const producto = carrito.find(p => p.id === id);

  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);

  guardarCarrito();
  renderizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

renderizarCarrito();