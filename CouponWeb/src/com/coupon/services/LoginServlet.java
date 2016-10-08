package com.coupon.services;

import java.beans.PropertyVetoException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.couponproject.constants.ClientType;
import com.couponproject.facade.AdminFacade;
import com.couponproject.facade.CompanyFacade;
import com.couponproject.facade.CustomerFacade;
import com.couponproject.system.CouponSystem;

@Path("/login")
public class LoginServlet {
	
	private static final String Facade_Attr = "FACADE";

	@Context
	private HttpServletRequest request;

	@GET
	@Path("{name}/{password}/{clientType}")	
	@Produces(MediaType.TEXT_PLAIN)
	public boolean login(
			@PathParam("name") String name, 
			@PathParam("password") String password,
			@PathParam("clientType") String clientTypeTxt) throws PropertyVetoException {
		
	
		// Converting client type to enum
		ClientType clientType = ClientType.valueOf(clientTypeTxt);
		// Checking for
		switch (clientType) {
			case Admin:			return loginAsAdmin(name, password);
			case Company:		return loginAsCompany(name, password);
			case Customer:		return loginAsCustomer(name, password);
		}
		return false;
	}

	// ADMIN
	private boolean loginAsAdmin(String name, String password) {
		AdminFacade adminFacade = CouponSystem.getInstance().loginAsAdmin(name, password);
		if (adminFacade == null) {
			return false;
		} else {
			request.getSession().setAttribute(Facade_Attr, adminFacade);
			return true;
		}
	}

	// COMPANY
	private boolean loginAsCompany(String name, String password) {
		CompanyFacade compFacade = CouponSystem.getInstance().loginAsCompany(name, password);
		if (compFacade == null) {
			return false;
		} else {
			request.getSession().setAttribute(Facade_Attr, compFacade);
			return true;
		}
	}

	// CUSTOMER
	private boolean loginAsCustomer(String name, String password) {
		CustomerFacade custFacade = CouponSystem.getInstance().loginAsCustomer(name, password);
		if (custFacade == null) {
			return false;
		} else {
			request.getSession().setAttribute(Facade_Attr, custFacade);
			return true;
		}
	}
}
