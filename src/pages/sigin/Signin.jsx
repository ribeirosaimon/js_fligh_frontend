import React, {useState} from "react";
import * as C from "./styles"
import Input from "../../components/input/styles";
import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {ErrorToast} from "../../components/Toasty/Toasty";


const Signin = () => {
    const {signin, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        if (!email | !password) {
            ErrorToast("You must insert all fields")
            return
        }

        signin(email, password)

        if (!isAuthenticated) {
            ErrorToast("incorrect password")
        } else {
            navigate("/home")
        }
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
                <Button Text={"Login"} onClick={handleLogin}>teste</Button>
                <C.LabelSignup>
                    <C.Strong>Admin Login: </C.Strong>
                    <p>Admin</p>
                    <C.Strong>Admin Password: </C.Strong>
                    <p>Teste</p>
                    <p></p>
                    <C.Strong>User Login: </C.Strong>
                    <p>User</p>
                    <C.Strong>User Password: </C.Strong>
                    <p>Teste</p>
                    <p></p>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    )
}


export default Signin