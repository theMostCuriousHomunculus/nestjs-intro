import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        this.productsService.deleteProduct(id);
        return null;
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchAllProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') id: string) {
        return this.productsService.fetchSingleProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ) {
        this.productsService.updateProduct(id, title, description, price);
        return null;
    }

    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number
    ) {
        const generatedId = this.productsService.insertProduct(productTitle, productDescription, productPrice);
        return { id: generatedId };
    }
}