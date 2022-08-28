import Saucelab from "../pageobjects/Saucelab";
import * as assert from "assert";
import * as dotenv from "dotenv"

// to test the saucelab demo web application;

dotenv.config();


const productsLength = 3


describe('to ascertain all the functionalities of saucedmo are working', () => {
    it('to display the saucedemo website', async () => {
        await Saucelab.open();
    });
    it('should display the Accepted username text', async () => {
        const mainUsername = "Accepted usernames are:"
        const text = await Saucelab.randomElement('//div[@id="login_credentials"]/h4').getText();
        assert.strictEqual(text, mainUsername);
    })
    it('should display the Password for all users', async () => {
        const mainPassword = "Password for all users:"
        const text = await Saucelab.randomElement('//div[@class="login_password"]/h4').getText();
        assert.strictEqual(text, mainPassword);
    });
    it('should display error message with invalid login', async () => {
        await Saucelab.login(process.env.wrongUsername, process.env.wrongPassword);
        const errorText = await Saucelab.errorMessage;
        await expect(await errorText).toHaveTextContaining('Username and password do not match')
    });
    it('should log user in successfully', async () => {
        await Saucelab.login(process.env.accountUsername, process.env.password);
        const errorText = await Saucelab.errorMessage;
        await expect(await errorText).not.toExist();
        const homeText = await Saucelab.randomElement('//span[@class="title"]')
        await expect(homeText).toHaveText('PRODUCTS');
    });
    it('should verify the Name(A - Z) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'az')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_name');
        await expect(item).toEqual(process.env.alphabetAscending);
    });
    it('should verify the Name(Z - A) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'za')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_name');
        await expect(item).toEqual(process.env.alphabetDescending);
    });
    it('should verify the Price(low - high) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'lohi')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_price');
        await expect(item).toEqual(process.env.lowPrice);
    });
    it('should verify the Price(high - low) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'hilo')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_price');
        await expect(item).toEqual(process.env.highPrice);
    });
    it('should navigate to the product page', async () => {
        const itemName = await Saucelab.iterativeElement('.inventory_item', 1, '.inventory_item_name');
        await Saucelab.iterativeElement('.inventory_item', 1, null, ".inventory_item_name");
        const detailProductName = await Saucelab.randomElement('.inventory_details_name').getText();
        await expect(itemName).toEqual(detailProductName);
    });
    it('should navigate to product page from detail page', async () => {
        await Saucelab.randomElement('button[data-test="back-to-products"]').click();
        const homeText = await Saucelab.randomElement('//span[@class="title"]')
        await expect(homeText).toHaveText('PRODUCTS');
    });
    it('should add product to cart', async () => {
        await Saucelab.iterativeElement('.inventory_item', 0, null, '//button[text()="Add to cart"]');
        await Saucelab.cartIcon.click()
        await expect(await Saucelab.randomElement('.cart_item')).toExist();
    })
    it('should remove a product from cart at the product page', async () => {
        await Saucelab.continueShoppingButton.click();
        await Saucelab.iterativeElement('.inventory_item', 0, null, '//button[text()="Remove"]');
        await Saucelab.cartIcon.click()
        await expect(await Saucelab.randomElement('.cart_item')).not.toExist();
    })
    it('should add multiple products to the cart', async () => {
        await Saucelab.continueShoppingButton.click();
        await Saucelab.addProductsToCart(".inventory_item", productsLength);
        await Saucelab.cartIcon.click()
        const cartItems = await Saucelab.randomElements('.cart_item');
        await expect(cartItems.length).toEqual(productsLength);
    })
    it('should remove multiple products from cart page', async () => {
        await Saucelab.removeProductsFromCart(".cart_item", productsLength);
        const cartItems = await Saucelab.randomElements('.cart_item');
        await expect(cartItems).not.toExist();
    })
    it('should checkout a product', async () => {
        await Saucelab.continueShoppingButton.click();
        await Saucelab.iterativeElement('.inventory_item', 0, null, '//button[text()="Add to cart"]');
        await Saucelab.cartIcon.click()
        await Saucelab.randomElement('#checkout').click()
        await expect(browser).toHaveUrlContaining('checkout-step-one')
    });
    it('should fill the checkout form successfully', async () => {
        await Saucelab.checkoutForm();
        await expect(browser).toHaveUrlContaining('checkout-step-two')
        await expect(await Saucelab.randomElement('//div[@class=\"summary_info\"]/div[4]')).toHaveTextContaining('FREE PONY');
    });
    it('should checkout the order successfully ', async () => {
        await Saucelab.randomElement('#finish').click();
        await expect(Saucelab.randomElement('.complete-header')).toHaveText("THANK YOU FOR YOUR ORDER")
    });
    it('should verify after purchase, there is no product in cart ', async () => {
        await Saucelab.randomElement('#back-to-products').click();
        await Saucelab.cartIcon.click();
        await expect(Saucelab.randomElement(".cart_item")).not.toExist();
    });
    it('should check for the menu bar links ', async () => {
        await Saucelab.continueShoppingButton.click();
        await Saucelab.randomElement('#react-burger-menu-btn').click();
        await Saucelab.randomElement('#about_sidebar_link').click()
        await expect(browser).toHaveUrlContaining('saucelab');
    });
})