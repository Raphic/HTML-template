
(function() {
  // we are basically selecting self so that we get the passed data attributes
  var scriptTag = document.getElementById('fonts-resolver');

  var webFontsUrl = scriptTag.getAttribute('data-web-fonts-url');
  var mobileFontsFile = scriptTag.getAttribute('data-mobile-fonts-file');
  var desktopFontsFile = scriptTag.getAttribute('data-desktop-fonts-file');

  // we are mirroring the logic that we have in the libview isMobile function
  function isMobile () {
      var mobileAgentHash = [
          'mobile',
          'tablet',
          'phone',
          'ipad',
          'ipod',
          'android',
          'blackberry',
          'windows ce',
          'opera mini',
          'palm'
      ];

      var	idx = 0;
      var isMobile = false;
      var userAgent = navigator.userAgent.toLowerCase();

      while (mobileAgentHash[idx] && !isMobile) {
          isMobile = (userAgent.indexOf(mobileAgentHash[idx]) >= 0);
          idx++;
      }

      return isMobile;
  }

  function createLinkElement(href, media) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      link.type = 'text/css';

      return link;
  }

  if (isMobile()) {
      document.head.appendChild(createLinkElement(mobileFontsFile, 'all'));
  } else {
      document.head.appendChild(createLinkElement(desktopFontsFile, 'all'));
  }

  window.addEventListener('load', function () {
      if (window.fetch) {
          var fontsRequest = new Request(webFontsUrl, {
              method: 'GET',
              mode: 'no-cors'
          });

          fetch(fontsRequest);
      } else {
          document.head.appendChild(createLinkElement(webFontsUrl, 'none'));
      }
  });
})();