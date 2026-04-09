package edu.uwrf.se.cryptoclicker.cryptoclicker.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String getHome(Model model) {
        return "home";
    }

    @GetMapping("/about")
    public String getAbout(Model model) {
        return "about";
    }

    @GetMapping("/about/{name}")
    public String getDeveloperPage(@PathVariable("name") String devName, Model model) {
        return devName;
    }
}
