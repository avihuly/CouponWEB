package com.coupon.filters;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;


@WebFilter("/loginFilter")
public class LoginFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		if (httpRequest.getSession(false) == null) {
			ServletOutputStream out = response.getOutputStream();
			response.setContentType(MediaType.APPLICATION_JSON);
			httpResponse.setStatus(400);
			out.println("{"
					+ "\"errorMessag\":\"null session\","
					+ " \"errorCode\": 900"
					+ "}");
			return;
		} else {
			chain.doFilter(request, response);
		}

	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

	@Override
	public void destroy() {
	}
}
