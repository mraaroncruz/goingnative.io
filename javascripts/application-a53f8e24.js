$(document).ready(function(){$("#js-navigation-menu").removeClass("show"),$("#js-mobile-menu").on("click",function(n){n.preventDefault(),$("#js-navigation-menu").slideToggle(function(){$("#js-navigation-menu").is(":hidden")&&$("#js-navigation-menu").removeAttr("style")})})}),function(){angular.module("thepickmachine",[]),angular.module("thepickmachine").controller("ApplicationController",function(n){return n.baseURL="http://dbpm.aaroncruz.com"}).controller("PicksController",function(n,e){var t,o,r,a,i;return t=[],o="No picks found",a="Loading Picks...",i=new RegExp("^("+o+"|"+a+")$"),n.shouldShowInfo=function(n){return n.name&&!n.name.match(i)},n.picks=[{name:n.loadingMessage,link:""}],n.cleanEpisodeTitle=function(n){return n.replace("Show - ","")},n.shorten=function(n,e){var t;return null==e&&(e=20),t="",n?(n&&(t=n.replace(/^https?:\/\//,"")),n.length>e&&(t=t.slice(0,e)+"..."),t):t},n.$watch("search.term",function(r,a){return r!==a?""===r?n.picks=t:e.get(""+n.baseURL+"/search",{params:{q:r}}).then(function(e){return n.picks=e.data.length>0?e.data:[{name:o}]}):void 0}),(r=function(){return e.get(n.baseURL).then(function(e){return n.picks=e.data,t=angular.copy(e.data)})})()}).controller("ShowButtonsController",function(n,e){return e.get(""+n.baseURL+"/shows").then(function(e){return n.shows=e.data}),n.chooseShow=function(n){return console.debug("show",n)}}).directive("logo",function(){return{scope:{pick:"=for"},replace:!0,template:"<span>{{logoSrc}}</span>",link:function(n){var e;return e=function(){var e,t,o;return t=n.pick.show_name,t?(e=function(){var n,e,r,a;for(r=t.split(" "),a=[],n=0,e=r.length;e>n;n++)o=r[n],a.push(o[0]);return a}(),e.join("")):""},n.logoSrc=e()}}})}.call(this);