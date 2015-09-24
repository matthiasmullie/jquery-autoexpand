# jquery-autoexpand

A textarea will automatically grow and shrink in height as you add or remove content to it.

* The textarea will never shrink smaller than its original height
* The textarea will never grow beyond the bottom edge of the window. Instead, a scroll bar show up in the textarea as more text is added to the textarea.


## Usage

```javascript
$('textarea').autoExpand();
```

Or if you want to customize some of the options:

```javascript
$('textarea').autoExpand({ animationTime: 0, windowPadding: 100 });
```


## Remove

If you no longer need the textarea to auto-expand and you want to reset it:

```javascript
$('textarea').autoExpand('destroy');
```


## Options

Options can be passed in as a `{ key: value }` object literal. Available options are:

| property      | default value | description                                                   |
|---------------|:-------------:|---------------------------------------------------------------|
| animationTime | 50            | Time in milliseconds to animate to new height                 |
| windowPadding | 20            | Amount of pixels to preserve between textarea & window bottom |

You can remove the auto-expander from a textarea by passing 'destroy' (as string, not in an object literal).


## Installation

Install this package via [npm](https://www.npmjs.org/):

```sh
npm install jquery-autoexpand
```

Or simply copy jquery.autoexpand.js into your project.

## License
jquery-autoexpand is [MIT](http://opensource.org/licenses/MIT) licensed.
