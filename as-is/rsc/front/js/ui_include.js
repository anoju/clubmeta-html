/* 임시 관리 스크립트 *******************************************************************************************************/
// 일괄 관리를 위한 include용도의 공통 마크업 
var uiHtml = {

    addGnb: function(state){
        var stateTxt = null;
        var gnbHtml = "";

        switch (state) {
            case "search":
                stateTxt = "검색"
                break;
            case "vote":
                stateTxt = "투표"
                break;
            case "challenge":
                stateTxt = "챌린지"
                break;
            case "challenge-detail":
                stateTxt = "#여름댄스챌린지"
                break;
            case "challenge-open":
                stateTxt = "챌린지 개최"
                break;
            case "challenge-shoe":
                stateTxt = "챌린지 개최 비용"
                break;
            case "challenge-join":
                stateTxt = "챌린지 참가 비용"
                break;            
            case "challenge-list":
                stateTxt = "챌린지"
                break;           
            case "ranking":
                stateTxt = "클러버 랭킹"
                break;
            case "upload":
                stateTxt = "게시"
                break;
            case "userpage":
                stateTxt = "MyId"
                break;
            case "joinus":
                stateTxt = "가입하기"
                break;
            case "login":
                stateTxt = "로그인"
                break;
            case "pwreset":
                stateTxt = "비밀번호 재설정"
                break;
            case "setting":
                stateTxt = "설정"
                break;            
            case "phonereset":
                stateTxt = "전화번호 수정"
                break;                    
            case "emailreset":
                stateTxt = "이메일 수정"
                break;    
            case "idreset":
                stateTxt = "클럽메타ID 수정"
                break;
            case "loging":
                stateTxt = "ClubmetaID"
                break;
            case "shoe":
                stateTxt = "Shoe"
                break;
            case "shoecharge":
                stateTxt = "Shoe 구매"
                break;
            case "user":
                stateTxt = "clubmetaID"
                break;
        }
        
        
        // 이전버튼 표시 유무
        if(state == "challenge" || state == "userpage" ){
            gnbHtml += '';
        } else if(state == "search" ){
            gnbHtml += '<button type="button" class="btn_go_prev search">이전으로</button>';
        }
        else {
            gnbHtml += ' <button type="button" class="btn_go_prev">이전으로</button>';
        }
        if(state == "search" ){
            gnbHtml += '';
        } else if(state == "user" ){
            gnbHtml += ' <h1>' + stateTxt + '<i class="ico_perfomer">퍼포머</i></h1>';
        }
        else {
            gnbHtml += ' <h1>' + stateTxt + '</h1>';
        }      
        // 검색창 표시
        if(state == "search"){
            gnbHtml += ' <div class="search_area">';
            gnbHtml += '    <input type="search" placeholder="챌린지, 클러버 이름 검색">';
            gnbHtml += '    <button type="button" class="btn_go_search">검색</button>';
            gnbHtml += ' </div>';
        }
        // 검색버튼 표시
        if(state == "challenge"){
            gnbHtml += ' <button type="button" class="btn_search">검색</button>';
        }
        // 안내버튼 표시
        if(state == "challenge-shoe" || state == "challenge-join" || state == "vote"){
            gnbHtml += ' <button type="button" class="btn_information" onclick="view_popup()">?</button>';
        }
        // 설정버튼 표시
        if(state == "userpage"){
            gnbHtml += ' <button type="button" class="btn_setting">설정</button>';
        }

        $("header").prepend(gnbHtml);
    },

    
    addBtm: function(state){
        var ftHtml = "";

        ftHtml +=  '    <div class="menu">';
        ftHtml +=  '       <a href="#" class="active"><i class="ico_home">홈</i></a>';
        ftHtml +=  '       <a href="#"><i class="ico_lanking">랭킹</i></a>';
        ftHtml +=  '       <a href="#"><i class="ico_record">촬영</i></a>';
        if(state == "setting" ){
            ftHtml += '    <a href="#"><i class="ico_mypage my" style="background-image:url(../images/@performer01.jpg)">마이페이지</i></a>';
        }else if(state == "user" ){
            ftHtml += '    <a href="#"><i class="ico_mypage" style="background-image:url(../images/@performer02.jpg)">마이페이지</i></a>';
        }
        else {
            ftHtml += '    <a href="#"><i class="ico_mypage" style="background-image:url(../images/common/ico_mypage.png)">마이페이지</i></a>';
        }
        ftHtml +=  '    </div>';
        $(".btm_menu").prepend(ftHtml);
    },

}

