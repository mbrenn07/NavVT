// import React from "react";
import axios from "axios";

const getApiInfo = () => {
    return axios.get("http://localhost:8080/hello-world");
    // return "hello";
}

const getBTInfo = () => {
    return axios.get("http://localhost:8080/testPoll")
}

export { getApiInfo, getBTInfo };