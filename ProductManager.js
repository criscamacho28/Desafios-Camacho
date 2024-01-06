class ProductManager {	//Este ProductManager gestiona un conjunto de productos
	constructor() {
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
}
//const manager = new ProductManager();

module.exports = ProductManager; //Esto es para exportar este archivo