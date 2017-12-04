package security.interfaces;

import entity.User;
import java.util.List;
import rest.JSON.JSONHome;
import rest.JSON.JSONUser;
import security.PasswordStorage;

/**
 *
 * @author mathiasjepsen
 */
public interface IAdminFacade {
    
    JSONUser deleteUser(String username);
    JSONUser editUser(User editedUser) throws PasswordStorage.CannotPerformOperationException;
    JSONUser addUser(User user) throws PasswordStorage.CannotPerformOperationException;
    JSONUser registerAdmin(User admin) throws PasswordStorage.CannotPerformOperationException;
    JSONHome deleteHome(Integer id);

}
