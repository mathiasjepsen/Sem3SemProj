/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.JSON;

import entity.Address;
import entity.HomeBooking;
import entity.Home;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Lovro
 */
public class JSONHome {

    private int id;
    private Address address;
    private String description;
    private String image;
    private HashMap<String, Double> ratings;
    private int rating;
    private List<HomeBooking> homeBookings;

    public JSONHome(Home home) {
        this.id = home.getId();
        this.address = home.getAddress();
        this.description = home.getDescription();
        this.image = home.getImage();
        this.ratings = home.getRatings();
        if (!this.ratings.entrySet().isEmpty()) {
            this.rating = calculateRating();
        }
        this.id = home.getId();
        this.homeBookings = home.getHomeBookings();
    }

    private int calculateRating() {
        int sum = 0;
        int count = 0;
        for (Double value : ratings.values()) {
            sum += value;
            count++;
        }
        return sum / count;
    }

    public int getId() {
        return id;
    }

    public Address getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public HashMap<String, Double> getRatings() {
        return ratings;
    }

    public int getRating() {
        return rating;
    }

    public List<HomeBooking> getHomeBookings() {
        return homeBookings;
    }

}
