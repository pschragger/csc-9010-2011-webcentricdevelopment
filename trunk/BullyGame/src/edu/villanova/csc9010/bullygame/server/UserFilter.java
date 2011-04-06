package edu.villanova.csc9010.bullygame.server;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class UserFilter implements Filter {
  
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    if(!BullyUser.isLoggedIn()) {
      httpRequest.getSession().setAttribute("flash", "You must be logged in to view this page.");
      ((HttpServletResponse) response).sendRedirect("/");
    } else {
      chain.doFilter(request, response);  
    }
  }

  public void init(FilterConfig config) {}
  public void destroy() {}
}