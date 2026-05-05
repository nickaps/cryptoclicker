package edu.uwrf.se.cryptoclicker.cryptoclicker.controller;

import edu.uwrf.se.cryptoclicker.cryptoclicker.model.Player;
import edu.uwrf.se.cryptoclicker.cryptoclicker.repository.PlayerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    private final PlayerRepository playerRepository;

    public HomeController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    // HOME
    @GetMapping("/")
    public String getHomeDefault() {
        return "home";
    }

    @GetMapping("/home")
    public String getHome() {
        return "home";
    }

    // ABOUT
    @GetMapping("/about")
    public String getAbout() {
        return "about";
    }

    @GetMapping("/about/{name}")
    public String getDeveloperPage(@PathVariable("name") String devName) {
        return devName;
    }

    // ✅ GAME (MAKE SURE USERNAME ALWAYS PASSES)
    @GetMapping("/game")
    public String game(HttpSession session, Model model) {
        Player player = (Player) session.getAttribute("currentUser");

        if (player != null) {
            model.addAttribute("currentUserName", player.getUsername());
        } else {
            model.addAttribute("currentUserName", "Guest");
        }

        return "game";
    }

    // REGISTER
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("player", new Player());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute Player player, Model model) {
        if (playerRepository.findByUsername(player.getUsername()) != null) {
            model.addAttribute("error", "Username already exists!");
            return "register";
        }

        playerRepository.save(player);
        return "redirect:/login";
    }

    // LOGIN
    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("player", new Player());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute Player player, HttpSession session, Model model) {

        Player existingUser = playerRepository.findByUsername(player.getUsername());

        if (existingUser != null && existingUser.getPassword().equals(player.getPassword())) {
            session.setAttribute("currentUser", existingUser);
            return "redirect:/welcome";
        } else {
            model.addAttribute("error", "Invalid username or password!");
            return "login";
        }
    }

    // WELCOME
    @GetMapping("/welcome")
    public String welcomeScreen(HttpSession session, Model model) {
        Player player = (Player) session.getAttribute("currentUser");

        model.addAttribute("currentUserName", player.getUsername());
        model.addAttribute("currentUserScore", player.getScore());
        model.addAttribute("user", player);

        return "welcome";
    }

    // ✅ CLEAN GUEST LOGIN (THIS IS THE IMPORTANT PART)
    @GetMapping("/guest-login")
    public String loginGuest(HttpSession session) {

        Player guest = new Player();
        guest.setUsername("Guest");
        guest.setScore(0);

        session.setAttribute("currentUser", guest);

        return "redirect:/game";
    }

    // EXIT GAME
    @GetMapping("/exit")
    public String exitGame(HttpSession session, Model model, @RequestParam("newScore") int newScore) {

        Player player = (Player) session.getAttribute("currentUser");

        // if guest → just go home
        if (player.getId() == null) {
            session.removeAttribute("currentUser");
            return "redirect:/home";
        }

        // real user → save score
        if (newScore > player.getScore()) {
            player.setScore(newScore);
            playerRepository.setPlayerScore(player.getId(), newScore);
        }

        return "redirect:/welcome";
    }

    // DELETE USER
    @GetMapping("/delete-user")
    public String deleteUser(HttpSession session, Model model){
        Player player = (Player) session.getAttribute("currentUser");
        model.addAttribute("user", player);
        session.setAttribute("hasUserDeletionBeenPrompted", 1);
        return "deleteUser";
    }

    // DELETE USER CONFIRM
    @GetMapping("/delete-user-confirmed")
    public String deleteUserConfirmed(HttpSession session, Model model) {
        if (session.getAttribute("hasUserDeletionBeenPrompted") != null) {
            Player player = (Player) session.getAttribute("currentUser");
            playerRepository.delete(player);
            session.removeAttribute("hasUserDeletionBeenPrompted");
            session.removeAttribute("currentUser");
            return "deleteUserConfirm";
        }
        else {
            return "home";
        }
    }
}