import Page from "./Page";


class Saucelab extends Page {
    async open() {
        await super.open("https://www.saucedemo.com/");
    };

    async login(username: string, password: string) {
        await $('#user-name').setValue(username);
        await $('#password').setValue(password);
        await $('#login-button').click();
    };

    get errorMessage() {
        return $('h3[data-test="error"]');
    }

    randomElement(element: string) {
        return $(element)
    }

    randomElements(element: string) {
        return $$(element);
    }


    async iterativeElement(iterativeElements: string, index: number, filterElement?: string, clickableLink?: string) {
        if (clickableLink && filterElement === null) {
            return await $$(iterativeElements)[index].$(clickableLink).click();
        }
        return await $$(iterativeElements)[index].$(filterElement).getText();
    }

    get cartIcon() {
        return $('.shopping_cart_container');
    }

    get continueShoppingButton() {
        return $('#continue-shopping');
    }


    // method to add products to cart, given the number of products to add to cart
    async addProductsToCart(iterativeElements: string, length: number) {
        const elements = await $$(iterativeElements);
        for (let i = 0; i < length; i++) {
            await elements[i].$('//button[text()="Add to cart"]').click();
        }
    }

      async removeProductsFromCart(iterativeElements: string, length: number) {
        const elements = await $$(iterativeElements);
        for (let i = 0; i < length; i++) {
            await elements[i].$('//button[text()="Remove"]').click();
        }
    }

    // checkout form for the checkout page
    async checkoutForm(){
        await $('input[id="first-name"]').setValue('test');
        await $('input[id="last-name"]').setValue('test');
        await $('input[id="postal-code"]').setValue('10001');
        await $('input[id="continue"]').click();
    }
}

export default new Saucelab();