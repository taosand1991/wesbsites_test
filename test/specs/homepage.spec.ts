import Homepage from "../pageobjects/Homepage"

// test suite to test the homepage of Western Union company

describe('to display the homepage of western union', () => {
    it('to show the homepage of the company', async () => {
        await Homepage.open();
        await expect(browser).toHaveUrlContaining('westernunion');
        await Homepage.cookiesButton.waitForExist({timeout: 2000})
        await Homepage.cookiesButton.click();
    })
});

describe('to show if the buttons are working correctly,', () => {
    it("should navigate the correct button", async () => {
        await Homepage.profileButton.waitForExist({timeout: 3000});
        await Homepage.profileButton.click();
        await Homepage.elementNavigation("Help")
        await expect(browser).toHaveUrlContaining('frequently-asked-questions')
    })
    it("should navigate tho the registration page", async () => {
        await Homepage.open();
        await Homepage.profileButton.click();
        await Homepage.registrationButton.click()
        await expect(browser).toHaveUrlContaining('register')
    })

    it("should navigate to the login page", async () => {
        await Homepage.open();
        await Homepage.profileButton.click();
        await Homepage.loginButton.click();
        await expect(browser).toHaveUrlContaining('login')
    })
    it("should log user in successfully", async () => {
        await Homepage.login('tadesina26@gmail.com', "Police1991@");
        await Homepage.randomElement("button[type='submit']").click();
    })
    it("should gives error in creating successful user", async () => {
        await Homepage.open();
        await Homepage.registrationButton.click();
        await Homepage.register('test100.test1991@gmail.com');
    })
})

