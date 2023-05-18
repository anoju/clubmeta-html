/********************************
 * 클럽메타 UI 스크립트 *
 * 작성자 : 안효주 *
 ********************************/

/** init **/
const ui = {
  className: {
    lock: '.lock',
    wrap: '.page',
    mainWrap: '.main-page',
    header: '.page-head',
    title: '.head-title',
    body: '.page-body',
    btnTop: '.btn-page-top',
    floatingBtn: '.floating-btn',
    popup: '.popup',
    topFixed: '.top-fixed',
    bottomFixed: '.bottom-fixed',
    bottomFixedSpace: '.bottom-fixed-space'
  },
  isInit: false,
  basePath: function () {
    return '/to-be/static/';
  },
  Init: function () {
    if (this.isInit) {
      ui.reInit();
    } else {
      ui.isInit = true;
      ui.Common.init();
      ui.Util.init();
      ui.Button.init();
    }
  },
  reInit: function () {
    ui.Common.reInit();
    ui.Util.reInit();
    ui.Button.reInit();
  },
  isLoadInit: false,
  LoadInit: function () {
    ui.Common.LoadInit();
    ui.Button.LoadInit();
  }
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
$(window).on('scroll resize', function () {
  ui.Common.scrollEvt();
  ui.Common.fixedInit();
  ui.Common.bottomSpace();
});
$(window).on('resize', function () {
  ui.Common.vhChk();
});
$(window).on('scroll', function () {});
$(window).on(
  'scroll',
  _.debounce(function () {
    ui.Common.scrollEndEvt();
  }, 1500)
);

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
  init: function () {
    ui.Common.page();
    ui.BtnTop.init();
    ui.Common.header();
    ui.Common.bottomSpaceAppend();
    ui.Common.bottomSpaceRepeat();
    ui.Common.fixedInit();
    ui.Common.UI();
    // ui.Common.landscape();
  },
  reInit: function () {
    ui.Common.page();
    ui.BtnTop.append();
    ui.Common.header();
    ui.Common.bottomSpaceAppend();
    ui.Common.bottomSpaceRepeat();
    ui.Common.fixedInit();
    ui.Common.hr();
    ui.Common.lottie();
  },
  LoadInit: function () {
    ui.Common.bottomSpace();
    ui.Common.hr();
    ui.Common.lottie();
  },
  page: function () {
    $(ui.className.wrap).each(function () {
      if (!$(this).closest(ui.className.popup).length) $(this).addClass(ui.className.mainWrap.slice(1));
    });

    const $last = $(ui.className.body + ' > .btn-wrap' + ui.className.bottomFixed + ':last-child');
    if ($last.length) {
      $last.each(function () {
        const $section = $(this).prev('.section');
        if ($section.length) $section.addClass('last');
      });
    }
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
  fixedInit: function () {
    ui.Common.fixed(ui.className.mainWrap + ' ' + ui.className.header);
    ui.Common.fixed('.tab-fixed');
  },
  fixed: function (target, isBottom) {
    if (isBottom === undefined) isBottom = false;
    const $target = $(target);
    if (!$target.length) return;
    $target.each(function () {
      const $this = $(this);
      if ($('html').hasClass(ui.className.lock.slice(1))) return false;
      const $scrollTop = $(window).scrollTop();
      if ($this.closest(ui.className.popup).length) return;
      const $topMargin = getTopFixedHeight($this);
      let $topEl = $this;
      const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
      const $thisH = $this.outerHeight();
      const $isFixed = isBottom ? $scrollTop + $topMargin > $offsetTop + $thisH : $scrollTop + $topMargin > $offsetTop;
      if ($isFixed) {
        $this.data('top', $offsetTop);
        $this.addClass(ui.className.topFixed.slice(1));
        if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
        if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
      } else {
        $this.removeData('top');
        if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
        $topEl.removeCss('top');
        $this.removeClass(ui.className.topFixed.slice(1));
      }
    });
  },
  header: function () {
    const $page = $(ui.className.mainWrap);
    if (!$page.length) return;
    $page.each(function () {
      if (!$(this).is(':visible')) return;
      const $head = $(this).find(ui.className.header);
      const $body = $(this).find(ui.className.body);
      if ($head.length && $body.length && $head.css('position') === 'fixed') {
        $body.css('padding-top', $head.outerHeight());
      }
      const $titleEl = $head.find(ui.className.title);
      if (!$titleEl.length) return;
      if ($head.closest(ui.className.wrap).find('.' + ui.Common.scrollShowTitleClass).length) $titleEl.addClass('scl-title-hide');

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
  bottomSpaceAppend: function () {
    const $wrap = $(ui.className.wrap);
    if (!$wrap.length) return;
    $wrap.each(function () {
      if (!$(this).find(ui.className.bottomFixedSpace).length) {
        $(this).append('<div class="' + ui.className.bottomFixedSpace.slice(1) + '" aria-hidden="true"></div>');
      }
    });
  },
  bottomSpace: function () {
    const $wrap = $(ui.className.wrap);
    if (!$wrap.length) return;
    $wrap.each(function () {
      const $space = $(this).find(ui.className.bottomFixedSpace);
      if (!$space.length) return;
      const $spaceArryHeight = [];
      $(this)
        .find(ui.className.bottomFixed)
        .not('.none-space')
        .each(function () {
          const $this = $(this);
          const $height = $this.children().outerHeight();
          if (!$this.hasClass('fixed-none')) $spaceArryHeight.push($height);
          if ($this.hasClass('is-restore')) $this.css('height', $height);
        });

      const $maxHeight = $spaceArryHeight.length ? Math.max.apply(null, $spaceArryHeight) : 0;
      $space.css('height', $maxHeight);
      const $floatingBtn = $(this).find(ui.className.floatingBtn);
      if ($floatingBtn.length) $floatingBtn.css('bottom', $maxHeight === 0 ? 24 : $maxHeight + 10);
    });
  },
  bottomSpaceRepeat: function () {
    let i = 0;
    const repeatEvt = function () {
      if (i < 10) {
        ui.Common.bottomSpace();
        setTimeout(repeatEvt, 100);
      }
      i += 1;
    };
    repeatEvt();
  },
  landscape: function () {
    //가로모드 막기
    if (ui.Mobile.any()) {
      const _landscapeDiv = '.landscape-lock';
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
  lastSclTop: $(window).scrollTop(),
  scrollEvt: function () {
    const $SclTop = $(window).scrollTop();
    const $wrap = $(ui.className.mainWrap + ':visible');
    const $header = $wrap.find(ui.className.header);
    const $headerH = $header.outerHeight();
    const $spaceH = $wrap.find(ui.className.bottomFixedSpace).outerHeight();
    const $btnTop = $wrap.find(ui.className.btnTop);
    const $bottom = parseInt($btnTop.parent().css('bottom'));
    const $margin = 24;
    const $Height = window.innerHeight;
    const $scrollHeight = $('body').get(0).scrollHeight;
    if ($spaceH > 0 && $spaceH != $bottom - $margin) {
      $wrap.find(ui.className.floatingBtn).css('bottom', $spaceH === 0 ? $margin : $spaceH + 10);
    }

    if ($SclTop > ui.BtnTop.min && ui.Common.lastSclTop !== $SclTop) {
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

    const $btnFixed = $wrap.find('.btn-wrap' + ui.className.bottomFixed);
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
      ui.Common.lastSclTop = $SclTop;
    }, 50);
  },
  scrollEndEvt: function () {
    const $SclTop = $(window).scrollTop();
    if ($SclTop > ui.BtnTop.min) {
      const btn = $(ui.className.mainWrap + ':visible ' + ui.className.btnTop);
      ui.BtnTop.off(btn);
    }
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
      const $url = ui.basePath() + '/js/lib/lottie.5.7.13.min.js';
      ui.Util.loadScript($url, $lottieInit);
    } else {
      $lottieInit();
    }
  },
  UI: function () {
    $(document).on('click', '#container', function (e) {
      if (!$('html').hasClass(ui.className.lock.slice(1))) $(window).scroll();
    });

    // 수정 필요
    let isFirst = false;
    let isScrollIng = false;
    let startY = 0;
    let prevY = null;
    let scrollDirection = null;
    let prevMove = 0;
    let lastMove = 0;

    $(window).on('scroll', function () {
      if (!isFirst) {
        startY = window.scrollY;
        isFirst = true;
        return;
      }
      let currentY = window.scrollY;
      let distanceY = currentY - startY;
      if (prevY !== null) {
        const deltaY = currentY - prevY;
        if (deltaY > 0 && Math.abs(distanceY) > 3 && scrollDirection !== 'down') {
          scrollDirection = 'down';
          startY = currentY;
        } else if (deltaY < 0 && Math.abs(distanceY) > 3 && scrollDirection !== 'up') {
          scrollDirection = 'up';
          startY = currentY;
        }
      }
      const $fixedHead = $(ui.className.mainWrap + ':visible ' + ui.className.header + '.ty-fixed');
      if ($fixedHead.length) {
        const headerHeight = $fixedHead.outerHeight();
        const min = -headerHeight;
        const max = 0;
        let move = Math.min(max, Math.max(min, distanceY > 0 ? -distanceY : -(distanceY + headerHeight)));
        if (window.scrollY <= 3) {
          $fixedHead.removeCss('transition').css('transform', `translateY(${move}px)`);
        } else {
          if (prevMove !== move) $fixedHead.css({ transform: `translateY(${move}px)`, transition: 'none' });
        }
        prevMove = move;
      }
      prevY = currentY;
    });

    $(document).on('touchstart', function () {
      const $fixedHead = $(ui.className.mainWrap + ':visible ' + ui.className.header + '.ty-fixed');
      if ($fixedHead.length) {
        isScrollIng = true;
      }
    });
    $(document).on('touchend', function () {
      if (isScrollIng) {
        isScrollIng = false;
        fixedEnd();
      }
    });

    function fixedEnd() {
      const $fixedHead = $(ui.className.mainWrap + ':visible ' + ui.className.header + '.ty-fixed');
      if (isScrollIng || !$fixedHead.length) return;
      const headerHeight = $fixedHead.outerHeight();
      let move;
      if (Math.abs(prevMove) > headerHeight / 2) {
        move = -headerHeight;
      } else {
        move = 0;
      }
      $fixedHead.removeCss('transition');
      if (prevMove !== move) $fixedHead.css('transform', `translateY(${move}px)`);
      prevMove = move;
      lastMove = move;
    }

    $(window).on(
      'scroll',
      _.debounce(function () {
        startY = window.scrollY;
        fixedEnd();
        prevY = null;
        scrollDirection = null;
        isFirst = false;
      }, 1000)
    );
  }
};
ui.Util = {
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
    const $url = ui.basePath() + '/js/lib/paint.min.js';
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
    };
  },
  iframe: function () {
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
ui.Etc = {
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
  init: function () {
    ui.BtnTop.append();
    ui.BtnTop.UI();
  },
  label: '컨텐츠 상단으로 이동',
  text: 'TOP',
  min: 100,
  onClass: 'on',
  hoverClass: 'hover',
  scrollSpeed: 300,
  append: function () {
    const $wrap = $(ui.className.wrap);
    if (!$wrap.length) return;
    $wrap.each(function () {
      if ($(this).find(ui.className.btnTop).length || $(this).find(ui.className.body).hasClass('not-top-btn')) return;
      let btnHtml = '<a href="#" class="button not ' + ui.className.btnTop.slice(1) + '" title="' + ui.BtnTop.label + '" role="button" aria-label="' + ui.BtnTop.label + '">' + ui.BtnTop.text + '</a>';
      if ($(this).find(ui.className.floatingBtn).length) {
        $(this).find(ui.className.floatingBtn).append(btnHtml);
      } else {
        btnHtml = '<div class="' + ui.className.floatingBtn.slice(1) + '">' + btnHtml + '</div>';
        $(this).append(btnHtml);
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
      .on('click', ui.className.btnTop, function (e) {
        e.preventDefault();
        const $page = $(this).closest(ui.className.wrap);
        if ($page.closest(ui.className.popup).length) {
          const $body = $page.find(ui.className.body);
          ui.Scroll.wrapTop($body, 0, ui.BtnTop.scrollSpeed);
        } else {
          ui.Scroll.top(0, ui.BtnTop.scrollSpeed);
          $page.find($focusableEl).first().focus();
        }
      })
      .on('mouseenter', ui.className.btnTop, function () {
        $(this).addClass(ui.BtnTop.hoverclass);
      })
      .on('mouseleave', ui.className.btnTop, function () {
        $(this).removeClass(ui.BtnTop.hoverClass);
      });
  }
};

/** button **/
ui.Button = {
  LoadInit: function () {
    //링크없는 a태그 role=button 추가
    $('a').each(function (e) {
      const $href = $(this).attr('href');
      const $role = $(this).attr('role');
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
      }
    });

    //type없는 button들 type 추가
    $('button').each(function (e) {
      const $type = $(this).attr('type');
      if ($type == undefined) $(this).attr('type', 'button');
    });
  },
  default: function () {
    //href가 #시작할때 a태그 클릭 시 기본속성 죽이기
    $(document).on('click', 'a', function (e) {
      const $href = $(this).attr('href');
      if (!$(this).hasClass('no-button') && $href != undefined) {
        //기본속성 살리는 클래스(스킵네비 등)
        if ($href.startsWith('#')) {
          e.preventDefault();
        }
      }

      // 앱에서 새창열기
      /*
      const $target = $(this).attr('target');
      if (ui.Device.app()) {
        if ($target === '_blank' && typeof webviewInterface === 'object' && typeof webviewInterface.goOutLink === 'function') {
          e.preventDefault();
          webviewInterface.goOutLink($href);
        }
      }
      */
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
  reInit: function () {
    ui.Button.LoadInit();
    ui.Button.disabled();
  },
  init: function () {
    ui.Button.default();
    ui.Button.disabledChk();
    ui.Button.reset();
    ui.Button.effect();
    ui.Button.star();
    ui.Button.imgBox();
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
// touch UI
ui.Touch = {
  wrapClass: '.ui-touch-rotate',
  itemsClass: '.rotate-items',
  itemClass: '.rotate-item',
  rotateItem: function () {
    if (!$(ui.Touch.wrapClass + ' ' + ui.Touch.itemClass).length) return;
    const $wrap = $(ui.Touch.wrapClass + ' ' + ui.Touch.itemClass);
    const $items = $wrap.find(ui.Touch.itemClass);
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
      const $items = element.querySelectorAll(ui.Touch.itemClass);
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
    const $bottomInp = $('.pop-foot, ' + ui.className.bottomFixed).find('input, textarea');
    $(document).on('touchstart', function (e) {
      const $target = $(e.target);
      if ($target.closest('.pop-foot').length || $target.closest(ui.className.bottomFixed).length) {
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
        if ($target.closest(ui.className.bottomFixed).length) $closest = $target.closest(ui.className.bottomFixed).children();
        if (!$closest) return;
        const $closestTop = $target.closest(ui.className.popup).length ? $closest.offset().top : $closest.offset().top - $(window).scrollTop();
        if ($closestTop > $clientY || $(window).height() < $clientY) {
          $($isFocusEl).blur();
          $reset();
        }
      }
    });
  },
  init: function () {
    if ($(ui.Touch.wrapClass).length) {
      ui.Touch.rotateItem();
      document.querySelectorAll(ui.Touch.wrapClass + ' ' + ui.Touch.itemClass).forEach(ui.Touch.rotate);
    }

    ui.Touch.focus();
  }
};

/** form **/
ui.Form = {
  winLoad: function () {
    //select off효과
    $('select').each(function () {
      const $val = $(this).val();
      if ($val == '' || $val == null) {
        $(this).addClass('off');
      }
    });

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
        const $bottomGap = isPop ? $wrap.find('.' + Layer.footClass).outerHeight() : $(ui.className.bottomFixedSpace).outerHeight();
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

      //app focus scroll: 안드로이드
      // $appFocusElScroll(this);
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
