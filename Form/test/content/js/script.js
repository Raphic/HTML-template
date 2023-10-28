'use_strict';

var $PAGE = (function() {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  var $HELPERS = {
    isLoaded: false,
    CLARINS: {
      Domain: window.location.origin + "/src/content/clarins/vendors/clarins/",
    },
    HTML: {},
    Init: function() {
      var that = this;
      if (that) {
        that.Doms(function(Doms) {
          var checkingLoader = setInterval(function() {
            if (that.isLoaded) {
              // Functional Sequences
              that.FNs.VendorsRender(Doms, that, function() {
                that.FNs.Blocks(Doms, that);
                that.FNs.Events(Doms, that);
                if (Doms) Doms.Main.style.visibility = 'visible';
              });

              clearInterval(checkingLoader);
              
            }
            that.isLoaded = true;
          }, 50)
        });
      }
    },
    Mouse: {
      Click: (function () {
          if ('ontouchstart' in document.documentElement === true) { return 'touchstart'; } 
          else { return 'click'; }
      })(),
      Move: (function () {
          if ('ontouchstart' in document.documentElement === true) { return 'touchmove'; } 
          else { return 'mousemove'; }
      })()
    },
    Doms: function(callback) {
      var DOMS = {
        Main:   document.querySelector(".js--YOUR_PREFIX-main") ? document.querySelector(".js--YOUR_PREFIX-main") : null,
        Blocks: document.querySelectorAll("section[data-name]").length > 0 ? document.querySelectorAll("section[data-name]") : [],
        Buttons: document.querySelectorAll(".js--YOUR_PREFIX-button").length > 0 ? document.querySelectorAll(".js--YOUR_PREFIX-button") : []
      };
      if (callback && typeof (callback) === "function") { callback(DOMS); }
    },
    FNs: {
      API: function(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() { 
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
              if (callback && typeof (callback) === "function") { callback(httpRequest.responseText); }
            }
        }
        httpRequest.open( "GET", url, true );            
        httpRequest.send( null );
      },
      Blocks: function(Doms, HELPERS, callback) {
        if (Doms.Blocks.length > 0) {
          HELPERS.HTML.DEVICE = {
            width:  window.innerWidth || window.clientWidth   || $(window).width(),
            height: window.innerHeight || window.clientHeight || $(window).height(),
          };
          Doms.Blocks.forEach(function(block, index) {
            HELPERS.HTML[block.getAttribute('data-name')] = {
              top:    block.offsetTop,
              width:  block.innerWidth  || block.clientWidth  || block.clientWidth  || block.offsetWidth,
              height: block.innerHeight || block.clientHeight || block.clientHeight || block.offsetHeight
            }
            if (index == Doms.Blocks.length - 1) {
              if (callback && typeof (callback) === "function") { callback(); }
            }
          });
        }
      },
      ImageLoaded: function(image) {
        return image.complete && image.naturalHeight !== 0;
      },
      Events: function(Doms, HELPERS, callback) {
        if (Doms.Buttons.length > 0) {
          Doms.Buttons.forEach(function(button) {
            button.addEventListener(HELPERS.Mouse.Click, function(e) {
              e.preventDefault();
            });
          });
        }
        if (callback && typeof (callback) === "function") { callback(); }
      },
      VendorsRender: function(Doms, HELPERS, callback) {
        var Body = Doms.Main.parentNode;
        if (Body.getAttribute('data-preview') && 
            Body.getAttribute('data-preview') == 'true') {
          
          if (Body.getAttribute('data-header') && 
              Body.getAttribute('data-header') == 'true') {
            HELPERS.FNs.API(HELPERS.CLARINS.Domain + '/header.html', function(res) {
              var Header = document.createElement("div");  
                  Header.innerHTML = res;
              Body.insertBefore(Header, Body.children[0]);
            });
          }
          if (Body.getAttribute('data-footer') &&
              Body.getAttribute('data-footer') == 'true') {
            HELPERS.FNs.API(HELPERS.CLARINS.Domain + '/footer.html', function(res) {
              var Footer = document.createElement("div");  
                  Footer.innerHTML = res;
              Body.appendChild(Footer, Body.children[0]);
            });
          }
        }
        if (callback && typeof (callback) === "function") { callback(); }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', $HELPERS.Init());
}());