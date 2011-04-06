package edu.villanova.csc9010.bullygame.server;

import javax.servlet.*;
import javax.servlet.http.*;

import java.io.*;

public class FlashFilter implements Filter {
  
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
	HttpServletRequest httpRequest = (HttpServletRequest) request;
    if(httpRequest.getSession().getAttribute("flash") != null) {
      httpRequest.setAttribute("flash", httpRequest.getSession().getAttribute("flash"));
      httpRequest.getSession().removeAttribute("flash");
    }
    chain.doFilter(request, response);  
  }

  public void init(FilterConfig config) {}
  public void destroy() {}
}