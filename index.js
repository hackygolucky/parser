// *** the module should:
// define a Parser type    
// export a function that takes the object mapping.

// ex. tag: {% if athlete_list %}

 module.exports = Parser

 var dplookup = require('dotpathlookup')
 	 , tpl = require('templatinglanguage')
 	 // , if_else = require('if_else')
 	 // , tpl_for = require('tpl_for');


function Parser(obj) {
	var my_obj = obj
		, items = []
		, regex = /{%\s*([\w\d\-\.]*)\s*%}/
		, match;

	while (match = regex.exec(my_obj)) {
		// I'm already doing this in tpl. Do I need this? Just push for {% %} match? 
		// If so, here? Or add to tpl module?
		items.push(raw(my_obj.slice(0, match.index)));
		// this is the item I'm validating my 'if' statement OR pointing it to tpl_for 
		my_obj = my_obj.slice(match.index + match[0].length); // last item, is this necessary here?
	}     
	items.push(raw(my_obj));
	// should block tags that are 'matched' be executed/linked to their individual modules in renderedString?
	return function renderedString(context) {
		var results = []
			, contents = match.slice(1);

		for (i = 0; i < items.length; ++i) {
			var item = items[i];
			if (item === "if" || "else") {
				if_else(parser, contents)  //call if_else module?
			}	
			if (item === "for") {
				for_tpl(parser, contents)  // call tpl_for?
			}
			results.push(item(context));
		}
		return results.join("");
	}
}

function raw(str) {
	return function(context) {
		return str;
	}
}
var myType = new Parser;

myType.lookup = function(str) {
	// or does this really need to just be return function(obj); return str; ??
	return tpl(dplookup(str)) 
}

 // *** write the module that exports a function that takes an object
 // mapping tag names to parse functions and returns a function

// https://docs.djangoproject.com/en/dev/topics/templates/#tags

 // representing a compiler for strings in that language 
 // (fn(obj) -> fn(str) -> fn(obj) -> str is the chain). 
 // you will need to use your dotpathlookup module and 
 // your templatelanguage modules to build this module.

// *** the module should:
// define a Parser type    
// export a function that takes the object mapping.

// *** the Parser should:
// define a parse(obj?) function
// define a lookup(str) function: lookup(str) -> function(obj) -> str

// *** the exported function should:
// instantiate Parser with the mapping object when the exported function is called
// match tags by /{%\s*([\w\d\-\.]*)\s*%}/
// 		
// see if there's a tag parser function defined by the first word in match[1]
// call that tag parser function with itself and match.slice(1)
