package com.coupon.exceptions.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.couponproject.exception.CompanyAlreadyExistsException;

@Provider
public class CompanyAlreadyExistsExceptionResponse implements ExceptionMapper<CompanyAlreadyExistsException> {

	@Override
	public Response toResponse(CompanyAlreadyExistsException e) {
		ErrorMessage message = new ErrorMessage(e.getMessage(), ErrorCode.COMPANY_NAME_EXISTS);
		return Response.status(Status.BAD_REQUEST).entity(message).build();
	}

}
