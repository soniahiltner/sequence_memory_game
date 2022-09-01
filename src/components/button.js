import React from "react";

function Button({ number: { number, id }, handleClick}) {

    return (
        <div className='boardGame' id={id} onClick={() => handleClick(id)} >{number}</div>
    )
};

export default Button;
