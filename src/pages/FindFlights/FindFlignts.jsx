import React, {useEffect, useState} from "react";
import {HttpPostAxios} from "../../http/HttpBasicAxios";
import Pagination from "../../components/Pagination";
import {ErrorToast} from "../../components/Toasty/Toasty";
import Loading from "../../components/Loading/Loading";

const FindFlignts = () => {
    const [loading, setLoading] = useState(false)
    const [fightList, setFlightList] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [departure, setDeparture] = useState("")
    const [arrival, setArrival] = useState("")
    const [hasResult, setHasResult] = useState(false)

    useEffect(() => {
        getFlights()
    },[page])

    function getFlights() {
        setHasResult(false)
        setLoading(true)

        const body = {
            "page": page,
            "pageSize": pageSize,
            "filters": []
        }

        if (arrival !== "") {
            body.filters.push({"key": "origin", "value": arrival})
        }

        if (departure !== "") {
            body.filters.push({"key": "destination", "value": departure})
        }

        setArrival("")
        setDeparture("")

        HttpPostAxios("flight/search", body)
            .then(resp => {
                setFlightList(resp.data.result)

                let numberOfPages = Math.floor(resp.data.count / pageSize)
                numberOfPages = resp.data.count % pageSize !== 0 ? numberOfPages + 1 : numberOfPages
                setMaxPage(numberOfPages)
                setHasResult(true)
                setLoading(false)
            })
    }

    function handleForm() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" value={departure} placeholder="Departures"
                                   onChange={e => setDeparture(e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={arrival} placeholder="Arrival"
                                   onChange={e => setArrival(e.target.value)}/>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={() => getFlights()}>Find</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function pagination() {
        const previous = page === 1 ? 1 : page - 1
        const next = page === 1 ? 3 : page + 1

        return (
            <>
                {
                    fightList.length <= 20 ?
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => setPage(previous)}
                                            tabIndex="-1">Previous
                                    </button>
                                </li>
                                <li className={page >= 1 ? "page-item" : "page-item disabled"}>
                                    <button className="page-link" onClick={() => setPage(previous)}>{previous}</button>
                                </li>
                                <li className={maxPage === 1 ? "page-item disabled" : "page-item"}>
                                    <button className="page-link"
                                            onClick={() => setPage(page === 1 ? 2 : page)}>{page === 1 ? 2 : page}</button>
                                </li>
                                <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                                    <button className="page-link">{next}</button>
                                </li>
                                <li className={maxPage >= 3 ? "page-item" : "page-item disabled"}>
                                    <button className="page-link" onClick={() => setPage(next)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                        :
                        <></>
                }
            </>

        )
    }

    function handleResult() {
        return (
            <>
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
                        fightList === null ? <></> :fightList.map((flight, index) => (
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
                {pagination()}
            </>
        )
    }


    return (
        <>
            <div className="mt-4">
                {handleForm()}
            </div>
            <div className="mt-4">
                {
                    loading ? <Loading/> : <>{hasResult && !loading ? handleResult() : <></>}</>
                }

            </div>
        </>

    )

}


export default FindFlignts