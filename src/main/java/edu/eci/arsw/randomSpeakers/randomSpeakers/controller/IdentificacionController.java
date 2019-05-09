package edu.eci.arsw.randomSpeakers.randomSpeakers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.eci.arsw.randomSpeakers.randomSpeakers.model.User;
import edu.eci.arsw.randomSpeakers.randomSpeakers.services.IdentificacionServices;

@RestController
@RequestMapping("/api/identificacion")


public class IdentificacionController{

    @Autowired
    IdentificacionServices idSe;

    @PostMapping

    public ResponseEntity<?> IdentificarUsuario(@RequestBody User usuario){
        try {
            System.out.println(usuario);
            return new ResponseEntity<>(idSe.Autenticar(usuario), HttpStatus.ACCEPTED);
            
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>("Este usuario este erroneo",HttpStatus.NOT_FOUND);
        }
    }




}