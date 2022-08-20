function App(props) {
    const [fullFormula, setFullFormula] = React.useState('0');
    const [actualNumber, setActualNumber] = React.useState('0');

    function refresh() {
        setFullFormula(props.calculator.getFullFormula());
        setActualNumber(props.calculator.getActualNumber());
    }

    function handleClickNumber(number) {
        props.calculator.onNumber(number);
        refresh();
    }

    function handleClickOperation(opr) {
        props.calculator.onOperation(opr);
        refresh();
    }

    function handleClickDecimal() {
        props.calculator.onDecimal();
        refresh();
    }

    function handleClickResult() {
        props.calculator.onResult();
        refresh();
    }

    function handleClickAC() {
        props.calculator.onAC();
        refresh();
    }

    return (
            <div className="app-main">
                <Display value={fullFormula}/>
                <Display value={actualNumber}/>
                <div>
                    <Button value={'7'} handleClick={handleClickNumber}/>
                    <Button value={'8'} handleClick={handleClickNumber}/>
                    <Button value={'9'} handleClick={handleClickNumber}/>
                    <Button value={'/'} handleClick={handleClickOperation}/>
                </div>
                <div>
                    <Button value={'4'} handleClick={handleClickNumber}/>
                    <Button value={'5'} handleClick={handleClickNumber}/>
                    <Button value={'6'} handleClick={handleClickNumber}/>
                    <Button value={'*'} handleClick={handleClickOperation}/>
                </div>
                <div>
                    <Button value={'1'} handleClick={handleClickNumber}/>
                    <Button value={'2'} handleClick={handleClickNumber}/>
                    <Button value={'3'} handleClick={handleClickNumber}/>
                    <Button value={'-'} handleClick={handleClickOperation}/>
                </div>
                <div>
                    <Button class="double-button" value={'0'} handleClick={handleClickNumber}/>
                    <Button value={'.'} handleClick={handleClickDecimal}/>
                    <Button value={'+'} handleClick={handleClickOperation}/>
                </div>                
                <div>                
                    <Button class="double-button" value={'AC'} handleClick={handleClickAC}/>
                    <Button class="double-button" value={'='} handleClick={handleClickResult}/>            
                </div>
            </div>
            );
}



