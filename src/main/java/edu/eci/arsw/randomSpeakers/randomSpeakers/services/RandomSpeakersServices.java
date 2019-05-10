/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.randomSpeakers.randomSpeakers.services;

import edu.eci.arsw.randomSpeakers.randomSpeakers.model.MasterException;
import edu.eci.arsw.randomSpeakers.randomSpeakers.model.RandomSpeakersException;
import edu.eci.arsw.randomSpeakers.randomSpeakers.model.User;
import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author aleja
 */
public interface RandomSpeakersServices {
    public void registerUserToRoom(int roomId,User user) throws RandomSpeakersException;
    
    public void removeUserFromRoom(int roomId,User user) throws RandomSpeakersException;
    
    public Set<User> getRegisteredUsers(int roomId) throws RandomSpeakersException;
    
    public void createRoom(int roomId) throws RandomSpeakersException;
    
    public void removeRoom(int roomId) throws RandomSpeakersException;
    
    public int getTotalRooms() throws RandomSpeakersException;
    
    public void userOnline(int roomId, String username)throws RandomSpeakersException;
    
    public User getUser(int roomId, String username) throws RandomSpeakersException;
    
    public Set<Integer> getRooms();

    //public ArrayList<> getDrawFromRoom(int roomId) throws RandomSpeakersException, MasterException;

}
