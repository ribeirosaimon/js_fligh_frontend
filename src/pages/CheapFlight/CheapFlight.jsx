import React, {useEffect, useState} from "react";
import {HttpGetAxios} from "../../http/HttpBasicAxios";


const CheapFlight = () => {

    const [cheapFlight, setCheapFlight] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        HttpGetAxios("/flight/cheap")
            .then((resp) => {
                setCheapFlight(resp.data)
                setLoading(false)
            }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            {!loading ?
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Departures</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Price</th>
                        <th scope="col">Time Going</th>
                        <th scope="col">Time Return</th>
                        <th scope="col">Date to travel</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{cheapFlight.id}</td>
                        <td>{Object.keys(cheapFlight.destination)}</td>
                        <td>{Object.keys(cheapFlight.origin)}</td>
                        <td>{cheapFlight.price}</td>
                        <td>{cheapFlight.timeGoing}</td>
                        <td>{cheapFlight.timeReturn}</td>
                        <td>{cheapFlight.travelAt}</td>
                    </tr>
                    </tbody>
                </table>
            :
            <div>ESPERA</div>}

        </>
    )
}


export default CheapFlight