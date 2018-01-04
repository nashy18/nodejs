//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

// class test1{ constructor(){ return {data: "hello world"} ;} }

// new test1();

// {data: "hello world"}

// new test1().data


class myClass extends String{
	constructor(){
		const data = super("Hello World");
		//return  data;
		//return String.raw({ raw: "Hello world" });
		return this.val;
	}
	
	get val(){
		//return String.raw({ raw: "Hello world" });
		//return {val:"tets"};
		return String.constructor("test");
	}
}

//console.log(typeof new myClass()+ "JSON.Stringify=> " + JSON.stringify(new myClass()));

//console.log(typeof new myClass()+ "toString()=> " + new myClass().toString());

var x = new myClass();

console.log(x.toString());

console.log(x);

//***********************************************
"use strict";

class Config {
  get uuid(){
    return require('uuid/v1')();
  }
}

class Uuid{
  static generate(){
    return new Config().uuid;   
  }
}

//module.exports = Uuid;

