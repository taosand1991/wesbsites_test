import * as assert from "assert";

describe('to shadow dom', () => {
    it('should copy and past the text from the input field', async () => {
        await browser.url('http://uitestingplayground.com/shadowdom')
        const main = await $('guid-generator')
        await main.shadow$('#buttonGenerate').click();
        await main.shadow$('#buttonCopy').click();
    })
})