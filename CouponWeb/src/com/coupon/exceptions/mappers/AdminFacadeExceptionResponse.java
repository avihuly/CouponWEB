package com.coupon.exceptions.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.couponproject.exception.AdminFacadeException;

@Provider
public class AdminFacadeExceptionResponse implements ExceptionMapper<AdminFacadeException> {

	@Override
	public Response toResponse(AdminFacadeException e) {
		ErrorMessage message = new ErrorMessage(e.getMessage(), ErrorCode.ADMIN_UNEXPECTED);
		return Response.status(Status.INTERNAL_SERVER_ERROR).entity(message).build();
	}
}
