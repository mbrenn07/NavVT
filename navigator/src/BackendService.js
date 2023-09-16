// import React from "react";
import axios from "axios";

const getApiInfo = () => {
    return axios.get("http://localhost:8080/hello-world");
    // return "hello";
}

export { getApiInfo };