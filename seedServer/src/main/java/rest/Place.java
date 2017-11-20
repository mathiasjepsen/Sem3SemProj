package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONPlace;
import security.interfaces.IPlaceFacade;
import security.PasswordStorage;
import security.factories.PlaceFacadeFactory;

@Path("place")
public class Place {

    IPlaceFacade pf = PlaceFacadeFactory.getInstance();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlaces() {
        List<JSONPlace> jsonPlaces = pf.getAllPlaces();
        return GSON.toJson(jsonPlaces);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createPlace(String content) {
        JSONPlace jsonPlace = pf.createPlace(GSON.fromJson(content, entity.Place.class));
        return GSON.toJson(jsonPlace);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlace(@PathParam("id") Integer id) {
        JSONPlace jsonPlace = pf.getPlace(id);
        return GSON.toJson(jsonPlace);
    }
    
    @PUT
    @Path("rate")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addRate(String content) throws PasswordStorage.CannotPerformOperationException {
        System.out.println("Place in addRate in rest.Place: " + content);
        JSONPlace place = pf.addRate(GSON.fromJson(content, entity.Place.class));
        return GSON.toJson(place);
    }

}
