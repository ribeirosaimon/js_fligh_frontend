import * as C from "./styles"
import React, {useEffect, useState} from "react";
import {HttpGetAxios, HttpPythonApiGet} from "../../http/HttpBasicAxios";
import {ErrorToast} from "../../components/Toasty/Toasty";
import Loading from "../../components/Loading/Loading";

const FindNewFlight = () => {
    const [loadingPage, setLoadingPage] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [lastFlight, setLastFlight] = useState({})

    useEffect(() => {
        HttpGetAxios("/config")
            .then(resp => {
                setIsLoading(resp.data.isLoading)
            })
            .catch(() => {
                ErrorToast("Api Error")
            })
        getLastFlight()
    }, [])

    useEffect(() => {
        getLastFlight()
    }, [isLoading])

    function getLastFlight() {
        HttpGetAxios("flight/last-flight")
            .then(resp => {
                setLastFlight(resp.data)
                setLoadingPage(false)
            })
    }


    function getNewFlight() {
        setIsLoading(true)
        HttpPythonApiGet()
            .then(() => {
                setIsLoading(false)
            })
            .catch(() => {
                ErrorToast("Python Api error")
            })
    }

    function handleTableResult() {
        return (
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
                    <td>{lastFlight.id}</td>
                    <td>{lastFlight.destination}</td>
                    <td>{lastFlight.origin}</td>
                    <td>{lastFlight.price}</td>
                    <td>{lastFlight.timeGoing}</td>
                    <td>{lastFlight.timeReturn}</td>
                    <td>{lastFlight.travelAt}</td>
                </tr>

                </tbody>
                <thead>
                <tr>
                    <th colSpan={"3"}>Searched</th>
                    <th colSpan={"4"}>Airlines</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={"3"}>{lastFlight.createdAt.replace("T", " ").replace("Z", "")}</td>
                    <td colSpan={"4"}>{lastFlight.airlines}</td>
                </tr>

                </tbody>
            </table>
        )
    }

    return (
        <>
            {
                !loadingPage ?
                    <C.Container>
                        <C.Content>
                            <div>
                                <p>Try to find a new ticket</p>
                            </div>
                            <div>
                                {isLoading ? <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : <button type="button" className="btn btn-success" disabled={isLoading}
                                                 onClick={() => getNewFlight()}>Submit</button>}
                            </div>
                        </C.Content>
                        {
                            !isLoading ?
                                <C.ContentResp>
                                    {handleTableResult()}
                                </C.ContentResp>
                                :
                                <></>
                        }
                    </C.Container>
                    :
                    <Loading/>
            }
        </>
    )
}

export default FindNewFlight