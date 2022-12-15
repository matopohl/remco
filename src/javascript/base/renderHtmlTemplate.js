export class RenderHtmlTemplate {

    static async renderHtmlTemplate(template, container) {
        const response = await fetch(template.concat(".html"));
        container.innerHTML = await response.text();
    }

    static async renderHtml() {
        for (const el of [...document.querySelectorAll("[data-inject-html]")]) {
            await this.renderHtmlTemplate(el.dataset.injectHtml, el).then();
        }
    }

}