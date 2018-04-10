const numeral = require('numeral'),
      Intl = require('intl'),
      //JS Equivalent for PHP number_format function
      //Reference: https://github.com/kvz/locutus/blob/master/src/php/strings/number_format.js
      number_format = (number, decimals, decPoint, thousandsSep)=>{        
        try {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
            var n = !isFinite(+number) ? 0 : +number
            var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
            var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
            var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
            var s = ''

            var toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec)
                return '' + (Math.round(n * k) / k)
                .toFixed(prec)
            }

            // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || ''
                s[1] += new Array(prec - s[1].length + 1).join('0')
            }

            return s.join(dec)
        } catch (error) {
            console.log(error);
            return NaN;
        }
    }       

class NumberUtility{
    /**
	* @Method Name : constructor (NumberUtility)   
	*
	* @Description : Initialising variables within this class scope
	*
	* @param1 input : object
	* @return NaN
	*/
    constructor( input = {}){
        // this._format = (typeof input =="object") ? (input.numberFormat || '0,0.000') : '0,0.000';
        // this._locales = (typeof input =="object") ? (input.locales || "en-US") : "en-US";
        this._format = input.numberFormat || '0,0.000'
        this._locales = input.locales || "en-US";
    }

    /**
	* @Property Name : format   
	*
	* @Description : Property to set number format
	*
	* @param1 input : string
	* @return NaN
	*/
    set format(input){
        this._format  = input;
    }

    /**
	* @Property Name : format   
	*
	* @Description : Property to get number format
	*
	* @return string
	*/
    get format(){
        return this._format;
    }

    /**
	* @Property Name : locales   
	*
	* @Description : Property to set locales for formatting number
	*
	* @param1 input : string
	* @return NaN
	*/
    set locales(input){
        this._locales  = input;
    }

    /**
	* @Property Name : locales   
	*
	* @Description : Property to get locales for formatting number
	*
	* @return string
	*/
    get locales(){
        return this._locales;
    }   

    getFormat(){
        let output = {};
        if(this.format.indexOf('.') === 1){
            output.internalformat = "DOT_COMMA";
            const data = this.format.split(',');
            output.precision = (data.length===2) ? data[1].length : 0;
        }
        else{
            output.internalformat = "COMMA_DOT";
            const data = this.format.split('.');
            output.precision = (data.length===2) ? data[1].length : 0;
        }
        return output;
    }

    /**
	* @Method Name : toNumber   
	*
	* @Description : Function arguments takes numbers or strings that it trys to convert into a number.
	*
	* @param1 input : string || integer || float
	* @return integer || float 
	*/
    toNumber(input){
        try {
            const parsedValue = this.tryParseFloat(input);
            //Since NaN will be false
            if(typeof parsedValue === 'number' && parsedValue){
                return numeral(input).value();
            }
            else if(typeof input === "boolean"){
                return ((input) ? 1 : 0);
            }
            else{
                return NaN;
            }
        } catch (error) {
            console.log(error);
            return NaN;
        }        
    }

    /**
	* @Method Name : roundNumber   
	*
	* @Description : Function arguments takes numbers and round it upto the given precision length.
	*
    * @param1 number : integer || float
	* @return float
	*/
    roundNumber(number)
	{
        try {            
            return this.tryParseFloat(numeral(number).format(''));
        } catch (error) {
            console.log(error);
            return NaN;
        }		
    }
    
    /**
	* @Method Name : random   
	*
	* @Description : Function arguments takes length upto which the random length should be >=5
	*
	* @param1 number : integer  
	* @return float
	*/
    random(precision=5){
        try {
            if(!Number.isInteger(precision)) precision=5;
            const value = Math.random().toString().split('');
            const randomNumber = parseFloat(value.reverse().splice(0, precision).join(""));
            return randomNumber;
        } catch (error) {
            console.log(error);
            return NaN;
        }
    }

    /**
	* @Method Name : toCustomFormat   
	*
	* @Description : Function arguments takes numbers or strings that it trys to convert into a custom number format.
	*
	* @param1 input : string || integer || float  
	* @return string
	*/
    toCustomFormat(input){
        try {
            const value = this.tryParseFloat(input);
            if(value){
                const result = this.getFormat();
                switch (result.internalformat) {
                    case "DOT_COMMA":
                        return number_format(input, result.precision , "," , ".");
                        break;
                    case "COMMA_DOT":
                        return numeral(input).format(this.format.replace(/#/g, '0'));
                        break;
                    default:
                        break;
                }             
            }
            else{
                return NaN;
            }            
        } catch (error) {
            console.log(error);
            return NaN;
        }        
    }

    /**
	* @Method Name : toDecimal   
	*
	* @Description : Function arguments takes numbers or strings that it trys to convert into decimal value upto the specified length.
	*
	* @param1 input : string || integer || float  
	* @return string 
	*/
    toDecimal(input, length=2){
        try {
            let counter = 0;
            let format = '0.';
            while(length > counter){
                ++counter;
                format += '0';
            }
            return parseFloat(numeral(input).format(format)).toFixed(length);      
        } catch (error) {
            console.log(error);
            return NaN;
        }        
    }

    /**
	* @Method Name : toIntl   
	*
    * @Description : The Intl.NumberFormat object is a constructor for objects that enable language sensitive number formatting.
                     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
    * @param1 input : string || integer || float  
	* @return string 
	*/
    toIntl(input){
        try {
            const l10nValue = new Intl.NumberFormat(this.locales);        
            return l10nValue.format(input);
            //return parseInt(input).toLocaleString(this.locales);
        } catch (error) {
            console.log(error);
            return NaN;
        }        
    }    

    /**
	* @Method Name : sum   
	*
    * @Description : Function arguments takes array of integers/floats and return the addtion of all elements
    * @param1 input : array  
	* @return integer || float 
	*/
    sum(){
        try {
            let args = arguments;//dynamic arguments
            if(args.length>0){
                const input = (args.length>1) ? Array.prototype.slice.call(args) : (Array.isArray(args[0]) ? args[0] : this.tryParseFloat(args[0]));
                if(input){
                    if(Array.isArray(input)){
                        let sum = 0;
                        for(let i = 0; i< input.length ; i++){
                            if(typeof input[i] == 'string'){
                                const parsedValue = this.tryParseFloat(input[i]);
                                if(parsedValue){
                                    sum += parsedValue;
                                }
                                else{
                                    continue;
                                }
                            }
                            else{
                                sum += input[i];
                            }
                        }
                        return sum;
                    }
                    else{
                        return input;
                    }
                }
                else{
                    return NaN;
                }
            }else{
                return NaN;
            }
        } catch (error) {
            console.log(error);
            return NaN;
        }        
    }

    /**
	* @Method Name : isInteger   
	*
    * @Description : Function arguments takes input and verify whether it is integer or not
    * @param1 input : any  
	* @return boolean 
	*/
    isInteger(input){
        try {
            return Number.isInteger(input);
        } catch (error) {
            console.log(error);
            return false;
        }        
    }

    /**
	* @Method Name : isFloat   
	*
    * @Description : Function arguments takes input and verify whether it is float or not
    * @param1 input : any  
	* @return boolean 
	*/
    isFloat(input){
        try {
            if(typeof input === "number"){
                return !Number.isInteger(input);
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }    
    }

    /**
	* @Method Name : isFinite   
	*
    * @Description : Function arguments takes input and verify whether it is Finite or not
    * @param1 input : any  
	* @return boolean 
	*/
    isFinite(input){
        try {
            return Number.isFinite(input);
        } catch (error) {
            console.log(error);
            return false;
        }      
    }

    /**
	* @Method Name : isNaN   
	*
    * @Description : Function arguments takes input and verify whether not a number
    * @param1 input : any  
	* @return boolean 
	*/
    isNaN(input){    
        try {
            return Number.isNaN(input);
        } catch (error) {
            console.log(error);
            return false;
        }           
    }

     /**
	* @Method Name : numberInfo   
	*
    * @Description : Function arguments takes input as a number and return precision & scale info
                     //https://stackoverflow.com/questions/2377174/how-do-i-interpret-precision-and-scale-of-a-number-in-a-database
    * @param1 input : number (integer || float)  
	* @return object 
	*/    
    numberInfo(input){
        try {
            if(typeof input === "number"){
                const value = input.toString().split('.');
                let number = {};
                if(value.length==2){
                    number.precision = value[0].length + value[1].length;
                    number.scale = value[1].length;
                }
                else{
                    number.precision = value[0].length;
                    number.scale = 0;
                }
                return number;
            }
            return NaN;

        } catch (error) {
            console.log(error);
            return NaN;
        }       
    }

    /**
	* @Method Name : tryParseFloat   
	*
    * @Description : Function arguments takes input and try to parse it as float
    * @param1 input : any  
	* @return float 
	*/
    tryParseFloat(input){
        try {
            return parseFloat(input);
        } catch (error) {
            console.log(error);
            return NaN;
        }
    }

    /**
	* @Method Name : tryParseInt   
	*
    * @Description : Function arguments takes input and try to parse it as integer
    * @param1 input : any  
	* @return integer 
	*/
    tryParseInt(input){
        try {
            return parseInt(input);
        } catch (error) {
            console.log(error);
            return NaN;
        }
    }     
}

module.exports = NumberUtility;

