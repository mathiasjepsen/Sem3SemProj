package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import security.interfaces.IUser;
import security.PasswordStorage;

@Entity(name = "USER")
public class User implements IUser, Serializable {

    @Id
    @Column(length = 35, name = "USERNAME", nullable = false)
    private String userName;
    @Column(length = 255, name = "PASSWORD_HASH", nullable = false)
    private String passwordHash;
    private String fName;
    private String lName;
    private String phone;
    private String email;
    @ManyToMany
    List<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Home> homes;

    @OneToMany(cascade = CascadeType.PERSIST)
    List<UserBooking> bookings = new ArrayList();


    public User() {
    }

    public User(String username, String password, String fName, String lName, String phone, String email) throws PasswordStorage.CannotPerformOperationException {
        this.userName = username;
        this.passwordHash = PasswordStorage.createHash(password);
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.email = email;
    }

    public User(String userName, String password) throws PasswordStorage.CannotPerformOperationException {
        this.userName = userName;
        this.passwordHash = PasswordStorage.createHash(password);
    }

    public void addRole(Role role) {
        if (roles == null) {
            roles = new ArrayList();
        }
        roles.add(role);
        role.addUser(this);
    }
    
    public void addHome(Home home){
        if (homes == null){
            homes = new ArrayList();
        }
        
        homes.add(home);
        home.setUser(this);
    }

    public List<Home> getHomes()
    {
        return homes;
    }

    public void setHomes(List<Home> homes)
    {
        this.homes = homes;
    }

    @Override
    public List<Role> getRoles() {
        return roles;
    }

    public List<UserBooking> getBookings() {
        return bookings;
    }

    public void setBookings(List<UserBooking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public List<String> getRolesAsStrings() {
        if (roles.isEmpty()) {
            return null;
        }
        List<String> rolesAsStrings = new ArrayList();
        for (Role role : roles) {
            rolesAsStrings.add(role.getRoleName());
        }
        return rolesAsStrings;
    }
    
    public List<String> getHomesAsStrings(){
        if (homes.isEmpty()) {
            return null;
        }
        List<String> homesAsStrings = new ArrayList();
        for (Home home : homes) {
            homesAsStrings.add(home.toString());
        }
        return homesAsStrings;
    }

    @Override
    public String getPasswordHash() {
        return passwordHash;
    }
    
    @Override
    public void createPasswordHash(String password) throws PasswordStorage.CannotPerformOperationException {
        this.passwordHash = PasswordStorage.createHash(password);
    }

    @Override
    public String getUserName() {
        return userName;
    }

    @Override
    public String getfName() {
        return fName;
    }

    @Override
    public String getlName() {
        return lName;
    }

    @Override
    public String getPhone() {
        return phone;
    }

    @Override
    public String getEmail() {
        return email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
    
    
    
    


}
