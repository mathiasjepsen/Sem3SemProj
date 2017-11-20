package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONUser;
import security.PasswordStorage;
import security.factories.AdminFacadeFactory;
import security.interfaces.IAdminFacade;

@Path("admin")
@RolesAllowed("Admin")
public class Admin {

    IAdminFacade af = AdminFacadeFactory.getInstance();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @DELETE
    @Path("{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteUser(@PathParam("username") String username) {
        JSONUser jsonUser = af.deleteUser(username);
        return GSON.toJson(jsonUser);
    }

    @PUT
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String editUser(String content) throws PasswordStorage.CannotPerformOperationException {
        JSONUser user = af.editUser(GSON.fromJson(content, entity.User.class));
        return GSON.toJson(user);
    }

    @POST
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String addUser(String content) throws PasswordStorage.CannotPerformOperationException {
        JSONUser user = af.addUser(GSON.fromJson(content, entity.User.class));
        return GSON.toJson(user);
    }
    
}
