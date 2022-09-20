import {createContext, useEffect, useState} from "react";
import {HttpLoginAxios} from "../http/HttpBasicAxios";

export const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const sessionToken = localStorage.getItem("token");

        if (sessionToken !== undefined && sessionToken !== null) {
            setIsAuthenticated(true);
            setToken(sessionToken);
        }
        console.log(isAuthenticated)
    }, [isAuthenticated]);

    const signin = async (email, password) => {
        setLoading(true)
        const body = JSON.stringify({"username": email, "password": password})

        await HttpLoginAxios(body)
            .then(resp => {
                localStorage.setItem("token", resp.data.access_token);
                setIsAuthenticated(true);
                setToken(resp.data.token)
                setError("")
                setLoading(false)
            })
            .catch(() => {
                setError("login or password incorrect")
                setLoading(false)
            })
    }


    const signout = () => {
        setUser(null)
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        !loading ?
            <AuthContext.Provider
                value={{user, siged: !!user, signin, signout, isAuthenticated, token}}
            >
                {children}
            </AuthContext.Provider>
            :
            <div>ESPERA</div>)
}