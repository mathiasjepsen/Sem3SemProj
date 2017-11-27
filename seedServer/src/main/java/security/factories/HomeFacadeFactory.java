package security.factories;

import facades.HomeFacade;
import javax.persistence.Persistence;
import security.interfaces.IHomeFacade;

/**
 *
 * @author mathiasjepsen
 */
public class HomeFacadeFactory {

    private static final IHomeFacade INSTANCE = new HomeFacade(Persistence.createEntityManagerFactory("pu_development"));

    public static IHomeFacade getInstance() {
        return INSTANCE;
    }

}
