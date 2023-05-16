(function () {
  let str = '';
  str += '<link rel="shortcut icon" type="image/x-icon" href="../../images/favicon.png" />';
  str += '<meta property="og:image" content="https://dev-mydata.mykkl.com/mydata/resources/static/images/og_image_1200x630.png" />';
  str += '<link href="../../static/css/front.min.css" rel="stylesheet" />';
  str += '<script type="text/javascript" src="../../static/js/lib/jquery-3.7.0.min.js"></script>';
  str += '<script type="text/javascript" src="../../static/js/lib/lodash.4.17.21.min.js"></script>';
  str += '<script type="text/javascript" src="../../static/js/ui-plugins.min.js"></script>';
  str += '<script type="text/javascript" src="../../static/js/ui-front.js"></script>';
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
})();
