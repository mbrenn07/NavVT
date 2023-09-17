// import React from "react";
import axios from "axios";

class BackendService {
    getActiveBusInfo = () => {
        return axios.get("http://localhost:8080/activeBusInfo") 
    }

    getInitialBusInfo = () => {
        return axios.get("http://localhost:8080/initialBusInfo")
    }

    getBusRoute = (busName) => {
        const formattedBusName = busName.replaceAll(" ", "%20");
        return axios.get("http://localhost:8080/busRoute/" + formattedBusName)
    }
}

export default new BackendService();