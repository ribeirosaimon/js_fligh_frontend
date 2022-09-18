import React, {useState} from "react";
import * as C from "./styles"
import Input from "../../components/input/styles";
import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Signin = () => {
    const {signin} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        if (!email | !password) {
            setError("You must insert all fields")
            return
        }
        signin(email, password)
    }

    return (
        <C.Container>
            <C.Label>Login Flight Cheap</C.Label>
            <C.Content>
                <Input
                    type={"email"}
                    placeholder={"email"}
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}>
                </Input>
                <Input
                    type={"password"}
                    placeholder={"password"}
                    value={password}
                    onChange={(e) => [setPassword(e.target.value), setError("")]}>
                </Input>
                <C.LabelError>{error}</C.LabelError>
                <Button Text={"sigup"} onClick={handleLogin}></Button>
                <C.LabelSignup>
                    No have account?
                    <C.Strong>
                        <Link to={"/signup"}>&nbsp;Signup</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    )
}


export default Signin