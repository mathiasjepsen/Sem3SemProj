package facades;

import entity.Place;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import rest.JSON.JSONPlace;
import security.interfaces.IPlaceFacade;

/**
 *
 * @author mathiasjepsen
 */
public class PlaceFacade implements IPlaceFacade {

    EntityManagerFactory emf;

    public PlaceFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public JSONPlace getPlace(Integer id) {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT p from PLACE p where p.id = :Id");
            q.setParameter("Id", id);
            Place place = (Place) q.getSingleResult();
            return new JSONPlace(place);
        } finally {
            em.close();
        }
    }
    
    @Override
    public List<JSONPlace> getAllPlaces() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT p from PLACE p");
            List<Place> places = q.getResultList();
            List<JSONPlace> jsonPlaces = new ArrayList();
            
            for (Place place : places) {
                jsonPlaces.add(new JSONPlace(place));
            }
            
            return jsonPlaces;
        } finally {
            em.close();
        }
    }

    @Override
    public JSONPlace createPlace(Place place) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(place.getAddress());
            em.persist(place);
            em.getTransaction().commit();
            return new JSONPlace(place);
        } finally {
            em.close();
        }
    }

    @Override
    public JSONPlace addRate(Place editedPlace) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Place oldPlace = em.find(Place.class, editedPlace.getId());
            oldPlace.setRatings(editedPlace.getRatings());
            em.getTransaction().commit();
            System.out.println("old place" + oldPlace);
            return new JSONPlace(oldPlace);
        } finally {
            em.close();
        }
    }

}
