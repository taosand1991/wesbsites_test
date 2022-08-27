import Saucelab from "../pageobjects/Saucelab";
import * as assert from "assert";

// to test the saucelab demo web application;


const highPrice = '$49.99'
const lowPrice = '$7.99'
const alphabetAscending = 'Sauce Labs Backpack'
const alphabetDescending = 'Test.allTheThings() T-Shirt (Red)'


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
        await Saucelab.login('taofeek', 'adesina1991');
        const errorText = await Saucelab.errorMessage;
        await expect(await errorText).toHaveTextContaining('Username and password do not match')
    });
    it('should display error message with invalid login', async () => {
        await Saucelab.login('taofeek', 'adesina1991');
        const errorText = await Saucelab.errorMessage;
        await expect(errorText).toHaveTextContaining('Username and password do not match')
    });
    it('should log user in successfully', async () => {
        await Saucelab.login('standard_user', 'secret_sauce');
        const errorText = await Saucelab.errorMessage;
        await expect(await errorText).not.toExist();
        const homeText = await Saucelab.randomElement('//span[@class="title"]')
        await expect(homeText).toHaveText('PRODUCTS');
    });
    it('should verify the Name(A - Z) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'az')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_name');
        await expect(item).toEqual(alphabetAscending);
    });
    it('should verify the Name(Z - A) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'za')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_name');
        await expect(item).toEqual(alphabetDescending);
    });
    it('should verify the Price(low - high) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'lohi')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_price');
        await expect(item).toEqual(lowPrice);
    });
    it('should verify the Price(high - low) selection', async () => {
        await Saucelab.randomElement('.product_sort_container').selectByAttribute('value', 'hilo')
        const item = await Saucelab.iterativeElement('.inventory_item', 0, '.inventory_item_price');
        await expect(item).toEqual(highPrice);
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
        await Saucelab.iterativeElement('.inventory_item', 0, null, '#add-to-cart-sauce-labs-backpack');
        await Saucelab.cartIcon.click()
        await expect(await Saucelab.randomElement('.cart_item')).toExist();
    })
    it('should remove a product from cart at the product page', async () => {
        await Saucelab.randomElement('#continue-shopping').click();
        await Saucelab.iterativeElement('.inventory_item', 0, null, '#remove-sauce-labs-backpack');
        await Saucelab.cartIcon.click()
        await expect(await Saucelab.randomElement('.cart_item')).not.toExist();
    })

})