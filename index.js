module.exports = Parser

var dplookup = require('dotpathlookup')
	, tpl = require('templatinglanguage')
	, if_else = require('if_else')
	, tpl_for = require('tpl_for')


function Parser(obj) {
	var my_obj = obj
		, items = []
		, regex = /{%\s*([\w\d\s\-\.]*)\s*%}/
		, match

	while (match = regex.exec(my_obj)) {
		items.push(raw(my_obj.slice(0, match.index))); // "if athlete_list"
		my_obj = my_obj.slice(match.index + match[0].length); // "{% if athlete_list %}"
	}     
	items.push(raw(my_obj))
	
	return function renderedString(context) {
		var results = []
			, contents = match.slice(1)

		for (i = 0; i < items.length; ++i) {
			var item = items[i];
			if (item === "if" || "else") {
				if_else(Parser, contents)
			}	
			if (item === "for") {
				for_tpl(Parser, contents)
			}
			results.push(item(context))
		}
		return results.join("")
	}
}

function raw(str) {
	return function(context) {
		return str
	}
}
var myType = new Parser

myType.lookup = function(str) {
	return tpl(dplookup(str)) 
}