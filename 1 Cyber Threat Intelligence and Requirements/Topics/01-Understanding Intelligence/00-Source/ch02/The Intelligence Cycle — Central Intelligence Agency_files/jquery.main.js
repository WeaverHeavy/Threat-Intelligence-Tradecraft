$.fn.exists = function(){return this.length>0;}

// page init
jQuery(function(){
	
	initWorkBox();
	$('input, textarea').placeholder();
	initTabNav();
	initHomeSlider();
	
	$('dl.captioned img').each(function(index) {
		$(this).closest('dl.captioned').children('dd.image-caption').css('max-width',$(this).css('width'));
	});


	/* External Links */
	// All links that are external to cia.gov and are not .gov or .mil will launch the external link disclaimer
	$('a').filter(function(){return this.hostname && this.hostname !== location.hostname && this.href.indexOf('.gov')==-1 && this.href.indexOf('.mil')==-1}).attr('rel','external');
	$('a.external-link').filter(function(){return this.href.indexOf('.gov')==-1 && this.href.indexOf('.mil')==-1}).attr('rel','external');
	$('a[rel="external"]')
		.click(function(e){e.preventDefault();externalLinkConfirm($(this).attr('href'))})
		.each(function(){$(this).attr('title',$(this).prop('title')+' (external link)')}		
	);
	
	/* Plug-in List */
	$('#plugins ul li,#plugins').hide();
	$('#plugins li').each(function(){		
		if($('[href*=".' + $(this).data('plugin') + '"]').exists()){
			$('#plugins').show();
			$(this).show();
		}
	});
	if($('#flash-container').exists()){ // this id will need to be adjusted depending on how flash is implemented
		$('#plugins').show();
		$('[data-plugin="swf"]').show();
		var swflocation = '/' + $('#flash-container').data('swflocation');
		var swfwidth = $('#flash-container').data('size').width;
		var swfheight = $('#flash-container').data('size').height;
		var flashvars = $('#flash-container').data('flashvars');
		var params = $('#flash-container').data('params');
		var attributes = $('#flash-container').data('attributes');
		swfobject.embedSWF(swflocation, "flash-container", swfwidth, swfheight, "9.0.0", "flash/expressInstall.swf", flashvars, params, attributes, swfobjectcallback);		
	}
	$('#plugins ul').prepend('[').append(']');
	
	if(checkHC())$('html').addClass('hcmode'); // Accessibility - high contrast mode
	
	setReadDirectionStyle();
	//add ins for home page
	if($('.template-homepage_html').exists() && $('.portletEditTab').exists()) {
		$('.portletEditTab').each(function(){
			var section = $(this).next('section');
			$(this).appendTo(section);
		});
	}
});

	function initHomeSlider(){
		($('.gallery-panel').exists()) ? $('.gallery-panel').flexslider({
			reverse: false,
			startAt: 0,
			controlNav: true,
			directionNav: false,
			pausePlay: true,
			controlsContainer: ".navigation",
			start: function(){
				$('.flex-control-nav li a').each(function(){
					var existingHtml = $(this).html();
					$(this).html('slide '+ existingHtml);
					$(this).attr('href', '#');
					$(this).click(function(){
					//get slide index
					//wait for transition
					setTimeout(function(){ var indSlide = existingHtml-1;
						$(".slides li:eq("+indSlide+") h2").attr('tabindex', -1).focus(); }, 700);
						
					});
				});
				activeSlide();
				$('.flex-pauseplay a').attr('href', '#');
			}, 
			after: function(){activeSlide();},
		  }) :  null;
	}
function initWorkBox(){//http://jsfiddle.net/uRd6N/
	$('.wb-content').hide();
	var list = $('.work-box .wb-content').toArray();
	var elemlength = list.length;
	var randomnum = Math.floor(Math.random()*elemlength);
	var randomitem = list[randomnum];
	$(randomitem).show();
}

var flashloaded  = false;
function swfobjectcallback(){flashloaded="true";}

function externalLinkConfirm(url){
	var extmsg="You are leaving the official CIA.gov public website. Please note that this third-party website is not controlled by the CIA or subject to its Privacy Policy.\n\nClick [OK] to continue to " + url + ".";
	if(confirm(extmsg))location.href=url;
}

// "tab" key handling
function initTabNav() {
	jQuery('#nav').find('li').addClass('more');
	jQuery('#nav .drop a').parent().addClass('more');
	jQuery('#nav').tabNav({
		items: '.more'
	});
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function UrlExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status != 404;
}

/*
 * Accessible TAB navigation
 */
;(function($){
	$.fn.tabNav = function(opt) {
		var options = $.extend({
			hoverClass: 'hover',
			items: 'li',
			opener: '>a'
		},opt);

		return this.each(function() {
			var nav = $(this), items = nav.find(options.items);
		
			items.each(function(index, navItem) {
				var item = $(this), navActive, touchNavActive;
				var link = item.find(options.opener);
				var timer;
				
				link.bind('focus', function() {
					navActive = nav.hasClass('js-nav-active');
					touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
					if(!navActive || touchNavActive) {
						initSimpleNav();
					}
					item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
				}).bind('blur', function() {
					item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
				});

				var initSimpleNav = function() {
					if(!initSimpleNav.done) {
						initSimpleNav.done = true;
						item.hover(function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.addClass(options.hoverClass);
							}, 10)
						}, function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.removeClass(options.hoverClass);
							}, 10)
						});
					}
				};
			});
		});
	};
}(jQuery));

/*! http://mths.be/placeholder v2.0.6 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;
	if(navigator.userAgent.indexOf('Opera/') != -1) {
		isInputSupported = isTextareaSupported = false;
	}
	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input),
		    hadFocus;
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			hadFocus = input == document.activeElement;
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
			}
			hadFocus && input.select();
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));
						
						
						
// Accessibility - images disabled
var logo = new Image();logo.src = '/++theme++contextual.agencytheme/images/logo.png';logo.onerror = function(){$('html').addClass('no-images')}
//var logo = new Image();logo.src = 'images/logo.png';logo.onerror = function(){$('html').addClass('no-images')}

// Accessibility
//function updateForScreenReaders(){var d = new Date();$('#ATupdateAlert').attr('value',d.getTime())}

// Accessibility - Check for high contrast mode -- http://www.html5accessibility.com/tests/imagecheck.html
function checkHC() {
	var e,c;
	e=document.createElement("div");
	e.style.color="rgb(31,41,59)";
	document.body.appendChild(e);
	c=document.defaultView?document.defaultView.getComputedStyle(e,null).color:e.currentStyle.color;
	document.body.removeChild(e);
	c=c.replace(/ /g,"");
	if(c!="rgb(31,41,59)"){return true}else{return false};
}


//Languages Sites
var currWinLoc = window.location.href.toLowerCase();
function setReadDirectionStyle() {
    if(isRTLLang())$('html').addClass('rtl');
	setLangNavStyle();
}
function isRTLLang(){
    var isRTL = false;
	var arrRTLLang=new Array("ar","ur","ps","fa","af","ku"); // Arabic, Urdu, Pashtu, Persian, Dari, Kurdish 
	for (var i=0; i<arrRTLLang.length; i++) {
		if((currWinLoc.indexOf("/" + arrRTLLang[i] + "/")!=-1)||(currWinLoc.indexOf("/" + arrRTLLang[i])==(currWinLoc.length-3)))isRTL = true;
	}
	return isRTL;
}
function setLangNavStyle(){	
	$('.lang-list li[lang="en"]').hide();
	$('.lang-list a').each(function(){		
		if($(this).attr('title')!= 'English'){				
			if(currWinLoc.indexOf($(this).attr('href').replace('index.html',''))!=-1){
				$(this).addClass('activeLink');
				$('.lang-list li[lang="en"]').show();			
			}
		}	
	});
	setLangBreadCrumbStyle();
}

function setLangBreadCrumbStyle(){
	if($('body.section-ar, body.section-zh, body.section-fr, body.section-ru, body.section-es, body.section-ku, body.section-ko, body.section-tr, body.section-af, body.section-vn, body.section-mobile').exists())$('.breadcrumbs li').first().remove();
}

function activeSlide(){
	var activeSpan = $('<span></span>');
		activeSpan.addClass('hide-text');
		activeSpan.html(' : Current Slide');
	$('.flex-control-nav li a span').remove();
	$('.flex-control-nav li a.flex-active').append(activeSpan);
}
	





						
						
						