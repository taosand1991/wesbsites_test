import Page from "./Page"

class Homepage extends Page {
    async open() {
        await super.open('/');
    };

    get profileButton() {
        return $('.hamburger-button');
    }

    get cookiesButton() {
        return $('#onetrust-accept-btn-handler');
    }

    get navElements() {
        return $$("//*[@id=\"hamburger-nav-item\"]/ul/li");
    }

    get loginButton() {
        return $('#login-nav-item')
    }

    get registrationButton() {
        return $('#sign-up-nav-item')
    }

    elementNavigation(link: string) {
        this.navElements.forEach((async element => {
            if (await element.getText() === link) {
                await element.$('a').click();
            }
        }))
    }

    async login(username: string, password: string) {
        await $('[name="txtEmailAddr"]').setValue(username);
        await $('#txtKey').setValue(password);
    }

    async register(emailAddress: string) {
        await $("input[name='txtFName']").setValue('test');
        await $("input[name='txtLName']").setValue('test')
        await $("input[name='dob']").setValue('14/05/1991')
        await $("input[name='txtEmailAddr']").setValue(emailAddress)
        await $("input[name='password']").setValue('Police1991@')
        await $("#address1").setValue('Sauletekio al.18')
        await $("#city").setValue('Vilnius')
        await $("#zip").setValue('10223')
        await $("input[name='mobileNumber']").setValue('62645944')
        await $("label[for='option3']").click()
        await $("input[name='answer']").setValue('abiola')
        await $("label[for='legalTermsAndConditions']").click();
        await $("button[data-linkname='button-register']").click();
    }

    public randomElement(element: string) {
        return $(element);
    }
}

export default new Homepage();