
let carrito = [];

fetch('productos.json')
    .then(res => res.json())
    .then(data => mostrarProductos(data));

function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    productos.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
        `;

        contenedor.appendChild(div);
    });
    window.productos = productos;
}

function agregarAlCarrito(i) {
    carrito.push(window.productos[i]);
    actualizarCarrito();
}

function actualizarCarrito() {
    const ul = document.getElementById('carrito');
    ul.innerHTML = '';
    let total = 0;
    carrito.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.nombre + ' - $' + p.precio;
        ul.appendChild(li);
        total += p.precio;
    });
    document.getElementById('total').textContent = total;
}

function enviarPedido() {
    const mensaje = carrito.map(p => `- ${p.nombre}: \$${p.precio}`).join('%0A');
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);

    // 🟨 Generar código único con fecha + número aleatorio
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const codigoPedido = `PED-${año}${mes}${dia}-${random}`;

    const texto = `Pedido Representaciones SaraLu:%0A${mensaje}%0ATotal: \$${total}%0ACódigo de pedido: ${codigoPedido}`;

    // Reemplaza con el número de WhatsApp del vendedor
    const numeroWhatsApp = "573118650911"; 
    window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, '_blank');
}
