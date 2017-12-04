/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Spike;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thomasthimothee
 */
public class Role {
    
    private String roleName;
    private List<User> users;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<User> getUsers() {
        return users;
    }

    public void addUsers( User user) {
        if (users == null) {
            users = new ArrayList();
        }
        users.add(user);
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
    
    
    
    
}
