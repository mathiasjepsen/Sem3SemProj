/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONHome;
import security.factories.HomeFacadeFactory;
import security.interfaces.IHomeFacade;

/**
 * REST Web Service
 *
 * @author thomasthimothee
 */
@Path("native")
public class Native {
    IHomeFacade hf = HomeFacadeFactory.getInstance();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of Native
     */
    public Native() {
    }

    /**
     * Retrieves representation of an instance of rest.Native
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of Native
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createHome(String content) {
        System.out.println("in createHome");
        JSONHome jsonPlace = hf.createHome(GSON.fromJson(content, entity.Home.class));
        return GSON.toJson(jsonPlace);
    }
}
