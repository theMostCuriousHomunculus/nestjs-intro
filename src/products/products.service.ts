import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    deleteProduct(id: string) {
        const index = this.findProduct(id)[1];

        this.products.splice(index, 1);
    }

    fetchAllProducts() {
        return [...this.products];
    }

    fetchSingleProduct(id: string) {
        const product = this.findProduct(id)[0];
        return {...product};
    }

    insertProduct(title: string, description: string, price: number) {
        const id = Math.random().toString();
        const newProduct = new Product(id, title, description, price);
        this.products.push(newProduct);
        return id;
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updatedProduct = {...product}
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prdct) => prdct.id === id);
        const product = this.products[productIndex];

        if (!product) {
            throw new NotFoundException('Could not find product!');
        }

        return [product, productIndex];
    }
}