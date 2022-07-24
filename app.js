
const infoProductos = [
    { id: 1, name: "CUADRIL", price: 1180, stock: 10, img:"cuadril.jpg"},
    { id: 2, name: "PECETO", price: 1350, stock: 12, img:"peceto.jpg"},
    { id: 3, name: "COSTILLA", price: 1080, stock: 20, img:"costilla.jpg"},
    { id: 4, name: "BIFE DE CHORIZO", price: 1400, stock: 20, img:"bife_de_chorizo.jpg"},
    { id: 5, name: "COLITA DE CUADRIL", price: 1200, stock: 20, img:"colita-cuadril.jpg"},
    { id: 6, name: "COSTELETA ESPECIAL", price: 950, stock: 25, img:"costeleta-especial.jpg"},
    { id: 7, name: "TAPA DE CUADRIL", price: 1250, stock: 28, img:"tapa-de-cuadril.jpg"},
    { id: 8, name: "TOMAHAWK", price: 1450, stock: 23, img:"tomahawk.jpg"},
    { id: 9, name: "VACIO", price: 1180, stock: 16, img:"vacio.jpg"}
    
  ];

// creamos una instacia del modal y la guardamos en la constante
  const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));

// creamos una instacia del toast y la guardamos en la constante
  const toast = new bootstrap.Toast(document.getElementById("agregadoToast"));

// creamos la variable carrito que va a ser un array vacio donde se van a cargar los elementos dinamicamente
  let carrito = [];

// vemos si hay informacion en el localStorage y si hay que la devuelva al carrito
  
  window.addEventListener("load", () => {
    
    const _carrito = localStorage.getItem("carrito");

    (_carrito) ? carrito = JSON.parse(_carrito) : carrito = []; //usando operadores avanzados

  });

 // guardamos los elementos del carrito en el localStorage

  const guardarElementosDelCarrito = () => {
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
  };

// creamos la funcion que nos daria el resultado de la suma de los precios de los elementos del carrito

  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(producto => {
      total += producto.price;  //usando operadores avanzados
    });
    return total;
  }

// creamos la funcion para mostrar los elementos del carrito

  const mostrarCarrito = () => {
    const carritoModalContenido = document.getElementById("carritoModalContenido");
    const tablaCarrito = `
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody id="contenidoTabla"></tbody>
      </table>
    `;
    carritoModalContenido.innerHTML = tablaCarrito;
    const contenidoTabla = document.getElementById("contenidoTabla");

    carrito.forEach((corte, key) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <th scope="row">${key}</th>
        <td>${corte.name}</td>
        <td>$${corte.price}</td>
      `;
      contenidoTabla.appendChild(fila);
    });
    
    const totalCarrito = document.createElement("p");
    totalCarrito.id = "totalCarrito";
    totalCarrito.innerHTML = `Total: $${calcularTotal()}`;
    carritoModalContenido.appendChild(totalCarrito);


    document
    .getElementById("limpiarCarrito")
    .addEventListener("click", () => {
      carrito = [];
      guardarElementosDelCarrito();
      const contenidoTabla = document.getElementById("contenidoTabla");
      contenidoTabla.innerHTML = "";
      totalCarrito.innerHTML = "Total: $0";
    });
    
    carritoModal.toggle();
  };

  const info = document.getElementById("info");
  info.classList = 'row g-4';
  
  const comprar = corte => {
    carrito.push(corte);
    guardarElementosDelCarrito();
    mostrarCarrito();
  };

  infoProductos.forEach((corte) => {
    const row = document.createElement("div");
    row.classList = 'col-sm-12 col-md-6 col-lg-4';
    row.innerHTML = `
      <div class="card h-100 my-3" id="item">
        <img src="img/${corte.img}" class="card-img-top" id="cardimg" alt="...">
        <div class="card-body bg-black text-bg-primary rounded">
          <h5 class="card-title">${corte.name}</h5>
          <p class="card-text">Precio = $${corte.price} el Kilo</p>
          <p class="card-text">Stock = ${corte.stock}</p>
          <a href="#" class="btn btn-dark bg-danger" id="${corte.id}">Comprar</a>
          <a href="#" class="btn text-danger" id="agregarCarrito-${corte.id}">Agregar al carrito</a>
        </div>
      </div>`;
    info.appendChild(row);

    const boton = document.getElementById(corte.id);

    boton.addEventListener("click", e => {
      e.preventDefault();
      comprar(corte);
    });

    document
      .getElementById(`agregarCarrito-${corte.id}`)
      .addEventListener("click", e => {
        e.preventDefault();
        carrito.push(corte);
        guardarElementosDelCarrito();
        toast.show();
      });

  })

    const abrirCarrito = document.getElementById("abrirCarrito");
    abrirCarrito.addEventListener("click", () =>{
        mostrarCarrito();
    })



  

  

  

   
  