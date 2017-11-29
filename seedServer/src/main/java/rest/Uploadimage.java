package rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 * REST Web Service
 *
 * @author thomasthimothee
 */
@Path("upload")
public class Uploadimage {

//    public static final String FILE_LOCATION = "/var/lib/tomcat8/webapps/ca3/images/";
    public static final String FILE_LOCATION = "/Users/mathiasjepsen/Desktop/";
    
    public Uploadimage() {
    }

    @Path("file")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@DefaultValue("") @FormDataParam("placeId") String placeId,
            @FormDataParam("file") InputStream file,
            @FormDataParam("file") FormDataContentDisposition fileDisposition) throws IOException {
        String fileName = fileDisposition.getFileName();
        saveFile(file, fileName);
        String status = "{\"status\":\"uploaded\"}";
        return Response.ok(status).build();
    }

    private void saveFile(InputStream is, String fileLocation) throws IOException {
        String location = FILE_LOCATION + fileLocation;
        try (OutputStream os = new FileOutputStream(new File(location))) {
            byte[] buffer = new byte[256];
            int bytes = 0;
            while ((bytes = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytes);
            }
        }
    }
}
