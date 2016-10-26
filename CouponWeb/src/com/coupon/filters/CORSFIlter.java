package com.coupon.filters;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

import com.couponproject.facade.AdminFacade;

@Provider
public class CORSFIlter implements ContainerResponseFilter, ContainerRequestFilter {
	
	private static final String Facade_Attr = "FACADE";
	
	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {	
		responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		responseContext.getHeaders().add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		responseContext.getHeaders().add("Access-Control-Max-Age", "3600");
		responseContext.getHeaders().add("Access-Control-Allow-Headers", "x-requested-with");
	}

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		requestContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		requestContext.getHeaders().add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		requestContext.getHeaders().add("Access-Control-Max-Age", "3600");
		requestContext.getHeaders().add("Access-Control-Allow-Headers", "x-requested-with");
	}
}
