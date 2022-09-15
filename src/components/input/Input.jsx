import React from "react";
import * as C from "./styles"

const Input = ({type, placeholder, value, onchange}) => {
    return <C.Input
        value={value}
        onChange={onchange}
        type={type}
        placeholder={placeholder}/>
}