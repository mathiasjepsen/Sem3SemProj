package security.interfaces;

import entity.Role;
import java.util.List;
import security.PasswordStorage;

public interface IUser {

    List<String> getRolesAsStrings();

    void addRole(Role role);

    void createPasswordHash(String password) throws PasswordStorage.CannotPerformOperationException;
        
    String getUserName();

    String getPasswordHash();

    String getfName();

    String getlName();

    String getPhone();

    String getEmail();

    List<Role> getRoles();

}
