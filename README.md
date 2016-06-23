# Pickemall
jQuery plugin for colorpickers. This plugin allows you to get the color of any web page element.
### Version
1.0.0 alpha 1

## Simple use
```
var $textInput = $('input[type="text"]')[0], //any text input
    $togglePicker = $('.pickemall'); //any div elem
    
$togglePicker.pickemall({
    onChange: function(color) {
        $textInput.val(color);
    }
});
```

## Options
```
{
    className: <class name for toggle button> / <default "pickemall">,
    buttonClass: <class name for styles for toggler button> / <default "pickemall-btn">,
    activeClass: <class name for active button> / <default "pickemall__on">,
    cursorPicker: <cursor type for picker> / <default "crosshair">,
    rgbResult: <if true then result returns like 'rgb(XXX, XXX, XXX)' else hex string '#XXXXX'> / <default "false">,
    onChange: <callback function for change picker handler> / <default shows value in console>
}
```