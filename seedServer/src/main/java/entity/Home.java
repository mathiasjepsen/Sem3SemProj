package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.ManyToOne;

import javax.persistence.OneToMany;

import javax.persistence.OneToOne;

/**
 *
 * @author thomasthimothee
 */
@Entity(name = "HOME")
public class Home implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    private Address address;
    private String description;
    private HashMap<String, Double> ratings;
    private String image;

    @ManyToOne
    private User user;
    
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<HomeBooking> homeBookings = new ArrayList();


    public Home() {
        this.ratings = new HashMap();
    }

    public Home(Address address, String description, HashMap<String, Double> ratings, String image, User user) {
        this.address = address;
        this.description = description;
        this.ratings = ratings;
        this.image = image;
        this.user = user;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public HashMap<String, Double> getRatings() {
        return ratings;
    }

    public String getImage() {
        return image;
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

    public void setImages(String image) {
        this.image = image;
    }

    public List<HomeBooking> getHomeBookings() {
        return homeBookings;
    }

    public void setHomeBookings(List<HomeBooking> homeBookings) {
        this.homeBookings = homeBookings;
    }

}
