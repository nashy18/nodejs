//**********************************/
const numberUtility = new (require('./number.utility'))();

let res = {};
res.a = numberUtility.toNumber('23rd');
res.b = numberUtility.toNumber('$10,000.00');
res.c = numberUtility.toNumber('1.5MB');
res.d = numberUtility.toNumber('76%');
res.e =  numberUtility.toCustomFormat(9635087);
res.f =  numberUtility.toCustomFormat("4400.44");
res.g =  numberUtility.toDecimal("4400.846");
res.h =  numberUtility.toDecimal(4400.4458778756486,6);
res.i =  numberUtility.toDecimal("-4400.999",2);
res.j =  numberUtility.toDecimal("586999",4);

//changing format in b/w
// numberUtility.format = '0,0';
// res.k = numberUtility.toNumber(Math.random(15));
// res.l =  numberUtility.toCustomFormat("8740.848776");
// console.log(res);

//**********************************/


//**********************************/
const numberUtility1 = new (require('./number.utility'))({numberFormat: '0.0'});
// let res1 = {};
// res1.a =  numberUtility1.toCustomFormat("989213.21321");
// res1.b =  numberUtility1.toIntl("989213.2199","en-US");
// res1.c =  numberUtility1.random();
// res1.d = numberUtility1.roundNumber(8566);
// res1.e = numberUtility1.roundNumber(84.98665,4);
// res1.f = numberUtility.sum([1.7,2.4,3.1,4,5.5, "test"]);
// res1.g = numberUtility.sum([1,"4.5",0.5,"3.5",0.2,"0.3"]);
// res1.h = numberUtility.numberInfo(196479491.77378932);
// console.log(res1);
//**********************************/


//**********************************/
for (var index = 0; index < 10; index++) {
   console.log(index + " => " + numberUtility1.random());
    
}
//**********************************/

  console.log("11 => " + numberUtility1.random(15));

  //**************************************** */
const numberUtility2 = new (require('./number.utility'))({numberFormat: '0.00'});
  //const numberUtility2 = new (require('./number.utility'))({numberFormat: '0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'});

// let res2 = {};
// res2.a = numberUtility2.toNumber("123311231231322313131213213132331.5679756565664464464644");
// res2.b = numberUtility2.toNumber("0.00000000000000000000000000000000000000000000000000000000000998");
// res2.c = numberUtility2.toNumber("");
// res2.d = numberUtility2.toNumber('ravi');
// res2.e = numberUtility2.toNumber(true);

// res2.f = numberUtility2.sum(1,2,3,4);
// console.log(res2);

//*******************************/
// const numberUtility3 = new (require('./number.utility'))();
// let res3 ={};
// res3.a = numberUtility3.toCustomFormat("test");
// res3.b = numberUtility3.roundNumber(54.496232);
// res3.c = numberUtility3.roundNumber(1.5)  //  2
// res3.d = numberUtility3.roundNumber(-3.5) // 3
// res3.e = numberUtility3.roundNumber(-3.51) //4
// console.log(res3);

//*****************************************/
const numberUtility4 = new (require('./number.utility'))({numberFormat: '0,000,000.00'});

// console.log("Custom Format=>" + numberUtility4.toCustomFormat("9658740"));
// console.log("Custom Format1=>" + numberUtility4.toCustomFormat("469444.59"));

// numberUtility4.format = '0.000.000,00';
// numberUtility4.locales = 'de-DE';
// console.log("Custom Format2=>" + numberUtility4.toIntl(9658740));
// console.log("Custom Format3=>" + numberUtility4.toIntl(469444.59));
// console.log("Custom Format4=>" + numberUtility4.toIntl(9658740.854));

// console.log("Custom Format5=>" + numberUtility4.number_format("9658740.854",2,",","."));


//***********************************************
console.log("Final input: 9658740.8544");
const numberUtility5 = new (require('./number.utility'))({numberFormat: '#.###.###,##'});
console.log(numberUtility5.toCustomFormat("9658740.8544"));
numberUtility5.format = "#.###.###,####";
console.log(numberUtility5.toCustomFormat("9658740.8544"));
numberUtility5.format = "#.###.###";
console.log(numberUtility5.toCustomFormat("9658740.8544"));
numberUtility5.format =  "#,###,###";
console.log(numberUtility5.toCustomFormat("9658740.8544"));
numberUtility5.format =   "#,###,###.##";
console.log(numberUtility5.toCustomFormat("9658740.8544"));

numberUtility5.format =   "#,###,###.####";
console.log(numberUtility5.toCustomFormat("9658740.8544"));
