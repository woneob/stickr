(function($, doc) {
	$.fn.randomPos = function() {
		var $unit = this;
		var verticalGap = 15;
		var minSize = 0.5;
		var maxSize = 2.5;
		var nums = [];

		for (var i = 0; i < $unit.length; i++) {
			nums.push(i);
		}

		var getRandom = function(min, max, figure) {
			return (Math.random() * (max - min) + min).toFixed(figure);
		};

		return $unit.each(function() {
			var randomY = nums.splice(Math.random() * nums.length, 1)[0];
			var randomSize = getRandom(0.5, 2.5, 4);
			var randomOpacity = getRandom(0.5, 1, 2);

			$(this).css({
				visibility: 'visible',
				marginTop: randomY * verticalGap,
				width: randomSize + 'rem',
				height: randomSize + 'rem',
				opacity: randomOpacity
			});
		});
	};
})(jQuery);

$(document).ready(function() {
	$('.demo .unit').randomPos().stickr();
	$('.demo h2').stickr();


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
