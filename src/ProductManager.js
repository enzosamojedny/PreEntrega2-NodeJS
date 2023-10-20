//? how to apply crypto library to my project?
//? read about path library
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
const uuid = uuidv4();
class ProductManager {
    constructor(products, path) {
        this.products = products;
        this.path = path;
    }
    addProducts(product) {
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            console.log('A product with that code already exists');
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.code) {
            console.log('All fields are mandatory');
            return;
        }
        product.id = uuid;
        let values = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            id: product.id
        };
        fs.writeFile(this.path, JSON.stringify(values), (error) => {
            if (error) {
                throw new Error(`404: Error writing file ${error}`);
            }
            else {
                console.log('201: File created successfully');
            }
        });
        this.products.push(values);
    }
    getProducts() {
        let result = fs.readFile(this.path, 'utf-8', (error) => {
            if (error) {
                throw new Error(`404: Error reading file ${error}`);
            }
            else {
                console.log('200: File successfully read');
            }
        });
        console.log('getProducts reading', result);
        return result;
    }
    getProductById(productId) {
        const foundProduct = this.products.find(p => p.id === productId);
        if (foundProduct) {
            return foundProduct;
        }
        else {
            console.log('Not found');
            return undefined;
        }
    }
}
const productManager = new ProductManager([], '../logs/Logs.txt');
const product1 = {
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 15,
    thumbnail: 'product1.jpg',
    code: 'P1',
    stock: 150,
    id: '',
};
productManager.addProducts(product1);
console.log('Products: ', productManager.getProducts());
const productById1 = productManager.getProductById(product1.id);
console.log(productById1);
const product2 = {
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 15,
    thumbnail: 'product2.jpg',
    code: 'P3',
    stock: 300,
    id: '',
};
productManager.addProducts(product2);
console.log('Products: ', productManager.getProducts());
const productById2 = productManager.getProductById(product2.id);
console.log(productById2);