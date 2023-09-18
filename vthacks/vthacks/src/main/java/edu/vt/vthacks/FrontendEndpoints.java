package edu.vt.vthacks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*")
@Controller
public class FrontendEndpoints {

  @GetMapping("/hello-world")
  @ResponseBody
  public String sayHello() {
    return "Hello World!";
  }

}
