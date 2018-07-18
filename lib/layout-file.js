'use strict';

const Parser = require('./parser');
const Global = require('./global');

module.exports = async function (file) {
	let data = '';

	Parser.html(file, {
		start: function (tag, attributes, unary) {
			if (tag === 'title') {
				data += Parser.createTagStart(tag, attributes);
				data += Global.oTitlePlaceholder;
			} else if (tag === 'o-router') {
				data += Global.oRouterPlaceholderStart;
			} else {
				data += Parser.createTagStart(tag, attributes);
			}
		},
		end: function (tag) {
			if (tag === 'head') {
				data += `\t<meta name="oxe" compiled></${tag}>`;
				data += Global.oHeadPlaceholder;
			} else if (tag === 'o-router') {
				data += Global.oRouterPlaceholderEnd;
			} else {
				data += `</${tag}>`;
			}
		},
		chars: function (text) {
			data += text;
		},
		comment: function (text) {
			data += `<!--${text}-->`;
		}
	});

	return data;
};
