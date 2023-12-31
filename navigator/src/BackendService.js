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

    getNearestStop = (lat, lng) => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/nearestStop/" + lat + "/" + lng)
    }

    getStopDepartures = (stopId) => {
        return axios.get("https://navvt-ujuh2f4o4a-uk.a.run.app/getStopDepartures/" + stopId)
    }
}

export default new BackendService();