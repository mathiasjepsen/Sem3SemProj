package rest.JSON;

import entity.Role;
import java.util.ArrayList;
import java.util.List;
import security.interfaces.IUser;

/**
 *
 * @author mathiasjepsen
 */
public class JSONUser {

    private String username;
    private String passwordHash;
    private String fName;
    private String lName;
    private String phone;
    private String email;
    private List<String> roles;

    public JSONUser(IUser user) {
        this.username = user.getUserName();
        this.passwordHash = user.getPasswordHash();
        this.fName = user.getfName();
        this.lName = user.getlName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.roles = user.getRolesAsStrings();
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

    public List<String> getRoles() {
        return roles;
    }

    public List<String> getRolesAsStrings() {
        if (roles.isEmpty()) {
            return null;
        }
        
        List<String> rolesAsStrings = new ArrayList();
        for (String role : roles) {
            rolesAsStrings.add(role);
        }
        
        return rolesAsStrings;
    }
}
