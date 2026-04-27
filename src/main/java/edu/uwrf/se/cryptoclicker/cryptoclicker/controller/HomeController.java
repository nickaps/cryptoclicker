package edu.uwrf.se.cryptoclicker.cryptoclicker.controller;


import edu.uwrf.se.cryptoclicker.cryptoclicker.model.Player;
import edu.uwrf.se.cryptoclicker.cryptoclicker.repository.PlayerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Console;

@Controller
public class HomeController {


    @GetMapping("/")
    public String getHomeDefault(Model model) {
        return "home";
    }

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

    @GetMapping("/game")
    public String game() {
        return "game";
    }



    private final PlayerRepository playerRepository;

    public HomeController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("player", new Player());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute Player player, Model model) {
        if(playerRepository.findByUsername(player.getUsername()) != null) {
            model.addAttribute("error", "Username already exists!");
            return "register";
        }
        playerRepository.save(player);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("player", new Player());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute Player player, HttpSession session, Model model) {
        Player existingUser = playerRepository.findByUsername(player.getUsername());

        if(existingUser != null && existingUser.getPassword().equals(player.getPassword())) {
//            model.addAttribute("username", existingUser.getUsername());
            session.setAttribute("currentUser", existingUser);
            session.setAttribute("currentUserName", existingUser.getUsername());
            return "redirect:/welcome";
        } else {
            model.addAttribute("error", "Invalid username or password!");
            return "login";
        }
    }

    @GetMapping("/welcome")
    public String welcomeScreen(HttpSession session, Model model) {
        Player player = (Player) session.getAttribute("currentUser");
        model.addAttribute("currentUserName", player.getUsername());
        model.addAttribute("currentUserScore", player.getScore());
        model.addAttribute("user", player);
        return "welcome";
    }

    @GetMapping("/guest-login")
    public String loginGuest(HttpSession session, Model model) {
        Player guest = playerRepository.getReferenceById(-1L);
        session.setAttribute("currentUser", guest);
        model.addAttribute("currentUserName", guest.getUsername());
        model.addAttribute("currentUserScore", 0);
        model.addAttribute("user", guest);
        return "redirect:/game";
    }

    @GetMapping("exit")
    public String exitGame(HttpSession session, Model model, @RequestParam("newScore") int newScore) {
        Player player = (Player) session.getAttribute("currentUser");
        if (player.getId() == -1) {
            session.removeAttribute("user");
            return "redirect:/home";
        }
        else {
            if (newScore != -1 && newScore > player.getScore())
            {
                player.setScore(newScore);
                playerRepository.setPlayerScore(player.getId(), newScore);
            }
            model.addAttribute("user", player);
            return "redirect:/welcome";
        }
    }


}
