/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Spike;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author mathiasjepsen
 */
public class Home {

    private Address address;
    private String description;
    private HashMap<String, Double> ratings;
    private String image;
    private List<HomeBooking> homeBookings = new ArrayList();

    public Address getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public void addBooking(HomeBooking bookings) {
        if (homeBookings == null) {
            homeBookings = new ArrayList();
        }

        homeBookings.add(bookings);
    }

    public HashMap<String, Double> getRatings() {
        return ratings;
    }

    public List<HomeBooking> getHomeBookings() {
        return homeBookings;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRatings(HashMap<String, Double> ratings) {
        this.ratings = ratings;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setHomeBookings(List<HomeBooking> homeBookings) {
        this.homeBookings = homeBookings;
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

}
