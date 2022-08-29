import Client from "../pageobjects/Client";
import Homepage from "../pageobjects/Homepage";

// to test different methods in Javascript scripting of web pages


describe('to verify different methods in JS scripting', () => {
    it('should be able to display text or div after spinner delay', async () => {
        await Client.open('clientdelay');
        await Client.randomElement('#ajaxButton').click();
        await browser.waitUntil(async () => {
            return await $('#spinner').isDisplayed() === false;
        }, {
            timeout: 16000
        })
        const text = await Client.randomElement('.bg-success');
        await expect(text).toHaveTextContaining('Data calculated on the client')
    })
    it('should wait for page to be loaded and find element', async () => {
        await Client.open('loaddelay');
        await expect(Client.randomElement('button')).toExist();
    });
    it('should change the button color', async () => {
        await Client.open('click');
        await Client.randomElement('#badButton').click();
        await expect(Client.randomElement('#badButton')).toHaveElementClass('btn-success')
    });
    it('should stop the progress bar at 65%', async () => {
        await Client.open('progressbar');
        await Client.randomElement('#startButton').click();
        const progressBar = await Client.randomElement('#progressBar')
        const progressValue = await browser.waitUntil(async () => {
            return await progressBar.getAttribute('aria-valuenow') === '65'
        }, {timeout: 25000});
        if (progressValue) {
            await Client.randomElement('#stopButton').click();
        }
        await expect(progressValue).toEqual(true)
    });
    it('should verify that input are entered correctly into overlapped input form', async () => {
        await Client.open('overlapped');
        await Client.randomElement('#id').setValue('random-things');
        await Client.randomElement('#name').scrollIntoView();
        await Client.randomElement('#name').setValue('my-name')
        await expect(await Client.randomElement('#name').getValue()).toEqual('my-name')
    });
    it('should verify hide button hides all other buttons', async () => {
        await Client.open('visibility');
        const hideButton = await Client.randomElement('#hideButton');
        const removedButton = await Client.randomElement('#removedButton');
        const zeroButton = await Client.randomElement('#zeroWidthButton');
        const opacityButton = await Client.randomElement('#transparentButton');
        const visibilityHiddenButton = await Client.randomElement('#invisibleButton');
        const displayNoneButton = await Client.randomElement('#notdisplayedButton');
        const offScreenButton = await Client.randomElement('#offscreenButton');
        await hideButton.click();
        await expect(await removedButton).not.toBePresent();
        await expect(zeroButton).toHaveElementClass('zerowidth');
        await expect(await Client.randomElement('#hidingLayer')).toHaveStyle({position: 'absolute'});
        await expect(opacityButton).toHaveAttrContaining('style', 'opacity: 0');
        await expect(visibilityHiddenButton).toHaveStyle({visibility: 'hidden'});
        await expect(displayNoneButton).toHaveStyle({display: 'none'});
        await expect(offScreenButton).toHaveElementClass('offscreen');

    })
})
