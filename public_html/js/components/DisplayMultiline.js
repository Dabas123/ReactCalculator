function DisplayMultiline(props) {

    return (
            <textarea className="display-multiline" 
                      value={props.value} 
                      readOnly={true}>
            </textarea>
            );
}


