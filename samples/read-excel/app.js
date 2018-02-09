const excel = require('excel');
	  
excel('./file/excel.xlsx', function(err, data) {
  if(err) throw err;
    // data is an array of arrays
  console.log(data);
})