import myAxios from "./axios";

const headers = () => {

    return (
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            }
        }
    );
};

const HttpGetAxios = async (url) => {
    console.log("GET Axios")
    const config = headers();
    return (myAxios.get(url, config));
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


export {HttpGetAxios, HttpPostAxios, HttpPutAxios, HttpDeleteAxios, HttpLoginAxios};