<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<h3>Online</h3>
<c:forEach var="friend" items="${friends}">
  <c:if test="${friend.isActive}">
    <div class='friend online'>
  	  ${friend.name}
  	  <a href='/friends/remove?id=${friend.id}'>x</a>
    </div>
  </c:if>
</c:forEach>
  
<h3>Away</h3>
<c:forEach var="friend" items="${friends}">
  <c:if test="${!friend.isActive}">
    <div class='friend away'>
  	  ${friend.name}
  	  <a href='/friends/remove?id=${friend.id}'>x</a>
    </div>
  </c:if>
</c:forEach>
