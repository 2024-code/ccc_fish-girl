
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/LaoHuJi/module/i18n/polyglot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (global){
"use strict";
cc._RF.push(module, '69decSgpRlE1rzEKp0RzG3V', 'polyglot');
// LaoHuJi/module/i18n/polyglot.js

"use strict";

//     (c) 2012-2016 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Polyglot = factory(root);
  }
})(typeof global !== 'undefined' ? global : void 0, function (root) {
  'use strict';

  var replace = String.prototype.replace; // ### Polyglot class constructor

  function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
  } // ### Version


  Polyglot.VERSION = '1.0.0'; // ### polyglot.locale([locale])
  //
  // Get or set locale. Internally, Polyglot only uses locale for pluralization.

  Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
  }; // ### polyglot.extend(phrases)
  //
  // Use `extend` to tell Polyglot how to translate a given key.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The key can be any string.  Feel free to call `extend` multiple times;
  // it will override any phrases with the same key, but leave existing phrases
  // untouched.
  //
  // It is also possible to pass nested phrase objects, which get flattened
  // into an object with the nested keys concatenated using dot notation.
  //
  //     polyglot.extend({
  //       "nav": {
  //         "hello": "Hello",
  //         "hello_name": "Hello, %{name}",
  //         "sidebar": {
  //           "welcome": "Welcome"
  //         }
  //       }
  //     });
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}',
  //     //   'nav.sidebar.welcome': 'Welcome'
  //     // }
  //
  // `extend` accepts an optional second argument, `prefix`, which can be used
  // to prefix every key in the phrases object with some string, using dot
  // notation.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     }, "nav");
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}'
  //     // }
  //
  // This feature is used internally to support nested phrase objects.


  Polyglot.prototype.extend = function (morePhrases, prefix) {
    var phrase;

    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrase = morePhrases[key];
        if (prefix) key = prefix + '.' + key;

        if (typeof phrase === 'object') {
          this.extend(phrase, key);
        } else {
          this.phrases[key] = phrase;
        }
      }
    }
  }; // ### polyglot.unset(phrases)
  // Use `unset` to selectively remove keys from a polyglot instance.
  //
  //     polyglot.unset("some_key");
  //     polyglot.unset({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The unset method can take either a string (for the key), or an object hash with
  // the keys that you would like to unset.


  Polyglot.prototype.unset = function (morePhrases, prefix) {
    var phrase;

    if (typeof morePhrases === 'string') {
      delete this.phrases[morePhrases];
    } else {
      for (var key in morePhrases) {
        if (morePhrases.hasOwnProperty(key)) {
          phrase = morePhrases[key];
          if (prefix) key = prefix + '.' + key;

          if (typeof phrase === 'object') {
            this.unset(phrase, key);
          } else {
            delete this.phrases[key];
          }
        }
      }
    }
  }; // ### polyglot.clear()
  //
  // Clears all phrases. Useful for special cases, such as freeing
  // up memory if you have lots of phrases but no longer need to
  // perform any translation. Also used internally by `replace`.


  Polyglot.prototype.clear = function () {
    this.phrases = {};
  }; // ### polyglot.replace(phrases)
  //
  // Completely replace the existing phrases with a new set of phrases.
  // Normally, just use `extend` to add more phrases, but under certain
  // circumstances, you may want to make sure no old phrases are lying around.


  Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
  }; // ### polyglot.t(key, options)
  //
  // The most-used method. Provide a key, and `t` will return the
  // phrase.
  //
  //     polyglot.t("hello");
  //     => "Hello"
  //
  // The phrase value is provided first by a call to `polyglot.extend()` or
  // `polyglot.replace()`.
  //
  // Pass in an object as the second argument to perform interpolation.
  //
  //     polyglot.t("hello_name", {name: "Spike"});
  //     => "Hello, Spike"
  //
  // If you like, you can provide a default value in case the phrase is missing.
  // Use the special option key "_" to specify a default.
  //
  //     polyglot.t("i_like_to_write_in_language", {
  //       _: "I like to write in %{language}.",
  //       language: "JavaScript"
  //     });
  //     => "I like to write in JavaScript."
  //


  Polyglot.prototype.t = function (key, options) {
    var phrase, result;
    options = options == null ? {} : options; // allow number as a pluralization shortcut

    if (typeof options === 'number') {
      options = {
        smart_count: options
      };
    }

    if (typeof this.phrases[key] === 'string') {
      phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
      phrase = options._;
    } else if (this.allowMissing) {
      phrase = key;
    } else {
      this.warn('Missing translation for key: "' + key + '"');
      result = key;
    }

    if (typeof phrase === 'string') {
      options = clone(options);
      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
      result = interpolate(result, options);
    }

    return result;
  }; // ### polyglot.has(key)
  //
  // Check if polyglot has a translation for given key


  Polyglot.prototype.has = function (key) {
    return key in this.phrases;
  }; // #### Pluralization methods
  // The string that separates the different phrase possibilities.


  var delimeter = '||||'; // Mapping from pluralization group plural logic.

  var pluralTypes = {
    chinese: function chinese(n) {
      return 0;
    },
    german: function german(n) {
      return n !== 1 ? 1 : 0;
    },
    french: function french(n) {
      return n > 1 ? 1 : 0;
    },
    russian: function russian(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    czech: function czech(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    },
    polish: function polish(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function icelandic(n) {
      return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
    }
  }; // Mapping from pluralization group to individual locales.

  var pluralTypeToLanguages = {
    chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['hr', 'ru'],
    czech: ['cs', 'sk'],
    polish: ['pl'],
    icelandic: ['is']
  };

  function langToTypeMap(mapping) {
    var type,
        langs,
        l,
        ret = {};

    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];

        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }

    return ret;
  } // Trim a string.


  var trimRe = /^\s+|\s+$/g;

  function trim(str) {
    return replace.call(str, trimRe, '');
  } // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.


  function choosePluralForm(text, locale, count) {
    var ret, texts, chosenText;

    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }

    return ret;
  }

  function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  } // ### interpolate
  //
  // Does the dirty work. Creates a `RegExp` object for each
  // interpolation placeholder.


  var dollarRegex = /\$/g;
  var dollarBillsYall = '$$$$';

  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // Ensure replacement value is escaped to prevent special $-prefixed
        // regex replace tokens. the "$$$$" is needed because each "$" needs to
        // be escaped with "$" itself, and we need two in the resulting output.
        var replacement = options[arg];

        if (typeof replacement === 'string') {
          replacement = replace.call(options[arg], dollarRegex, dollarBillsYall);
        } // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.


        phrase = replace.call(phrase, new RegExp('%\\{' + arg + '\\}', 'g'), replacement);
      }
    }

    return phrase;
  } // ### warn
  //
  // Provides a warning in the console if a phrase key is missing.


  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  } // ### clone
  //
  // Clone an object.


  function clone(source) {
    var ret = {};

    for (var prop in source) {
      ret[prop] = source[prop];
    }

    return ret;
  }

  return Polyglot;
});

cc._RF.pop();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXExhb0h1SmlcXG1vZHVsZVxcaTE4blxccG9seWdsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQyxXQUFTLElBQVQsRUFBZSxPQUFmLEVBQXdCO0FBQ3ZCLE1BQUksT0FBTyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE1BQU0sQ0FBQyxHQUEzQyxFQUFnRDtBQUM5QyxJQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUssWUFBVztBQUNwQixhQUFPLE9BQU8sQ0FBQyxJQUFELENBQWQ7QUFDRCxLQUZLLENBQU47QUFHRCxHQUpELE1BSU8sSUFBSSxPQUFPLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDdEMsSUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQUFPLENBQUMsSUFBRCxDQUF4QjtBQUNELEdBRk0sTUFFQTtBQUNMLElBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsT0FBTyxDQUFDLElBQUQsQ0FBdkI7QUFDRDtBQUNGLENBVkEsRUFVQyxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0MsTUFBaEMsU0FWRCxFQVVnRCxVQUFTLElBQVQsRUFBZTtBQUM5RDs7QUFFQSxNQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUCxDQUFpQixPQUEvQixDQUg4RCxDQUs5RDs7QUFDQSxXQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkI7QUFDekIsSUFBQSxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQXJCO0FBQ0EsU0FBSyxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUssTUFBTCxDQUFZLE9BQU8sQ0FBQyxPQUFSLElBQW1CLEVBQS9CO0FBQ0EsU0FBSyxhQUFMLEdBQXFCLE9BQU8sQ0FBQyxNQUFSLElBQWtCLElBQXZDO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLENBQUMsQ0FB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QWEsTUFBYixFQUFxQixJQUFJLE1BQUosQ0FBVyxTQUFPLEdBQVAsR0FBVyxLQUF0QixFQUE2QixHQUE3QixDQUFyQixFQUF3RCxXQUF4RCxDQUFUO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPLE1BQVA7QUFDRCxHQXJTNkQsQ0F1UzlEO0FBQ0E7QUFDQTs7O0FBQ0EsV0FBUyxJQUFULENBQWMsT0FBZCxFQUF1QjtBQUNyQixJQUFBLElBQUksQ0FBQyxPQUFMLElBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBN0IsSUFBcUMsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGNBQWMsT0FBaEMsQ0FBckM7QUFDRCxHQTVTNkQsQ0E4UzlEO0FBQ0E7QUFDQTs7O0FBQ0EsV0FBUyxLQUFULENBQWUsTUFBZixFQUF1QjtBQUNyQixRQUFJLEdBQUcsR0FBRyxFQUFWOztBQUNBLFNBQUssSUFBSSxJQUFULElBQWlCLE1BQWpCLEVBQXlCO0FBQ3ZCLE1BQUEsR0FBRyxDQUFDLElBQUQsQ0FBSCxHQUFZLE1BQU0sQ0FBQyxJQUFELENBQWxCO0FBQ0Q7O0FBQ0QsV0FBTyxHQUFQO0FBQ0Q7O0FBRUQsU0FBTyxRQUFQO0FBQ0QsQ0FwVUEsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=