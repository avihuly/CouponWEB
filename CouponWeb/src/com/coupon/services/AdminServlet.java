package com.coupon.services;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import com.couponproject.beans.Company;
import com.couponproject.exception.AdminFacadeException;
import com.couponproject.facade.AdminFacade;

@Path("/admin")
public class AdminServlet {
	
	private static final String Facade_Attr = "FACADE";

	@Context
	private HttpServletRequest request;
	
	//Create company
		@POST
		@Path("/createCompany")
		@Consumes({MediaType.APPLICATION_JSON})
		@Produces(MediaType.APPLICATION_JSON)
		public Company createCompany(Company company){
			
			// getting the adminFacade saved in the session
			AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(Facade_Attr);
			
			// create company - run time exception are being needled by mappers 
			adminFacade.createCompany(company);
			
			// return company after DB insert and ID update
			return company;
		}
		
	
	
	// ****************
	// ******* TEST ***
	// ****************
	@GET
	@Path("/test")
	@Produces(MediaType.APPLICATION_JSON)
	public Company test(){
		
		//getting the adminFacade saved in the session
		AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(Facade_Attr);
		
		try {
			return adminFacade.getCompany(4000);
		} catch (AdminFacadeException | NullPointerException e) {
			return new Company(99999, "failed", "failed", "failed");
		}
	}
	
}
