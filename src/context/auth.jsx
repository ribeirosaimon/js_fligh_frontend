import {createContext, useEffect, useState} from "react";
import {HttpGetAxios, HttpLoginAxios} from "../http/HttpBasicAxios";

export const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loggedUser, setLoggedUser] = useState({})

    useEffect(() => {
        const sessionToken = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (sessionToken !== undefined && sessionToken !== null) {
            setIsAuthenticated(true);
            setToken(sessionToken);
            setLoggedUser({
                userId,
                userRole
            })
        }
    }, [isAuthenticated]);

    const signin = async (email, password) => {
        setLoading(true)
        const body = JSON.stringify({"username": email, "password": password})

        await HttpLoginAxios(body)
            .then(resp => {
                localStorage.setItem("token", resp.data.access_token);
                setToken(resp.data.token)
                setError("")

            })
            .catch(() => {
                setError("login or password incorrect")
                setLoading(false)
            })

        await HttpGetAxios("user/who-is-me")
            .then((resp) => {
                let userRole
                console.log(resp.data.roles)
                if (resp.data.roles.includes("USER")) {
                    userRole = "USER"
                }
                if (resp.data.roles.includes("ADMIN")) {
                    userRole = "ADMIN"
                }

                localStorage.setItem("userRole", userRole);
                localStorage.setItem("userId", resp.data.userId);

                setLoading(false)
                setIsAuthenticated(true);
            })
            .catch(err => {
                console.log(err)
            })
    }


    const signout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        !loading ?
            <AuthContext.Provider
                value={{signin, signout, isAuthenticated, token, loggedUser}}
            >
                {children}
            </AuthContext.Provider>
            :
            <div>ESPERA</div>)
}