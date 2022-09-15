import {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signin from "../pages/sigin/Signin";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/home";
import useAuth from "../hooks/useAuth";

const Private = ({Item}) => {
    const {signed} = useAuth()

    return signed > 0 ? <Item/> : <Signin/>
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home}/>}/>
                    <Route exact path={"/signup"} element={<Signup/>}/>
                    <Route path={"/"} element={<Signin/>}/>
                    <Route path={"/*"} element={<Signin/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}


export default RoutesApp