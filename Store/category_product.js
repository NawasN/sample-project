var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {	
	try {		
		var db = req.db;
		var collection = db.collection("Category");
		var query = [
			{
				$lookup: {
					from : "Product",
					localField : "id",
					foreignField : "ct_id",
					as : "prod"
				}
			},
			{
				$project:{
					"Serial No" : "$id",
					"Category Name" : "$category_name",
					"Product Count" : {$size : "$prod"},
					_id:0
				}
			}
		];
		
		collection.aggregate(query, function(err, doc) {
			if(err) {
				res.send([]);
			}
			else if(doc) {
				var header = "";
				var content = "";
				Object.keys(doc[0]).forEach( function(headCol) {
					header += '<th>'+headCol+'</th>';
				});
				doc.forEach(function(rowContent) {
					content += "<tr>";
					Object.keys(rowContent).forEach( function(key) {
						content += "<td>"+rowContent[key]+'</td>';
					});
					content += "</tr>";
				});
				var style = '<style> table, th, td { border : 1px solid black; } </style>'
				var html = '<table style="border-collapse:collapse;"><thead><tr>'+header+'</tr></thead><tbody>'+ content +'</tbody></table>'+style;
				res.writeHead(200, {
					'Content-Type': 'text/html',
					'Content-Length': html.length
				});
				res.end(html);
			}
		});
	}
	catch(ex) {
		console.log("Exception = "+ex);
	}
});

module.exports = router;