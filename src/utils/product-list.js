import products from "mock/products-sample.json"

/*
Product list
*/

export class ProductList {
    constructor() {
        let productList = [];
        if (localStorage.getItem('productList') === null) {
            products.products.forEach(product => {
                productList.push(product);
            });
        } else {
            productList = JSON.parse(localStorage.getItem('productList'));
        }        
        this.productList = productList;
        localStorage.setItem('productList', JSON.stringify(productList));
    }
    
    get() {
        return this.productList;
    }

    add(product) {
        // remove old element by usin if it exists
        this.productList = this.productList.filter(p => p.usin !== product.usin);
        this.productList.push(product);
        localStorage.setItem('productList', JSON.stringify(this.productList));
    }
}
