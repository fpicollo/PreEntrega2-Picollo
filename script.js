const listar = (lista, propiedad1, propiedad2) => lista.map(producto => producto[propiedad1] + " - " + producto[propiedad2]).join("\n")

principal()

function principal() {
    let productos = [
        { id: 1, nombre: "25x25x12 Desayuno", categoria: "desayuno", stock: 250, precio: 1000},
        { id: 2, nombre: "30x30x12 Desayuno", categoria: "desayuno", stock: 250, precio: 1300},
        { id: 3, nombre: "30x35x12 Desayuno", categoria: "desayuno", stock: 250, precio: 1500},
        { id: 4, nombre: "43x33x12 Desayuno", categoria: "desayuno", stock: 250, precio: 1700},
        { id: 5, nombre: "30x30x12 Desayuno Tornasolada", categoria: "desayuno", stock: 250, precio: 1800},
        { id: 6, nombre: "30x30x16", categoria: "tortas", stock: 100, precio: 1000},
        { id: 7, nombre: "35x35x16", categoria: "tortas", stock: 100, precio: 1500},
    ]

    let carrito = []
    let opcionMenu
    do {

        opcionMenu = Number(prompt("BIENVENIDO A CASAPEL\n\nSeleccione:\n1 - Agregar producto al carrito\n2 - Filtrar por categoria y ver precios \n3 - Ver información extra de un producto\n4 - Para finalizar compra\n0 - Salir"))

        if (opcionMenu === 1) {
            agregarProductoAlCarrito(productos, carrito)
        } else if (opcionMenu === 2) {
            filtrarPorCategoria(productos)
        } else if (opcionMenu === 3) {
            let idProducto = Number(prompt("Seleccione producto por id para ver más info\n" + listar(productos, "id", "nombre")))
            let productoBuscado = productos.find(producto => producto.id === idProducto)
            alert("Nombre: " + productoBuscado.nombre + " - Stock: " + productoBuscado.stock)
        } else if (opcionMenu === 4) {
            let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
            alert("Valor total de la compra: $" + total + "\nGracias por elegirnos\nCASAPEL")
        }
    } while (opcionMenu !== 0);
}

function filtrarPorCategoria(productos) {
    let categorias = []
    productos.forEach(producto => {
        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria)
        }
    })

    let categoria
    let salida

    do {
        categoria = prompt("Ingrese alguna de las siguientes categorias: " + categorias.join(", ")).toLowerCase()
        if (categorias.includes(categoria)) {
            let productosFiltrados = productos.filter(producto => producto.categoria === categoria)
            salida = productosFiltrados.map(producto => producto.nombre +  "  $" + producto.precio ).join("\n")
        } else {
            alert("Categoria incorrecta")
        }
    } while (!categorias.includes(categoria));

    alert(salida)
}

function agregarProductoAlCarrito(productos, carrito) {
    let opcion

    do {
        opcion = Number(prompt("Seleccione producto por id (0 para salir):\n" + listar(productos, "id", "nombre")))

        let productoBuscado = productos.find(producto => producto.id === opcion)
        let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === opcion)

        if (productoBuscado) {
            if (posicionProductoEnCarrito !== -1) {
                carrito[posicionProductoEnCarrito].unidades++
                carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].precioUnitario * carrito[posicionProductoEnCarrito].unidades
            } else {
                carrito.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.precio,
                    unidades: 1,
                    subtotal: productoBuscado.precio
                })
            }
        } else if (opcion !== 0) {
            alert("ID incorrecto")
        }
    } while (opcion !== 0)
    console.log(carrito)
}
