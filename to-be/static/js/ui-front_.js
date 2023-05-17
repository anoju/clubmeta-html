/********************************
 * 클럽메타 UI 스크립트 *
 * 작성자 : 안효주 *
 ********************************/
$(function () {
  const $elements = $.find('*[data-include-html]');
  if ($elements.length) {
    ui.Html.include(ui.Init);
  } else {
    ui.Init();
  }
});

$(window).on('load', function () {
  ui.LoadInit();
});

$(window).on('resize', function () {
  ui.Common.vhChk();
  ui.Tab.resize();
  ui.Tooltip.resize();
  ui.Table.guideResize();
  ui.Touch.rotateItem();

  Layer.resize();
});
$(window).on('scroll', function () {
  ui.Common.space();
});

/********************************
 * front UI 함수 *
 ********************************/

const ui = {
  isInit: false,
  basePath: '/to-be/static/',
  Init: function () {
    if (ui.isInit) {
      ui.reInit();
    } else {
      ui.isInit = true;
      ui.Common.vhChk();
      ui.Common.dark();
      ui.Device.check();
      ui.Common.init();
      ui.Util.init();
      ui.Button.init();
      ui.Tooltip.init();
      ui.Form.init();
      ui.List.init();
      ui.Scroll.init();
      ui.Animation.init();
      Layer.init();
      ui.Animation.splitting();
      ui.Chart.init();
    }
  },
  reInit: function () {
    ui.Common.lottie();
    ui.Util.reInit();
    ui.Button.reInit();
    ui.Tab.reInit();
    ui.Tooltip.reInit();
    ui.Form.reInit();
    ui.List.reInit();
    ui.Swiper.reInit();
    ui.Chart.init();
    ui.Animation.init();
    ui.Animation.splitting();
  },
  isLoadInit: false,
  LoadInit: function () {
    if (ui.isLoadInit) return;
    ui.isLoadInit = true;
    // console.log('window load complete');
    ui.Common.vhChk();
    ui.Common.winLoad();
    ui.Common.lottie();
    ui.Button.winLoad();
    ui.Form.winLoad();
    ui.List.winLoad();

    ui.Confetti.init();
    ui.Swiper.init();
  }
};

//Html include
ui.Html = {
  include: function (fn) {
    const $elements = $.find('*[data-include-html]');
    if ($elements.length) {
      if (location.host) {
        $.each($elements, function (i) {
          const $this = $(this);
          $this.empty();
          const $html = $this.data('include-html');
          const $htmlAry = $html.split('/');
          const $htmlFile = $htmlAry[$htmlAry.length - 1];
          const $docTitle = document.title;
          let $title = null;
          if ($docTitle.indexOf(' | ') > -1) {
            $title = $docTitle.split(' | ')[0];
          }
          $this.load($html, function (res, sta, xhr) {
            if (sta == 'success') {
              if (!$this.attr('class') && !$this.attr('id')) $this.children().unwrap();
              else $this.removeAttr('data-include-html');
            }
            if (i === $elements.length - 1) {
              if (!!fn) fn();
            }
          });
        });
      } else {
        if (!!fn) fn();
      }
    }
  }
};

//PC 디바이스 체크
ui.PC = {
  window: function () {
    return navigator.userAgent.match(/windows/i) == null ? false : true;
  },
  mac: function () {
    return navigator.userAgent.match(/macintosh/i) == null ? false : true;
  },
  chrome: function () {
    return navigator.userAgent.match(/chrome/i) == null ? false : true;
  },
  firefox: function () {
    return navigator.userAgent.match(/firefox/i) == null ? false : true;
  },
  opera: function () {
    return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;
  },
  safari: function () {
    return navigator.userAgent.match(/safari/i) == null ? false : true;
  },
  edge: function () {
    return navigator.userAgent.match(/edge/i) == null ? false : true;
  },
  msie: function () {
    return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;
  },
  ie11: function () {
    return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
  },
  ie10: function () {
    return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;
  },
  ie9: function () {
    return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;
  },
  ie8: function () {
    return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;
  },
  any: function () {
    return ui.PC.window() || ui.PC.mac();
  },
  check: function () {
    if (ui.PC.any()) {
      $('html').addClass('pc');
      if (ui.PC.window()) $('html').addClass('window');
      if (ui.PC.mac()) $('html').addClass('mac');
      if (ui.PC.msie()) $('html').addClass('msie');
      if (ui.PC.ie11()) $('html').addClass('ie11');
      if (ui.PC.ie10()) $('html').addClass('ie10');
      if (ui.PC.ie9()) $('html').addClass('ie9');
      if (ui.PC.ie8()) $('html').addClass('ie8');
      if (ui.PC.edge()) {
        $('html').addClass('edge');
      } else if (ui.PC.opera()) {
        $('html').addClass('opera');
      } else if (ui.PC.chrome()) {
        $('html').addClass('chrome');
      } else if (ui.PC.safari()) {
        $('html').addClass('safari');
      } else if (ui.PC.firefox()) {
        $('html').addClass('firefox');
      }
    }
  }
};

//모바일 디바이스 체크
ui.Mobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) == null ? false : true;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
  },
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i) == null ? false : true;
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i) == null ? false : true;
  },
  iPhoneVersion: function () {
    const $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10;
    const $sliceEnd = $sliceStart + 2;
    const $version = parseFloat(navigator.userAgent.slice($sliceStart, $sliceEnd));
    return $version;
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
  },
  tablet: function () {
    if (ui.Mobile.any()) {
      if (window.screen.width < window.screen.height) {
        return window.screen.width > 760 ? true : false;
      } else {
        return window.screen.height > 760 ? true : false;
      }
    }
  },
  any: function () {
    return ui.Mobile.Android() || ui.Mobile.iOS() || ui.Mobile.BlackBerry() || ui.Mobile.Opera() || ui.Mobile.Windows();
  },
  check: function () {
    if (ui.Mobile.any()) {
      $('html').addClass('mobile');
      if (ui.Mobile.tablet()) $('html').addClass('tablet');
    }
    if (ui.Mobile.iOS()) $('html').addClass('ios');
    if (ui.Mobile.Android()) $('html').addClass('android');
    //if(ui.Mobile.iPhoneVersion() >= 12)$('html').addClass('ios12');

    // 앱인지 구분
    if (ui.Device.app()) {
      $('html').addClass('is-app');
    }
  }
};

//디바이스체크 실행
ui.Device = {
  iPhone8PlusH: 736,
  screenH: window.screen.height,
  screenW: window.screen.width,
  isIPhoneX: function () {
    $('html').addClass('iPhone-X');
  },
  notIPhoneX: function () {
    $('html').removeClass('iPhone-X');
  },
  check: function () {
    ui.Mobile.check();
    ui.PC.check();
    if (ui.Mobile.any()) {
      const $pixelRatio = Math.round(window.devicePixelRatio);
      if (!!$pixelRatio) $('html').addClass('pixel-ratio-' + $pixelRatio);
    }
    const $isIPhoneX = ui.Mobile.iPhone() && ui.Device.screenH > ui.Device.iPhone8PlusH ? true : false;
    if ($isIPhoneX) {
      //첫로딩
      if ($(window).width() < $(window).height()) {
        ui.Device.isIPhoneX();
      } else {
        ui.Device.notIPhoneX();
      }
    }

    //가로, 세로 회전시
    if (ui.Mobile.any()) {
      if (window.orientation == 0) {
        $('html').removeClass('landscape');
      } else {
        $('html').addClass('landscape');
      }
      $(window).on('orientationchange', function () {
        if (window.orientation == 0) {
          $('html').removeClass('landscape');
          if ($isIPhoneX) ui.Device.isIPhoneX();
        } else {
          $('html').addClass('landscape');
          if ($isIPhoneX) ui.Device.notIPhoneX();
        }
      });
    }

    // 최소기준 디바이스(가로)크기보다 작으면 meta[name="viewport"] 수정
    const deviceMinWidth = 320;
    if ($(window).width() < deviceMinWidth) {
      const $viewport = $('meta[name="viewport"]');
      // const $content = $viewport.attr('content');
      const $newContent = 'width=' + deviceMinWidth + ',user-scalable=no,viewport-fit=cover';
      $viewport.attr('content', $newContent);
    }
  },
  app: function () {
    // isWebView() -앱확인., goOutLink() -새창. 는 개발팀 공통함수
    if (typeof isWebView === 'function' && isWebView()) {
      return true;
    } else {
      return false;
    }
  }
};

//공통: 헤더, 레이아웃, 앱용플로팅버튼, 스킵네비, meta[og:image]
ui.Common = {
  winLoad: function () {
    ui.Common.hr();
    ui.Common.space();
  },
  page: function () {
    $('.page').each(function () {
      if (!$(this).closest('.popup').length) $(this).addClass('main-page');
    });
  },
  hr: function () {
    //hr태그 토크백 제외
    $('hr').each(function () {
      const $this = $(this);
      if (!$this.attr('aria-hidden') !== 'true') $this.attr('aria-hidden', true);
    });
  },
  dark: function () {
    //다크모드 체크
    try {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
      if (prefersDark) $('html').addClass('dark');
    } catch (e) {}
  },
  vhChk: function () {
    const $vh = window.innerHeight * 0.01;
    $('html').css('--vh', $vh + 'px');
  },
  title: function (string) {
    let $title = document.title;
    const $divide = ' | ';
    if ($title.indexOf($divide) >= 0) $title = $title.split($divide)[1];
    const $titString = string.replace(/<[^>]*>?/gm, '');
    document.title = $titString + $divide + $title;
    const $titleEl = '#header h1';
    if ($($titleEl).length && !$($titleEl).hasClass('no-title')) $($titleEl).html(string);
  },
  getTopFixedHeight: function (element, className) {
    if (className == undefined) className = 'top-fixed';
    let $element = $(element);
    let $topFixedHeight = 0;
    const $plusHeight = function (target) {
      let $height = $(target).outerHeight();
      if ($(target).css('position') !== 'sticky') $height = $(target).children().outerHeight();
      $topFixedHeight += $height;
    };
    if ($('.' + className).length) {
      while (!$element.is('body')) {
        const $prevAll = $element.prevAll();
        if ($prevAll.length) {
          $prevAll.each(function () {
            const $this = $(this);
            if ($this.hasClass(className)) {
              $plusHeight($this);
            } else {
              const $child = $this.find('.' + className);
              if ($child.length) {
                $child.each(function () {
                  $plusHeight(this);
                });
              }
            }
          });
        }
        $element = $element.parent();
      }
    }
    return $topFixedHeight;
  },
  fixed: function (target, isBottom) {
    if (isBottom === undefined) isBottom = false;
    //고정(fixed)
    const $target = $(target);
    if ($target.length && $target.data('init') != true) {
      $target.data('init', true);
      $(window).on('scroll', function () {
        if ($('html').hasClass('lock')) return false;
        const $scrollTop = $(this).scrollTop();

        $target.each(function () {
          if ($(this).closest('.' + Layer.popClass).length) return;
          const $this = $(this);
          const $topMargin = ui.Common.getTopFixedHeight($this);
          let $topEl = $this;
          const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
          const $thisH = $this.outerHeight();
          const $isFixed = isBottom ? $scrollTop + $topMargin > $offsetTop + $thisH : $scrollTop + $topMargin > $offsetTop;
          if ($isFixed) {
            $this.data('top', $offsetTop);
            $this.addClass('top-fixed');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
            if ($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed')) $('#header').addClass('end-fixed');
          } else {
            $this.removeData('top');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            $topEl.removeCss('top');
            $this.removeClass('top-fixed');
            if (($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed') && $('.top-fixed').length === 1) || !$('.top-fixed').length) $('#header').removeClass('end-fixed');
          }
        });
      });
    }
  },
  header: function () {
    const $header = $('.page-head');
    if (!$header.length) return;
    let $title = document.title;
    const $divide = ' | ';
    const $titleEl = $('#header h1');
    if ($title.indexOf($divide) >= 0) {
      $title = $title.split($divide)[0];
      if ($titleEl.length && !$titleEl.hasClass('no-title') && $titleEl.text() === '') $titleEl.html($title);
    }
    if ($('.' + ui.Common.scrollShowTitleClass).length) $titleEl.addClass('scl-title-hide');

    if (!$titleEl.length) return;
    /*
    const $headLeft = $header.find('.head-left');
    const $headLeftW = $headLeft.length ? $headLeft.outerWidth() : 0;
    const $headRight = $header.find('.head-right');
    const $headRightW = $headRight.length ? $headRight.outerWidth() : 0;
    const $h1Padding = $headLeftW < $headRightW ? $headRightW : $headLeftW;
    if ($h1Padding > 0) {
      $titleEl.css({
        'padding-left': $h1Padding + 10,
        'padding-right': $h1Padding + 10
      });
    }
    */
    const $headLeft = $header.find('.head-left');
    if ($headLeft.find('h1').length) return;
    const $headLeftW = $headLeft.outerWidth();
    const $headRight = $header.find('.head-right');
    const $headRightW = $headRight.outerWidth();
    if (!$headLeft.length && !$titleEl.hasClass('t-left')) {
      $titleEl.before('<div class="head-left" style="width:' + $headRightW + 'px;" aria-hidden="true"></div>');
    } else if (!$headRight.length) {
      $titleEl.after('<div class="head-right" style="width:' + $headLeftW + 'px;" aria-hidden="true"></div>');
    } else if ($headLeftW > $headRightW) {
      $headRight.css('width', $headLeftW);
    } else if ($headRight > $headLeftW) {
      $headLeft.css('width', $headRightW);
    }
  },
  spaceAppend: function () {
    const $wrap = $('.page');
    if ($wrap.length) return;
    $wrap.each(function () {
      if (!$(this).find('.bottom-fixed-space').length) {
        $(this).append('<div class="bottom-fixed-space" aria-hidden="true"></div>');
      }
    });
  },
  space: function () {
    const $wrap = $('.page');
    if ($wrap.length) return;
    $wrap.each(function () {
      const $space = $(this).find('.bottom-fixed-space');
      if (!$space.length) return;
      const $spaceArryHeight = [];
      $(this)
        .find('.bottom-fixed')
        .not('.none-space')
        .each(function () {
          const $this = $(this);
          const $height = $this.children().outerHeight();
          if (!$this.hasClass('fixed-none')) $spaceArryHeight.push($height);
          if ($this.hasClass('is-restore')) $this.css('height', $height);
        });

      const $maxHeight = $spaceArryHeight.length ? Math.max.apply(null, $spaceArryHeight) : 0;
      $space.css('height', $maxHeight);
      const $floatingBtn = $(this).find('.floating-btn');
      if ($floatingBtn.length) $floatingBtn.css('bottom', $maxHeight === 0 ? 24 : $maxHeight + 10);
    });
  },
  spaceInit: function () {
    let i = 0;
    const repeatEvt = function () {
      if (i < 10) {
        ui.Common.space();
        setTimeout(repeatEvt, 100);
      }
      i += 1;
    };
    repeatEvt();
  },
  landscape: function () {
    //가로모드 막기
    if (ui.Mobile.any()) {
      const _landscapeDiv = '.landscape_lock';
      if (!$(_landscapeDiv).length) {
        const $landscapeHtml = '<div class="' + _landscapeDiv.substring(1) + '"><div class="tbl"><div class="td">이 사이트는 세로 전용입니다.<br />단말기를 세로모드로 변경해주세요.</div></div></div>';
        $('body').append($landscapeHtml);
      }
      $(_landscapeDiv)
        .unbind('touchmove')
        .bind('touchmove', function (e) {
          e.preventDefault();
        });
    }
  },
  scroll: function () {
    //top 버튼
    const btnTop = {
      button: '.btn-page-top',
      label: '컨텐츠 상단으로 이동',
      text: 'TOP',
      min: 100,
      onClass: 'on',
      hoverClass: 'hover',
      scrollSpeed: 300
    };

    const $wrap = $('.page');
    if (!$wrap.length) return;
    $wrap.each(function () {
      if (!$(this).find(btnTop.button).length) {
        let btnHtml = '';
        if ($(this).find('.page-body').hasClass('not-top-btn')) return;
        if (!$(this).find('.floating-btn').length) btnHtml += '<div class="floating-btn">';
        btnHtml += '<a href="#" class="btn ' + btnTop.button.substring(1) + '" title="' + btnTop.label + '" role="button" aria-label="' + btnTop.label + '">' + btnTop.text + '</a>';
        if (!$(this).find('.floating-btn').length) btnHtml += '</div>';
        if ($(this).find('.floating-btn').length) {
          $(this).find('.floating-btn').append(btnHtml);
        } else {
          $(this).append(btnHtml);
        }
      }
    });

    $(document)
      .off('click')
      .on('click', btnTop.button, function (e) {
        e.preventDefault();
        const $page = $(this).closest('.page');
        if ($page.hasClass('main-page')) {
          ui.Scroll.top(0, btnTop.scrollSpeed);
          $page.find($focusableEl).first().focus();
        }
      })
      .on('mouseenter', function () {
        $(btnTop.button).addClass(btnTop.hoverclass);
      })
      .on('mouseleave', function () {
        $(btnTop.button).removeClass(btnTop.hoverClass);
      });

    const btnTopOn = function () {
      $(btnTop.button).attr('aria-hidden', 'false').addClass(btnTop.onClass);
      $('.floating-btn').addClass('top-on');
    };

    const btnTopOff = function () {
      $(btnTop.button).attr('aria-hidden', 'true').removeClass(btnTop.onClass);
      $('.floating-btn').removeClass('top-on');
    };

    const showHideOn = function () {
      $('.scroll-hide').addClass('hidden');
    };
    const showHideOff = function () {
      $('.scroll-hide').removeClass('hidden');
    };

    let $lastSclTop = $(window).scrollTop();
    const $scrollEvt = function () {
      const $SclTop = $(window).scrollTop();
      const $header = $('#header');
      const $headerH = $header.outerHeight();
      const $spaceH = $('.bottom-fixed-space').outerHeight();
      const $bottom = parseInt($(btnTop.button).parent().css('bottom'));
      const $margin = 24;
      const $Height = window.innerHeight;
      const $scrollHeight = $('body').get(0).scrollHeight;
      if ($spaceH > 0 && $spaceH != $bottom - $margin) {
        $('.floating-btn').css('bottom', $spaceH === 0 ? $margin : $spaceH + 10);
      }

      if ($SclTop > btnTop.min && $lastSclTop !== $SclTop) {
        if ($('html').hasClass('input-focus') && ui.Mobile.any()) return;
        btnTopOn();
      } else {
        btnTopOff();
      }
      const $fadeTitle = $('.' + ui.Common.scrollShowTitleClass);
      const $headerTit = $header.find('h1');
      if ($fadeTitle.length && $headerTit.length) ui.Common.scrollShowTitle($fadeTitle[0], window, $header[0], $headerTit[0]);

      const $sclHead = $('.ui-header-bg-origin');
      if ($header.length && $sclHead.length) {
        if ($sclHead.offset().top - $headerH < $SclTop) {
          $header.addClass('bg-origin');
        } else {
          $header.removeClass('bg-origin');
        }
      }

      // 스크롤시 헤더 숨기기
      /*
      if ($SclTop < $lastSclTop) {
        if ($('.top-fixed.fixed-off').length) {
          $('.top-fixed').removeClass('fixed-off').removeCss('transform');
        }
      } else {
        if ($('.top-fixed').length && $header.length) {
          $('.top-fixed')
            .addClass('fixed-off')
            .css('transform', 'translateY(-' + $headerH + 'px)');
        }
      }
      */

      // 플로팅 바 스크롤시 숨기기
      /*
      if (ui.Common.isFloating) {
        if ($SclTop < $lastSclTop) {
          //위로 스크롤할때
          $('.floating-bar').removeClass('off');
          if ($('.top-fixed').length) $('.top-fixed').removeClass('off');
        } else {
          $('.floating-bar').addClass('off');
          if ($('.top-fixed').length) $('.top-fixed').addClass('off');
        }
        if ($SclTop + $Height > $scrollHeight - 3) {
          $('.floating-bar').removeClass('off').addClass('end');
        } else {
          $('.floating-bar').removeClass('end');
        }
      }
      */
      const $btnFixed = $('.btn-wrap.bottom-fixed');
      if ($btnFixed.length) {
        $btnFixed.each(function () {
          const $this = $(this);
          if ($this.hasClass('is-restore')) {
            const $top = $this.offset().top;
            const $bottom = $top + $this.children().outerHeight();
            if ($SclTop + $Height > $bottom) {
              $this.addClass('fixed-none');
            } else {
              $this.removeClass('fixed-none');
            }
          } else {
            if ($SclTop + $Height > $scrollHeight - 3) {
              $this.addClass('end-fixed');
            } else {
              $this.removeClass('end-fixed');
            }
          }
        });
      }

      setTimeout(function () {
        $lastSclTop = $SclTop;
      }, 50);

      if ($SclTop > 0 && !$('html').hasClass('input-focus')) {
        showHideOn();
      }
    };
    const $scrollEndEvt = function () {
      const $SclTop = $(window).scrollTop();
      if ($SclTop > btnTop.min) {
        btnTopOff();
      }
    };
    $(window).on('scroll resize', $scrollEvt);
    $(window).on(
      'scroll',
      _.debounce(function () {
        $scrollEndEvt();
      }, 1500)
    );
    $(window).on(
      'scroll',
      _.debounce(function () {
        showHideOff();
      }, 500)
    );

    $(document).on('click', '#container', function (e) {
      if (!$('html').hasClass('lock')) $(window).scroll();
    });
  },
  scrollShowTitleClass: 'page-fade-title',
  scrollShowTitle: function (target, wrap, header, titleEl) {
    const $fadeTitle = $(target);
    if (!$fadeTitle.length) return;
    const $wrap = $(wrap);
    const $header = $(header);
    const $headerTit = $(titleEl);
    const $SclTop = $wrap.scrollTop();
    const $headerH = $header.outerHeight();
    if (!$headerTit.hasClass('scl-title-hide')) $headerTit.addClass('scl-title-hide');

    const $fadeTitleTop = getOffset($fadeTitle[0]).top;
    const $fadeTitleHeight = $fadeTitle.outerHeight();
    const $fadeTitleEnd = $fadeTitleTop + $fadeTitleHeight;
    if ($SclTop < $fadeTitleEnd) {
      const $topMargin = Math.max(ui.Common.getTopFixedHeight($fadeTitle), $headerH);
      let $opacityVal = Math.max(0, $SclTop + $topMargin - $fadeTitleTop) / $fadeTitleHeight;
      $opacityVal = Math.max(0, Math.min(1, Math.round(($opacityVal + Number.EPSILON) * 100) / 100));

      if ($opacityVal === 0) {
        $headerTit.removeAttr('style');
      } else {
        $headerTit.css({
          opacity: $opacityVal,
          transform: 'translateY(' + (100 - $opacityVal * 100) + '%)'
        });
      }
    } else {
      $headerTit.css({
        opacity: 1,
        transform: 'translateY(0%)'
      });
      // if ($headerTit.hasClass('scl-title-hide')) $headerTit.removeClass('scl-title-hide').removeAttr('style');
    }
  },
  guide: function () {
    const themeColorChange = function () {
      const $path = location.pathname;
      if ($path.indexOf('/html/guide') > -1) {
        // if(!$('.gd__theme_color').length){
        // }
        let $html = '<div class="gd__theme_color">';
        $html += '<button type="button" class="gd__theme_btn"><i class="i-ico-arr-right-24" aria-hidden="true"></i></button>';
        $html += '<dl>';
        $html += '<dt>메인컬러 변경</dt>';
        $html += '<dd>';
        $html += '<input type="color">';
        $html += '<div>';
        $html += '<div class="color"></div>';
        $html += '<div class="reset"><button type="button">리셋</button></div>';
        $html += '</div>';
        $html += '</dd>';
        $html += '</dl>';
        $html += '</div>';
        $('body').append($html);

        const $baseThemeColor = '#00caca';
        const $input = $('.gd__theme_color input');
        const $color = $('.gd__theme_color .color');
        const $openBtn = $('.gd__theme_btn');
        const $resetBtn = $('.gd__theme_color .reset button');
        const $themeColor = uiCookie.get('theme-color') !== '' ? uiCookie.get('theme-color') : $baseThemeColor;

        const setColor = function (colorStr) {
          $input.val(colorStr);
          $color.text(colorStr);
          if ($baseThemeColor !== colorStr) {
            $('html').css('--primary-color', colorStr);
            const $rgb = hexToRgb(colorStr.substring(1));
            $('html').css('--primary-color-rgb', $rgb);
            uiCookie.set('theme-color', colorStr);
          } else {
            $('html').removeCss('--primary-color');
            $('html').removeCss('--primary-color-rgb');
            uiCookie.set('theme-color', '');
          }
        };
        setColor($themeColor);

        $openBtn.on('click', function (e) {
          e.preventDefault();
          $('.gd__theme_color').toggleClass('open');
        });

        $input.on('input', function () {
          const $val = $(this).val();
          setColor($val);
        });

        $resetBtn.on('click', function (e) {
          e.preventDefault();
          setColor($baseThemeColor);
        });
      }
    };
    themeColorChange();
  },
  lottie: function () {
    const $lottie = $('[data-lottie]');
    if (!$lottie.length) return;
    if (!location.host) {
      return console.log('lottie는 서버에서만 지원됩니다.');
    }
    const $lottieInit = function () {
      $lottie.each(function () {
        const $this = $(this);
        // $(this).empty();
        if (!$this.hasClass('lottie__init')) {
          const $data = $this.data('lottie');
          $this.addClass('lottie__init').removeAttr('data-lottie').aria('hidden', true);
          const $loopOpt = $this.hasClass('_loop');
          const $stopOpt = $this.hasClass('_stop');
          const $sclAnimation = $this.data('animation');
          let $autoplayOpt = true;
          if ($sclAnimation || $stopOpt) {
            $autoplayOpt = false;
          }
          const $lottieOpt = lottie.loadAnimation({
            container: this,
            renderer: 'svg',
            loop: $loopOpt,
            autoplay: $autoplayOpt,
            path: $data
          });
          $(this).data('lottie-opt', $lottieOpt);
        }
      });
    };
    if (typeof lottie === 'undefined') {
      const $url = ui.basePath + '/js/lib/lottie.5.7.13.min.js';
      ui.Util.loadScript($url, $lottieInit);
    } else {
      $lottieInit();
    }
  },
  init: function () {
    ui.Common.page();
    ui.Common.header();
    ui.Common.spaceAppend();
    ui.Common.spaceInit();
    ui.Common.scroll();
    // ui.Common.landscape();

    ui.Common.guide();

    ui.Common.fixed('#header');
    ui.Common.fixed('.tab-fixed');
  }
};
ui.Util = {
  console: function (txt, delay) {
    if (delay == undefined) delay = 3000;
    const $consoles = $('.console');
    let $top = 0;
    let $last = '';
    if ($consoles.length) {
      $last = $('.console').last();
      $top = parseInt($last.css('top')) + $last.outerHeight();
    }
    const $wrap = $('#wrap').length ? $('#wrap') : $('body');
    $wrap.append('<div class="console">' + txt + '</div>');
    $last = $('.console').last();
    if ($top > 0) $last.css('top', $top);
    $last.delay(delay).fadeOut(500, function () {
      $(this).remove();
    });
  },
  path: function (type) {
    let $path = location.pathname;
    let $returnVal = $path;
    if ($.isNumeric(type)) {
      if ($path.indexOf('/') >= 0) {
        $path = $path.split('/');
        $returnVal = $path[type];
      }
    } else if (type === 'file') {
      if ($path.indexOf('/') >= 0) $returnVal = $path.split('/').pop();
    } else if (type === 'fileName') {
      if ($path.indexOf('/') >= 0) $path = $path.split('/').pop();
      if ($path.indexOf('.') >= 0) {
        $returnVal = $path.split('.').shift();
      } else {
        $returnVal = $path;
      }
    } else if (type === 'fileType') {
      if ($path.indexOf('/') >= 0) $path = $path.split('/').pop();
      if ($path.indexOf('.') >= 0) {
        $returnVal = $path.split('.').pop();
      } else {
        $returnVal = null;
      }
    }
    return $returnVal;
  },
  debounce: function (fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, arguments);
      }, delay);
    };
  },
  throttle: function (fn, delay) {
    let timer;
    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(this, arguments);
        }, delay);
      }
    };
  },
  loadScript: function (url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      //Others
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  paint: function () {
    if (!$('.smooth-corners').length) return;
    const $url = ui.basePath + '/js/lib/paint.min.js';
    if (CSS && 'paintWorklet' in CSS) CSS.paintWorklet.addModule($url);
  },
  canvasRotateImg: function (target, src, deg) {
    const image = document.createElement('img');
    image.onload = function () {
      drawRotated(deg);
    };
    image.src = src;

    const canvas = target;

    const drawRotated = function (degrees) {
      // if (canvas) document.body.removeChild(canvas);
      // canvas = document.createElement("canvas");
      // const canvas = document.getElementById("canvas");

      const ctx = canvas.getContext('2d');

      if (degrees == 90 || degrees == 270) {
        canvas.width = image.height;
        canvas.height = image.width;
      } else {
        canvas.width = image.width;
        canvas.height = image.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (degrees == 90 || degrees == 270) {
        ctx.translate(image.height / 2, image.width / 2);
      } else {
        ctx.translate(image.width / 2, image.height / 2);
      }
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      // document.body.appendChild(canvas);
    };
  },
  iframe: function () {
    /*
    if ($('iframe').length) {
      $('iframe').each(function () {
        const $this = $(this);
        let $src = $this.attr('src');
        console.log($src.indexOf('//') < 0, $src.indexOf('//') > 9, $src.indexOf('../') !== 0);
        if (($src.indexOf('//') < 0 || $src.indexOf('//') > 9) && $src.indexOf('../') !== 0) {
          console.log('aaa');
          if (location.pathname.indexOf('/kyobo-mydata-pub/') > -1) $src = '/kyobo-mydata-pub' + $src;
          if (location.pathname.indexOf('mykkl.com/') > -1 && location.pathname.indexOf('/front/') === 0) {
            $src = $src.replace('/front/', '/');
            $src = '/mydata/resources/static' + $src;
          }
          $this.attr('src', $src);
        }
      });
    }
    */

    if ($('iframe.load-height').length) {
      const iframeHeight = function () {
        $('iframe.load-height').each(function () {
          const $this = $(this);
          const $thisH = $(this).height();
          const $bodyH = $this.contents().find('body').height();
          if (!!$bodyH && $thisH < $bodyH) $this.height($bodyH);
        });
      };

      iframeHeight();
      setTimeout(function () {
        iframeHeight();
      }, 1000);
    }
  },
  lazyImg: function () {
    let lazyloadImages;
    let lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll('.lazy');
    if (!lazyloadImages.length) return false;
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const image = entry.target;
            if (image.dataset.src) image.src = image.dataset.src;
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      const lazyload = function () {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          const scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
            window.removeEventListener('orientationChange', lazyload);
          }
        }, 20);
      };

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
      window.addEventListener('orientationChange', lazyload);
    }
  },
  reInit: function () {
    ui.Util.iframe();
    ui.Util.lazyImg();
  },
  init: function () {
    ui.Util.paint();
    ui.Util.iframe();
    ui.Util.lazyImg();
  }
};

//버튼 관련
ui.Button = {
  winLoad: function () {
    //링크없는 a태그 role=button 추가
    $('a').each(function (e) {
      const $href = $(this).attr('href');
      const $role = $(this).attr('role');
      // const $onclick = $(this).attr('onclick');
      if (!$(this).hasClass('no-button')) {
        if ($href == undefined || $href == '#' || $href == '#none') {
          if ($href == undefined || $href == '#') $(this).attr({ href: '#none' });
          $(this).removeAttr('target');
          if ($role == undefined) $(this).attr('role', 'button');
        } else {
          if (($href.startsWith('#') || $href.startsWith('javascript')) && $role == undefined) $(this).attr('role', 'button');
        }
      }

      if ($(this).attr('title') === undefined) {
        if ($(this).attr('target') === '_blank') $(this).attr('title', '새창열림');
        if ($(this).hasClass('tel') || ($href != undefined && $href.startsWith('tel'))) $(this).attr('title', '전화걸기');
        // if ($onclick != undefined && $onclick.startsWith('callMakeCall')) $(this).attr('title', '전화걸기');
      }
    });

    //type없는 button들 type 추가
    $('button').each(function (e) {
      const $type = $(this).attr('type');
      if ($type == undefined) $(this).attr('type', 'button');
    });

    const $last = $('#container > .btn-wrap.bottom-fixed:last-child');
    const $section = $last.prev('.section');
    if ($last.length && $section.length) {
      $section.addClass('last');
    }
  },
  default: function () {
    //href가 #시작할때 a태그 클릭 시 기본속성 죽이기
    $(document).on('click', 'a', function (e) {
      const $href = $(this).attr('href');
      const $target = $(this).attr('target');
      if (!$(this).hasClass('no-button') && $href != undefined) {
        //기본속성 살리는 클래스(스킵네비 등)
        if ($href.startsWith('#')) {
          e.preventDefault();
        }
      }

      // 앱에서 새창열기
      if (ui.Device.app()) {
        if ($target === '_blank' && typeof webviewInterface === 'object' && typeof webviewInterface.goOutLink === 'function') {
          e.preventDefault();
          webviewInterface.goOutLink($href);
        }
      }
    });
  },
  disabled: function () {
    $('a[aria-disabled]').each(function () {
      if (!$(this).hasClass('disabled')) $(this).removeAttr('aria-disabled');
    });
    $('a.disabled').each(function () {
      $(this).attr('aria-disabled', 'true');
    });
  },
  disabledChk: function () {
    const checking = function () {
      setTimeout(function () {
        ui.Button.disabled();
      }, 100);
    };
    $(document).on('click', 'a, button', function () {
      checking();
    });
    $(document).on('change', 'input', function () {
      checking();
    });
  },
  reset: function () {
    if ($('.btn-click-in').length) $('.btn-click-in').remove();
  },
  effect: function () {
    //버튼 클릭 효과
    const btnInEfList = '.button, .btn-click, .btn-click-outer, .radio.btn input, .checkbox.btn input, .ui-folding-btn, .ui-folding .folding-head .folding-btn';
    $(document).on('click', btnInEfList, function (e) {
      const $this = $(this);
      let $btnEl = $this;
      if (!$btnEl.is('a') && !$btnEl.is('button') && !$btnEl.is('input')) return;
      if ($btnEl.is('input')) $btnEl = $btnEl.siblings('.lbl');
      if ($btnEl.hasClass('btn-click-outer')) $btnEl = $btnEl.offsetParent();
      const $delay = 650;
      if ($btnEl.is('.disabled') || $btnEl.is('.btn-heart') || $btnEl.is('.btn-click-not')) return;
      let $bgColor = $btnEl.css('background-color') ? rgba2hex($btnEl.css('background-color')) : '#ffffff';
      let $bgAlpha = 0;
      if ($bgColor.length > 7) {
        const $tempColor = $bgColor;
        $bgColor = $tempColor.substr(0, 7);
        $bgAlpha = 255 - parseInt($tempColor.substr(7, 2), 16);
      }
      const $bgColorVal = Math.max($bgAlpha, Math.round(getBgBrightValue($bgColor)));
      const isBalck = $bgColorVal < 50 ? true : false;
      if (!$btnEl.find('.btn-click-in').length) $btnEl.addClass('btn-clicking-active').append('<i class="btn-click-in"></i>');
      // $btnEl.append('<i class="btn-click-in"></i>');
      const $btnIn = $btnEl.find('.btn-click-in').last();
      if (isBalck) $btnIn.addClass('white');
      const $btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight());

      const $btnX = e.pageX - $btnEl.offset().left - $btnMax / 2;
      const $btnY = e.pageY - $btnEl.offset().top - $btnMax / 2;
      // const $btnX = e.offsetX - $btnMax / 2;
      // const $btnY = e.offsetY - $btnMax / 2;
      $btnIn
        .css({
          left: $btnX,
          top: $btnY,
          width: $btnMax,
          height: $btnMax
        })
        .addClass('animate')
        .delay($delay)
        .queue(function (next) {
          $btnIn.remove();
          $btnEl.removeClass('btn-clicking-active');
          next();
        });
    });
  },
  star: function () {
    $(document).on('click', '.ico-star-wrap > button', function (e) {
      e.preventDefault();
      const $idx = $(this).index();
      const $title = $(this).attr('title');
      const $closest = $(this).closest('.ico-star-wrap');
      $closest.attr('data-on', $idx + 1);
      $closest.find('.txt').text($title);
    });
  },
  imgBox: function () {
    $(document).on('click', '.ui-expend .ui-img', function (e) {
      e.preventDefault();
      const $this = $(this);
      let $el = $this;
      let $idx = $el.index();
      let $parent = $el.parent();
      while (!$parent.hasClass('ui-expend')) {
        $el = $parent;
        $idx = $el.index();
        $parent = $el.parent();
      }
      const $children = $parent.children();
      Layer.imgBox($children, $idx);
    });
  },
  tap: function () {
    let $idx = 0;
    const appendItem = function (length, type) {
      let $append = '';
      let rdLeft;
      let rdTop;
      for (let i = 0; i < length; i++) {
        if (type === 'heart') {
          rdLeft = length <= 20 ? randomNumber(0, 20, 0) * 8 : randomNumber(0, length, 0) * (160 / length);
          rdLeft -= 80;
          rdTop = length <= 10 ? randomNumber(0, 10, 0) * 5 : randomNumber(0, length, 0) * (50 / length);
        } else {
          rdLeft = length <= 40 ? randomNumber(0, 40, 0) * 5 : randomNumber(0, length, 0) * (200 / length);
          rdLeft -= 100;
          if (type === 'confetti') {
            rdTop = length <= 12 ? randomNumber(0, 12, 0) * 5 : randomNumber(0, length, 0) * (60 / length);
          } else {
            rdTop = length <= 15 ? randomNumber(0, 15, 0) * 10 : randomNumber(0, length, 0) * (150 / length);
          }
        }
        $append += '<i style="left:' + rdLeft + 'px;top:' + rdTop * -1 + 'px;" class="item-' + ((i % 3) + 1) + '">';
        if (type === 'confetti') {
          $append += '<s style="';
          if (i % 2 === 0) $append += 'border-radius:50%;';
          const $skewMax = 8;
          const $skewDeg = 10;
          const $skew = randomNumber(0, $skewMax, 0) * $skewDeg - ($skewMax * $skewDeg) / 2;
          $append += 'transform:skewX(' + $skew + 'deg);';
          $append += '"></s>';
        }
        $append += '</i>';
        // $append += '<i></i>';
      }
      return $append;
    };
    const eventType = ui.Mobile.any() ? 'touchstart' : 'click';
    $('.ui-tap-area').on(eventType, function (e) {
      // e.preventDefault();
      const $this = $(this);
      const $thisTop = $this.offset().top;
      const $thisLeft = $this.offset().left;
      const $sclTop = $(window).scrollTop();
      const $sclLeft = $(window).scrollLeft();
      const $tapY = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
      const $tapX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      const $tapTop = $tapY - $thisTop + $sclTop;
      const $tapLeft = $tapX - $thisLeft + $sclLeft;
      let $appendLength = $this.data('append');
      if ($appendLength === undefined) $appendLength = $this.hasClass('confetti') ? 20 : 10;

      let $typeClass;
      if ($this.hasClass('coin')) $typeClass = 'coin';
      if ($this.hasClass('heart')) $typeClass = 'heart';
      if ($this.hasClass('confetti')) $typeClass = 'confetti';
      const $append = appendItem($appendLength, $typeClass);
      const $itemClass = 'ui-tap-item__' + $idx;
      $idx += 1;
      const $item = '<div class="ui-tap-item active ' + $typeClass + ' ' + $itemClass + '" style="top:' + $tapTop + 'px;left:' + $tapLeft + 'px;">' + $append + '</div>';
      $(this).append($item);
      $('.' + $itemClass).one('animationend', function (e) {
        $('.' + $itemClass).remove();
      });
    });
    $('.ui-tap-item.once').each(function () {
      const $this = $(this);
      let $typeClass;
      let $length = 10;
      if ($this.hasClass('coin')) $typeClass = 'coin';
      if ($this.hasClass('heart')) $typeClass = 'heart';
      if ($this.hasClass('confetti')) {
        $typeClass = 'confetti';
        $length = 20;
      }
      const $append = appendItem($length, $typeClass);
      $this.append($append);
    });
  },
  loading: function (element, show) {
    const $element = $(element);
    if (show === undefined) show = true;
    if (!$element) return;
    const $elW = $element.outerWidth();
    const $elH = $element.outerHeight();
    const $min = $elW < $elH ? $elW / 2 : $elH / 2;
    // const $max = $elW < $elH ? $elH : $elW;
    let $html = '<div class="loading-svg" role="img">';
    $html += '<svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">';
    $html += '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>';
    $html += '</svg>';
    $html += '</div>';
    let showTimer;
    let hideTimer;
    if (show) {
      clearTimeout(hideTimer);
      $element.addClass('loading');
      $element.append($html);
      showTimer = setTimeout(function () {
        $element.css('clip-path', 'circle(' + $min + 'px at 50% 50%)');
      }, 1);
    } else {
      clearTimeout(showTimer);
      $element.removeCss('clip-path');
      hideTimer = setTimeout(function () {
        $element.find('.loading-svg').remove();
        $element.removeClass('loading');
      }, 500);
    }
  },
  etc: function () {
    $(document).on('click', '.search-opt-wrap .btn-select', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $wrap = $('.search-opt-wrap');
      if (!$this.hasClass('open')) {
        $this.addClass('open');
        $wrap.addClass('expend');
        ui.Scroll.top(0, 0);
        setTimeout(function () {
          Body.lock();
        }, 100);
      } else {
        $this.removeClass('open');
        $wrap.removeClass('expend');
        Body.unlock();
      }
    });
    $(document).on('click', '.search-opt-wrap .bg', function (e) {
      e.preventDefault();
      const $btn = $('.search-opt-wrap .btn-select');
      const $wrap = $('.search-opt-wrap');
      $btn.removeClass('open');
      $wrap.removeClass('expend');
      Body.unlock();
    });
  },
  overlay: function () {
    if ($('.user-detail-talk-box').length) {
      $(document).on('click', '.user-detail-talk .btn-menu', function () {
        const $this = $(this);
        const $next = $this.next();
        const $dataTimer = $next.data('timer');
        if ($dataTimer) clearTimeout($dataTimer);
        $next.addClass('on');
        let timer = setTimeout(function () {
          $next.removeClass('on');
          $next.removeData('timer');
        }, 3000);
        $next.data('timer', timer);
        return false;
      });

      // 버튼 외 터치시 숨김
      $(document).on('touchstart', function (e) {
        const $btnOverlay = $('.btn-menu-over.on');
        if ($btnOverlay.length) {
          const $target = $(e.target);
          if ($target.hasClass('button') && $target.parent().hasClass('btn-group')) return;
          $btnOverlay.each(function () {
            const $dataTimer = $(this).data('timer');
            if ($dataTimer) clearTimeout($dataTimer);
            $(this).removeClass('on');
            $(this).removeData('timer');
          });
        }
      });
    }
  },
  reInit: function () {
    ui.Button.winLoad();
    ui.Button.disabled();
  },
  init: function () {
    ui.Button.default();
    ui.Button.disabledChk();
    ui.Button.reset();
    ui.Button.effect();
    ui.Button.star();
    ui.Button.imgBox();
    ui.Button.tap();
    ui.Button.etc();
    ui.Button.overlay();
    ui.Tab.init();

    ui.Touch.init();
  }
};
// 탭
ui.Tab = {
  aria: function (element) {
    if ($(element).length) {
      $(element).each(function () {
        const $this = $(this);
        let $tablist = null;
        let isFirst = false;
        if ($this.is('ul') || $this.hasClass('.tab-list')) {
          $tablist = $this;
        } else if ($this.find('.tab-list').length) {
          $tablist = $this.find('.tab-list');
        } else {
          $tablist = $this.find('ul');
        }
        if ($tablist.attr('role') != 'tablist') isFirst = true;
        if (isFirst) $tablist.attr('role', 'tablist');

        let $tab = $(this).find('.tab');
        if (!$tab.length) $tab = $(this).find('li');
        $tab.each(function (f) {
          const _a = $(this).find('a');
          if (_a.length) {
            if (isFirst) $(this).attr('role', 'presentation');
            if (isFirst) _a.attr('role', 'tab');
            if ($(this).hasClass('active')) {
              _a.attr('aria-selected', true);
            } else {
              _a.attr('aria-selected', false);
            }
          }
        });
      });
    }
  },
  ariaSet: function () {
    if ($('.tab-navi-menu').length) ui.Tab.aria('.tab-navi-menu');
    if ($('.tab-box-menu').length) ui.Tab.aria('.tab-box-menu');
    if ($('.is-tab').length) ui.Tab.aria('.is-tab');
    if ($('.ui-tab').length) ui.Tab.aria('.ui-tab');
  },
  line: function (wrap, isAni) {
    if (isAni === undefined) isAni = true;
    let $wrap = $(wrap);
    if ($wrap.hasClass('tab-inner')) $wrap = $wrap.parent();
    if ($wrap.hasClass('tab-list')) $wrap = $wrap.closest('.tab-inner').parent();

    const $delay = $wrap.is(':visible') ? 0 : 10;
    setTimeout(function () {
      const $line = $wrap.find('.tab-line');
      if (!$line.length) return;
      const $LastLeft = $line.data('left') === undefined ? 0 : $line.data('left');
      const $LastWidth = $line.data('width') === undefined ? 0 : $line.data('width');
      const $inner = $wrap.find('.tab-inner');
      const $innerSclWidth = $inner.get(0).scrollWidth;
      const $innerSclGap = $innerSclWidth - $inner.outerWidth();
      // const $innerSclLeft = $inner.get(0).scrollLeft;
      const $isTy2 = $line.hasClass('ty2');
      const $list = $wrap.find('.tab-list');
      const $listLeft = parseInt($list.css('margin-left'));
      const $active = $wrap.find('.active');
      const $tabBtn = $active.find('a');
      // const $tabWidth = $tabBtn.get(0).offsetWidth;
      // const $tabLeft = $active.get(0).offsetLeft + $tabBtn.get(0).offsetLeft;
      const $tabWidth = $tabBtn.outerWidth();
      const $tabLeft = $listLeft + $active.position().left + $tabBtn.position().left;
      const $tabRight = $innerSclWidth - $tabLeft - $tabWidth - $innerSclGap;
      if ($LastLeft === $tabLeft && $LastWidth === $tabWidth) return;
      if ($isTy2) {
        if (isAni) {
          const $delay = $innerSclGap < 10 ? 0 : 200;
          if ($LastLeft < $tabLeft) {
            $line
              .stop(true, false)
              .delay($delay)
              .animate(
                {
                  right: $tabRight
                },
                200,
                function () {
                  $wrap.addClass('tab-line-moving');
                  $line.css({
                    left: $tabLeft
                  });
                }
              );
          } else {
            $line
              .stop(true, false)
              .delay($delay)
              .animate(
                {
                  left: $tabLeft
                },
                200,
                function () {
                  $wrap.addClass('tab-line-moving');
                  $line.css({
                    right: $tabRight
                  });
                }
              );
          }
        } else {
          $line.css({
            left: $tabLeft,
            right: $tabRight
          });
        }
      } else {
        if (isAni) $wrap.addClass('tab-line-moving');
        $line.css({
          width: $tabWidth,
          left: $tabLeft
        });
      }
      if (isAni) {
        const transitionEndEvt = function () {
          $wrap.removeClass('tab-line-moving');
          $line.off('transitionend', transitionEndEvt);
        };
        $line.on('transitionend', transitionEndEvt);
      }
      $line.data('left', $tabLeft);
      $line.data('width', $tabWidth);
    }, $delay);
  },
  getInnerTxt: function (wrap) {
    let $wrap = $(wrap);
    if ($wrap.hasClass('tab-inner')) $wrap = $wrap.parent();
    if ($wrap.hasClass('tab-list')) $wrap = $wrap.parent().parent();
    const $firstClass = $wrap.attr('class').split(' ')[0];
    let $innerTxt = $firstClass;
    $wrap.find('.tab').each(function () {
      $innerTxt += ',' + $(this).text();
    });
    return $innerTxt;
  },
  tabInfoAry: null,
  tabInfo: function () {
    const $tabInfoSaveString = uiStorage.get('tabInfoSave');
    if ($tabInfoSaveString !== null) ui.Tab.tabInfoAry = JSON.parse($tabInfoSaveString);

    const _tabInfoSave = function () {
      if (!$('.tab-inner').length) {
        uiStorage.remove('tabInfoSave');
      } else {
        const $saveAry = [];
        $('.tab-inner').each(function () {
          const stateObj = {};
          const $innerTxt = ui.Tab.getInnerTxt(this);
          const $sclLeft = $(this).scrollLeft();
          const $line = $(this).find('.tab-line');
          const $lineLeft = parseInt($line.css('left'));
          const $lineWidth = parseInt($line.css('width'));
          stateObj.innerText = $innerTxt;
          stateObj.lineLeft = $lineLeft;
          stateObj.lineWidth = $lineWidth;
          stateObj.sclLeft = $sclLeft;
          $saveAry.push(stateObj);
        });
        if ($saveAry.length) uiStorage.set('tabInfoSave', JSON.stringify($saveAry));
      }
    };
    window.addEventListener('beforeunload', _tabInfoSave); // 안드로이드 크롬
    // window.addEventListener('unload', _tabInfoSave);
    if (ui.Mobile.iOS()) {
      window.addEventListener('pagehide', _tabInfoSave); //ios safari
    }
  },
  scrolledCheck: function (wrap) {
    if (!$(wrap).length) return;
    $(wrap).each(function () {
      const $this = $(this);
      const $children = $this.children();
      const $isScrollX = ui.Scroll.is($children).x;
      const $btnClass = 'tab-expand-btn';
      const $btn = '<div class="' + $btnClass + '"><button type="button" aria-label="펼쳐보기" aria-expanded="false"></button></div>';
      if ($isScrollX) {
        $this.addClass('scroll-able');
        if ($this.hasClass('tab-navi-menu') && !$this.find('.' + $btnClass).length) $this.append($btn);
      } else {
        $this.removeClass('scroll-able');
        if ($this.hasClass('tab-navi-menu') && $this.find('.' + $btnClass).length) $this.find('.' + $btnClass).remove();
      }
    });
  },
  activeCenter: function () {
    if ($('.tab-inner').length) {
      $('.tab-inner').each(function (i) {
        const $this = $(this);
        if (i === $('.tab-inner').length - 1) {
          setTimeout(function () {
            ui.Tab.isTabInit = true;
          }, 5);
        }
        if ($this.closest('.ui-tab').length) return;

        const $line = $this.find('.tab-line');
        let isMove = false;
        let $delay = 1;

        if ($line.length) {
          const $innerTxt = ui.Tab.getInnerTxt(this);
          $.each(ui.Tab.tabInfoAry, function () {
            if (this.innerText === $innerTxt) {
              isMove = true;
              $delay = 50;
              $line.css({
                left: this.lineLeft,
                width: this.lineWidth
              });
              $this.scrollLeft(this.sclLeft);
            }
          });
        }

        if ($this.closest('.tab-navi-menu').length || $this.closest('.tab-box-menu').length) $delay = 50;
        setTimeout(function () {
          const $active = $this.find('.active');
          if ($active.length) {
            ui.Scroll.center($active, $delay * 10);
            ui.Tab.line($this, isMove);
          }
        }, $delay);
      });
    }
  },
  active: function (target) {
    ui.Tab.tabActive(target);
    const $target = $(target);
    const $btn = $target.is('a') ? $target : $target.find('a');
    const $href = $btn.attr('href');
    ui.Tab.panelActive($href);
  },
  tabActive: function (target) {
    const $target = $(target);
    const $closest = $target.closest('.tab-inner').length ? $target.closest('.tab-inner') : $target.closest('.tab-list');
    const $btn = $target.is('a') ? $target : $target.find('a');
    const $tab = $btn.closest('.tab').length ? $btn.closest('.tab') : $btn.closest('li');

    $tab.addClass('active').siblings().removeClass('active').find('a').removeAttr('title').attr('aria-selected', false);
    $btn.attr('aria-selected', true);
    if ($closest.length) ui.Tab.line($closest);
  },
  panelActive: function (panel, siblings, isAni, isScroll) {
    if (isAni === undefined) isAni = false;
    if (isScroll === undefined) isScroll = false;
    const $panel = $(panel);
    const $siblings = $(siblings);
    if (!$panel.length && !$siblings.length) return;
    const $isPanel = $panel.hasClass('tab-panel') || $siblings.hasClass('tab-panel');
    let $panelWrap = null;
    if ($panel.length) $panelWrap = $panel.closest('.tab-panels');
    if ($panelWrap === null) {
      const $siblingsSpl = siblings.split(',');
      if ($($siblingsSpl[0]).length) $panelWrap = $($siblingsSpl[0]).closest('.tab-panels');
    }
    if ($panelWrap.hasClass('tab-swipe-panels')) {
      const $swiper = $panelWrap.data('swiper');
      if ($swiper !== undefined && isAni) {
        // $swiper.slideTo($panel.index(), isAni ? 500 : 0);
        $swiper.slideTo($panel.index(), 300);
      }
    } else {
      const $panelWrapH = $panelWrap === null ? 0 : $panelWrap.outerHeight();
      const $panelWrapGap = $panelWrap === null ? 0 : $panelWrapH - $panelWrap.height();
      if (siblings === undefined || siblings === false || siblings === '') {
        if ($isPanel) {
          $panel.siblings('.tab-panel').attr('aria-expanded', false).removeClass('active');
          $panel.addClass('active').attr('aria-expanded', true);
        } else {
          $panel.show();
        }
      } else {
        if ($isPanel) {
          $siblings.attr('aria-expanded', false).removeClass('active');
          $panel.addClass('active').attr('aria-expanded', true);
        } else {
          $siblings.hide();
          $panel.show();
        }
      }
      if ($isPanel && isAni && $panelWrap.length) {
        let $setHeight = $panelWrapGap;
        $panelWrap.find('.tab-panel.active').each(function () {
          $setHeight += $(this).outerHeight();
        });
        if ($panelWrapH !== $setHeight) {
          $panelWrap.css('height', $panelWrapH).animate({ height: $setHeight }, 300, function () {
            $panelWrap.removeCss('height');
            if ($panel.length && isScroll) {
              const $tabBtn = $('[href="#' + panel + '"]');
              const $tab = $tabBtn.length ? $tabBtn.closest('.tab-inner') : panel;
              ui.Scroll.inScreen($tab, panel);
            }
          });
        }
      }
    }
  },
  select: function () {
    if ($('.ui-tab-select').length) {
      $('.ui-tab-select').each(function () {
        const $tarAry = [];
        let $panel;
        $(this)
          .find('option')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).is(':selected')) {
              $panel = $tar;
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        ui.Tab.panelActive($panel, $siblings);
      });
    }
  },
  radio: function () {
    if ($('.ui-tab-radio').length) {
      $('.ui-tab-radio').each(function () {
        let $panel;
        const $tarAry = [];
        $(this)
          .find('input[type=radio]')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).prop('checked')) {
              $panel = $tar;
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        if ($panel) ui.Tab.panelActive($panel, $siblings);
      });
    }
  },
  checkbox: function () {
    if ($('.ui-tab-check').length) {
      $('.ui-tab-check').each(function () {
        const $tarAry = [];
        const $showAry = [];
        $(this)
          .find('input[type=checkbox]')
          .each(function () {
            const $tar = $(this).data('show');
            if ($tarAry.indexOf($tar) < 0 && !!$tar) $tarAry.push($tar);
            if ($(this).prop('checked')) {
              if ($showAry.indexOf($tar) < 0 && !!$tar) $showAry.push($tar);
            }
          });
        const $siblings = $tarAry.join(',');
        $(this).data('hide', $siblings);
        if ($showAry.length) {
          const $panel = $showAry.join(',');
          ui.Tab.panelActive($panel, $siblings);
        }
      });
    }
  },
  swipe: function (element) {
    const $element = $(element);
    $element.each(function () {
      const $this = $(this);
      $this.addClass('_autoHeight');
      $this.attr('data-view', 1);
      ui.Swiper.ready($this);

      const $tabChageEvt = function (e) {
        const $index = e.realIndex;
        const $activePanel = $(e.slides[$index]);
        const $activePanelId = $activePanel.attr('id');
        const $activeBtn = $('[href="#' + $activePanelId + '"]');

        $this.find('.swiper-slide').attr({
          'aria-expanded': false,
          'aria-hidden': true
        });
        $activePanel.attr('aria-expanded', true).removeAttr('aria-hidden');
        if ($activeBtn.length) ui.Tab.tabActive($activeBtn);
      };
      ui.Swiper.base($this, $tabChageEvt);

      $this.find('.swiper-slide').attr({
        'aria-expanded': false,
        'aria-hidden': true
      });
      $this.find('.swiper-slide.swiper-slide-active').attr('aria-expanded', true).removeAttr('aria-hidden');
    });
  },
  isTabInit: false,
  ready: function () {
    if ($('.tab-navi-menu').length) ui.Tab.scrolledCheck('.tab-navi-menu');
    ui.Tab.activeCenter();

    if ($('.tab-swipe-panels').length) {
      ui.Tab.swipe('.tab-swipe-panels');
    }

    const $uiTab = $('.ui-tab');
    const $hash = location.hash;
    if ($uiTab.length) {
      $uiTab.each(function (e) {
        const $this = $(this);
        let $hashActive = null;
        const $tarAry = [];
        let $tab = $this.find('.tab');
        if (!$tab.length) $tab = $this.find('li');
        $tab.each(function (f) {
          const _a = $(this).find('a');
          let _aId = _a.attr('id');
          const _href = _a.attr('href');
          if (_a.length && $(_href).length) {
            if (!_aId) _aId = 'tab_btn_' + e + '_' + f;
            if (_href !== '' && _href !== '#') $tarAry.push(_href);
            _a.attr({
              id: _aId,
              'aria-controls': _href.substring(1)
            });
            $(_href).attr({
              role: 'tabpanel',
              'aria-labelledby': _aId
            });
            if (_href === $hash || $(_href).find($hash).length) {
              $hashActive = _a;
            }
          }
        });
        if ($tarAry.length) $this.data('target', $tarAry.join(','));

        let $active;
        if ($hashActive) {
          $active = $hashActive;
        } else if ($this.find('.active').length) {
          $active = $this.find('.active').find('a');
        } else {
          $active = $this.find('li').eq(0).find('a');
        }
        ui.Tab.tabActive($active);
        const $href = $active.attr('href');
        ui.Tab.panelActive($href);
      });
    }

    ui.Tab.select();
    ui.Tab.radio();
    ui.Tab.checkbox();
  },
  resizeInit: false,
  resize: function () {
    if (!ui.Tab.resizeInit) {
      setTimeout(function () {
        ui.Tab.resizeInit = true;
      }, 500);
      return;
    }
    if ($('.tab-navi-menu').length) ui.Tab.scrolledCheck('.tab-navi-menu');
    if ($('.tab-line').length && ui.Tab.isTabInit) {
      $('.tab-line').each(function () {
        const $this = $(this);
        // if (parseInt($this.css('left')) === 0) return;
        const $parent = $this.closest('.tab-inner').parent();
        ui.Tab.line($parent, false);
      });
    }
  },
  UI: function () {
    $(document).on('click', '.ui-tab a', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $href = $this.attr('href');
      const $closest = $this.closest('.ui-tab');
      const $siblings = $closest.data('target');
      const $tab = $(this).closest('.tab').length ? $(this).closest('.tab') : $(this).closest('li');
      const $tabInner = $tab.closest('.tab-inner');
      ui.Tab.tabActive($this);
      if ($tabInner.parent().hasClass('tab-scroll')) {
        ui.Tab.panelActive($href, $siblings, true, true);
      } else {
        ui.Tab.panelActive($href, $siblings, true);
      }
      if ($tabInner.length) {
        const isScroll = ui.Scroll.is($tabInner).x;
        if (isScroll) ui.Scroll.center($tab);
      }

      let $winScrollTop = $(window).scrollTop();

      const $topFixed = $this.closest('.top-fixed');
      if ($topFixed.length) {
        const $topMargin = ui.Common.getTopFixedHeight($this);
        const $scrollMove = getOffset($topFixed[0]).top;
        if ($winScrollTop + $topMargin > $scrollMove) ui.Scroll.top($scrollMove - $topMargin);
      }

      if ($($href).length) {
        //ui.Animation
        if ($($href).find('.animate__animated').length) {
          setTimeout(function () {
            $($href).find('.animate__animated').addClass('paused');
            $(window).scroll();
          }, 100);
        }
        if ($($href).find('.rolling-number').length) {
          $($href)
            .find('.rolling-number')
            .each(function () {
              const $this = $(this);
              const $thisH = $this.height();
              $this.css({
                height: '',
                'line-height': ''
              });
              const $in = $this.find('.rolling__in').first().children().first();
              const $inH = $in.height();
              const $setH = $thisH < $inH ? $inH : $thisH;
              $this.css({
                height: $setH,
                'line-height': $setH + 'px'
              });
            });
        }

        if ($($href).find('.ui-swiper').length) {
          ui.Swiper.update($($href).find('.ui-swiper'));
        }
      }
    });

    $(document).on('click', '.tab-expand-btn button', function (e) {
      e.preventDefault();
      const $closest = $(this).closest('.tab-expand-btn');
      const $wrap = $closest.parent();
      const $list = $closest.siblings('.tab-inner').find('.tab-list').clone();
      if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $wrap.removeClass('is-expand');
        $closest.next('.tab-expand').remove();
      } else {
        $(this).addClass('on');
        if (!$wrap.find('.tab-expand').length) {
          $closest.after('<div class="tab-expand"></div>');
          const $expand = $closest.next('.tab-expand');
          $expand.append($list);
          $expand.find('.tab-list').removeClass('tab-list');
          $expand.find('.tab').removeClass('tab');
        }
        $wrap.addClass('is-expand');
      }
    });

    //select tab
    $(document).on('change', '.ui-tab-select', function (e) {
      const $show = $(this).find(':selected').data('show');
      const $hide = $(this).data('hide');
      ui.Tab.panelActive($show, $hide, true);
    });

    //radio tab
    $(document).on('change', '.ui-tab-radio input', function (e) {
      const $show = $(this).data('show');
      const $hide = $(this).closest('.ui-tab-radio').data('hide');
      ui.Tab.panelActive($show, $hide, true, true);
    });

    //checkbox tab
    $(document).on('change', '.ui-tab-check input', function (e) {
      const $closest = $(this).closest('.ui-tab-check');
      const $hide = $closest.data('hide');
      const $showAry = [];
      $closest.find('input[type=checkbox]').each(function () {
        const $tar = $(this).data('show');
        if ($(this).prop('checked')) {
          if ($showAry.indexOf($tar) < 0 && !!$tar) $showAry.push($tar);
        }
      });
      if ($showAry.length) {
        const $panel = $showAry.join(',');
        ui.Tab.panelActive($panel, $hide, true);
      } else {
        ui.Tab.panelActive(false, $hide, true);
      }
    });

    //scrollto
    $(document).on('click', '.ui-tab-scrollto a', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $href = $this.attr('href');
      const $headH = $('#header').length ? $('#header').outerHeight() : 0;
      const $top = $($href).offset().top - $headH;
      ui.Scroll.top($top);
    });
  },
  reInit: function () {
    ui.Tab.ariaSet();
    ui.Tab.ready();
  },
  init: function () {
    ui.Tab.tabInfo();
    ui.Tab.ariaSet();
    ui.Tab.ready();
    ui.Tab.UI();
  }
};
//툴팁
ui.Tooltip = {
  resize: function () {
    if (!$('.tooltip-btn.on').length) return;
    $('.tooltip-btn.on').each(function () {
      const $btn = $(this);
      const $wrap = $btn.closest('.tooltip-wrap');
      const $cont = $wrap.find('.tooltip-cont');
      const $winW = $(window).width() - 40;
      const $btnW = $btn.outerWidth();
      const $btnX = Math.min($winW + $btnW / 2 - 2, $btn.offset().left) - 20;
      let $scrollEnd = $(window).height() + $(window).scrollTop();
      if ($('.bottom-fixed:visible').length) $scrollEnd = $scrollEnd - $('.bottom-fixed').children().outerHeight();
      const $left = Math.max(-4, $btnX);
      $cont.children('.tooltip-arr').css({
        left: $left + $btnW / 2
      });
      $cont.css({
        width: $winW,
        left: -$left
      });
      const $contY = $wrap.offset().top + $wrap.outerHeight() + parseInt($cont.css('margin-top')) + parseInt($cont.css('margin-bottom')) + $cont.outerHeight();
      if ($cont.hasClass('is-bottom')) {
        $cont.addClass('bottom');
      } else {
        if ($scrollEnd - 10 < $contY) {
          $cont.addClass('bottom');
        } else {
          $cont.removeClass('bottom');
        }
      }
    });
  },
  position: function (tar) {
    const $tar = $(tar);

    if (!$tar.find('.tooltip-inner').length) $tar.wrapInner('<div class="tooltip-inner"></div>');
    if (!$tar.find('.tooltip-arr').length) $tar.prepend('<i class="tooltip-arr" aria-hidden="true"></i>');
    if (!$tar.find('.tooltip-close').length) $tar.find('.tooltip-inner').append('<a href="#" class="tooltip-close" role="button" aria-label="툴팁닫기"></a>');
    ui.Tooltip.resize();
  },
  aria: function (element) {
    $(element).each(function (e) {
      const $btn = $(this).find('.tooltip-btn');
      const $cont = $(this).find('.tooltip-cont');
      let $contId = $cont.attr('id');
      const $closeBtn = $(this).find('.tooltip-close');
      if (!$contId) $contId = 'ttCont-' + e;
      $btn.attr({
        role: 'button'
        // 'aria-describedby': $contId
      });
      $cont.attr({
        // id: $contId,
        role: 'tooltip'
      });
      $closeBtn.attr('role', 'button');
    });
  },
  reInit: function () {
    ui.Tooltip.aria('.tooltip-wrap');
  },
  init: function () {
    ui.Tooltip.aria('.tooltip-wrap');

    //열기
    $(document).on('click', '.tooltip-wrap .tooltip-btn', function (e) {
      e.preventDefault();
      const $cont = $(this).closest('.tooltip-wrap').find('.tooltip-cont');
      if ($(this).hasClass('is-pop')) {
        const $popContent = $cont.html();
        const $popTitle = $cont.attr('title');
        if ($popTitle !== undefined) {
          Layer.tooltip($popContent, $popTitle);
        } else {
          Layer.tooltip($popContent);
        }
      } else {
        if ($(this).hasClass('on')) {
          $cont.stop(true, false).fadeOut();
          $(this).removeClass('on');
        } else {
          $('.tooltip-btn').removeClass('on');
          $('.tooltip-cont').fadeOut();
          $(this).addClass('on');
          $cont.stop(true, false).fadeIn();
          setTimeout(function () {
            ui.Tooltip.position($cont);
          }, 30);
        }
      }
    });
    //닫기
    $(document).on('click', '.tooltip-close', function (e) {
      e.preventDefault();
      const $cont = $(this).closest('.tooltip-cont');
      const $btn = $cont.siblings('.tooltip-btn');
      $btn.removeClass('on');
      $cont.stop(true, false).fadeOut(500, function () {
        $btn.focus();
      });
    });
    $(document)
      .on('click touchend', function (e) {
        $('.tooltip-cont').stop(true, false).fadeOut();
        $('.tooltip-wrap .tooltip-btn').removeClass('on');
      })
      .on('click touchend', '.tooltip-wrap', function (e) {
        e.stopPropagation();
      });
  }
};

ui.Touch = {
  rotateWrap: '.ui-touch-rotate .rotate-items',
  rotateItem: function () {
    if (!$(ui.Touch.rotateWrap).length) return;
    const $wrap = $(ui.Touch.rotateWrap);
    const $items = $wrap.find('.rotate-item');
    const $radius = $wrap.outerWidth() / 2;
    const $total = $items.length;
    const $theta = [];
    const $rotate = 360;
    const $frags = $rotate / $total;
    for (let i = 0; i < $total; i++) {
      $theta.push(($frags / 180) * i * Math.PI);
    }
    const $wrapH = $wrap.height();
    $items.each(function (j) {
      const $this = $(this);
      const $thisW = $this.outerWidth();
      const $thisH = $this.outerHeight();
      const $posX = Math.round($radius * Math.sin($theta[j]));
      const $posY = Math.round($radius * Math.cos($theta[j]));
      const $left = $wrapH / 2 + $posX - $thisW / 2;
      const $top = $wrapH / 2 - $posY - $thisH / 2;
      $(this).css({
        left: $left,
        top: $top
      });
    });
  },
  rotate: function (element) {
    let ang = 0; // All angles are expressed in radians
    let angStart = 0;
    let isStart = false;
    let isTouch = false;

    const _angXY = (ev) => {
      const bcr = element.getBoundingClientRect();
      const radius = bcr.width / 2;
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const y = clientY - bcr.top - radius; // y from center
      const x = clientX - bcr.left - radius; // x from center
      return Math.atan2(y, x);
    };

    const _start = (ev) => {
      if (ev.touches !== undefined) {
        isTouch = true;
        Body.lock();
      }
      isStart = true;
      angStart = _angXY(ev) - ang;
      setTimeout(function () {
        element.classList.add('rotating');
      }, 10);
    };

    const _move = (ev) => {
      if (!isStart) return;
      if (!isTouch) ev.preventDefault();
      ang = _angXY(ev) - angStart;
      const deg = radToDeg(ang);
      element.style.transform = 'rotate(' + deg + 'deg)';
      const $items = element.querySelectorAll('.rotate-item');
      $items.forEach(function (item) {
        item.style.transform = 'rotate(' + deg * -1 + 'deg)';
      });
    };

    const _end = () => {
      isStart = false;
      if (isTouch) {
        isTouch = false;
        Body.unlock();
      }
      element.classList.remove('rotating');
    };

    element.addEventListener('mousedown', _start, false);
    document.addEventListener('mousemove', _move, false);
    document.addEventListener('mouseup', _end, false);
    element.addEventListener('touchstart', _start, false);
    document.addEventListener('touchmove', _move, false);
    document.addEventListener('touchend', _end, false);
  },
  isRefreshing: false,
  refresh: function () {
    if (!$('#container.refresh').length || !$('html').hasClass('is-app')) return;
    const _speed = 200;
    const _min = 20;
    let _startX = 0;
    let _startY = 0;
    let _distansX = 0;
    let _distansY = 0;
    let _moveTop = 0;
    let _maxTop = 150;
    let _isRefresh = false;
    const $html = $('html');
    const $wrap = $('#wrap');
    const getPos = function (ev) {
      // console.log(ev.type);
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;

      return {
        X: clientX,
        Y: clientY
      };
    };

    const _className = 'page-refresh';
    let $refresh = $('.' + _className);
    const _ready = function (Y, X) {
      let _html = '<div class="' + _className + '" role="img" aria-label="새로고침">';
      _html += '<div aria-hidden="true" class="ico">';
      // _html += '<div class="ico-in"></div>';
      _html += '<svg class="svg" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="svg-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>';
      _html += '</div>';
      _html += '</div>';

      _isRefresh = true;
      _startY = Y;
      _startX = X;
      $refresh = $('.' + _className);
      if (!$refresh.length) {
        $wrap.before(_html);
        $refresh = $('.' + _className);
      }
      // if ($refresh.outerHeight() !== _maxTop) $refresh.css('height', _maxTop);
    };

    const _reset = function () {
      ui.Touch.isRefreshing = false;
      _isRefresh = false;
      _startX = 0;
      _startY = 0;
      _distansX = 0;
      _distansY = 0;
      _moveTop = 0;
      $html.removeClass('not-refresh refreshing');
      // $wrap.stop(true, false).animate({ top: 0 }, _speed, function () {
      //   $wrap.removeAttr('style');
      // });
      $refresh.stop(true, false).animate({ height: 0 }, _speed, function () {
        $refresh.remove();
      });
      const $ico = $refresh.find('.ico');
      $ico.addClass('ing').css({
        opacity: 0,
        transform: 'scale(0) rotate(0deg)'
      });
      const $path = $refresh.find('.svg-path');
      const $dashoffset = parseInt($path.css('stroke-dasharray'));
      $path.css('stroke-dashoffset', $dashoffset);
    };
    ui.RefreshEnd = _reset;

    const _start = function (e) {
      if (ui.Touch.isRefreshing) return;
      const _Y = getPos(e).Y;
      const _X = getPos(e).X;
      const _sclTop = window.pageYOffset;
      if (_sclTop > _min / 2 || $html.hasClass('lock')) return;
      // $html.addClass('not-refresh');
      _ready(_Y, _X);
    };

    const _wrapTop = function (val) {
      $html.addClass('not-refresh');
      _moveTop = Math.min(_maxTop, val / 2);
      // $wrap.stop(true, false).css('top', _moveTop);
      $refresh.stop(true, false).css('height', _moveTop);
      const $ratio = _moveTop / _maxTop;
      const $ico = $refresh.find('.ico');
      $ico.css({
        opacity: $ratio,
        transform: 'scale(' + $ratio + ') rotate(' + $ratio * 720 + 'deg)'
      });
      const $path = $refresh.find('.svg-path');
      const $dashoffset = $ratio * parseInt($path.css('stroke-dasharray'));
      $path.css('stroke-dashoffset', $dashoffset);
    };

    const _move = function (e) {
      if (!_isRefresh || ui.Touch.isRefreshing) return;

      const _Y = getPos(e).Y;
      const _X = getPos(e).X;
      _distansY = _Y - _startY;
      _distansX = _X - _startX;
      if (_distansX > _distansY) return;
      if (_distansY < 0) {
        _reset();
      } else if (_distansY > _min) {
        _wrapTop(_distansY - _min);
      }
    };

    const _refreshing = function () {
      ui.Touch.isRefreshing = true;
      $html.addClass('refreshing');
      // $wrap.stop(true, false).animate({ top: _maxTop }, _speed);

      const $ico = $refresh.find('.ico');
      $ico.addClass('ing').css({
        opacity: 1,
        transform: 'scale(1) rotate(720deg)'
      });
      const $path = $refresh.find('.svg-path');
      const $dashoffset = parseInt($path.css('stroke-dasharray'));
      $path.css('stroke-dashoffset', $dashoffset);
      $refresh.stop(true, false).animate({ height: _maxTop }, _speed, function () {
        $ico.removeClass('ing');
        $path.removeAttr('style');
        if (ui.Refresh && typeof ui.Refresh === 'function') {
          ui.Refresh();
        } else {
          location.reload(true);
          // location.href = location.href;
          // history.go(0);
        }
      });
    };

    const _end = function (e) {
      if (!_isRefresh || ui.Touch.isRefreshing) return;
      if (_moveTop > 100) {
        _refreshing();
      } else {
        _reset();
      }
    };
    document.addEventListener('touchstart', _start, false);
    document.addEventListener('touchmove', _move, false);
    document.addEventListener('touchend', _end, false);
  },
  focus: function () {
    let $isFocus = false;
    let $isFocusEl = null;
    $(document).on('focus', 'input, textarea', function (e) {
      const $target = e.target;
      let $el;
      // if ($target.tagName === 'TEXTAREA') $el = $($target);
      if ($target.tagName === 'INPUT') {
        const $type = $target.getAttribute('type');
        // if($type === 'checkbox' || $type === 'radio' || $type === 'button' || $type === 'submit') return;
        if ($type !== 'text' && $type !== 'tel' && $type !== 'number' && $type !== 'password' && $type !== 'email' && $type !== 'search' && $type !== 'url') return;
      }
      $el = $($target);
      if ($el.prop('disabled') || $el.prop('readonly')) return;
      $isFocus = true;
      $isFocusEl = $target;
      $('html').addClass('input-focus');
    });
    const $reset = function () {
      $isFocus = false;
      $isFocusEl = null;
      $('html').removeClass('input-focus');
      $startY = null;
    };
    $(document).on('blur', 'input, textarea', function (e) {
      if ($isFocus) $reset();
    });

    // bottom fixed focus
    let $startY = null;
    let isParent = false;
    const $bottomInp = $('.pop-foot, .bottom-fixed').find('input, textarea');
    $(document).on('touchstart', function (e) {
      const $target = $(e.target);
      if ($target.closest('.pop-foot').length || $target.closest('.bottom-fixed').length) {
        isParent = true;
      } else {
        if ($isFocus && $bottomInp.is(':focus')) {
          const $target = e.target;
          const $clientY = e.touches[0].clientY;
          if ($target !== $isFocusEl) {
            $($isFocusEl).blur();
            $reset();
          } else {
            $startY = $clientY;
          }
        }
      }
    });

    $(document).on('touchmove', function (e) {
      if ($isFocus && $bottomInp.is(':focus') && isParent) {
        const $target = $(e.target);
        const $clientY = e.touches[0].clientY;
        let $closest;
        if ($target.closest('.pop-foot').length) $closest = $target.closest('.pop-foot');
        if ($target.closest('.bottom-fixed').length) $closest = $target.closest('.bottom-fixed').children();
        if (!$closest) return;
        const $closestTop = $target.closest('.popup').length ? $closest.offset().top : $closest.offset().top - $(window).scrollTop();
        if ($closestTop > $clientY || $(window).height() < $clientY) {
          $($isFocusEl).blur();
          $reset();
        }
      }
    });
  },
  horizonScroll: function () {
    // 안드로이드 (네이티브)앱에서 최상단에 있을때
    // 가로스크롤이 '당기면 새로고침'기능 때문에 잘 안됨 처리
    let $isScroll = false;
    let $isLock = false;
    let $startX = 0;
    let $startY = 0;
    let $moveX = 0;
    let $moveY = 0;
    const _start = function (e) {
      if (fullRefresh.is) return;
      const $sclTop = $(window).scrollTop();
      if ($sclTop > 0) return;
      $isScroll = true;
      $startX = e.touches[0].clientX;
      $startY = e.touches[0].clientY;
      const $target = e.target;
      let $parent = $target;
      let $isSclChk = false;
      while ($parent.tagName !== 'BODY' && !$isSclChk) {
        const $width = $parent.offsetWidth;
        const $sclWidth = $parent.scrollWidth;
        const $css = window.getComputedStyle($parent);
        const $overflowX = $css.getPropertyValue('overflow-x');
        const $locking = function () {
          //console.log('새로고침 막힘', 'width:' + $width, 'sclWidth:' + $sclWidth, 'overflowX:' + $overflowX);
          $isLock = true;
          $isSclChk = true;
          fullRefresh.lock();
        };
        if ($width < $sclWidth && ($overflowX === 'auto' || $overflowX === 'scroll')) {
          $locking();
        }
        if ($parent.classList.contains('swiper-wrapper')) {
          $locking();
        }
        $parent = $parent.parentNode;
      }
    };
    const _move = function (e) {
      if (!$isScroll || !$isLock) return;
      $moveX = e.touches[0].clientX;
      $moveY = e.touches[0].clientY;
      const $distX = $moveX - $startX;
      const $distY = $moveY - $startY;
      const $getAngle = function (x, y) {
        return (Math.atan2(y, x) * 180) / Math.PI;
      };
      const $dist = Math.floor(Math.sqrt(Math.pow($distX, 2) + Math.pow($distY, 2))); //start에서 move까지 거리
      const $getDeg = Math.round($getAngle($distX, $distY)); //start에서 move까지 각도
      const $gapDeg = 30;
      // 이동거리 10 이상 ,아래로 60 ~ 120도 새로고침 다시 되게
      if ($dist > 10 && ($getDeg < 0 || (90 - $gapDeg <= $getDeg && $getDeg <= 90 + $gapDeg))) {
        //console.log('새로고침', 'deg:' + $getDeg);
        $isLock = false;
        fullRefresh.unlock();
      }
    };
    const _end = function (e) {
      if ($isScroll) $isScroll = false;
      if ($isLock) {
        //console.log('새로고침', 'end');
        $isLock = false;
        fullRefresh.unlock();
      }
    };

    if (ui.Device.app() && ui.Mobile.Android()) {
      document.addEventListener('touchstart', _start, false);
      document.addEventListener('touchmove', _move, false);
      document.addEventListener('touchend', _end, false);
    }
  },
  init: function () {
    if ($('.ui-touch-rotate').length) {
      ui.Touch.rotateItem();
      document.querySelectorAll(ui.Touch.rotateWrap).forEach(ui.Touch.rotate);
    }

    ui.Touch.refresh();
    ui.Touch.focus();

    ui.Touch.horizonScroll();
  }
};
ui.Refresh = null;
ui.RefreshEnd = null;

//폼요소 관련
ui.Form = {
  winLoad: function () {
    //select off효과
    $('select').each(function () {
      const $val = $(this).val();
      if ($val == '' || $val == null) {
        $(this).addClass('off');
      }
    });

    //페이지 로딩 후 검색박스에 입력값이 있으면 X 버튼 추가
    // $('.search_box .input input').each(function () {
    //   if ($(this).val() != '') $(this).after('<a href="#" class="btn-inp-del" role="button" aria-label="입력내용삭제"></a>');
    // });

    //입력 텍스트 카운팅(로딩)
    $('[data-text-count]').each(function (e) {
      ui.Form.textCount(this);
    });
  },
  focus: function () {
    const $inpEls = 'input:not(:checkbox):not(:radio):not(:hidden), select, textarea, .btn-select';
    const $appFocusElScroll = function (tar) {
      const $this = $(tar);
      if (!ui.Device.app() || !ui.Mobile.Android()) return;
      if ($this.is('a') || $this.prop('readonly') || $this.prop('disabled')) return;
      let $isFixedParent = false;
      const $parents = $this.parents();
      $parents.each(function () {
        if ($(this).css('position') === 'fixed' || $(this).css('position') === 'sticky') {
          $isFixedParent = true;
        }
      });
      if ($isFixedParent) return;
      setTimeout(function () {
        const $el = $this.offsetParent();
        let $elTop = $el.offset().top;
        let isPop = false;
        let $wrap = $(window);
        let $wrapClass;
        if ($this.closest('.' + Layer.popClass).length) {
          isPop = true;
          $wrapClass = $this.closest('.' + Layer.sclWrapClass).length ? Layer.sclWrapClass : Layer.wrapClass;
          $wrap = $this.closest('.' + $wrapClass);
        }
        const $wrapH = $wrap.height();
        const $scrollTop = $wrap.scrollTop();
        $elTop = isPop ? $elTop - $wrap.offset().top : $elTop - $scrollTop;
        const $elHeight = $el.outerHeight();
        const $elEnd = $elTop + $elHeight;
        const $topGap = isPop ? ui.Common.getTopFixedHeight($this, 'pop-top-fixed') : ui.Common.getTopFixedHeight($this);
        const $bottomGap = isPop ? $wrap.find('.' + Layer.footClass).outerHeight() : $('.bottom-fixed-space').outerHeight();
        let $move;
        const $start = ($topGap ? $topGap : 0) + 10;
        const $end = $wrapH - ($bottomGap ? $bottomGap : 0) - 10;
        if ($start > $elTop) {
          $move = $scrollTop - ($start - $elTop);
        } else if ($end < $elEnd) {
          $move = $scrollTop + ($elEnd - $end);
        }
        if ($move) {
          if (isPop) {
            $wrap.stop(true, false).animate({ scrollTop: $move }, 200);
          } else {
            ui.Scroll.top($move, 200);
          }
        }
      }, 300);
    };
    let $dimTimer;
    $(document).on('focusin', $inpEls, function (e) {
      const $this = $(this);
      if ($this.prop('readonly') || $this.prop('disabled')) return;
      // if (!$this.prop('readonly') && !$this.prop('disabled')) $('html').addClass('inp-focus');
      if ($this.closest('.form-item').length) $this.closest('.form-item').addClass('focus');
      if ($this.is('input') && $this.closest('.input').length) $this.closest('.input').addClass('focus');
      if ($this.is('select') && $this.closest('.select').length) $this.closest('.select').addClass('focus');
      if ($this.hasClass('btn-select') && $this.closest('.select').length) $this.closest('.select').addClass('focus');
      if ($this.is('textarea') && $this.closest('.textarea').length) $this.closest('.textarea').addClass('focus');

      //bottom-fixed
      const $bottom = $this.closest('.btn-comment');
      if ($bottom.length) {
        const $isPop = $bottom.closest('.popup').length;
        $('html').addClass('overflow-hidden');
        $bottom.siblings().addClass('pointer-events-none');
        clearTimeout($dimTimer);
        if (!$('.body-dim').length) {
          $('body').append('<div class="body-dim" aria-hidden="true"></div>');
        }
        const $bottomH = $bottom.children().outerHeight();
        const $zIndex = $isPop ? parseInt($bottom.closest('.popup').css('z-index')) : parseInt($bottom.css('z-index')) - 1;
        $('.body-dim')
          .css({
            bottom: $bottomH,
            'z-index': $zIndex
          })
          .addClass('show');
      }

      //app focus scroll: 안드로이드
      $appFocusElScroll(this);
    });
    $(document).on('focusout', $inpEls, function (e) {
      const $this = $(this);
      // $('html').removeClass('inp-focus');
      if ($this.closest('.form-item').length) $this.closest('.form-item').removeClass('focus');
      if ($this.is('input') && $this.closest('.input').length) $this.closest('.input').removeClass('focus');
      if ($this.is('select') && $this.closest('.select').length) $this.closest('.select').removeClass('focus');
      if ($this.hasClass('btn-select') && $this.closest('.select').length) $this.closest('.select').removeClass('focus');
      if ($this.is('textarea') && $this.closest('.textarea').length) $this.closest('.textarea').removeClass('focus');

      //bottom-fixed
      const $bottom = $this.closest('.btn-comment');
      if ($bottom.length) {
        $('html').removeClass('overflow-hidden');
        $('.body-dim').removeClass('show');
        $dimTimer = setTimeout(function () {
          $('.body-dim').remove();
        }, 210);

        setTimeout(function () {
          $bottom.siblings().removeClass('pointer-events-none');
        }, 100);
      }
    });
  },
  selectSetVal: function (target, value) {
    const val = value === 0 ? '0' : value;
    const $target = $(target);
    let $val = $target.val();
    if (val && $val === val) {
      return;
    } else if (val && $val !== val) {
      $target.val(val);
      $val = val;
    }
    let $selectTxt = $target.find(':selected').text();
    if ($selectTxt == '') $selectTxt = '선택';
    const $btnVal = $target.siblings('.btn-select').find('.btn-select-val');
    if ($selectTxt === $btnVal.text()) return;
    $btnVal.html($selectTxt);
    if ($val == '') {
      $target.siblings('.btn-select').addClass('off');
    } else {
      $target.siblings('.btn-select').removeClass('off');
    }
  },
  select: function () {
    const $select = $('.select').not('.btn, .not');
    if ($select.length) {
      $select.each(function (e) {
        const $this = $(this);
        const $selEl = $this.find('select');
        $selEl.each(function () {
          const $sel = $(this);
          if (!$sel.siblings('.btn-select').length) {
            let $selId = $sel.attr('id');
            let $title = $sel.attr('title');

            if ($selId == undefined) $selId = 'none';
            if ($title == undefined) $title = '선택';
            const $btnTitle = '팝업으로 ' + $title;
            const $btnHtml = '<a href="#' + $selId + '" class="btn-select ui-select-open" title="' + $btnTitle + '" role="button"><span class="btn-select-val"></span></a>';

            $sel.hide().after($btnHtml);

            const $forLbl = $('label[for="' + $selId + '"]');
            if ($forLbl.length) $forLbl.addClass('ui-select-lbl').attr('title', $btnTitle);

            $sel.change(function () {
              ui.Form.selectSetVal(this);
            });
          }
          $sel.change();
        });
      });
    }
  },
  /*
  select2: function () {
    const $select = $('.select.inline');
    if ($select.length) {
      $select.each(function () {
        const $this = $(this);
        const $select = $this.find('select');
        let $selId = $select.attr('id');
        let $title = $select.attr('title');

        if ($select.length && !$select.siblings('.btn-select').length) {
          if ($selId == undefined) $selId = 'none';
          if ($title == undefined) $title = '선택';
          const $btnHtml = '<a href="#' + $selId + '" class="btn-select" title="' + $title + '" role="button"><span class="val"></span></a>';
          let $optionHtml = '<div class="option-wrap">';
          $select.children().each(function () {
            const $val = $(this).attr('value');
            const $text = $(this).text();
            $optionHtml += '<a href="#" class="option" data-val="' + $val + '">' + $text + '</a>';
          });
          $optionHtml += '</div>';
          $select.hide().after($btnHtml);
          $this.append($optionHtml);
          $select.off('change').on('change', function () {
            const $val = $(this).val();
            let $selectTxt = $(this).find(':selected').text();
            if ($selectTxt == '') $selectTxt = '선택';
            $(this).siblings('.btn-select').find('.val').html($selectTxt);
            if ($val == '') {
              $(this).siblings('.btn-select').addClass('off');
            } else {
              $(this).siblings('.btn-select').removeClass('off');
            }
          });
          $select.change();
        }
      });
    }
  },
  */
  selectUI: function () {
    $(document).on('change', 'select', function () {
      const $val = $(this).val();
      if ($val == '') {
        $(this).addClass('off');
      } else {
        $(this).removeClass('off');
      }
    });

    /*
    $(document).on('click', '.select.inline .btn-select', function (e) {
      e.preventDefault();
      const $closest = $(this).closest('.select');
      const $select = $closest.find('select');
      if (!$select.length) return;
      const $val = $select.val();
      const $option = $closest.find('.option[data-val="' + $val + '"]');
      $option.addClass('selected').siblings().removeClass('selected');
      $(this).closest('.select').toggleClass('option-open');
    });
    $(document).on('click', '.select.inline .option', function (e) {
      e.preventDefault();
      const $val = $(this).data('val');
      const $select = $(this).closest('.select').find('select');
      $select.val($val).change();
      $(this).closest('.select').removeClass('option-open');
    });
    */

    $(document).on('change', '.datepicker-etc-select', function (e) {
      const $val = $(this).val();
      if ($('.datepicker-etc').length) {
        if ($val === 'etc') {
          $('.datepicker-etc').slideDown(300);
        } else {
          $('.datepicker-etc').slideUp(300);
        }
      }
    });
  },
  inputUI: function () {
    // input[maxlength]

    if (ui.Mobile.Android()) {
      // 안드로이드 중 일부 maxlength 방식이 상이함(무한입력 후 포커스 아웃때 적용됨)
      $(document).on('input', 'input[maxlength], textarea[maxlength]', function (e) {
        const $this = $(this);
        const $val = $this.val();
        const $max = $this.attr('maxlength');
        const $length = $val.length;
        if ($val && $length > $max) this.value = this.value.slice(0, $max);
      });
    }

    //form 안에 input이 1개일때 엔터시 새로고침 현상방지
    /*
    $(document).on('keydown', 'form input', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $form = $(this).closest('form');
      const $length = $form.find('input').not('[type=checkbox],[type=radio]').length;

      //.search-box 검색창은 예외
      if ($length == 1 && !$(this).closest('.search-box').length) {
        if ($keyCode == 13) return false;
      }
    });
    */

    //list input[type=checkbox]
    $(document).on('change', '.chk-item input', function () {
      const $this = $(this);
      if ($this.prop('checked') == true) {
        $this.closest('.chk-item').addClass('checked');
        if ($this.attr('type') == 'radio') $this.closest('.chk-item').siblings('.chk-item').removeClass('checked');
      } else {
        $this.closest('.chk-item').removeClass('checked');
      }
    });
  },
  inpBtn: function () {
    //input 삭제버튼
    const insertDel = function (el) {
      const $this = $(el);
      const $val = $this.val();
      if ($this.data('removeDelBtn') !== undefined) clearTimeout($this.data('removeDelBtn'));
      if ($this.data('removePwdBtn') !== undefined) clearTimeout($this.data('removePwdBtn'));
      // prettier-ignore
      if (
        $this.prop('readonly') ||
        $this.prop('disabled') ||
        $this.hasClass('hasDatepicker') ||
        $this.hasClass('time') ||
        $this.attr('type') === 'date' ||
        $this.hasClass('t-right') ||
        $this.hasClass('t-center') ||
        $this.hasClass('no-del')
      ) {
        return false;
      }
      const $closest = $this.closest('.input');
      if ($val != '') {
        if (!$this.siblings('.btn-inp-del').length && !$this.siblings('.datepicker').length) {
          $this.after('<a href="#" class="btn-inp-del" role="button" aria-label="입력내용삭제"></a>');
        }

        if ($closest.hasClass('password') && !$closest.find('.btn-inp-pwd').length) {
          $closest.append('<a href="#" class="btn-inp-pwd" role="button" aria-label="비밀번호 입력확인"></a>');
        }
      } else {
        if ($this.siblings('.btn-inp-del').length) {
          const removeDelBtn = setTimeout(function () {
            $this.siblings('.btn-inp-del').remove();
            $this.removeData('removeDelBtn');
          }, 10);
          $this.data('removeDelBtn', removeDelBtn);
        }
        if ($this.siblings('.btn-inp-pwd').length) {
          const removePwdBtn = setTimeout(function () {
            $this.siblings('.btn-inp-pwd').remove();
            $this.removeData('removePwdBtn');
          }, 10);
          $this.data('removePwdBtn', removePwdBtn);
        }
      }
    };
    // $('.input input, .textarea.del textarea').each(function () {
    //   insertDel(this);
    // });
    $(document).on('keyup focusin', '.input input, .textarea.del textarea', function () {
      insertDel(this);
    });
    $(document).on('focusout', '.input:not(.show-del) input, .textarea.del:not(.show-del) textarea', function () {
      const $this = $(this);
      if ($this.siblings('.btn-inp-del').length) {
        const removeDelBtn = setTimeout(function () {
          $this.siblings('.btn-inp-del').remove();
          $this.removeData('removeDelBtn');
        }, 300);
        $this.data('removeDelBtn', removeDelBtn);
      }
    });
    $(document).on('click', '.btn-inp-del', function () {
      const $inp = $(this).prev();
      $inp.val('').change().focus().keyup();
    });
    $(document).on('click', '.btn-inp-pwd', function () {
      const $inp = $(this).siblings('input');
      if ($inp.attr('type') === 'password') {
        $inp.attr('type', 'text');
      } else {
        $inp.attr('type', 'password');
      }
    });
  },
  textareaSpace: function () {
    $('.textarea.auto-height').each(function () {
      const $val = $(this).find('textarea').val();
      const $space = '<div class="textarea-space">' + $val + '<div>';
      if (!$(this).find('.textarea-space').length) $(this).append($space);
    });
  },
  textareaHeight: function (elem) {
    const $val = $(elem).val();
    const $lines = $val.split(/\r|\r\n|\n/);
    const $count = $lines.length;
    const $lineH = parseInt($(elem).css('line-height'));
    const $pd = parseInt($(elem).css('padding-top')) + parseInt($(elem).css('padding-bottom'));
    $(elem).css('height', $count * $lineH + $pd);

    if ($('.body-dim').length) {
      let $closest = $(elem).closest('.pop-foot');
      if ($(elem).closest('.bottom-fixed').length) $closest = $(elem).closest('.bottom-fixed').children();
      const $closestH = $closest.outerHeight();
      $('.body-dim').css('bottom', $closestH);
    }
  },
  textarea: function () {
    // ui.Form.textareaSpace();
    $('.textarea.auto-height textarea').each(function () {
      ui.Form.textareaHeight(this);
    });
  },
  textareaUI: function () {
    $(document).on('keyup keydown keypress change', '.textarea.auto-height textarea', function () {
      ui.Form.textareaHeight(this);
    });
  },
  success: function (element, messege) {
    const $el = $(element);
    const $closest = $el.closest('.validate-item').length ? $el.closest('.validate-item') : $el.parent();
    $closest.removeClass('is-error').addClass('is-success');
    if ($closest.next('.validate-txt').length) {
      $closest.next('.validate-txt').removeClass('is-error').addClass('is-success').html(messege);
    } else {
      $closest.after('<div class="validate-txt is-success">' + messege + '</div>');
    }
  },
  error: function (element, messege, isFocus) {
    if (isFocus === undefined) isFocus = false;
    const $el = $(element);
    let $closest = $el;
    if ($closest.is('input') || $closest.is('select') || $closest.is('textarea')) $closest = $closest.parent();
    if ($el.closest('.validate-item').length) $closest = $el.closest('.validate-item');

    if (messege === false) {
      $closest.removeClass('is-error');
      if ($closest.siblings('.validate-txt.is-error').length) $closest.siblings('.validate-txt.is-error').remove();
    } else {
      $closest.removeClass('is-success').addClass('is-error');
      if ($closest.next('.validate-txt').length) {
        $closest.next('.validate-txt').removeClass('is-success').addClass('is-error').html(messege);
      } else {
        $closest.after('<div class="validate-txt is-error">' + messege + '</div>');
      }
      if (isFocus && !$el.is(':focus') && !$(':focus').closest('.is-error').length) $el.focus();
    }
  },
  textCount: function (element, e) {
    const $el = $(element);
    let $target = $el.data('text-count');
    if ($target == true) {
      $target = $el.siblings('.byte').find('strong');
    } else {
      $target = $('#' + $target);
    }
    if (!$target.length) return;
    const $max = $el.attr('maxlength');
    let $val = $el.val();
    let $length = $val.length;
    if (!!e && (e.type == 'keyup' || e.type == 'keypress' || e.type == 'paste' || e.type == 'cut')) {
      setTimeout(function () {
        $val = $el.val();
        $length = $val.length;
        if ($max === undefined) {
          $target.text($length);
        } else {
          $target.text(Math.min($max, $length));
        }
      }, 1);
    } else {
      if ($val != '') $target.text(Math.min($max, $length));
    }
  },
  agree: function () {
    const $wrapClass = '.ui-agree';
    const $allAgreeChkClass = '.ui-all-agree-chk';
    const $agreeChkClass = '.ui-agree-chk';

    $($wrapClass).each(function () {
      const $wrapEl = $(this);
      if ($wrapEl.data('_ui-init')) return;
      $wrapEl.data('_ui-init', true);
      // 전체동의
      $wrapEl.find($allAgreeChkClass).on('change', function () {
        const $this = $(this);
        const $wrap = $this.closest($wrapClass);
        const $items = $wrap.find($agreeChkClass);
        const $isFolding = $wrap.hasClass('folding');
        const $foldingBtn = $wrap.find('.ui-folding-btn');
        const $foldingPanel = $wrap.find('.folding-panel');
        if ($(this).prop('checked')) {
          $items.prop('checked', true).change();
          if ($isFolding && $foldingBtn.hasClass('open')) {
            $foldingBtn.removeClass('open');
            $foldingPanel.stop(true, false).slideUp(200);
          }
        } else {
          $items.prop('checked', false).change();
          if ($isFolding && !$foldingBtn.hasClass('open')) {
            $foldingBtn.addClass('open');
            $foldingPanel.stop(true, false).slideDown(200);
          }
        }
      });

      $wrapEl.find($agreeChkClass).on('change', function () {
        const $this = $(this);
        const $wrap = $this.closest($wrapClass);
        const $allchk = $wrap.find($allAgreeChkClass);
        const $items = $wrap.find($agreeChkClass);
        const $isFolding = $wrap.hasClass('folding');
        const $foldingBtn = $wrap.find('.ui-folding-btn');
        const $foldingPanel = $wrap.find('.folding-panel');
        const $itemsLength = $items.length;
        const $itemsChecked = $wrap.find($agreeChkClass + ':checked').length;
        if ($itemsLength === $itemsChecked) {
          $allchk.prop('checked', true);
          if ($isFolding && $foldingBtn.hasClass('open')) {
            $foldingBtn.removeClass('open');
            $foldingPanel.stop(true, false).slideUp(200);
          }
        } else {
          $allchk.prop('checked', false);
        }
      });
    });

    // 선택약관(문자, 메일수신)
    $('[data-agree-target]').each(function () {
      const $this = $(this);
      const $dataTargets = $this.data('agree-target').split(',');
      const $targets = [];
      $.each($dataTargets, function () {
        if ($(this.trim()).length) $targets.push(this.trim());
      });
      if ($this.data('_ui-init')) return;
      $this.data('_ui-init', true);
      $this.on('change', function () {
        let $checked = 0;
        if ($(this).prop('checked')) {
          $.each($targets, function () {
            if ($('' + this).prop('checked')) $checked += 1;
          });
          if ($checked === 0) {
            $.each($targets, function () {
              $('' + this).prop('checked', true);
            });
          }
        } else {
          $.each($targets, function () {
            $('' + this).prop('checked', false);
          });
        }
      });

      $.each($targets, function () {
        $('' + this).change(function () {
          let $checked = 0;
          if ($(this).prop('checked')) {
            $this.prop('checked', true).change();
          } else {
            $.each($targets, function () {
              if ($('' + this).prop('checked')) $checked += 1;
            });
            if ($checked === 0) $this.prop('checked', false).change();
          }
        });
      });
    });
  },
  mail: function () {
    // 이메일 직접입력
    const mailCheck = function (element, isFocus) {
      const $this = $(element);
      const $val = $this.val();
      const $closest = $this.closest('.inp-mail');
      const $inp = $closest.find('.input').last().find('input');
      if ($this.find(':selected').text() === '직접입력') {
        $inp.closest('.input').removeClass('disabled');
        $inp.prop('readonly', false);
        if (isFocus) $inp.focus();
      } else {
        $inp.closest('.input').addClass('disabled');
        $inp.prop('readonly', true).val($val);
      }
    };
    $('.inp-mail select').on('change', function () {
      mailCheck(this, true);
    });
    $('.inp-mail select').each(function () {
      mailCheck(this, false);
    });
  },
  spinner: function () {
    const $spinner = $('.spinner');
    if ($spinner.length) {
      $spinner.each(function () {
        const $this = $(this);
        const $input = $this.find('input');
        $input.change();
      });
    }
  },
  spinnerUI: function () {
    $(document).on('click', '.spinner .button', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $spinner = $this.closest('.spinner');
      const $input = $spinner.find('input');
      const $val = parseInt($input.val());
      if ($this.hasClass('minus')) {
        $input.val($val - 1).change();
      } else if ($this.hasClass('plus')) {
        $input.val($val + 1).change();
      }
    });
    $(document).on('change', '.spinner input', function () {
      const $this = $(this);
      const $spinner = $this.closest('.spinner');
      const $min = $spinner.data('min') !== undefined ? $spinner.data('min') : 1;
      const $max = $spinner.data('max') !== undefined ? $spinner.data('max') : 999;
      let $val = parseInt($this.val());
      if ($this.val() === '' || $val < $min) {
        $val = $min;
        $this.val($min);
      } else if ($val > $max) {
        $val = $max;
        $this.val($max);
      }
      const $btnMinus = $spinner.find('.minus');
      const $btnPlus = $spinner.find('.plus');
      if ($val <= $min) {
        $btnMinus.prop('disabled', true);
      } else {
        $btnMinus.prop('disabled', false);
      }
      if ($val >= $max) {
        $btnPlus.prop('disabled', true);
      } else {
        $btnPlus.prop('disabled', false);
      }
    });
  },
  range: function () {
    const $sliderRange = document.querySelectorAll('.range-slider');
    if ($sliderRange.length) {
      $('.range-slider').each(function () {
        const $slider = $(this).find('.range-wrap');
        const $list = $(this).find('.list');
        const $input = $(this).find('input').first();
        let $first = $(this).find('.first-inp');
        if (!$first.length && $input.length == 1) {
          $input.addClass('first-inp');
          $first = $input;
        }
        const $last = $(this).find('.last-inp');
        const $min = parseInt($input[0].min);
        const $max = parseInt($input[0].max);
        const $step = parseInt($input[0].step);
        const $unit = $list.data('unit') !== undefined ? $list.data('unit').split(',') : '';
        if (!$slider.find('.range').length) $slider.prepend('<div class="range"></div>');
        const $range = $slider.find('.range');
        if ($first.length && $last.length && !$range.find('i').length) $range.append('<i></i>');
        if ($last.length && !$slider.find('.thumb.last').length) $range.after('<div class="thumb last"></div>');
        if ($first.length && !$slider.find('.thumb.first').length) $range.after('<div class="thumb first"></div>');

        if ($list.length) {
          $list.empty();
          $slider.find('.dot').remove();
          const $total = ($max - $min) / $step;
          const $stepLeft = 100 / $total;
          let $listHtml = '<ul>';
          let $dotHtml = '<ul class="dot">';
          for (let i = 0; i <= $total; i++) {
            const $setLeft = $stepLeft * i;
            $dotHtml += '<li style="left:' + $setLeft + '%"></li>';
            $listHtml += '<li style="left:' + $setLeft + '%"><span>' + ($unit.length > 1 ? $unit[i] : i * $step + $min + $unit) + '</span></li>';
          }
          $listHtml += '</ul>';
          $dotHtml += '</ul>';
          $list.append($listHtml);
          if ($list.hasClass('append-dot')) {
            $range.after($dotHtml);
          }
        }
      });

      const $clippath = function (wrap) {
        // addClass
        const $wrap = wrap;
        const $first = $wrap.querySelector('.first-inp');
        const $last = $wrap.querySelector('.last-inp');
        const $getIdx = function (el) {
          const $el = el;
          const $value = parseInt($el.value);
          const $min = parseInt($el.min);
          const $step = parseInt($el.step);
          return ($value - $min) / $step;
        };
        const $firstIdx = $first ? $getIdx($first) : null;
        const $lastIdx = $last ? $getIdx($last) : null;

        const $list = $wrap.parentNode.querySelector('.list');
        const $dot = $wrap.querySelector('.dot');
        const $liAddClass = function (wrap) {
          const $li = wrap.querySelectorAll('li');
          $li.forEach(function (item, i) {
            if (i === $firstIdx || i === $lastIdx) {
              item.classList.add('on');
            } else {
              item.classList.remove('on');
            }
          });
        };
        if ($list) $liAddClass($list);
        if ($dot) $liAddClass($dot);

        // clip-path
        const $range = $wrap.querySelector('.range i');
        let $rangeLeft = 0;
        let $rangeRight = 0;
        if ($range) {
          $rangeLeft = parseInt($range.style.left);
          $rangeRight = parseInt($range.style.right);
        }
        if ($first && $last) {
          const _polyVal = (100 - ($rangeLeft + $rangeRight)) / 2 + $rangeLeft;
          $last.style.clipPath = 'polygon(' + _polyVal + '% 0%, 100% 0%, 100% 100%, ' + _polyVal + '% 100%)';
        }
      };

      const $firstRange = function (wrap) {
        const $el = wrap.querySelector('.first-inp');
        const $lastEl = wrap.querySelector('.last-inp');
        const $lastVal = $lastEl ? parseInt($lastEl.value) : parseInt($el.max) + 1;
        $el.value = Math.min($el.value, $lastVal - 1);
        const value = (100 / (parseInt($el.max) - parseInt($el.min))) * parseInt($el.value) - (100 / (parseInt($el.max) - parseInt($el.min))) * parseInt($el.min);

        const parent = $el.parentNode;
        if (parent.querySelector('.range i')) parent.querySelector('.range i').style.left = value + '%';
        parent.querySelector('.thumb.first').style.left = value + '%';
        if (parent.querySelector('.thumb.first .value')) parent.querySelector('.thumb.first .value').innerHTML = $el.value;
        $clippath(parent);
      };

      const $lastRange = function (wrap) {
        const $el = wrap.querySelector('.last-inp');
        const $firstEl = wrap.querySelector('.first-inp');
        const $firstVal = $firstEl ? parseInt($firstEl.value) : parseInt($el.min) - 1;
        $el.value = Math.max($el.value, $firstVal + 1);
        const value = (100 / (parseInt($el.max) - parseInt($el.min))) * parseInt($el.value) - (100 / (parseInt($el.max) - parseInt($el.min))) * parseInt($el.min);
        const parent = $el.parentNode;
        if (parent.querySelector('.range i')) parent.querySelector('.range i').style.right = 100 - value + '%';
        parent.querySelector('.thumb.last').style.left = value + '%';
        if (parent.querySelector('.thumb.last .value')) parent.querySelector('.thumb.last .value').innerHTML = $el.value;
        $clippath(parent);
      };

      $sliderRange.forEach(function (el) {
        const $el = el;
        const $first = $el.querySelector('.first-inp');
        const $last = $el.querySelector('.last-inp');
        const $isInited = $el.classList.contains('_inited');
        if ($first && $last) {
          $el.classList.add('multiple');
        }
        if ($first) {
          $firstRange($el);
          if (!$isInited) {
            $first.addEventListener(
              'input',
              function () {
                $firstRange($el);
              },
              false
            );
          }
        } else if ($el.querySelector('.thumb.first')) {
          $el.querySelector('.thumb.first').style.display = 'none';
        }
        if ($last) {
          $lastRange($el);
          if (!$isInited) {
            $last.addEventListener(
              'input',
              function () {
                $lastRange($el);
              },
              false
            );
          }
        } else if ($el.querySelector('.thumb.last')) {
          $el.querySelector('.thumb.last').style.display = 'none';
        }
        $el.classList.add('_inited');
      });
    }
  },
  jqRange: function () {
    if ($('.jq-range-slider').length) {
      $('.jq-range-slider').each(function () {
        const $this = $(this);
        if ($this.hasClass('_inited')) return;
        const isMutilple = $this.hasClass('multiple') ? true : false;
        const $slider = $this.find('.slider');
        const $list = $this.find('.list');
        let $dot;
        const $inp = $this.find('input[type=hidden]');
        const $unit = $list.data('unit') !== undefined ? $list.data('unit').split(',') : '';
        //const $unit = $list.data('unit') !== undefined ? $list.data('unit') : '';
        const $title = $list.attr('title');
        const noHandle = $this.hasClass('no-handle-tip') ? false : true;
        let $min = parseInt($slider.data('min'));
        let $max = parseInt($slider.data('max'));
        let $val = isMutilple ? $slider.data('value') : parseInt($slider.data('value'));
        let $step = parseInt($slider.data('step'));

        if (!$min) $min = 0;
        if (!$max) $max = 10;
        if (!$step) $step = 1;
        if (!$val) $val = $min;

        if ($list.length) {
          $list.empty();
          $slider.find('.dot').remove();
          if (!!$title) $list.removeAttr('title').append('<strong class="blind">' + $title + '</strong>');
          const $total = ($max - $min) / $step;
          const $stepLeft = 100 / $total;
          let $listHtml = '<ul>';
          let $dotHtml = '<ul class="dot">';
          for (let i = 0; i <= $total; i++) {
            const $setLeft = $stepLeft * i;
            $dotHtml += '<li style="left:' + $setLeft + '%"></li>';
            if (isMutilple) {
              $listHtml += '<li style="left:' + $setLeft + '%"><span>' + ($unit.length > 1 ? $unit[i] : i * $step + $min + $unit) + '</span></li>';
            } else {
              $listHtml += '<li style="left:' + $setLeft + '%"><a href="#">' + ($unit.length > 1 ? $unit[i] : i * $step + $min + $unit) + '</a></li>';
            }
          }
          $listHtml += '</ul>';
          $dotHtml += '</ul>';
          $list.append($listHtml);
          if ($list.hasClass('append-dot')) {
            $slider.prepend($dotHtml);
            $dot = $slider.find('.dot');
          }
        }

        if ($inp.length) $inp.val($val);
        const range = $slider.slider({
          range: isMutilple ? true : 'min',
          min: $min,
          max: $max,
          value: isMutilple ? null : $val,
          values: isMutilple ? $val : null,
          step: $step,
          create: function (e) {
            $this.addClass('_inited');
            if (isMutilple) {
              if (noHandle) {
                $slider
                  .find('.ui-slider-handle')
                  .first()
                  .html('<i>' + ($unit.length > 1 ? $unit[$val[0]] : $val[0] + $unit) + '</i>');
                $slider
                  .find('.ui-slider-handle')
                  .last()
                  .html('<i>' + ($unit.length > 1 ? $unit[$val[1]] : $val[1] + $unit) + '</i>');
              }
              $list
                .find('li')
                .eq(($val[0] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              $list
                .find('li')
                .eq(($val[1] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              if ($dot) {
                $dot
                  .find('li')
                  .eq(($val[0] - $min) / $step)
                  .addClass('on');
                $dot
                  .find('li')
                  .eq(($val[1] - $min) / $step)
                  .addClass('on');
              }
            } else {
              if (noHandle) {
                $slider.find('.ui-slider-handle').html('<i>' + ($unit.length > 1 ? $unit[$val] : $val + $unit) + '</i>');
              }
              $list
                .find('li')
                .eq(($val - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              if ($dot) {
                $dot
                  .find('li')
                  .eq(($val - $min) / $step)
                  .addClass('on');
              }
            }
          },
          stop: function (event, ui) {
            if (isMutilple) {
              if ($inp.length) $inp.val(ui.values).change();
              if (noHandle) {
                $slider.data('value', ui.values);
                $slider
                  .find('.ui-slider-handle')
                  .eq(ui.handleIndex)
                  .find('i')
                  .html($unit.length > 1 ? $unit[ui.value] : ui.value + $unit);
              }
              $list.find('li').removeClass('on').find('a').removeAttr('title');
              if ($dot) $dot.find('li').removeClass('on');
              $list
                .find('li')
                .eq((ui.values[0] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              $list
                .find('li')
                .eq((ui.values[1] - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');
              if ($dot) {
                $dot
                  .find('li')
                  .eq((ui.values[0] - $min) / $step)
                  .addClass('on');
                $dot
                  .find('li')
                  .eq((ui.values[1] - $min) / $step)
                  .addClass('on');
              }
            } else {
              if ($inp.length) $inp.val(ui.value).change();
              if (noHandle) {
                $slider.data('value', $unit.length > 1 ? $unit[ui.value] : ui.value);
              }
              $(ui.handle)
                .find('i')
                .html(ui.value + $unit);
              $list
                .find('li')
                .eq((ui.value - $min) / $step)
                .siblings()
                .removeClass('on')
                .find('a')
                .removeAttr('title');
              $list
                .find('li')
                .eq((ui.value - $min) / $step)
                .addClass('on')
                .find('a')
                .attr('title', '현재선택');

              if ($dot) {
                $dot
                  .find('li')
                  .eq((ui.value - $min) / $step)
                  .addClass('on');
              }
            }
          }
        });

        if (!isMutilple) {
          $list.find('a').click(function (e) {
            e.preventDefault();
            const $txt = parseInt($(this).text());
            range.slider('value', $txt);
            $slider.find('.ui-slider-handle i').text($txt + $unit);
            if ($inp.length) $inp.val($txt).change();
            $(this).parent().addClass('on').find('a').attr('title', '현재선택');
            $(this).parent().siblings().removeClass('on').find('a').removeAttr('title');
          });
        }
      });
    }
  },
  jqCalendar: function (element, callback, defaultDate) {
    //jquery UI datepicker
    const $dimmedClass = 'datepicker-dimmed';
    const swipeArr = $('<div class="swipe-arr" aria-hidden="true"><i class="arr top"></i><i class="arr bottom"></i><i class="arr left"></i><i class="arr right"></i></div>');
    const swipeGuide = $('<div class="datepicker-guide">달력 부분을 상,하,좌,우 드래그하면<br />편리하게 이동할 수 있어요.</div>');
    let isSwipeGuide = true;
    const prevYrBtn = $('<a href="#" role="button" class="ui-datepicker-prev-y" aria-label="이전년도 보기"><span>이전년도 보기</span></a>');
    const nextYrBtn = $('<a href="#" role="button" class="ui-datepicker-next-y" aria-label="다음년도 보기"><span>다음년도 보기</span></a>');
    const calendarOpen = function (target, ob, delay) {
      if (delay == undefined || delay == '') delay = 5;
      setTimeout(function () {
        const $isInline = ob.inline ? true : false;
        const $calendar = $isInline ? '#' + ob.id : '#' + ob.dpDiv[0].id;
        const $header = $($calendar).find('.ui-datepicker-header');
        const $container = $($calendar).find('.ui-datepicker-calendar');
        const $min = $.datepicker._getMinMaxDate(target.data('datepicker'), 'min');
        const $minY = $min.getFullYear();
        const $max = $.datepicker._getMinMaxDate(target.data('datepicker'), 'max');
        const $maxY = $max.getFullYear();
        const $selectedYear = ob.selectedYear;
        const $inlineInpClass = 'ui-datepicker-inline-inp';
        if ($isInline) {
          //인라인달력
          if (!$($calendar).find('.' + $inlineInpClass).length && !$($calendar).closest('.calendar-swiper').length) $($calendar).append('<div class="input mt10 blind"><input type="text" class="ui-datepicker-inline-inp" readonly></div>');
          const $getDate = $(target).datepicker('getDate');
          const $date = $.datepicker.formatDate('yy.mm.dd', $getDate);
          const $input = $($calendar).find('.ui-datepicker-inline-inp');
          if ($input.length) $input.val($date);
        } else {
          //팝업달력
          if (!$($calendar).find('.swipe-arr').length) $($calendar).prepend(swipeArr);
          if (isSwipeGuide) {
            $($calendar).addClass('add-guide').append(swipeGuide);
            isSwipeGuide = false;
          } else {
            $($calendar).removeClass('add-guide');
          }
          if (!$('.' + $dimmedClass).length) $($calendar).before('<div class="' + $dimmedClass + '" aria-hidden="true"></div>');
        }

        $header.find('.ui-datepicker-year').attr('title', '년 선택');
        $header.find('.ui-datepicker-month').attr('title', '월 선택');
        $container.find('td>a').attr('role', 'button');
        if ($container.find('.ui-state-highlight').length) $container.find('.ui-state-highlight').attr('title', '오늘 일자');
        if ($container.find('.ui-state-active').length) $container.find('.ui-state-active').attr('title', '현재 달력에서 선택된 일자');

        const $prevMonthBtn = $header.find('.ui-datepicker-prev');
        const $nextMonthBtn = $header.find('.ui-datepicker-next');
        $prevMonthBtn
          .attr({
            role: 'button',
            'aria-label': '이전달 보기'
          })
          .before(prevYrBtn);
        const $prevYearBtn = $header.find('.ui-datepicker-prev-y');
        if ($selectedYear <= $minY) {
          $prevYearBtn.addClass('ui-state-disabled').attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .top').addClass('off');
        } else {
          $prevYearBtn.removeClass('ui-state-disabled').removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .top').removeClass('off');
        }
        $nextMonthBtn
          .attr({
            role: 'button',
            'aria-label': '다음달 보기'
          })
          .after(nextYrBtn);
        const $nextYearBtn = $header.find('.ui-datepicker-next-y');
        if ($selectedYear >= $maxY) {
          $nextYearBtn.addClass('ui-state-disabled').attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .bottom').addClass('off');
        } else {
          $nextYearBtn.removeClass('ui-state-disabled').removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .bottom').removeClass('off');
        }
        if ($prevMonthBtn.hasClass('ui-state-disabled')) {
          $prevMonthBtn.attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .left').addClass('off');
        } else {
          $prevMonthBtn.removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .left').removeClass('off');
        }
        if ($nextMonthBtn.hasClass('ui-state-disabled')) {
          $nextMonthBtn.attr('aria-disabled', true);
          $($calendar).find('.swipe-arr .right').addClass('off');
        } else {
          $nextMonthBtn.removeAttr('aria-disabled');
          $($calendar).find('.swipe-arr .right').removeClass('off');
        }

        //$header.find('.ui-datepicker-title').append('월');
        $header.find('.ui-datepicker-prev, .ui-datepicker-next').attr('href', '#');
        if (!$isInline) {
          if (ui.Mobile.any()) {
            $($calendar).find('.title').attr('tabindex', -1).focus();
            if ($('#wrap').length) $('#wrap').attr('aria-hidden', true);
          } else {
            $($calendar).attr('tabindex', 0).focus();
            Layer.focusMove($calendar);
          }

          if (!$container.data('init')) {
            $container.data('init', true);
            $container.swipe({
              swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
                const $this = $(this);
                const $max = 30;
                const $btnPrevMonth = $header.find('.ui-datepicker-prev');
                const $btnNextMonth = $header.find('.ui-datepicker-next');
                const $btnPrevYear = $header.find('.ui-datepicker-prev-y');
                const $btnNextYear = $header.find('.ui-datepicker-next-y');
                if (direction != null) {
                  let $distance = Math.min($max, distance);
                  if (direction == 'left' || direction == 'up') $distance = -$distance;
                  if (direction == 'left' || direction == 'right') $this.css('left', $distance);
                  if (direction == 'up' || direction == 'down') $this.css('top', $distance);
                  if (phase == 'end' || phase == 'cancel') {
                    $this.animate(
                      {
                        left: 0,
                        top: 0
                      },
                      200,
                      function () {
                        if (Math.abs($distance) >= $max) {
                          if (direction == 'right' && !$btnPrevMonth.hasClass('ui-state-disabled')) $btnPrevMonth.click();
                          if (direction == 'left' && !$btnNextMonth.hasClass('ui-state-disabled')) $btnNextMonth.click();
                          if (direction == 'down' && !$btnPrevYear.hasClass('ui-state-disabled')) $btnPrevYear.click();
                          if (direction == 'up' && !$btnNextYear.hasClass('ui-state-disabled')) $btnNextYear.click();
                        }
                      }
                    );
                  }
                }
              },
              cancleTreshold: 0
            });
          }
        }

        $header
          .find('.ui-datepicker-prev-y')
          .unbind('click')
          .bind('click', function () {
            if (!$(this).hasClass('ui-state-disabled')) $.datepicker._adjustDate(target, -1, 'Y');
          });
        $header
          .find('.ui-datepicker-next-y')
          .unbind('click')
          .bind('click', function () {
            if (!$(this).hasClass('ui-state-disabled')) $.datepicker._adjustDate(target, +1, 'Y');
          });
      }, delay);
    };
    const calendarClose = function (target, ob, date) {
      const $isInline = ob.inline ? true : false;
      const $calendar = $isInline ? '#' + ob.id : '#' + ob.dpDiv[0].id;
      const $cal = $($calendar);
      if ($isInline) {
        //인라인달력
        const $date = date;
        const $input = $cal.find('.ui-datepicker-inline-inp');
        if ($input.length) $input.val($date);
      } else {
        //팝업달력
        Body.unlock();
        $(ob.input).change();
        if ($('#wrap').length) $('#wrap').removeAttr('aria-hidden');
        $cal.find('.title').removeAttr('tabindex');
        $('.' + $dimmedClass).remove();
        $(target).next('.ui-datepicker-trigger').focus();
        if ($(target).data('isReadonly') != true) $(target).prop('readonly', false);
      }
    };

    if ($(element).length) {
      $(element).each(function () {
        const $this = $(this);
        if ($this.hasClass('_inited')) return;
        let $minDate = $(this).data('min');
        let $maxDate = $(this).data('max');
        let $defaultDate = $(this).data('default');
        let $range = $(this).data('range');
        if ($minDate == undefined) $minDate = '-100y';
        if ($maxDate == undefined) $maxDate = '+100y';
        if ($defaultDate == undefined) {
          $defaultDate = null;
        } else {
          if ($this.val() == '') $this.val($defaultDate);
        }
        if (!!defaultDate) $defaultDate = defaultDate;
        if ($range == undefined) $range = '-100:+100';
        const $inlineTag = 'div, span';
        let $isInline = false;
        if ($this.is($inlineTag)) $isInline = true;
        $this.datepicker({
          minDate: $minDate,
          maxDate: $maxDate,
          defaultDate: $defaultDate,
          closeText: '닫기',
          prevText: '이전달 보기',
          nextText: '다음달 보기',
          currentText: '오늘',
          buttonText: '기간조회',
          monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
          dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
          dateFormat: 'yy.mm.dd',
          yearRange: $range,
          yearSuffix: '. ',
          showMonthAfterYear: true,
          showButtonPanel: true,
          showOn: 'button',
          changeMonth: true,
          changeYear: true,
          showOtherMonths: true,
          selectOtherMonths: true,
          beforeShow: function (el, ob) {
            //열때
            if (!$isInline) {
              Body.lock();
              if ($this.prop('readonly') == true) {
                $this.data('isReadonly', true);
              } else {
                $this.prop('readonly', true);
              }
            }

            //기간 선택
            const $closest = $(this).closest('.date_wrap');
            if ($closest.length && $closest.find(element).length == 2) {
              const $idx = $closest.find(element).index(this);
              const $first = $closest.find(element).eq(0);
              const $last = $closest.find(element).eq(1);
              if ($idx == 0 && $last.val() != '') $first.datepicker('option', 'maxDate', $last.val());
              if ($idx == 1 && $first.val() != '') $last.datepicker('option', 'minDate', $first.val());
            }

            calendarOpen($this, ob);
          },
          onChangeMonthYear: function (y, m, ob) {
            //달력 바뀔때
            calendarOpen($this, ob);
          },
          onSelect: function (d, ob) {
            //선택할때
            calendarClose($this, ob, d);
            if ($isInline) calendarOpen($this, ob);

            //콜백
            if (!!callback) callback();
          },
          onClose: function (d, ob) {
            //닫을때
            calendarClose($this, ob, d);
          }
        });
        $this.addClass('_inited');
        if ($isInline) {
          const $ob = $.datepicker._getInst($this[0]);
          calendarOpen($this, $ob);
        }

        //달력버튼 카드리더기에서 안읽히게
        $(this).siblings('.ui-datepicker-trigger').attr({
          'aria-label': '달력팝업으로 기간조회'
          //'aria-hidden':true,
          //'tabindex':-1
        });

        $('.' + $dimmedClass)
          .off('touchstart')
          .on('touchstart', function () {
            $('.hasDatepicker').datepicker('hide');
          });
      });

      $(element).focusin(function () {
        if ($(this).hasClass('ui-date')) {
          const $val = $(this).val();
          $(this).val(onlyNumber($val));
        }
      });
      $(element).focusout(function () {
        if ($(this).hasClass('ui-date')) {
          const $val = $(this).val();
          $(this).val(autoDateFormet($val, '.'));
        }
      });
    }
  },
  character: function () {
    let $timer;
    const $character = document.querySelector('.character-face');
    if ($character === null) return;
    const $characterHidden = document.querySelector('.character-hidden');
    const _rotate3d = function (x, y, z, rad) {
      const face = $character.querySelectorAll('.ears, .eyes, .mouse');
      const value = 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + rad + 'rad)';
      face.forEach(function (el) {
        el.style.transform = value;
      });
    };
    const _reset = function () {
      clearTimeout($timer);
      $character.classList.remove('playing');
      $timer = setTimeout(function () {
        $character.classList.remove('look-away', 'down', 'up');
        _rotate3d(0, 0, 0, 0);
      }, 1);
    };
    const _characterLook = function (event) {
      const el = event.target;
      const text = el.value.substr(0, el.selectionStart);
      $characterHidden.innerHTML = '<span>' + text + '.</span>';

      const characterRect = $character.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const caretRect = $characterHidden.getBoundingClientRect();
      const caretPos = caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text;
      const distCaret = characterRect.left + characterRect.width / 2 - inputRect.left - caretPos;
      const distInput = characterRect.top + characterRect.height / 2 - inputRect.top;
      const y = Math.atan2(-distCaret, Math.abs(distInput) * 3);
      const x = Math.atan2(distInput, (Math.abs(distInput) * 3) / Math.cos(y));
      const angle = Math.max(Math.abs(x), Math.abs(y));
      _rotate3d(x / angle, y / angle, y / angle / 2, angle);
    };
    const _characterLookAway = function (event) {
      const el = event.target;
      const characterRect = $character.getBoundingClientRect();
      const inputRect = el.getBoundingClientRect();
      const distInput = characterRect.top + characterRect.height / 2 - inputRect.top;

      $character.classList.add('look-away', distInput < 0 ? 'up' : 'down');

      $timer = setTimeout(function () {
        $character.classList.add('playing');
      }, 300);
    };

    const _inpEvt = function (e) {
      const el = e.target;
      setTimeout(function () {
        if (el.type === 'password') {
          _characterLookAway(e);
        } else {
          _characterLook(e);
        }
      }, 2);
    };

    // init
    const $input = document.querySelectorAll('.input input');
    for (let i = 0; i < $input.length; i++) {
      const $inp = $input[i];
      $inp.addEventListener('focusin', _inpEvt, false);
      $inp.addEventListener('click', _inpEvt, false);
      $inp.addEventListener('keyup', _inpEvt, false);
      $inp.addEventListener('keypress', _inpEvt, false);
      $inp.addEventListener('focusout', _reset, false);
    }
  },
  reInit: function () {
    ui.Form.winLoad();
    ui.Form.select();
    // ui.Form.select2();
    ui.Form.textarea();
    ui.Form.agree();
    ui.Form.mail();

    ui.Form.spinner();
    ui.Form.range();
    ui.Form.jqRange();
    ui.Form.jqCalendar('.datepicker');
  },
  init: function () {
    ui.Form.focus();
    ui.Form.select();
    // ui.Form.select2();
    ui.Form.selectUI();
    ui.Form.inputUI();
    ui.Form.inpBtn();
    ui.Form.textarea();
    ui.Form.textareaUI();
    ui.Form.agree();
    ui.Form.mail();

    ui.Form.spinnerUI();
    ui.Form.spinner();
    ui.Form.range();
    ui.Form.jqRange();
    ui.Form.jqCalendar('.datepicker');

    //입력 텍스트 카운팅(입력)
    $(document).on('keypress keyup', '[data-text-count]', function (e) {
      ui.Form.textCount(this, e);
    });
    $(document).on('paste cut', '[data-text-count]', function (e) {
      if (e.originalEvent.clipboardData) {
        ui.Form.textCount(this, e);
      }
    });
  }
};

//테이블 스크롤 가이드
ui.Table = {
  class: '.tbl-scroll-in',
  guideScroll: function () {
    const $tbl = $(ui.Table.class);
    if (!$tbl.length) return;
    $tbl.each(function () {
      const $this = $(this);
      $this.data('first', true);
      $this.data('direction', '좌우');
      $(this).on('scroll', function () {
        $this.data('first', false);
        $this.find('.tbl-guide').remove();
        //$this.removeAttr('title');

        const $sclInfo = $this.next('.tbl-scroll-ifno');
        if ($sclInfo.length) {
          const $sclPercentX = ui.Scroll.sclPer($this).x;
          const $sclPercentY = ui.Scroll.sclPer($this).y;
          const $horizon = $sclInfo.find('.horizon');
          const $vertical = $sclInfo.find('.vertical');
          if ($horizon.is(':visible')) $horizon.children().css('width', $sclPercentX + '%');
          if ($vertical.is(':visible')) $vertical.children().css('height', $sclPercentY + '%');
        }
      });
    });
  },
  guideResize: function () {
    const $tbl = $(ui.Table.class);
    if (!$tbl.length) return;
    $tbl.each(function () {
      const $this = $(this);
      const $direction = $this.data('direction');
      let $changeDirection = '';
      const $guide = '<div class="tbl-guide" title="해당영역은 테이블을 스크롤하면 사라집니다."><div><i class="icon" aria-hidden="true"></i>테이블을 ' + $direction + '로 스크롤하세요.</div></div>';
      const $height = $this.outerHeight();

      const $isScrollX = ui.Scroll.is($this).x;
      const $isScrollY = ui.Scroll.is($this).y;
      const $sclInfoHtml = '<div class="tbl-scroll-ifno" aria-hidden="true"><div class="horizon"><div></div></div><div class="vertical"><div></div></div></div>';
      let $sclIfno = $this.next('.tbl-scroll-ifno');
      if ($this.data('first')) {
        if ($isScrollX && $isScrollY) {
          $changeDirection = '상하좌우';
        } else if ($isScrollX) {
          $changeDirection = '좌우';
        } else if ($isScrollY) {
          $changeDirection = '상하';
        } else {
          $changeDirection = '';
        }

        if ($changeDirection == '') {
          $this.removeAttr('tabindex').find('.tbl-guide').remove();
          $sclIfno.remove();
          $this.removeAttr('title');
        } else {
          if (!$this.find('.tbl-guide').length) {
            if (!ui.Mobile.any()) {
              $this.attr('tabindex', 0); //pc일땐 tabindex 사용
            }
            $this.prepend($guide);
          }
          if (!$sclIfno.length) {
            $this.after($sclInfoHtml);
            $sclIfno = $this.next('.tbl_scroll_ifno');
          }
          if ($sclIfno.length) {
            $sclIfno.find('.vertical').css('height', $height);
            $sclIfno.find('.vertical').show();
            $sclIfno.find('.horizon').show();
            if ($changeDirection == '좌우') {
              $sclIfno.find('.vertical').hide();
            } else if ($changeDirection == '상하') {
              $sclIfno.find('.horizon').hide();
            }
          }

          $this.attr('title', '터치스크롤하여 숨겨진 테이블영역을 확인하세요');
        }

        if ($direction != $changeDirection && $this.find('.tbl-guide').length) {
          $this.find('.tbl-guide').changeTxt($direction, $changeDirection);
          $this.data('direction', $changeDirection);
        }
      }
    });
  }
};

//리스트 관련 UI
ui.List = {
  winLoad: function () {
    //토글실행
    ui.Folding.list('.ui-folding', '.folding-btn', '.folding-panel');
    ui.Folding.btn('.ui-folding-btn');
    ui.Folding.close('.ui-folding-close');

    //테이블 스크롤 가이드 실행
    ui.Table.guideScroll();
    ui.Table.guideResize();
  },
  check: function () {
    const $wrapClass = '.ui-chk-wrap';
    const $allChkClass = '.ui-all-chk';
    const $chkClass = '.ui-chk';

    // 전체동의
    $(document).on('change', $wrapClass + ' ' + $allChkClass, function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $items = $wrap.find($chkClass).not(':disabled');
      if ($this.prop('checked')) {
        if ($this.hasClass('_not_change_event')) $items.prop('checked', true);
        else $items.prop('checked', true).change();
      } else {
        if ($this.hasClass('_not_change_event')) $items.prop('checked', false);
        else $items.prop('checked', false).change();
      }
    });
    $(document).on('change', $wrapClass + ' ' + $chkClass, function () {
      const $this = $(this);
      const $wrap = $this.closest($wrapClass);
      const $allchk = $wrap.find($allChkClass);
      const $items = $wrap.find($chkClass).not(':disabled');
      const $itemsLength = $items.length;
      const $itemsChecked = $wrap.find($chkClass + ':checked').not(':disabled').length;
      if ($itemsLength === $itemsChecked) {
        $allchk.prop('checked', true);
      } else {
        $allchk.prop('checked', false);
      }
    });
  },
  reInit: function () {
    ui.List.winLoad();
  },
  init: function () {
    ui.List.check();
  }
};

//아코디언 함수
ui.Folding = {
  listAria: function (list, btn, panel, addClass) {
    if (!addClass) addClass = 'open';
    if ($(list).length) {
      $(list).each(function (e) {
        $(this)
          .children()
          .each(function (f) {
            const $btn = $(this).find(btn);
            let $btnId = $btn.attr('id');
            const $panel = $(this).find(panel);
            let $panelId = $panel.attr('id');
            if ($btn.length && $btn.attr('aria-expanded') == undefined) {
              if ($btnId == undefined) {
                $btnId = 'tglist_btn_' + e + '_' + f;
                $btn.attr('id', $btnId);
              }
              if ($panelId == undefined) {
                $panelId = 'tglist_panel_' + e + '_' + f;
                $panel.attr('id', $panelId);
              }
              $btn.attr({
                role: 'button',
                'aria-expanded': false,
                href: '#' + $panelId,
                'aria-controls': $panelId
              });
              $panel.attr({
                'aria-hidden': 'true',
                'aria-labelledby': $btnId
              });
            }
            if (!$btn.length) {
              $panel.show();
            }
          });
      });
      if ($(list).find('.' + addClass).length) {
        $(list)
          .find('.' + addClass)
          .each(function () {
            $(this).find(btn).attr('aria-expanded', true);
            $(this).find(panel).removeAttr('aria-hidden').show();
            if ($(this).find(btn).children('span').length && $(this).find(btn).children('span').text() == '더보기') {
              $(this).find(btn).children('span').text('닫기');
            }
          });
      }
    }
  },
  list: function (list, btn, panel, addClass, speed) {
    if (!addClass) addClass = 'open';
    if (!speed) speed = 200;
    $(list).each(function (e) {
      const isFolding = $(this).data('folding');
      if (isFolding) return;
      $(this).data('folding', true);
      $(this)
        .find(btn)
        .on('click', function (e) {
          e.preventDefault();
          const $this = $(this);
          const $list = $this.closest(list);
          const $li = $this.closest('li');
          let $openDelay = 0;
          if ($this.closest('.disabled').length || $this.hasClass('disabled')) return false;

          const slideCallback = function () {
            if ($li.find(panel).find('.ui-swiper').length) {
              ui.Swiper.update($li.find(panel).find('.ui-swiper'));
            }
          };

          if ($li.hasClass(addClass)) {
            $li.find(btn).attr('aria-expanded', false);
            $li.removeClass(addClass);
            $li
              .find(panel)
              .attr('aria-hidden', true)
              .stop(true, false)
              .slideUp(speed, function () {
                slideCallback();
              });
            if ($this.children('span').length && $this.children('span').text() == '닫기') {
              $this.children('span').text('더보기');
            }
          } else {
            $li.addClass(addClass).find(btn).attr('aria-expanded', true);
            if (!$list.hasClass('not-toggle')) {
              const $siblings = $li.siblings();
              $siblings.removeClass(addClass).find(btn).attr('aria-expanded', false);
              $siblings.find(panel).attr('aria-hidden', true).stop(true, false).slideUp(speed);
              if ($siblings.find(btn).children('span').length && $siblings.find(btn).children('span').text() == '닫기') {
                $siblings.find(btn).children('span').text('더보기');
              }
            }
            if ($li.find(panel).html() == '') $openDelay = 100;
            $li
              .find(panel)
              .removeAttr('aria-hidden')
              .stop(true, false)
              .delay($openDelay)
              .slideDown(speed, function () {
                ui.Scroll.inScreen($this, this);
                slideCallback();
              });
            if ($this.children('span').length && $this.children('span').text() == '더보기') {
              $this.children('span').text('닫기');
            }
          }
        });

      ui.Folding.listAria(this, btn, panel, addClass);
    });
  },
  btnAria: function (btn, className) {
    if (className == undefined) className = 'open';
    if ($(btn).length) {
      $(btn).each(function (e) {
        const $btn = $(this);
        let $btnId = $btn.attr('id');
        const $href = $btn.attr('href');
        let $panelId = $href === undefined ? null : $btn.attr('href').substring(1);
        let $panel = $('#' + $panelId);
        //if($btn.attr('aria-expanded') != undefined) return false;
        const $closest = $btn.closest('.folding-list').length ? $btn.closest('.folding-list') : $btn.closest('.folding');
        if ((!$panelId || $panelId == 'none') && $closest.length) {
          $panel = $closest.find('.folding-panel');
          if ($panel.attr('id')) $panelId = $panel.attr('id');
        }
        if (!$panel.length) return;
        if (!$btnId) $btnId = 'fdBtn_' + e;
        if ($panelId == '' || $panelId == 'none' || $panelId == null) $panelId = 'fdPanel_' + e;
        $btn.attr({
          id: $btnId,
          role: 'button',
          href: '#' + $panelId,
          'aria-expanded': false,
          'aria-controls': $panelId
        });
        $panel.attr({
          id: $panelId,
          'aria-hidden': 'true',
          'aria-labelledby': $btnId
        });
        //panel이 보이면
        if ($panel.is(':visible')) {
          $(this).addClass(className).attr('aria-expanded', true);
        }
        //btn이 활성화면
        if ($(this).hasClass(className)) {
          $(this).attr('aria-expanded', true);
          $panel.removeAttr('aria-hidden').show();
        }
      });
    }
  },
  btn: function (btn, className, speed) {
    if (!className) className = 'open';
    if (!speed) speed = 200;
    ui.Folding.btnAria(btn, className);
    $(btn).each(function () {
      const $btn = $(this);
      if ($btn.data('_ui-init')) return;
      $btn.data('_ui-init', true);
      $btn.on('click', function (e) {
        e.preventDefault();
        const $this = $(this);
        let $panel = $this.attr('href');
        if ($this.closest('.disabled').length || $this.hasClass('disabled')) return false;

        const slideCallback = function () {
          if ($($panel).find('.ui-swiper').length) {
            ui.Swiper.update($($panel).find('.ui-swiper'));
          }
        };

        if (($panel == '#' || $panel == '#none') && $this.closest('.folding-list').length) $panel = $this.closest('.folding-list').find('.folding-panel');
        if ($this.hasClass(className) && !$this.hasClass('_not-folding-hide')) {
          $this.removeClass(className).attr('aria-expanded', false);
          $($panel)
            .attr('aria-hidden', true)
            .stop(true, false)
            .slideUp(speed, function () {
              slideCallback();
            });
        } else if (!$($panel).is(':visible')) {
          $this.addClass(className).attr('aria-expanded', true);
          $($panel)
            .removeAttr('aria-hidden')
            .stop(true, false)
            .slideDown(speed, function () {
              ui.Scroll.inScreen($this, $($panel));
              slideCallback();
            });
        }
      });
    });
  },
  close: function (btn, className, speed) {
    if (!className) className = 'open';
    if (!speed) speed = 200;
    $(btn).each(function () {
      const $this = $(this);
      if ($this.data('_ui-init')) return;
      $this.data('_ui-init', true);
      $this.on('click', function (e) {
        e.preventDefault();
        const $closest = $(this).closest('[aria-labelledby]');
        const $btn = $closest.attr('aria-labelledby');
        if ($closest.length) {
          $closest.attr('aria-hidden', true).stop(true, false).slideUp(speed);
          if ($('#' + $btn).length)
            $('#' + $btn)
              .removeClass(className)
              .attr('aria-expanded', false);
        }
      });
    });
  }
};

//Swiper
ui.Swiper = {
  base: function (tar, changeEvt) {
    $(tar).each(function () {
      const $this = $(this);
      const $swiper = $this.find('.swiper');
      const $pagination = $this.find('.swiper-pagination');
      const $slide = $this.find('.swiper-slide');
      if (!$slide.length) return;

      let $paginationType = 'bullets';
      if ($this.hasClass('_fraction')) $paginationType = 'fraction';

      let $navigation = false;
      if ($this.hasClass('_navi')) {
        let $btnHtml = '';
        if (!$swiper.find('.swiper-button-prev').length) $btnHtml += '<button type="button" class="swiper-button-prev swiper-button"></button>';
        if (!$swiper.find('.swiper-button-next').length) $btnHtml += '<button type="button" class="swiper-button-next swiper-button"></button>';
        if ($btnHtml !== '') $swiper.append($btnHtml);
        $navigation = {
          prevEl: $this.find('.swiper-button-prev')[0],
          nextEl: $this.find('.swiper-button-next')[0]
        };
      }

      let $slidesPerView = 'auto';
      if ($this.data('view') !== undefined) {
        $slidesPerView = $this.data('view');
        $this.removeAttr('data-view');
      }

      let $loop = $this.hasClass('_loop') ? true : false;
      let $autoHeight = $this.hasClass('_autoHeight') ? true : false;
      let $centeredSlides = $this.hasClass('_centeredSlides') ? true : false;

      let $auto = false;
      if ($this.data('auto') !== undefined) {
        $auto = {
          delay: $this.data('auto'),
          disableOnInteraction: false
        };
        $this.removeAttr('data-auto');
        if (!$this.find('.swiper-auto-ctl').length) {
          if (!$this.find('.swiper-pagination-wrap').length) $pagination.wrap('<div class="swiper-pagination-wrap"></div>');
          $pagination.before('<button type="button" class="swiper-auto-ctl" aria-label="슬라이드 자동롤링 중지"></button>');
        }
      }
      let $parallax = false;
      if (
        $this.find('[data-swiper-parallax]').length ||
        $this.find('[data-swiper-parallax-x]').length ||
        $this.find('[data-swiper-parallax-y]').length ||
        $this.find('[data-swiper-parallax-scale]').length ||
        // $this.find('[data-swiper-parallax-duration]').length ||
        $this.find('[data-swiper-parallax-opacity]').length
      ) {
        $parallax = true;
      }

      let $zoom = false;
      if ($this.find('.swiper-zoom-container').length) {
        $zoom = {
          maxRatio: 2,
          toggle: true
        };
        $this.find('.swiper-zoom-container').each(function () {
          let $btnHtml = '<div class="swiper-zoom-btn">';
          $btnHtml += '<button type="button" role="button" class="swiper-zoom-in" aria-label="확대"></button>';
          $btnHtml += '<button type="button" role="button" class="swiper-zoom-out" aria-label="축소"></button>';
          $btnHtml += '</div>';
          $(this).before($btnHtml);
        });
      }

      let baseSwiper;
      if ($swiper.hasClass('swiper-initialized')) {
        baseSwiper = $this.data('swiper');
        if (baseSwiper !== undefined) baseSwiper.update();
      } else {
        baseSwiper = new Swiper($swiper[0], {
          pagination: {
            el: $pagination[0],
            type: $paginationType,
            clickable: true,
            renderBullet: function (index, className) {
              return '<button type="button" class="' + className + '" aria-label="' + (index + 1) + '번째 슬라이드로 이동"></button>';
            }
          },
          navigation: $navigation,
          slidesPerView: $slidesPerView,
          loop: $loop,
          autoHeight: $autoHeight,
          centeredSlides: $centeredSlides,
          autoplay: $auto,
          parallax: $parallax,
          zoom: $zoom,
          on: {
            init: function (e) {
              if ($navigation) {
                setTimeout(function () {
                  e.navigation.prevEl.ariaLabel = '이전 슬라이드로 이동';
                  e.navigation.nextEl.ariaLabel = '다음 슬라이드로 이동';
                }, 1);
              }
            },
            slideChangeTransitionEnd: function (e) {
              if (!!changeEvt) changeEvt(e);
            }
          }
        });
        $this.data('swiper', baseSwiper);
      }
    });
  },
  ready: function (tar) {
    const $target = $(tar);
    $target.each(function () {
      const $this = $(this);
      if (!$this.find('.swiper-slide').length) {
        let $children = $this.children();
        while ($children.hasClass('swiper') || $children.hasClass('swiper-wrapper')) {
          $children = $children.children();
        }
        $children.addClass('swiper-slide');
      }

      if (!$this.find('.swiper-wrapper').length) {
        if (!$this.find('.swiper').length) {
          $this.wrapInner('<div class="swiper-wrapper"></div>');
          $this.wrapInner('<div class="swiper"></div>');
        } else {
          $this.find('.swiper').wrapInner('<div class="swiper-wrapper"></div>');
        }
      } else if (!$this.find('.swiper').length) {
        $this.find('.swiper-wrapper').parent().wrapInner('<div class="swiper"></div>');
      }
      if (!$this.find('.swiper-pagination').length) {
        $this.append('<div class="swiper-pagination"></div>');
      }
    });
  },
  UI: function () {
    $(document).on('click', '.ui-swiper .swiper-auto-ctl', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $closest = $this.closest('.ui-swiper');
      const $swiper = $closest.data('swiper');
      if ($(this).hasClass('play')) {
        $swiper.autoplay.start();
        $(this).removeClass('play').changeAriaLabel('시작', '중지');
      } else {
        $swiper.autoplay.stop();
        $(this).addClass('play').changeAriaLabel('중지', '시작');
      }
    });

    $(document).on('click', '.ui-swiper .swiper-zoom-in', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $swiper = $this.closest('.ui-swiper').data('swiper');
      $swiper.zoom.in();
    });

    $(document).on('click', '.ui-swiper .swiper-zoom-out', function (e) {
      e.preventDefault();
      const $this = $(this);
      const $swiper = $this.closest('.ui-swiper').data('swiper');
      $swiper.zoom.out();
    });
  },
  update: function (target) {
    $(target).each(function () {
      const $this = $(this);
      const $swiper = $this.data('swiper');
      if ($swiper !== undefined) $swiper.update();
    });
  },
  reInit: function () {
    ui.Swiper.ready('.ui-swiper');
    ui.Swiper.base('.ui-swiper');
  },
  init: function () {
    if ($('.ui-swiper').length) {
      ui.Swiper.ready('.ui-swiper');
      ui.Swiper.base('.ui-swiper');
      ui.Swiper.UI();
    }
  }
};

//스크롤 관련
ui.Scroll = {
  inCheck: function (target) {
    //스크린안에 있는지 확인
    const $el = $(target);
    const isPopup = $el.closest('.' + Layer.bodyClass).length && $el.closest('.' + Layer.wrapClass).length;
    const $wrap = isPopup ? $el.closest('.' + Layer.bodyClass) : $(window);
    const $wHeight = $wrap.outerHeight();
    const $scrollTop = $wrap.scrollTop();
    const $winBottom = $scrollTop + $wHeight;
    const $elHeight = $($el).outerHeight();
    const $elTop = $($el).offset().top;
    const $elCenter = $elTop + $elHeight / 2;
    const $elBottom = $elTop + $elHeight;

    if ($elCenter >= $scrollTop && $elCenter <= $winBottom) {
      return true;
    } else {
      return false;
    }
  },
  isCSS: function (val) {
    const $type = ['auto', 'scroll', 'overlay', 'visible'];
    if ($type.indexOf(val) > -1) {
      return true;
    } else {
      return false;
    }
  },
  is: function (target) {
    const $obj = {
      x: false,
      width: 0,
      y: false,
      height: 0
    };
    const $target = $(target);
    if ($target.outerWidth() < $target.get(0).scrollWidth) {
      $obj.x = true;
      $obj.width = $target.get(0).scrollWidth - $target.outerWidth();
    }
    if ($target.outerHeight() < $target.get(0).scrollHeight) {
      $obj.y = true;
      $obj.height = $target.get(0).scrollHeight - $target.outerHeight();
    }
    return $obj;
  },
  top: function (val, speed, callback) {
    ui.Scroll.wrapTop('html, body', val, speed, callback);
  },
  wrapTop: function (wrap, val, speed, callback) {
    let $top = 0;
    if (speed == undefined) speed = 300;
    if ($.isNumeric(val)) {
      $top = val;
    } else {
      if ($(val).length) $top = $(val).offset().top;
    }
    $(wrap)
      .stop(true, false)
      .animate({ scrollTop: $top }, speed, function () {
        if (!!callback) callback();
      });
  },
  center: function (el, speed, direction) {
    let $parent = $(el).parent();
    while ($parent.css('overflow-x') !== 'auto' && !$parent.is('body')) {
      $parent = $parent.parent();
    }
    if (speed == undefined) speed = 200;
    if (!!direction && direction == 'vertical') {
      const $prtH = $parent.outerWidth();
      const $thisT = Math.round($(el).position().top);
      const $thisH = $(el).outerHeight();
      const $isScrollY = ui.Scroll.is($parent).y;
      let $sclT = $thisT - $prtH / 2 + $thisH / 2;
      if ($sclT < 0) $sclT = 0;
      if ($isScrollY) $parent.stop(true, false).animate({ scrollTop: $sclT }, speed);
    } else {
      const $prtW = $parent.outerWidth();
      const $thisL = Math.round($(el).position().left);
      const $thisW = $(el).outerWidth();
      const $isScrollX = ui.Scroll.is($parent).x;
      let $sclL = $thisL - $prtW / 2 + $thisW / 2;
      if ($sclL < 0) $sclL = 0;
      if ($isScrollX) $parent.stop(true, false).animate({ scrollLeft: $sclL }, speed);
    }
  },
  guide: function (element) {
    const $el = $(element);
    const $wrapClass = 'ui-scl-guide';
    const $contClass = 'ui-scl-cont';
    const $infoClass = 'ui-scl-info';
    const $barClass = 'ui-scl-bar';
    $el.each(function () {
      const $this = $(this);
      const $isSclGuide = $this.data('sclGuide');

      if (!$this.hasClass($contClass)) $this.addClass($contClass);
      if (!$this.parent().hasClass($wrapClass)) $this.wrap('<div class="' + $wrapClass + '"></div>');
      if (!$this.siblings('.' + $infoClass).length) $this.before('<div class="' + $infoClass + '" role="img" aria-label="스크롤하면 아래 숨겨진 컨텐츠를 확인 할 수 있습니다."></div>');
      if (!$this.siblings('.' + $barClass).length) $this.after('<div class="' + $barClass + '" aria-hidden="true"><div></div></div>');
      const $info = $this.siblings('.' + $infoClass);
      const $bar = $this.siblings('.' + $barClass);
      let $percent = ui.Scroll.sclPer(this).x;
      if ($percent <= 0) {
        $bar.hide();
      } else {
        $bar
          .show()
          .children()
          .css('width', $percent + '%');
      }
      const $sclGap = $this.get(0).scrollHeight - $this.outerHeight();
      if ($sclGap < 1) {
        $info.hide();
      } else {
        $info.show();
      }

      if (!$isSclGuide) {
        $this.data('sclGuide', true);
        $this.on('scroll', function () {
          $percent = ui.Scroll.sclPer(this).x;
          if ($percent <= 0) {
            $bar.hide();
          } else {
            $bar
              .show()
              .children()
              .css('width', $percent + '%');
          }
          if ($percent >= 100) {
            $info.hide();
          } else {
            $info.show();
          }
        });
      }
    });
  },
  sclPer: function (element, type) {
    const $obj = {
      x: 0,
      y: 0
    };
    $obj.x = Math.abs($(element).scrollLeft() / ui.Scroll.is(element).width) * 100;
    $obj.y = Math.abs($(element).scrollTop() / ui.Scroll.is(element).height) * 100;
    return $obj;
  },
  horizonScl: function () {
    const $wrap = '.tab-inner, .img-box-wrap';
    if (!$($wrap).length || ui.Mobile.any()) return;
    $($wrap).each(function () {
      const $this = $(this);
      if ($this.data('_ui-init')) return;
      $this.data('_ui-init', true);
      $this.on('mousewheel', function (e) {
        const $wheelDelta = e.originalEvent.wheelDelta;
        const $this = $(this);
        const $thisW = $this.outerWidth();
        const $thisSclW = $this[0].scrollWidth;
        const $widthGap = $thisSclW - $thisW;
        const $thisSclL = $this.scrollLeft();
        // console.log($thisSclW, $thisW, $widthGap, $thisSclL, $wheelDelta);
        let $isMove = false;
        const $move = function () {
          if ($isMove) return;
          $isMove = true;
          // $this.scrollLeft($thisSclL - $wheelDelta);
          $this.stop(false, true).animate({ scrollLeft: $thisSclL - $wheelDelta }, 100, function () {
            $isMove = false;
          });
        };

        if ($wheelDelta > 0) {
          //up
          if ($thisSclL > 0) {
            e.preventDefault();
            $move();
          }
        } else {
          //down
          if ($thisSclL + $thisW < $thisSclW) {
            e.preventDefault();
            $move();
          }
        }
      });
    });
  },
  loading: function (el, showCallback, hideCallback) {
    const io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (showCallback === false) observer.unobserve(entry.target);
            else if (!!showCallback) showCallback();
          } else {
            if (!!hideCallback) hideCallback();
          }
        });
      },
      {
        threshold: 0.03
      }
    );
    const $items = document.querySelectorAll(el);
    $items.forEach(function (odj) {
      io.observe(odj);
    });
  },
  /*
  inScreen: function (target, callback) {
    const $target = $(target);
    const $scrollTop = $(window).scrollTop();
    let $winHeight = $(window).height();
    const $bottomMargin = $('.bottom-fixed-space').length ? $('.bottom-fixed-space').outerHeight() + 10 : 10;
    const $topMargin = 10 + ui.Common.getTopFixedHeight(target);
    const $winTop = $scrollTop + $topMargin;
    const $winEnd = $scrollTop + $winHeight - $bottomMargin;
    const $targetTop = $target.offset().top;
    const $targetHeight = $target.outerHeight();
    const $targetEnd = $targetTop + $targetHeight;
    let $scroll = '';
    if ($winEnd < $targetEnd) {
      $scroll = Math.min($targetTop + $topMargin, $targetEnd - $winHeight + $bottomMargin);
    } else if ($winTop > $targetTop) {
      $scroll = $targetTop + $topMargin;
    }

    if ($scroll == '') {
      if (!!callback) callback();
    } else {
      ui.Scroll.top($scroll, 200, function () {
        if (!!callback) callback();
      });
    }
  },
  */
  inScreen: function (topEl, bototomEl, callback) {
    if (!bototomEl) bototomEl = topEl;
    const $scrollTop = $(window).scrollTop();
    let $winHeight = $(window).height();
    const $topMargin = ui.Common.getTopFixedHeight(topEl) > 0 ? ui.Common.getTopFixedHeight(topEl) + 10 : 0;
    const $bottomMargin = $('.bottom-fixed-space').length ? $('.bottom-fixed-space').outerHeight() + 10 : 0;
    const $winEnd = $scrollTop + $winHeight - $bottomMargin;
    const $topElTop = $(topEl).offset().top - $topMargin;
    const $bototomElTop = $(bototomEl).offset().top;
    const $bototomElHeight = $(bototomEl).outerHeight();
    const $bototomElEnd = $bototomElTop + $bototomElHeight;
    let $scroll = '';
    if ($winEnd < $bototomElEnd) {
      $scroll = Math.min($topElTop, $bototomElEnd - $winHeight + $bottomMargin);
    } else if ($scrollTop > $topElTop) {
      $scroll = $topElTop;
    }

    if ($scroll == '') {
      if (!!callback) callback();
    } else {
      ui.Scroll.top($scroll, 200, function () {
        if (!!callback) callback();
      });
    }
  },
  agree: function (isPop) {
    if (isPop === undefined) isPop = false;
    if (!$('.ui-scroll-btn').length) return;
    $('.ui-scroll-btn').click(function () {
      const $this = $(this);
      let $isPop = false;
      if ($this.closest('.popup').length) $isPop = true;
      let $innerHeight;
      let $scrollHeight;
      let $wrap;
      let $headHeight = 0;
      let $footHeight = 0;
      if ($isPop) {
        $wrap = $this.closest('.' + Layer.sclWrapClass).length ? $this.closest('.' + Layer.sclWrapClass) : $this.closest('.' + Layer.wrapClass);
        $innerHeight = $wrap.height();
        $scrollHeight = $wrap[0].scrollHeight;
        if ($wrap.find('.' + Layer.headClass).length) $headHeight = $wrap.find('.' + Layer.headClass).outerHeight();
        if ($wrap.find('.' + Layer.footClass).length) $footHeight = $wrap.find('.' + Layer.footClass).outerHeight();
      } else {
        $innerHeight = $(window).height();
        $scrollHeight = $('body')[0].scrollHeight;
        if ($('#header').length) $headHeight = $('#header').outerHeight();
        if ($('.bottom-fixed').length) $footHeight = $('.bottom-fixed > div').outerHeight();
      }
      // const $scrollMove = $scrollHeight - $innerHeight;
      const $scrollMove = $innerHeight - $headHeight - $footHeight;
      const $speed = Math.min(1000, Math.max(200, $scrollMove / 4));
      if ($isPop) {
        // $wrap.animate({ scrollTop: $scrollMove }, $speed);
        $wrap.animate({ scrollTop: '+=' + $scrollMove }, $speed);
      } else {
        $('html, body').animate({ scrollTop: '+=' + $scrollMove }, $speed);
        // ui.Scroll.top($scrollMove, $speed);
      }
    });
    const $scrollEvt = function () {
      const $scrollBtn = $('.ui-scroll-btn');
      if (!$scrollBtn.length || $scrollBtn.closest('.popup').length || !$scrollBtn.is(':visible')) return;
      const $innerHeight = $(window).height();
      const $scrollTop = $(window).scrollTop();
      const $scrollHeight = $('body')[0].scrollHeight;
      const $mainBtn = $scrollBtn.next('.button');
      if ($innerHeight + $scrollTop + 30 > $scrollHeight) {
        // $scrollBtn.remove();
        $scrollBtn.hide();
        $mainBtn.show();
      }
    };
    $scrollEvt();
    $(window).scroll($scrollEvt);
  },
  init: function () {
    ui.Scroll.agree();
    ui.Scroll.horizonScl();
  }
};

//data-animation
ui.Animation = {
  sclIdx: 0,
  sclAry: [],
  sclReady: function (target) {
    const $animations = $('[data-animation]');
    $.each($animations, function () {
      const $el = $(this);
      const $delay = parseInt($el.data('delay'));
      const $duration = parseInt($el.data('duration'));
      let $repeat = parseInt($el.data('repeat'));
      const $addClassAry = ['on', 'active', 'checked', 'selected'];
      const $animateClassAry = ['rolling-number', 'count-number'];
      const $dataAnimation = $el.data('animation');
      if ($dataAnimation === 'rolling-number') ui.Animation.rollingReady(this);
      if ($dataAnimation === 'count-number') ui.Animation.countReady(this);

      let $animationClass = 'animate__' + $dataAnimation;
      if ($addClassAry.indexOf($dataAnimation) >= 0 || $dataAnimation.indexOf('spl-') >= 0) {
        $el.data('animation-type', 2);
        $animationClass = $dataAnimation;
      } else if ($animateClassAry.indexOf($dataAnimation) >= 0) {
        $el.data('animation-type', 3);
        $el.addClass($dataAnimation);
      } else if (!$el.hasClass('animate__animated') && $animationClass.indexOf('animate__') >= 0) {
        $el.data('animation-type', 1);
        if ($delay > 0) {
          $el.css({
            '-webkit-animation-delay': $delay + 'ms',
            'animation-delay': $delay + 'ms'
          });
        }
        if ($duration > 0) {
          $el.css({
            '-webkit-animation-duration': $duration + 'ms',
            'animation-duration': $duration + 'ms'
          });
        }
        if ($repeat > 0) {
          if ($repeat > 5) $repeat = 5;
          $el.addClass('animate__repeat-' + $repeat);
        }
        $el.addClass('animate__animated paused ' + $animationClass);
      }
    });
  },
  sclTypeChk: function (el) {
    let returnVal = null;
    const $el = el;
    const $type = $el.data('animation-type');
    const $dataAnimation = $el.data('animation');
    if ($type == 1) {
      returnVal = 'animate__' + $dataAnimation;
    } else if ($type == 2) {
      returnVal = $dataAnimation;
    } else if ($type == 3) {
      returnVal = 'is-active';
    }
    return returnVal;
  },
  sclCheckIn: function (target, wrap) {
    // const $target = $.find('*[data-animation]');
    const $target = target;
    if (!$target.length) return;
    $.each($target, function () {
      const $el = $(this);
      if (!$el.length) return;
      const $isWin = wrap === window ? true : false;
      const $wrap = $(wrap);
      const $wHeight = $wrap.height();
      const $scrollTop = $wrap.scrollTop();
      const $topFixedH = $isWin ? ui.Common.getTopFixedHeight($el) : ui.Common.getTopFixedHeight($el, 'pop-top-fixed');
      let $bottomFixedH = 0;
      if ($isWin && $('.bottom-fixed-space').length) {
        $bottomFixedH = $('.bottom-fixed-space').height();
      } else if ($wrap.find('.pop-foot').length) {
        $bottomFixedH = $wrap.find('.pop-foot').height();
      }
      const $wrapTop = $scrollTop + $topFixedH;
      const $wrapCenter = $scrollTop + ($wHeight - $topFixedH - $bottomFixedH) / 2;
      const $wrapBottom = $scrollTop + ($wHeight - $bottomFixedH);

      const $elHeight = $el.outerHeight();
      const $matrix = $el.css('transform');
      const $matrixAry = $matrix.replace(/[^0-9\-.,]/g, '').split(',');
      let $matrixX = $matrixAry[12] || $matrixAry[4];
      if ($matrixX === undefined) $matrixX = 0;
      let $matrixY = $matrixAry[13] || $matrixAry[5];
      if ($matrixY === undefined) $matrixY = 0;
      let $elTop = $el.offset().top - $matrixY;
      if (!$isWin) $elTop = $elTop + $scrollTop;
      const $elCenter = $elTop + $elHeight / 2;
      const $elBottom = $elTop + $elHeight;

      const $animationClass = ui.Animation.sclTypeChk($el);
      if ($el.data('init')) return;
      if (($wrapTop <= $elTop && $elTop <= $wrapBottom) || ($wrapTop <= $elBottom && $elBottom <= $wrapBottom) || ($wrapTop > $elTop && $elBottom > $wrapBottom)) {
        ui.Animation.sclAction($el, $elTop);
        if (($el.hasClass('lottie__init'), $el.data('lottie'))) {
          setTimeout(function () {
            const $lottie = $el.data('lottie-opt');
            // if ($el.hasClass('_loop')) $lottie.loop = true;
            $lottie.play();
          }, 100);
        }
      } else {
        const $timer = $el.data('time');
        if ($timer !== undefined) {
          clearTimeout($timer);
          $el.removeData('time');
          if (ui.Animation.sclIdx > 0) ui.Animation.sclIdx -= 1;
        }
      }
    });
  },
  sclObserver: function (el) {
    const $el = $(el);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.intersectionRatio > 0)) {
          ui.Animation.sclAction($el);
        }
      },
      {
        threshold: 0.03
      }
    );
    // io.observe(el);
    io.unobserve(el);
    return io;
  },
  sclAction: function (el, top) {
    const $el = $(el);
    const $animationClass = ui.Animation.sclTypeChk(el);
    const $delay = 200;

    if ($el.data('time') !== undefined) return;
    let $isSameTop = false;
    let timer;
    if (top) {
      const AryIdx = ui.Animation.sclAry.indexOf(top);
      if (AryIdx >= 0) {
        $isSameTop = true;
        timer = AryIdx * $delay;
      } else {
        ui.Animation.sclAry.push(top);
      }
    }
    if (!$isSameTop) {
      timer = ui.Animation.sclIdx * $delay;
      ui.Animation.sclIdx += 1;
    }
    const initTimer = setTimeout(function () {
      $el.data('init', true);
      if (ui.Animation.sclIdx > 0 || !$isSameTop) ui.Animation.sclIdx -= 1;
      if (ui.Animation.sclIdx === 0) ui.Animation.sclAry = [];
      const $slide = $el.closest('.swiper-slide');
      if ($el.hasClass('animate__animated')) {
        if ($el.closest('.tab-panel').length && !$el.closest('.tab-panel').hasClass('active')) return;
        if ($slide.length) {
          if ($slide.hasClass('swiper-slide-active')) {
            if (!$el.hasClass($animationClass)) $el.addClass($animationClass);
            if ($el.hasClass('paused')) $el.removeClass('paused');
          }
        } else {
          if (!$el.hasClass($animationClass)) $el.addClass($animationClass);
          if ($el.hasClass('paused')) $el.removeClass('paused');
        }
      } else {
        if ($slide.length) {
          if ($slide.hasClass('swiper-slide-active')) $el.addClass($animationClass);
        } else {
          if ($el.hasClass('count-number')) ui.Animation.countInit($el);
          $el.addClass($animationClass);
          if ($el.hasClass('ui-tap-item')) {
            const removeEvt = function () {
              $el.remove();
              $el[0].removeEventListener('animationend', removeEvt);
            };
            $el[0].addEventListener('animationend', removeEvt);
          }
        }
      }
      $el.removeData('time');
    }, timer);
    $el.data('time', initTimer);
  },
  rollingReady: function (target) {
    const $this = $(target);
    if ($this.hasClass('is-ready')) return;
    $this.addClass('is-ready');
    const $thisH = $this.height();
    $this.css({
      height: $thisH,
      'line-height': $thisH + 'px'
    });
    const $thisText = $this.text();
    $this.role('img');
    $this.aria('label', $thisText);
    $this.attr('title', $thisText);
    const $textAry = $thisText.split('');
    let $html = '';
    const $space = '<span>&nbsp;</span>';
    const $rotateNum = 3;
    for (let i = 0; i < $textAry.length; i++) {
      const $text = $textAry[i];
      const $number = parseInt($text);
      // console.log($text, $number)
      if ($.isNumeric($number)) {
        $html += '<span class="rolling__in" data-number="' + $number + '" style="top:-' + ($rotateNum * 10 + $number + 1) + '00%;animation-delay:' + i * 5 + '0ms;">';
        $html += $space;
        for (let j = 0; j < $rotateNum; j++) {
          for (let k = 0; k < 10; k++) {
            $html += '<span>' + k + '</span>';
          }
        }
        for (let l = 0; l <= $number; l++) {
          $html += '<span>' + l + '</span>';
        }
        $html += '</span>';
      } else {
        $html += '<span class="rolling__in" style="top:-100%;animation-delay:' + i * 5 + '0ms;">' + $space + '<span>' + $text + '</span></span>';
      }
    }
    $this.html($html);
  },
  countReady: function (target) {
    const $el = $(target);
    const $text = $el.text();
    $el.aria('label', $text);
    $el.attr('title', $text);
    $el.text('0');
  },
  countInit: function (target, duration) {
    const $duration = duration === undefined ? 1000 : duration;
    const $el = $(target);
    const $title = $el.attr('title');
    if ($title === '0') {
      $el.text($title);
      return;
    }
    const $number = onlyNumber($title);
    $el.text(addComma($number));
    const $width = $el.outerWidth();
    const $height = $el.outerHeight();
    $el
      .css({
        overflow: 'hidden',
        'text-align': 'right',
        'min-width': $width,
        height: $height,
        'min-inline-size': $width
      })
      .text(0);
    // const $start = $el.text();
    $({ now: 0 }).animate(
      { now: $number },
      {
        duration: $duration,
        easing: 'easeOutExpo',
        step: function (now, e) {
          $el.text(addComma(Math.floor(now)));
          // if(isComma){
          //   $el.text(addComma(Math.floor(now)));
          // }else{
          //   $el.text(Math.floor(now));
          // }
          if (now === parseInt($number)) {
            $el.removeCss(['overflow', 'text-align', 'min-width', 'height', 'min-inline-size']);
          }
        }
      }
    );
  },
  sclMove: function (target) {
    const $scrollTop = $(window).scrollTop();
    //console.log($scrollTop)
    $.each(target, function () {
      const $el = $(this);
      const $Data = $el.data('scrollchk').split(',');
      let $Start = $Data[0];
      let $End = $Data[1];
      const $type = $Data[2].split(' ');

      switch ($Start) {
        case 'in':
          $Start = $el.parent().offset().top - $(window).height();
          break;
        case 'top':
          $Start = $el.parent().offset().top - 50;
          break;
        case 'bottom':
          $Start = $el.parent().offset().top - $el.parent().outerHeight();
          break;
        default:
          $Start = parseInt($Start);
          break;
      }

      switch ($End) {
        case 'out':
          $End = $el.parent().offset().top + $el.parent().outerHeight();
          break;
        case 'top':
          $End = $el.parent().offset().top - 50;
          break;
        case 'bottom':
          $End = $el.parent().offset().top - $el.parent().outerHeight();
          break;
        default:
          $End = parseInt($End);
          break;
      }

      let isFadeOut = false;
      let isFadeIn = false;
      let isTopDown = false;
      let isSclDown = false;
      let isSclUp = false;
      if ($.inArray('fadeOut', $type) != -1) isFadeOut = true;
      if ($.inArray('fadeIn', $type) != -1) isFadeIn = true;
      if ($.inArray('topDown', $type) != -1) isTopDown = true;
      if ($.inArray('sclDown', $type) != -1) isSclDown = true;
      if ($.inArray('sclUp', $type) != -1) isSclUp = true;

      const $min = $el.parent().outerHeight() - $el.outerHeight();
      const $rate = ($el.outerHeight() - $el.parent().outerHeight()) / ($End - $Start);
      const $move = -($scrollTop - $Start) * $rate;
      const $opacity = Math.max(0, Math.min(1, ($scrollTop - $Start) / $End));

      if ($Start > $scrollTop) {
        if (isFadeOut) $el.css('opacity', 1);
        if (isFadeIn) $el.css('opacity', 0);
        if (isTopDown) $el.css('top', 0);
        if (isSclDown) $el.css('top', 0);
        if (isSclUp) $el.css('bottom', 0);
      } else if ($scrollTop > $End) {
        if (isFadeOut) $el.css('opacity', 0);
        if (isFadeIn) $el.css('opacity', 1);
        if (isSclDown) $el.css('top', $min);
        if (isSclUp) $el.css('bottom', $min);
      } else {
        if (isFadeOut) $el.css('opacity', 1 - $opacity);
        if (isFadeIn) $el.css('opacity', $opacity);
        if (isTopDown) $el.css('top', ($scrollTop - $Start) / 2);
        if (isSclDown) $el.css('top', Math.max($min, $move));
        if (isSclUp) $el.css('bottom', Math.max($min, $move));
      }
    });
  },
  sclAray: [],
  splitting: function () {
    $('[data-splitting]').each(function () {
      const $el = $(this);
      const $role = $el.attr('role');
      if ($role === undefined) $el.role('img');
      const $text = $el.text();
      const $label = $el.attr('aria-label');
      if ($label === undefined || $text !== $label) $el.aria('label', $text);
    });
    Splitting();
  },
  init: function () {
    let $animations = $('[data-animation]');
    if ($animations.length > 0) {
      ui.Animation.sclReady();
      const $boayEl = function () {
        $animations = $('[data-animation]');
        const rtnVal = [];
        $animations.each(function () {
          const $this = $(this);
          if (!$this.closest('.popup').length) rtnVal.push(this);
        });
        return rtnVal;
      };
      if ($boayEl().length) {
        ui.Animation.sclCheckIn($boayEl(), window);
        $(window).on(
          'scroll resize',
          _.throttle(function () {
            if ($boayEl().length) ui.Animation.sclCheckIn($boayEl(), window);
          }, 300)
        );
      }

      /*
      if (!'IntersectionObserver' in window && !'IntersectionObserverEntry' in window && !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        // IntersectionObserver 지원안할때 
        $(window).on('scroll resize',function(){
          ui.Animation.sclCheckIn($animations);
        });
      }else{
        // IntersectionObserver 지원될때 
        $($animations).each(function(){
          ui.Animation.sclAray.push(ui.Animation.sclObserver(this))
        });
      }
      */
    }
  }
};

//완료 효과
ui.Confetti = {
  set: function (wrap) {
    const $wrap = $(wrap);
    let $itemLength = 12;
    let rdClass;
    let rdLeft;
    let rdTop;
    let rdDelay;
    let rdDirection;
    let rdSpeed;
    let $html = '';
    const rdLeftAry = [];

    if ($wrap.hasClass('type1')) $itemLength = 24;
    // if($wrap.hasClass('type2'))$itemLength = 12;
    if ($wrap.data('length')) $itemLength = $wrap.data('length');

    for (let i = 0; i < $itemLength; i++) {
      rdClass = randomNumber(1, 3, 0);
      rdSize = randomNumber(1, 3, 0);
      rdColor = (i % 5) + 1;
      rdLeft = $itemLength <= 18 ? randomNumber(1, 19, 0) * 5 : randomNumber(1, $itemLength + 1, 0) * (90 / $itemLength);
      rdTop = randomNumber(2, 14, 0) * 5;
      rdDelay = randomNumber(0, 10, 0) * 400;
      //rdDelay = (i%10) * 200;
      rdDirection = randomNumber(1, 2, 0);
      rdSpeed = randomNumber(35, 50, 0) * 150;

      if (rdLeftAry.indexOf(rdLeft) >= 0) {
        //left 랜덤값 겹치지않게
        i--;
      } else {
        rdLeftAry.push(rdLeft);
        if ($wrap.hasClass('type1')) {
          //꽃가루(2가지 모션, 3가지 컬러, 3가지 사이즈, 6가지 모양)
          rdClass = randomNumber(1, 6, 0);
          // rdColor = (i%6) + 1;
          $html = '<i class="confetti-item item' + rdClass + ' color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiSwing' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += 'animation:confettiSwing' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiDrop ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += '" aria-hidden="true"><i></i></i>';
        } else if ($wrap.hasClass('type2')) {
          //코인(1가지 모양, 3가지 사이즈)
          rdSpeed = randomNumber(10, 15, 0) * 200; //속도조절
          $html = '<i class="confetti-item size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiCoin ' + rdSpeed + 'ms linear ' + rdDelay + 'ms infinite;';
          $html += 'animation:confettiCoin ' + rdSpeed + 'ms linear ' + rdDelay + 'ms infinite;';
          $html += '"></i>';
        } else if ($wrap.hasClass('type3')) {
          //깜빡임(5가지 모양, 5가지 컬러)
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          rdClass = randomNumber(1, 5, 0);
          const $rotate = randomNumber(0, 18, 0) * 5;
          $html = '<i class="confetti-item item' + rdClass + ' color' + rdColor + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"><i style="-webkit-transform:rotate(' + $rotate + 'deg);transform:rotate(' + $rotate + 'deg);"></i></i>';
        } else if ($wrap.hasClass('type4')) {
          //풍선(3가지 모양, 3가지 사이즈)
          rdColor = (i % 3) + 1;
          $html = '<i class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;';
          $html += '-webkit-animation:confettiBalloon' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiUp ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += 'animation:confettiBalloon' + rdDirection + ' ' + rdSpeed / 4 + 'ms infinite ' + rdDelay + 'ms alternate, confettiUp ' + rdSpeed + 'ms infinite ease-out ' + rdDelay + 'ms;';
          $html += '"></i>';
        } else if ($wrap.hasClass('type5')) {
          //불꽃(3가지 모양, 3가지 사이즈)
          rdTop = randomNumber(0, 8, 0) * 5; //top값 조정
          rdSpeed = randomNumber(15, 25, 0) * 150; //속도조절
          $html = '<i class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;">';
          $html += '<i class="firework" style="';
          $html += '-webkit-animation:confettiFirework ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFirework ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i>';
          $html += '<i class="fire-arr"><i style="';
          $html += '-webkit-animation:confettiFireArr ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFireArr ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i></i>';
          $html += '</i>';
        } else if ($wrap.hasClass('type6')) {
          //하트(2가지 모양, 3가지 각도)
          rdColor = (i % 2) + 1; //하트이미지 2종류
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          $html = '<i class="confetti-item item' + rdClass + ' color' + rdColor + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i>';
        } else if ($wrap.hasClass('type7')) {
          //별빛(1가지 모양, 4가지 크기)
          rdTop = randomNumber(0, 10, 0) * 5; //top값 조정
          rdSize = (i % 4) + 1; //크기 4가지
          rdSpeed = randomNumber(10, 15, 0) * 100; //속도조절
          rdDelay = randomNumber(0, 5, 0) * 200; //딜레이조절
          $html = '<i class="confetti-item size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;';
          $html += '-webkit-animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFlash ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i>';
        } else if ($wrap.hasClass('type8')) {
          //불꽃2(5가지 모양, 3가지 크기)
          rdTop = randomNumber(0, 14, 0) * 5; //top값 조정
          rdSpeed = randomNumber(15, 25, 0) * 100; //속도조절
          $html = '<i class="confetti-item color' + rdColor + ' size' + rdSize + '" style="left:' + rdLeft + '%;top:' + rdTop + '%;">';
          $html += '<i class="dot" style="';
          $html += '-webkit-animation:confettiFireworkDot ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFireworkDot ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i>';
          $html += '<i class="firework" style="';
          $html += '-webkit-animation:confettiFirework2 ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += 'animation:confettiFirework2 ' + rdSpeed + 'ms infinite ' + rdDelay + 'ms;';
          $html += '"></i>';
          $html += '</i>';
        } else {
          console.log('인터렉션 타입 클래스를 적용해주세요');
          break;
        }
        $wrap.prepend($html);
      }
    }
  },
  init: function () {
    if ($('.ui-confetti').length) {
      $('.ui-confetti').each(function () {
        ui.Confetti.set($(this));
      });
    }
  }
};

ui.Chart = {
  circle: function () {
    $('[data-circle-box]').each(function () {
      const _this = $(this);
      let deg = 0;
      let $firstSize = 0;
      let $firstBgLineW = 0;
      let $firstLineW = 0;
      let strokeWidth = $(this).data('circle-width') ? parseInt($(this).data('circle-width')) : 5;
      const typeCheck = _this.data('circle-box');
      _this.addClass(typeCheck);
      _this.find('[data-circle-val]').each(function (e) {
        $(this).empty();
        const idx = $(this).data('circle-val');
        const color = $(this).data('circle-color');
        const size = $(this).data('circle-size');
        const dasharray = 2 * Math.PI * (18 - strokeWidth / 2);

        let html = '';
        html += '<svg viewBox="0 0 36 36" class="circular-chart"';
        if (size) html += ' style="width:' + size + 'px;height:' + size + 'px;"';
        html += ' aria-hidden="true">';
        if (!e || typeCheck !== 'type2') {
          // html += '<path';
          // html += ' class="circle-bg"';
          // html += ' d="M18 2.0845';
          // html += ' a 15.9155 15.9155 0 0 1 0 31.831';
          // html += ' a 15.9155 15.9155 0 0 1 0 -31.831"';
          // html += ' />';
          html += '<circle class="circle-bg" fill="none" stroke-width="' + strokeWidth + '" cx="18" cy="18" r="' + (18 - strokeWidth / 2) + '"></circle>';
        }
        html += '<circle';
        html += ' class="circle"';
        if (typeCheck === 'type1') {
          html += ' style="';
          html += '-webkit-animation-delay: ' + e * 0.3 + 's;';
          html += 'animation-delay: ' + e * 0.3 + 's;';
          html += '" ';
        }
        if (color) html += ' stroke="' + color + '"';
        html += ' stroke-dasharray="' + dasharray * (idx / 100) + ', ' + dasharray + '"';
        // html += ' d="M18 2.0845';
        // html += ' a 15.9155 15.9155 0 0 1 0 31.831';
        // html += ' a 15.9155 15.9155 0 0 1 0 -31.831"';
        html += ' stroke-width="' + strokeWidth + '" cx="18" cy="18" r="' + (18 - strokeWidth / 2) + '"';
        html += ' />';
        html += '</svg>';
        $(this).append(html);
        if (typeCheck == 'type2') {
          if (e) {
            $(this)
              .find('.circular-chart')
              .css({ transform: 'rotate(' + 360 * (deg / 100) + 'deg)' });
          }
          deg += idx;
        }
        $(this).role('img');
        // $(this).children().unwrap();
        if (size) {
          const $thisLineBg = $(this).find('.circle-bg');
          const $thisLineBgW = parseInt($thisLineBg.css('stroke-width'));
          const $thisLine = $(this).find('.circle');
          const $thisLineW = parseInt($thisLine.css('stroke-width'));
          if (!e) {
            $firstSize = size;
            $firstBgLineW = $thisLineBgW;
            $firstLineW = $thisLineW;
          } else {
            const $ratio = $firstSize / size;
            $thisLineBg.css('stroke-width', $firstBgLineW * $ratio);
            $thisLine.css('stroke-width', $firstLineW * $ratio);
          }
        }
      });
    });
  },
  init: function () {
    ui.Chart.circle();
  }
};

/********************************
 * front 사용함수 *
 ********************************/
const $focusableEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]';
//Focus.disabled();
const Focus = {
  disabled: function (el) {
    const $number = -10;
    const $tabIdx = $(el).attr('tabindex');
    const $dataIdx = $(el).data('tabindex');
    if ($dataIdx == undefined && $tabIdx > $number) $(el).data('tabindex', $tabIdx);
    $(el).attr('tabindex', $number);
  },
  abled: function (el) {
    const $tabIdx = $(el).data('tabindex');
    if ($tabIdx != undefined) {
      $(el).attr('tabindex', $tabIdx);
    } else {
      $(el).removeAttr('tabindex');
    }
  }
};

// 네이티브 full refresh
const fullRefresh = {
  is: false,
  lock: function () {
    // 웹뷰 스크롤 해제 WebView JavaScript Interface
    if (typeof webviewInterface === 'object' && typeof webviewInterface.setWebLayerPopupStatus === 'function') {
      fullRefresh.is = true;
      webviewInterface.setWebLayerPopupStatus('open');
    }
  },
  unlock: function () {
    // 웹뷰 스크롤 허용 WebView JavaScript Interface
    if (typeof webviewInterface === 'object' && typeof webviewInterface.setWebLayerPopupStatus === 'function') {
      fullRefresh.is = false;
      webviewInterface.setWebLayerPopupStatus('close');
    }
  }
};

//body scroll lock
const Body = {
  scrollTop: '',
  lock: function () {
    if ($('html').hasClass('lock')) return;
    fullRefresh.lock();

    Body.scrollTop = window.pageYOffset;
    const $wrap = $('#wrap');
    const $wrapTop = $('#wrap').length ? $wrap.offset().top : 0;
    const $setTop = Body.scrollTop * -1 + $wrapTop;
    $wrap.css('top', $setTop);
    $('html').addClass('lock');
  },
  unlock: function () {
    if (!$('html').hasClass('lock')) return;
    fullRefresh.unlock();

    $('html').removeClass('lock');
    $('#wrap').removeAttr('style');
    window.scrollTo(0, Body.scrollTop);
    window.setTimeout(function () {
      Body.scrollTop = '';
    }, 0);
  }
};

//로딩함수
const Loading = {
  speed: 150,
  open: function (txt) {
    let $html = '<div class="loading-wrap" class="hide">';
    $html += '<div class="tl">';
    $html += '<div>';
    /* // img 타입
    $html += '<div class="loading-icon" role="img"';
    if (!txt) {
      $html += ' aria-label="화면을 불러오는중입니다."';
    }
    $html += '>';
    $html += '</div>';
    */

    /* // svg 타입
    $html += '<div class="loading-svg" role="img"';
    if (!txt) {
      $html += ' aria-label="화면을 불러오는중입니다."';
    }
    $html += '>';
    $html += '<svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">';
    $html += '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>';
    $html += '</svg>';
    $html += '</div>';
    */

    // lottie 타입
    const $file = ui.basePath + '/lottie/loading.json';
    $html += '<div class="loading-lottie" role="img"';
    if (!txt) {
      $html += ' aria-label="화면을 불러오는중입니다."';
    }
    $html += '>';
    $html += '<div class="lottie _loop" data-lottie="' + $file + '" aria-hidden="true"></div>';
    $html += '</div>';

    if (!!txt) {
      $html += '<div class="txt">' + txt + '</div>';
    }
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';

    if (!$('.loading-wrap').length) $('body').prepend($html);
    $('.loading-wrap').stop(true, false).fadeIn(Loading.speed);
    setTimeout(function () {
      if ($('.loading-wrap .lottie').length) ui.Common.lottie();
    }, 10);
  },
  close: function () {
    $('.loading-wrap')
      .stop(true, false)
      .fadeOut(Loading.speed, function () {
        $(this).remove();
      });
  }
};

//레이어팝업(Layer): 레이어 팝업은 #container 밖에 위치해야함
const Layer = {
  id: 'uiLayer',
  popClass: 'popup',
  pageClass: 'page',
  wrapClass: 'pop-wrap',
  sclWrapClass: 'pop-scl-wrap',
  headClass: 'pop-head',
  bodyClass: 'pop-body',
  footClass: 'pop-foot',
  innerClass: 'section',
  showClass: 'show',
  etcCont: '#header,#container',
  focusedClass: 'pop__focused',
  focusInClass: 'ui-focus-in',
  removePopClass: 'ui-pop-remove',
  closeRemoveClass: 'ui-pop-close-remove',
  alertClass: 'ui-pop-alert',
  lastPopClass: 'ui-pop-last',
  agreePopClass: 'ui-pop-agree',
  agreePopSwiperClass: 'ui-pop-agree-swiper',
  scrollShowTitleClass: 'pop-fade-title',
  bgNoCloseClass: 'bg-no-click',
  beforeCont: [],
  content: '',
  like: function () {
    const $delayTime = 2000;
    const $wrap = $('#wrap').length ? $('#wrap') : $('body');
    const $fileUrl = ui.basePath + '/temp/love.json';
    const $html = '<div class="layer-like" aria-hidden="true"><div class="lottie" data-lottie="' + $fileUrl + '"></div></div>';
    if ($('.layer-like').length) return;
    // 넣고
    $wrap.append($html);
    // 보여주고
    setTimeout(function () {
      $('.layer-like').addClass('show');
      ui.Common.lottie();
      // 숨기고
      setTimeout(function () {
        $('.layer-like').removeClass('show');
        // 지우고
        setTimeout(function () {
          $('.layer-like').remove();
        }, 310);
      }, $delayTime);
    }, 10);
  },
  overlapChk: function () {
    //focus 이벤트 시 중복열림 방지
    const $focus = $(':focus');
    if (!!event) {
      if (event.type === 'focus' && $($focus).hasClass(Layer.focusedClass)) {
        return false;
      }
    }
    //같은 내용 중복열림 방지
    if (Layer.beforeCont.indexOf(Layer.content) >= 0) {
      return false;
    } else {
      Layer.beforeCont.push(Layer.content);
    }
    return true;
  },
  alertHtml: function (type, popId, btnActionId, btnCancelId) {
    let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' modal alert ' + Layer.alertClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.headClass + '"><div><h1>안내</h1></div></div>';
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="' + Layer.innerClass + '">';
    if (type === 'prompt') {
      $html += '<div class="form-lbl mt-0">';
      $html += '<label for="inpPrompt" role="alert" aria-live="assertive"></label>';
      $html += '</div>';
      $html += '<div class="form-item">';
      $html += '<div class="input"><input type="text" id="inpPrompt" placeholder="입력해주세요."></div>';
      $html += '</div>';
    } else {
      $html += '<div class="message">';
      $html += '<div role="alert" aria-live="assertive"></div>';
      $html += '</div>';
    }
    $html += '</div>';
    $html += '</div>';
    $html += '<div class="' + Layer.footClass + '">';
    $html += '<div class="flex">';
    if (type === 'confirm' || type === 'prompt') {
      $html += '<button type="button" id="' + btnCancelId + '" class="button gray">취소</button>';
    }
    $html += '<button type="button" id="' + btnActionId + '" class="button primary">확인</button>';
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }
  },
  alertEvt: function (type, option, callback, callback2, callback3, callback4, init) {
    const $length = $('.' + Layer.alertClass).length;
    const $popId = Layer.id + 'Alert' + $length;
    const $actionId = $popId + 'ActionBtn';
    const $cancelId = $popId + 'CancelBtn';

    if (typeof option === 'object') {
      Layer.content = option.content;
    } else if (typeof option == 'string') {
      //약식 설절
      Layer.content = option;
    }

    //텍스트가 아닌 배열이나 객체일때 텍스트 변환
    if (typeof Layer.content !== 'string') Layer.content = JSON.stringify(Layer.content);

    //내용있는지 체크
    if ($.trim(Layer.content) == '' || Layer.content == undefined) return false;

    //중복팝업 체크
    if (Layer.overlapChk() === false) return false;

    //팝업그리기
    Layer.alertHtml(type, $popId, $actionId, $cancelId);
    const $pop = $('#' + $popId);
    if (!!option.title || (typeof callback === 'string' && callback !== '')) {
      const $insertTit = typeof callback === 'string' && callback !== '' ? callback : option.title;
      $pop.find('.' + Layer.wrapClass + ' h1').html($insertTit);
    }
    let $actionTxt;
    if (!!option.actionTxt) $actionTxt = option.actionTxt;
    if (typeof callback2 === 'string' && callback2 !== '') $actionTxt = callback2;
    if ($actionTxt) $('#' + $actionId).html($actionTxt);

    let $cancelTxt;
    if (!!option.cancelTxt) $cancelTxt = option.cancelTxt;
    if (typeof callback3 === 'string' && callback3 !== '') $cancelTxt = callback3;
    if ($cancelTxt) $('#' + $cancelId).html($cancelTxt);
    // if ($actionTxt && $cancelTxt && $actionTxt.length > $cancelTxt.length + 4) $('#' + $cancelId).addClass('w-33fp');

    const $htmlContent = Layer.content;
    if (type === 'prompt') {
      $pop.find('.form-lbl label').html($htmlContent);
    } else {
      const $textAry = $htmlContent.split(' '),
        $textLengthAry = [];
      for (let i = 0; i < $textAry.length; i++) {
        $textLengthAry.push($textAry[i].length);
      }
      const $maxTxtLength = Math.max.apply(null, $textLengthAry);
      if ($maxTxtLength > 20) $pop.find('.message>div').addClass('breakall');
      $pop.find('.message>div').html($htmlContent);
    }
    if (!!option.init) option.init($pop[0]);
    if (typeof init === 'function') init($pop[0]);
    Layer.open('#' + $popId);

    //click
    let $result = '';
    const $actionBtn = $('#' + $actionId);
    const $cancelBtn = $('#' + $cancelId);
    let $inpVal = '';
    $actionBtn.on('click', function () {
      $result = true;
      $inpVal = $pop.find('.input input').val();

      const $actionEvt = function () {
        if (type === 'prompt') {
          if (!!option.action) option.action($result, $inpVal);
          if (!!option.callback) option.callback($result, $inpVal);
          if (typeof callback === 'function') callback($result, $inpVal);
          if (typeof callback2 === 'function') callback2($result, $inpVal);
          if (typeof callback3 === 'function') callback3($result, $inpVal);
          if (typeof callback4 === 'function') callback4($result, $inpVal);
        } else {
          if (!!option.action) option.action($result);
          if (!!option.callback) option.callback($result);
          if (typeof callback === 'function') callback($result);
          if (typeof callback2 === 'function') callback2($result);
          if (typeof callback3 === 'function') callback3($result);
          if (typeof callback4 === 'function') callback4($result);
        }
      };
      Layer.close('#' + $popId, $actionEvt);
      // Layer.close('#' + $popId);
      // setTimeout($actionEvt, 100);
    });
    $cancelBtn.on('click', function () {
      $result = false;
      const $cancelEvt = function () {
        if (!!option.cancel) option.cancel();
        if (!!option.callback) option.callback($result);
        if (typeof callback === 'function') callback($result);
        if (typeof callback2 === 'function') callback2($result);
        if (typeof callback3 === 'function') callback3($result);
        if (typeof callback4 === 'function') callback4($result);
      };
      Layer.close('#' + $popId, $cancelEvt);
      // Layer.close('#' + $popId);
      // setTimeout($cancelEvt, 100);
    });
  },
  alert: function (option, callback, callback2, callback3, init) {
    Layer.alertEvt('alert', option, callback, callback2, callback3, null, init);
  },
  confirm: function (option, callback, callback2, callback3, callback4, init) {
    Layer.alertEvt('confirm', option, callback, callback2, callback3, callback4, init);
  },
  prompt: function (option, callback, callback2, callback3, callback4, init) {
    Layer.alertEvt('prompt', option, callback, callback2, callback3, callback4, init);
  },
  keyEvt: function () {
    //컨펌팝업 버튼 좌우 방할기로 포거스 이동
    $(document).on('keydown', '.' + Layer.alertClass + ' .pop_btn .button', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      let $tar = '';
      if ($keyCode == 37) $tar = $(this).prev();
      if ($keyCode == 39) $tar = $(this).next();
      if (!!$tar) $tar.focus();
    });
  },
  tooltip: function (contents, title) {
    const tooltipPopId = 'uiPopToolTip';
    let $html = '<div id="' + tooltipPopId + '" class="' + Layer.popClass + ' modal tooltip ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    if (title !== undefined && title !== '') {
      $html += '<div class="' + Layer.headClass + '">';
      $html += '<div>';
      $html += '<h1>' + title + '</h1>';
      $html += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
      $html += '</div>';
      $html += '</div>';
    }
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="' + Layer.innerClass + '">';
    if (title === undefined) {
      $html += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
    }
    $html += contents;
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }
    Layer.open('#' + tooltipPopId);
  },
  imgBoxIdx: 0,
  imgBox: function (contents, idx) {
    const $idx = idx ? idx : 0;
    const imgPopId = 'uiPopImgBox' + Layer.imgBoxIdx;
    let $html = '<div id="' + imgPopId + '" class="' + Layer.popClass + ' full pop-img-box ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.headClass + '"><div><h1>이미지</h1><a href="#" class="pop-close" role="button" aria-label="팝업창 닫기"></a></div></div>';
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '<div class="ui-swiper _zoom img-box-swiper">';
    $html += '<div class="swiper">';
    $html += '<div class="swiper-wrapper"></div>';
    $html += '</div>';
    $html += '<div class="swiper-pagination"></div>';
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }
    Layer.imgBoxIdx += 1;
    const $popup = $('#' + imgPopId);
    let $contentsHtml = '';
    contents.each(function () {
      const $this = $(this);
      const $img = $this.find('img');
      const $src = $img.data('image') ? $img.data('image') : $img.attr('src');
      // let isNoImg = $this.hasClass('no-img-bg');
      // if ($this.find('.no-img-bg').length) isNoImg = true;
      $contentsHtml += '<div class="swiper-slide">';
      // $contentsHtml += isNoImg ? '<div class="swiper-zoom-container no-img-bg">' : '<div class="swiper-zoom-container">';
      $contentsHtml += '<div class="swiper-zoom-container">';
      $contentsHtml += '<img src="' + $src + '" alt="' + ($img.attr('alt') === undefined ? '' : $img.attr('alt')) + '" onerror="imgError(this)" />';
      $contentsHtml += '</div>';
      $contentsHtml += '</div>';
    });
    $popup.find('.swiper-wrapper').append($contentsHtml);
    // $popup.find('.swiper-wrapper').children().addClass('swiper-zoom-container').removeClass('img-box').wrap('<div class="swiper-slide"></div>');

    // img rotate
    setTimeout(function () {
      const $img = $popup.find('img');
      $img.each(function () {
        const $this = $(this);
        const $imgW = $this[0].naturalWidth;
        const $imgH = $this[0].naturalHeight;
        const $src = $this.attr('src');

        if ($imgW > $imgH) {
          $this.after('<canvas></canvas>');
          const $canvas = $this.next();
          ui.Util.canvasRotateImg($canvas[0], $src, 270);
          setTimeout(function () {
            $this.remove();
          }, 5);
        }
      });
    }, 10);

    let imgSwiper;
    Layer.open(
      $popup,
      function () {
        // const $popSwiper = $popup.find('.img-box-swiper');
        // ui.Swiper.base($popSwiper);
        const $popSwiper = $popup.find('.img-box-swiper .swiper');
        const $popSwiperPagination = $popup.find('.img-box-swiper .swiper-pagination');
        imgSwiper = new Swiper($popSwiper[0], {
          pagination: {
            el: $popSwiperPagination[0],
            clickable: true
          },
          initialSlide: $idx,
          zoom: true
        });
        $popup.find('.img-box-swiper').data('swiper', imgSwiper);
      },
      100
    );
    $popup.find('.pop-close').click(function (e) {
      e.preventDefault();
      Layer.close('#' + imgPopId, function () {
        imgSwiper.destroy();
      });
    });
  },
  pdfIdx: 0,
  pdf: function (url, title) {
    const pdfPopId = 'uiPopPdf' + Layer.pdfIdx;
    const $src = ui.basePath + '/pdfjs/web/viewer.html?file=' + url;
    let $html = '<div id="' + pdfPopId + '" class="' + Layer.popClass + ' full pop-pdf ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.headClass + '"><div><h1>' + title + '</h1><button type="button" class="pop-close ui-pop-close" aria-label="팝업창 닫기"></button></div></div>';
    $html += '<div class="' + Layer.bodyClass + ' iframe-full-box">';
    $html += '<iframe src="' + $src + '" frameborder="0"></iframe>';
    $html += '</div>';
    $html += '<div class="pop-foot"><div><div class="flex"><button type="button" class="button primary ui-pop-close">확인</button></div></div></div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }
    Layer.pdfIdx += 1;
    Layer.open('#' + pdfPopId);
  },
  agreeAllIdx: 0,
  agreeTitClassName: 'pop-agree-tit',
  agreeBtnClassName: 'ui-pop-agree-btn',
  agreeCheckedClassName: 'ui-pop-agree-checked',
  agreeCheckboxClassName: 'ui-pop-agree-chk',
  agreeAll: function ($ary) {
    const $setPopup = function (targetId) {
      const $input = $(targetId);
      const $pop = $input.data('agree-pop');
      $($pop)
        .addClass(Layer.agreePopClass)
        .find('.' + Layer.footClass + ' .button')
        .data('agree-input', targetId);
      return $pop;
    };
    const $popAry = [];
    for (let i = 0; i < $ary.length; i++) {
      const $inputId = $.trim($ary[i]);
      const $pop = $setPopup($inputId);
      const $obj = {
        input: $inputId,
        pop: $pop
      };
      $popAry.push($obj);
    }

    const agreePopId = 'uiPopAgreeAll' + Layer.agreeAllIdx;
    let $html = '<div id="' + agreePopId + '" class="' + Layer.popClass + ' full ' + Layer.agreePopClass + ' ' + Layer.agreePopSwiperClass + ' ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '<article class="' + Layer.wrapClass + '">';
    $html += '<div class="' + Layer.headClass + '">';
    $html += '  <div class="' + Layer.agreeTitClassName + '">';
    $html += '    <div class="swiper-pagination" aria-hidden="true"></div>';
    $html += '    <h1></h1>';
    $html += '    <a href="#none" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
    $html += '  </div>';
    $html += '</div>';
    $html += '<div class="' + Layer.bodyClass + '">';
    $html += '  <div class="ui-swiper agree-swiper">';
    $html += '    <div class="swiper">';
    $html += '      <div class="swiper-wrapper"></div>';
    $html += '      </div>';
    $html += '  </div>';
    $html += '</div>';
    $html += '<div class="' + Layer.footClass + '">';
    $html += '  <div>';
    // $html += '    <div class="flex">';
    // $html += '      <a href="#none" class="button primary ui-pop-agree-all-btn" role="button"></a>';
    // $html += '    </div>';
    $html += '  </div>';
    $html += '</div>';
    $html += '</article>';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }
    Layer.agreeAllIdx += 1;
    const $popup = $('#' + agreePopId);
    const $popupTit = $popup.find('.' + Layer.headClass + ' .' + Layer.agreeTitClassName + ' h1');
    const $popupWrapper = $popup.find('.swiper-wrapper');
    const $popupFoot = $popup.find('.' + Layer.footClass);
    for (let i = 0; i < $popAry.length; i++) {
      const $inp = $popAry[i].input;
      const $inpPop = $($popAry[i].pop);
      const $inpPopTit = $inpPop.find('.' + Layer.headClass + ' h1').html();
      $popupTit.append('<span>' + $inpPopTit + '</span>');
      const $btnHtml = '<div class="flex"><button type="button" class="button primary ' + Layer.agreeCheckedClassName + '" role="button" data-agree-input="' + $inp + '" data-index="' + i + '">확인</button></div>';
      $popupFoot.find('>div').append($btnHtml);
      const $slideHtml = '<div class="swiper-slide"></div>';
      $popupWrapper.append($slideHtml);
      const $inpPopBody = $inpPop
        .find('.' + Layer.bodyClass)
        .children()
        .clone();
      $popupWrapper.find('.swiper-slide').last().append($inpPopBody);
      if (i !== 0) {
        $popupTit.find('>span').eq(i).hide();
        $popupFoot.find('.flex').eq(i).hide();
      }
    }

    let agreeSwiper;
    Layer.open($popup, function () {
      const $popWrap = $popup.find('.' + Layer.wrapClass);
      const $popSwiper = $popup.find('.agree-swiper .swiper');
      const $popSwiperPagination = $popup.find('.swiper-pagination');
      agreeSwiper = new Swiper($popSwiper[0], {
        pagination: {
          el: $popSwiperPagination[0],
          type: 'progressbar',
          clickable: false
        },
        allowTouchMove: false,
        autoHeight: true,
        on: {
          slideChangeTransitionEnd: function (e) {
            const $idx = e.realIndex;
            $popupTit.find('>span').eq($idx).show().siblings('span').hide();
            $popupFoot.find('.flex').eq($idx).show().siblings().hide();
            $popWrap.animate({ scrollTop: 0 }, 100).scroll();
          }
        }
      });
      $popup.find('.agree-swiper').data('swiper', agreeSwiper);
      $popWrap.scroll();
    });
    $popup.find('.pop-close').click(function (e) {
      e.preventDefault();
      Layer.close('#' + agreePopId, function () {
        agreeSwiper.destroy();
      });
    });
  },
  agree: function (element) {
    const $ary = element.split(',');
    const $setPopup = function (targetId) {
      const $input = $(targetId);
      const $pop = $input.data('agree-pop');
      $($pop)
        .addClass(Layer.agreePopClass)
        .find('.' + Layer.footClass + ' .button')
        .data('agree-input', targetId);
      return $pop;
    };

    if ($ary.length > 1) {
      Layer.agreeAll($ary);
      /*
      for (let i = 0; i < $ary.length; i++) {
        const $inputId = $.trim($ary[$ary.length - i - 1]);
        const $pop = $setPopup($inputId);
        setTimeout(function () {
          Layer.open($pop);
        }, i * 100);
      }
      */
    } else {
      const $pop = $setPopup($ary[0]);
      Layer.open($pop, function () {
        $($pop)
          .find('.' + Layer.bodyClass)
          .scroll();
      });
    }
  },
  selectId: 'uiSelectLayer',
  selectIdx: 0,
  selectClass: 'ui-pop-select',
  select: function (target, col) {
    const $target = $(target);
    const $targetVal = $target.val();
    const $addClass = $target.data('class');
    const $type = $target.data('type');
    let $title = $target.attr('title');
    const $popId = Layer.selectId + Layer.selectIdx;
    const $length = $target.children().length;
    let $option = '';
    let $opDisabled = '';
    let $opTxt = '';
    let $opVal = '';
    let $popHtml = '';
    const $isTouch = $target.hasClass('is-swipe') ? true : false;
    const $isTouchMove = $target.hasClass('is-swipe-move') ? true : false;
    let $isFullPop = false;

    Layer.selectIdx++;
    if ($title == undefined) $title = '선택';
    const $monthTxt = function (txt) {
      let $txt = txt;
      const $split = $txt.split('.');
      if ($split.length == 2) {
        $txt = $split[0] + '년 ' + $split[1] + '월';
      } else if ($split.length == 3) {
        $txt = $split[0] + '년 ' + $split[1] + '월 ' + $split[2] + '일';
      } else {
        $txt = $split.join('.');
      }
      return $txt;
    };
    $popHtml += '<div id="' + $popId + '" class="' + Layer.popClass + ' ' + ($isFullPop ? 'full' : 'bottom') + ($isTouch || $isTouchMove ? ' is-swipe' : '') + ($isTouchMove ? ' _touch-move' : '') + ' ' + Layer.selectClass + '" role="dialog" aria-hidden="true">';
    $popHtml += '<article class="' + Layer.wrapClass + '">';
    $popHtml += '<div class="' + Layer.headClass + '">';
    $popHtml += '<div>';
    $popHtml += '<h1>' + $title + '</h1>';
    $popHtml += '<a href="#" class="pop-close ui-pop-close" role="button" aria-label="팝업창 닫기"></a>';
    $popHtml += '</div>';
    $popHtml += '</div>';
    $popHtml += '<div class="' + Layer.bodyClass + '">';

    $popHtml += '<ul class="select-item-wrap';
    if (!!col) $popHtml += ' col' + col;
    if ($addClass) $popHtml += ' ' + $addClass;
    $popHtml += '">';
    for (let i = 0; i < $length; i++) {
      $option = $target.children().eq(i);
      $opDisabled = $option.prop('disabled');
      $opTxt = $option.data('txt') ? $option.data('txt') : $option.text();
      $opSub = $option.data('sub');
      $opVal = $option.attr('value');
      if ($opVal != '') {
        $popHtml += '<li>';
        $popHtml += '<div class="select-item' + ($targetVal == $opVal ? ' selected' : '') + '">';
        $popHtml += '<a href="#" class="ui-pop-select-btn' + ($opDisabled ? ' disabled' : '') + '" role="button" data-value="' + $opVal + '"';
        if ($targetVal == $opVal) $popHtml += ' title="' + ($opTxt.length > 20 ? $opTxt.substring(20, $opTxt.lastIndexOf('(')) : $opTxt) + ' 선택됨"';
        $popHtml += '>';
        // $popHtml += '<div class="checkbox ty2"><i aria-hidden="true"></i></div>';
        if ($opSub && $type === 'reverse') {
          $popHtml += '<div class="select-item-txt">' + $opSub + '</div>';
          $popHtml += '<div class="select-item-sub">' + $opTxt + '</div>';
        } else {
          if ($type === 'date') {
            $popHtml += '<div class="select-item-txt">' + $monthTxt($opTxt) + '</div>';
          } else {
            $popHtml += '<div class="select-item-txt">' + $opTxt + '</div>';
          }
          if ($opSub) $popHtml += '<div class="select-item-sub">' + $opSub + '</div>';
        }
        $popHtml += '</a>';
        $popHtml += '</div>';
        $popHtml += '</li>';
      }
    }
    $popHtml += '</ul>';
    $popHtml += '</div>';
    $popHtml += '</article>';
    $popHtml += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($popHtml);
    } else {
      $('body').append($popHtml);
    }

    $target.data('popup', '#' + $popId);
    const $pop = $('#' + $popId);
    $pop.on('click', '.ui-pop-select-btn', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('disabled')) {
        const $btnVal = $(this).data('value');
        // const $btnTxt = $(this).text();
        $(this).parent().addClass('selected').closest('li').siblings().find('.selected').removeClass('selected');
        ui.Form.selectSetVal($target, $btnVal);
        Layer.close('#' + $popId, function () {
          $target.change();
        });
      }
    });
  },
  isSelectOpen: false,
  selectOpen: function (select, e) {
    const $select = $(select);
    const $txtLengthArry = [];
    if ($select.prop('disabled')) return false;
    if ($select.find('option').length < 1) return console.log('select에 option 없음');
    if ($select.find('option').length == 1 && $select.find('option').val() == '') return console.log('select에 option의 value가 0이라 리턴');
    Layer.isSelectOpen = true;
    $select.find('option').each(function () {
      const $optVal = $(this).val();
      const $optTxt = $(this).text();
      if ($optVal != '') {
        $txtLengthArry.push($optTxt.length);
      }
    });
    /*
    const $maxTxtLength = Math.max.apply(null, $txtLengthArry);
 
     //들어갈수 있는 글자수 체크
    const inWidthTxt = function(width,col){
      const  _fontSize = 14;
      const _paddingBorder = 28;
      const _val = ((width/col)-_paddingBorder)/(_fontSize*0.9);
      return Math.floor(_val);
    };
    const $winW = $(window).width();
    const $contW = $winW - (17*2);
    const $inTxt1 = inWidthTxt($contW,3);
    const $inTxt2 = inWidthTxt($contW,2);

    //글자수에따른 팝업 분류
    if($maxTxtLength <= $inTxt1){
      Layer.select($select,3);
    }else if($maxTxtLength <= $inTxt2){
      Layer.select($select,2);
    }else{
      Layer.select($select);
    }
    */
    Layer.select($select);

    const $pop = $select.data('popup');
    Layer.open($pop, function () {
      //if(!!e)$($pop).data('returnFocus',$currentTarget);
    });
  },
  selectUI: function () {
    //셀렉트 팝업
    $(document).on('click', '.ui-select-open', function (e) {
      e.preventDefault();
      let $select = '';
      if (Layer.isSelectOpen == false) {
        $select = $($(this).attr('href'));
        if (!$select.length) $select = $(this).prev('select');
        Layer.selectOpen($select, e);
      }
    });
    $(document).on('click', '.ui-select-lbl', function (e) {
      e.preventDefault();
      const $tar = $(this).is('a') ? $(this).attr('href') : '#' + $(this).attr('for');
      $($tar).next('.ui-select-open').focus().click();
    });
  },
  bottomTouch: function (tar) {
    const $popup = $(tar);
    const $wrap = $popup.find('.' + Layer.wrapClass);
    const $head = $popup.find('.' + Layer.headClass);
    const $body = $popup.find('.' + Layer.bodyClass);
    const $foot = $popup.find('.' + Layer.footClass);
    const $minHeight = ($head.outerHeight() ?? 0) + ($foot.outerHeight() ?? 0) + 50; // 50: body의 최소 높이값

    let isMove = false;
    const $animateSpeed = 300;
    let $startH = 0;
    let $startX = 0;
    let $startY = 0;
    let $distanceX = 0;
    let $distanceY = 0;
    let $directionX = false;
    let $directionY = false;
    let $duration = 0;
    let $durationTimer;
    // let $distanceAry = [];

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchstart mousedown', function (e) {
        isMove = true;
        const $this = $(this);
        const $clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        $startX = $clientX;
        $startY = $clientY;
        $startH = $this.closest('.' + Layer.wrapClass).outerHeight();
        $distanceX = 0;
        $distanceY = 0;
        $directionX = false;
        $directionY = false;
        if ($this.data('first-height') === undefined) $this.data('first-height', $startH);
        if ($this.data('is-full') === undefined) $this.data('is-full', false);
        $duration = 0;
        $durationTimer = setInterval(function () {
          $duration += 10;
        }, 10);
        $wrap.stop(false, true);
        if ($(tar).hasClass('_touch-move')) $(tar).addClass('_touch-moving');
      });

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchmove mousemove', function (e) {
        if (!isMove) return false;
        const $this = $(this);
        const $clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        $distanceX = $clientX - $startX;
        $distanceY = $clientY - $startY;
        // console.log($distanceX, $distanceY)

        // const $min = $(tar).hasClass('_touch-move') ? $firstHeight:0;
        const $min = $minHeight;
        const $max = $(tar).hasClass('_touch-move') ? $popup.height() : $popup.outerHeight();
        const $height = Math.max($min, Math.min($max, $startH - $distanceY));

        $wrap.css({ 'max-height': $height, height: $height });
        //$body.css('max-height', $height);
        if (!$(tar).hasClass('_touch-move')) {
          if ($popup.hasClass('full')) {
            // $isFull = true;
            $this.data('is-full', true);
            $popup.removeClass('full').addClass('bottom');
          }
        }
        /*
        if($duration%10 === 0){
          const $lastVal = $distanceAry.length ? $distanceAry[$distanceAry.length-1] : 0;
          $distanceAry.push($distanceY - $lastVal);
        }*/
      });

    $(tar)
      .find('.' + Layer.headClass)
      .on('touchend mouseup mouseleave', function (e) {
        if (!isMove) return false;
        isMove = false;
        const $this = $(this);
        const $isFull = $this.data('is-full');
        const $clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const $clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
        $distanceX = $clientX - $startX;
        $distanceY = $clientY - $startY;
        if ($distanceX !== 0) $directionX = $distanceX > 0 ? 'right' : 'left';
        if ($distanceY !== 0) $directionY = $distanceY > 0 ? 'down' : 'up';
        const $firstHeight = $this.data('first-height');
        const $min = $minHeight;
        const $max = $(tar).hasClass('_touch-move') ? $popup.height() : $popup.outerHeight();

        clearInterval($durationTimer);
        const $powerRatio = $duration === 0 || $distanceY === 0 ? 0 : Math.abs($distanceY) / $duration;
        const $power = (1 + Math.round($powerRatio * 3)) * Math.round($powerRatio * 30);
        const $powerDistance = Math.round((($distanceY * -1) / $duration) * $power);
        if ($(tar).hasClass('_touch-move')) {
          $(tar).removeClass('_touch-moving');

          const $wrapHeight = $wrap.outerHeight();
          const $endHeight = Math.max($min, Math.min($max, $wrapHeight + $powerDistance));
          const $endSpeed = Math.min(2000, Math.abs($powerDistance * 10));
          $wrap
            .stop(true, false)
            .removeCss('max-height')
            .animate({ height: $endHeight }, $endSpeed, 'easeOutQuint', function () {
              $wrap.css('max-height', $endHeight);
            });
        } else {
          if (Math.abs($distanceY) > 50) {
            if ($popup.hasClass('bottom') && !$isFull) {
              if ($directionY === 'up') {
                $popup.css('padding-top', 0);
                $wrap
                  .stop(true, false)
                  .removeCss('max-height')
                  .animate({ height: '100%' }, $animateSpeed, function () {
                    $wrap.removeCss('height');
                    $popup.removeClass('bottom').addClass('full');
                    $popup.removeCss('padding-top');
                  });
              } else if ($directionY === 'down') {
                Layer.close(tar);
              }
            }
            // console.log($isFull, $directionY, $firstHeight);
            if ($isFull && $directionY === 'down') {
              $wrap.removeCss('max-height').animate({ height: $firstHeight }, $animateSpeed, function () {
                // $isFull = false;
                $this.data('is-full', false);
                $wrap.removeCss('height').css('max-height', $firstHeight);
                $this.removeData('first-height');
              });
            }
          } else {
            if ($isFull) {
              $popup.css('padding-top', 0);
              $wrap
                .stop(true, false)
                .removeCss('max-height')
                .animate({ height: '100%' }, $animateSpeed, function () {
                  // $isFull = false;
                  $this.data('is-full', false);
                  $wrap.removeCss('height');
                  $popup.removeClass('bottom').addClass('full');
                  $popup.removeCss('padding-top');
                });
            } else {
              $wrap.removeCss('max-height').animate({ height: $firstHeight }, $animateSpeed, function () {
                $wrap.removeCss('height').css('max-height', $firstHeight);
                $this.removeData('first-height');
              });
            }
          }
        }

        $this.removeData('is-full');
        // $distanceAry = [];
      });
  },
  toast: function (txt, fn, type, delayTime) {
    if (type === undefined) type = 'toast';
    const $isAlarm = type === 'alarm';
    const $isFn = !!fn;
    const $className = '.' + type + '-box';

    if (delayTime == undefined) delayTime = 2000;

    let $boxHtml = '<div class="' + $className.substring(1) + '">';
    $boxHtml += '<div>';
    if ($isFn) {
      $boxHtml += '<a href="#" role="button" class="txt">' + txt + '</a>';
    } else {
      $boxHtml += '<div class="txt">' + txt + '</div>';
    }
    if ($isAlarm) {
      $boxHtml += '<button type="button" class="close" aria-label="닫기"></button>';
    }
    $boxHtml += '</div>';
    $boxHtml += '</div>';
    $('#container').before($boxHtml);
    const $toast = $($className).last();
    const $toastClose = function () {
      $toast.removeClass('on');
      $toast.one('transitionend', function () {
        $(this).remove();
      });
    };
    const $spaceH = $('.bottom-fixed-space').outerHeight();
    if ($spaceH) {
      // const $top = parseInt($toast.css('bottom'));
      // $toast.css('bottom', $top + $spaceH);
      $toast.css('bottom', $spaceH);
    }
    $toast.addClass('on');
    let $closeTime;
    if (!$isAlarm) {
      $closeTime = setTimeout($toastClose, delayTime);
    }
    if ($isFn) {
      $toast.find('a.txt').one('click', function (e) {
        e.preventDefault();
        fn();

        // 이벤트 실행시 바로 닫기
        clearTimeout($closeTime);
        $toastClose();
      });
    }
  },
  alarm: function (txt, fn, delayTime) {
    Layer.toast(txt, fn, 'alarm', delayTime);
  },
  page: function (elment) {
    const $elment = $(elment);
    /*
    $elment.each(function () {
      const $this = $(this);
      if (!$this.closest('.popup').length) {
        $this.addClass('page');
        const $body = $this.find('.pop-body');
        const $foot = $this.find('.pop-foot');
        if ($body.length && $foot.length) $body.addClass('next-foot');
      }
    });
    */

    if ($elment.closest('.' + Layer.popClass).length) {
      $elment.removeClass(Layer.pageClass);
      return;
    }
    const $wrap = $elment.hasClass(Layer.wrapClass) ? $elment : $elment.find('.' + Layer.wrapClass);
    const $body = $wrap.find('.' + Layer.bodyClass);
    const $foot = $wrap.find('.' + Layer.footClass);
    if ($body.length && $foot.length) {
      if ($foot.css('position') === 'fixed') {
        //$body.css('padding-bottom', $foot.outerHeight());
        $body.addClass('next-foot-fixed');
      } else {
        $body.addClass('next-foot');
      }
    }

    Layer.fixed($wrap);
    $(window).scroll(function () {
      Layer.fixed($wrap);
    });
  },
  loadIdx: 0,
  load: function ($url, $type) {
    const popId = 'popLoad-' + Layer.loadIdx;
    Layer.loadIdx += 1;
    let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' ' + $type + ' ' + Layer.removePopClass + '" role="dialog" aria-hidden="true">';
    $html += '</div>';

    if ($('#wrap').length) {
      $('#wrap').append($html);
    } else {
      $('body').append($html);
    }

    const $pop = $('#' + popId);
    const $loadId = '#load';
    $pop.load($url + ' ' + $loadId, function (res, sta, xhr) {
      const $this = $(this);
      if (sta == 'success') {
        const $popWrap = $('#' + popId).find($loadId);
        if ($popWrap.hasClass(Layer.wrapClass)) {
          $popWrap.removeAttr('id');
        } else {
          $popWrap.children().unwrap();
        }
        $('#' + popId)
          .find('.' + Layer.wrapClass)
          .removeClass(Layer.pageClass);
        $('#' + popId)
          .find('.' + Layer.headClass + ' .pop-close')
          .addClass('ui-pop-close');
        Layer.open('#' + popId);
        /*
        if ($(res).find('script').length) {
          $(res)
            .find('script')
            .each(function () {
              $(this).appendTo($this);
            });
        }
        */
      } else {
        $('#' + popId).remove();
      }
    });
  },
  reOpen: false,
  btnTop: {
    button: '.btn-pop-top',
    label: '팝업 상단으로 이동',
    text: 'TOP',
    min: 100,
    onClass: 'on',
    scrollSpeed: 300
  },
  openEl: '',
  openPop: [],
  opening: 0,
  open: function (tar, callback, callbackTime) {
    const $popup = $(tar);
    const $popWrap = $popup.find('.' + Layer.wrapClass);
    //만약 팝업 없을때
    if (!$popup.length || !$popWrap.length) {
      if (!Layer.reOpen) {
        Layer.reOpen = true;
        console.log(tar, '팝업없음, 0.5초 후 open 재시도');
        setTimeout(function () {
          Layer.open(tar, callback);
        }, 500);
      } else {
        Layer.reOpen = false;
        console.log(tar, '재시도해도 팝업없음');
      }
      return;
    }

    Layer.opening++;
    const $idx = $popup.index('.' + Layer.popClass);
    const $show = $('.' + Layer.popClass + '.' + Layer.showClass).not('.' + Layer.alertClass).length;
    const $alertShow = $('.' + Layer.popClass + '.' + Layer.showClass + '.' + Layer.alertClass).length;
    let $id = $popup.attr('id');
    let $lastPop = '';

    //z-index
    if ($popup.hasClass(Layer.alertClass && !$alertShow)) {
      $popup.css('z-index', '+=' + $alertShow);
    } else if ($show) {
      $popup.css('z-index', '+=' + $show);
    }

    //id없을때
    if ($id == undefined) {
      $id = Layer.id + $idx;
      $popup.attr('id', $id);
    }

    //last 체크
    if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
    if (!$popup.hasClass(Layer.alertClass)) {
      if (Layer.openPop.length) {
        let $last;
        $.each(Layer.openPop, function () {
          const $this = '' + this;
          if (!$($this).hasClass(Layer.alertClass)) $last = $this;
        });
        $($last).removeClass(Layer.lastPopClass);
      }
      $popup.addClass(Layer.lastPopClass);
    }
    if (Layer.openPop.indexOf('#' + $id) < 0) Layer.openPop.push('#' + $id);

    // bg close
    //  && !$popup.hasClass('full')
    if (!$popup.hasClass(Layer.alertClass) && !$popup.hasClass(Layer.bgNoCloseClass)) {
      const $bgClick = '<div class="pop-bg-close ui-pop-close" role="button" aria-label="팝업창 닫기"></div>';
      if (!$popup.find('.pop-bg-close').length) $popup.prepend($bgClick);
    }

    // full 팝업일때 top버튼(btn-pop-btn) 적용
    const $btnTopHtml = '<button type="button" class="' + Layer.btnTop.button.substring(1) + '" title="' + Layer.btnTop.label + '" aria-label="' + Layer.btnTop.label + '">' + Layer.btnTop.text + '</button>';
    if ($popup.hasClass('full') && !$popup.find(Layer.btnTop.button).length && !$popup.hasClass('not-top-btn')) {
      $popWrap.append($btnTopHtml);
    }

    // delay time
    const $openDelay = 20 * Layer.opening;
    const $showDelay = 510;
    const $callbackDelay = !!callbackTime ? callbackTime : $showDelay - 60;

    //pop-scl-wrap: PC용
    if (ui.PC.any() && ($popup.hasClass('modal') || $popup.hasClass('bottom')) && !$popup.find('.' + Layer.sclWrapClass).length) {
      $popWrap.wrap('<div class="' + Layer.sclWrapClass + '"></div>');
      if ($popWrap.hasClass('pop-body-scroll')) $popWrap.parent().addClass('pop-body-scroll');
    }

    //scl-title-hide
    if ($popup.find('.' + Layer.scrollShowTitleClass).length) $popup.find('.' + Layer.headClass + ' h1').addClass('scl-title-hide');

    //show
    $popup.attr('aria-hidden', false);
    $popup.css('display', 'flex');

    const $FocusEvt = function () {
      //리턴 포커스
      let $focusEl = '';
      try {
        if (event.currentTarget != document) {
          $focusEl = $(event.currentTarget);
        } else {
          $focusEl = $(document.activeElement);
        }
      } catch (error) {
        $focusEl = $(document.activeElement);
      }

      if (Layer.openEl != '' && !$focusEl.is($focusableEl)) $focusEl = $(Layer.openEl);
      if ($($lastPop).data('returnFocus') == $focusEl) $focusEl = $(Layer.openEl);
      if ($($focusEl).is($focusableEl)) {
        $popup.data('returnFocus', $focusEl);
        $focusEl.addClass(Layer.focusedClass);
        if ($focusEl.hasClass('btn-select')) $focusEl.closest('.select').addClass('focused');
      }
      //팝업 in 포커스
      if (!ui.Mobile.any()) {
        //PC
        if ($popup.hasClass(Layer.alertClass)) {
          $popup.find('.pop-foot .button').last().focus();
        } else {
          $popup.attr({ tabindex: 0 }).focus();
        }
      } else {
        let $first = '';
        let $focusInEl = $popup.find('.' + Layer.focusInClass);
        let $thisTxt = '';
        let $childrenTxt = '';
        //모바일
        if ($popup.find('.' + Layer.headClass + ' h1').length) {
          $popup.attr({ tabindex: 0 }).focus();
        } else if ($popup.find('.' + Layer.headClass + ' .pop-close').length) {
          $popup.find('.' + Layer.headClass + ' .pop-close').focus();
        } else {
          if (!$focusInEl.length) {
            $focusInEl = $popup.find('.' + Layer.bodyClass);
            $first = $focusInEl.children().not('br').first();
            if ($first.text() == '' || $first.attr('aria-hidden') == 'true') $first = $first.next();
            $thisTxt = $.trim($focusInEl.text());
            $childrenTxt = $.trim($first.text());
            while ($focusInEl.children().not('br').length && $thisTxt.indexOf($childrenTxt) == 0) {
              $focusInEl = $first;
              $first = $first.children().not('br').first();
              if ($first.text() == '' || $first.attr('aria-hidden') == 'true') $first = $first.next();
              $thisTxt = $.trim($focusInEl.text());
              $childrenTxt = $.trim($first.text());
            }
            $focusInEl.addClass(Layer.focusInClass);
          }
          if (!$focusInEl.is($focusableEl)) $focusInEl.attr('tabindex', -1);
          $focusInEl.focus();
        }
      }
    };

    setTimeout(function () {
      //웹접근성
      $(Layer.etcCont).attr('aria-hidden', true);
      if (Layer.openPop.length && $lastPop) $($lastPop).attr('aria-hidden', true);
      const $tit = $popup.find('.' + Layer.headClass + ' h1');
      if ($tit.length) {
        if ($tit.attr('id') == undefined) {
          $tit.attr('id', $id + 'Label');
          $popup.attr('aria-labelledby', $id + 'Label');
        } else {
          $popup.attr('aria-labelledby', $tit.attr('id'));
        }
      }

      //popup(bottom:select)의 여러개의 tab-panel 높이 동일하게(안그럼 탭클릭 시 왔다리 갔다리함)
      // if ($popup.hasClass('bottom') && $popup.find('.tab-panel').length > 1) {
      //   $popup.sameHeight('.tab-panel');
      // }

      //팝업안 swiper
      if ($popup.find('.ui-swiper').length) ui.Swiper.update($popup.find('.ui-swiper'));

      //열기
      Body.lock();
      $popup.addClass(Layer.showClass);
      setTimeout(function () {
        $popup.addClass(Layer.showClass + '-end');
      }, $showDelay);
      const $popSclWrap = $popWrap.hasClass('pop-body-scroll') ? $popup.find('.' + Layer.bodyClass) : $popWrap;
      $popSclWrap.scrollTop(0);

      //height swipe 기능
      if ($popup.hasClass('is-swipe') && !$popup.hasClass('is-swipe__init')) {
        $popup.addClass('is-swipe__init');
        Layer.bottomTouch(tar);
      }

      //iframe
      if ($('iframe.load-height').length) ui.Util.iframe();

      //focus
      if (!ui.Mobile.any()) Layer.focusMove(tar);

      //position
      Layer.position(tar);
      let fixedChkIdx = 0;
      const fixedChk = function () {
        if (fixedChkIdx > 5) return;
        Layer.fixed($popWrap);
        fixedChkIdx += 1;
        setTimeout(function () {
          fixedChk();
        }, 100);
      };
      fixedChk();

      //resize
      setTimeout(function () {
        Layer.resize();
        ui.Tab.resize();
      }, 10);

      //callback
      setTimeout(function () {
        $FocusEvt();
        if (!!callback) callback();
        $popup.trigger('Layer.show');
      }, $callbackDelay);
      Layer.opening--;
    }, $openDelay);
  },
  close: function (tar, callback, callbackTime) {
    const $popup = $(tar);
    if (!$popup.hasClass(Layer.showClass)) return console.log(tar, '해당팝업 안열려있음');
    if ($popup.hasClass('morphing') && !$popup.hasClass('morphing-close')) {
      Layer.morphing.close(tar, callback);
      return;
    }
    const $id = $popup.attr('id');
    let $closeDelay = 510;
    let $callbackDelay = !!callbackTime ? callbackTime : 510;
    let $lastPop = '';
    const $visible = $('.' + Layer.popClass + '.' + Layer.showClass).length;

    Layer.openPop.splice(Layer.openPop.indexOf('#' + $id), 1);
    if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
    if (!$popup.hasClass(Layer.alertClass)) {
      if (Layer.openPop.length) {
        let $last;
        $.each(Layer.openPop, function () {
          const $this = '' + this;
          if (!$($this).hasClass(Layer.alertClass)) $last = $this;
        });
        $($last).addClass(Layer.lastPopClass);
      }
      $popup.removeClass(Layer.lastPopClass);
    }
    if ($visible == 1) {
      Body.unlock();
      $(Layer.etcCont).removeAttr('aria-hidden');
    }
    if ($lastPop != '') $($lastPop).attr('aria-hidden', false);

    //포커스
    const $focusEvt = function () {
      const $returnFocus = $popup.data('returnFocus');
      if ($returnFocus != undefined) {
        $returnFocus.removeClass(Layer.focusedClass).focus();
        if ($returnFocus.hasClass('btn-select')) $returnFocus.closest('.select').removeClass('focused');
        //플루팅 버튼
        if ($returnFocus.closest('.floating-btn').length && $returnFocus.closest('.floating-btn').hasClass('pop-on')) {
          $returnFocus.closest('.floating-btn').removeCss('z-index').removeClass('pop-on');
        }
      } else {
        //리턴 포커스가 없을때
        if ($('#header').length) {
          if ($('.head-back').length) {
            $('.head-back').focus();
          } else {
            $('#header').attr({ tabindex: 0 }).focus();
          }
        } else {
          // $popup.find(':focus').blur();
          $('#container').find($focusableEl).first().focus();
        }
      }
    };
    setTimeout(function () {
      $focusEvt();
    }, 100);

    //ui-scroll-btn
    const $scrollBtn = $popup.find('.ui-scroll-btn');
    let $scrollBtnHide = false;
    if ($scrollBtn.length && !$scrollBtn.is(':visible')) {
      $scrollBtnHide = true;
    }

    //닫기
    $popup.removeClass(Layer.showClass + '-end');
    if ($popup.find('.next-foot-fixed').length) {
      const $popWrap = $popup.find('.' + Layer.wrapClass);
      const $popSclWrap = $popWrap.hasClass('pop-body-scroll') ? $popup.find('.' + Layer.bodyClass) : $popWrap;
      $popSclWrap.scrollTop(0);
    }
    $popup.removeClass(Layer.showClass).data('focusMove', false).data('popPosition', false);
    $popup.attr('aria-hidden', 'true').removeAttr('tabindex aria-labelledby');
    if ($popup.hasClass('no_motion')) $closeDelay = 10;

    const $closeAfter = function () {
      $popup.removeAttr('style');
      if ($popup.hasClass('is-swipe')) {
        $popup.find('.' + Layer.wrapClass).removeCss('height');
        if ($popup.hasClass('full')) $popup.removeClass('full').addClass('bottom');
      }
      $popup
        .find('.' + Layer.headClass)
        .removeAttr('style')
        .removeClass('shadow')
        .find('h1')
        .removeAttr('tabindex');
      $popup.find('.' + Layer.bodyClass).removeAttr('tabindex style');
      $popup.find('.' + Layer.focusInClass).removeAttr('tabindex');
      if ($popup.find('.pop-close.last_focus').length) $popup.find('.pop-close.last_focus').remove();

      // 닫을 때 없어져야하는 요소
      if ($popup.find('.' + Layer.closeRemoveClass).length) $popup.find('.' + Layer.closeRemoveClass).remove();

      // 닫기 후 팝업 자체가 없어지는 케이스
      if ($popup.hasClass(Layer.alertClass) || $popup.hasClass(Layer.selectClass) || $popup.hasClass(Layer.removePopClass)) {
        if ($popup.hasClass(Layer.selectClass)) Layer.isSelectOpen = false;
        if ($popup.hasClass(Layer.alertClass)) {
          const $content = $popup.find('.message>div').html();
          Layer.beforeCont.splice(Layer.beforeCont.indexOf($content), 1);
        }
        $popup.remove();
      }

      //ui-scroll-btn
      if ($scrollBtnHide) $scrollBtn.removeAttr('style').next().hide();

      // 약관
      if ($popup.hasClass(Layer.agreePopClass)) {
        $popup.find('.' + Layer.agreeBtnClassName).remove();
        $popup.find('.' + Layer.agreeCheckedClassName).removeClass(Layer.agreeCheckedClassName);
      }
    };
    setTimeout(function () {
      $closeAfter();
    }, $closeDelay);

    setTimeout(function () {
      //callback
      if (!!callback) callback();

      $popup.trigger('Layer.hide');
    }, $callbackDelay);

    /*
    const $wrap = $popup.find('.' + Layer.wrapClass);
    $wrap.on('transitionend', function () {
      $closeAfter();
      $wrap.off('transitionend');
    });
    */
  },
  resize: function () {
    const $popup = $('.' + Layer.popClass + '.' + Layer.showClass);
    if (!$popup.length) return;
    const headHeight = function (headCont, contentCont) {
      const $headH = headCont.children().outerHeight();
      const $position = headCont.css('position');
      const $padTop = parseInt(contentCont.css('padding-top'));
      if ($headH > $padTop) {
        contentCont.css('padding-top', $headH);
      }
    };
    const footHeight = function (footCont, contentCont) {
      const $footH = footCont.children().outerHeight();
      const $padBottom = parseInt(contentCont.css('padding-bottom'));
      if ($footH > $padBottom) {
        contentCont.css('padding-bottom', $footH);
      }
    };
    $popup.each(function () {
      const $this = $(this);
      const $wrap = $this.find('.' + Layer.wrapClass);
      const $head = $wrap.find('.' + Layer.headClass);
      const $body = $wrap.find('.' + Layer.bodyClass);
      const $foot = $wrap.find('.' + Layer.footClass);
      // const $tit = $head.find('h1');

      $head.removeAttr('style').removeClass('shadow');
      $body.removeAttr('tabindex style');

      const $footH = $foot.outerHeight() ? $foot.outerHeight() : $foot.children().outerHeight();
      const $bodyPdB = parseInt($body.css('padding-bottom'));

      // if ($head.length) headHeight($head, $body);
      // if ($foot.length) footHeight($foot, $body);
      if ($foot.length && ($foot.css('position') === 'fixed' || $foot.children().css('position') === 'fixed') && $footH !== $bodyPdB) $body.css('padding-bottom', $footH);

      //레이어팝업
      //컨텐츠 스크롤이 필요할때
      const $height = $this.height();
      // const  $popHeight = $this.find('.'+Layer.wrapClass).outerHeight();
      if ($this.hasClass('bottom') || $this.hasClass('modal')) $wrap.css('max-height', $height);

      //팝업 헤더 shadow
      Layer.fixed($wrap);

      //바텀시트 선택요소로 스크롤
      if ($this.hasClass(Layer.selectClass) && $this.find('.selected').length && !$wrap.hasClass('scrolling')) {
        const $headH = $head.outerHeight();
        const $wrapH = $wrap.outerHeight();
        const $wrapH2 = $wrap.get(0).scrollHeight;
        const $selected = $wrap.find('.selected');
        const $selectedH = $selected.outerHeight();
        const $selectedTop = $selected.position().top;

        if ($wrapH < $wrapH2) {
          $wrap.addClass('scrolling');
          const $sclTop = $selectedTop - $wrapH + $wrapH / 2 - $selectedH / 2 + $headH / 2;
          $wrap.animate({ scrollTop: $sclTop }, 300, function () {
            $wrap.removeClass('scrolling');
          });
        }
      }
    });
  },
  fixed: function (el) {
    //  pop fixed
    let $wrap = $(el);
    if ($wrap.find('.' + Layer.wrapClass).length) $wrap = $wrap.find('.' + Layer.wrapClass);
    if ($wrap.closest('.' + Layer.wrapClass).length) $wrap = $wrap.closest('.' + Layer.wrapClass);
    // if ($wrap.closest('.' + Layer.sclWrapClass).length) $wrap = $wrap.closest('.' + Layer.sclWrapClass);
    const $head = $wrap.find('.' + Layer.headClass);
    const $foot = $wrap.find('.' + Layer.footClass);
    if ($wrap.hasClass('pop-body-scroll')) $wrap = $wrap.find('.' + Layer.bodyClass);
    const $scrollTop = $wrap.hasClass(Layer.pageClass) ? $(window).scrollTop() : $wrap.scrollTop();
    const $scrollHeight = $wrap.hasClass(Layer.pageClass) ? $('body').get(0).scrollHeight : $wrap[0].scrollHeight;
    const $wrapHeight = $wrap.hasClass(Layer.pageClass) ? $(window).height() : $wrap.outerHeight();
    const $topClassName = 'pop-top-fixed';
    const $bottomClassName = 'pop-bottom-fixed';
    if ($head.length) {
      if ($scrollTop > 0) {
        $head.addClass($topClassName);
      } else {
        $head.removeClass($topClassName);
      }
    }

    if ($foot.length) {
      if ($scrollTop + $wrapHeight >= $scrollHeight - 10) {
        $foot.removeClass($bottomClassName);
      } else {
        $foot.addClass($bottomClassName);
      }
    }
    const $fixed = $wrap.find('.pop-fixed');
    const $wrapTop = $wrap.position().top;
    if ($fixed.length) {
      $fixed.each(function () {
        const $this = $(this);
        const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
        const $topMargin = ui.Common.getTopFixedHeight($this, $topClassName);
        let $topEl = $this;
        const $top = $offsetTop - $wrapTop;
        if ($scrollTop + $topMargin > $top) {
          $this.data('top', $offsetTop);
          $this.addClass($topClassName);
          if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
          if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
          if ($head.hasClass($topClassName)) $head.addClass('end-fixed');
        } else {
          $this.removeData('top');
          if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
          $topEl.removeCss('top');
          $this.removeClass($topClassName);
          if (($head.hasClass($topClassName) && $wrap.find('.' + $topClassName).length === 1) || !$wrap.find('.' + $topClassName).length) $head.removeClass('end-fixed');
        }
      });
    }
  },
  position: function (tar) {
    const $popup = $(tar);
    if (!$popup.hasClass(Layer.showClass)) return false;
    if ($popup.data('popPosition') == true) return false;
    $popup.data('popPosition', true);
    let $wrap = $popup.find('.' + Layer.wrapClass);
    // if ($wrap.closest('.' + Layer.sclWrapClass).length) $wrap = $wrap.closest('.' + Layer.sclWrapClass);
    if ($wrap.hasClass('pop-body-scroll')) $wrap = $wrap.find('.' + Layer.bodyClass);
    let $wrapH = $wrap.outerHeight();
    let $wrapSclH = $wrap[0].scrollHeight;
    const $head = $popup.find('.' + Layer.headClass);
    const $body = $popup.find('.' + Layer.bodyClass);
    const $foot = $popup.find('.' + Layer.footClass);
    const $btnTop = $popup.find(Layer.btnTop.button);
    const btnTopOn = function () {
      $btnTop.attr('aria-hidden', 'false').addClass(Layer.btnTop.onClass);
    };
    const btnTopOff = function () {
      $btnTop.attr('aria-hidden', 'true').removeClass(Layer.btnTop.onClass);
    };

    const $isAgree = $popup.hasClass(Layer.agreePopClass);
    const $isAgreeSwiper = $popup.hasClass(Layer.agreePopSwiperClass);
    const $agreeScrollTxt = '끝까지 내려보기';
    const $agreeCheckedTxt = '동의하기';
    const $footBtn = $foot.find('.button');

    const $agreeBtnhtml = '<button type="button" class="' + Layer.agreeBtnClassName + ' button primary">' + $agreeScrollTxt + '</button>';
    let $agreeBodyChk = $body.find('.' + Layer.agreeCheckboxClassName);

    if ($foot.length) {
      if ($foot.css('position') === 'fixed') {
        $body.addClass('next-foot-fixed');
        // const $pdBottom = parseInt($body.css('padding-bottom'));
        // const $footH = $foot.outerHeight();
        // if ($pdBottom !== $footH) $body.css('padding-bottom', $footH);
      } else {
        $body.addClass('next-foot');
      }

      // btn-pop-top bottom
      if ($btnTop.length) $btnTop.css('bottom', $foot.outerHeight());

      if ($isAgree) {
        $footBtn.each(function (i) {
          const $this = $(this);
          let $agreeInput = $($this.data('agree-input'));
          const $agreeCheckedTxt2 = $footBtn.data('txt');
          if ($agreeInput.prop('checked')) {
            if ($agreeCheckedTxt2) {
              if ($this.html() !== $agreeCheckedTxt2) $this.html($agreeCheckedTxt2);
              $this.removeData('txt');
            }
          } else {
            if (!$agreeCheckedTxt2) $this.data('txt', $footBtn.html());
            $this.html($agreeCheckedTxt).addClass(Layer.agreeCheckedClassName).hide().before($agreeBtnhtml);
            // if ($wrapH < $wrapSclH)$this.hide().before($agreeBtnhtml);
            let $agreeBody = $body;
            if ($isAgreeSwiper) $agreeBody = $body.find('.swiper-slide').eq(i);
            $agreeBodyChk = $agreeBody.find('.' + Layer.agreeCheckboxClassName);
            const $agreeBodyChkChecked = $agreeBody.find('.' + Layer.agreeCheckboxClassName + ':checked');
            if ($agreeBodyChk.length && $agreeBodyChk.length !== $agreeBodyChkChecked.length) {
              $this.prop('disabled', true);
            }
          }
        });
      }
    }

    const scrollElOn = function () {
      $wrap.find('.pop-scroll-hide').addClass('hidden');
    };
    const showElOff = function () {
      $wrap.find('.pop-scroll-hide').removeClass('hidden');
    };

    const $scrollBtnEvt = function (tar) {
      const $scrollBtn = tar;
      if (!$scrollBtn.length) return;
      const $sclWrap = $popup.find('.' + Layer.sclWrapClass).length ? $popup.find('.' + Layer.sclWrapClass) : $popup.find('.' + Layer.wrapClass);
      const $innerHeight = $sclWrap.height();
      const $scrollTop = $sclWrap.scrollTop();
      const $scrollHeight = $sclWrap[0].scrollHeight;
      const $mainBtn = $scrollBtn.next('.button');
      if ($innerHeight + $scrollTop + 30 > $scrollHeight) {
        // $scrollBtn.remove();
        $scrollBtn.hide();
        $mainBtn.show();
      }
    };

    const $scrollEndEvt = function (scrllTopVal) {
      const $SclTop = $wrap.scrollTop();
      if ($SclTop > Layer.btnTop.min) {
        btnTopOff();
      }
    };

    let $animation = $wrap.find('[data-animation]');
    if ($animation.length) {
      setTimeout(function () {
        ui.Animation.sclCheckIn($animation, $wrap);
      }, 500);
    }

    let $lastSclTop = 0;
    let $timer;
    if (!$wrap.data('_ui-init')) {
      $wrap.data('_ui-init', true);
      $wrap.on('scroll', function () {
        const $this = $(this);
        const $agreeBtn = $this.find('.' + Layer.agreeBtnClassName);
        const $wrapSclTop = $this.scrollTop();
        const $wrapH = $this.outerHeight();
        const $wrapSclH = $this[0].scrollHeight;

        if (!$('html').hasClass('input-focus')) scrollElOn();
        clearTimeout($timer);
        $timer = setTimeout(function () {
          showElOff();
        }, 500);

        // btn-pop-top show
        if ($btnTop.length) {
          if ($wrapSclTop > Layer.btnTop.min) {
            if ($('html').hasClass('input-focus') && ui.Mobile.any()) return;
            btnTopOn();
          } else {
            btnTopOff();
          }
        }

        //ui-scroll-btn
        const $scrollBtn = $popup.find('.ui-scroll-btn');
        if ($scrollBtn.length && $scrollBtn.is(':visible')) $scrollBtnEvt($scrollBtn);

        //약관
        if ($isAgree && $agreeBtn.length) {
          if ($lastSclTop === 0) $lastSclTop = -1;
          if ($wrapSclTop + $wrapH >= $wrapSclH - 10 && $lastSclTop < $wrapSclTop) {
            $agreeBtn.each(function () {
              const $parent = $(this).parent();
              if ($parent.is(':visible')) {
                $(this).next().show();
                $(this).remove();
              }
            });
          }
          $lastSclTop = $wrapSclTop;
        }

        // 고정확인
        Layer.fixed($this);

        // bg origin
        const $sclHead = $this.find('.ui-pop-header-bg-origin');
        const $headH = $head.outerHeight();
        if ($head.length && $sclHead.length) {
          if ($sclHead.offset().top - $headH < $headH) {
            $head.addClass('bg-origin');
          } else {
            $head.removeClass('bg-origin');
          }
        }

        // title show
        const $fadeTitle = $this.find('.' + Layer.scrollShowTitleClass);
        const $headerTit = $head.find('h1');
        if ($fadeTitle.length && $headerTit.length) ui.Common.scrollShowTitle($fadeTitle[0], $this[0], $head[0], $headerTit[0]);
      });

      $wrap.on(
        'scroll',
        _.debounce(function () {
          $scrollEndEvt();
        }, 1500)
      );
      $wrap.on('click', function () {
        setTimeout(function () {
          $wrap.scroll();
        }, 50);
      });

      $wrap.on(
        'scroll resize',
        _.debounce(function () {
          $animation = $wrap.find('[data-animation]');
          if ($animation.length) ui.Animation.sclCheckIn($animation, $wrap);
        }, 100)
      );
    }

    Layer.resize();
    // Layer.fixed($wrap);
  },
  focusMove: function (tar) {
    if (!$(tar).hasClass(Layer.showClass)) return false;
    if ($(tar).data('focusMove') == true) return false;
    $(tar).data('focusMove', true);
    const $tar = $(tar);
    const $focusaEls = $tar.find($focusableEl);
    let $isFirstBackTab = false;

    $focusaEls.on('keydown', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $focusLength = $focusable.length;
      const $firstFocus = $focusable.first();
      const $lastFocus = $focusable.last();
      const $index = $focusable.index(this);

      $isFirstBackTab = false;
      if ($index == $focusLength - 1) {
        //last
        if ($keyCode == 9) {
          if (!e.shiftKey) {
            $firstFocus.focus();
            e.preventDefault();
          }
        }
      } else if ($index == 0) {
        //first
        if ($keyCode == 9) {
          if (e.shiftKey) {
            $isFirstBackTab = true;
            $lastFocus.focus();
            e.preventDefault();
          }
        }
      }
    });

    $tar.on('keydown', function (e) {
      const $keyCode = e.keyCode ? e.keyCode : e.which;
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $lastFocus = $focusable.last();

      if (e.target == this && $keyCode == 9) {
        if (e.shiftKey) {
          $lastFocus.focus();
          e.preventDefault();
        }
      }
    });

    $(document).on('focusin', $tar.selector + ' .last_focus', function (e) {
      const $focusable = $tar.find($focusableEl).not('.last_focus');
      const $firstFocus = $focusable.first();
      const $lastFocus = $focusable.last();
      if ($isFirstBackTab) {
        $lastFocus.focus();
      } else {
        $firstFocus.focus();
      }
    });
  },
  init: function () {
    if ($('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]').length) {
      Layer.open('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]');
    }
    const $winpop = $('.' + Layer.wrapClass + '.' + Layer.pageClass);
    if ($winpop.length) {
      Layer.page($winpop);
    }

    $(document).on('click', $focusableEl, function (e) {
      Layer.openEl = e.currentTarget;
    });
    setTimeout(function () {
      Layer.openEl = '';
    }, 100);

    //열기
    $(document).on('click', '.ui-pop-open', function (e) {
      e.preventDefault();
      const $pop = $(this).attr('href');
      const $currentTarget = $(e.currentTarget);
      if (!$pop.length) return;
      if ($($pop).hasClass('morphing')) {
        Layer.morphing.open(this, $pop, function () {
          $($pop).data('returnFocus', $currentTarget);
        });
      } else {
        Layer.open($pop, function () {
          $($pop).data('returnFocus', $currentTarget);
        });
      }
    });

    //닫기
    $(document).on('click', '.ui-pop-close', function (e) {
      e.preventDefault();
      let $pop = $(this).attr('href');
      if ($pop == '#' || $pop == '#none' || $pop == undefined) $pop = $(this).closest('.' + Layer.popClass);
      if ($pop.length) Layer.close($pop);
    });

    /*
    $(document).on('click', '.popup .pop-wrap', function (e) {
      const $this = $(this);
      let $wrap = $this;
      if ($wrap.closest('.' + Layer.sclWrapClass).length) $wrap = $wrap.closest('.' + Layer.sclWrapClass);
      if ($wrap.hasClass('pop-body-scroll')) $wrap = $wrap.find('.' + Layer.bodyClass);
      $wrap.scroll();
    });
    */

    // btn-pop-top
    $(document).on('click', '.btn-pop-top', function (e) {
      e.preventDefault();
      const $this = $(this);
      let $wrap = $this.closest('.' + Layer.wrapClass);
      // if ($wrap.closest('.' + Layer.sclWrapClass).length) $wrap = $wrap.closest('.' + Layer.sclWrapClass);
      if ($wrap.hasClass('pop-body-scroll')) $wrap = $wrap.find('.' + Layer.bodyClass);
      $wrap.animate({ scrollTop: 0 }, Layer.btnTop.scrollSpeed);
    });

    Layer.keyEvt();
    Layer.selectUI();

    $(document).on('click', '[data-popup]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup');
      Layer.load($popup, 'full');
    });
    $(document).on('click', '[data-popup-full]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-full');
      Layer.load($popup, 'full');
    });
    $(document).on('click', '[data-popup-modal]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-modal');
      Layer.load($popup, 'modal');
    });
    $(document).on('click', '[data-popup-bottom]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-bottom');
      Layer.load($popup, 'bottom');
    });
    $(document).on('click', '[data-popup-left]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-left');
      Layer.load($popup, 'side-left');
    });
    $(document).on('click', '[data-popup-right]', function (e) {
      e.preventDefault();
      const $popup = $(this).data('popup-right');
      Layer.load($popup, 'side-right');
    });

    // 알람박스 닫기
    $(document).on('click', '.alarm-box .close', function (e) {
      e.preventDefault();
      const $box = $(this).closest('.alarm-box');
      $box.removeClass('on');
      $box.on('transitionend', function () {
        $(this).remove();
      });
    });

    // 약관
    $(document).on('click', '[data-agree-pop]', function (e) {
      const $this = $(this);
      const $thisId = $this.attr('id');
      const $pop = $this.data('agree-pop');
      if ($this.prop('checked')) {
        Layer.agree('#' + $thisId);
        return false;
      } else {
        const $popChk = $($pop).find('.' + Layer.agreeCheckboxClassName);
        if ($popChk.length) $popChk.prop('checked', false);
      }
    });
    $(document).on('click', '[data-agree-check]', function (e) {
      const $this = $(this);
      const $check = $this.data('agree-check');
      if ($this.prop('checked')) {
        Layer.agree($check);
        return false;
      }
    });

    $(document).on('change', '.' + Layer.agreeCheckboxClassName, function () {
      const $this = $(this);
      const $chkBody = $this.closest('.swiper-slide').length ? $this.closest('.swiper-slide') : $this.closest('.' + Layer.bodyClass);
      const $idx = $chkBody.hasClass('swiper-slide') ? $chkBody.index('.swiper-slide') : 0;
      const $chk = $chkBody.find('.' + Layer.agreeCheckboxClassName);
      const $chkChecked = $chkBody.find('.' + Layer.agreeCheckboxClassName + ':checked');
      const $popup = $chkBody.closest('.' + Layer.popClass);
      const $footBtn = $popup.find('.' + Layer.agreeCheckedClassName);
      const $chkBtn = $footBtn.eq($idx);
      if ($chk.length === $chkChecked.length) {
        $chkBtn.prop('disabled', false);
      } else {
        $chkBtn.prop('disabled', true);
      }
    });

    $(document).on('click', '.' + Layer.agreeBtnClassName, function (e) {
      e.preventDefault();
      const $wrap = $(this).closest('.' + Layer.wrapClass);
      const $sclMove = $wrap[0].scrollHeight - $wrap.outerHeight();
      $wrap.animate({ scrollTop: $sclMove }, 300);
      $(this)
        .parent()
        .find('.' + Layer.agreeCheckedClassName)
        .show();
      $(this).remove();
    });
    $(document).on('click', '.' + Layer.agreeCheckedClassName, function (e) {
      e.preventDefault();
      const $pop = $(this).closest('.' + Layer.popClass);
      const $isAgreeSwiper = $pop.hasClass(Layer.agreePopSwiperClass);
      const $btnInput = $($(this).data('agree-input'));
      $btnInput.prop('checked', true).change();
      if ($isAgreeSwiper) {
        const $swiper = $pop.find('.agree-swiper').data('swiper');
        const $swiperIdx = $swiper.realIndex;
        if ($swiperIdx < $swiper.slides.length - 1) {
          $swiper.slideTo($swiperIdx + 1, 300);
        } else {
          Layer.close($pop);
        }
      }
    });

    //pdf
    $(document).on('click', '[data-agree-pdf]', function (e) {
      e.preventDefault();
      let $url = $(this).data('agree-pdf');
      if (!$url) return;
      if ($url.indexOf('.pdf') !== $url.length - 4) $url = $url + '.pdf';
      let $title = '약관상세';
      const $pdfTit = $(this).data('agree-pdf-title');
      if ($pdfTit) $title = $pdfTit;
      Layer.pdf($url, $title);
    });
  }
};

Layer.morphing = {
  is: false,
  open: function (btn, target, callback) {
    const $btn = $(btn);
    const $pop = $(target);
    const $currentTarget = $(btn);
    if (!$pop.length || Layer.morphing.is) return;
    Layer.morphing.is = true;
    Body.lock();
    let $bgEl;
    let $toMin;
    let $width;
    let $height;
    let $left;
    let $top;
    let $radius;
    let $scale;
    const $getScaleValue = function (topValue, leftValue, radiusValue) {
      const windowW = $(window).width();
      const windowH = $(window).height();
      const maxDistHor = leftValue > windowW / 2 ? leftValue : windowW - leftValue;
      const maxDistVert = topValue > windowH / 2 ? topValue : windowH - topValue;
      return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radiusValue);
    };
    const $wrap = $('#wrap').length ? $('#wrap') : $('body');
    $wrap.addClass('overflow-hidden');
    const $position = function () {
      const $popId = $pop.attr('id');
      $width = $btn.outerWidth();
      $height = $btn.outerHeight();
      const $offset = $btn.offset();
      // $top = $offset.top - $(window).scrollTop();
      // $left = $offset.left - $(window).scrollLeft();
      $top = $offset.top - $wrap.offset().top;
      $left = $offset.left - $wrap.offset().left;
      const $bg = $btn.css('background-color');
      const $border = $btn.css('border');
      const $borderWidth = parseInt($btn.css('border-width'));
      const $borderRadius = parseInt($btn.css('border-radius'));
      const $shadow = $btn.css('box-shadow');
      let $style = '';
      $style += 'left:' + $left + 'px;';
      $style += 'top:' + $top + 'px;';
      $style += 'width:' + $width + 'px;';
      $style += 'height:' + $height + 'px;';
      $style += 'border-radius:' + $borderRadius + 'px;';
      if ($bg !== 'rgba(0, 0, 0, 0)') $style += 'background:' + $bg + ';';
      if ($borderWidth) $style += 'border:' + $border + ';';
      if ($shadow !== 'none') $style += 'box-shadow:' + $shadow + ';';
      $bgEl = '.morphing-bg[data-pop="#' + $popId + '"]';
      if (!$($bgEl).length) {
        const $html = '<div class="morphing-bg" data-pop="#' + $popId + '" style="' + $style + '"></div>';
        $($pop).before($html);
      } else {
        $($bgEl).removeAttr('style').attr('style', $style);
      }

      $($bgEl).data('left', $left);
      $($bgEl).data('top', $top);
      $($bgEl).data('width', $width);
      $($bgEl).data('height', $height);
      $($bgEl).data('border-radius', $borderRadius);

      $toMin = $width < $height ? $width : $height;
      $radius = $toMin / 2;
      $scale = $getScaleValue($left, $top, $radius);
    };
    $position();
    setTimeout(function () {
      $btn.addClass('morphing-btn-hidden');
    }, 300);
    const tl = anime.timeline({
      // easing: 'easeOutExpo',
      // easing: 'linear',
      easing: 'easeOutQuad',
      duration: 300
    });
    tl.add({
      targets: $bgEl,
      opacity: 1
    })
      .add({
        targets: $bgEl,
        left: $left + ($width - $toMin) / 2 + 'px',
        top: $top + ($height - $toMin) / 2 + 'px',
        width: $toMin + 'px',
        height: $toMin + 'px',
        borderRadius: $radius + 'px'
      })
      .add({
        targets: $bgEl,
        duration: 500,
        scale: $scale,
        complete: function () {
          Layer.open($pop, function () {
            $($pop).data('returnFocus', $currentTarget);
            if (!!callback) callback();
          });
        }
      });
  },
  close: function (target, callback) {
    const $pop = $(target);
    const $btn = $pop.data('returnFocus');
    const $wrap = $('#wrap').length ? $('#wrap') : $('body');

    $pop.addClass('morphing-close');
    const $popClose = function () {
      const $popId = $pop.attr('id');
      const $bgEl = '.morphing-bg[data-pop="#' + $popId + '"]';
      const $left = $($bgEl).data('left');
      const $top = $($bgEl).data('top');
      const $width = $($bgEl).data('width');
      const $height = $($bgEl).data('height');
      const $radius = $($bgEl).data('border-radius');
      const tl = anime.timeline({
        easing: 'easeOutQuad',
        duration: 300
      });
      tl.add({
        targets: $bgEl,
        duration: 500,
        scale: 1,
        complete: function () {
          $wrap.removeClass('overflow-hidden');
        }
      })
        .add({
          targets: $bgEl,
          left: $left,
          top: $top,
          width: $width,
          height: $height,
          borderRadius: $radius,
          complete: function () {
            $btn.removeClass('morphing-btn-hidden');
          }
        })
        .add({
          targets: $bgEl,
          opacity: 0,
          complete: function () {
            $($bgEl).remove();
            Layer.morphing.is = false;
          }
        });
    };
    Layer.close(target, function () {
      $pop.removeClass('morphing-close');
      $popClose();
      if (!!callback) callback();
    });
  }
};
