package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.users.*;

public class GameUser {
	public static boolean isLoggedIn() {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		return user != null;
	}
	
	public static User loggedInUser() {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		return user;
	}
	
	public static String loggedInUserName() {
		User user = loggedInUser();
		if(user == null) return null;
		return user.getNickname();
	}
	
	public static String loginUrl() {
		return UserServiceFactory.getUserService().createLoginURL("/users/login");
	}
	
	public static String logoutUrl() {
		return UserServiceFactory.getUserService().createLogoutURL("/users/logout");
	}
	
	public static void onLogin() {
		User user = loggedInUser();
		if(user == null) return;
		
		LogAction.log(user, "login");
	}
	
	public static void onLogout() {
		User user = loggedInUser();
		if(user == null) return;
		
		LogAction.log(user, "logout");
	}
}
