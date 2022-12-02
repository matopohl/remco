import {RenderHtmlTemplate} from "./base/renderHtmlTemplate";

RenderHtmlTemplate.renderHtml();

RenderHtmlTemplate.addFavicon();

RenderHtmlTemplate.addTestImage();

import("ModuleAApp/Test").then(TestModule => {
    const Test = TestModule.Test;
    const test = new Test();
    Test.testMethod();
    test.testMethod();
}).catch(error => {
    alert(error)
});