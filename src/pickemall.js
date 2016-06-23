$(function () {
	'use strict';
	$.fn.pickemall = function (options) {

		//default options...
		let defaults = {
			className: 'pickemall',
			buttonClass: 'pickemall-btn',
			activeClass: 'pickemall__on',
			cursorPicker: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABoElEQVR42q3WsUuCQRzGcbOsjERKJWhpUWhpdYzWmorq3yiDaqw/oKK2KBpbIgK3thaVIJAwwiVCTBKiIqGhKNO+B48goqDne/BBX/V93vfufnevLpdzrQd96NV7R5sHCzhDHEsYdCrcixiKqMoPFm16Yro/ghD6MYw1FOrCa+L6fUdtAnu4wDzWkW8SXtVwdXyBKC7xi2d8tAgv6gY6HqIhbOClLqwsFR0XNGwemwkNalgyunvTk2+84hM5hXttws3EriCFE+wiq4s8IY1V+GzDzclJHCCsCtqpmwdzgTlVl3X4PiL6PKyeZDQnZVXXWKdjbsITDeERHac06ZuqLlPCgXbDAwpPtQhP6PugqiuqddJW7Y/o5BscYrJFeMhmQv3aW25xjXMsY0rhyW7CfarjO4WbMizhHlcaLuvw2q6YVZB5/VIJmlX6oO+DNuFuTCsk3RBuPCo8YLunD2BLq7Kk5V8Lzyl8tNuHxmmTXTGvcH+3z9JZvNcFV7QrxrQldNXMwjjCH97Uk23M2O6Kzdo4jtUTrzYst9P/DBwPNO0fh+uBi2lURocAAAAASUVORK5CYII=')",
			rgbResult: false,
			onChange: function (color) {
				console.log('Your picked color:', color);
			}
		};

		//setup settings
		var settings = $.extend({}, defaults, options);

		//other functions...
		var lib = {

			//convert rgb values to hex string
			rgbToHex: function rgbToHex(r, g, b) {
				if (r > 255 || g > 255 || b > 255)
					throw "Invalid color component";
				return ((r << 16) | (g << 8) | b).toString(16);
			}
		};

		//event handlers
		var actions = {

			//toggle button
			togglePicker: function ($el) {
				$el.toggleClass(settings.activeClass);
				if ($el.hasClass(settings.activeClass)) {
					console.log('pickemall on');
				} else {
					console.log('pickemall off');
				}
			},

			//pick color from html elem
			pickColor: function (e, $el) {
				//if toggler active
				if ($el.hasClass(settings.activeClass)) {
					var $target = $(e.target);

					//if not toggler
					if (!$target.is($el)) {
						html2canvas(document.body, {
							onrendered: function (canvas) {
								var
									rgb = canvas.getContext('2d').getImageData(e.pageX, e.pageY, 1, 1).data,
									rgbResult = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')',
									hex = "#" + ("000000" + lib.rgbToHex(rgb[0], rgb[1], rgb[2])).slice(-6);

								//result string
								var result = settings.rgbResult ? rgbResult : hex;

								//call events
								settings.onChange(result);
							}
						});
					}

				}
			},

			//hotkeys
			hotkeys: function (e, $el) {
				switch (e.keyCode) {
					case 27:
						if ($el.hasClass(settings.activeClass)) {
							$el.click();
						}
						break;
				}
			}

		};

		//initializaion
		return this.each(function () {
			//toggler element
			var $el = $(this);

			//init toggler
			$el.addClass(settings.buttonClass).on('click', function () {
				actions.togglePicker($el);
			});

			//init keymap
			$(document).on('keydown', function (e) {
				actions.hotkeys(e, $el);
			})

			//init pick color event
			$(document).on('click', function (e) {
				actions.pickColor(e, $el);
			});
		})
	}
});