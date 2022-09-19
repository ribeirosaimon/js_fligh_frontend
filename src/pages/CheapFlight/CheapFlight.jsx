import {useEffect} from "react";
import {HttpGetAxios, HttpPostAxios} from "../../http/HttpBasicAxios";


const CheapFlight = () => {

    useEffect(() => {
        HttpGetAxios("/flight/cheap")
            .then((resp) => {
                console.log(resp.data)
            })
    })
    return(
        <div>Voce veio pra CheapFlight </div>
    )
}


export default CheapFlight