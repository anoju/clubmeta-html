/********************************
 * 클럽메타 UI 스크립트 *
 * 작성자 : 안효주 *
 ********************************/
/** init **/
const ui = {
  isInit: false,
  basePath: '/to-be/static/',
  Init: function () {
    if (this.isInit) {
      this.reInit();
    } else {
      this.isInit = true;
      this.Common.page();
    }
  },
  reInit: function () {},
  isLoadInit: false,
  LoadInit: function () {}
};

$(function () {
  ui.Common.vhChk();
  ui.Common.dark();
  ui.Device.check();

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
});
$(window).on('scroll', function () {});

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

/** common **/
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
  hr: function () {
    //hr태그 토크백 제외
    $('hr').each(function () {
      const $this = $(this);
      if (!$this.attr('aria-hidden') !== 'true') $this.attr('aria-hidden', true);
    });
  },
  fixed: function (target, isBottom) {
    if (isBottom === undefined) isBottom = false;
    //고정(fixed)
    const $target = $(target);
    if (!$target.length) return;
    $target.each(function () {
      const $this = $(this);
      if (!$target.data('init')) return;
      $target.data('init', true);
      $(window).on('scroll', function () {
        if ($('html').hasClass('lock')) return false;
        const $scrollTop = $(this).scrollTop();

        $target.each(function () {
          if ($(this).closest('.' + Layer.popClass).length) return;
          const $this = $(this);
          const $topMargin = getTopFixedHeight($this);
          let $topEl = $this;
          const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
          const $thisH = $this.outerHeight();
          const $isFixed = isBottom ? $scrollTop + $topMargin > $offsetTop + $thisH : $scrollTop + $topMargin > $offsetTop;
          if ($isFixed) {
            $this.data('top', $offsetTop);
            $this.addClass('top-fixed');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
            if ($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed')) $('#header').addClass('not-fixed-style');
          } else {
            $this.removeData('top');
            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
            $topEl.removeCss('top');
            $this.removeClass('top-fixed');
            if (($this.attr('id') !== 'header' && $('#header').hasClass('top-fixed') && $('.top-fixed').length === 1) || !$('.top-fixed').length) $('#header').removeClass('not-fixed-style');
          }
        });
      });
    });
  },
  header: function () {
    const $page = $('.main-page');
    if (!$page.length) return;
    $page.each(function () {
      if (!$(this).is(':visible')) return;
      const $head = $(this).find('.page-head');
      const $titleEl = $head.find('h1');
      if (!$titleEl.length) return;
      if ($head.closest('.page').find('.' + ui.Common.scrollShowTitleClass).length) $titleEl.addClass('scl-title-hide');

      const $headLeft = $head.find('.head-left');
      if ($headLeft.find('h1').length) return;
      const $headLeftW = $headLeft.outerWidth();
      const $headRight = $head.find('.head-right');
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
    });
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
    let $lastSclTop = $(window).scrollTop();
    const $scrollEvt = function () {
      const $SclTop = $(window).scrollTop();
      const $wrap = $('.main-page:visible');
      const $header = $wrap.find('.page-head');
      const $headerH = $header.outerHeight();
      const $spaceH = $wrap.find('.bottom-fixed-space').outerHeight();
      const $btnTop = $wrap.find(ui.BtnTop.class);
      const $bottom = parseInt($btnTop.parent().css('bottom'));
      const $margin = 24;
      const $Height = window.innerHeight;
      const $scrollHeight = $('body').get(0).scrollHeight;
      if ($spaceH > 0 && $spaceH != $bottom - $margin) {
        $wrap.find('.floating-btn').css('bottom', $spaceH === 0 ? $margin : $spaceH + 10);
      }

      if ($SclTop > ui.BtnTop.min && $lastSclTop !== $SclTop) {
        if ($('html').hasClass('input-focus') && ui.Mobile.any()) return;
        ui.BtnTop.on($btnTop);
      } else {
        ui.BtnTop.off($btnTop);
      }
      const $fadeTitle = $wrap.find('.' + ui.Common.scrollShowTitleClass);
      const $headerTit = $header.find('h1');
      if ($fadeTitle.length && $headerTit.length) ui.Common.scrollShowTitle($fadeTitle[0], window, $header[0], $headerTit[0]);

      const $sclHead = $wrap.find('.ui-header-bg-origin');
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
      const $btnFixed = $wrap.find('.btn-wrap.bottom-fixed');
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
              $this.addClass('not-fixed-style');
            } else {
              $this.removeClass('not-fixed-style');
            }
          }
        });
      }

      setTimeout(function () {
        $lastSclTop = $SclTop;
      }, 50);
    };
    const $scrollEndEvt = function () {
      const $SclTop = $(window).scrollTop();
      if ($SclTop > ui.BtnTop.min) {
        ui.BtnTop.off();
      }
    };
    $(window).on('scroll resize', $scrollEvt);
    $(window).on(
      'scroll',
      _.debounce(function () {
        $scrollEndEvt();
      }, 1500)
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
      const $topMargin = Math.max(getTopFixedHeight($fadeTitle), $headerH);
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

    ui.Common.fixed('#header');
    ui.Common.fixed('.tab-fixed');
  }
};

ui.Etc = {
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
  }
};

ui.BtnTop = {
  class: '.btn-page-top',
  label: '컨텐츠 상단으로 이동',
  text: 'TOP',
  min: 100,
  onClass: 'on',
  hoverClass: 'hover',
  scrollSpeed: 300,
  append: function () {
    const $wrap = $('.page');
    if (!$wrap.length) return;
    $wrap.each(function () {
      if (!$(this).find(ui.BtnTop.class).length) {
        let btnHtml = '';
        if ($(this).find('.page-body').hasClass('not-top-btn')) return;
        if (!$(this).find('.floating-btn').length) btnHtml += '<div class="floating-btn">';
        btnHtml += '<a href="#" class="btn ' + ui.BtnTop.class.substring(1) + '" title="' + ui.BtnTop.label + '" role="button" aria-label="' + ui.BtnTop.label + '">' + ui.BtnTop.text + '</a>';
        if (!$(this).find('.floating-btn').length) btnHtml += '</div>';
        if ($(this).find('.floating-btn').length) {
          $(this).find('.floating-btn').append(btnHtml);
        } else {
          $(this).append(btnHtml);
        }
      }
    });
  },
  on: function (btn) {
    $(btn).attr('aria-hidden', 'false').addClass(ui.BtnTop.onClass);
    $(btn).closest('.floating-btn').addClass('top-on');
  },
  off: function (btn) {
    $(btn).attr('aria-hidden', 'true').removeClass(ui.BtnTop.onClass);
    $(btn).closest('.floating-btn').removeClass('top-on');
  },
  UI: function () {
    $(document)
      .on('click', ui.BtnTop.class, function (e) {
        e.preventDefault();
        const $page = $(this).closest('.page');
        if ($page.closest('.popup').length) {
          const $body = $page.find('.page-body');
          ui.Scroll.wrapTop($body, 0, ui.BtnTop.scrollSpeed);
        } else {
          ui.Scroll.top(0, ui.BtnTop.scrollSpeed);
          $page.find($focusableEl).first().focus();
        }
      })
      .on('mouseenter', ui.BtnTop.class, function () {
        $(this).addClass(ui.BtnTop.hoverclass);
      })
      .on('mouseleave', ui.BtnTop.class, function () {
        $(this).removeClass(ui.BtnTop.hoverClass);
      });
  }
};
