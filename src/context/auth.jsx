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
    }, [isAuthenticated]);

    const signin = async (email, password) => {
        setLoading(true)
        const body = JSON.stringify({"username": email, "password": password})

        await HttpLoginAxios(body).then(resp => {
            localStorage.setItem("token", resp.data.access_token);
            setIsAuthenticated(true);
            setToken(resp.data.token);
            setError("")
        })
            .catch(() => setError("login or password incorrect"))
        console.log(error)

    }


    const signup = (email, password) => {
        const userStorage = JSON.parse(localStorage.getItem("user_db"))

        const hasUser = userStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            return "Ja tem user"
        }

        let newUser

        if (userStorage) {
            newUser = [...userStorage, {email, password}]
        } else {
            newUser = [{email, password}]
        }

        localStorage.setItem("user_db", JSON.stringify(newUser))
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }
    return (
        <AuthContext.Provider
            value={{user, siged: !!user, signin, signup, signout}}
        >
            {!loading ? children : ""}
        </AuthContext.Provider>)
}