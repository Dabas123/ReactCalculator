function Button(props) {
    let className = props.class ? props.class:"simple-button";

    return (
            <button className={className} 
                    onClick={() => props.handleClick(props.value)}>
                {props.value}
            </button>
            );

}


