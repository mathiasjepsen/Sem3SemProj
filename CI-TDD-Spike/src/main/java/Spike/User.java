package Spike;

import java.util.List;

/**
 *
 * @author mathiasjepsen
 */
public class User {
    
    private String username;
    private String passwordHash;
    private String fName;
    private String lName;
    private String phone;
    private String email;
    private List<Role> roles;
    private List<UserBooking> bookings;
    
    public User(String username, String passwordHash, String fName, String lName, String phone, String email) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public List<UserBooking> getBookings() {
        return bookings;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public void setBookings(List<UserBooking> bookings) {
        this.bookings = bookings;
    }
    
    
    
    
    
}
