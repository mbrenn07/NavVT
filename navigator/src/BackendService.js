// import React from "react";
import axios from "axios";

const getActiveBusInfo = () => {
    return axios.get("http://localhost:8080/activeBusInfo")
}

const getInitialBusInfo = () => {
    return axios.get("http://localhost:8080/initialBusInfo")
}

const getBTInfo = (busName) => {
    return axios.get("http://localhost:8080/busRoute/" + busName)
}

export { getActiveBusInfo, getInitialBusInfo, getBTInfo };