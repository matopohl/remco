import Favicon from "../../image/favicon/favicon.png";
import Test from "../../image/test.jpg";
import TestAltText from "../../message/test.txt";

export class RenderHtmlTemplate {

    static async renderHtmlTemplate(template, container) {
        const response = await fetch(template.concat(".html"));
        const text = await response.text();
        container.innerHTML = text;
    }

    static renderHtml() {
        [...document.querySelectorAll("[data-inject-html]")].forEach(el => {
            this.renderHtmlTemplate(el.dataset.injectHtml, el);
        });
    }

    static addFavicon() {
        const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = Favicon;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    static addTestImage() {
        const img = document.createElement("img");
        img.alt = TestAltText;
        img.width = 600;
        img.src = Test;
        const body = document.querySelector("article section");
        body.appendChild(img);
    }

}