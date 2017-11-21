package security.interfaces;

import entity.User;
import java.util.List;
import rest.JSON.JSONUser;
import security.PasswordStorage;

/**
 *
 * @author lam
 */
public interface IUserFacade {

    List<String> authenticateUser(String userName, String password);
    List<JSONUser> getUsers();
    JSONUser getUserByUserId(String id);
    JSONUser registerUser(User user) throws PasswordStorage.CannotPerformOperationException;
    JSONUser editUser (User user) throws PasswordStorage.CannotPerformOperationException;
    
}
