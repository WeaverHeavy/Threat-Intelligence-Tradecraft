//$.fn.exists = function(){return this.length>0;}
var mq = Modernizr.mq('only all');
Response.create({prop:"width",breakpoints:[0,992]});
Response.crossover(function() {
	if(Response.band(992)){
		initFullScreen();
	}else{
		if(mq)initSmallScreen();
	}
},'width');
	

//document.write('<script type="text/javascript" src="/++theme++contextual.agencytheme/js/foresee/foresee-trigger.js"></' + 'script>');
		
$(function() { //global on DOM ready
	$('.sidebar-nav .mark .active').append('<span class="visuallyhidden"> (current page)</span>');
	if(Response.band(0,977)&&(mq))initSmallScreen();
	redirectOldPubs();
});

function initSmallScreen(){

	if (!$('#mobile-menu').exists()) {
		$('html').addClass('smallscreen').removeClass('fullscreen');
		$('.add-nav a').last()
			.text('Contact Us')
			.parent().before('<li id="utilHome"><a href="/">CIA.gov Home</a></li>');
		$('body').append('<a class="top-return" href="#"><span>Top of Page</span></a>');
		($('body.section-careers').exists()) ? $('.header-holder').append('<div id="mobile-menu" class="clearfix"><a id="languages-link" href="#"><span>English</span></a><a id="jobcart-link" href="/careers/application-process/apply-now.html"><span>Job Cart</span></a><a id="mobile-menu-link" href="#"><span>Menu</span></a><a id="search-menu-link" href="#"><span>Search</span></a></div>') : $('.header-holder').append('<div id="mobile-menu" class="clearfix"><a id="languages-link" href="#"><span>English</span></a><a id="mobile-menu-link" href="#"><span>Menu</span></a><a id="search-menu-link" href="#"><span>Search</span></a></div>');

		$('#mobile-menu').append($('#ciaSearchForm'));
		$('#search-menu-link').click(function (e) {
			e.preventDefault();
			$('#sidebar').hide();
			$('#ciaSearchForm').slideToggle();
			//$('#q').focus();
			$('#mobile-menu-link').removeClass('active');
		});
		$('#mobile-menu-link').click(function (e) {
			e.preventDefault();
			$("#languages-link.active").click();
			$('#ciaSearchForm').hide();
			$('#sidebar').animate({ height: 'toggle' }, 800, "swing");
			$(this).toggleClass('active');
		});
		//get the top nav and append it to the mobile menu
		var newMenu = $('<ul class="fouc-hide"></ul>');
		$('#nav > ul > li > a').each(function () {
			if ($(this).parent('.active').exists()) {
				$(this).clone().addClass('activeTrail').appendTo($(newMenu));
			} else {
				$(this).clone().appendTo($(newMenu));
			}
		});

		$(newMenu).find('a').each(function () {
			$(this).wrap('<li></li>');
		});
		$('#sidebar > nav > ul').appendTo($(newMenu).find('.activeTrail').parent('li'));
		$('#sidebar nav').append($(newMenu));

		if ($('#sidebar nav').length == 0) {
			var nv = $('<nav></nav>').addClass('sidebar-nav');
			nv.wrap('<div id="sidebar"></div>');
			nv.append($(newMenu));
			$('#main').prepend('<div id="sidebar"></div>');
			$('#sidebar').append(nv);
		}
		//end
		createLangList();
		$("#languages-link").click(function (e) {
			e.preventDefault();
			$('#ciaSearchForm').hide();
			$(this).toggleClass('active');
			$('#mobile-menu-link').removeClass('active');
			$('#sidebar').hide();
			$('#lang-list-copy').animate({ height: 'toggle' }, 800, "swing", { queue: false });
			return false;
		});
		//added home page append
		$('#main').append($('.connect'));
		$('.addthis_16x16_style').addClass('addthis_32x32_style');
		// reset hidden fouc
		//$(".js #sidebar").css( {
		//		"height":"auto",
		//		"overflow":"visible"
		//	});
	}
}
function redirectOldPubs(){
	url = $(location).attr('href');
//dfl	if (url.indexOf("historical-collection-publications") != -1 || url.indexOf("additional-publications") != -1){$( location ).attr("href", '/library/publications/');}
}
function createLangList() {
	// clear any items from small menu language list
	$("#lang-list-copy").remove();
	// create copy ul
	var $clonedLangList = $("<ul id='lang-list-copy' style='display:none'></ul>");
	// get items from current large menu language ul and clone them here
	$(".lang-list > li").clone().appendTo($clonedLangList);
	// attach to small menu language list
	$(".header-holder").append($clonedLangList);
}

function initFullScreen(){
	$('html').addClass('fullscreen').removeClass('smallscreen');
	$('.add-nav a').last().text('Contact');
	$('.search-form div:first-child + div').append($('#ciaSearchForm'));
	if($('#mobile-menu').exists()){
		//get back to normal sidebar
			var nSB = $('#sidebar').find('.activeTrail').parent('li').children('ul');
			$('#sidebar > nav > ul').remove();
			$('#sidebar nav').append(nSB);
		//end
	}
	$('#mobile-menu,.top-return,#utilHome').remove();
	$('#sidebar').show();
	$('.addthis_32x32_style').removeClass('addthis_32x32_style');
	$('.template-homepage_html #sidebar').hide();
	$('.connect').insertAfter($('.gallery-panel'));	
}
