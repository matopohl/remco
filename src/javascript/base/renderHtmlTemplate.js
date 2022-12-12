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

}