
class EvalFormula{

    constructor(){
        this.result = 0;
    }

    /**
     * Evaluation the formula
     * @param {Array} formula string array. 
     * First and last item always must be a number.
     * Sample: ["12.3", "+", "45", "*", "-5"]
     * @returns {number} final result of the formula
     */
    eval(formula){
        let tFormula = [...formula];
        let numLeft = 0;
        let numRight = 0;
        //We calculate *
        while(tFormula.indexOf("*") > -1){           
            //There is *
            numLeft = Number(tFormula[tFormula.indexOf("*") - 1]);
            numRight = Number(tFormula[tFormula.indexOf("*") + 1]);
            tFormula[tFormula.indexOf("*") - 1] = (numLeft * numRight).toString();
            tFormula.splice(tFormula.indexOf("*"),2);            
        }
        //We calculate /
        while(tFormula.indexOf("/") > -1){           
            //There is /
            numLeft = Number(tFormula[tFormula.indexOf("/") - 1]);
            numRight = Number(tFormula[tFormula.indexOf("/") + 1]);
            if(numRight === 0){
                return NaN;
            }
            tFormula[tFormula.indexOf("/") - 1] = (numLeft / numRight).toString();
            tFormula.splice(tFormula.indexOf("/"),2);            
        }
        
        //We calculate addition and subtraction, left to right
        while(tFormula.indexOf("+") > -1 || tFormula.indexOf("-") > -1){           
            //There are + or/and -
            let opr = "";
            let oprAddPos = tFormula.indexOf("+");
            let oprSubPos = tFormula.indexOf("-");
            
            if(oprAddPos == -1){
              //There is not addition sign in the formula
              opr = "-";
            }
            else if (oprSubPos == -1){
              //There is not subtraction sign in the formula
              opr = "+";
            }
            else{
              //There are addition and subtraction sign in the formula
              (oprAddPos < oprSubPos ? opr = "+" : opr = "-");
            }          
            
            numLeft = Number(tFormula[tFormula.indexOf(opr) - 1]);
            numRight = Number(tFormula[tFormula.indexOf(opr) + 1]);
            if(opr === '+'){
              tFormula[tFormula.indexOf(opr) - 1] = (numLeft + numRight).toString();
            }
            else{
              tFormula[tFormula.indexOf(opr) - 1] = (numLeft - numRight).toString();
            }          
          
            tFormula.splice(tFormula.indexOf(opr),2);            
        }

        if(tFormula.length > 1){
            alert("Formula evaluation error!");
            console.log("Formula evaluation error!");
        }        

        this.result = Number(tFormula[0]);
        return this.result;
    }
}

//#########################################################################

class Calculator{   

    constructor(){
        this.init();
    }

    init(){
        this.value = 0;
        this.closed = true;
        this.formula = [];
        this.actualNumber = '0';
        this.lastResult = '0';
        this.lastOperation = '';
        this.hasDecimal = false;
    }
    
    /**
     * Start new formula with start value
     * @param {string} initNum 
     */
    startNewFormula(initNum){
        this.closed = false;
        this.formula = [];        
        this.lastResult = '0';
        this.lastOperation = '';
        this.hasDecimal = false;
        if(initNum.length > 0){
            this.actualNumber = initNum;            
        }
        else{
            this.actualNumber = '0';            
        }
    }

    /**
     * Number to formula
     * @param {number} num value range '0'->'9'
     */
    onNumber(num){
        if(this.closed){
            //start new formula
            this.startNewFormula(num);
        }
        else if (this.actualNumber === '0' && num != '0'){
            //continue the formula
            this.actualNumber = num;            
        }
        else if (this.actualNumber === "-0" && num != '0'){
            //continue the formula
            this.actualNumber = '-' + num;            
        }
        else if (this.actualNumber !== '0' && this.actualNumber !== "-0"){
            this.actualNumber += num;
        }
    }

    /**
     * Operation to formula
     * @param {string} opr value range [/*-+]
     */
    onOperation(opr){
        if(this.closed){
            //start new formula
            this.startNewFormula(this.lastResult);
        }

        //change last operation while the number is -0
        if(this.actualNumber === '-0'){
            this.actualNumber = '0';
            this.lastOperation = opr;
            return;
        }

        //change actualnumber to a negative number
        if(this.lastOperation !== '' && opr === '-' && this.actualNumber[0] === '0'){
            this.actualNumber = '-' + this.actualNumber;
            return;
        }

        //change last operation sign
        if(this.actualNumber === '0' && this.lastOperation !== ''){
            this.lastOperation = opr;
            return;
        }       
        if(this.lastOperation.length > 0){
            this.formula.push(this.lastOperation);
        }
        this.formula.push(this.actualNumber);
        this.actualNumber = '0';
        this.hasDecimal = false;
        this.lastOperation = opr;
    }

    /**
     * Decimal sign event
     */
    onDecimal(){
        if(this.closed){
            //start new formula
            this.startNewFormula('');
        }

        if(this.hasDecimal){
            return;
        }
        this.hasDecimal = true;
        this.actualNumber += '.';
    }

    /**
     * Reset calculator
     */
    onAC(){
        this.init();
    }

    /**
     * Calculate formula
     */
    onResult(){
        if(this.closed){
            return;
        }
        
        if(this.lastOperation.length > 0){
            this.formula.push(this.lastOperation);
        }
        
        this.formula.push(this.actualNumber);

        let evalF = new EvalFormula();
        this.lastResult = evalF.eval(this.formula).toString();

        this.actualNumber = this.lastResult;
        this.formula.push('=');
        this.lastOperation = ''; 
        this.closed = true;
    }

    /**
     * Get full formula
     * @returns {string}
     */
    getFullFormula(){
        return this.formula.join(" ") + " " 
                + this.lastOperation + " " 
                + this.actualNumber;
    }

    /**
     * Get actual number
     * @returns {string}
     */
    getActualNumber(){
        return this.actualNumber;
    }
}

//#########################################################################




