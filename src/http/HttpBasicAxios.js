import myAxios from "./axios";

const headers = (token) => {

    return (
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
};

const HttpGetAxios = async (url, token) => {
    console.log("GET Axios")
    const config = headers(token);
    return (myAxios.get(url, config));
};

const HttpPostAxios = async (url, body, token) => {
    const config = headers(token);
    return (myAxios.post(url, body, config));
};

const HttpPutAxios = async (url, body, token) => {
    const config = headers(token);
    return (myAxios.put(url, body, config));
};

const HttpDeleteAxios = async (url, token) => {
    const config = headers(token);
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



export { HttpGetAxios, HttpPostAxios, HttpPutAxios, HttpDeleteAxios, HttpLoginAxios };