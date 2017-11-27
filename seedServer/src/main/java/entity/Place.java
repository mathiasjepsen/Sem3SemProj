package entity;

import java.io.Serializable;
import java.util.HashMap;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author thomasthimothee
 */
@Entity(name = "PLACE")
public class Place implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    private Address address;
    private String description;
    private HashMap<String, Double> ratings;
    private String image;

    public Place() {
        this.ratings = new HashMap();
    }

    public Place(Address address, String description, HashMap<String, Double> ratings, String image) {
        this.address = address;
        this.description = description;
        this.ratings = ratings;
        this.image = image;
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

}
