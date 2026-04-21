package edu.uwrf.se.cryptoclicker.cryptoclicker.repository;

import edu.uwrf.se.cryptoclicker.cryptoclicker.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p FROM Player p WHERE p.username = :username")
    Player findByUsername(String username);

}

