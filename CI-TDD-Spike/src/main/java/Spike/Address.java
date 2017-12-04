package Spike;

/**
 *
 * @author mathiasjepsen
 */
public class Address {
    
    private String city;
    private String zip;
    private String street;

    public Address(String city, String zip, String street) {
        this.city = city;
        this.zip = zip;
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
    
    
    
}
