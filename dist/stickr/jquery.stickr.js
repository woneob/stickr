/*!
 * Name: stickr - jQuery plugin for sticky elements
 * Version: v0.1.2
 * Homepage: https://github.com/woneob/stickr
 * License: MIT
 */

(function($, win, doc) {
    $.fn.stickr = function() {
        if (typeof doc.body.style.maxHeight === "undefined") {
            // 브라우저가 IE6 이하일 경우 종료
            return;
        }
        var scrollY = $(win).scrollTop();
        return this.each(function() {
            var $this = $(this);
            var thisHeight = $this.outerHeight();
            var thisOffsetY = $this.offset().top;
            var winHeight = $(win).height();
            // "data-stickr-gap" 속성으로부터 값을 가져옴
            var gap = parseInt($this.attr("data-stickr-gap"), 10);
            // gap이 숫자가 아니거나 음수일 경우에 0 으로 변환
            gap = Math.max(0, gap) || 0;
            var $parentElem = $this.offsetParent();
            var stopY;
            var parentHeight;
            if ($parentElem.length) {
                parentHeight = $parentElem.outerHeight();
                stopY = $parentElem.offset().top + parentHeight - thisHeight - gap;
            }
            // thisHeight, thisOffset에 gap 값을 반영
            thisHeight += gap;
            thisOffsetY -= gap;
            if (winHeight < thisHeight) {
                // 윈도우 높이가 thisHeight 보다 작을 경우(윈도우 높이룰 초과할 경우)
                // this 엘리먼트가 고정되지 않도록 each 반복을 continue 시킴
                return true;
            }
            var observer = function() {
                scrollY = $(win).scrollTop();
                if (scrollY > thisOffsetY) {
                    // scrollY 값이 thisOffsetY 보다 더 클 경우 (this 엘리먼트가 상단 뷰포트를 벗어날 경우)
                    // .fixed 클래스를 추가하고 marginTop 값을 gap 값으로 지정한다
                    // .fixed 는 "position:"fixed" 포지션이 미리 CSS에서 선언되어 있어야 함
                    $this.addClass("fixed").css("margin-top", gap);
                } else {
                    // scrollY 값이 thisOffsetY 보다 작거나 같은 경우
                    // (this 엘리먼츠가 상단 뷰포트에 도달하지 못했을경우)
                    // .fixed 클래스와 스타일을 제거하여 초기화 시킨다
                    $this.removeClass("fixed").removeAttr("style");
                }
                return false;
            };
            observer();
            $(win).on("scroll", observer);
        });
    };
})(jQuery, window, document);
