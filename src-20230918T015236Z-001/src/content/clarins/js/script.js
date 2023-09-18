'use_strict';

// var GAConfigs = {
//     "container": "#YOUR_PREFIX",
//     "categories": "THE_CATEGORY",
// }

var $PAGE = function (GAConfigs, jQuery, i18next, ga) {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    var $HELPERS = {
        isLoaded: false,
        isVendor: true,
        isI18n: true,
        VENDOR: "{YOUR VENDOR}", // cosma | kalista | marionnaud | origines | clarins
        LANGUAGES: (typeof $TRANSLATIONS !== "undefined") ? Object.keys($TRANSLATIONS) : [],
        DEFAULT_LANGUAGE: "en",
        CURRENT_LANGUAGE: "en",
        PARAMETER_NAME: "lang",
        RESOURCES_LANGUAGE: (typeof $TRANSLATIONS !== "undefined") ? $TRANSLATIONS : {},
        PARAMETERS: null,
        PATH: {
            Vendor: window.location.origin + "/src/content/clarins/vendors/",
        },
        HTML: {},
        Init: function () {
            console.time("Loaded Times");
            var HELPERS = this;
            var getLanguage = HELPERS.FNs.getQueryParams(HELPERS, window.location.href);
            if (HELPERS) {
                HELPERS.DOCUMENTS(function (Doms) {
                    // PARAMETERS HANDLER
                    HELPERS.PARAMETERS = getLanguage !== "" ? getLanguage : {};
                    HELPERS.CURRENT_LANGUAGE = HELPERS.LANGUAGES.includes(getLanguage[HELPERS.PARAMETER_NAME]) ? getLanguage[HELPERS.PARAMETER_NAME] : HELPERS.DEFAULT_LANGUAGE;
                    HELPERS.FNs.setQueryParams(HELPERS, HELPERS.PARAMETERS);
                    var checkingLoader = setInterval(function () {
                        if (HELPERS.isLoaded) {
                            // Functional Sequences
                            HELPERS.FNs.Blocks(Doms, HELPERS);
                            HELPERS.FNs.Events(Doms, HELPERS);
                            if (HELPERS.isVendor) HELPERS.FNs.VendorsRender(Doms, HELPERS);
                            if (typeof i18next !== "undefined" && HELPERS.isI18n) HELPERS.FNs.I18n(Doms, HELPERS);
                            if (GAConfigs) HELPERS.FNs.GA(Doms, HELPERS, GAConfigs);
                            // Page Loading Status
                            if (Doms && Doms.Main) Doms.Main.style.visibility = "visible";
                            if (Doms && Doms.Loading) Doms.Loading.style.display = "none";

                            clearInterval(checkingLoader);
                            console.timeEnd("Loaded Times");
                            console.log(HELPERS);
                        }
                        if (typeof jQuery === "undefined" && document.fonts.status === "loaded") HELPERS.isLoaded = true;
                    }, 50)
                });
            }
        },
        Mouse: {
            Click: (function () {
                if ('ontouchstart' in document.documentElement) {
                    return 'touchstart';
                } else {
                    return 'click';
                }
            })(),
            Move: (function () {
                if ('ontouchstart' in document.documentElement) {
                    return 'touchmove';
                } else {
                    return 'mousemove';
                }
            })()
        },
        DOCUMENTS: function (callback) {
            var DOMS = {
                Main: document.querySelector(".js--YOUR_PREFIX-main") ? document.querySelector(".js--YOUR_PREFIX-main") : null,
                Loading: document.querySelector(".js--YOUR_PREFIX-bar") ? document.querySelector(".js--YOUR_PREFIX-bar") : null,
                Blocks: document.querySelectorAll("section[data-name]").length > 0 ? document.querySelectorAll("section[data-name]") : null,
                I18ns: document.querySelectorAll("[data-i18n]").length > 0 ? document.querySelectorAll("[data-i18n]") : null,
                LanguageButtons: document.querySelectorAll(".js--YOUR_PREFIX-languages-item").length > 0 ? document.querySelectorAll(".js--YOUR_PREFIX-languages-item") : null,
                Buttons: document.querySelectorAll(".js--YOUR_PREFIX-button").length > 0 ? document.querySelectorAll(".js--YOUR_PREFIX-button") : null,
                TrackingList: document.querySelectorAll("#YOUR_PREFIX *[data-tracking]").length > 0 ? document.querySelectorAll("#YOUR_PREFIX *[data-tracking]") : null,
            };
            if (callback && typeof (callback) === "function") {
                callback(DOMS);
            }
        },
        FNs: {
            API: function (Doms, HELPERS, url, callback) {
                var httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function () {
                    console.time("API Times " + url);
                    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                        if (callback && typeof (callback) === "function") {
                            callback(httpRequest.responseText);
                            console.timeEnd("API Times " + url);
                        }
                    }
                }
                httpRequest.open("GET", url, true);
                httpRequest.send(null);
            },
            Blocks: function (Doms, HELPERS, callback) {
                if (Doms && Doms.Blocks.length > 0) {
                    HELPERS.HTML.DEVICE = {
                        width: window.innerWidth || window.clientWidth || $(window).width(),
                        height: window.innerHeight || window.clientHeight || $(window).height(),
                    };
                    Doms.Blocks.forEach(function (block, index) {
                        HELPERS.HTML[block.getAttribute('data-name')] = {
                            top: block.offsetTop,
                            width: block.innerWidth || block.clientWidth || block.clientWidth || block.offsetWidth,
                            height: block.innerHeight || block.clientHeight || block.clientHeight || block.offsetHeight
                        }
                        if (index === Doms.Blocks.length - 1) {
                            if (callback && typeof (callback) === "function") {
                                callback();
                            }
                        }
                    });
                }
            },
            ImageLoaded: function (image) {
                return image.complete && image.naturalHeight !== 0;
            },
            Events: function (Doms, HELPERS, callback) {
                if (Doms && Doms.Buttons) {
                    HELPERS.FNs.Looping(Doms.Buttons, function (button) {
                        button.addEventListener(HELPERS.Mouse.Click, function (e) {
                            e.preventDefault();
                        });
                    }, "Normal Buttons Loop");
                }
                // HANDLE LANGUAGE BUTTONS FOR SWITCHING
                if (Doms && Doms.LanguageButtons) {
                    HELPERS.FNs.Looping(Doms.LanguageButtons, function (button) {
                        button.addEventListener(HELPERS.Mouse.Click, function (e) {
                            e.preventDefault();
                            if (button.getAttribute("data-lang") !== HELPERS.CURRENT_LANGUAGE) {
                                HELPERS.CURRENT_LANGUAGE = button.getAttribute("data-lang");
                                HELPERS.PARAMETERS = {[HELPERS.PARAMETER_NAME]: HELPERS.CURRENT_LANGUAGE};
                                if (typeof i18next !== "undefined" && HELPERS.isI18n) {
                                    i18next.changeLanguage(HELPERS.CURRENT_LANGUAGE, (err) => {
                                        if (err) return console.log('something went wrong loading', err);
                                        HELPERS.FNs.I18nRender(Doms, HELPERS, i18next);
                                    });
                                    HELPERS.FNs.setQueryParams(HELPERS, HELPERS.PARAMETERS);
                                }
                            }
                        });
                    }, "Language Buttons Loop");
                }

                if (callback && typeof (callback) === "function") {
                    callback();
                }
            },
            Looping: function (object, actions, name) {
                if (object && object.length > 0) {
                    console.time(name ? name : "Documents")
                    object.forEach(function (item, index) {
                        if (actions && typeof (actions) === "function") {
                            actions(item, index);
                        }
                    })
                    console.timeEnd(name ? name : "Documents");
                }
            },
            I18n: function (Doms, HELPERS) {
                if (typeof i18next !== "undefined") {
                    i18next.init({
                        lng: HELPERS.CURRENT_LANGUAGE,
                        fallbackLng: HELPERS.DEFAULT_LANGUAGE,
                        debug: false,
                        compatibilityJSON: "v3",
                        resources: HELPERS.RESOURCES_LANGUAGE
                    }).then(function () {
                        HELPERS.FNs.I18nRender(Doms, HELPERS, i18next);
                    });
                }
            },
            I18nRender: function (Doms, HELPERS, i18nextObject) {
                if (Doms && Doms.I18ns) {
                    Doms.I18ns.forEach(function (item) {
                        item.innerHTML = i18nextObject.t(item.getAttribute('data-i18n'));
                    })
                }
            },
            setQueryParams: function (HELPERS, parameters = null, callback) {
                var _parameters = (Object.keys(HELPERS.PARAMETERS).join() === Object.keys(parameters).join())
                    ? HELPERS.PARAMETERS : parameters;

                if (HELPERS.isI18n && _parameters && Object.keys(_parameters).length > 0) {
                    var stringParameters = "?" + Object.entries(_parameters).join('&').replace(/,/g, "=");
                    if (!HELPERS.LANGUAGES.includes(HELPERS.FNs.getQueryParams(HELPERS, window.location.href)[HELPERS.PARAMETER_NAME])) {
                        stringParameters = stringParameters.replace(
                            HELPERS.FNs.getQueryParams(HELPERS, window.location.href)[HELPERS.PARAMETER_NAME],
                            HELPERS.DEFAULT_LANGUAGE
                        )
                    }
                    // window.history.replaceState({}, document.title, self.location.pathname);
                    window.history.pushState(_parameters, "", stringParameters);
                    if (callback && typeof (callback) === "function") {
                        callback();
                    }
                }
            },
            getQueryParams: function (HELPERS, url, callback) {
                var queryString = url.split("?")[1];
                var keyValuePairs = queryString ? queryString.split("&") : undefined;
                var keyValue = [];
                var queryParams = {};
                if (queryString && keyValuePairs) {
                    keyValuePairs.forEach(function (pair) {
                        keyValue = pair.split("=");
                        queryParams[keyValue[0]] =
                            decodeURIComponent(keyValue[1]) !== "undefined" ?
                                decodeURIComponent(keyValue[1]).replace(/\+/g, " ") : "";
                    });
                    if (callback && typeof (callback) === "function") {
                        callback();
                    }
                    return queryParams;
                }
                return "";
            },
            GA: function (Doms, HELPERS, configs, callback) {
                var pageName = Doms.Main.getAttribute('data-name') ? Doms.Main.getAttribute('data-name') : null;
                if (Doms.TrackingList && pageName) {
                    Doms.TrackingList.forEach(function (item) {
                        item.addEventListener(HELPERS.Mouse.Click, function (e) {
                            console.log(pageName + "-" + e.target.dataset.tracking);
                            if (typeof ga !== "undefined") {
                                ga("send", "event", configs.categories, "click", pageName + "-" + e.target.dataset.tracking);
                            }
                        });
                    });
                    if (callback && typeof (callback) === "function") {
                        callback();
                    }
                }
            },
            VendorsRender: function (Doms, HELPERS, callback) {
                var Body = Doms.Main.parentNode;
                var isVendor = HELPERS.VENDOR;
                var Domain = null;

                switch (isVendor && isVendor.toLowerCase()) {
                    case "cosma":
                    case "kalista":
                    case "marionnaud":
                    case "origines":
                        Domain = HELPERS.PATH.Vendor + isVendor.toLowerCase();
                        break;
                    default:
                        Domain = HELPERS.PATH.Vendor + 'clarins';
                        break;
                }

                if (isVendor &&
                    Domain &&
                    Body.getAttribute('data-preview') &&
                    Body.getAttribute('data-preview') === 'true') {

                    if (Body.getAttribute('data-header') &&
                        Body.getAttribute('data-header') === 'true') {
                        HELPERS.FNs.API(Doms, HELPERS, Domain + '/header.html', function (res) {
                            var Header = document.createElement("div");
                            Header.innerHTML = res;
                            Body.insertBefore(Header, Body.children[0]);
                        });
                    }
                    if (Body.getAttribute('data-footer') &&
                        Body.getAttribute('data-footer') === 'true') {
                        HELPERS.FNs.API(Doms, HELPERS, Domain + '/footer.html', function (res) {
                            var Footer = document.createElement("div");
                            Footer.innerHTML = res;
                            Body.appendChild(Footer, Body.children[0]);
                        });
                    }
                }
                if (callback && typeof (callback) === "function") {
                    callback();
                }
            }
        }
    }

    return $HELPERS.Init();
}(
    null,
    (typeof jQuery !== "undefined") ? jQuery : undefined,
    (typeof i18next !== "undefined") ? i18next : undefined,
    (typeof ga !== "undefined") ? ga : undefined
);

document.addEventListener('DOMContentLoaded', $PAGE);
