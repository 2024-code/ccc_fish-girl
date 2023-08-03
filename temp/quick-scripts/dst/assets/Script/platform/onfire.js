
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/platform/onfire.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0da11+4hDJDh44EiJNcsNWb', 'onfire');
// Script/platform/onfire.js

"use strict";

/**
  Copyright (c) 2016 hustcc http://www.atool.org/
  License: MIT 
  https://github.com/hustcc/onfire.js
**/

/* jshint expr: true */
!function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();else root.onfire = factory();
}(typeof window !== 'undefined' ? window : void 0, function () {
  var __onfireEvents = {},
      __cnt = 0,
      // evnet counter
  string_str = 'string',
      function_str = 'function',
      hasOwnKey = Function.call.bind(Object.hasOwnProperty),
      slice = Function.call.bind(Array.prototype.slice);

  function _bind(eventName, callback, is_one, context) {
    if (typeof eventName !== string_str || typeof callback !== function_str) {
      throw new Error('args: ' + string_str + ', ' + function_str + '');
    }

    if (!hasOwnKey(__onfireEvents, eventName)) {
      __onfireEvents[eventName] = {};
    }

    __onfireEvents[eventName][++__cnt] = [callback, is_one, context];
    return [eventName, __cnt];
  }

  function _each(obj, callback) {
    for (var key in obj) {
      if (hasOwnKey(obj, key)) callback(key, obj[key]);
    }
  }
  /**
   *  onfire.on( event, func, context ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered, will return an event Object
  **/


  function on(eventName, callback, context) {
    return _bind(eventName, callback, 0, context);
  }
  /**
   *  onfire.one( event, func, context ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered only once(can be triggered for one time), will return an event Object
  **/


  function one(eventName, callback, context) {
    return _bind(eventName, callback, 1, context);
  }

  function _fire_func(eventName, args) {
    if (hasOwnKey(__onfireEvents, eventName)) {
      _each(__onfireEvents[eventName], function (key, item) {
        item[0].apply(item[2], args); // do the function

        if (item[1]) delete __onfireEvents[eventName][key]; // when is one, delete it after triggle
      });
    }
  }
  /**
   *  onfire.fire( event[, data1 [,data2] ... ] )
   *  - event (String): The event name to publish
   *  - data...: The data to pass to subscribers / callbacks
   *  Async Publishes / fires the the event, passing the data to it's subscribers / callbacks
  **/


  function fire(eventName) {
    // fire events
    var args = slice(arguments, 1);
    setTimeout(function () {
      _fire_func(eventName, args);
    });
  }
  /**
   *  onfire.fireSync( event[, data1 [,data2] ... ] )
   *  - event (String): The event name to publish
   *  - data...: The data to pass to subscribers / callbacks
   *  Sync Publishes / fires the the event, passing the data to it's subscribers / callbacks
  **/


  function fireSync(eventName) {
    _fire_func(eventName, slice(arguments, 1));
  }
  /**
   * onfire.un( event ) -> Boolean
   *  - event (String / Object): The message to publish
   * When passed a event Object, removes a specific subscription.
   * When passed event name String, removes all subscriptions for that event name(hierarchy)
  *
   * Unsubscribe / unbind an event or event object.
   *
   * Examples
   *
   *  // Example 1 - unsubscribing with a event object
   *  var event_object = onfire.on('my_event', myFunc);
   *  onfire.un(event_object);
   *
   *  // Example 2 - unsubscribing with a event name string
   *  onfire.un('my_event');
  **/


  function un(event) {
    var eventName,
        key,
        r = false,
        type = typeof event;

    if (type === string_str) {
      // cancel the event name if exist
      if (hasOwnKey(__onfireEvents, event)) {
        delete __onfireEvents[event];
        return true;
      }

      return false;
    } else if (type === 'object') {
      eventName = event[0];
      key = event[1];

      if (hasOwnKey(__onfireEvents, eventName) && hasOwnKey(__onfireEvents[eventName], key)) {
        delete __onfireEvents[eventName][key];
        return true;
      } // can not find this event, return false


      return false;
    } else if (type === function_str) {
      _each(__onfireEvents, function (key_1, item_1) {
        _each(item_1, function (key_2, item_2) {
          if (item_2[0] === event) {
            delete __onfireEvents[key_1][key_2];
            r = true;
          }
        });
      });

      return r;
    }

    return true;
  }
  /**
   *  onfire.clear()
   *  Clears all subscriptions
  **/


  function clear() {
    __onfireEvents = {};
  }

  return {
    on: on,
    one: one,
    un: un,
    fire: fire,
    fireSync: fireSync,
    clear: clear
  };
});

cc._RF.pop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwbGF0Zm9ybVxcb25maXJlLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9uZmlyZSIsIndpbmRvdyIsIl9fb25maXJlRXZlbnRzIiwiX19jbnQiLCJzdHJpbmdfc3RyIiwiZnVuY3Rpb25fc3RyIiwiaGFzT3duS2V5IiwiRnVuY3Rpb24iLCJjYWxsIiwiYmluZCIsIk9iamVjdCIsImhhc093blByb3BlcnR5Iiwic2xpY2UiLCJBcnJheSIsInByb3RvdHlwZSIsIl9iaW5kIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJpc19vbmUiLCJjb250ZXh0IiwiRXJyb3IiLCJfZWFjaCIsIm9iaiIsImtleSIsIm9uIiwib25lIiwiX2ZpcmVfZnVuYyIsImFyZ3MiLCJpdGVtIiwiYXBwbHkiLCJmaXJlIiwiYXJndW1lbnRzIiwic2V0VGltZW91dCIsImZpcmVTeW5jIiwidW4iLCJldmVudCIsInIiLCJ0eXBlIiwia2V5XzEiLCJpdGVtXzEiLCJrZXlfMiIsIml0ZW1fMiIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxDQUFDLFVBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3RCLE1BQUksT0FBT0MsTUFBUCxLQUFrQixRQUFsQixJQUE4QkEsTUFBTSxDQUFDQyxPQUF6QyxFQUNFRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLE9BQU8sRUFBeEIsQ0FERixLQUdFRCxJQUFJLENBQUNJLE1BQUwsR0FBY0gsT0FBTyxFQUFyQjtBQUNILENBTEYsQ0FLRyxPQUFPSSxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxTQUxILEVBS2tELFlBQVk7QUFDM0QsTUFBSUMsY0FBYyxHQUFHLEVBQXJCO0FBQUEsTUFDQ0MsS0FBSyxHQUFHLENBRFQ7QUFBQSxNQUNZO0FBQ1hDLEVBQUFBLFVBQVUsR0FBRyxR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RCxLQVRJLE1BVUEsSUFBSWMsSUFBSSxLQUFLaEMsWUFBYixFQUEyQjtBQUM5QmdCLE1BQUFBLEtBQUssQ0FBQ25CLGNBQUQsRUFBaUIsVUFBU29DLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQzVDbEIsUUFBQUEsS0FBSyxDQUFDa0IsTUFBRCxFQUFTLFVBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ3BDLGNBQUlBLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBY04sS0FBbEIsRUFBeUI7QUFDdkIsbUJBQU9qQyxjQUFjLENBQUNvQyxLQUFELENBQWQsQ0FBc0JFLEtBQXRCLENBQVA7QUFDQUosWUFBQUEsQ0FBQyxHQUFHLElBQUo7QUFDRDtBQUNGLFNBTEksQ0FBTDtBQU1ELE9BUEksQ0FBTDs7QUFRQSxhQUFPQSxDQUFQO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0Q7QUFDRDtBQUNKO0FBQ0E7QUFDQTs7O0FBQ0ksV0FBU00sS0FBVCxHQUFpQjtBQUNmeEMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0Q7O0FBQ0QsU0FBTztBQUNMc0IsSUFBQUEsRUFBRSxFQUFFQSxFQURDO0FBRUxDLElBQUFBLEdBQUcsRUFBRUEsR0FGQTtBQUdMUyxJQUFBQSxFQUFFLEVBQUVBLEVBSEM7QUFJTEosSUFBQUEsSUFBSSxFQUFFQSxJQUpEO0FBS0xHLElBQUFBLFFBQVEsRUFBRUEsUUFMTDtBQU1MUyxJQUFBQSxLQUFLLEVBQUVBO0FBTkYsR0FBUDtBQVFELENBOUlGLENBQUQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gIENvcHlyaWdodCAoYykgMjAxNiBodXN0Y2MgaHR0cDovL3d3dy5hdG9vbC5vcmcvXHJcbiAgTGljZW5zZTogTUlUIFxyXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9odXN0Y2Mvb25maXJlLmpzXHJcbioqL1xyXG4vKiBqc2hpbnQgZXhwcjogdHJ1ZSAqLyBcclxuIWZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpXHJcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG4gICAgZWxzZVxyXG4gICAgICByb290Lm9uZmlyZSA9IGZhY3RvcnkoKTtcclxuICB9KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9fb25maXJlRXZlbnRzID0ge30sXHJcbiAgICAgX19jbnQgPSAwLCAvLyBldm5ldCBjb3VudGVyXHJcbiAgICAgc3RyaW5nX3N0ciA9ICdzdHJpbmcnLFxyXG4gICAgIGZ1bmN0aW9uX3N0ciA9ICdmdW5jdGlvbicsXHJcbiAgICAgaGFzT3duS2V5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5oYXNPd25Qcm9wZXJ0eSksXHJcbiAgICAgc2xpY2UgPSBGdW5jdGlvbi5jYWxsLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlKTtcclxuICBcclxuICAgIGZ1bmN0aW9uIF9iaW5kKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGlzX29uZSwgY29udGV4dCkge1xyXG4gICAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gc3RyaW5nX3N0ciB8fCB0eXBlb2YgY2FsbGJhY2sgIT09IGZ1bmN0aW9uX3N0cikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJnczogJytzdHJpbmdfc3RyKycsICcrZnVuY3Rpb25fc3RyKycnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoISBoYXNPd25LZXkoX19vbmZpcmVFdmVudHMsIGV2ZW50TmFtZSkpIHtcclxuICAgICAgICBfX29uZmlyZUV2ZW50c1tldmVudE5hbWVdID0ge307XHJcbiAgICAgIH1cclxuICAgICAgX19vbmZpcmVFdmVudHNbZXZlbnROYW1lXVsrK19fY250XSA9IFtjYWxsYmFjaywgaXNfb25lLCBjb250ZXh0XTtcclxuICBcclxuICAgICAgcmV0dXJuIFtldmVudE5hbWUsIF9fY250XTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIF9lYWNoKG9iaiwgY2FsbGJhY2spIHtcclxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChoYXNPd25LZXkob2JqLCBrZXkpKSBjYWxsYmFjayhrZXksIG9ialtrZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgb25maXJlLm9uKCBldmVudCwgZnVuYywgY29udGV4dCApIC0+IE9iamVjdFxyXG4gICAgICogIC0gZXZlbnQgKFN0cmluZyk6IFRoZSBldmVudCBuYW1lIHRvIHN1YnNjcmliZSAvIGJpbmQgdG9cclxuICAgICAqICAtIGZ1bmMgKEZ1bmN0aW9uKTogVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhIG5ldyBldmVudCBpcyBwdWJsaXNoZWQgLyB0cmlnZ2VyZWRcclxuICAgICAqICBCaW5kIC8gc3Vic2NyaWJlIHRoZSBldmVudCBuYW1lLCBhbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gZXZlbnQgaXMgdHJpZ2dlcmVkLCB3aWxsIHJldHVybiBhbiBldmVudCBPYmplY3RcclxuICAgICoqL1xyXG4gICAgZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gX2JpbmQoZXZlbnROYW1lLCBjYWxsYmFjaywgMCwgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICBvbmZpcmUub25lKCBldmVudCwgZnVuYywgY29udGV4dCApIC0+IE9iamVjdFxyXG4gICAgICogIC0gZXZlbnQgKFN0cmluZyk6IFRoZSBldmVudCBuYW1lIHRvIHN1YnNjcmliZSAvIGJpbmQgdG9cclxuICAgICAqICAtIGZ1bmMgKEZ1bmN0aW9uKTogVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhIG5ldyBldmVudCBpcyBwdWJsaXNoZWQgLyB0cmlnZ2VyZWRcclxuICAgICAqICBCaW5kIC8gc3Vic2NyaWJlIHRoZSBldmVudCBuYW1lLCBhbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gZXZlbnQgaXMgdHJpZ2dlcmVkIG9ubHkgb25jZShjYW4gYmUgdHJpZ2dlcmVkIGZvciBvbmUgdGltZSksIHdpbGwgcmV0dXJuIGFuIGV2ZW50IE9iamVjdFxyXG4gICAgKiovXHJcbiAgICBmdW5jdGlvbiBvbmUoZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gX2JpbmQoZXZlbnROYW1lLCBjYWxsYmFjaywgMSwgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBfZmlyZV9mdW5jKGV2ZW50TmFtZSwgYXJncykge1xyXG4gICAgICBpZiAoaGFzT3duS2V5KF9fb25maXJlRXZlbnRzLCBldmVudE5hbWUpKSB7XHJcbiAgICAgICAgX2VhY2goX19vbmZpcmVFdmVudHNbZXZlbnROYW1lXSwgZnVuY3Rpb24oa2V5LCBpdGVtKSB7XHJcbiAgICAgICAgICBpdGVtWzBdLmFwcGx5KGl0ZW1bMl0sIGFyZ3MpOyAvLyBkbyB0aGUgZnVuY3Rpb25cclxuICAgICAgICAgIGlmIChpdGVtWzFdKSBkZWxldGUgX19vbmZpcmVFdmVudHNbZXZlbnROYW1lXVtrZXldOyAvLyB3aGVuIGlzIG9uZSwgZGVsZXRlIGl0IGFmdGVyIHRyaWdnbGVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgb25maXJlLmZpcmUoIGV2ZW50WywgZGF0YTEgWyxkYXRhMl0gLi4uIF0gKVxyXG4gICAgICogIC0gZXZlbnQgKFN0cmluZyk6IFRoZSBldmVudCBuYW1lIHRvIHB1Ymxpc2hcclxuICAgICAqICAtIGRhdGEuLi46IFRoZSBkYXRhIHRvIHBhc3MgdG8gc3Vic2NyaWJlcnMgLyBjYWxsYmFja3NcclxuICAgICAqICBBc3luYyBQdWJsaXNoZXMgLyBmaXJlcyB0aGUgdGhlIGV2ZW50LCBwYXNzaW5nIHRoZSBkYXRhIHRvIGl0J3Mgc3Vic2NyaWJlcnMgLyBjYWxsYmFja3NcclxuICAgICoqL1xyXG4gICAgZnVuY3Rpb24gZmlyZShldmVudE5hbWUpIHtcclxuICAgICAgLy8gZmlyZSBldmVudHNcclxuICAgICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDEpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfZmlyZV9mdW5jKGV2ZW50TmFtZSwgYXJncyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgb25maXJlLmZpcmVTeW5jKCBldmVudFssIGRhdGExIFssZGF0YTJdIC4uLiBdIClcclxuICAgICAqICAtIGV2ZW50IChTdHJpbmcpOiBUaGUgZXZlbnQgbmFtZSB0byBwdWJsaXNoXHJcbiAgICAgKiAgLSBkYXRhLi4uOiBUaGUgZGF0YSB0byBwYXNzIHRvIHN1YnNjcmliZXJzIC8gY2FsbGJhY2tzXHJcbiAgICAgKiAgU3luYyBQdWJsaXNoZXMgLyBmaXJlcyB0aGUgdGhlIGV2ZW50LCBwYXNzaW5nIHRoZSBkYXRhIHRvIGl0J3Mgc3Vic2NyaWJlcnMgLyBjYWxsYmFja3NcclxuICAgICoqL1xyXG4gICAgZnVuY3Rpb24gZmlyZVN5bmMoZXZlbnROYW1lKSB7XHJcbiAgICAgIF9maXJlX2Z1bmMoZXZlbnROYW1lLCBzbGljZShhcmd1bWVudHMsIDEpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogb25maXJlLnVuKCBldmVudCApIC0+IEJvb2xlYW5cclxuICAgICAqICAtIGV2ZW50IChTdHJpbmcgLyBPYmplY3QpOiBUaGUgbWVzc2FnZSB0byBwdWJsaXNoXHJcbiAgICAgKiBXaGVuIHBhc3NlZCBhIGV2ZW50IE9iamVjdCwgcmVtb3ZlcyBhIHNwZWNpZmljIHN1YnNjcmlwdGlvbi5cclxuICAgICAqIFdoZW4gcGFzc2VkIGV2ZW50IG5hbWUgU3RyaW5nLCByZW1vdmVzIGFsbCBzdWJzY3JpcHRpb25zIGZvciB0aGF0IGV2ZW50IG5hbWUoaGllcmFyY2h5KVxyXG4gICAgKlxyXG4gICAgICogVW5zdWJzY3JpYmUgLyB1bmJpbmQgYW4gZXZlbnQgb3IgZXZlbnQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEV4YW1wbGVzXHJcbiAgICAgKlxyXG4gICAgICogIC8vIEV4YW1wbGUgMSAtIHVuc3Vic2NyaWJpbmcgd2l0aCBhIGV2ZW50IG9iamVjdFxyXG4gICAgICogIHZhciBldmVudF9vYmplY3QgPSBvbmZpcmUub24oJ215X2V2ZW50JywgbXlGdW5jKTtcclxuICAgICAqICBvbmZpcmUudW4oZXZlbnRfb2JqZWN0KTtcclxuICAgICAqXHJcbiAgICAgKiAgLy8gRXhhbXBsZSAyIC0gdW5zdWJzY3JpYmluZyB3aXRoIGEgZXZlbnQgbmFtZSBzdHJpbmdcclxuICAgICAqICBvbmZpcmUudW4oJ215X2V2ZW50Jyk7XHJcbiAgICAqKi9cclxuICAgIGZ1bmN0aW9uIHVuKGV2ZW50KSB7XHJcbiAgICAgIHZhciBldmVudE5hbWUsIGtleSwgciA9IGZhbHNlLCB0eXBlID0gdHlwZW9mIGV2ZW50O1xyXG4gICAgICBpZiAodHlwZSA9PT0gc3RyaW5nX3N0cikge1xyXG4gICAgICAgIC8vIGNhbmNlbCB0aGUgZXZlbnQgbmFtZSBpZiBleGlzdFxyXG4gICAgICAgIGlmIChoYXNPd25LZXkoX19vbmZpcmVFdmVudHMsIGV2ZW50KSkge1xyXG4gICAgICAgICAgZGVsZXRlIF9fb25maXJlRXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBldmVudE5hbWUgPSBldmVudFswXTtcclxuICAgICAgICBrZXkgPSBldmVudFsxXTtcclxuICAgICAgICBpZiAoaGFzT3duS2V5KF9fb25maXJlRXZlbnRzLCBldmVudE5hbWUpICYmIGhhc093bktleShfX29uZmlyZUV2ZW50c1tldmVudE5hbWVdLCBrZXkpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX19vbmZpcmVFdmVudHNbZXZlbnROYW1lXVtrZXldO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNhbiBub3QgZmluZCB0aGlzIGV2ZW50LCByZXR1cm4gZmFsc2VcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gZnVuY3Rpb25fc3RyKSB7XHJcbiAgICAgICAgX2VhY2goX19vbmZpcmVFdmVudHMsIGZ1bmN0aW9uKGtleV8xLCBpdGVtXzEpIHtcclxuICAgICAgICAgIF9lYWNoKGl0ZW1fMSwgZnVuY3Rpb24oa2V5XzIsIGl0ZW1fMikge1xyXG4gICAgICAgICAgICBpZiAoaXRlbV8yWzBdID09PSBldmVudCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSBfX29uZmlyZUV2ZW50c1trZXlfMV1ba2V5XzJdO1xyXG4gICAgICAgICAgICAgIHIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIG9uZmlyZS5jbGVhcigpXHJcbiAgICAgKiAgQ2xlYXJzIGFsbCBzdWJzY3JpcHRpb25zXHJcbiAgICAqKi9cclxuICAgIGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgICBfX29uZmlyZUV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb246IG9uLFxyXG4gICAgICBvbmU6IG9uZSxcclxuICAgICAgdW46IHVuLFxyXG4gICAgICBmaXJlOiBmaXJlLFxyXG4gICAgICBmaXJlU3luYzogZmlyZVN5bmMsXHJcbiAgICAgIGNsZWFyOiBjbGVhclxyXG4gICAgfTtcclxuICB9KTsiXX0=