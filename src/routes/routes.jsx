import {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signin from "../pages/sigin/Signin";
import Home from "../pages/home/home";
import useAuth from "../hooks/useAuth";
import CheapFlight from "../pages/CheapFlight/CheapFlight";
import AllFlights from "../pages/allFlights/AllFlights";
import NavBar from "../navBar/NavBar";

const Private = ({Item}) => {
    const {isAuthenticated} = useAuth()

    return isAuthenticated ?
        <>
            <NavBar/>
            <Item/>
        </>
        :
        <Signin/>
}

const LoginPrivateRoute = ({Login}) => {
    const {isAuthenticated} = useAuth()

    return (
        !isAuthenticated ?
            <Login/>
            :
            <Home/>
    )
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home}/>}/>
                    <Route exact path="/cheap-flight" element={<Private Item={CheapFlight}/>}/>
                    <Route exact path="/all-flight" element={<Private Item={AllFlights}/>}/>
                    <Route path={"/"} element={<Private Item={LoginPrivateRoute}/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}


export default RoutesApp