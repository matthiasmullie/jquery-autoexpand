# jquery-autoexpand

Auto-expands textareas so they grow as you type.

## Options

* int **animationTime** *(50)*
Time in milliseconds to animate to new height
* int **windowPadding** *(10)*
Amount of pixels to preserve between textarea & window bottom

You can also destroy autoaxpander by calling it with 'destroy' as parameter, instead of an options object.

## Example

* multiple textareas
* immediate (0ms) animation time
* larget (100px) padding between textarea & window bottom
* link to destroy autoexpander

Looks like:

```html
<textarea name="text"></textarea>
<textarea name="text2"></textarea>
<a href="#">Reset</a>

<script>
    $('textarea').autoExpand({ animationTime: 0, windowPadding: 100 });

    $('a').click(function(e) {
        $('textarea').autoExpand('destroy');
    });
</script>
```

## License
Autoexpand is [MIT](http://opensource.org/licenses/MIT) licensed.
