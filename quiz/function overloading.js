class x{
	
	my(){
		console.log("default");
	}
	
	my(t){
		console.log("parametrized");
	}
	
}

const myclass = new x();

myclass.my();
myclass.my(5);
