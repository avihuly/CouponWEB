package com.coupon.exceptions.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.couponproject.exception.CustomerFacadeException;

@Provider
public class CustomerFacadeExceptionResponse implements ExceptionMapper<CustomerFacadeException> {

	@Override
	public Response toResponse(CustomerFacadeException e) {
		e.printStackTrace();
		ErrorMessage message = new ErrorMessage(e.getMessage(), ErrorCode.CUSTOMER_UNEXPECTED);
		return Response.status(Status.INTERNAL_SERVER_ERROR).entity(message).build();
	}
}
