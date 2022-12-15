export class ContactForm {

    form;
    fields = [];

    constructor(formId){
        this.form = document.getElementById(formId);
        this.form.addEventListener('submit', this.submit);
    }

    addField(field) {
        this.fields.push(field);

        let fieldElement = this.form.querySelector('#' + field.id);

        fieldElement.addEventListener('keydown', this.removeError);
    }

    fieldValidation (fieldId, validationFunctions) {
        let field = this.form.querySelector('#' + fieldId);

        if (field == null) return false;

        let valid = true

        validationFunctions.forEach((validationFunction) => {
            valid &= validationFunction(field.value);
        });

        if(!valid) {
            field.classList.add("error");
        }

        return valid;
    }

    isNotEmpty (value) {
        if (value == null || typeof value == 'undefined') return false;
        return (value.length > 0);
    }

    isEmail (email) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(String(email).toLowerCase());
    }

    submit = e => {
        e.preventDefault();

        let valid = true;

        this.fields.forEach((field) => {
            valid &= this.fieldValidation(field.id, field.validationMethods);
        });

        if(valid) {
            const formData = new FormData(this.form);

            let object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            let json = JSON.stringify(object);

            this.fields.forEach((field) => {
                this.form.querySelector('#' + field.id).value = '';
            });
        }
    }

    removeError = e => {
        e.target.classList.remove("error");
    }

}

export class FormField {
    id;
    validationMethods = [];
}