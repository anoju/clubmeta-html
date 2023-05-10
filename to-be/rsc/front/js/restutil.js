
var accessToken = "";
var refreshToken = "";

// post 전송
function post(url, param, body) {
	if(typeof body == "object") {
		// JSON.stringify가 안된 상태면 JSON.stringify처리
		body = JSON.stringify(body);
	}
	
	if(param) {
		// parameter가 있는 경우
		if(url.indexOf("?") > -1) {
			// url에 파라미터가 붙어 있으면 &로 뒤에 연결
			param = "&" + param;
		} else {
			// url에 파라미터가 없으면 ?로 뒤에 연결
			param = "?" + param;
		}
	} else {
		param = "";
	}
	return send(url + param, "post", null, body, false);
}

// get 전송
function get(url, param) {
	return send(url, "get", param, null, false);
}

// delete 전송
function del(url, param, body) {
	if(typeof body == "object") {
		// JSON.stringify가 안된 상태면 JSON.stringify처리
		body = JSON.stringify(body);
	}
	
	if(param) {
		// parameter가 있는 경우
		if(url.indexOf("?") > -1) {
			// url에 파라미터가 붙어 있으면 &로 뒤에 연결
			param = "&" + param;
		} else {
			// url에 파라미터가 없으면 ?로 뒤에 연결
			param = "?" + param;
		}
	} else {
		param = "";
	}
	return send(url + param, "delete", null, body, false);
}

// 파일 전송
function postFile(url, param, body) {
	
	if(param) {
		// parameter가 있는 경우
		if(url.indexOf("?") > -1) {
			// url에 파라미터가 붙어 있으면 &로 뒤에 연결
			param = "&" + param;
		} else {
			// url에 파라미터가 없으면 ?로 뒤에 연결
			param = "?" + param;
		}
	} else {
		param = "";
	}
	return send(url + param, "post", null, body, true);
	
}

// 전송
function send(url, type, param, body, isFile) {
	
	var dfd = $.Deferred();
	var data = (type == "post" || type == "delete" ? body : param);
	
//	var aToken = getAccessToken();
	getAccessToken()	// 토큰 먼저 받아 오고 나서 처리
	.done(function() {
		
		$.ajax({
			type : type,
			url : url,
			contentType : (isFile ? false : "application/json; charset=utf8"),
			processData: false,	// file전송을 위한 부분. file이외에는 없어도 됨.
			data : data,
			headers : {
				Authorization : accessToken
			},
//			beforeSend : function(xhr) {
//	 			xhr.setRequestHeader("Content-Type", "application/json; charset=utf8")	// header의 Content-Type을 설정
//			},
			traditional : true
		}).done(function(result, textStatus, jqXHR) {
			if(result.respCode == "SUCCESS") {
				dfd.resolve(result);
			} else if(result.respCode == "NO_ACCESS_TOKEN") {
				layerAlert("로그인이 만료 되었습니다. 다시 로그인 해 주세요.");
				dfd.reject();
				// 로그인 페이지 이동으로 변경
			} else {
				if(result.respCode == "EXPIRED_ACCESS_TOKEN") {
					// Access Token 만료이면 토큰 갱신 처리
					fn_tokenRefresh()
					.done(function() {
						// 갱신 처리가 다 되면 원래 요청 처리
						send(url, type, param, body, isFile)
						.done(function(result2){
							dfd.resolve(result2);
						});
					}).fail(function(result) {
						if(result.respCode == "SUSPENDED_MEMBER") {
							// 중지된 계정
							// 토큰 제거
							fn_removeToken();
							// 팝업창
							var msg = JSON.parse(result.respMsg);
							layerAlert("해당 계정은 [" + msg.reason + "](으)로 인해 계정 사용이 정지 되었습니다.")
							.done(function() {
								reqToApp("ClosePopupUrl");
							});
							/*
							layerConfirm("해당 계정은 [" + msg.reason + "](으)로 인해 계정 사용이 정지 되었습니다.", "자세한 정보는 문의하기를 통해 확인하실 수 있습니다.", "문의하기", "취소")
							.done(function() {
								getPageAjax("/inquiry/inquiry_layer")
								.done(function(result) {
									var $result = $(result);
									$result.find("[name=memberNo]").val(msg.memberNo);
									$("body").append($result);
								});
							});
							*/
							dfd.reject();
						} else if(result.respCode == "DORMANT_MEMBER") {
							layerAlert("해당 계정은 휴면 처리된 계정입니다.")
							.done(function() {
								dfd.reject();
							});
						} else if(result.respCode == "TERMS_AGREE_EXISTS") {
							// 필수 미동의 약관 존재
							var msg = JSON.parse(result.respMsg);
							getPageAjax("/login/terms_of_use_exp_layer", "memberNo=" + msg.memberNo)
							.done(function(result) {
								$("body").append(result);
							});
							dfd.reject();
						} else {
							// 갱신 실패
							layerAlert("로그인이 만료 되었습니다. 다시 로그인 해 주세요.")
							.done(function() {
								dfd.reject();
							});
						}
					});
				} else {
					dfd.reject(result);
				}
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			// 서버에서 Exception 처리를 하고 있기 때문에 
			// 오류가 나더라도 result.respCode가 ERROR로 설정 되어 done으로 처리 될듯...
			dfd.reject();
		}).always(function(result, textStatus, jqXHR) {
			// 항상 실행할 코드
	//		console.log(result);	// 테스트 코드
		});
		
		
	});
	return dfd.promise();
	
}

// 엑세스 토큰 받아오기
function getAccessToken() {
	var dfd = $.Deferred();
	if(accessToken == "") {
		reqToApp("GetAccessToken", "")
		.done(function(data) {
			accessToken = data;
			dfd.resolve(accessToken);
		});
	} else {
		dfd.resolve(accessToken);
	}
	return dfd.promise();
}
// 리프레시 토큰 받아오기
function getRefreshToken() {
	var dfd = $.Deferred();
	if(refreshToken == "") {
//		refreshToken = reqToApp("GetRefreshToken", "");
		reqToApp("GetRefreshToken", "")
		.done(function(data) {
			refreshToken = data;
			dfd.resolve(refreshToken);
		})
	} else {
		dfd.resolve(accessToken);
	}
	
	return dfd.promise();
}

// 토큰 갱신
function fn_tokenRefresh() {
	var dfd = $.Deferred();
	getRefreshToken()	// refreshToken 먼저 세팅하고 시작
	.done(function() {
		get("/api/tokenRefresh", "refreshToken=" + refreshToken)
		.done(function(result) {
			fn_setToken(result)
			.done(function() {
				dfd.resolve();
			});
		}).fail(function(result) {
			dfd.reject(result);
		});
		
	});
	return dfd.promise();
}
// 토큰 설정
function fn_setToken(result) {
	var dfd = $.Deferred();
	if(result.respCode == "SUCCESS") {
		accessToken = result.data.accessToken;
		refreshToken = result.data.refreshToken;
		reqToApp("RegisterTokens", JSON.stringify(result.data));
		dfd.resolve();
	} else {
		dfd.reject();
	}
	return dfd.promise();
}
// 토큰제거(로그아웃)
function fn_removeToken() {
	var dfd = $.Deferred();
	accessToken = "";
	refreshToken = "";
	reqToApp("RegisterTokens", JSON.stringify({accessToken: "", refreshToken: ""}));
	dfd.resolve();
	return dfd.promise();
	
}