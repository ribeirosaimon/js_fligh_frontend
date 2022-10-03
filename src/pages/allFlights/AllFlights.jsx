import React, {useEffect, useState} from "react";
import {HttpPostAxios} from "../../http/HttpBasicAxios";

const AllFlight = () => {
    const [flightList, setFlightList] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)

    useEffect(() => {
        getFlights()
    }, [])

    useEffect(() => {
        getFlights()
    }, [page])

    function getFlights() {
        const body = {
            "page": page,
            "pageSize": pageSize,
            "filters": []
        }

        HttpPostAxios("flight/search", body)
            .then(resp => {
                setFlightList(resp.data.result)

                let numberOfPages = Math.floor(resp.data.count / pageSize)
                numberOfPages = resp.data.count % pageSize !== 0 ? numberOfPages + 1 : numberOfPages
                setMaxPage(numberOfPages)
            })

    }

    function pagination() {
        const previous = page === 1 ? 1 : page - 1
        const next = page === 1 ? 3 : page + 1

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={() => setPage(previous)} tabIndex="-1">Previous</button>
                    </li>
                    <li className={page >= 1 ? "page-item" : "page-item disabled"}>
                        <button className="page-link"  onClick={() => setPage(previous)}>{previous}</button>
                    </li>
                    <li className={maxPage === 1 ? "page-item disabled" : "page-item"}>
                        <button className="page-link" onClick={() => setPage(page === 1 ? 2 : page)}>{page === 1 ? 2 : page}</button>
                    </li>
                    <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                        <button className="page-link">{next}</button>
                    </li>
                    <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                        <button className="page-link" onClick={() => setPage(next)}>Next</button>
                    </li>
                </ul>
            </nav>
        )
    }

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
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{flight.id}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.origin}</td>
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
        <>
            <div>
                {handleTable()}
            </div>
            <div>
                {pagination(page)}
            </div>
        </>
    )
}


export default AllFlight