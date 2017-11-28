package security.interfaces;

import entity.Home;
import java.util.List;
import rest.JSON.JSONHome;

/**
 *
 * @author mathiasjepsen
 */
public interface IHomeFacade {
    
    JSONHome getHome(Integer id);
    List<JSONHome> getAllHomes();
    JSONHome createHome(Home home);
    JSONHome addRate(Home editedHome);
    JSONHome editHome(Home editedHome);
    
}
