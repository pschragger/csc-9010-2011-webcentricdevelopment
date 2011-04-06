(function() {
	function updateFriends() {
		new Request.HTML({url: '/friends', update: $('friendsList')}).get();
	}

	window.addEvent('load', updateFriends);
	setInterval(updateFriends, 60*1000);
})();