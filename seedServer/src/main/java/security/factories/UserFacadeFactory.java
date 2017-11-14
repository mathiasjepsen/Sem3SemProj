package security.factories;

import facades.UserFacade;
import javax.persistence.Persistence;
import security.interfaces.IUserFacade;

/**
 *
 * @author lam
 */
public class UserFacadeFactory {
//    private static final IUserFacade instance = 
//            new UserFacade(Persistence.createEntityManagerFactory(DeploymentConfiguration.PU_NAME));
private static final IUserFacade instance = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));
    public static IUserFacade getInstance(){
        return instance;
    }
}