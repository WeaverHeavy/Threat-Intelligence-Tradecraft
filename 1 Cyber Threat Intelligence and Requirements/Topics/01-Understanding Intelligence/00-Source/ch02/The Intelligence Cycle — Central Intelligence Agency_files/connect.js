$(function () {

	//check if page needs this call
	if ($("aside .tabs").length > 0 || $('.template-homepage_html').length > 0) {

		// ========================= YOUTUBE ========================= //
		if ($('.template-homepage_html').length > 0) {
			// load youtube iframe
			var videoWidth = "209", videoHeight = "117";
			var fkrct = 7;
		} else {
			// load youtube iframe
			var videoWidth = "242", videoHeight = "128";
			var fkrct = 5;
		}
		var videoSrc = "https://www.youtube.com/embed/3UpC2IMg65k?list=PLb9QRVXYyLdo7IUvybsKrJh4V-1b8NaX7&wmode=opaque";
		var videoFrameborder = "0";
		var iframeHTML = '<iframe width="' + videoWidth + '" height="' + videoHeight + '" src="' + videoSrc + '" frameborder="' + videoFrameborder + '" allowfullscreen></iframe>';
		var checkIE = $.browser.msie;
		//use IE object element instead of iframe for IE9
		if ((checkIE) && ($(".lt-ie9").length == 0)) {
			iframeHTML = '<object width="' + videoWidth + '" height="' + videoHeight + '" data="' + videoSrc + '" frameborder="' + videoFrameborder + '" type="application/x-shockwave-flash" allowfullscreen><param name="movie" wmode="opaque" value="' + videoSrc + '" /></object>';
		}
		// replace default static image
		$(".connect-video").html(iframeHTML);

		// ========================= FLICKR ========================= //
		// load flickr badge
		$.getJSON("https://secure.flickr.com/services/feeds/photoset.gne?set=72157632812220423&nsid=59094030@N08&lang=en-us&format=json&jsoncallback=?", function (data) {
			var target = "#flickr_badge_wrapper";	// container div
			var flickrImages = "";
			for (i = 0; i <= fkrct; i++) {		// loop through the 8 most recent, [0-7]
				var pic = data.items[i];
				//$(target).append("<a title='" + pic.title + "' href='" + pic.link + "'><img src='" + pic.media.m + "' /></a>");
				flickrImages += "<a title='" + pic.title + "' href='" + pic.link + "'><img src='" + pic.media.m + "' /></a>";
			}
			$(target).html(flickrImages);
		});

		// ========================= TWITTER ========================= //
		// remove non-js styling
		//$(".twitter-timeline").removeClass("hidden");

		// ========================= FACEBOOK ======================== //
		// remove non-js styling
		$(".social-box iframe").removeClass("hidden");
		
		// =================== INIT ACCESSIBLE TABS ================== //
		//functions.
		//check if we have jquery.tabs.js, if not include it
		var isFunc = jQuery.isFunction(jQuery.fn.accessibleTabs)
		if (!isFunc) {
			$.getScript('/++theme++contextual.agencytheme/js/jquery.tabs.js', function () {
				$("aside .tabs").accessibleTabs({
					tabhead: 'h4',
					fx: "fadeIn"
				});
			});
		} else {

			$("aside .tabs").accessibleTabs({
				tabhead: 'h4',
				fx: "fadeIn"
			});
		}

		// ====================== RSS & CONTACT ====================== //
		// add RSS and Contact as "inert" <li> links to the accessible tab <ul>
		// change this to callback from accessibletabs?????
		setTimeout(connectReplacementEvents, 750);

	}
});

function connectReplacementEvents() {
	setTimeout(replaceRssLink, 500);
	setTimeout(replaceContactLink, 500);
}
function replaceRssLink() {
	// remove
	$(".default-connect").remove();
	// add
	var imgLink = "/portlet_content/images/socialicon22rss.gif/image.gif";
		var chkImg = $.ajax({	
			url:imgLink, type:'HEAD', 
			error:function (xhr, ajaxOptions, thrownError){
				if(xhr.status != 200) {
					imgLink = "/portlet_content/images/socialicon22rss.gif";
					$(".social-box .tabs ul.tabs-list").append('<li><h5><a href="/news-information/your-news"><img alt="RSS - Your News" src="'+imgLink+'" /></a></h5></li>');
				}
			},
			success: function(){
				$(".social-box .tabs ul.tabs-list").append('<li><h5><a href="/news-information/your-news"><img alt="RSS - Your News" src="'+imgLink+'" /></a></h5></li>');
			}
		});
	
}
function replaceContactLink() {
	// remove
	$(".default-connect").remove();
	// add
	var imgLink = "/portlet_content/images/socialicon22contact.gif/image.gif";
		var chkImg = $.ajax({	
			url:imgLink, type:'HEAD', 
			error:function (xhr, ajaxOptions, thrownError){
				if(xhr.status != 200) {
					imgLink = "/portlet_content/images/socialicon22contact.gif";
					$(".social-box .tabs ul.tabs-list").append('<li><h5><a class="landingTrigger" href="/contact-cia"><img alt="Contact CIA" src="'+imgLink+'" /></a></h5></li>');
				}
			},
			success: function(){
				$(".social-box .tabs ul.tabs-list").append('<li><h5><a class="landingTrigger" href="/contact-cia"><img alt="Contact CIA" src="'+imgLink+'" /></a></h5></li>');
			}
		});
	//$(".social-box .tabs ul.tabs-list").append('<li><h5><a href="/contact-cia"><img alt="Contact CIA" src="/portlet_content/images/socialicon22contact.gif/image.gif" /></a></h5></li>');
}


