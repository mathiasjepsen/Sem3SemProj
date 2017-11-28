package security.interfaces;

import entity.User;
import java.util.List;
import rest.JSON.JSONHome;
import rest.JSON.JSONUser;
import security.PasswordStorage;

/**
 *
 * @author lam
 */
public interface IUserFacade {
    
    List<JSONHome> getMyHomes(String userName);
    List<String> authenticateUser(String userName, String password);
    List<JSONUser> getUsers();
    JSONUser getUserByUserName(String username);
    JSONUser registerUser(User user) throws PasswordStorage.CannotPerformOperationException;
    JSONUser editUser (User user) throws PasswordStorage.CannotPerformOperationException;
    
}
