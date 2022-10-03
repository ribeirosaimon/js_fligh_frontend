import React, {useState} from "react";
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

    function getFlights() {
        setHasResult(false)
        setLoading(true)

        const body = {
            "page": page,
            "pageSize": pageSize,
            "filters": []
        }

        if (arrival !== "") {
            body.filters.push({"key": "destination", "value": arrival})
        }

        if (departure !== "") {
            body.filters.push({"key": "origin", "value": departure})
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
            .catch(
                ErrorToast("Api error")
            )

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
                        fightList.map((flight, index) => (
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
                <Pagination/>
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