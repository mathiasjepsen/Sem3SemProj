package facades;

import entity.Role;
import entity.User;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import rest.JSON.JSONUser;
import security.interfaces.IAdminFacade;
import security.interfaces.IUser;
import security.PasswordStorage;

/**
 *
 * @author mathiasjepsen
 */
public class AdminFacade implements IAdminFacade {

    EntityManagerFactory emf;

    public AdminFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public JSONUser deleteUser(String username) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            IUser user = em.find(User.class, username);
            em.remove(user);
            em.getTransaction().commit();
            return new JSONUser(user);
        } finally {
            em.close();
        }
    }

    @Override
    public JSONUser editUser(User editedUser) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            User oldUser = em.find(User.class, editedUser.getUserName());
            oldUser.createPasswordHash(editedUser.getPasswordHash());
            oldUser.setfName(editedUser.getfName());
            oldUser.setlName(editedUser.getlName());
            oldUser.setEmail(editedUser.getEmail());
            oldUser.setPhone(editedUser.getPhone());
            em.getTransaction().commit();
            return new JSONUser(oldUser);
        } finally {
            em.close();
        }
    }
    
    @Override
    public JSONUser addUser(User user) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            user.createPasswordHash(user.getPasswordHash());
            Role existingRole = em.find(Role.class, "User");
            user.addRole(existingRole);
            existingRole.addUser(user);
            em.persist(user);
            em.getTransaction().commit();
            return new JSONUser(user);
        } finally {
            em.close();
        }
    }
    
    @Override
    public JSONUser registerAdmin(User admin) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Role existingRole = em.find(Role.class, "Admin");
            admin.createPasswordHash(admin.getPasswordHash());
            admin.addRole(existingRole);
            em.persist(admin);
            em.getTransaction().commit();
            return new JSONUser(admin);
        } finally {
            em.close();
        }
    }
}
