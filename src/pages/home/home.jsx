import {useEffect} from "react";
import {HttpGetAxios} from "../../http/HttpBasicAxios";


const Home = () => {
    useEffect(() => {
        HttpGetAxios("/config")
            .then((resp) => {
                console.log(resp.data)
            })
    })
    return(
        <div>Voce veio pra home </div>
    )
}


export default Home