(function($) {
'use strict';

/**
 * Auto-expands textareas so they grow as you type.
 *
 * @author Matthias Mullie <autoexpand@mullie.eu>
 *
 * @option int animationTime Time in milliseconds to animate to new height
 * @option int windowPadding Amount of pixels to preserve between textarea & window bottom
 * @param object|string settings Custom settings for auto-expand, or string 'destroy'
 * @return object
 */
$.fn.autoExpand = function(options) {
	/**
	 * Initialise auto-expand.
	 *
	 * @param object element
	 * @param object options
	 */
	var autoExpand = function(element, options) {
		this.$element = $(element);

		this.destroy();
		if (options === 'destroy') {
			return;
		}

		this.options = $.extend({
			// default options
			animationTime: 50,
			windowPadding: 10
		}, options);

		this.saveState();
		this.init();
	};

	/**
	 * Initializes auto-expander. Sets some default CSS settings required for it
	 * to work, then attaches the keyup event handler.
	 */
	autoExpand.prototype.init = function() {
		this.applyStyles({
			overflow: 'hidden',
			resize: 'none',

			// auto-expansion shouldn't shrink too much; set default height as min
			'min-height': this.$element.outerHeight()
		});

		this.$element.on(
			'keyup.autoexpand',
			this.autoExpand.bind(this)
		);

		// initialize at height of existing content
		this.$element.trigger('keyup');
	};

	/**
	 * Destroys the autoexpanding, effectively restoring the textarea like
	 * before auto-expander was attached.
	 */
	autoExpand.prototype.destroy = function() {
		// remove the autoexpand bind
		this.$element.off('.autoexpand');

		// restore the original settings
		this.applyStyles(this.$element.data('autoexpand-original-css'));
		this.$element.removeData('autoexpand-original-css');
	};

	/**
	 * Save original styles so we can restore them on destroy.
	 */
	autoExpand.prototype.saveState = function() {
		// quit it we have already stored original styles (current styles may
		// not be original)
		if (this.$element.data('autoexpand-original-css')) {
			return;
		}

		var styles = {
			// data overwritten in init
			overflow: this.$element.css('overflow'),
			resize: this.$element.css('resize'),
			'min-height': this.$element.css('min-height'),

			// data overwritten in autoExpand
			height: this.$element.css('height'),
			'overflow-y': this.$element.css('overflow-y')
		};
		this.$element.data('autoexpand-original-css', styles);
	};

	/**
	 * @param object styles
	 */
	autoExpand.prototype.applyStyles = function(styles) {
		for (var i in styles) {
			this.$element.css(i, styles[i]);
		}
	};

	/**
	 * Auto-expand/shrink as content changes.
	 */
	autoExpand.prototype.autoExpand = function() {
		var scrollHeight, minHeight, windowBottom, maxHeightIncrease,
			height = this.$element.height(),
			padding = this.$element.outerHeight() - this.$element.height();

		/*
		 * Collapse to 0 height to get accurate scrollHeight for the content,
		 * then restore height.
		 * Without collapsing, scrollHeight would be the highest of:
		 * * the content height
		 * * the height the textarea already has
		 * Since we're looking to also shrink the textarea when content shrinks,
		 * we want to ignore that last case (hence the collapsing)
		 */
		this.$element.height(0);
		scrollHeight = this.$element.get(0).scrollHeight;
		this.$element.height(height);

		/*
		 * Additional padding of <windowPadding> px between the textarea & the
		 * bottom of the page, so we don't end up with a textarea larger than
		 * the screen.
		 */
		windowBottom = $(window).scrollTop() + $(window).height();
		maxHeightIncrease = windowBottom - this.options.windowPadding;
		if (scrollHeight + height + padding >= maxHeightIncrease) {
			// override new height to be near the bottom edge, not past it
			scrollHeight = maxHeightIncrease - height - padding;

			// if we can't expand, ensure overflow-y is set to auto
			this.$element.css( 'overflow-y', 'auto' );
		} else {
			this.$element.css('overflow-y', 'hidden');
		}

		/*
		 * Only animate height change if there actually is a change; we don't
		 * want every keystroke firing a <animationTime> ms animation.
		 */
		minHeight = parseInt(this.$element.css('min-height'));
		if (scrollHeight !== this.$element.height() + padding &&
			(scrollHeight > minHeight || this.$element.height() + padding > minHeight)
		) {
			this.$element.animate({ height: scrollHeight }, this.options.animationTime);
		}
	};

	return this.each(function() {
		new autoExpand(this, options);
	});
};
}(jQuery));
