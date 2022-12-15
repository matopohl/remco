import {RenderHtmlTemplate} from "./base/renderHtmlTemplate";
import {ContactForm} from "./base/contactForm";
import {FormField} from "./base/contactForm";

(async () => {
    await renderHtmlTemplate();

    form();
})()

async function renderHtmlTemplate() {
    await RenderHtmlTemplate.renderHtml();
}

function form() {
    let form = new ContactForm('form');

    let email = new FormField();
    email.id = 'email';
    email.validationMethods = [form.isEmail];

    let text = new FormField();
    text.id = 'text';
    text.validationMethods = [form.isNotEmpty];

    form.addField(email);
    form.addField(text);
}
