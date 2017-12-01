package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Address;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONHome;
import security.PasswordStorage;
import security.factories.HomeFacadeFactory;
import security.interfaces.IHomeFacade;

@Path("home")
public class Home {

    IHomeFacade hf = HomeFacadeFactory.getInstance();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getHomes() {
        List<JSONHome> jsonPlaces = hf.getAllHomes();
        return GSON.toJson(jsonPlaces);
    }

    @POST
    @RolesAllowed("User")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createHome(String content) {
        JSONHome jsonPlace = hf.createHome(GSON.fromJson(content, entity.Home.class));
        return GSON.toJson(jsonPlace);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String getHome(@PathParam("id") Integer id) {
        JSONHome jsonPlace = hf.getHome(id);
        return GSON.toJson(jsonPlace);
    }
    @GET
    @Path("details/{address}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String getHomeAddress(@PathParam("address") Integer id) {
        JSONHome jsonPlace = hf.getHomeAddress(id);
        return GSON.toJson(jsonPlace);
    }
    
    @PUT
    @Path("rate")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addRate(String content) throws PasswordStorage.CannotPerformOperationException {
        JSONHome place = hf.addRate(GSON.fromJson(content, entity.Home.class));
        return GSON.toJson(place);
    }

}
