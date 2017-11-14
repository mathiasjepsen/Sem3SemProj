package security.factories;

import facades.PlaceFacade;
import javax.persistence.Persistence;
import security.interfaces.IPlaceFacade;

/**
 *
 * @author mathiasjepsen
 */
public class PlaceFacadeFactory {

    private static final IPlaceFacade INSTANCE = new PlaceFacade(Persistence.createEntityManagerFactory("pu_development"));

    public static IPlaceFacade getInstance() {
        return INSTANCE;
    }

}
