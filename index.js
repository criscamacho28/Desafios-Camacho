/* 
    Cristian Camacho - Desafio 2
*/
const fs = require('fs');
const osPath = require('path');
const dbFile = 'db.json';

const finished = (error) => {
    if (error) {
        console.error(error);
        return;
    }
};

class ProductManager {
    constructor(path = process.cwd(), file = dbFile) {
        this.path = path;
        this.file = file;
        this.originalProducts = {};
        this.currentId = 0;

        if (!fs.existsSync(osPath.join(this.path, this.file))) {
            try {
                fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.originalProducts, null, 2));
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }

        const readProducts = fs.readFileSync(osPath.join(this.path, this.file), 'utf-8');
        this.products = JSON.parse(readProducts);
        this.currentId = Object.keys(this.products)[Object.keys(this.products).length - 1];
    }

    addProduct(title, description, price, thumbnail, stock, code) {
        if (stock <= 0 || typeof stock !== 'number') {
            console.log('Debe ingresar una cantidad real');
            return '';
        }

        let ids = [];
        let codes = [];
        Object.entries(this.products).forEach((producto) => {
            ids.push(producto[0]);
            codes.push(producto[1]['code']);
        });

        let max = Math.max(...ids);

        if (max == '-Infinity') {
            max = 0;
        }

        if (codes.includes(code)) {
            console.log('El codigo no debe repetirse');
            return '';
        }

        let thisItem = {};

        thisItem.id = max + 1;
        thisItem.title = title;
        thisItem.description = description;
        thisItem.price = price;
        thisItem.thumbnail = thumbnail;
        thisItem.stock = stock;
        thisItem.code = code;

        this.products[thisItem.id] = thisItem;

        fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto agregado satisfactoriamente con el id ${thisItem.id}`);
    }

    getProducts() {
        if (this.currentId >= 1) {
            return this.products;
        } else {
            console.log('No products found');
            return '';
        }
    }

    getProductById(id = null) {
        if (this.products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
            return '';
        } else if (this.products[id]['title'] === undefined) {
            console.log(`Ese producto esta vacio`);
            return '';
        } else {
            return this.products[id];
        }
    }

    updateProduct(id, title, description, price, thumbnail, stock, code) {
        if (this.products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
            return '';
        } else {
            for (let i = 0; i < Object.keys(this.products).length; i = i + 1) {
                if (Object.values(this.products).find((value) => this.products[i + 1]['code'] === code) !== undefined) {
                    if (id - 1 !== i) {
                        console.log('El codigo no debe repetirse');
                        return '';
                    }
                }
            }
        }

        let thisItem = {};

        thisItem.id = id;
        thisItem.title = title;
        thisItem.description = description;
        thisItem.price = price;
        thisItem.thumbnail = thumbnail;
        thisItem.stock = stock;
        thisItem.code = code;

        this.products[id] = thisItem;

        fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} modificado satisfactoriamente`);
        return '';
    }

    deleteProduct(id) {
        if (this.products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
            return '';
        }

        delete this.products[id];

        fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} eliminado satisfactoriamente`);
        return '';
    }
}

const manager = new ProductManager(); 

console.log("---------------------------------------------------------------------------------------------");
console.log("Añadimos los productos");
manager.addProduct(
    "Producto 1",
    "Este es un producto prueba 1",
    100,
    "Sin imagen",
    50,
    "abc111"
    );
manager.addProduct(
    "Producto 2",
    "Este es un producto prueba 2",
    200,
    "Sin imagen",
    50,
    "abc222",
    );
manager.addProduct(
    "Producto 3",
    "Este es un producto prueba 3",
    300,
    "Sin imagen",
    50,
    "abc333",
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
    50,
    "abc333",
);
console.log("------------------------");
console.log("Actualizar producto");
console.log(manager.updateProduct(
    3,
    "Producto 5",
    "Este es un producto prueba 5",
    100,
    "Sin imagen",
    50,
    "abc555",
));
console.log("------------------------");
console.log("Borrar producto:");
console.log(manager.deleteProduct(3));