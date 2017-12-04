/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Spike;

/**
 *
 * @author thomasthimothee
 */
public class UserBooking {
    private int homeId;
    private String date;

    public UserBooking() {
    }

    public UserBooking(int homeId, String date) {
        this.homeId = homeId;
        this.date = date;
    }
    

    public int getHomeId() {
        return homeId;
    }

    public void setHomeId(int homeId) {
        this.homeId = homeId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    
    
}
