package edu.vt.vthacks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*")
@Controller
public class PollBTTransit {

    @GetMapping("/activeBusInfo")
    @ResponseBody
    public String getActiveBusInfo() throws ProtocolException {
        try {
            URL url = new URL(
                    "https://ridebt.org/index.php?option=com_ajax&module=bt_map&format=json&Itemid=101&method=getBuses");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/initialBusInfo")
    @ResponseBody
    public String getInitialBusInfo() throws ProtocolException {
        try {
            URL url = new URL(
                    "https://ridebt.org/index.php?option=com_ajax&module=bt_map&format=json&Itemid=101&method=getRoutes");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/busRoute/{busName}")
    @ResponseBody
    public String getBusRoute(@PathVariable("busName") String busName) throws ProtocolException {
        busName = busName.replaceAll(" ", "%20");
        try {
            URL url = new URL(
                    "https://ridebt.org/index.php?option=com_ajax&module=bt_map&format=json&Itemid=101&method=getPatternPoints&patternName=" + busName);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/routeTimes/{tripId}")
    @ResponseBody
    public String getRouteTimes(@PathVariable("tripId") String tripId) throws ProtocolException {
        try {
            URL url = new URL(
                    "http://bt4uclassic.org/webservices/bt4u_webservice.asmx/GetArrivalAndDepartureTimesForTrip?tripID=" + tripId);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/tripIds/{busName}")
    @ResponseBody
    public String getTripIds(@PathVariable("busName") String busName) throws ProtocolException {
        try {
            URL url = new URL(
                "http://www.bt4uclassic.org/webservices/bt4u_webservice.asmx/GetArrivalAndDepartureTimesForRoutes?routeShortNames=" + busName + "&noOfTrips=&serviceDate=");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/nearestStop/{lat}/{lng}")
    @ResponseBody
    public String getNearestStop(@PathVariable("lat") String lat, @PathVariable("lng") String lng) throws ProtocolException {
        try {
            URL url = new URL(
                "http://www.bt4uclassic.org/webservices/bt4u_webservice.asmx/GetNearestStops?latitude=" + lat + "&longitude=" + lng + "&noOfStops=1&serviceDate=");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("/getStopDepartures/{stopId}")
    @ResponseBody
    public String getStopDepartures(@PathVariable("stopId") String stopId) throws ProtocolException {
        try {
            URL url = new URL(
                "http://www.bt4uclassic.org/webservices/bt4u_webservice.asmx/GetNextDeparturesForStop?stopCode=" + stopId + "&noOfTrips=99&routeShortName=");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

}
