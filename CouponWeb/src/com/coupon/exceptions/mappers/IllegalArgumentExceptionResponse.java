package com.coupon.exceptions.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class IllegalArgumentExceptionResponse implements ExceptionMapper<IllegalArgumentException> {
	@Override
	public Response toResponse(IllegalArgumentException e) {
		e.printStackTrace();
		ErrorMessage message = new ErrorMessage("Value must be a number", ErrorCode.ENUM_DOES_NOT_EXISTS);
		return Response.status(Status.BAD_REQUEST).entity(message).build();
	}
}
