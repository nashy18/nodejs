const app = require('express')();

const myRoute = (args)=>{
	return (req, res, next)=> {
	  console.log(args);
	  return res.send('ok')
	}
}

const finalResult = (req,res)=>{
	// console.log(++req.i);
	// console.log("URL=> " +req.urls.length);
	// console.log("Result=> " + res.result.length);
	if(res.result.length===req.urls.length){
		res.send(res.result);
		console.log("callback called");
	}
}

function home(req, res, next) {
   //req.url = '/some/other/path'
   //if we want to change the method: req.method = 'POST'
   //return app._router.handle(req, res, next)
   
   console.log("generic api call");
   res.result = [];
   req.i = 0;
   req.urls = ['/route1','/route2','/route3']; // this we can pass from req.body;
   req.urls.forEach((item)=> {
	  req.url = item;
	  app._router.handle(req, res, next);
   });
}


app.get('/generic', home );

app.get('/route1', (req,res,next)=>{ 
		setTimeout(()=>{
			console.log("route1 api call");
			res.result.push({"api" : "route1"}); 
			next();
		},1000);
		//console.log("route1 api call");
		//res.result.push({"api" : "route1"}); 
		//next(); 
	},
	finalResult
)

app.get('/route2', (req,res,next)=>{ 
		setTimeout(()=>{
			console.log("route2 api call");
			res.result.push({"api" : "route2"}); 
			next();
		},200);
		// console.log("route2 api call");
		// res.result.push({"api" : "route2"}); 
		//next(); 
	},
	finalResult
)

app.get('/route3', (req,res,next)=>{ 
		console.log("route3 api call");
		res.result.push({"api" : "route3"}); 
		next();
	},
	finalResult
)

app.get('/', myRoute("I am home route"));

app.listen(9000);
