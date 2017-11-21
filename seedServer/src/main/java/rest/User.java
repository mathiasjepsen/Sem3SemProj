package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONUser;
import security.PasswordStorage;
import security.factories.UserFacadeFactory;
import security.interfaces.IUserFacade;

@Path("user")
public class User {

    IUserFacade uf = UserFacadeFactory.getInstance();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @RolesAllowed("Admin")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        List<JSONUser> jsonUsers = uf.getUsers();
        return GSON.toJson(jsonUsers);
    }
    //edit user put
    @PUT
    @Path("edit")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String editUser(String content) throws PasswordStorage.CannotPerformOperationException
    {
        JSONUser jsonUser = uf.editUser(GSON.fromJson(content, entity.User.class));
        return GSON.toJson(jsonUser); 
    }
    
        
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String register(String content) throws PasswordStorage.CannotPerformOperationException {
        JSONUser jsonUser = uf.registerUser(GSON.fromJson(content, entity.User.class));
        return GSON.toJson(jsonUser);
    }
}
