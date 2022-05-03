import products from "../mock/products-sample.json"

export class ProductsData {
    constructor() {
        let productsData = [];
        if (localStorage.getItem('productsData') === null) {
            products.products.forEach(product => {
                productsData.push(product);
            });
        } else {
            productsData = JSON.parse(localStorage.getItem('productsData'));
        }
        this.productsData = productsData;
        localStorage.setItem('productsData', JSON.stringify(productsData));
    }

    get() {
        return this.productsData;
    }

    add(product) {
        this.productsData = this.productsData.filter(p => p.usin !== product.usin);
        this.productsData.push(product);
        localStorage.setItem('productsData', JSON.stringify(this.productsData));
    }
}
