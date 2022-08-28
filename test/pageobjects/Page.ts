export default class Page {
    public async open(path: string) {
        await browser.setWindowSize(1382, 744);
        await browser.url(path);
    }
}