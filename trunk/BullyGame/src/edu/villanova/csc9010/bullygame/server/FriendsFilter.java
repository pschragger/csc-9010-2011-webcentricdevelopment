package edu.villanova.csc9010.bullygame.server;

import javax.servlet.*;
import java.io.*;

public class FriendsFilter implements Filter {

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    BullyUser user = BullyUser.loggedInUser();
    if(user != null) {
      user.markActive();
    }
    chain.doFilter(request, response);
  }

  public void init(FilterConfig config) {}
  public void destroy() {}
}