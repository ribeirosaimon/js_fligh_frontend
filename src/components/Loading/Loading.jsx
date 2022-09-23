import React from "react";
import * as C from "./styles"

const Loading = () => {
    return (
        <C.Container>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
        </C.Container>
    )
}

export default Loading