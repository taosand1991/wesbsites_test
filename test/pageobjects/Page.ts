export default class Page {
    public async open(path: string) {
        await browser.maximizeWindow();
        await browser.url(path);
    }
}