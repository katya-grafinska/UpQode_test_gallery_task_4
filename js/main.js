;(function($, window, document, undefined) {
    "use strict";

    /*============================*/
	/* 01 - VARIABLES */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


	/*========================*/
	/* 02 - PAGE CALCULATIONS */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}
    

	/*=================================*/
	/* 03 - FUNCTION ON DOCUMENT READY */
	/*=================================*/
	pageCalculations();
	

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	
	$(window).load(function(){		
	    initSwiper();
        
    
	});


	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/	

	function resizeCall(){
		pageCalculations();
		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});	
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - SWIPER SLIDERS */
	/*=====================*/
    
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
            var mode = $t.attr('data-mode');
			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
                mode: mode || 'horizontal',
				onInit: function(swiper){
				    $t.find('.swiper-slide').addClass('active');
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
                    
				}
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
            
            if($t.find('.default-active').length){
                swipers['swiper-'+index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);    
            } 
            
			initIterator++; 
		});
		
	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}	


	//swiper arrows
	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});
    
    $('.swiper-outer-left').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-outer-right').on('click', function(){
		swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipeNext();
	});
    
	

	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/
	
    $(window).scroll(function() {

        
	});
	
    

    /***********************************/
	/*VIDEO*/
	/**********************************/
	$('.cut_video_btn').on("click", function(){
		var video = $(this).data('video');			
		$(this).parents('.cut_video_block').addClass('active');
		$(this).siblings('.cut_video_iframe').attr('src',video);
		return false;
	});
	$('.cut_video_close').on("click", function(){
		$(this).parents('.cut_video_block').removeClass('active');
		$(this).siblings('.cut_video_iframe').attr('src','about:blank');
		return false;
	});
    
    
    
    /***********************************/
	/*BACKGROUND*/
	/**********************************/
    
    //sets child image as a background
    $('.s-back-switch').each(function(){
        var $img = $(this).find('.s-img-switch');
        var $imgSrc =  $img.attr('src');
        var $imgDataHidden =  $img.data('s-hidden');
        $(this).css('background-image' , 'url(' + $imgSrc + ')');
        if($imgDataHidden){
        	$img.css('visibility', 'hidden');
        }else{
        	$img.hide();
        }
    }); 
    	
    	var $index;
   
    $('.button-next').on('click', function() {

    		$index = $('li.item.active').index();
    		$('li.item').removeClass('active');

    		if ($index === $('li.item').length-1) {
    			$index = 0;
    		}

    		else {
    			$index++;
    		}

    		$('li.item').eq($index).addClass('active');  	
			
    });
   
   /*$('.button-next').on('click',function(){
     var active = $('.item.active'),
      next_el = active.next();

     $('.item').removeClass('active');
     next_el.addClass('active');

     if (next_el.index() == '-1') {
      $('.item').first().addClass('active');
     }
     
    });*/
      
})(jQuery, window, document);
