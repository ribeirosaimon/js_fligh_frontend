import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")
        const usersStorage = localStorage.getItem("users_db")

        if (userToken && usersStorage){
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            )
            if (hasUser) setUser(hasUser[0])
        }
    }, [])

    const signin = (email, password) => {
        const userStorage = JSON.parse(localStorage.getItem("user_db"))
        const hasUser = userStorage?.filter((user) => user.email === email)
        if (hasUser?.length){
            if (hasUser[0].email === email && hasUser[0].password === password){
                const token = Math.random().toString(36).substring(2)
                localStorage.setItem("user_token", JSON.stringify({email, token}))
                setUser({email, password})
                return
            } else {
                return "email ou senha incorreto"
            }
        } else {
            return "usuario nao cadastrado"
        }
    }

    const signup =(email, password) => {
        const userStorage = JSON.parse(localStorage.getItem("user_db"))

        const hasUser = userStorage?.filter((user) => user.email === email)

        if (hasUser?.length){
            return "Ja tem user"
        }

        let newUser

        if (userStorage) {
            newUser = [...userStorage, {email, password}]
        } else {
            newUser =[{email,password}]
        }

        localStorage.setItem("user_db", JSON.stringify(newUser))
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }
    return <AuthContext.Provider
    value={{user,siged: !!user, signin, signup ,signout}}>{children}</AuthContext.Provider>
}