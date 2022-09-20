import {useEffect} from "react";
import {HttpGetAxios} from "../../http/HttpBasicAxios";


const CheapFlight = () => {

    useEffect(() => {
        HttpGetAxios("/flight/cheap")
            .then((resp) => {
                console.log(resp.data)
            }).catch((err) => {
            console.log(err)
        })
    })

    return (
        <div>Voce veio pra CheapFlight </div>
    )
}


export default CheapFlight