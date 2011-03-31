<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:forEach var="friend" items="${friends}">
  <div class='friend'>
  	${friend.name}
  	<a href='/friends/remove?id=${friend.id}'>x</a>
  </div>
</c:forEach>