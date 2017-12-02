package facades;

import entity.Address;
import entity.Home;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import rest.JSON.JSONHome;
import security.interfaces.IHomeFacade;

/**
 *
 * @author mathiasjepsen
 */
public class HomeFacade implements IHomeFacade {

    EntityManagerFactory emf;

    public HomeFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public JSONHome getHome(Integer id) {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT h from HOME h where h.id = :Id");
            q.setParameter("Id", id);
            Home home = (Home) q.getSingleResult();
            return new JSONHome(home);
        } finally {
            em.close();
        }
    }
     @Override
    public JSONHome getHomeAddress(Integer id) {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT h from HOME h where h.address_id = :Id");
            q.setParameter("Id", id);
            Home home = (Home) q.getSingleResult();
            return new JSONHome(home);
        } finally {
            em.close();
        }
    }
    
    @Override
    public List<JSONHome> getAllHomes() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT h from HOME h");
            List<Home> homes = q.getResultList();
            List<JSONHome> jsonHomes = new ArrayList();
            
            for (Home home : homes) {
                jsonHomes.add(new JSONHome(home));
            }
            
            return jsonHomes;
        } finally {
            em.close();
        }
    }

    @Override
    public JSONHome createHome(Home home) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(home.getAddress());
            em.persist(home);
            em.getTransaction().commit();
            return new JSONHome(home);
        } finally {
            em.close();
        }
    }

    @Override
    public JSONHome addRate(Home editedHome) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Home oldHome = em.find(Home.class, editedHome.getId());
            oldHome.setRatings(editedHome.getRatings());
            em.getTransaction().commit();
            return new JSONHome(oldHome);
        } finally {
            em.close();
        }
    }
    
    
    @Override
    public JSONHome editHome(Home editedHome) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Home oldHome = em.find(Home.class, editedHome.getId());
            oldHome.setAddress(editedHome.getAddress());
            oldHome.setDescription(editedHome.getDescription());
            oldHome.setImages(editedHome.getImage());
            oldHome.setRatings(editedHome.getRatings());
            oldHome.setHomeBookings(editedHome.getHomeBookings());
            em.getTransaction().commit();
            return new JSONHome(oldHome);
        } finally {
            em.close();
        }
    }

}
