(window.webpackJsonp=window.webpackJsonp||[]).push([["header-HamburgerMenu-index-js"],{"/LgW":function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return j})),r.d(t,"isCustomElement",(function(){return S}));var n=r("pcGQ"),i=r.n(n),a=r("D0wx"),s=r.n(a),u=r("cvzg"),o=r.n(u),c=r("/sAY"),l=r.n(c),h=r("30kP"),g=r.n(h),v=r("NKOz"),d=r.n(v),y=r("bPvv"),m=r.n(y),b=r("Opd7"),f=r.n(b),k=r("+9ix"),p=r.n(k),E=r("qtOx"),C=r.n(E),M=r("AxVx"),L=r("+t6s"),H=r("ezzP"),q=r("GUfj");r("Z04V");function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=p()(e);if(t){var i=p()(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return f()(this,r)}}var A=function(e){m()(n,e);var t,r=w(n);function n(){var e;o()(this,n);for(var t=arguments.length,i=new Array(t),a=0;a<t;a++)i[a]=arguments[a];return(e=r.call.apply(r,[this].concat(i))).loadHamburgerMenu=e.loadHamburgerMenu.bind(g()(e)),e.showHamburgerMenu=e.showHamburgerMenu.bind(g()(e)),e.hideHamburgerMenu=e.hideHamburgerMenu.bind(g()(e)),e.resetHamburgerMenu=e.resetHamburgerMenu.bind(g()(e)),e.handleDimoutEvents=e.handleDimoutEvents.bind(g()(e)),e.switchToNextLevelCategory=e.switchToNextLevelCategory.bind(g()(e)),e.handleHamburgerMenuIconClick=e.handleHamburgerMenuIconClick.bind(g()(e)),e.handleCategoryVisibility=e.handleCategoryVisibility.bind(g()(e)),e.focusViewAllLink=e.focusViewAllLink.bind(g()(e)),e.previousCategoryClickEvent=e.previousCategoryClickEvent.bind(g()(e)),e.handleCategoryEventListener=e.handleCategoryEventListener.bind(g()(e)),e}return l()(n,[{key:"mountedCallback",value:function(){var e=this;d()(p()(n.prototype),"mountedCallback",this).call(this),this.loadRequestMade=!1,this.shouldOpenMenu=!1,this.requestInProgress=!1,this.ANIMATION_DURATION=500,this.HAMBURGER_MENU_DESKTOP_WIDTH="435px",this.iconImage=this.querySelector(".header-menu-burger__icon"),this.hamburgerNavigation=this.querySelector(".hamburger-navigation"),Object(L.w)()&&(this.iconImage.addEventListener("mouseenter",this.loadHamburgerMenu),this.iconImage.addEventListener("focus",this.loadHamburgerMenu)),this.iconImage.addEventListener("click",this.handleHamburgerMenuIconClick),this.addEventListener("keypress",(function(t){return e.handleKeypresses(t,e.iconImage)}))}},{key:"unmountedCallback",value:function(){this.iconImage.removeEventListener("mouseenter",this.loadHamburgerMenu),this.iconImage.removeEventListener("focus",this.loadHamburgerMenu),this.iconImage.removeEventListener("click",this.handleHamburgerMenuIconClick)}},{key:"handleHamburgerMenuIconClick",value:function(){this.shouldOpenMenu=!0,this.loadHamburgerMenu()}},{key:"loadHamburgerMenu",value:(t=s()(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loadRequestMade||this.requestInProgress?!this.requestInProgress&&this.shouldOpenMenu&&(this.showHamburgerMenu(),this.shouldOpenMenu=!1):(this.loadRequestMade=!0,this.requestInProgress=!0,this.classList.contains("optimize-js")?this.loadContent():this.updateContent());case 1:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"updateHtmlContent",value:function(e){this.hamburgerNavigation.innerHTML=e,this.handleMenuNavigation(),this.shouldOpenMenu&&(this.showHamburgerMenu(),this.shouldOpenMenu=!1),this.requestInProgress=!1}},{key:"showHamburgerMenu",value:function(){var e=this.querySelector(".hamburger-content");e.classList.add("hamburger-content--active"),e.classList.remove("hamburger-content--inactive"),this.addPageDimout(),this.fixCategoryChevrons(),this.fixLowerContentHeight(),this.handleCloseMenuEvents(),Object(H.f)()}},{key:"hideHamburgerMenu",value:function(){var e=this.querySelector(".hamburger-content");e.classList.remove("hamburger-content--active"),e.classList.add("hamburger-content--inactive"),this.removePageDimout(),this.resetHamburgerMenu(),document.activeElement.blur(),Object(H.f)(!0)}},{key:"resetHamburgerMenu",value:function(){var e=this.querySelector(".hamburger-content-body-js");this.handleCategoryVisibility(1),e.setAttribute("active-level",1)}},{key:"handleKeypresses",value:function(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),void 0!==t?t.dispatchEvent(new Event("click")):e.target.dispatchEvent(new Event("click")))}},{key:"handleMenuNavigation",value:function(){var e=this;this.querySelectorAll(".first-level-category-js").forEach((function(t){return e.attachCategoryEventListener(t)}))}},{key:"handlePreviousCategoryClick",value:function(e){var t=this,r=e.querySelector("[subcategory-id]").getAttribute("subcategory-id");e.querySelectorAll(".hamburger-content-previous-js").forEach((function(e){e.removeEventListener("click",t.previousCategoryClickEvent),e.addEventListener("click",(function(e){return t.previousCategoryClickEvent(e,r)})),e.addEventListener("keypress",t.handleKeypresses)}))}},{key:"previousCategoryClickEvent",value:function(e,t){var r=this.querySelector(".hamburger-content-body-js"),n=r.getAttribute("active-level");if(this.handleCategoryVisibility(n-1),r.setAttribute("active-level",n-1),0===e.detail||Object(L.y)(e.detail)){var i=this.querySelector('[menu-level="'.concat(n-1,'"]'));null==i||i.querySelector('[category-id="'.concat(t,'"]')).focus()}}},{key:"attachCategoryEventListener",value:function(e){e.removeEventListener("click",this.handleCategoryEventListener),e.addEventListener("click",this.handleCategoryEventListener)}},{key:"handleCategoryEventListener",value:function(e){var t=e.target.closest(".category-item-js, .first-level-category-js"),r=this.querySelector(".hamburger-content-body-js").getAttribute("active-level"),n=t.getAttribute("category-id");null!==this.querySelector('.subcategory-wrapper-js[category-id="'.concat(n,'"]'))&&"3"!==r?(e.preventDefault(),this.switchToNextLevelCategory(n,r,e),this.dispatchEvent(new CustomEvent("hamburger-category-changed"))):t.dispatchEvent(new CustomEvent("hamburger-category-redirect",{bubbles:!0}))}},{key:"switchToNextLevelCategory",value:function(e,t,r){var n=this,i=++t,a=this.querySelector('[menu-level="'+i+'"]');a.innerHTML=this.querySelector('.subcategory-wrapper-js[category-id="'+e+'"]').innerHTML,this.querySelector(".hamburger-content-body-js").setAttribute("active-level",i),this.handlePreviousCategoryClick(a),this.querySelectorAll(".category-item-js").forEach((function(e){return n.attachCategoryEventListener(e)})),this.handleCategoryVisibility(i),(0===r.detail||Object(L.y)(r.detail))&&this.focusViewAllLink(a),Object(H.f)(!1)}},{key:"addPageDimout",value:function(){this.hamburgerNavigation.classList.add("hamburger-navigation--active"),this.hamburgerNavigation.addEventListener("click",this.handleDimoutEvents)}},{key:"focusViewAllLink",value:function(e){var t=function(){var t=e.querySelector(".hamburger-content-view-all-js");t?t.focus():e.querySelector(".category-item-js").focus()};if("getAnimations"in document){var r=this.querySelector(".hamburger-content");Promise.all(r.getAnimations({subtree:!0}).map((function(e){return e.finished}))).then(t)}else setTimeout(t,this.ANIMATION_DURATION)}},{key:"removePageDimout",value:function(){this.hamburgerNavigation.classList.remove("hamburger-navigation--active"),this.hamburgerNavigation.removeEventListener("click",this.handleDimoutEvents)}},{key:"handleCategoryVisibility",value:function(e){this.hamburgerNavigation.querySelectorAll(".hamburger-category-placeholder-js").forEach((function(t){var r=t.getAttribute("menu-level")===e.toString();t.classList.toggle("hamburger-content__body-inner--inactive",!r)}))}},{key:"handleDimoutEvents",value:function(e){e.target===e.currentTarget&&this.hideHamburgerMenu()}},{key:"handleCloseMenuEvents",value:function(){var e=this.querySelector(".hamburger-content-close-js");e.addEventListener("click",this.hideHamburgerMenu),e.addEventListener("keypress",this.handleKeypresses)}},{key:"fixLowerContentHeight",value:function(){var e=this.querySelector(".hamburger-content__upper").offsetHeight;this.querySelector(".hamburger-content__lower").style.height="calc(100% - "+e+"px)"}},{key:"fixCategoryChevrons",value:function(){var e=this;this.querySelectorAll(".first-level-category-js").forEach((function(t){var r=t.getAttribute("category-id");null===e.querySelector('.subcategory-wrapper-js[category-id="'.concat(r,'"]'))&&t.querySelector(".hamburger-content__icon").classList.add("hide")}))}},{key:"urlParams",get:function(){return{burgermenu:"true"}}},{key:"sessionKey",get:function(){return Object(q.a)("hamburger")}}]),n}(M.a);C()(A,"TAG_NAME","i-hamburgermenu");var S=!0,j=A},Z04V:function(e,t,r){}}]);