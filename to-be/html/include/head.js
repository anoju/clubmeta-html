// <script class="__include" src="/to-be/html/include/head.js"></script>

(function () {
  let str = `<meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">
  
  <script src="/to-be/rsc/front/js/jquery-2.2.0.min.js"></script>
  <script src="/to-be/rsc/front/js/jquery-ui.js"></script>
  <link rel="stylesheet" type="text/css" href="/to-be/rsc/front/css/include.css">
  <script src="/to-be/rsc/front/js/restutil.js"></script>
  <script src="/to-be/rsc/front/js/commonutil.js"></script>
  <script type="text/javascript" src="/to-be/rsc/front/js/plugins/swiper-6.7.5.min.js"></script>
  <script type="text/javascript" src="/to-be/rsc/front/js/plugins/lottie.min.js"></script>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
})();
