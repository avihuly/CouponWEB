package com.coupon.exceptions.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.couponproject.exception.OutOfStockException;

@Provider
public class OutOfDateExceptionResponse implements ExceptionMapper<OutOfStockException> {

	@Override
	public Response toResponse(OutOfStockException e) {
		ErrorMessage message = new ErrorMessage(e.getMessage(), ErrorCode.OUT_OF_STOCK);
		return Response.status(Status.BAD_REQUEST).entity(message).build();
	}

}
