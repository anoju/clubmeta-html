$(function () {
  mockup.init();
  if ($('#wrap').hasClass('main')) {
    setTimeout(function () {
      mockup.main.home();
    }, 100);
  }
});

mockup = {
  header: function () {
    $('button.head-back').click(function () {
      history.back();
    });
  },
  setPinDot: function () {
    const $password = $('.dot-password');
    $password.each(function () {
      const $this = $(this);
      const $input = $this.find('input');
      const $maxlength = parseInt($input.attr('maxlength'));
      const $dot = $this.find('.dot');
      const $dotlength = $this.find('.dot').length;
      if ($dotlength < $maxlength) {
        const $add = $maxlength - $dotlength;
        let $html = '';
        for (let i = 1; i <= $add; i += 1) {
          $html += '<i class="dot"></i>';
        }
        $this.append($html);
      } else if ($dotlength > $maxlength) {
        const $lastIdx = $dotlength - $maxlength - 1;
        $dot.eq($lastIdx).nextAll().remove();
      }
    });
  },
  pinInput: function () {
    $('.dot-password input').on('input', function () {
      const $this = $(this);
      const $val = $this.val();
      const $wrap = $this.closest('.dot-password');
      const $dot = $wrap.find('.dot');
      if ($val.length) {
        const $on = $dot.eq($val.length - 1);
        $on.addClass('on').prevAll().addClass('on');
        $on.nextAll().removeClass('on');
      } else {
        $dot.removeClass('on');
      }
    });
  },
  floatbar: function () {
    $('.main .floating-menu-bar a').click(function () {
      const $this = $(this);
      if ($this.hasClass('on')) return;
      //lottie
      const $oldOn = $('.floating-menu-bar .on');
      const $oldLottieEl = $oldOn.find('.lottie');
      if ($oldLottieEl.length) {
        const $oldLottie = $oldLottieEl.data('lottie-opt');
        // $oldLottie.goToAndPlay(35, true);
        // $oldLottie.goToAndStop(0, true);
        $oldLottie.playSegments([35, 70], true);
      }

      $(this).addClass('on').siblings().removeClass('on');
      const $newOn = $(this);
      const $newLottieEl = $newOn.find('.lottie');
      if ($newLottieEl.length) {
        const $newLottie = $newLottieEl.data('lottie-opt');
        $newLottie.playSegments([0, 35], true);
      }

      //contents
      const $idx = $this.index();
      const $headTit = $('#header h1');
      const $headBtn = $('.head-right .button');
      const $include = $('._include');

      const $src = './include/main-' + ($idx + 1) + '.html';
      $include.attr('data-include-html', $src).data('include-html', $src);
      ui.Html.include(function () {
        ui.reInit();

        mockup.main.reset();
        switch ($idx) {
          case 0:
            $headTit.text('홈');
            mockup.main.home();
            break;
          case 1:
            $headTit.text('매치');
            mockup.main.match();
            break;
          case 2:
            $headTit.text('투자');
            mockup.main.invest();
            break;
          case 3:
            $headTit.text('마이');
            mockup.main.my();
            break;
          case 4:
            $headTit.text('더보기');
            break;
          default:
            break;
        }

        if ($idx === 1) $headTit.append('<button class="button icon pd-5" aria-label="매치 서비스 안내 보기 팝업"><i class="i-ico-header-info"></i></button>');
        else $headTit.find('.button').remove();

        if ($idx === 4) $headBtn.last().removeClass('hide').siblings('.button').addClass('hide');
        else $headBtn.first().removeClass('hide').siblings('.button').addClass('hide');
      });
    });
  },
  init: function () {
    mockup.header();
    mockup.setPinDot();
    mockup.pinInput();
    mockup.floatbar();
  }
};

mockup.main = {
  reset: function () {
    $('#wrap').removeClass('main-bg');
    $('#header').removeClass('main-bg');
    $('#header h1').removeClass('head-logo').removeAttr('aria-label');
  },
  home: function () {
    $('#wrap').addClass('main-bg');
    $('#header').addClass('main-bg');
    $('#header h1').addClass('head-logo').aria('label', '홈');

    moneySwitch();
    function moneySwitch() {
      $('.hide-switch').change(function () {
        const $this = $(this);
        const $target = $this.closest('.title-bar').siblings('.my-expense');
        if ($this.prop('checked')) {
          $target.addClass('hidden');
        } else {
          $target.removeClass('hidden');
        }
      });
    }
    setTimeout(function () {
      $('.home-tip').slideDown(300);
    }, 1000);
    $('.home-tip .close').click(function () {
      $('.home-tip').slideUp(300);
    });

    //차트
    const $chartData = [2000000, 1800000, 3500000, 2000000, 4300000, 5500000, 6500000, 6800000, 6400000, 6200000, 8000000, 6000000];
    const $max = Math.max.apply(null, $chartData);
    Highcharts.chart('chart1', {
      chart: {
        type: 'areaspline',
        backgroundColor: 'rgba(255,255,255,0)',
        spacing: [10, 0, 0, 0]
      },
      title: false,
      legend: false,
      xAxis: {
        labels: {
          style: {
            color: '#B0B0B0'
          }
        },
        lineColor: 'rgba(0, 0, 0, 0.05)',
        gridLineColor: 'rgba(255, 255, 255, 0.35)',
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      },
      yAxis: {
        max: $max,
        labels: {
          style: {
            color: '#B0B0B0'
          },
          x: -6
        },
        lineColor: 'rgba(255, 255, 255, 0.35)',
        gridLineColor: 'rgba(255, 255, 255, 0.35)',
        gridLineDashStyle: 'Dot',
        tickAmount: 5,
        title: false
      },
      tooltip: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          lineColor: '#2AD6A8',
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              enabled: false
            },
            select: {
              enabled: false
            }
          },
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              },
              select: {
                enabled: false
              }
            }
          },
          fillOpacity: 1,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.color('#2AD6A8').setOpacity(0.6).get('rgba')],
              [1, Highcharts.color('#2AD6A8').setOpacity(0).get('rgba')]
            ]
          }
        }
      },
      series: [
        {
          data: $chartData
        }
      ]
    });
  },
  match: function () {
    let $visual = $('.match-main-visual:visible');
    let $visualTop = 0;
    if ($visual.length) {
      $visualTop = $('#header').length ? $('#header').outerHeight() : 0;
      $visual.css('top', $visualTop);
    }
    const scrollEvt = function () {
      $visual = $('.match-main-visual:visible');
      const $sclTop = $(window).scrollTop();
      if (!$visual.length) {
        return;
      } else {
        $visualTop = $visual.offset().top - $sclTop;
      }
      const $visualImg = $visual.find('.img');
      const $section = $visual.siblings('.section:visible');
      const $sectionTop = $section.offset().top;
      let $sectionRound = $section.data('radius');
      if (!$sectionRound) {
        $sectionRound = parseInt($section.css('border-top-left-radius'));
        $section.data('radius', $sectionRound);
      }
      if ($sclTop === 0) {
        $section.removeAttr('style');
        $visualImg.removeAttr('style');
        $visual.children('div').removeAttr('style');
      } else if ($sclTop < $sectionTop + 20) {
        const $ratio = Math.max(0, Math.min(1, $sclTop / ($sectionTop - $visualTop)));
        $section.css({
          'border-top-left-radius': $sectionRound * (1 - $ratio),
          'border-top-right-radius': $sectionRound * (1 - $ratio)
        });
        // $visualImg.css('transform', 'scale(' + (1 + $ratio / 2) + ')');
        $visualImg.css('top', ($sclTop / 3) * -1);
        // const $opacity = (1 - $ratio) * 0.8 + 0.2;
        const $opacity = 1 - $ratio;
        $visual.children('div').css('opacity', $opacity);
      }
    };
    scrollEvt();
    $(window).scroll(function () {
      scrollEvt();
    });
    $('.user.refresh').on('click', function () {
      const $swiper = $(this).closest('.ui-swiper').data('swiper');
      console.log($swiper);
      $swiper.slideTo(0);
    });
  },
  invest: function () {
    const $visual = $('.invest-banner-wrap');
    if (!$visual.length) return;
    const $img = $visual.find('.img-box');
    if (!$img.length) return;
    const $headerH = $('#header').length ? $('#header').outerHeight() : 0;

    const scrollEvt = function () {
      const $sclTop = $(window).scrollTop() + $headerH;
      const $visualTop = $visual.offset().top;
      const $visualH = $visual.outerHeight();
      const $visualBottom = $visualTop + $visualH;
      if ($visualTop - 10 <= $sclTop && $sclTop <= $visualBottom + 10) {
        const $ratio = Math.max(0, Math.min(1, ($sclTop - $visualTop) / $visualH));
        const $opacity = (1 - $ratio) * 0.8 + 0.2;

        $img.css({
          top: ($sclTop - $visualTop) / 2,
          opacity: $opacity,
          transform: 'scale(' + (1 + $ratio / 3) + ')'
        });
      } else if ($visualTop - 10 > $sclTop) {
        $img.removeAttr('style');
      }
    };
    scrollEvt();

    $(window).scroll(function () {
      scrollEvt();
    });

    /******** youtube ********/
    const $list = [
      {
        id: 'sqgxcCjD04s',
        title: 'strawberry moon 동영상타이틀입니다.동영상타이틀입니다.동영상타이틀입니다.동영상타이틀입니다.동영상타이틀입니다.동영상타이틀입니다.',
        state: '컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태컨텐츠상태',
        tag: 'IU(아이유)'
      },
      // {
      //   id: '0-q1KafFCLU',
      //   title: 'Celebrity',
      //   state: '뮤직비디오',
      //   tag: 'IU(아이유)'
      // },
      // {
      //   id: '86BST8NIpNM',
      //   title: 'Coin',
      //   state: '뮤직비디오',
      //   tag: 'IU(아이유)'
      // },
      {
        id: 'v7bnOxV4jAc',
        title: 'LILAC(라일락)',
        state: '뮤직비디오',
        tag: 'IU(아이유)'
      },
      // {
      //   id: 'D1PvIWdJ8xo',
      //   title: 'Blueming(블루밍)',
      //   state: '뮤직비디오',
      //   tag: 'IU(아이유)'
      // },
      {
        id: 'https://www.youtube.com/watch?v=Hbb5GPxXF1w',
        title: 'SNEAKERS',
        state: '뮤직비디오',
        tag: 'ITZY(있지)'
      },
      {
        id: 'https://youtu.be/8AMBslo1zng',
        title: 'LOVE DIVE',
        state: '뮤직비디오',
        tag: 'IVE(아이브)'
      },
      {
        id: 'vePPhG9zy38',
        title: '아쿠아플라넷 제주 메인수조',
        state: '라이브캠',
        tag: '아쿠아플라넷 제주'
      }
    ];

    const $youtube_list = $('._youtube-list');
    makeYoutubeList($list);

    function makeYoutubeList(ary) {
      let $html = '';
      if (ary.length < 1) {
        $youtube_list.parent().hide();
        return;
      }
      $.each(ary, function () {
        let $id = this.id;
        if ($id.indexOf('?v=') > 0) {
          $id = this.id.split('?v=')[1];
          $id = $id.substring(0, 11);
        } else if ($id.indexOf('youtu.be/') > 0) {
          $id = this.id.split('youtu.be/')[1];
          $id = $id.substring(0, 11);
        }
        $html += '<li data-youtube="' + $id + '">';
        $html += '  <a href="#" class="item btn-click folding-btn" role="button">';
        $html += '   <p class="img-box">';
        $html += '     <img src="https://i.ytimg.com/vi/' + $id + '/sddefault.jpg" alt="" />';
        // if (this.time) $html += '     <span class="invest-info"><span>' + this.time + '</span></span>';
        $html += '     <span class="invest-info"><span></span></span>';
        $html += '   </p>';
        $html += '   <div class="invest-txt-box">';
        if (this.state) $html += '     <span class="invest-state2">' + this.state + '</span>';
        $html += '     <p class="tit">' + this.title + '</p>';
        if (this.tag) $html += '     <span class="invest-info"><span>' + this.tag + '</span></span>';
        $html += '   </div>';
        $html += '  </a>';
        $html += '</li>';
      });
      $youtube_list.find('>ul').html($html);
      youtubeSet();
    }
  },
  my: function () {
    unclassified();
    moneySwitch();
    dounutChart();

    function unclassified() {
      let before = [];

      window.addEventListener('scroll', (ev) => {
        if (before.pop() < window.scrollY) {
          $('.unclassified-info').addClass('show');
        } else {
          $('.unclassified-info').removeClass('show');
        }
        before.push(window.scrollY);
      });
    }

    function moneySwitch() {
      $('.hide-switch').change(function () {
        const $this = $(this);
        const $target = $this.closest('.title-bar').siblings('.my-expense');
        if ($this.prop('checked')) {
          $target.addClass('hidden');
        } else {
          $target.removeClass('hidden');
        }
      });
    }

    function dounutChart() {
      Highcharts.setOptions({
        colors: ['#F66FA0', '#FBC846', '#B1E6F6']
      });
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'dounutChart',
          type: 'pie',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0],
          height: 134,
          style: {
            color: '#424242',
            fontFamily: 'Noto Sans KR',
            fontWeight: '400',
            fontSize: '12'
          },
          backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        credits: { enabled: false }, //highchart 워터마크 숨김처리
        title: {
          text: ''
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemMarginTop: 4,
          itemMarginBottom: 4,
          useHTML: true,
          labelFormatter: function () {
            return '<span class="fw-normal">' + this.name + ' <span class="fc-979797 ff-roboto">(' + this.y + '%)</span></span>';
          }
        },
        tooltip: {
          headerFormat: '<div>',
          pointFormat: '<span class="mr-5 ff-roboto">{point.month}</span><span class="mr-3 ff-roboto">{point.money}</span>원<span class="ml-3">(<span class="ff-roboto">{point.count}</span>건)</span>',
          footerFormat: '</div>',
          backgroundColor: 'rgba(33, 33, 33, 0.8)',
          borderWidth: 0,
          borderRadius: 8,
          shadow: false,
          padding: 16,
          style: {
            color: '#fff',
            fontSize: '12px'
          },
          shared: true,
          useHTML: true
        },
        plotOptions: {
          pie: {
            //도넛(파이)차트 전체 옵션 지정.
            dataLabels: {
              enabled: true
            },
            slicedOffset: 0,
            center: [67, 67],
            showInLegend: true,
            states: {
              hover: {
                brightness: 0,
                halo: {
                  size: 0
                }
              }
            },
            point: {
              events: {
                legendItemClick: function () {
                  return false;
                }
              }
            }
          },
          series: {
            events: {
              legendItemClick: function () {
                return false;
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            innerSize: '50%',
            data: [
              {
                name: '엄빠용돈',
                y: 50,
                month: '12월',
                money: '9,800',
                count: '130'
              },
              {
                name: '문화생활',
                y: 35,
                month: '12월',
                money: '800',
                count: '10'
              },
              {
                name: '주문·배달',
                y: 15,
                month: '12월',
                money: '9,000',
                count: '30'
              }
            ],
            dataLabels: {
              enabled: false
            }
          }
        ]
      });
    }
  }
};

youtubeInsert();
function youtubeInsert() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $(document).on('click', 'a, button', function () {
    youtubeStop();
  });
}

// 유튜브 재생정지
function youtubeStop() {
  const $youtube_li = $('._youtube-list').find('li');
  if ($youtube_li.length < 1) return;
  $youtube_li.each(function () {
    const $this = $(this);
    const $player = $this.data('player');
    if (!!$player && typeof $player.stopVideo === 'function') $player.stopVideo();
  });
}

function youtubeSet() {
  const $youtube_li = $('._youtube-list').find('li');
  if ($youtube_li.length < 1) return;
  $youtube_li.each(function (i) {
    const $this = $(this);
    const $playerId = 'player' + i;
    const $html = '<div class="folding-panel"><div class="youtube-box"><div id="' + $playerId + '"></div></div></div>';
    $this.append($html);
    const $videoId = $this.data('youtube');
    const $player = new YT.Player($playerId, {
      videoId: $videoId,
      playerVars: {
        // autoplay: 1,
        // controls: 0,
        modestbranding: 1,
        enablejsapi: 1,
        showinfo: 0,
        rel: 0,
        // fs: 0,
        playsinline: 1
      },
      events: {
        onReady: onPlayerReady
      }
    });
    $this.data('player', $player);

    function onPlayerReady(event) {
      // console.log(event.target);
      // 유튜브 플레이시간 구해오기
      const $duration = event.target.getDuration();
      let $tiemStr = '';
      if ($duration === 0) {
        $tiemStr = '실시간';
      } else {
        const $time = $duration - 1; // 실제 유튜브전체시간과 1초 오차로 -1
        const $hour = Math.floor($time / 3600);
        let $min = Math.floor(($time % 3600) / 60);
        let $sec = $time % 60;
        if ($sec < 10) $sec = '0' + $sec;
        if ($hour !== 0) {
          if ($min < 10) $min = '0' + $min;
          $tiemStr = $hour + ':' + $min + ':' + $sec;
        } else if ($min !== 0) {
          $tiemStr = $min + ':' + $sec;
        } else {
          $tiemStr = '0:' + $sec;
        }
      }
      const $TimeSpan = $this.find('.img-box .invest-info > span');
      const $TimeTxt = $TimeSpan.text();
      if ($TimeTxt !== $tiemStr) $TimeSpan.text($tiemStr);
    }
  });

  // 아코디언기능
  ui.Folding.list('._youtube-list', '.folding-btn', '.folding-panel');
}
