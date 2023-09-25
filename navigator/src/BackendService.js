// import React from "react";
import axios from "axios";

class BackendService {
    getActiveBusInfo = () => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/activeBusInfo") 
    }

    getInitialBusInfo = () => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/initialBusInfo")
    }

    getBusRoute = (busName) => {
        const formattedBusName = busName.replaceAll(" ", "%20");
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/busRoute/" + formattedBusName)
    }

    getRouteTimes = (tripId) => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/routeTimes/" + tripId)
    }

    getTripIds = (busName) => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/tripIds/" + busName)
    }
}

export default new BackendService();