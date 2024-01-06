/* 
    Desafio Entregable 1
    Cristian Camacho
*/
/* let product1 = {
    title: "Producto 1",
    description: "Este es un producto prueba 1",
    price: 100,
    thumbnail: "Sin imagen",
    code: "abc111",
    stock: 50,
};
let product2 = {
    title: "Producto 2",
    description: "Este es un producto prueba 2",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc222",
    stock: 50,
};
let product3 = {
    title: "Producto 3",
    description: "Este es un producto prueba 3",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc333",
    stock: 50,
}
let product4 = {
    title: "Producto 4",
    description: "Este es un producto prueba 4",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc333",
    stock: 50,
} */
const ProductManager = require("./ProductManager"); //importo otro archivo que tiene una clase
const manager = new ProductManager(); 

console.log("---------------------------------------------------------------------------------------------");
console.log("Añadimos los productos");
manager.addProduct(
    "Producto 1",
    "Este es un producto prueba 1",
    100,
    "Sin imagen",
    "abc111",
    50);
manager.addProduct(
    "Producto 2",
    "Este es un producto prueba 2",
    200,
    "Sin imagen",
    "abc222",
    50
);
manager.addProduct(
    "Producto 3",
    "Este es un producto prueba 3",
    300,
    "Sin imagen",
    "abc333",
    50
);
console.log("------------------------");
console.log("Todos los productos que tengo: ");
console.log(manager.getProducts());
console.log("------------------------");
console.log("Buscar producto por ID 2:");
console.log(manager.getProductById(2));
console.log("------------------------");
console.log("Buscar producto por ID inexistente:");
console.log(manager.getProductById(99));
console.log("------------------------");
console.log("Intento agregar un producto con codigo existente: ");
manager.addProduct(
    "Producto 4",
    "Este es un producto prueba 4",
    100,
    "Sin imagen",
    "abc333",
    50
);