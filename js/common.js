$(function() {

	//SVG Fallback
	// if(!Modernizr.svg) {
	// 	$("img[src*='svg']").attr("src", function() {
	// 		return $(this).attr("src").replace(".svg", ".png");
	// 	});
	// };
	$(document).ready(function() {

		var $menu = $("#my-menu").mmenu({
			extensions: [ 'theme-dark', 'effect-menu-slide', 'pagedim-black'],
			navbar: {
				title: "Меню"
			},
        "pageScroll": true, //работает, если и меню и секции, к которым работает скролл, находятся в одом и том же контейнере
        //columns: true,
        offCanvas: {
        	position: "right"
        }
    });
		
		var $icon = $(".toggle-mnu"),
		api = $menu.data( "mmenu" );

		api.bind('opened', function(){
			$icon.addClass('on');
		}).
		bind('closed', function() {
			$icon.removeClass('on');
		});

			$('.popup-youtube').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: false
		});
	});


	var waypoint = new Waypoint({
		element: document.getElementById('numers'),
		handler: function(direction) {
			
			if(direction == 'down'){

				$('.numers__header').each(function(index, elem) {
					var delay = index * 500,
					$this = $(elem);
					
					var timer = setTimeout(function(){
						$this.animateNumber({
							number: $this.attr('data-count'),
						    color: 'green', // require jquery.color
						    'font-size': '50px',

						    easing: 'easeInQuad', // require jquery.easing

						    // optional custom step function
						    // using here to keep '%' sign after number
						    numberStep: function(now, tween) {
						    	var floored_number = Math.floor(now),
						    	target = $(tween.elem);

						    	target.text(floored_number);
						    	}
							}, 1000
						);
					}, delay);
				});
			}
		},
		offset: 300
	});

	var testimCar = $('#car-tstimonials').owlCarousel({
		items: 1,
		nav: true,
		navText: [],
		autoplay: true,
		loop: true
	});

	var resCar = $('#car-results').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navText: [],
		responsiveClass: true,
		onTranslated: resCarTranslated,
		onInitialized: resCarTranslated,
		autoplay: true,
		responsive : {
    
		    0 : {
		        items: 1
		      
		    },
		  
		}
	});
	
	function resCarTranslated() {
		
		var $active = $('.owl-item.active'),
			$donor = $active.find('.results__before .before-num'),
			$target = $active.find('.results__after .before-num'); 
		$active.find('.results__small-img')
				.removeClass('results__small-img--thin');
		$active.siblings().find('.results__small-img')
				.addClass('results__small-img--thin');

		$target.prop('number', $donor.text())
		.animateNumber(
		{
			number: $target.text()
		},
		2000
		);
	}


	$('.supplements__contents-chapters li').on('mouseenter click', function(e) {
		e.preventDefault();
		var $li = $(this),
			$liIndex = $li.index();
			$tittleText = $li.find('.chapter-left').text(),
			$doze = $li.find('.chapter-right').text(),
			$chapters = $('.supplements__ingridients-item'),
			$infoTexts = $('.ingr-descr'),
			$title = $chapters.find('.supplements__ingridients-title'),
			$hexagon = $chapters.find('.icon-hexagon');
						

		$li.addClass('ingridient-active')
				.siblings().removeClass('ingridient-active');
		
		$chapters.stop(true, true).fadeOut(function() {
			var imgUrl = 'url('+ $infoTexts.eq($liIndex).attr('data-img-url') + ')';
			
			$title.contents()[0].textContent = $tittleText;
			$chapters.find('.supplements__ingridients-doze')
					.text($doze + ' мг');
			$chapters.find('.supplements__ingridients-content')
					.text($infoTexts.eq($liIndex).text());

			 $hexagon.css('background-image', imgUrl);
			$chapters.fadeIn(500);
			});
		
		
	});

	var popup =	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		
			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				},
				beforeClose: function() {
					if(($('.qtip').length != 0)){
	      				var $popuppedForm = $('.mfp-content').find('form'),
	      				$popuppedInputs = $popuppedForm.find('input');
	      				$popuppedInputs.each(function(index, elem) {
	      					var item = $(elem);
	      					item.qtip().hide();
	      				});
						
					}
      		
    	 }
   		 
			}

		});


	// $('form').submit(function(e) {
	// 	e.preventDefault();

	// });

	$('form').submit(function(e) {
		e.preventDefault();
		var valid = new Validate($(this));
		valid.init();

	});

	function Validate(form){

		var _self = this;

		this.init = function(){

			this.formSubmit();
		};
		this.regListeners = function(){
			
			$(form).on('submit', this.formSubmit);
			
		};
		this.formSubmit = function(e){

			
			if(_self.formValidate(form) == false){
				return false;
			}
			return true;

		};
		this.formValidate = function($form){
			var validation = true;
			var $inputs = $form.find('input, textarea');
			

			$inputs.each(function(index, elem){
				var $input = $(elem);

				if($input.val() == ''){
					validation = false;
					_self.createTooltip($input);
				}

			});
			return validation;

		};

		this.createTooltip = function($toolParent){
			
			$toolParent.qtip({
				show: {
					ready: true,
					event: false
				},
				hide:{
					fixed: true,
					leave: false,
					event: false
				},
				position: {
        my: 'bottom center',  // Position my top left...
        at: 'bottom center', // at the bottom right of...
        adjust: {
        	x: 10,
        	y: 0

        }
    },

    style: {
    	classes: 'qtip-red',
    	tip: {

    		corner: true,
    		corner: 'bottom center'
    	}
    }
}).show();
			form.find('input').on('keydown', this.inputKeyDown);
			form.find('input').on('focusout', this.inputFocusOut);

			form.find('textarea').on('keydown', this.inputKeyDown);
			form.find('textarea').on('focusout', this.inputFocusOut);
		};

		this.inputKeyDown = function(){
			$(this).qtip().hide();
		};
		this.inputFocusOut = function(){
			console.log('focusout');
			if($(this).val() == "") _self.createTooltip($(this));
		};
	}
	// var valid = new Validate();
	// valid.init();




	// $('.numers__header').animateNumber({
	// 		number: 200,
	//     color: 'green', // require jquery.color
	//     'font-size': '50px',

	//     easing: 'easeInQuad', // require jquery.easing

	//     // optional custom step function
	//     // using here to keep '%' sign after number
	//     numberStep: function(now, tween) {
	//     	var floored_number = Math.floor(now),
	//     	target = $(tween.elem);

	//     	target.text(floored_number);
	//     	}
	// 	},
	// 1800
	// );
		//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	/*$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});*/

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	//$(".loader_inner").fadeOut();
	$(".preloader").delay(400).fadeOut("slow");

});
