	$.fn.carousel = function(data) {
		
		var slider 			= $(this),
			slides 			= $(slider).find(' li'),
			slidesTot		= slides.length,
			sliderWidth		= $(this).innerWidth(),
			sliderPager		= data,			
			sliderNav		= '.slider-nav',
			slideCurrent	= 0,
			cycleTime = 3000,
			animationTime = 800,
			timer = 0,
			clickDisabled = false;
		
		// start autoplay
		autoPlay = setInterval(function(){ moveSlide(); }, cycleTime);
		
		// click successivo
		$(sliderNav).find('.next').click(function() { clickAction('next') });

		// click precedente
		$(sliderNav).find('.prev').click(function() { clickAction('prev') });

		// click paginatore
		$(sliderPager + ' a').click(function() { clickAction(this) });	
		

		function clickAction(element) {
			if (clickDisabled) 
				return;	
			else {
				if(element =='next') {
					// al primo click
					if(slideCurrent === 0)
						slideCurrent=1;
				}else if(element == 'prev')
					slideCurrent -= 2;
				else {
					slideCurrent = $(element).index();
				}
					
				clickDisabled = true;
				stopInterval();
				moveSlide();
			}
		}

		function moveSlide() {

			// se sono all'ultima slide
			if(slideCurrent >= slidesTot) 
				slideCurrent = 0;

			// se sono alla prima slide
			else if (slideCurrent < 0)
				slideCurrent = slidesTot-1;

			// gestione classe active sul paginatore
			$(sliderPager + " a.active").removeClass("active");
 			var linkNext = $( sliderPager + ' a').get( slideCurrent ),
		    	linkPrev = $( sliderPager + ' a').get( slideCurrent-1 );		
			$(linkPrev).removeClass("active");
			$(linkNext).addClass("active");

			// animazione
		    $('.slider ul').animate({
		    	marginLeft: -( sliderWidth * slideCurrent)
		    }, animationTime, function() {

		    	slideCurrent += 1;

		    	if (clickDisabled) {
		    		clickDisabled = false;
		    	}

			    // restart autoplay
			    if(autoPlay == '')
			    	autoPlay = setInterval(function(){ moveSlide(); }, cycleTime);		    	
		    });

		}

		// stop autoplay
		function stopInterval() {	

			if (autoPlay != '')
				clearInterval(autoPlay);	
			autoPlay = '';
		}
	}