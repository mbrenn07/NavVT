// import React from "react";
import axios from "axios";

class BackendService {
    getActiveBusInfo = () => {
        console.log("API called")
        return axios.get("http://localhost:8080/activeBusInfo")
    }

    getInitialBusInfo = () => {
        return axios.get("http://localhost:8080/initialBusInfo")
    }

    getBTInfo = (busName) => {
        return axios.get("http://localhost:8080/busRoute/" + busName)
    }
}

export default new BackendService();