const excel = require('excel');
	  
excel('./file/excel.xlsx', function(err, data) {
  if(err) throw err;
 // data is an array of arrays
  //console.log(data);
  const output = [];
  const header = data[0];
  const removedData= data.shift();  //removing excel header 
  data.forEach((item) => {	
    let objStructure = {};
	header.forEach(function(keyName, index) {	
		if(item.length===header.length){		  
		  objStructure[keyName] = item[index];
		}
	});
	output.push(objStructure);
  });
  console.log("*********************************Final Output***************************************")
  console.log(output)
  
});