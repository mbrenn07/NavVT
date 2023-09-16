// import React from "react";
import axios from "axios";

class BackendService {
    getApiInfo() {
        return axios.get("http://localhost:8080/hello-world");
    }

    getBTInfo() {
        return axios.get("http://localhost:8080/testPoll");
    }
}
export default new BackendService();