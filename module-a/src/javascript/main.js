import {RenderHtmlTemplate} from "./base/renderHtmlTemplate";

RenderHtmlTemplate.renderHtml();

RenderHtmlTemplate.addFavicon();

RenderHtmlTemplate.addTestImage();

import _ from 'lodash';
console.log(_.join(['Hello', 'webpack'], ' '));