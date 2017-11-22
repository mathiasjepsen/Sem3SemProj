package facades;

import entity.Role;
import security.interfaces.IUserFacade;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.core.Response;
import rest.JSON.JSONUser;
import security.interfaces.IUser;
import security.PasswordStorage;

public class UserFacade implements IUserFacade {

    EntityManagerFactory emf;

    public UserFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public JSONUser getUserByUserName(String username) {
        EntityManager em = getEntityManager();
        try {
            IUser user = em.find(User.class, username);
            return new JSONUser(user);
        } finally {
            em.close();
        }
    }

    @Override
    public JSONUser registerUser(User user) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Role existingRole = em.find(Role.class, "User");
            user.createPasswordHash(user.getPasswordHash());
            user.addRole(existingRole);
            em.persist(user);
            em.getTransaction().commit();
            return new JSONUser(user);
        } finally {
            em.close();
        }
    }

    @Override
    public List<String> authenticateUser(String userName, String password) {
        EntityManager em = getEntityManager();
        try {
            IUser user = em.find(User.class, userName);
            return user != null && PasswordStorage.verifyPassword(password, user.getPasswordHash()) ? user.getRolesAsStrings() : null;
        } catch (PasswordStorage.CannotPerformOperationException | PasswordStorage.InvalidHashException ex) {
            throw new NotAuthorizedException("Invalid username or password", Response.Status.FORBIDDEN);
        } finally {
            em.close();
        }
    }

    @Override
    public List<JSONUser> getUsers() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT u FROM USER u JOIN u.roles r WHERE r.roleName = 'User'");
            List<IUser> users = q.getResultList();
            List<JSONUser> jsonUsers = new ArrayList();
            
            for (IUser user : users) {
                jsonUsers.add(new JSONUser(user));
            }
            
            return jsonUsers;
        } finally {
            em.close();
        }
    }
    
    @Override
    public JSONUser editUser(User user) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Role existingRole = em.find(Role.class, "User");
            user.createPasswordHash(user.getPasswordHash());
            user.addRole(existingRole);
            em.persist(user);
            em.getTransaction().commit();
            return new JSONUser(user);
        } finally {
            em.close();
        }
    }
}
