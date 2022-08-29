import Page from "./Page";

class Client extends Page {
    async open(path:string) {
        await super.open(`http://uitestingplayground.com/${path}`)
    }

    randomElement(element: string) {
        return $(element);
    };
    randomElements(element: string) {
        return $$(element);
    }
}

export default new Client();