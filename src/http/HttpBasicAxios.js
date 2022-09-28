import myAxios from "./axios";
import axios from "axios";

const headers = () => {

    return (
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    );
};

const HttpPythonApiGet = async () => {
    return axios.get("http://localhost:5000/")
};

const HttpGetAxios = async (url) => {
    return myAxios.get(url, headers());
};

const HttpPostAxios = async (url, body) => {
    const config = headers();
    return (myAxios.post(url, body, config));
};

const HttpPutAxios = async (url, body) => {
    const config = headers();
    return (myAxios.put(url, body, config));
};

const HttpDeleteAxios = async (url) => {
    const config = headers();
    return (myAxios.delete(url, config));
};

const HttpLoginAxios = async (params) => {
    const headers = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    return (myAxios.post("/login", params, headers));
};


export {HttpGetAxios, HttpPostAxios, HttpPutAxios, HttpDeleteAxios, HttpLoginAxios, HttpPythonApiGet};