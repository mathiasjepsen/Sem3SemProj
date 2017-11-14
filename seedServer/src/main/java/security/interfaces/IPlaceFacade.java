package security.interfaces;

import entity.Place;
import java.util.List;
import rest.JSON.JSONPlace;

/**
 *
 * @author mathiasjepsen
 */
public interface IPlaceFacade {
    
    JSONPlace getPlace(Integer id);
    List<JSONPlace> getAllPlaces();
    JSONPlace createPlace(Place place);
    JSONPlace addRate(Place editedPlace);
    
}
