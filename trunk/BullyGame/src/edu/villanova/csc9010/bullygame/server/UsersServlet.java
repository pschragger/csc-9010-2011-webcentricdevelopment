package edu.villanova.csc9010.bullygame.server;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UsersServlet extends HttpServlet {
	private static final long serialVersionUID = 2L;

	public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
		BullyUser user = BullyUser.loggedInUser();
		if(user == null) {
			response.sendRedirect(BullyUser.loginUrl());
		} else {
			response.sendRedirect("/");
		}
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String[] bits = request.getRequestURI().split("/");
		String action = bits[bits.length-1];
		
		if(action.equals("login")) login(request, response);
    }
}
