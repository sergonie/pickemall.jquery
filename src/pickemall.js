(function ($) {
    'use strict';

    $.fn.pickemall = function (options) {

        //default options...
        var defaults = {
            className: 'pickemall',
            buttonClass: 'pickemall-btn',
            activeClass: 'pickemall__on',
            cursorPicker: 'crosshair',
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
                if (r > 255 || g > 255 || b > 255) {
                    throw "Invalid color component";
                }
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
        };

        //event handlers
        var actions = {

            //toggle button
            togglePicker: function ($el) {
                var $all = $('*');

                $el.toggleClass(settings.activeClass);
                if ($el.hasClass(settings.activeClass)) {
                    console.log('pickemall on');
                    $all.css('cursor', settings.cursorPicker);
                } else {
                    console.log('pickemall off');
                    $all.css('cursor', '');
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
                                    hex = lib.rgbToHex(rgb[0], rgb[1], rgb[2]);

                                //result string
                                var result = settings.rgbResult ? rgbResult : hex;

                                //call events
                                settings.onChange(result);
                            }
                        });
                    }
                    e.preventDefault();
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

                    default:
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
            });

            //init pick color event
            $(document).on('click', function (e) {
                actions.pickColor(e, $el);
            });

        });
    };

})(jQuery, html2canvas);