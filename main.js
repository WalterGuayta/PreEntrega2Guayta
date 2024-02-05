//DOM
// Obtener referencia a elementos del DOM
const productosEl = document.getElementById('productos');
const carritoEl = document.getElementById('carrito');
const itemsCarritoEl = document.getElementById('items-carrito');
const totalEl = document.getElementById('total');

// Obtener productos almacenados en localStorage (si existen)
const productosLocalStorage = localStorage.getItem('productos');
const carritoLocalStorage = localStorage.getItem('carrito');

// Inicializar el carrito con los datos almacenados en localStorage (si existen)
const carrito = carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];

// Función para calcular el total del carrito
const calcularTotal = () => {
  let total = 0;
  
  carrito.forEach((item) => {
    total += item.precio;
  });
  
  totalEl.textContent = total.toFixed(2);
};

// Función para renderizar los productos disponibles en el DOM
const renderizarProductos = () => {
  const productos = productosLocalStorage
    ? JSON.parse(productosLocalStorage)
    : [];
  
  const fragmento = document.createDocumentFragment();
  
  productos.forEach((producto) => {
    const li = document.createElement('li');
    li.dataset.id = producto.id;
    li.dataset.nombre = producto.nombre;
    li.dataset.precio = producto.precio;
    li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    
    fragmento.appendChild(li);
  });
  
  productosEl.querySelector('ul').appendChild(fragmento);
};

// Función para renderizar el carrito en el DOM
const renderizarCarrito = () => {
  // Limpiar previamente el carrito
  itemsCarritoEl.innerHTML = '';
  
  const fragmento = document.createDocumentFragment();
  
  carrito.forEach((item) => {
    const li = document.createElement('li');
    li.dataset.id = item.id;
    li.dataset.nombre = item.nombre;
    li.dataset.precio = item.precio;
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    
    fragmento.appendChild(li);
  });
  
  itemsCarritoEl.appendChild(fragmento);
  
  // Calcular el total del carrito
  calcularTotal();
  
  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Evento para añadir un producto al carrito
productosEl.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const id = parseInt(e.target.dataset.id);
    const nombre = e.target.dataset.nombre;
    const precio = parseFloat(e.target.dataset.precio);
    
    const item = { id, nombre, precio };
    
    carrito.push(item);
    
    renderizarCarrito();
  }
});

// Evento para eliminar un producto del carrito
carritoEl.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const id = parseInt(e.target.dataset.id);
    
    const index = carrito.findIndex((item) => item.id === id);
    
    if (index > -1) {
      carrito.splice(index, 1);
      
      renderizarCarrito();
    }
  }
});

// Renderizar los productos y el carrito al cargar la página
renderizarProductos();
renderizarCarrito();
