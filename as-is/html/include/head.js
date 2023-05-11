// <script class="__include" src="/as-is/html/include/head.js"></script>

(function () {
  let str = `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">
  
  <script src="/as-is/rsc/front/js/jquery-2.2.0.min.js"></script>
  <script src="/as-is/rsc/front/js/jquery-ui.js"></script>
  <link rel="stylesheet" type="text/css" href="/as-is/rsc/front/css/include.css">
  <script src="/as-is/rsc/front/js/restutil.js"></script>
  <script src="/as-is/rsc/front/js/commonutil.js"></script>
  <script type="text/javascript" src="/as-is/rsc/front/js/plugins/swiper-6.7.5.min.js"></script>
  <script type="text/javascript" src="/as-is/rsc/front/js/plugins/lottie.min.js"></script>
  <script type="text/javascript" src="/as-is/rsc/front/js/plugins/ios-selector.js"></script>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
})();
