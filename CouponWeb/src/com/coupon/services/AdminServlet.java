package com.coupon.services;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import com.couponproject.beans.Company;
import com.couponproject.exception.AdminFacadeException;
import com.couponproject.exception.CompanyAlreadyExistsException;
import com.couponproject.exception.CompanyCouponDoesNotExistsException;
import com.couponproject.exception.CompanyDoesNotExistException;
import com.couponproject.exception.CouponDoesNotExistException;
import com.couponproject.exception.EmailAlreadyExistsException;
import com.couponproject.exception.IllegalPasswordException;
import com.couponproject.facade.AdminFacade;

@Path("/admin")
public class AdminServlet {
	
	private static final String Facade_Attr = "FACADE";

	@Context
	private HttpServletRequest request;
	
	//Create company
		@POST
		@Path("/createCompany")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Company createCompany(Company company){	
			// getting the adminFacade saved in the session
			AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(Facade_Attr);
			// create company - run time exception are being needled by mappers 
			adminFacade.createCompany(company);
			// return company after DB insert and ID update
			return company;
		}
		
		//removeCompany
		@DELETE
		@Path("/removeCompany")
		@Consumes(MediaType.TEXT_PLAIN)
		@Produces(MediaType.APPLICATION_JSON)
		public Company removeCompany(long id){
			//getting the adminFacade saved in the session
			AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(Facade_Attr);
			// Getting company instance by id
			Company company = adminFacade.getCompany(id);
			// Remove company from DB
			adminFacade.removeCompany(company);
			// After DB deletion return the company instance  
			return company;
		}

		//updateCompany
		@POST
		@Path("/updateCompany")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Company updateCompany(Company company) {
			//getting the adminFacade saved in the session
			AdminFacade adminFacade = (AdminFacade) request.getSession().getAttribute(Facade_Attr);
			// Up dating company 
			System.out.println(company);
			adminFacade.updateCompany(company);
			// return updated company
			return adminFacade.getCompany(company.getId());
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
