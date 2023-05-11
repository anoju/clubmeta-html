/**
 *
 */
/**
 * serializeObject
 */
(function ($) {
  'use strict';
  $.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
})(jQuery);

/**
 * visible 처리
 */
jQuery.fn.visible = function () {
  return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
  return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function () {
  return this.css('visibility', function (i, visibility) {
    return visibility == 'visible' ? 'hidden' : 'visible';
  });
};

var duration = 300;

/**
 * 앱에서 호출하는 function
 */
function onMessage(serviceId, param1, param2) {
  if (serviceId == 'snsLoginSuccess') {
    console.log('SNS LOGIN SUCCESS');
    console.log('snsType ', param1);
    var userInfo = JSON.parse(param2);
    console.log('uniqueId', userInfo.uniqueId);
    if (typeof fn_afterSnsAppLogin == 'function') {
      var data = { user_id: userInfo.uniqueId };
      fn_afterSnsAppLogin(JSON.stringify(data));
    }
  } else if (serviceId == 'InAppPaymentSuccess') {
    console.log('IN APP PAYMENT SUCCESS');
    console.log('point ', param1);
    console.log('paymentAmt ', param2);
  } else if (serviceId == 'backPressed') {
    fn_back();
  }
}

/**
 * 앱으로 요청 하는 function
 */
// 테스트용
// var appAccessToken = "";
// var appRefreshToken = "";
function reqToApp(serviceId, params) {
  var dfd = $.Deferred();

  if (params != null) {
    console.log(params);
  }
  try {
    //	실제로 적용할 코드
    if (serviceId == 'GetAccessToken') {
      var result = AndroidBridge.GetAccessToken();
      dfd.resolve(result);
    } else if (serviceId == 'GetRefreshToken') {
      var result = AndroidBridge.GetRefreshToken();
      dfd.resolve(result);
    } else {
      AndroidBridge.onMessage(serviceId, params);
      dfd.resolve();
    }
    return dfd.promise();
  } catch (e) {
    console.log('앱이 아님 ', serviceId);
    // 일단 앱이 없으므로 임의의 코드를 적용
    switch (serviceId) {
      case 'SNSLogin':
        var paramObj = JSON.parse(params);
        var result = {};
        if (paramObj.snsType == 'NV') {
          alert('네이버 로그인');
          result.uniqueId = '11111111111111111';
          //					result.email = "aaaa@naver.com";
          //					result.name = "김네이버";
          dfd.resolve(JSON.stringify(result));
        } else if (paramObj.snsType == 'KK') {
          alert('카카오 로그인');
          result.uniqueId = '2222222222';
          //					result.email = "bbbbb@daum.net";
          //					result.name = "이카카오";
          dfd.resolve(JSON.stringify(result));
        } else if (paramObj.snsType == 'GG') {
          alert('구글 로그인');
          result.uniqueId = '3333333333';
          //					result.email = "cccccc@googld.eom";
          //					result.name = "박구글";
          dfd.resolve(JSON.stringify(result));
        }
        onMessage('snsLoginSuccess', paramObj.snsType, JSON.stringify(result));
        break;
      case 'GetAccessToken':
        //			return appAccessToken;
        tempsend('/api/temp/getAccessToken', 'GET', null, null, false).done(function (result) {
          //				return result.data;
          dfd.resolve(result.data);
        });
        break;
      case 'GetRefreshToken':
        //			return appRefreshToken;
        tempsend('/api/temp/getRefreshToken', 'GET', null, null, false).done(function (result) {
          //				return result.data;
          dfd.resolve(result.data);
        });
        break;
      case 'RegisterTokens':
        //			var paramObj = JSON.parse(params);
        //			appAccessToken = paramObj.accessToken;
        //			appRefreshToken = paramObj.refreshToken;

        var paramObj = JSON.parse(params);
        tempsend('/api/temp/setTokens', 'GET', 'accessToken=' + paramObj.accessToken + '&refreshToken=' + paramObj.refreshToken, null, false);
        break;
      case 'OpenPopupURL':
        var paramObj = JSON.parse(params);
        window.open(paramObj.url, paramObj.name, paramObj.mode);
        break;
      case 'ClosePopupUrl':
        alert('closePopup');
        this.close();
        break;
      case 'PlayVideo':
        var paramObj = JSON.parse(params);
        console.log(params);
        alert('영상 재생 - videoNo : ' + paramObj.videoNo);
        break;
      case 'SendVideoInfo':
        alert('send video info');
        var result = {};
        result.code = 'SUCCESS';
        result.msg = '';
        dfd.resolve(JSON.stringify(result));
        break;
      case 'OpenInAppPurchase':
        var paramObj = JSON.parse(params);
        onMessage('InAppPaymentSuccess', params.point, params.paymentAmt);
        break;
      case 'SnedMusic':
        var paramObj = JSON.parse(params);
        alert('send music ' + paramObj.musicId);
        break;
      case 'VoteSuccessClose':
        alert('Vote Success closePopup');
        this.close();

        break;
      case 'ReadProfileOf':
        var paramObj = JSON.parse(params);
        var url = '../user/profile.html?memberNo=' + paramObj.memberNo;
        getPageAjax(url).done(function (result) {
          var newDoc = document.open('text/html', 'replace');
          newDoc.write(result);
          newDoc.close();
        });

        break;
      case 'RequestLogin':
        $('#login_layer').remove();
        getPageAjax('../login/login_layer.html', null).done(function (result) {
          $('body').append(result);
          //					$("#login_layer").animate({bottom:"0"}, duration * 1);
        });

        break;
      case 'RequestVideoAnalyUrl':
        var result = {};
        result.result = true;
        dfd.resolve(JSON.stringify(result));
        break;
      case 'OpenPopupBackURL':
        var paramObj = JSON.parse(params);
        window.open(paramObj.url, paramObj.name, paramObj.mode);
        break;

      default:
      // nothing to do....
    }
    return dfd.promise();
  }
}

// 임시 - 전송
function tempsend(url, type, param, body, isFile) {
  var dfd = $.Deferred();
  var data = type == 'post' ? body : param;

  $.ajax({
    type: type,
    url: url,
    contentType: isFile ? false : 'application/json; charset=utf8',
    processData: false, // file전송을 위한 부분. file이외에는 없어도 됨.
    data: data,
    traditional: true
  })
    .done(function (result, textStatus, jqXHR) {
      if (result.respCode == 'SUCCESS') {
        dfd.resolve(result);
      } else {
        dfd.reject(result);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // 서버에서 Exception 처리를 하고 있기 때문에
      // 오류가 나더라도 result.respCode가 ERROR로 설정 되어 done으로 처리 될듯...
      dfd.reject();
    })
    .always(function (result, textStatus, jqXHR) {
      // 항상 실행할 코드
    });
  return dfd.promise();
}

// AJAX로 페이지 조회
function getPageAjax(url, param) {
  var dfd = $.Deferred();

  $.ajax({
    type: 'get',
    url: url,
    data: param
  })
    .done(function (result, textStatus, jqXHR) {
      dfd.resolve(result, textStatus);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      dfd.reject();
    })
    .always(function (result, textStatus, jqXHR) {
      // 항상 실행할 코드
      //		console.log(result);	// 테스트 코드
    });

  return dfd.promise();
}

// 로그인 화면 열기
function openLoginPage(duration) {
  if (isNaN(parseInt(duration))) {
    duration = 300;
  }

  // 앱 호출하여 로그인 새창 띄우기
  reqToApp('RequestLogin');

  /*
	$("#login_layer").remove();

	getPageAjax("/login/login_layer", null)
	.done(function(result) {
		$("body").append(result);
		$("#login_layer").animate({bottom:"0"}, duration * 1);
//		$('body').css('overflow','hidden');
//		var x=window.scrollX, y=window.scrollY;
//		window.onscroll=function(){window.scrollTo(x, y)};
	});
*/
}

// 로그인 화면 닫기
// 로그인 레이어 닫은 뒤에 처리할 내용이 있다면 afterCloseLoginPage() 구현해서 처리
function closeLoginPage() {
  reqToApp('ClosePopupUrl');
  // 로그인창 닫을때는 webview 닫기.
  /*
	$("#div_loginForm").remove();
	$("#div_findPwForm").remove();
	$("#div_dormantMemberForm").remove();
	$("#div_joinForm").remove();
	$("#join_layer").remove();
	$("#login_layer").animate({bottom:"-100%"}, 300, function() {
		// animation 완료 후
		$(this).remove();
		

//		if($(".popup:visible").length == 0) {
//			// 다른 팝업이 없으면 원래대로
//			$('body').css('overflow','');
//			window.onscroll=function(){};
//		}


		if(typeof afterCloseLoginPage == "function") {
			afterCloseLoginPage();
		}
		
		//글로벌검색용
		if(typeof globalSearchCloseLoginPage == "function") {
			globalSearchCloseLoginPage();
		}
	});
*/
}

// input text clear
var clearInput = function (obj) {
  obj.parentNode.querySelector('.clear').value = '';
  obj.parentNode.querySelector('.clear').focus();
  obj.parentNode.querySelector('.clear').dispatchEvent(new Event('input'));
};

// 전화번호 형태로 반환
function fn_getTelVal(val) {
  try {
    return val
      .replace(/[^0-9]/g, '')
      .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3')
      .replace('--', '-');
  } catch (e) {
    return val;
  }
}
// 휴대폰 형태로 반환
function fn_getHpVal(val) {
  try {
    return val
      .replace(/[^0-9]/g, '')
      .replace(/(^01[0-9])([0-9]*)([0-9]{4})/, '$1-$2-$3')
      .replace('--', '-');
  } catch (e) {
    return val;
  }
}
// 숫자만 반환
function fn_getOnlyNumber(val) {
  try {
    return val.replace(/[^0-9]/g, '');
  } catch (e) {
    return val;
  }
}
// 숫자에 콤마 찍기
function fn_getCommaNumber(val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 입력 형식 체크
function fn_checkValid(type, checkValue) {
  switch (type) {
    case 'number':
      var pattern = /^[0-9]$/i;
      return pattern.test(checkValue);
    case 'email':
      var pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return pattern.test(checkValue);
    case 'tel':
      var pattern = /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})-([0-9]{3,4})-([0-9]{4})/;
      return pattern.test(checkValue);
    case 'hp':
      var pattern = /(^01[0-9]-([0-9]{3,4})-([0-9]{4}))/;
      return pattern.test(checkValue);
    default:
      return false;
  }
}

/**
 * 레이어 Alert
 * msg : Alert 창에 표시할 메시지
 * subMsg : 메시지 하단에 작은 글씨로 표시할 메시지 (필수 아님)
 * okBtnTxt : 확인 버튼 텍스트 (미입력시 [확인])
 */
function layerAlert(msg, subMsg, okBtnTxt) {
  var dfd = $.Deferred();

  if (okBtnTxt == null || okBtnTxt == '') okBtnTxt = '확인';

  var html = '';
  html += '<div class="confirm_popup">';
  html += '	<div class="inner">';
  html += '		<div class="content">';
  html += msg;

  // subMsg가 있을 때만
  if (subMsg != null && subMsg != '') {
    html += '			<div class="stxt">';
    html += subMsg;
    html += '			</div>';
  }

  html += '		</div>';
  html += '		<div class="btn_area">';
  html += '			<button type="button" class="btn_okay">' + okBtnTxt + '</button>';
  html += '		</div>';
  html += '	</div>';
  html += '</div>';

  $('body').append(html);

  $('.confirm_popup .btn_okay').on('click', function () {
    $(this).closest('.confirm_popup').remove();
    dfd.resolve();
  });

  return dfd.promise();
}

/**
 * 레이어 Confirm
 * msg : Confirm 창에 표시할 메시지
 * subMsg : 메시지 하단에 작은 글씨로 표시할 메시지 (필수 아님)
 * okBtnTxt : 확인 버튼 텍스트 (미입력시 [확인])
 * cancelBtnTxt : 취소 버튼 텍스트 (미입력시 [취소])
 */
function layerConfirm(msg, subMsg, okBtnTxt, cancelBtnTxt) {
  var dfd = $.Deferred();

  if (okBtnTxt == null || okBtnTxt == '') okBtnTxt = '확인';
  if (cancelBtnTxt == null || cancelBtnTxt == '') cancelBtnTxt = '취소';

  var html = '';
  html += '<div class="confirm_popup">';
  html += '	<div class="inner">';
  html += '		<div class="content">';
  html += msg;

  // subMsg가 있을 때만
  if (subMsg != null && subMsg != '') {
    html += '			<div class="stxt">';
    html += subMsg;
    html += '			</div>';
  }

  html += '		</div>';
  html += '		<div class="btn_area">';
  html += '			<button type="button" class="btn_cancel">' + cancelBtnTxt + '</button>';
  html += '			<button type="button" class="btn_confirm">' + okBtnTxt + '</button>';
  html += '		</div>';
  html += '	</div>';
  html += '</div>';

  $('body').append(html);

  $('.confirm_popup .btn_confirm').on('click', function () {
    $(this).closest('.confirm_popup').remove();
    dfd.resolve();
  });
  $('.confirm_popup .btn_cancel').on('click', function () {
    $(this).closest('.confirm_popup').remove();
    dfd.reject();
  });

  return dfd.promise();
}

function closeLayerAlert() {
  $('.confirm_popup').last().remove();
}

/**
 * 신고하기 popup
 * reportType : 신고타입 (VIDEO(영상), CMMT(댓글), USER(회원))
 * key : videoNo or cmmtNo
 */
function openReportPopup(reportType, key) {
  if (reportType == 'VIDEO') {
    getPageAjax('../report/video.html', null).done(function (result) {
      $('body').append(result);
      $('#reportForm #reportType').val(reportType);
      $('#reportForm #videoNo').val(key);
      $('#reportPop').show();
    });
  } else if (reportType == 'CMMT') {
    getPageAjax('../report/cmmt.html', null).done(function (result) {
      $('body').append(result);
      $('#reportForm #reportType').val(reportType);
      $('#reportForm #cmmtNo').val(key);
      $('#reportPop').show();
    });
  } else if (reportType == 'USER') {
    getPageAjax('../report/user.html', null).done(function (result) {
      $('body').append(result);
      $('#reportForm #reportType').val(reportType);
      $('#reportForm #memberNo').val(key);
      $('#reportPop').show();
    });
  }
}

//영상재생
function playVideo(type, videoNo, rowsPerPage, nowPage, chlgNo, videoDivCd, regMemberNo, clickUseYn) {
  if (clickUseYn != 'N') {
    if (type == 'playChlgVideo') {
      reqToApp('PlayVideo', JSON.stringify({ type: type, videoUrl: videoNo, rowsPerPage: rowsPerPage, nowPage: nowPage, chlgNo: chlgNo, videoDivCd: videoDivCd, regMemberNo: regMemberNo }));
    } else {
      reqToApp('PlayVideo', JSON.stringify({ type: type, videoNo: videoNo, rowsPerPage: rowsPerPage, nowPage: nowPage, chlgNo: chlgNo, videoDivCd: videoDivCd, regMemberNo: regMemberNo }));
    }
  } else {
    layerAlert('해당 영상은 블라인드 처리 되었습니다.', '자세한 사항은 cs@tobemeta.io로<br>문의해주세요.');
  }
}

//글로벌 검색 열기
function openGlobalSearchPopup() {
  getPageAjax('../search/search_layer.html', null).done(function (result) {
    $('body').find('.wrap').hide();
    $('body').append(result);
  });
}

//챌린지 상세화면
function openChallengeDetail(chlgNo) {
  getPageAjax('../rank/challenge_layer.html?chlgNo=' + chlgNo, null).done(function (result) {
    $('body').find('.wrap').hide();
    $('body').append(result);
  });
}

//유저프로필 이동
function viewUserProfile(memberNo) {
  reqToApp('ReadProfileOf', JSON.stringify({ memberNo: memberNo }));

  /*	var url = "";
	
	getMyMemberNo()
	.done(function(result){
		if(result == memberNo){
//			url = "/mypage/profile";
		}else{
//			url = "/user/profile?memberNo="+memberNo;
			reqToApp("ReadProfileOf", JSON.stringify( {memberNo: memberNo} ));
			return;
		}
		getPageAjax(url)
		.done(function(result) {
			var newDoc = document.open("text/html", "replace");
			newDoc.write(result);
			newDoc.close();
		});
	});*/
}

//toast 팝업 열기
var msgTimer = 0;

function openToastPop(msg) {
  clearToast();

  var dfd = $.Deferred();
  var toast = $('.toast');
  if (toast.length == 0) {
    $('body').append('<div class="toast" style="display:none;"></div>');
    toast = $('.toast');
  }

  toast.html(msg);
  toast.show();

  setTimeout(function () {
    toast.fadeIn(500, function () {
      msgTimer = setTimeout(function () {
        toast.fadeOut(500, function () {
          $(this).remove();
        });
        dfd.resolve();
      }, 1000);
    });
  }, 200);

  return dfd.promise();
}

function clearToast() {
  if (msgTimer != 0) {
    clearTimeout(msgTimer);
    msgTimer = 0;
  }
}

/**
 * MemberNo 조회
 */
function getMyMemberNo() {
  var dfd = $.Deferred();

  getAccessToken().done(function (result) {
    if (result == null || result == '') {
      // 미로그인 상태
      dfd.resolve('');
    } else {
      try {
        var payload = JSON.parse(atob(result.split('.')[1]));
        dfd.resolve(payload.sub);
      } catch (e) {
        dfd.resolve('');
      }
    }
  });

  return dfd.promise();
}

// 임시 web에서 테스트 하기 위함. 뒤로가기 버튼 클릭시 뒤로가기 처리
$(document).on('keydown', function (e) {
  if ($(e.target).prop('tagName') == 'INPUT' || $(e.target).prop('tagName') == 'TEXTAREA') return;

  if (e.keyCode == 8) {
    fn_back();
  }
});

// 뒤로가기 처리
function fn_back() {
  //보이는 .div_layer가 없으면  ClosePopupUrl 호출
  if ($('.div_layer:visible').length == 0) {
    reqToApp('ClosePopupUrl');
    return;
  }

  if ($('.confirm_popup:visible').length > 0) {
    // alert/confirm 창이 있을때는 alert의 확인/ confirm의 취소 클릭
    $('.confirm_popup:visible').last().find('.btn_okay,.btn_cancel').trigger('click');
    return;
  }

  // 보이는 .div_layer 중에 맨 뒤에 있는 화면의 뒤로가기/닫기 버튼 클릭
  $('.div_layer:visible').last().find('.btn_go_prev,.btn_close,.btn_okay').trigger('click');
}

/** 안효주 추가 */
const getUrlParams = function () {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
    params[key] = value;
  });
  return params;
};

const setUrlParams = function (obj) {
  const newUrl = new URL(window.location.href);
  // newUrl.searchParams.set('type', 'join');
  // newUrl.searchParams.append('type', 'join');
  $.each(obj, function (key, value) {
    newUrl.searchParams.append('' + key, '' + value);
  });
  window.history.pushState({}, '', newUrl);
};

const removeUrlParams = function (array) {
  var urlParams = new URLSearchParams(window.location.search);

  // "type" 파라미터 삭제
  if (typeof array === 'string') {
    urlParams.delete(array);
  } else {
    $.each(array, function () {
      console.log(this);
      urlParams.delete(this);
    });
  }

  // 변경된 URL 업데이트
  var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + urlParams.toString();
  window.history.pushState({}, '', newUrl);
};
