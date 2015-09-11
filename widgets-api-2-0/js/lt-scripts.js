// Работа с печеньками
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}
// Печенька для Партнеров (на определенных страницах)
function createRefCookiez(name, days) {
	if (window.location.search !== "") {
		var getUrlId = window.location.search.match(/pid=([0-9]*)&?/);
		var	userID = getUrlId[1];

		if (getUrlId != "") {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+userID+expires+"; path=/; domain=livetex.ru";
		} else {
			return;
		};
	};	
}

// Стилизатор ярлыка для праздника	
function holidayLabel() {
	if (typeof liveSettings != 'undefined'){
		if (liveSettings.state) {
			$('#content_liveTextLabel_4').css('background-image','url(http://livetex.ru/wp-content/themes/livetex/images/homepage/label-bg.png)');
			$('#label_liveTextLabel_4').css('background-image','url(http://livetex.ru/wp-content/themes/livetex/images/homepage/label.png)');
			$('#label_liveTextLabel_4').attr('title','Международный Женский День');
			$('#liveTex_logoAnim').css('display','none');
			
		} else {
			setTimeout(holidayLabel,200);
		}
	} else {
		setTimeout(holidayLabel,500);
	}	
}	


var crmCookieCreator = {
	setCookie: function(name, value, expires, path, domain, secure) {
		// expires указывается в днях
	    var date = new Date();

	    // Заданый срок или 365 дней.
	    expires = expires || 365;

	    // Get unix milliseconds at current time plus number of days
	    date.setTime(+ date + (expires * 86400000)); //24 * 60 * 60 * 1000

	    document.cookie = name + "=" + escape(value) +
	        ((expires) ? "; expires=" + date.toGMTString() : "") +
	        ((path) ? "; path=" + path : "") +
	        ((domain) ? "; domain=" + domain : "") +
	        ((secure) ? "; secure" : "");
	},
	setReferrer: function() {
		var referrer = document.referrer;
		var regex = /^(https?:\/\/)?livetex\.ru/i;

		if (!regex.test(referrer)) {
			if (referrer === '') {
				this.setCookie('lt-marketing-referrer', 'direct', '360', '/', 'livetex.ru', false);
			} else {
				this.setCookie('lt-marketing-referrer', referrer, '360', '/', 'livetex.ru', false);
			}
		}
	}
}


$(document).ready(function(){
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('.livetex-nav-menu > li').addClass('touchable').click(function(event){
			var self = $(this);
			event.stopPropagation();
			if(!self.hasClass('active')){
				event.preventDefault();
				self.addClass('active').siblings().removeClass('active');
			}
		});
	}
		
	/* setTimeout(function (){YollopukkiMove(120)} , 4000 ); */	

	Shadowbox.init();
	
	// holidayLabel();

	// Toggle Livetex в футере 
	$('.footer-btn-info').click(function(){
       $(this).next('.info-wrapper').slideToggle();
	});

	crmCookieCreator.setReferrer();

});