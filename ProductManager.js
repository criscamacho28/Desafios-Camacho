const fs = require('fs');
const osPath = require('path');
const dbFile = 'db.json';

const finished = (error) => {
    if (error) {
        console.error(error);
        return;
    }
};

class ProductManager {	//Este ProductManager gestiona un conjunto de productos
	constructor(path = process.cwd(), file = dbFile) {	
		this.path = path;
        this.file = file;
        this.currentId = 0;

        if (!fs.existsSync(osPath.join(this.path, this.file))) {
            try {
                fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2));
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }
		this.products = []; //Los metodos creados trabajaran sobre este array.

	}

	static id = 0; //Esto sirve para crear un id automatico

	addProduct(title, description, price, thumbnail, code, stock) { //Este es un metodo que recibe y agrega los productos
		//Recibe lo que esta en los parentesis

		for(let i = 0; i < this.products.length; i += 1){ //Esto es para cuando el code existe
			if(this.products[i].code === code){
				console.log(`El codigo ${code} esta repetido`);
				break;
			}
		}

		const newProduct = {
			title,
    		description,
    		price,
    		thumbnail,
    		code,
    		stock,
		}
		if(!Object.values(newProduct).includes(undefined)){
			ProductManager.id++; //Esto le suma 1 al id
	
			this.products.push({
				...newProduct,
				id: ProductManager.id
			}); //Recibe todo estas caracteristicas, las transforma
			//en un obj y por medio de .push lo sube a products
		}else{
			console.log("Todos los campos son requeridos");
		}

	}

	existe(id){
		return this.products.find((manager) => manager.id === id);
	}

	getProducts() { //Este metodo devuelve el arreglo con los productos creados
		//No debe recibir nada como parametro
		return this.products;
	}

	getProductById(id) { //Este metodo recibe un id y en caso que no este el id se mostrara error.
		
		//Si existe el id ...
		!this.existe(id) ?  console.log("Not Found") : console.log("Existe el id y es el siguiente: "), console.log(this.existe(id));
	}

	updateProduct(id, title, description, price, thumbnail, code, stock) { //Metodo para actualizar
        if (this.products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
        }else{
            for (let i = 0; i < Object.keys(this.products).length; i = i + 1) {
                if (Object.values(this.products).find((value) => this.products[i + 1] === code) !== undefined) {
                    if (id - 1 !== i) {
                        console.log('El codigo no debe repetirse');
                        return '';
                    }
                }
            }
        }

        let thisItem = {}; //Para el update

        thisItem.id = id;
        thisItem.title = title;
        thisItem.description = description;
        thisItem.price = price;
        thisItem.thumbnail = thumbnail;
        thisItem.stock = stock;
        thisItem.code = code;

        this.products[id] = thisItem;

        fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} modificado`);
    }

	deleteProduct(id) { //Metodo para borrar
        if (this.products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
            return '';
        }

        delete this.products[id];

        fs.writeFileSync(osPath.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} eliminado satisfactoriamente`);
    }

}

module.exports = ProductManager; //Esto es para exportar este archivo