/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package security.factories;

import facades.AdminFacade;
import javax.persistence.Persistence;
import security.interfaces.IAdminFacade;

/**
 *
 * @author mathiasjepsen
 */
public class AdminFacadeFactory {

    private static final IAdminFacade INSTANCE = new AdminFacade(Persistence.createEntityManagerFactory("pu_development"));

    public static IAdminFacade getInstance() {
        return INSTANCE;
    }

}
