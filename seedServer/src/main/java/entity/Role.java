package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity(name = "USER_ROLE")
public class Role implements Serializable {

    @Id
    @Column(length = 30, name = "ROLE_NAME")
    private String roleName;
    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public void addUser(User user) {
        if (users == null) {
            users = new ArrayList();
        }
        users.add(user);
    }

    public List<User> getUsers() {
        return users;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

}
