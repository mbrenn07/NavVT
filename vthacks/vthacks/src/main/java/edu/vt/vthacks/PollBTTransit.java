package edu.vt.vthacks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PollBTTransit {

    @GetMapping("/testPoll")
    @ResponseBody
    public String sayHello() throws ProtocolException {
        System.out.println("Hi!");
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
            System.out.println(content.toString());
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

}
