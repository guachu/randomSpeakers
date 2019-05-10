/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.randomSpeakers.randomSpeakers.model;

/**
 *
 * @author aleja
 */
public class MasterException extends Exception {

    public MasterException(String message) {
        super(message);
    }

    public MasterException(String message, Throwable cause) {
        super(message, cause);
    }
}
