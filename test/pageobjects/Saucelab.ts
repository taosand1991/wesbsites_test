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

    async iterativeElement(iterativeElements: string, index: number, filterElement?: string, clickableLink?: string) {
        if (clickableLink && filterElement === null) {
            return await $$(iterativeElements)[index].$(clickableLink).click();
        }
        return await $$(iterativeElements)[index].$(filterElement).getText();
    }

    get cartIcon (){
        return $('.shopping_cart_container');
    }
}

export default new Saucelab();