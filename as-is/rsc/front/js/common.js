$(function () {
  //// swiper slider
  /*	
    var EVTswiper = new Swiper(".event_slider", {
        freeMode : false, 
        slidesPerView:'auto',
        spaceBetween: 7,
        pagination: {
            el: ".event_slider .swiper-pagination",
            hide: true,
        },
    });
*/

  var EVTswiper = new Swiper('.event_slider', {
    freeMode: false,
    slidesPerView: 1,
    spaceBetween: 7,
    centeredSlides: true,
    pagination: {
      el: '.event_slider .swiper-pagination',
      hide: true
    },
    breakpoints: {
      413: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    }
  });

  var CRswiper = new Swiper('.ranking_slider', {
    freeMode: false,
    slidesPerView: 'auto',
    spaceBetween: 13
  });

  var Myswiper = new Swiper('.mymenu_slider', {
    freeMode: false,
    slidesPerView: 'auto',
    spaceBetween: 16
  });
});

//// popup
function view_popup() {
  $('.popup').animate({ bottom: '0' }, 300);
  $('body').css('overflow', 'hidden');
  var x = window.scrollX,
    y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}
function close_popup() {
  $('.popup').animate({ bottom: '-100%' }, 300);
  $('body').css('overflow', '');
  window.onscroll = function () {};
}

// input text clear
var clearInput = function (obj) {
  obj.parentNode.querySelector('.clear').value = '';
};

$(function () {
  //// pw viewr
  $('.eyes').on('click', function () {
    $('.password').toggleClass('active');

    if ($('.password').hasClass('active') == true) {
      $(this).find('.ico_eye').attr('class', 'ico_eye_slash').parents('.password').find('.form_pw').attr('type', 'text');
    } else {
      $(this).find('.ico_eye_slash').attr('class', 'ico_eye').parents('.password').find('.form_pw').attr('type', 'password');
    }
  });

  //// shoe menu
  $('.shoe_menu a').click(function () {
    $('.shoe_menu a').removeClass('active');
    $(this).addClass('active');
  });

  //// pw viewr
  $('.music_list button').on('click', function () {
    if ($(this).hasClass('btn_stop') == true) {
      $(this).attr('class', 'btn_play');
    } else if ($(this).hasClass('btn_play') == true) {
      $(this).attr('class', 'btn_stop');
    }
  });
});

//// layer reply
function view_reply() {
  $('.layer_reply').animate({ bottom: '0' }, 300);
  $('body').css('overflow', 'hidden');
  var x = window.scrollX,
    y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}
function close_reply() {
  $('.layer_reply').animate({ bottom: '-100%' }, 300);
  $('body').css('overflow', '');
  window.onscroll = function () {};
}

//// layer access
function view_access() {
  $('.layer_access').addClass('active');
  $('body').css('overflow', 'hidden');
  var x = window.scrollX,
    y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}
function close_access() {
  $('.layer_access').removeClass('active');
  $('body').css('overflow', '');
  window.onscroll = function () {};
}
