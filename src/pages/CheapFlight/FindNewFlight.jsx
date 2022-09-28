import * as C from "./styles"
import {useEffect, useState} from "react";
import {HttpGetAxios, HttpPythonApiGet} from "../../http/HttpBasicAxios";

const FindNewFlight = () => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        HttpGetAxios("/config")
            .then(resp => {
                setIsLoading(resp.data.isLoading)
                console.log("finalizou")
            })
        console.log("Teste")
    }, [isLoading])

    function getNewFlight() {
        HttpPythonApiGet()
            .then(resp => {
                console.log(resp.data)
            })
    }

    return (
        <C.Container>
            <C.Content>
                <div>
                    <p>Try to find a new ticket</p>
                </div>
                {
                    isLoading ?
                        <div className="spinner-border text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button type="button" className="btn btn-success" disabled={isLoading}
                                onClick={() => getNewFlight()}>Submit</button>
                }
            </C.Content>
        </C.Container>

    )
}

export default FindNewFlight