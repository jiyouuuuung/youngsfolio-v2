$(window)
	.load(onLoad)
	.resize(onResize)
	.scroll(onScroll);

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var speed;

function onLoad()
{
	if (check_allDevice() != "")
	{
    $("body").addClass("device");
  }
  //reset();
  contactHeight();
  gnbBtn();
}

function onResize()
{
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  sliderCursor();
  sliderReset();
  contactHeight();
  gnbBtn();
  scrollNav();
}

var scrollTop = 0;
function onScroll()
{
	scrollTop = $(window).scrollTop();
	windowWidth = $(window).width();
  windowHeight = $(window).height();
  scrollNav();
}

var popupAble = true;

$(function(){
  $('.filter').remove();

  $(document).on('mousedown', 'button', function(e){
    e.preventDefault();
  });

  if(!$("body").hasClass("device")){
    $(document).on('mouseenter', function(){
      $('main').prepend('<div id="cursor"><span></span></div>');
      cursor();
      sliderCursor();
    });
    $(document).on('mouseleave', function(){
      if($(this).find('#cursor')){
        $('#cursor').remove();
      }
    });
  }else{
    $('#cursor').remove();
  }

  $(".btn-logo").on('click', function(){
    $(".gnb-list li").removeClass("active");
  });
  $(".gnb-list a").on('click', function(){
    $(".gnb-list li").removeClass("active");
    $(this).parent("li").addClass("active");
  });

  $('#works').on('click', '.worklist li > button', function(){
    thumbIdx = $(this).parent('li').index();
    popupData(thumbIdx);
    if(popupAble === true){
      $('#popup').css({"display": "block"}).animate({"opacity": "1"}, 300, function(){
        $('html, body').css({"overflow": "hidden"});
      });
    }else{
      return false;
    }
  });

  $('#popup .btn-close').on('click', function(){
    $('#popup').animate({"opacity": "0"}, 300, function(){
      $(this).css({"display": "none"});
      $('html, body').css({"overflow": ""});
    });
  });
  
  workData();
  
  $('#works .worklist .btn-next').on('click', function(){
    idx++;
    if(idx > thisLength){
      idx = 0;
    }
    slide();
    slideNext(idx, prev, next);
  });

  $('#works .worklist .btn-prev').on('click', function(){
    idx--;
    if(idx < 0){
      idx = thisLength;
    }
    slide();
    slidePrev(idx, prev, next);
  });

  scrollNav();
});

function reset(){
  $('#main .middle').html('');
  mainTyping();
}

function mainTyping(){
  var type = 'HELL'
  type.length = 0;

  for(i = 1; i <= type.length; i++){
    setInterval(function(){
      type.length = i;
    }, 3000);
  }

  $('#main .middle').html('<p class="type">' + type + '</p>');
  console.log(type.length);
}

/*
document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = ['HELLO<br>WORLD!'];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.querySelector("#main .type").innerHTML = text.substring(0, i+1);

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       StartTextAnimation(i + 1);
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});*/

var gnbOpened = false;

function gnbBtn(){//오픈됐을때 스크롤 안되게, pc>mo 리사이징시 리셋
  if(viewportWidth() <= 768){
    $("header nav .btn-gnb").on('click', function(){
      if(gnbOpened == false){
        $("header nav").addClass("active");
        gnbOpened = true;
      }else{
        $("header nav").removeClass("active");
        gnbOpened = false;
      }
      return false;
    });
  }
}

function contactHeight(){
  var itsHeight = $("#contact").outerHeight() - 100;
  $("#works").css({"margin-bottom": itsHeight + "px"});
}

function cursor(){
  if(!$("body").hasClass("device")){
    $("#cursor span").css({"display": "block"});
    $(document).mousemove(function(event){
      var cursorX = event.clientX;
      var cursorY = event.clientY;
      $("#cursor span").css({"top": cursorY + "px", "left": cursorX + "px"});
    });
    $("a, button").mouseenter(function(){
      $("#cursor").addClass("active");
      return false;
    });
    $("a, button").mouseleave(function(){
      $("#cursor").removeClass("active");
      return false;
    });
  }else{
    $("#cursor span").css({"display": "none"});
    $("#cursor").remove();
  }
}

function sliderCursor(){
  if(viewportWidth() <= 768){
    $('#works .worklist li > button').on('mouseenter', function(){
      $("#cursor").addClass("on_slider");
    });
    $('#works .worklist li > button').on('mouseleave', function(){
      $("#cursor").removeClass("on_slider");
    });
  }else{
    $('#works .worklist li > button').on('mouseenter', function(){
      $("#cursor").removeClass("on_slider");
    });
  }
}

$(document).on("click", ".btn-logo", function(){
  if(viewportWidth() <= 768 && gnbOpened == true){
    $("header nav").removeClass("active");
    gnbOpened = false;
  }
  speed = $(window).scrollTop() / 5;
  $("html, body").stop().animate({scrollTop: 0}, speed, 'swing');
  return false;
});

$(document).on("click", "nav a", function(e){
  e.preventDefault();
  if(viewportWidth() <= 768){
    $("header nav").removeClass("active");
    gnbOpened = false;
  }
  speed = $(window).scrollTop() / 5;
  var thisTarget = $(this).attr('href');
  var sectionTop = $(thisTarget).offset().top + 1;
  if(thisTarget === '#contact'){
    var sectionTop = $(document).height() - windowHeight;
  }
  $("html, body").stop().animate({scrollTop: sectionTop}, speed, 'swing');
  scrollNav();
  return false;
});

function scrollNav(){
  $('main section').each(function(){
    var thisIdx = $(this).index() - 1;
    if(viewportWidth() > 510){
      var thisTop = $(this).offset().top-1;
      if(scrollTop < windowHeight){
        $('.gnb-list > li').removeClass('active');
      }
      if(thisTop + windowHeight <= scrollTop){
        if(thisIdx >= 2 && $(document).height() - (windowHeight + ($('#contact').outerHeight() / 2)) > scrollTop){
          thisIdx = 1;
        }else if($(document).height() - (windowHeight + ($('#contact').outerHeight() / 2)) <= scrollTop){
          thisIdx = 2;
        }
        $('.gnb-list > li').removeClass('active');
        $('.gnb-list > li').eq(thisIdx).addClass('active');
      }
    }else{
      if(($(this).offset().top - (windowHeight / 3)) <= scrollTop){
        var lastTop = $(document).height() - $('#contact').outerHeight() - 100;
        $('header nav .gnb-list li').removeClass('active');
        $('header nav .gnb-list li').eq(thisIdx).addClass('active');
        if($(document).height() - lastTop < windowHeight){
          if((scrollTop + windowHeight) - lastTop >= ($(document).height() - lastTop)/3){
            $('header nav .gnb-list li').removeClass('active');
            $('header nav .gnb-list li').eq(2).addClass('active');
          }
        }
      }
    }
  });
}

var swipeAble = false;
var idx, prev, next, thisLength;

function slider_Swipe()
{
	$("#works .worklist").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			
		},
		swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
      popupAble = false;
      swipeAble = true;
			if(distance > 30)
			{
				if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
				{
					if((direction == "left" || phase == "left"))
					{
            $("#works .worklist .btn-next").trigger("click");
					}else if((direction == "right" || phase == "right"))
					{
						$("#works .worklist .btn-prev").trigger("click");
					}
				}
      }
			swipeAble = false;
		},
		allowPageScroll:"vertical"
	});
}

function sliderReset(){
  idx = 0;
  prev = thisLength;
  next = idx + 1;
  if(viewportWidth() <= 768){
    $('#works .worklist li').css({"position": "absolute", "display": "none"});
    $('#works .worklist li').eq(idx).css({"position": "relative", "display": "block", "margin-left": "0"});
    $('#works .worklist li').eq(prev).css({"display": "block", "margin-left": "-100%"});
    $('#works .worklist li').eq(next).css({"display": "block", "margin-left": "100%"});
    slider_Swipe();
  }else{
    $('#works .worklist li').css({"position": "", "display": "", "margin-left": ""});
  }
  $('.slide_no .present').text(idx + 1);
}

function slide(){
  prev = idx == 0 ? thisLength : idx - 1;
  next = idx == thisLength ? 0 : idx + 1;
  $('.slide_no .present').text(idx + 1);
}

function slideNext(idx, prev, next){
  $('#works .worklist li').css({"position": "absolute", "display": "none"});
  $('#works .worklist li').eq(idx).css({"position": "relative", "display": "block", "margin-left": "100%;"}).stop().animate({"margin-left": "0"}, 300, function(){
    popupAble = true;
  });
  $('#works .worklist li').eq(prev).stop().css({"display": "block", "margin-left": "0;"}).animate({"margin-left": "-100%"}, 300);
  $('#works .worklist li').eq(next).stop().css({"display": "block", "margin-left": "200%"}).animate({"margin-left": "100%"}, 300);
}

function slidePrev(idx, prev, next){
  $('#works .worklist li').css({"position": "absolute", "display": "none"});
  $('#works .worklist li').eq(idx).css({"position": "relative", "display": "block", "margin-left": "-100%;"}).stop().animate({"margin-left": "0"}, 300, function(){
    popupAble = true;
  });
  $('#works .worklist li').eq(prev).stop().css({"display": "block", "margin-left": "-200%"}).animate({"margin-left": "-100%"}, 300);
  $('#works .worklist li').eq(next).stop().css({"display": "block", "margin-left": "0"}).animate({"margin-left": "100%"}, 300);
}

function workData(){
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status === 200){
      responseObject = JSON.parse(xhr.responseText);
      thisLength = responseObject.works.length - 1;
      var newContent = '';
      for(var i = 0; i < responseObject.works.length; i++){
        var skillsArray = [];
        Object.entries(responseObject.works[i].skills).forEach(function([key, value]) {
          if(value > 0){
            skillsArray.push(key);
          }
        });
        skillsArray = skillsArray.join().replace(/,/g, ', ');
        newContent += '<li><button type="button" title="see detail of '+ responseObject.works[i].title + '"><img src="./images/works/thumbs/thumb' + responseObject.works[i].number + '.jpg" alt="thumbnail of ' + responseObject.works[i].title + '">';
        newContent += '<div class="cover"><div class="text"><div class="title"><h3>' + responseObject.works[i].title + '</h3></div>'
        newContent += '<p>' + skillsArray + '</p></div></div></button></li>'
      }
      $('#worklist').html(newContent);
      $('.slide_no .total').text(responseObject.works.length);
    }
  };

  xhr.open('GET', '/data/works.json', true);
  xhr.send(null);
  sliderReset();
}

function popupData(idx){

  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status === 200){
      responseObject = JSON.parse(xhr.responseText);
      $('#popup .popup-inner .detail-img').css({"background-image": "url('./../images/works/details/detail" + responseObject.works[idx].number + ".jpg')"});
      $('#popup .popup-inner .contribution').empty();
      $('#popup .popup-inner h3').text(responseObject.works[idx].title);
      $('#popup .popup-inner .year').text(responseObject.works[idx].date);
      $('#popup .popup-inner .desc').remove();
      var workDesc = '';
      if(responseObject.works[idx].desc === null){
        $('#popup .popup-inner .desc').remove();
      }else{
        $('#popup .popup-inner .desc').remove();
        workDesc += '<p class="desc">' + responseObject.works[idx].desc + '</p>'
        $('#popup .popup-inner .txt-desc').append(workDesc);
      }
      var skillList = [];
      var listContent = '';
      skillList.push(Object.entries(responseObject.works[idx].skills));
      Object.entries(responseObject.works[idx].skills).forEach(function([key, value]) {
        if(value > 0){
         listContent += '<li>' + `${key}: ${value}%` + '</li>'
        }
      });
      $('#popup .popup-inner .contribution').html(listContent);
      var siteLink = '';
      var codeLink = '';
      if(responseObject.works[idx].site === null){
        $('#popup .popup-inner .link_wrap .link-site').remove();
      }else{
        $('#popup .popup-inner .link_wrap .link-site').remove();
        siteLink += '<li class="link-site"><a href="' + responseObject.works[idx].site + '" target="_blank" title="open in new window: go to website of ' + responseObject.works[idx].title + '">view <br>site</a></li>'
        $('#popup .popup-inner .link_wrap').append(siteLink);
      }
      if(responseObject.works[idx].code === null){
        $('#popup .popup-inner .link_wrap .link-code').remove();
      }else{
        $('#popup .popup-inner .link_wrap .link-code').remove();
        codeLink += '<li class="link-code"><a href="' + responseObject.works[idx].code + '" target="_blank" title="open in new window: see the code of ' + responseObject.works[idx].title + '">view <br>code</a></li>'
        $('#popup .popup-inner .link_wrap').append(codeLink);
      }
      if(!$("body").hasClass("device")){
        $("a, button").mouseenter(function(){
          $("#cursor").addClass("active");
        });
        $("a, button").mouseleave(function(){
          $("#cursor").removeClass("active");
        });
      }
    }
  };

  xhr.open('GET', '/data/works.json', true);
  xhr.send(null);
}