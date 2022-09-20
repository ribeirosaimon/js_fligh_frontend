import React, {useEffect, useState} from "react";
import {HttpGetAxios} from "../../http/HttpBasicAxios";

const AllFlight = () => {
    const [flightList, setFlightList] = useState([])

    useEffect(() => {
        HttpGetAxios("/flight")
            .then(resp => {
                setFlightList(resp.data)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    function handleTable() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col"></th>
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
                {
                    flightList.map((flight, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{flight.id}</td>
                            <td>{Object.keys(flight.destination)}</td>
                            <td>{Object.keys(flight.origin)}</td>
                            <td>{flight.price}</td>
                            <td>{flight.timeGoing}</td>
                            <td>{flight.timeReturn}</td>
                            <td>{flight.travelAt}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }

    return (
        <div>{handleTable()}</div>
    )
}


export default AllFlight