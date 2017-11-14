package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author mathiasjepsen
 */
@Entity(name = "ADDRESS")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String zip;
    private String street;
    @Column(name = "GPS_LOCATION", nullable = true)
    private String location;

    public Address() {
    }

    public Address(String city, String zip, String street, String location) {
        this.city = city;
        this.zip = zip;
        this.street = street;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getZip() {
        return zip;
    }

    public String getStreet() {
        return street;
    }

    public String getLocation() {
        return location;
    }

}
