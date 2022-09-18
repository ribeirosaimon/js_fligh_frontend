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
        const body = JSON.stringify({"username": email, "password": password})
        console.log(body)

        await HttpLoginAxios(body)
            .then(resp => {
                console.log("Fez o post com sucesso")
                localStorage.setItem("token", resp.data.access_token);
                setIsAuthenticated(true);
                setToken(resp.data.token)
            })
            .catch(() => {
                console.log("Fez o post com erro")
                setError("login or password incorrect")
            })

        return ""
    }


    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }
    return (
        <AuthContext.Provider
            value={{user, siged: !!user, signin, signout}}
        >
            {children}
        </AuthContext.Provider>)
}