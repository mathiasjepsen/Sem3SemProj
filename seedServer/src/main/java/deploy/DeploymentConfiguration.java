package deploy;

import entity.Address;
import entity.Place;
import entity.Role;
import entity.User;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Properties;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import security.PasswordStorage;
import security.Secret;

@WebListener
public class DeploymentConfiguration implements ServletContextListener {

  public static String PU_NAME = "PU-Local";

  @Override
  @SuppressWarnings("empty-statement")
  public void contextInitialized(ServletContextEvent sce) {
    System.out.println("######################################################################################");
    System.out.println("############################ In ContextIntialized ####################################");
    System.out.println("######################################################################################");

    //Handling init-params from the properties file (secrets that should not be pushed to GIT)
    InputStream input = null;
    Properties prop = new Properties();
    try {
      input = getClass().getClassLoader().getResourceAsStream("/config.properties");;
      if (input == null) {
        System.out.println("Could not load init-properties");
        return;
      }
      prop.load(input);
      Secret.SHARED_SECRET = prop.getProperty("tokenSecret").getBytes();
      input.close();

    } catch (IOException ex) {
      Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
    }
    ServletContext context = sce.getServletContext();
 
//        EntityManager em = Persistence.createEntityManagerFactory("pu_development").createEntityManager();
//        try {
//            em.getTransaction().begin();
//            Address address = new Address("London", "2000", "First Avenue", "124312");
//            Address address2 = new Address("Paris", "3000", "Second Boulevard", "42142");
//            Address address3 = new Address("Copenhagen", "4000", "Third Quadrant", "12412");
//            User user1 = new User("mathias", "1234", "Mathias", "Jepsen", "123325234", "mathias@wpsnet.com");
//            User user2 = new User("thomas", "1234", "Thomas", "Thimothee", "23442635", "thomas@thom.com");
//            User user3 = new User("dimitri", "1234", "Dim", "Dimitri", "456789", "dim@dim.com");
//            User user4 = new User("mikael", "1234", "Mik", "Mak", "42421", "mik@mik.com");
//            User user5 = new User("martin", "1234", "Martin", "Lannister", "435323", "martin@mail.com");
//            User user6 = new User("lovro", "1234", "Lovro", "Louvrou", "424", "louv@dim.com");
//            User admin = new User("admin", "1234");
//            Role role = new Role("User");
//            Role adminRole = new Role("Admin");
//            user1.addRole(role);
//            user2.addRole(role);
//            user3.addRole(role);
//            user4.addRole(role);
//            user5.addRole(role);
//            user6.addRole(role);
//            admin.addRole(adminRole);
//            HashMap<String, Double> rating = new HashMap();
//            rating.put(user1.getUserName(), 2.0);
//            rating.put(user2.getUserName(), 3.0);
//            rating.put(user3.getUserName(), 4.0);
//            String image = "pocketFitIcon.png";
//            Place place = new Place(address, "A stroll down memory lane", rating, image);
//            HashMap<String, Double> rating2 = new HashMap();
//            rating2.put(user1.getUserName(), 5.0);
//            rating2.put(user2.getUserName(), 4.0);
//            rating2.put(user3.getUserName(), 4.0);
//            Place place2 = new Place(address2, "A breath of fresh air", rating2, image);
//            HashMap<String, Double> rating3 = new HashMap();
//            rating3.put(user1.getUserName(), 1.0);
//            rating3.put(user2.getUserName(), 2.0);
//            rating3.put(user3.getUserName(), 3.0);
//            Place place3 = new Place(address3, "Once in a lifetime experience", rating3, image);
//            em.persist(address);
//            em.persist(address2);
//            em.persist(address3);
//            em.persist(place);
//            em.persist(place2);
//            em.persist(place3);
//            em.persist(user1);
//            em.persist(user2);
//            em.persist(user3);
//            em.persist(user4);
//            em.persist(user5);
//            em.persist(user6);
//            em.persist(admin);
//            em.persist(role);
//            em.persist(adminRole);
//            em.getTransaction().commit();
//        } catch (PasswordStorage.CannotPerformOperationException ex) {
//            Logger.getLogger(DeploymentConfiguration.class.getName()).log(Level.SEVERE, null, ex);
//        } finally {
//            em.close();
//        }
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {

  }
}
