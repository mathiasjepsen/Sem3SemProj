/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.JSON;

import entity.Address;
import entity.Place;
import java.util.HashMap;

/**
 *
 * @author Lovro
 */
public class JSONPlace {

    private int id;
    private Address address;
    private String description;
    private String image;
    private HashMap<String, Double> ratings;
    private int rating;

    public JSONPlace(Place place) {
        this.id = place.getId();
        this.address = place.getAddress();
        this.description = place.getDescription();
        this.image = place.getImage();
        this.ratings = place.getRatings();
        this.rating = calculateRating();
        this.id = place.getId();
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

}
