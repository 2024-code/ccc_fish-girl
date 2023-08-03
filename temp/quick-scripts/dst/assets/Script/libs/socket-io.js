
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/libs/socket-io.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (global){
"use strict";
cc._RF.push(module, '9d1c7GiDHRJxZ5B3fJ0Q4W3', 'socket-io');
// Script/libs/socket-io.js

"use strict";

if (!CC_JSB && !cc.sys.isNative) {
  (function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;

      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }

      g.io = f();
    }
  })(function () {
    var define, module, exports;
    return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }

          var l = n[o] = {
            exports: {}
          };
          t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }

        return n[o].exports;
      }

      var i = typeof require == "function" && require;

      for (var o = 0; o < r.length; o++) {
        s(r[o]);
      }

      return s;
    }({
      1: [function (_dereq_, module, exports) {
        module.exports = _dereq_('./lib/');
      }, {
        "./lib/": 2
      }],
      2: [function (_dereq_, module, exports) {
        module.exports = _dereq_('./socket');
        /**
         * Exports parser
         *
         * @api public
         *
         */

        module.exports.parser = _dereq_('engine.io-parser');
      }, {
        "./socket": 3,
        "engine.io-parser": 19
      }],
      3: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */
          var transports = _dereq_('./transports');

          var Emitter = _dereq_('component-emitter');

          var debug = _dereq_('debug')('engine.io-client:socket');

          var index = _dereq_('indexof');

          var parser = _dereq_('engine.io-parser');

          var parseuri = _dereq_('parseuri');

          var parsejson = _dereq_('parsejson');

          var parseqs = _dereq_('parseqs');
          /**
           * Module exports.
           */


          module.exports = Socket;
          /**
           * Noop function.
           *
           * @api private
           */

          function noop() {}
          /**
           * Socket constructor.
           *
           * @param {String|Object} uri or options
           * @param {Object} options
           * @api public
           */


          function Socket(uri, opts) {
            if (!(this instanceof Socket)) return new Socket(uri, opts);
            opts = opts || {};

            if (uri && 'object' == typeof uri) {
              opts = uri;
              uri = null;
            }

            if (uri) {
              uri = parseuri(uri);
              opts.hostname = uri.host;
              opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
              opts.port = uri.port;
              if (uri.query) opts.query = uri.query;
            } else if (opts.host) {
              opts.hostname = parseuri(opts.host).host;
            }

            this.secure = null != opts.secure ? opts.secure : global.location && 'https:' == location.protocol;

            if (opts.hostname && !opts.port) {
              // if no port is specified manually, use the protocol default
              opts.port = this.secure ? '443' : '80';
            }

            this.agent = opts.agent || false;
            this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
            this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
            this.query = opts.query || {};
            if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
            this.upgrade = false !== opts.upgrade;
            this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
            this.forceJSONP = !!opts.forceJSONP;
            this.jsonp = false !== opts.jsonp;
            this.forceBase64 = !!opts.forceBase64;
            this.enablesXDR = !!opts.enablesXDR;
            this.timestampParam = opts.timestampParam || 't';
            this.timestampRequests = opts.timestampRequests;
            this.transports = opts.transports || ['polling', 'websocket'];
            this.readyState = '';
            this.writeBuffer = [];
            this.policyPort = opts.policyPort || 843;
            this.rememberUpgrade = opts.rememberUpgrade || false;
            this.binaryType = null;
            this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
            this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;
            if (true === this.perMessageDeflate) this.perMessageDeflate = {};

            if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
              this.perMessageDeflate.threshold = 1024;
            } // SSL options for Node.js client


            this.pfx = opts.pfx || null;
            this.key = opts.key || null;
            this.passphrase = opts.passphrase || null;
            this.cert = opts.cert || null;
            this.ca = opts.ca || null;
            this.ciphers = opts.ciphers || null;
            this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized; // other options for Node.js client

            var freeGlobal = typeof global == 'object' && global;

            if (freeGlobal.global === freeGlobal) {
              if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
                this.extraHeaders = opts.extraHeaders;
              }
            }

            this.open();
          }

          Socket.priorWebsocketSuccess = false;
          /**
           * Mix in `Emitter`.
           */

          Emitter(Socket.prototype);
          /**
           * Protocol version.
           *
           * @api public
           */

          Socket.protocol = parser.protocol; // this is an int

          /**
           * Expose deps for legacy compatibility
           * and standalone browser access.
           */

          Socket.Socket = Socket;
          Socket.Transport = _dereq_('./transport');
          Socket.transports = _dereq_('./transports');
          Socket.parser = _dereq_('engine.io-parser');
          /**
           * Creates transport of the given type.
           *
           * @param {String} transport name
           * @return {Transport}
           * @api private
           */

          Socket.prototype.createTransport = function (name) {
            debug('creating transport "%s"', name);
            var query = clone(this.query); // append engine.io protocol identifier

            query.EIO = parser.protocol; // transport name

            query.transport = name; // session id if we already have one

            if (this.id) query.sid = this.id;
            var transport = new transports[name]({
              agent: this.agent,
              hostname: this.hostname,
              port: this.port,
              secure: this.secure,
              path: this.path,
              query: query,
              forceJSONP: this.forceJSONP,
              jsonp: this.jsonp,
              forceBase64: this.forceBase64,
              enablesXDR: this.enablesXDR,
              timestampRequests: this.timestampRequests,
              timestampParam: this.timestampParam,
              policyPort: this.policyPort,
              socket: this,
              pfx: this.pfx,
              key: this.key,
              passphrase: this.passphrase,
              cert: this.cert,
              ca: this.ca,
              ciphers: this.ciphers,
              rejectUnauthorized: this.rejectUnauthorized,
              perMessageDeflate: this.perMessageDeflate,
              extraHeaders: this.extraHeaders
            });
            return transport;
          };

          function clone(obj) {
            var o = {};

            for (var i in obj) {
              if (obj.hasOwnProperty(i)) {
                o[i] = obj[i];
              }
            }

            return o;
          }
          /**
           * Initializes transport to use and starts probe.
           *
           * @api private
           */


          Socket.prototype.open = function () {
            var transport;

            if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
              transport = 'websocket';
            } else if (0 === this.transports.length) {
              // Emit error on next tick so it can be listened to
              var self = this;
              setTimeout(function () {
                self.emit('error', 'No transports available');
              }, 0);
              return;
            } else {
              transport = this.transports[0];
            }

            this.readyState = 'opening'; // Retry with the next transport if the transport is disabled (jsonp: false)

            try {
              transport = this.createTransport(transport);
            } catch (e) {
              this.transports.shift();
              this.open();
              return;
            }

            transport.open();
            this.setTransport(transport);
          };
          /**
           * Sets the current transport. Disables the existing one (if any).
           *
           * @api private
           */


          Socket.prototype.setTransport = function (transport) {
            debug('setting transport %s', transport.name);
            var self = this;

            if (this.transport) {
              debug('clearing existing transport %s', this.transport.name);
              this.transport.removeAllListeners();
            } // set up transport


            this.transport = transport; // set up transport listeners

            transport.on('drain', function () {
              self.onDrain();
            }).on('packet', function (packet) {
              self.onPacket(packet);
            }).on('error', function (e) {
              self.onError(e);
            }).on('close', function () {
              self.onClose('transport close');
            });
          };
          /**
           * Probes a transport.
           *
           * @param {String} transport name
           * @api private
           */


          Socket.prototype.probe = function (name) {
            debug('probing transport "%s"', name);
            var transport = this.createTransport(name, {
              probe: 1
            }),
                failed = false,
                self = this;
            Socket.priorWebsocketSuccess = false;

            function onTransportOpen() {
              if (self.onlyBinaryUpgrades) {
                var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                failed = failed || upgradeLosesBinary;
              }

              if (failed) return;
              debug('probe transport "%s" opened', name);
              transport.send([{
                type: 'ping',
                data: 'probe'
              }]);
              transport.once('packet', function (msg) {
                if (failed) return;

                if ('pong' == msg.type && 'probe' == msg.data) {
                  debug('probe transport "%s" pong', name);
                  self.upgrading = true;
                  self.emit('upgrading', transport);
                  if (!transport) return;
                  Socket.priorWebsocketSuccess = 'websocket' == transport.name;
                  debug('pausing current transport "%s"', self.transport.name);
                  self.transport.pause(function () {
                    if (failed) return;
                    if ('closed' == self.readyState) return;
                    debug('changing transport and sending upgrade packet');
                    cleanup();
                    self.setTransport(transport);
                    transport.send([{
                      type: 'upgrade'
                    }]);
                    self.emit('upgrade', transport);
                    transport = null;
                    self.upgrading = false;
                    self.flush();
                  });
                } else {
                  debug('probe transport "%s" failed', name);
                  var err = new Error('probe error');
                  err.transport = transport.name;
                  self.emit('upgradeError', err);
                }
              });
            }

            function freezeTransport() {
              if (failed) return; // Any callback called by transport should be ignored since now

              failed = true;
              cleanup();
              transport.close();
              transport = null;
            } //Handle any error that happens while probing


            function onerror(err) {
              var error = new Error('probe error: ' + err);
              error.transport = transport.name;
              freezeTransport();
              debug('probe transport "%s" failed because of error: %s', name, err);
              self.emit('upgradeError', error);
            }

            function onTransportClose() {
              onerror("transport closed");
            } //When the socket is closed while we're probing


            function onclose() {
              onerror("socket closed");
            } //When the socket is upgraded while we're probing


            function onupgrade(to) {
              if (transport && to.name != transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
              }
            } //Remove all listeners on the transport and on self


            function cleanup() {
              transport.removeListener('open', onTransportOpen);
              transport.removeListener('error', onerror);
              transport.removeListener('close', onTransportClose);
              self.removeListener('close', onclose);
              self.removeListener('upgrading', onupgrade);
            }

            transport.once('open', onTransportOpen);
            transport.once('error', onerror);
            transport.once('close', onTransportClose);
            this.once('close', onclose);
            this.once('upgrading', onupgrade);
            transport.open();
          };
          /**
           * Called when connection is deemed open.
           *
           * @api public
           */


          Socket.prototype.onOpen = function () {
            debug('socket open');
            this.readyState = 'open';
            Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
            this.emit('open');
            this.flush(); // we check for `readyState` in case an `open`
            // listener already closed the socket

            if ('open' == this.readyState && this.upgrade && this.transport.pause) {
              debug('starting upgrade probes');

              for (var i = 0, l = this.upgrades.length; i < l; i++) {
                this.probe(this.upgrades[i]);
              }
            }
          };
          /**
           * Handles a packet.
           *
           * @api private
           */


          Socket.prototype.onPacket = function (packet) {
            if ('opening' == this.readyState || 'open' == this.readyState) {
              debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
              this.emit('packet', packet); // Socket is live - any packet counts

              this.emit('heartbeat');

              switch (packet.type) {
                case 'open':
                  this.onHandshake(parsejson(packet.data));
                  break;

                case 'pong':
                  this.setPing();
                  this.emit('pong');
                  break;

                case 'error':
                  var err = new Error('server error');
                  err.code = packet.data;
                  this.onError(err);
                  break;

                case 'message':
                  this.emit('data', packet.data);
                  this.emit('message', packet.data);
                  break;
              }
            } else {
              debug('packet received with socket readyState "%s"', this.readyState);
            }
          };
          /**
           * Called upon handshake completion.
           *
           * @param {Object} handshake obj
           * @api private
           */


          Socket.prototype.onHandshake = function (data) {
            this.emit('handshake', data);
            this.id = data.sid;
            this.transport.query.sid = data.sid;
            this.upgrades = this.filterUpgrades(data.upgrades);
            this.pingInterval = data.pingInterval;
            this.pingTimeout = data.pingTimeout;
            this.onOpen(); // In case open handler closes socket

            if ('closed' == this.readyState) return;
            this.setPing(); // Prolong liveness of socket on heartbeat

            this.removeListener('heartbeat', this.onHeartbeat);
            this.on('heartbeat', this.onHeartbeat);
          };
          /**
           * Resets ping timeout.
           *
           * @api private
           */


          Socket.prototype.onHeartbeat = function (timeout) {
            clearTimeout(this.pingTimeoutTimer);
            var self = this;
            self.pingTimeoutTimer = setTimeout(function () {
              if ('closed' == self.readyState) return;
              self.onClose('ping timeout');
            }, timeout || self.pingInterval + self.pingTimeout);
          };
          /**
           * Pings server every `this.pingInterval` and expects response
           * within `this.pingTimeout` or closes connection.
           *
           * @api private
           */


          Socket.prototype.setPing = function () {
            var self = this;
            clearTimeout(self.pingIntervalTimer);
            self.pingIntervalTimer = setTimeout(function () {
              debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
              self.ping();
              self.onHeartbeat(self.pingTimeout);
            }, self.pingInterval);
          };
          /**
           * Sends a ping packet.
           *
           * @api private
           */


          Socket.prototype.ping = function () {
            var self = this;
            this.sendPacket('ping', function () {
              self.emit('ping');
            });
          };
          /**
           * Called on `drain` event
           *
           * @api private
           */


          Socket.prototype.onDrain = function () {
            this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
            // for example, when upgrading, upgrade packet is sent over,
            // and a nonzero prevBufferLen could cause problems on `drain`

            this.prevBufferLen = 0;

            if (0 === this.writeBuffer.length) {
              this.emit('drain');
            } else {
              this.flush();
            }
          };
          /**
           * Flush write buffers.
           *
           * @api private
           */


          Socket.prototype.flush = function () {
            if ('closed' != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
              debug('flushing %d packets in socket', this.writeBuffer.length);
              this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
              // splice writeBuffer and callbackBuffer on `drain`

              this.prevBufferLen = this.writeBuffer.length;
              this.emit('flush');
            }
          };
          /**
           * Sends a message.
           *
           * @param {String} message.
           * @param {Function} callback function.
           * @param {Object} options.
           * @return {Socket} for chaining.
           * @api public
           */


          Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
            this.sendPacket('message', msg, options, fn);
            return this;
          };
          /**
           * Sends a packet.
           *
           * @param {String} packet type.
           * @param {String} data.
           * @param {Object} options.
           * @param {Function} callback function.
           * @api private
           */


          Socket.prototype.sendPacket = function (type, data, options, fn) {
            if ('function' == typeof data) {
              fn = data;
              data = undefined;
            }

            if ('function' == typeof options) {
              fn = options;
              options = null;
            }

            if ('closing' == this.readyState || 'closed' == this.readyState) {
              return;
            }

            options = options || {};
            options.compress = false !== options.compress;
            var packet = {
              type: type,
              data: data,
              options: options
            };
            this.emit('packetCreate', packet);
            this.writeBuffer.push(packet);
            if (fn) this.once('flush', fn);
            this.flush();
          };
          /**
           * Closes the connection.
           *
           * @api private
           */


          Socket.prototype.close = function () {
            if ('opening' == this.readyState || 'open' == this.readyState) {
              this.readyState = 'closing';
              var self = this;

              if (this.writeBuffer.length) {
                this.once('drain', function () {
                  if (this.upgrading) {
                    waitForUpgrade();
                  } else {
                    close();
                  }
                });
              } else if (this.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            }

            function close() {
              self.onClose('forced close');
              debug('socket closing - telling transport to close');
              self.transport.close();
            }

            function cleanupAndClose() {
              self.removeListener('upgrade', cleanupAndClose);
              self.removeListener('upgradeError', cleanupAndClose);
              close();
            }

            function waitForUpgrade() {
              // wait for upgrade to finish since we can't send packets while pausing a transport
              self.once('upgrade', cleanupAndClose);
              self.once('upgradeError', cleanupAndClose);
            }

            return this;
          };
          /**
           * Called upon transport error
           *
           * @api private
           */


          Socket.prototype.onError = function (err) {
            debug('socket error %j', err);
            Socket.priorWebsocketSuccess = false;
            this.emit('error', err);
            this.onClose('transport error', err);
          };
          /**
           * Called upon transport close.
           *
           * @api private
           */


          Socket.prototype.onClose = function (reason, desc) {
            if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
              debug('socket close with reason: "%s"', reason);
              var self = this; // clear timers

              clearTimeout(this.pingIntervalTimer);
              clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport

              this.transport.removeAllListeners('close'); // ensure transport won't stay open

              this.transport.close(); // ignore further transport communication

              this.transport.removeAllListeners(); // set ready state

              this.readyState = 'closed'; // clear session id

              this.id = null; // emit close event

              this.emit('close', reason, desc); // clean buffers after, so users can still
              // grab the buffers on `close` event

              self.writeBuffer = [];
              self.prevBufferLen = 0;
            }
          };
          /**
           * Filters upgrades, returning only those matching client transports.
           *
           * @param {Array} server upgrades
           * @api private
           *
           */


          Socket.prototype.filterUpgrades = function (upgrades) {
            var filteredUpgrades = [];

            for (var i = 0, j = upgrades.length; i < j; i++) {
              if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
            }

            return filteredUpgrades;
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./transport": 4,
        "./transports": 5,
        "component-emitter": 15,
        "debug": 17,
        "engine.io-parser": 19,
        "indexof": 23,
        "parsejson": 26,
        "parseqs": 27,
        "parseuri": 28
      }],
      4: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var parser = _dereq_('engine.io-parser');

        var Emitter = _dereq_('component-emitter');
        /**
         * Module exports.
         */


        module.exports = Transport;
        /**
         * Transport abstract constructor.
         *
         * @param {Object} options.
         * @api private
         */

        function Transport(opts) {
          this.path = opts.path;
          this.hostname = opts.hostname;
          this.port = opts.port;
          this.secure = opts.secure;
          this.query = opts.query;
          this.timestampParam = opts.timestampParam;
          this.timestampRequests = opts.timestampRequests;
          this.readyState = '';
          this.agent = opts.agent || false;
          this.socket = opts.socket;
          this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client

          this.pfx = opts.pfx;
          this.key = opts.key;
          this.passphrase = opts.passphrase;
          this.cert = opts.cert;
          this.ca = opts.ca;
          this.ciphers = opts.ciphers;
          this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client

          this.extraHeaders = opts.extraHeaders;
        }
        /**
         * Mix in `Emitter`.
         */


        Emitter(Transport.prototype);
        /**
         * Emits an error.
         *
         * @param {String} str
         * @return {Transport} for chaining
         * @api public
         */

        Transport.prototype.onError = function (msg, desc) {
          var err = new Error(msg);
          err.type = 'TransportError';
          err.description = desc;
          this.emit('error', err);
          return this;
        };
        /**
         * Opens the transport.
         *
         * @api public
         */


        Transport.prototype.open = function () {
          if ('closed' == this.readyState || '' == this.readyState) {
            this.readyState = 'opening';
            this.doOpen();
          }

          return this;
        };
        /**
         * Closes the transport.
         *
         * @api private
         */


        Transport.prototype.close = function () {
          if ('opening' == this.readyState || 'open' == this.readyState) {
            this.doClose();
            this.onClose();
          }

          return this;
        };
        /**
         * Sends multiple packets.
         *
         * @param {Array} packets
         * @api private
         */


        Transport.prototype.send = function (packets) {
          if ('open' == this.readyState) {
            this.write(packets);
          } else {
            throw new Error('Transport not open');
          }
        };
        /**
         * Called upon open
         *
         * @api private
         */


        Transport.prototype.onOpen = function () {
          this.readyState = 'open';
          this.writable = true;
          this.emit('open');
        };
        /**
         * Called with data.
         *
         * @param {String} data
         * @api private
         */


        Transport.prototype.onData = function (data) {
          var packet = parser.decodePacket(data, this.socket.binaryType);
          this.onPacket(packet);
        };
        /**
         * Called with a decoded packet.
         */


        Transport.prototype.onPacket = function (packet) {
          this.emit('packet', packet);
        };
        /**
         * Called upon close.
         *
         * @api private
         */


        Transport.prototype.onClose = function () {
          this.readyState = 'closed';
          this.emit('close');
        };
      }, {
        "component-emitter": 15,
        "engine.io-parser": 19
      }],
      5: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies
           */
          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');

          var XHR = _dereq_('./polling-xhr');

          var JSONP = _dereq_('./polling-jsonp');

          var websocket = _dereq_('./websocket');
          /**
           * Export transports.
           */


          exports.polling = polling;
          exports.websocket = websocket;
          /**
           * Polling transport polymorphic constructor.
           * Decides on xhr vs jsonp based on feature detection.
           *
           * @api private
           */

          function polling(opts) {
            var xhr;
            var xd = false;
            var xs = false;
            var jsonp = false !== opts.jsonp;

            if (global.location) {
              var isSSL = 'https:' == location.protocol;
              var port = location.port; // some user agents have empty `location.port`

              if (!port) {
                port = isSSL ? 443 : 80;
              }

              xd = opts.hostname != location.hostname || port != opts.port;
              xs = opts.secure != isSSL;
            }

            opts.xdomain = xd;
            opts.xscheme = xs;
            xhr = new XMLHttpRequest(opts);

            if ('open' in xhr && !opts.forceJSONP) {
              return new XHR(opts);
            } else {
              if (!jsonp) throw new Error('JSONP disabled');
              return new JSONP(opts);
            }
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./polling-jsonp": 6,
        "./polling-xhr": 7,
        "./websocket": 9,
        "xmlhttprequest-ssl": 10
      }],
      6: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module requirements.
           */
          var Polling = _dereq_('./polling');

          var inherit = _dereq_('component-inherit');
          /**
           * Module exports.
           */


          module.exports = JSONPPolling;
          /**
           * Cached regular expressions.
           */

          var rNewline = /\n/g;
          var rEscapedNewline = /\\n/g;
          /**
           * Global JSONP callbacks.
           */

          var callbacks;
          /**
           * Callbacks count.
           */

          var index = 0;
          /**
           * Noop.
           */

          function empty() {}
          /**
           * JSONP Polling constructor.
           *
           * @param {Object} opts.
           * @api public
           */


          function JSONPPolling(opts) {
            Polling.call(this, opts);
            this.query = this.query || {}; // define global callbacks array if not present
            // we do this here (lazily) to avoid unneeded global pollution

            if (!callbacks) {
              // we need to consider multiple engines in the same page
              if (!global.___eio) global.___eio = [];
              callbacks = global.___eio;
            } // callback identifier


            this.index = callbacks.length; // add callback to jsonp global

            var self = this;
            callbacks.push(function (msg) {
              self.onData(msg);
            }); // append to query string

            this.query.j = this.index; // prevent spurious errors from being emitted when the window is unloaded

            if (global.document && global.addEventListener) {
              global.addEventListener('beforeunload', function () {
                if (self.script) self.script.onerror = empty;
              }, false);
            }
          }
          /**
           * Inherits from Polling.
           */


          inherit(JSONPPolling, Polling);
          /*
           * JSONP only supports binary as base64 encoded strings
           */

          JSONPPolling.prototype.supportsBinary = false;
          /**
           * Closes the socket.
           *
           * @api private
           */

          JSONPPolling.prototype.doClose = function () {
            if (this.script) {
              this.script.parentNode.removeChild(this.script);
              this.script = null;
            }

            if (this.form) {
              this.form.parentNode.removeChild(this.form);
              this.form = null;
              this.iframe = null;
            }

            Polling.prototype.doClose.call(this);
          };
          /**
           * Starts a poll cycle.
           *
           * @api private
           */


          JSONPPolling.prototype.doPoll = function () {
            var self = this;
            var script = document.createElement('script');

            if (this.script) {
              this.script.parentNode.removeChild(this.script);
              this.script = null;
            }

            script.async = true;
            script.src = this.uri();

            script.onerror = function (e) {
              self.onError('jsonp poll error', e);
            };

            var insertAt = document.getElementsByTagName('script')[0];

            if (insertAt) {
              insertAt.parentNode.insertBefore(script, insertAt);
            } else {
              (document.head || document.body).appendChild(script);
            }

            this.script = script;
            var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);

            if (isUAgecko) {
              setTimeout(function () {
                var iframe = document.createElement('iframe');
                document.body.appendChild(iframe);
                document.body.removeChild(iframe);
              }, 100);
            }
          };
          /**
           * Writes with a hidden iframe.
           *
           * @param {String} data to send
           * @param {Function} called upon flush.
           * @api private
           */


          JSONPPolling.prototype.doWrite = function (data, fn) {
            var self = this;

            if (!this.form) {
              var form = document.createElement('form');
              var area = document.createElement('textarea');
              var id = this.iframeId = 'eio_iframe_' + this.index;
              var iframe;
              form.className = 'socketio';
              form.style.position = 'absolute';
              form.style.top = '-1000px';
              form.style.left = '-1000px';
              form.target = id;
              form.method = 'POST';
              form.setAttribute('accept-charset', 'utf-8');
              area.name = 'd';
              form.appendChild(area);
              document.body.appendChild(form);
              this.form = form;
              this.area = area;
            }

            this.form.action = this.uri();

            function complete() {
              initIframe();
              fn();
            }

            function initIframe() {
              if (self.iframe) {
                try {
                  self.form.removeChild(self.iframe);
                } catch (e) {
                  self.onError('jsonp polling iframe removal error', e);
                }
              }

              try {
                // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                iframe = document.createElement(html);
              } catch (e) {
                iframe = document.createElement('iframe');
                iframe.name = self.iframeId;
                iframe.src = 'javascript:0';
              }

              iframe.id = self.iframeId;
              self.form.appendChild(iframe);
              self.iframe = iframe;
            }

            initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
            // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side

            data = data.replace(rEscapedNewline, '\\\n');
            this.area.value = data.replace(rNewline, '\\n');

            try {
              this.form.submit();
            } catch (e) {}

            if (this.iframe.attachEvent) {
              this.iframe.onreadystatechange = function () {
                if (self.iframe.readyState == 'complete') {
                  complete();
                }
              };
            } else {
              this.iframe.onload = complete;
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./polling": 8,
        "component-inherit": 16
      }],
      7: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module requirements.
           */
          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');

          var Polling = _dereq_('./polling');

          var Emitter = _dereq_('component-emitter');

          var inherit = _dereq_('component-inherit');

          var debug = _dereq_('debug')('engine.io-client:polling-xhr');
          /**
           * Module exports.
           */


          module.exports = XHR;
          module.exports.Request = Request;
          /**
           * Empty function
           */

          function empty() {}
          /**
           * XHR Polling constructor.
           *
           * @param {Object} opts
           * @api public
           */


          function XHR(opts) {
            Polling.call(this, opts);

            if (global.location) {
              var isSSL = 'https:' == location.protocol;
              var port = location.port; // some user agents have empty `location.port`

              if (!port) {
                port = isSSL ? 443 : 80;
              }

              this.xd = opts.hostname != global.location.hostname || port != opts.port;
              this.xs = opts.secure != isSSL;
            } else {
              this.extraHeaders = opts.extraHeaders;
            }
          }
          /**
           * Inherits from Polling.
           */


          inherit(XHR, Polling);
          /**
           * XHR supports binary
           */

          XHR.prototype.supportsBinary = true;
          /**
           * Creates a request.
           *
           * @param {String} method
           * @api private
           */

          XHR.prototype.request = function (opts) {
            opts = opts || {};
            opts.uri = this.uri();
            opts.xd = this.xd;
            opts.xs = this.xs;
            opts.agent = this.agent || false;
            opts.supportsBinary = this.supportsBinary;
            opts.enablesXDR = this.enablesXDR; // SSL options for Node.js client

            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized; // other options for Node.js client

            opts.extraHeaders = this.extraHeaders;
            return new Request(opts);
          };
          /**
           * Sends data.
           *
           * @param {String} data to send.
           * @param {Function} called upon flush.
           * @api private
           */


          XHR.prototype.doWrite = function (data, fn) {
            var isBinary = typeof data !== 'string' && data !== undefined;
            var req = this.request({
              method: 'POST',
              data: data,
              isBinary: isBinary
            });
            var self = this;
            req.on('success', fn);
            req.on('error', function (err) {
              self.onError('xhr post error', err);
            });
            this.sendXhr = req;
          };
          /**
           * Starts a poll cycle.
           *
           * @api private
           */


          XHR.prototype.doPoll = function () {
            debug('xhr poll');
            var req = this.request();
            var self = this;
            req.on('data', function (data) {
              self.onData(data);
            });
            req.on('error', function (err) {
              self.onError('xhr poll error', err);
            });
            this.pollXhr = req;
          };
          /**
           * Request constructor
           *
           * @param {Object} options
           * @api public
           */


          function Request(opts) {
            this.method = opts.method || 'GET';
            this.uri = opts.uri;
            this.xd = !!opts.xd;
            this.xs = !!opts.xs;
            this.async = false !== opts.async;
            this.data = undefined != opts.data ? opts.data : null;
            this.agent = opts.agent;
            this.isBinary = opts.isBinary;
            this.supportsBinary = opts.supportsBinary;
            this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client

            this.pfx = opts.pfx;
            this.key = opts.key;
            this.passphrase = opts.passphrase;
            this.cert = opts.cert;
            this.ca = opts.ca;
            this.ciphers = opts.ciphers;
            this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client

            this.extraHeaders = opts.extraHeaders;
            this.create();
          }
          /**
           * Mix in `Emitter`.
           */


          Emitter(Request.prototype);
          /**
           * Creates the XHR object and sends the request.
           *
           * @api private
           */

          Request.prototype.create = function () {
            var opts = {
              agent: this.agent,
              xdomain: this.xd,
              xscheme: this.xs,
              enablesXDR: this.enablesXDR
            }; // SSL options for Node.js client

            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized;
            var xhr = this.xhr = new XMLHttpRequest(opts);
            var self = this;

            try {
              debug('xhr open %s: %s', this.method, this.uri);
              xhr.open(this.method, this.uri, this.async);

              try {
                if (this.extraHeaders) {
                  xhr.setDisableHeaderCheck(true);

                  for (var i in this.extraHeaders) {
                    if (this.extraHeaders.hasOwnProperty(i)) {
                      xhr.setRequestHeader(i, this.extraHeaders[i]);
                    }
                  }
                }
              } catch (e) {}

              if (this.supportsBinary) {
                // This has to be done after open because Firefox is stupid
                // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
                xhr.responseType = 'arraybuffer';
              }

              if ('POST' == this.method) {
                try {
                  if (this.isBinary) {
                    xhr.setRequestHeader('Content-type', 'application/octet-stream');
                  } else {
                    xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
                  }
                } catch (e) {}
              } // ie6 check


              if ('withCredentials' in xhr) {
                xhr.withCredentials = true;
              }

              if (this.hasXDR()) {
                xhr.onload = function () {
                  self.onLoad();
                };

                xhr.onerror = function () {
                  self.onError(xhr.responseText);
                };
              } else {
                xhr.onreadystatechange = function () {
                  if (4 != xhr.readyState) return;

                  if (200 == xhr.status || 1223 == xhr.status) {
                    self.onLoad();
                  } else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    setTimeout(function () {
                      self.onError(xhr.status);
                    }, 0);
                  }
                };
              }

              debug('xhr data %s', this.data);
              xhr.send(this.data);
            } catch (e) {
              // Need to defer since .create() is called directly fhrom the constructor
              // and thus the 'error' event can only be only bound *after* this exception
              // occurs.  Therefore, also, we cannot throw here at all.
              setTimeout(function () {
                self.onError(e);
              }, 0);
              return;
            }

            if (global.document) {
              this.index = Request.requestsCount++;
              Request.requests[this.index] = this;
            }
          };
          /**
           * Called upon successful response.
           *
           * @api private
           */


          Request.prototype.onSuccess = function () {
            this.emit('success');
            this.cleanup();
          };
          /**
           * Called if we have data.
           *
           * @api private
           */


          Request.prototype.onData = function (data) {
            this.emit('data', data);
            this.onSuccess();
          };
          /**
           * Called upon error.
           *
           * @api private
           */


          Request.prototype.onError = function (err) {
            this.emit('error', err);
            this.cleanup(true);
          };
          /**
           * Cleans up house.
           *
           * @api private
           */


          Request.prototype.cleanup = function (fromError) {
            if ('undefined' == typeof this.xhr || null === this.xhr) {
              return;
            } // xmlhttprequest


            if (this.hasXDR()) {
              this.xhr.onload = this.xhr.onerror = empty;
            } else {
              this.xhr.onreadystatechange = empty;
            }

            if (fromError) {
              try {
                this.xhr.abort();
              } catch (e) {}
            }

            if (global.document) {
              delete Request.requests[this.index];
            }

            this.xhr = null;
          };
          /**
           * Called upon load.
           *
           * @api private
           */


          Request.prototype.onLoad = function () {
            var data;

            try {
              var contentType;

              try {
                contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
              } catch (e) {}

              if (contentType === 'application/octet-stream') {
                data = this.xhr.response;
              } else {
                if (!this.supportsBinary) {
                  data = this.xhr.responseText;
                } else {
                  try {
                    data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
                  } catch (e) {
                    var ui8Arr = new Uint8Array(this.xhr.response);
                    var dataArray = [];

                    for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
                      dataArray.push(ui8Arr[idx]);
                    }

                    data = String.fromCharCode.apply(null, dataArray);
                  }
                }
              }
            } catch (e) {
              this.onError(e);
            }

            if (null != data) {
              this.onData(data);
            }
          };
          /**
           * Check if it has XDomainRequest.
           *
           * @api private
           */


          Request.prototype.hasXDR = function () {
            return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
          };
          /**
           * Aborts the request.
           *
           * @api public
           */


          Request.prototype.abort = function () {
            this.cleanup();
          };
          /**
           * Aborts pending requests when unloading the window. This is needed to prevent
           * memory leaks (e.g. when using IE) and to ensure that no spurious error is
           * emitted.
           */


          if (global.document) {
            Request.requestsCount = 0;
            Request.requests = {};

            if (global.attachEvent) {
              global.attachEvent('onunload', unloadHandler);
            } else if (global.addEventListener) {
              global.addEventListener('beforeunload', unloadHandler, false);
            }
          }

          function unloadHandler() {
            for (var i in Request.requests) {
              if (Request.requests.hasOwnProperty(i)) {
                Request.requests[i].abort();
              }
            }
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./polling": 8,
        "component-emitter": 15,
        "component-inherit": 16,
        "debug": 17,
        "xmlhttprequest-ssl": 10
      }],
      8: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var Transport = _dereq_('../transport');

        var parseqs = _dereq_('parseqs');

        var parser = _dereq_('engine.io-parser');

        var inherit = _dereq_('component-inherit');

        var yeast = _dereq_('yeast');

        var debug = _dereq_('debug')('engine.io-client:polling');
        /**
         * Module exports.
         */


        module.exports = Polling;
        /**
         * Is XHR2 supported?
         */

        var hasXHR2 = function () {
          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');

          var xhr = new XMLHttpRequest({
            xdomain: false
          });
          return null != xhr.responseType;
        }();
        /**
         * Polling interface.
         *
         * @param {Object} opts
         * @api private
         */


        function Polling(opts) {
          var forceBase64 = opts && opts.forceBase64;

          if (!hasXHR2 || forceBase64) {
            this.supportsBinary = false;
          }

          Transport.call(this, opts);
        }
        /**
         * Inherits from Transport.
         */


        inherit(Polling, Transport);
        /**
         * Transport name.
         */

        Polling.prototype.name = 'polling';
        /**
         * Opens the socket (triggers polling). We write a PING message to determine
         * when the transport is open.
         *
         * @api private
         */

        Polling.prototype.doOpen = function () {
          this.poll();
        };
        /**
         * Pauses polling.
         *
         * @param {Function} callback upon buffers are flushed and transport is paused
         * @api private
         */


        Polling.prototype.pause = function (onPause) {
          var pending = 0;
          var self = this;
          this.readyState = 'pausing';

          function pause() {
            debug('paused');
            self.readyState = 'paused';
            onPause();
          }

          if (this.polling || !this.writable) {
            var total = 0;

            if (this.polling) {
              debug('we are currently polling - waiting to pause');
              total++;
              this.once('pollComplete', function () {
                debug('pre-pause polling complete');
                --total || pause();
              });
            }

            if (!this.writable) {
              debug('we are currently writing - waiting to pause');
              total++;
              this.once('drain', function () {
                debug('pre-pause writing complete');
                --total || pause();
              });
            }
          } else {
            pause();
          }
        };
        /**
         * Starts polling cycle.
         *
         * @api public
         */


        Polling.prototype.poll = function () {
          debug('polling');
          this.polling = true;
          this.doPoll();
          this.emit('poll');
        };
        /**
         * Overloads onData to detect payloads.
         *
         * @api private
         */


        Polling.prototype.onData = function (data) {
          var self = this;
          debug('polling got data %s', data);

          var callback = function callback(packet, index, total) {
            // if its the first message we consider the transport open
            if ('opening' == self.readyState) {
              self.onOpen();
            } // if its a close packet, we close the ongoing requests


            if ('close' == packet.type) {
              self.onClose();
              return false;
            } // otherwise bypass onData and handle the message


            self.onPacket(packet);
          }; // decode payload


          parser.decodePayload(data, this.socket.binaryType, callback); // if an event did not trigger closing

          if ('closed' != this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emit('pollComplete');

            if ('open' == this.readyState) {
              this.poll();
            } else {
              debug('ignoring poll - transport state "%s"', this.readyState);
            }
          }
        };
        /**
         * For polling, send a close packet.
         *
         * @api private
         */


        Polling.prototype.doClose = function () {
          var self = this;

          function close() {
            debug('writing close packet');
            self.write([{
              type: 'close'
            }]);
          }

          if ('open' == this.readyState) {
            debug('transport open - closing');
            close();
          } else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug('transport not open - deferring close');
            this.once('open', close);
          }
        };
        /**
         * Writes a packets payload.
         *
         * @param {Array} data packets
         * @param {Function} drain callback
         * @api private
         */


        Polling.prototype.write = function (packets) {
          var self = this;
          this.writable = false;

          var callbackfn = function callbackfn() {
            self.writable = true;
            self.emit('drain');
          };

          var self = this;
          parser.encodePayload(packets, this.supportsBinary, function (data) {
            self.doWrite(data, callbackfn);
          });
        };
        /**
         * Generates uri for connection.
         *
         * @api private
         */


        Polling.prototype.uri = function () {
          var query = this.query || {};
          var schema = this.secure ? 'https' : 'http';
          var port = ''; // cache busting is forced

          if (false !== this.timestampRequests) {
            query[this.timestampParam] = yeast();
          }

          if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
          }

          query = parseqs.encode(query); // avoid port if default for schema

          if (this.port && ('https' == schema && this.port != 443 || 'http' == schema && this.port != 80)) {
            port = ':' + this.port;
          } // prepend ? to query


          if (query.length) {
            query = '?' + query;
          }

          var ipv6 = this.hostname.indexOf(':') !== -1;
          return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
        };
      }, {
        "../transport": 4,
        "component-inherit": 16,
        "debug": 17,
        "engine.io-parser": 19,
        "parseqs": 27,
        "xmlhttprequest-ssl": 10,
        "yeast": 30
      }],
      9: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */
          var Transport = _dereq_('../transport');

          var parser = _dereq_('engine.io-parser');

          var parseqs = _dereq_('parseqs');

          var inherit = _dereq_('component-inherit');

          var yeast = _dereq_('yeast');

          var debug = _dereq_('debug')('engine.io-client:websocket');

          var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
          /**
           * Get either the `WebSocket` or `MozWebSocket` globals
           * in the browser or try to resolve WebSocket-compatible
           * interface exposed by `ws` for Node-like environment.
           */

          var WebSocket = BrowserWebSocket;

          if (!WebSocket && typeof window === 'undefined') {
            try {
              WebSocket = _dereq_('ws');
            } catch (e) {}
          }
          /**
           * Module exports.
           */


          module.exports = WS;
          /**
           * WebSocket transport constructor.
           *
           * @api {Object} connection options
           * @api public
           */

          function WS(opts) {
            var forceBase64 = opts && opts.forceBase64;

            if (forceBase64) {
              this.supportsBinary = false;
            }

            this.perMessageDeflate = opts.perMessageDeflate;
            Transport.call(this, opts);
          }
          /**
           * Inherits from Transport.
           */


          inherit(WS, Transport);
          /**
           * Transport name.
           *
           * @api public
           */

          WS.prototype.name = 'websocket';
          /*
           * WebSockets support binary
           */

          WS.prototype.supportsBinary = true;
          /**
           * Opens socket.
           *
           * @api private
           */

          WS.prototype.doOpen = function () {
            if (!this.check()) {
              // let probe timeout
              return;
            }

            var self = this;
            var uri = this.uri();
            var protocols = void 0;
            var opts = {
              agent: this.agent,
              perMessageDeflate: this.perMessageDeflate
            }; // SSL options for Node.js client

            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized;

            if (this.extraHeaders) {
              opts.headers = this.extraHeaders;
            }

            this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

            if (this.ws.binaryType === undefined) {
              this.supportsBinary = false;
            }

            if (this.ws.supports && this.ws.supports.binary) {
              this.supportsBinary = true;
              this.ws.binaryType = 'buffer';
            } else {
              this.ws.binaryType = 'arraybuffer';
            }

            this.addEventListeners();
          };
          /**
           * Adds event listeners to the socket
           *
           * @api private
           */


          WS.prototype.addEventListeners = function () {
            var self = this;

            this.ws.onopen = function () {
              self.onOpen();
            };

            this.ws.onclose = function () {
              self.onClose();
            };

            this.ws.onmessage = function (ev) {
              self.onData(ev.data);
            };

            this.ws.onerror = function (e) {
              self.onError('websocket error', e);
            };
          };
          /**
           * Override `onData` to use a timer on iOS.
           * See: https://gist.github.com/mloughran/2052006
           *
           * @api private
           */


          if ('undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            WS.prototype.onData = function (data) {
              var self = this;
              setTimeout(function () {
                Transport.prototype.onData.call(self, data);
              }, 0);
            };
          }
          /**
           * Writes data to socket.
           *
           * @param {Array} array of packets.
           * @api private
           */


          WS.prototype.write = function (packets) {
            var self = this;
            this.writable = false; // encodePacket efficient as it uses WS framing
            // no need for encodePayload

            var total = packets.length;

            for (var i = 0, l = total; i < l; i++) {
              (function (packet) {
                parser.encodePacket(packet, self.supportsBinary, function (data) {
                  if (!BrowserWebSocket) {
                    // always create a new object (GH-437)
                    var opts = {};

                    if (packet.options) {
                      opts.compress = packet.options.compress;
                    }

                    if (self.perMessageDeflate) {
                      var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;

                      if (len < self.perMessageDeflate.threshold) {
                        opts.compress = false;
                      }
                    }
                  } //Sometimes the websocket has already been closed but the browser didn't
                  //have a chance of informing us about it yet, in that case send will
                  //throw an error


                  try {
                    if (BrowserWebSocket) {
                      // TypeError is thrown when passing the second argument on Safari
                      self.ws.send(data);
                    } else {
                      self.ws.send(data, opts);
                    }
                  } catch (e) {
                    debug('websocket closed before onclose event');
                  }

                  --total || done();
                });
              })(packets[i]);
            }

            function done() {
              self.emit('flush'); // fake drain
              // defer to next tick to allow Socket to clear writeBuffer

              setTimeout(function () {
                self.writable = true;
                self.emit('drain');
              }, 0);
            }
          };
          /**
           * Called upon close
           *
           * @api private
           */


          WS.prototype.onClose = function () {
            Transport.prototype.onClose.call(this);
          };
          /**
           * Closes socket.
           *
           * @api private
           */


          WS.prototype.doClose = function () {
            if (typeof this.ws !== 'undefined') {
              this.ws.close();
            }
          };
          /**
           * Generates uri for connection.
           *
           * @api private
           */


          WS.prototype.uri = function () {
            var query = this.query || {};
            var schema = this.secure ? 'wss' : 'ws';
            var port = ''; // avoid port if default for schema

            if (this.port && ('wss' == schema && this.port != 443 || 'ws' == schema && this.port != 80)) {
              port = ':' + this.port;
            } // append timestamp to URI


            if (this.timestampRequests) {
              query[this.timestampParam] = yeast();
            } // communicate binary support capabilities


            if (!this.supportsBinary) {
              query.b64 = 1;
            }

            query = parseqs.encode(query); // prepend ? to query

            if (query.length) {
              query = '?' + query;
            }

            var ipv6 = this.hostname.indexOf(':') !== -1;
            return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
          };
          /**
           * Feature detection for WebSocket.
           *
           * @return {Boolean} whether this transport is available.
           * @api public
           */


          WS.prototype.check = function () {
            return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "../transport": 4,
        "component-inherit": 16,
        "debug": 17,
        "engine.io-parser": 19,
        "parseqs": 27,
        "ws": undefined,
        "yeast": 30
      }],
      10: [function (_dereq_, module, exports) {
        // browser shim for xmlhttprequest module
        var hasCORS = _dereq_('has-cors');

        module.exports = function (opts) {
          var xdomain = opts.xdomain; // scheme must be same when usign XDomainRequest
          // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

          var xscheme = opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
          // https://github.com/Automattic/engine.io-client/pull/217

          var enablesXDR = opts.enablesXDR; // XMLHttpRequest can be disabled on IE

          try {
            if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
              return new XMLHttpRequest();
            }
          } catch (e) {} // Use XDomainRequest for IE8 if enablesXDR is true
          // because loading bar keeps flashing when using jsonp-polling
          // https://github.com/yujiosaka/socke.io-ie8-loading-example


          try {
            if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
              return new XDomainRequest();
            }
          } catch (e) {}

          if (!xdomain) {
            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {}
          }
        };
      }, {
        "has-cors": 22
      }],
      11: [function (_dereq_, module, exports) {
        module.exports = after;

        function after(count, callback, err_cb) {
          var bail = false;
          err_cb = err_cb || noop;
          proxy.count = count;
          return count === 0 ? callback() : proxy;

          function proxy(err, result) {
            if (proxy.count <= 0) {
              throw new Error('after called too many times');
            }

            --proxy.count; // after first error, rest are passed to err_cb

            if (err) {
              bail = true;
              callback(err); // future error callbacks will go to error handler

              callback = err_cb;
            } else if (proxy.count === 0 && !bail) {
              callback(null, result);
            }
          }
        }

        function noop() {}
      }, {}],
      12: [function (_dereq_, module, exports) {
        /**
         * An abstraction for slicing an arraybuffer even when
         * ArrayBuffer.prototype.slice is not supported
         *
         * @api public
         */
        module.exports = function (arraybuffer, start, end) {
          var bytes = arraybuffer.byteLength;
          start = start || 0;
          end = end || bytes;

          if (arraybuffer.slice) {
            return arraybuffer.slice(start, end);
          }

          if (start < 0) {
            start += bytes;
          }

          if (end < 0) {
            end += bytes;
          }

          if (end > bytes) {
            end = bytes;
          }

          if (start >= bytes || start >= end || bytes === 0) {
            return new ArrayBuffer(0);
          }

          var abv = new Uint8Array(arraybuffer);
          var result = new Uint8Array(end - start);

          for (var i = start, ii = 0; i < end; i++, ii++) {
            result[ii] = abv[i];
          }

          return result.buffer;
        };
      }, {}],
      13: [function (_dereq_, module, exports) {
        /*
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */
        (function (chars) {
          "use strict";

          exports.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer),
                i,
                len = bytes.length,
                base64 = "";

            for (i = 0; i < len; i += 3) {
              base64 += chars[bytes[i] >> 2];
              base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64 += chars[bytes[i + 2] & 63];
            }

            if (len % 3 === 2) {
              base64 = base64.substring(0, base64.length - 1) + "=";
            } else if (len % 3 === 1) {
              base64 = base64.substring(0, base64.length - 2) + "==";
            }

            return base64;
          };

          exports.decode = function (base64) {
            var bufferLength = base64.length * 0.75,
                len = base64.length,
                i,
                p = 0,
                encoded1,
                encoded2,
                encoded3,
                encoded4;

            if (base64[base64.length - 1] === "=") {
              bufferLength--;

              if (base64[base64.length - 2] === "=") {
                bufferLength--;
              }
            }

            var arraybuffer = new ArrayBuffer(bufferLength),
                bytes = new Uint8Array(arraybuffer);

            for (i = 0; i < len; i += 4) {
              encoded1 = chars.indexOf(base64[i]);
              encoded2 = chars.indexOf(base64[i + 1]);
              encoded3 = chars.indexOf(base64[i + 2]);
              encoded4 = chars.indexOf(base64[i + 3]);
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }

            return arraybuffer;
          };
        })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
      }, {}],
      14: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Create a blob builder even when vendor prefixes exist
           */
          var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
          /**
           * Check if Blob constructor is supported
           */

          var blobSupported = function () {
            try {
              var a = new Blob(['hi']);
              return a.size === 2;
            } catch (e) {
              return false;
            }
          }();
          /**
           * Check if Blob constructor supports ArrayBufferViews
           * Fails in Safari 6, so we need to map to ArrayBuffers there.
           */


          var blobSupportsArrayBufferView = blobSupported && function () {
            try {
              var b = new Blob([new Uint8Array([1, 2])]);
              return b.size === 2;
            } catch (e) {
              return false;
            }
          }();
          /**
           * Check if BlobBuilder is supported
           */


          var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
          /**
           * Helper function that maps ArrayBufferViews to ArrayBuffers
           * Used by BlobBuilder constructor and old browsers that didn't
           * support it in the Blob constructor.
           */

          function mapArrayBufferViews(ary) {
            for (var i = 0; i < ary.length; i++) {
              var chunk = ary[i];

              if (chunk.buffer instanceof ArrayBuffer) {
                var buf = chunk.buffer; // if this is a subarray, make a copy so we only
                // include the subarray region from the underlying buffer

                if (chunk.byteLength !== buf.byteLength) {
                  var copy = new Uint8Array(chunk.byteLength);
                  copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                  buf = copy.buffer;
                }

                ary[i] = buf;
              }
            }
          }

          function BlobBuilderConstructor(ary, options) {
            options = options || {};
            var bb = new BlobBuilder();
            mapArrayBufferViews(ary);

            for (var i = 0; i < ary.length; i++) {
              bb.append(ary[i]);
            }

            return options.type ? bb.getBlob(options.type) : bb.getBlob();
          }

          ;

          function BlobConstructor(ary, options) {
            mapArrayBufferViews(ary);
            return new Blob(ary, options || {});
          }

          ;

          module.exports = function () {
            if (blobSupported) {
              return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
            } else if (blobBuilderSupported) {
              return BlobBuilderConstructor;
            } else {
              return undefined;
            }
          }();
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}],
      15: [function (_dereq_, module, exports) {
        /**
         * Expose `Emitter`.
         */
        module.exports = Emitter;
        /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */

        function Emitter(obj) {
          if (obj) return mixin(obj);
        }

        ;
        /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */

        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }

          return obj;
        }
        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks[event] = this._callbacks[event] || []).push(fn);
          return this;
        };
        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.once = function (event, fn) {
          var self = this;
          this._callbacks = this._callbacks || {};

          function on() {
            self.off(event, on);
            fn.apply(this, arguments);
          }

          on.fn = fn;
          this.on(event, on);
          return this;
        };
        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {}; // all

          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          } // specific event


          var callbacks = this._callbacks[event];
          if (!callbacks) return this; // remove all handlers

          if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
          } // remove specific handler


          var cb;

          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];

            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }

          return this;
        };
        /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */


        Emitter.prototype.emit = function (event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks[event];

          if (callbacks) {
            callbacks = callbacks.slice(0);

            for (var i = 0, len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }

          return this;
        };
        /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */


        Emitter.prototype.listeners = function (event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks[event] || [];
        };
        /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */


        Emitter.prototype.hasListeners = function (event) {
          return !!this.listeners(event).length;
        };
      }, {}],
      16: [function (_dereq_, module, exports) {
        module.exports = function (a, b) {
          var fn = function fn() {};

          fn.prototype = b.prototype;
          a.prototype = new fn();
          a.prototype.constructor = a;
        };
      }, {}],
      17: [function (_dereq_, module, exports) {
        /**
         * This is the web browser implementation of `debug()`.
         *
         * Expose `debug()` as the module.
         */
        exports = module.exports = _dereq_('./debug');
        exports.log = log;
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
        /**
         * Colors.
         */

        exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
        /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */

        function useColors() {
          // is webkit? http://stackoverflow.com/a/16459606/376773
          return 'WebkitAppearance' in document.documentElement.style || // is firebug? http://stackoverflow.com/a/398120/376773
          window.console && (console.firebug || console.exception && console.table) || // is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
        }
        /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */


        exports.formatters.j = function (v) {
          return JSON.stringify(v);
        };
        /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */


        function formatArgs() {
          var args = arguments;
          var useColors = this.useColors;
          args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
          if (!useColors) return args;
          var c = 'color: ' + this.color;
          args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1)); // the final "%c" is somewhat tricky, because there could be other
          // arguments passed either before or after the %c, so we need to
          // figure out the correct index to insert the CSS into

          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-z%]/g, function (match) {
            if ('%%' === match) return;
            index++;

            if ('%c' === match) {
              // we only are interested in the *last* %c
              // (the user may have provided their own)
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
          return args;
        }
        /**
         * Invokes `console.log()` when available.
         * No-op when `console.log` is not a "function".
         *
         * @api public
         */


        function log() {
          // this hackery is required for IE8/9, where
          // the `console.log` function doesn't have 'apply'
          return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }
        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */


        function save(namespaces) {
          try {
            if (null == namespaces) {
              exports.storage.removeItem('debug');
            } else {
              exports.storage.debug = namespaces;
            }
          } catch (e) {}
        }
        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */


        function load() {
          var r;

          try {
            r = exports.storage.debug;
          } catch (e) {}

          return r;
        }
        /**
         * Enable namespaces listed in `localStorage.debug` initially.
         */


        exports.enable(load());
        /**
         * Localstorage attempts to return the localstorage.
         *
         * This is necessary because safari throws
         * when a user disables cookies/localstorage
         * and you attempt to access it.
         *
         * @return {LocalStorage}
         * @api private
         */

        function localstorage() {
          try {
            return window.localStorage;
          } catch (e) {}
        }
      }, {
        "./debug": 18
      }],
      18: [function (_dereq_, module, exports) {
        /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         *
         * Expose `debug()` as the module.
         */
        exports = module.exports = debug;
        exports.coerce = coerce;
        exports.disable = disable;
        exports.enable = enable;
        exports.enabled = enabled;
        exports.humanize = _dereq_('ms');
        /**
         * The currently active debug mode names, and names to skip.
         */

        exports.names = [];
        exports.skips = [];
        /**
         * Map of special "%n" handling functions, for the debug "format" argument.
         *
         * Valid key names are a single, lowercased letter, i.e. "n".
         */

        exports.formatters = {};
        /**
         * Previously assigned color.
         */

        var prevColor = 0;
        /**
         * Previous log timestamp.
         */

        var prevTime;
        /**
         * Select a color.
         *
         * @return {Number}
         * @api private
         */

        function selectColor() {
          return exports.colors[prevColor++ % exports.colors.length];
        }
        /**
         * Create a debugger with the given `namespace`.
         *
         * @param {String} namespace
         * @return {Function}
         * @api public
         */


        function debug(namespace) {
          // define the `disabled` version
          function disabled() {}

          disabled.enabled = false; // define the `enabled` version

          function enabled() {
            var self = enabled; // set `diff` timestamp

            var curr = +new Date();
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr; // add the `color` if not set

            if (null == self.useColors) self.useColors = exports.useColors();
            if (null == self.color && self.useColors) self.color = selectColor();
            var args = Array.prototype.slice.call(arguments);
            args[0] = exports.coerce(args[0]);

            if ('string' !== typeof args[0]) {
              // anything else let's inspect with %o
              args = ['%o'].concat(args);
            } // apply any `formatters` transformations


            var index = 0;
            args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
              // if we encounter an escaped % then don't increase the array index
              if (match === '%%') return match;
              index++;
              var formatter = exports.formatters[format];

              if ('function' === typeof formatter) {
                var val = args[index];
                match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

                args.splice(index, 1);
                index--;
              }

              return match;
            });

            if ('function' === typeof exports.formatArgs) {
              args = exports.formatArgs.apply(self, args);
            }

            var logFn = enabled.log || exports.log || console.log.bind(console);
            logFn.apply(self, args);
          }

          enabled.enabled = true;
          var fn = exports.enabled(namespace) ? enabled : disabled;
          fn.namespace = namespace;
          return fn;
        }
        /**
         * Enables a debug mode by namespaces. This can include modes
         * separated by a colon and wildcards.
         *
         * @param {String} namespaces
         * @api public
         */


        function enable(namespaces) {
          exports.save(namespaces);
          var split = (namespaces || '').split(/[\s,]+/);
          var len = split.length;

          for (var i = 0; i < len; i++) {
            if (!split[i]) continue; // ignore empty strings

            namespaces = split[i].replace(/\*/g, '.*?');

            if (namespaces[0] === '-') {
              exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
            } else {
              exports.names.push(new RegExp('^' + namespaces + '$'));
            }
          }
        }
        /**
         * Disable debug output.
         *
         * @api public
         */


        function disable() {
          exports.enable('');
        }
        /**
         * Returns true if the given mode name is enabled, false otherwise.
         *
         * @param {String} name
         * @return {Boolean}
         * @api public
         */


        function enabled(name) {
          var i, len;

          for (i = 0, len = exports.skips.length; i < len; i++) {
            if (exports.skips[i].test(name)) {
              return false;
            }
          }

          for (i = 0, len = exports.names.length; i < len; i++) {
            if (exports.names[i].test(name)) {
              return true;
            }
          }

          return false;
        }
        /**
         * Coerce `val`.
         *
         * @param {Mixed} val
         * @return {Mixed}
         * @api private
         */


        function coerce(val) {
          if (val instanceof Error) return val.stack || val.message;
          return val;
        }
      }, {
        "ms": 25
      }],
      19: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */
          var keys = _dereq_('./keys');

          var hasBinary = _dereq_('has-binary');

          var sliceBuffer = _dereq_('arraybuffer.slice');

          var base64encoder = _dereq_('base64-arraybuffer');

          var after = _dereq_('after');

          var utf8 = _dereq_('utf8');
          /**
           * Check if we are running an android browser. That requires us to use
           * ArrayBuffer with polling transports...
           *
           * http://ghinda.net/jpeg-blob-ajax-android/
           */


          var isAndroid = navigator.userAgent.match(/Android/i);
          /**
           * Check if we are running in PhantomJS.
           * Uploading a Blob with PhantomJS does not work correctly, as reported here:
           * https://github.com/ariya/phantomjs/issues/11395
           * @type boolean
           */

          var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);
          /**
           * When true, avoids using Blobs to encode payloads.
           * @type boolean
           */

          var dontSendBlobs = isAndroid || isPhantomJS;
          /**
           * Current protocol version.
           */

          exports.protocol = 3;
          /**
           * Packet types.
           */

          var packets = exports.packets = {
            open: 0 // non-ws
            ,
            close: 1 // non-ws
            ,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
          };
          var packetslist = keys(packets);
          /**
           * Premade error packet.
           */

          var err = {
            type: 'error',
            data: 'parser error'
          };
          /**
           * Create a blob api even for blob builder when vendor prefixes exist
           */

          var Blob = _dereq_('blob');
          /**
           * Encodes a packet.
           *
           *     <packet type id> [ <data> ]
           *
           * Example:
           *
           *     5hello world
           *     3
           *     4
           *
           * Binary is encoded in an identical principle
           *
           * @api private
           */


          exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
            if ('function' == typeof supportsBinary) {
              callback = supportsBinary;
              supportsBinary = false;
            }

            if ('function' == typeof utf8encode) {
              callback = utf8encode;
              utf8encode = null;
            }

            var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

            if (global.ArrayBuffer && data instanceof ArrayBuffer) {
              return encodeArrayBuffer(packet, supportsBinary, callback);
            } else if (Blob && data instanceof global.Blob) {
              return encodeBlob(packet, supportsBinary, callback);
            } // might be an object with { base64: true, data: dataAsBase64String }


            if (data && data.base64) {
              return encodeBase64Object(packet, callback);
            } // Sending data as a utf-8 string


            var encoded = packets[packet.type]; // data fragment is optional

            if (undefined !== packet.data) {
              encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
            }

            return callback('' + encoded);
          };

          function encodeBase64Object(packet, callback) {
            // packet data is an object { base64: true, data: dataAsBase64String }
            var message = 'b' + exports.packets[packet.type] + packet.data.data;
            return callback(message);
          }
          /**
           * Encode packet helpers for binary types
           */


          function encodeArrayBuffer(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            var data = packet.data;
            var contentArray = new Uint8Array(data);
            var resultBuffer = new Uint8Array(1 + data.byteLength);
            resultBuffer[0] = packets[packet.type];

            for (var i = 0; i < contentArray.length; i++) {
              resultBuffer[i + 1] = contentArray[i];
            }

            return callback(resultBuffer.buffer);
          }

          function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            var fr = new FileReader();

            fr.onload = function () {
              packet.data = fr.result;
              exports.encodePacket(packet, supportsBinary, true, callback);
            };

            return fr.readAsArrayBuffer(packet.data);
          }

          function encodeBlob(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            if (dontSendBlobs) {
              return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
            }

            var length = new Uint8Array(1);
            length[0] = packets[packet.type];
            var blob = new Blob([length.buffer, packet.data]);
            return callback(blob);
          }
          /**
           * Encodes a packet with binary data in a base64 string
           *
           * @param {Object} packet, has `type` and `data`
           * @return {String} base64 encoded message
           */


          exports.encodeBase64Packet = function (packet, callback) {
            var message = 'b' + exports.packets[packet.type];

            if (Blob && packet.data instanceof global.Blob) {
              var fr = new FileReader();

              fr.onload = function () {
                var b64 = fr.result.split(',')[1];
                callback(message + b64);
              };

              return fr.readAsDataURL(packet.data);
            }

            var b64data;

            try {
              b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
            } catch (e) {
              // iPhone Safari doesn't let you apply with typed arrays
              var typed = new Uint8Array(packet.data);
              var basic = new Array(typed.length);

              for (var i = 0; i < typed.length; i++) {
                basic[i] = typed[i];
              }

              b64data = String.fromCharCode.apply(null, basic);
            }

            message += global.btoa(b64data);
            return callback(message);
          };
          /**
           * Decodes a packet. Changes format to Blob if requested.
           *
           * @return {Object} with `type` and `data` (if any)
           * @api private
           */


          exports.decodePacket = function (data, binaryType, utf8decode) {
            // String data
            if (typeof data == 'string' || data === undefined) {
              if (data.charAt(0) == 'b') {
                return exports.decodeBase64Packet(data.substr(1), binaryType);
              }

              if (utf8decode) {
                try {
                  data = utf8.decode(data);
                } catch (e) {
                  return err;
                }
              }

              var type = data.charAt(0);

              if (Number(type) != type || !packetslist[type]) {
                return err;
              }

              if (data.length > 1) {
                return {
                  type: packetslist[type],
                  data: data.substring(1)
                };
              } else {
                return {
                  type: packetslist[type]
                };
              }
            }

            var asArray = new Uint8Array(data);
            var type = asArray[0];
            var rest = sliceBuffer(data, 1);

            if (Blob && binaryType === 'blob') {
              rest = new Blob([rest]);
            }

            return {
              type: packetslist[type],
              data: rest
            };
          };
          /**
           * Decodes a packet encoded in a base64 string
           *
           * @param {String} base64 encoded message
           * @return {Object} with `type` and `data` (if any)
           */


          exports.decodeBase64Packet = function (msg, binaryType) {
            var type = packetslist[msg.charAt(0)];

            if (!global.ArrayBuffer) {
              return {
                type: type,
                data: {
                  base64: true,
                  data: msg.substr(1)
                }
              };
            }

            var data = base64encoder.decode(msg.substr(1));

            if (binaryType === 'blob' && Blob) {
              data = new Blob([data]);
            }

            return {
              type: type,
              data: data
            };
          };
          /**
           * Encodes multiple messages (payload).
           *
           *     <length>:data
           *
           * Example:
           *
           *     11:hello world2:hi
           *
           * If any contents are binary, they will be encoded as base64 strings. Base64
           * encoded strings are marked with a b before the length specifier
           *
           * @param {Array} packets
           * @api private
           */


          exports.encodePayload = function (packets, supportsBinary, callback) {
            if (typeof supportsBinary == 'function') {
              callback = supportsBinary;
              supportsBinary = null;
            }

            var isBinary = hasBinary(packets);

            if (supportsBinary && isBinary) {
              if (Blob && !dontSendBlobs) {
                return exports.encodePayloadAsBlob(packets, callback);
              }

              return exports.encodePayloadAsArrayBuffer(packets, callback);
            }

            if (!packets.length) {
              return callback('0:');
            }

            function setLengthHeader(message) {
              return message.length + ':' + message;
            }

            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function (message) {
                doneCallback(null, setLengthHeader(message));
              });
            }

            map(packets, encodeOne, function (err, results) {
              return callback(results.join(''));
            });
          };
          /**
           * Async array map using after
           */


          function map(ary, each, done) {
            var result = new Array(ary.length);
            var next = after(ary.length, done);

            var eachWithIndex = function eachWithIndex(i, el, cb) {
              each(el, function (error, msg) {
                result[i] = msg;
                cb(error, result);
              });
            };

            for (var i = 0; i < ary.length; i++) {
              eachWithIndex(i, ary[i], next);
            }
          }
          /*
           * Decodes data when a payload is maybe expected. Possible binary contents are
           * decoded from their base64 representation
           *
           * @param {String} data, callback method
           * @api public
           */


          exports.decodePayload = function (data, binaryType, callback) {
            if (typeof data != 'string') {
              return exports.decodePayloadAsBinary(data, binaryType, callback);
            }

            if (typeof binaryType === 'function') {
              callback = binaryType;
              binaryType = null;
            }

            var packet;

            if (data == '') {
              // parser error - ignoring payload
              return callback(err, 0, 1);
            }

            var length = '',
                n,
                msg;

            for (var i = 0, l = data.length; i < l; i++) {
              var chr = data.charAt(i);

              if (':' != chr) {
                length += chr;
              } else {
                if ('' == length || length != (n = Number(length))) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                msg = data.substr(i + 1, n);

                if (length != msg.length) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                if (msg.length) {
                  packet = exports.decodePacket(msg, binaryType, true);

                  if (err.type == packet.type && err.data == packet.data) {
                    // parser error in individual packet - ignoring payload
                    return callback(err, 0, 1);
                  }

                  var ret = callback(packet, i + n, l);
                  if (false === ret) return;
                } // advance cursor


                i += n;
                length = '';
              }
            }

            if (length != '') {
              // parser error - ignoring payload
              return callback(err, 0, 1);
            }
          };
          /**
           * Encodes multiple messages (payload) as binary.
           *
           * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
           * 255><data>
           *
           * Example:
           * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
           *
           * @param {Array} packets
           * @return {ArrayBuffer} encoded payload
           * @api private
           */


          exports.encodePayloadAsArrayBuffer = function (packets, callback) {
            if (!packets.length) {
              return callback(new ArrayBuffer(0));
            }

            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, true, true, function (data) {
                return doneCallback(null, data);
              });
            }

            map(packets, encodeOne, function (err, encodedPackets) {
              var totalLength = encodedPackets.reduce(function (acc, p) {
                var len;

                if (typeof p === 'string') {
                  len = p.length;
                } else {
                  len = p.byteLength;
                }

                return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
              }, 0);
              var resultArray = new Uint8Array(totalLength);
              var bufferIndex = 0;
              encodedPackets.forEach(function (p) {
                var isString = typeof p === 'string';
                var ab = p;

                if (isString) {
                  var view = new Uint8Array(p.length);

                  for (var i = 0; i < p.length; i++) {
                    view[i] = p.charCodeAt(i);
                  }

                  ab = view.buffer;
                }

                if (isString) {
                  // not true binary
                  resultArray[bufferIndex++] = 0;
                } else {
                  // true binary
                  resultArray[bufferIndex++] = 1;
                }

                var lenStr = ab.byteLength.toString();

                for (var i = 0; i < lenStr.length; i++) {
                  resultArray[bufferIndex++] = parseInt(lenStr[i]);
                }

                resultArray[bufferIndex++] = 255;
                var view = new Uint8Array(ab);

                for (var i = 0; i < view.length; i++) {
                  resultArray[bufferIndex++] = view[i];
                }
              });
              return callback(resultArray.buffer);
            });
          };
          /**
           * Encode as Blob
           */


          exports.encodePayloadAsBlob = function (packets, callback) {
            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, true, true, function (encoded) {
                var binaryIdentifier = new Uint8Array(1);
                binaryIdentifier[0] = 1;

                if (typeof encoded === 'string') {
                  var view = new Uint8Array(encoded.length);

                  for (var i = 0; i < encoded.length; i++) {
                    view[i] = encoded.charCodeAt(i);
                  }

                  encoded = view.buffer;
                  binaryIdentifier[0] = 0;
                }

                var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;
                var lenStr = len.toString();
                var lengthAry = new Uint8Array(lenStr.length + 1);

                for (var i = 0; i < lenStr.length; i++) {
                  lengthAry[i] = parseInt(lenStr[i]);
                }

                lengthAry[lenStr.length] = 255;

                if (Blob) {
                  var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                  doneCallback(null, blob);
                }
              });
            }

            map(packets, encodeOne, function (err, results) {
              return callback(new Blob(results));
            });
          };
          /*
           * Decodes data when a payload is maybe expected. Strings are decoded by
           * interpreting each byte as a key code for entries marked to start with 0. See
           * description of encodePayloadAsBinary
           *
           * @param {ArrayBuffer} data, callback method
           * @api public
           */


          exports.decodePayloadAsBinary = function (data, binaryType, callback) {
            if (typeof binaryType === 'function') {
              callback = binaryType;
              binaryType = null;
            }

            var bufferTail = data;
            var buffers = [];
            var numberTooLong = false;

            while (bufferTail.byteLength > 0) {
              var tailArray = new Uint8Array(bufferTail);
              var isString = tailArray[0] === 0;
              var msgLength = '';

              for (var i = 1;; i++) {
                if (tailArray[i] == 255) break;

                if (msgLength.length > 310) {
                  numberTooLong = true;
                  break;
                }

                msgLength += tailArray[i];
              }

              if (numberTooLong) return callback(err, 0, 1);
              bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
              msgLength = parseInt(msgLength);
              var msg = sliceBuffer(bufferTail, 0, msgLength);

              if (isString) {
                try {
                  msg = String.fromCharCode.apply(null, new Uint8Array(msg));
                } catch (e) {
                  // iPhone Safari doesn't let you apply to typed arrays
                  var typed = new Uint8Array(msg);
                  msg = '';

                  for (var i = 0; i < typed.length; i++) {
                    msg += String.fromCharCode(typed[i]);
                  }
                }
              }

              buffers.push(msg);
              bufferTail = sliceBuffer(bufferTail, msgLength);
            }

            var total = buffers.length;
            buffers.forEach(function (buffer, i) {
              callback(exports.decodePacket(buffer, binaryType, true), i, total);
            });
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./keys": 20,
        "after": 11,
        "arraybuffer.slice": 12,
        "base64-arraybuffer": 13,
        "blob": 14,
        "has-binary": 21,
        "utf8": 29
      }],
      20: [function (_dereq_, module, exports) {
        /**
         * Gets the keys for an object.
         *
         * @return {Array} keys
         * @api private
         */
        module.exports = Object.keys || function keys(obj) {
          var arr = [];
          var has = Object.prototype.hasOwnProperty;

          for (var i in obj) {
            if (has.call(obj, i)) {
              arr.push(i);
            }
          }

          return arr;
        };
      }, {}],
      21: [function (_dereq_, module, exports) {
        (function (global) {
          /*
           * Module requirements.
           */
          var isArray = _dereq_('isarray');
          /**
           * Module exports.
           */


          module.exports = hasBinary;
          /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */

          function hasBinary(data) {
            function _hasBinary(obj) {
              if (!obj) return false;

              if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                return true;
              }

              if (isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                  if (_hasBinary(obj[i])) {
                    return true;
                  }
                }
              } else if (obj && 'object' == typeof obj) {
                if (obj.toJSON) {
                  obj = obj.toJSON();
                }

                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                    return true;
                  }
                }
              }

              return false;
            }

            return _hasBinary(data);
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "isarray": 24
      }],
      22: [function (_dereq_, module, exports) {
        /**
         * Module exports.
         *
         * Logic borrowed from Modernizr:
         *
         *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
         */
        try {
          module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
        } catch (err) {
          // if XMLHttp support is disabled in IE then it will throw
          // when trying to create
          module.exports = false;
        }
      }, {}],
      23: [function (_dereq_, module, exports) {
        var indexOf = [].indexOf;

        module.exports = function (arr, obj) {
          if (indexOf) return arr.indexOf(obj);

          for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj) return i;
          }

          return -1;
        };
      }, {}],
      24: [function (_dereq_, module, exports) {
        module.exports = Array.isArray || function (arr) {
          return Object.prototype.toString.call(arr) == '[object Array]';
        };
      }, {}],
      25: [function (_dereq_, module, exports) {
        /**
         * Helpers.
         */
        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var y = d * 365.25;
        /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @param {String|Number} val
         * @param {Object} options
         * @return {String|Number}
         * @api public
         */

        module.exports = function (val, options) {
          options = options || {};
          if ('string' == typeof val) return parse(val);
          return options["long"] ? _long(val) : _short(val);
        };
        /**
         * Parse the given `str` and return milliseconds.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */


        function parse(str) {
          str = '' + str;
          if (str.length > 10000) return;
          var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
          if (!match) return;
          var n = parseFloat(match[1]);
          var type = (match[2] || 'ms').toLowerCase();

          switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
              return n * y;

            case 'days':
            case 'day':
            case 'd':
              return n * d;

            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
              return n * h;

            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
              return n * m;

            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
              return n * s;

            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
              return n;
          }
        }
        /**
         * Short format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */


        function _short(ms) {
          if (ms >= d) return Math.round(ms / d) + 'd';
          if (ms >= h) return Math.round(ms / h) + 'h';
          if (ms >= m) return Math.round(ms / m) + 'm';
          if (ms >= s) return Math.round(ms / s) + 's';
          return ms + 'ms';
        }
        /**
         * Long format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */


        function _long(ms) {
          return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
        }
        /**
         * Pluralization helper.
         */


        function plural(ms, n, name) {
          if (ms < n) return;
          if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
          return Math.ceil(ms / n) + ' ' + name + 's';
        }
      }, {}],
      26: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * JSON parse.
           *
           * @see Based on jQuery#parseJSON (MIT) and JSON2
           * @api private
           */
          var rvalidchars = /^[\],:{}\s]*$/;
          var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
          var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
          var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
          var rtrimLeft = /^\s+/;
          var rtrimRight = /\s+$/;

          module.exports = function parsejson(data) {
            if ('string' != typeof data || !data) {
              return null;
            }

            data = data.replace(rtrimLeft, '').replace(rtrimRight, ''); // Attempt to parse using the native JSON parser first

            if (global.JSON && JSON.parse) {
              return JSON.parse(data);
            }

            if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
              return new Function('return ' + data)();
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}],
      27: [function (_dereq_, module, exports) {
        /**
         * Compiles a querystring
         * Returns string representation of the object
         *
         * @param {Object}
         * @api private
         */
        exports.encode = function (obj) {
          var str = '';

          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              if (str.length) str += '&';
              str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
            }
          }

          return str;
        };
        /**
         * Parses a simple querystring into an object
         *
         * @param {String} qs
         * @api private
         */


        exports.decode = function (qs) {
          var qry = {};
          var pairs = qs.split('&');

          for (var i = 0, l = pairs.length; i < l; i++) {
            var pair = pairs[i].split('=');
            qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }

          return qry;
        };
      }, {}],
      28: [function (_dereq_, module, exports) {
        /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api private
         */
        var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

        module.exports = function parseuri(str) {
          var src = str,
              b = str.indexOf('['),
              e = str.indexOf(']');

          if (b != -1 && e != -1) {
            str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
          }

          var m = re.exec(str || ''),
              uri = {},
              i = 14;

          while (i--) {
            uri[parts[i]] = m[i] || '';
          }

          if (b != -1 && e != -1) {
            uri.source = src;
            uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
            uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
            uri.ipv6uri = true;
          }

          return uri;
        };
      }, {}],
      29: [function (_dereq_, module, exports) {
        (function (global) {
          /*! https://mths.be/utf8js v2.0.0 by @mathias */
          ;

          (function (root) {
            // Detect free variables `exports`
            var freeExports = typeof exports == 'object' && exports; // Detect free variable `module`

            var freeModule = typeof module == 'object' && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
            // and use it as `root`

            var freeGlobal = typeof global == 'object' && global;

            if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
              root = freeGlobal;
            }
            /*--------------------------------------------------------------------------*/


            var stringFromCharCode = String.fromCharCode; // Taken from https://mths.be/punycode

            function ucs2decode(string) {
              var output = [];
              var counter = 0;
              var length = string.length;
              var value;
              var extra;

              while (counter < length) {
                value = string.charCodeAt(counter++);

                if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                  // high surrogate, and there is a next character
                  extra = string.charCodeAt(counter++);

                  if ((extra & 0xFC00) == 0xDC00) {
                    // low surrogate
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                  } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                  }
                } else {
                  output.push(value);
                }
              }

              return output;
            } // Taken from https://mths.be/punycode


            function ucs2encode(array) {
              var length = array.length;
              var index = -1;
              var value;
              var output = '';

              while (++index < length) {
                value = array[index];

                if (value > 0xFFFF) {
                  value -= 0x10000;
                  output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                  value = 0xDC00 | value & 0x3FF;
                }

                output += stringFromCharCode(value);
              }

              return output;
            }

            function checkScalarValue(codePoint) {
              if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
              }
            }
            /*--------------------------------------------------------------------------*/


            function createByte(codePoint, shift) {
              return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
            }

            function encodeCodePoint(codePoint) {
              if ((codePoint & 0xFFFFFF80) == 0) {
                // 1-byte sequence
                return stringFromCharCode(codePoint);
              }

              var symbol = '';

              if ((codePoint & 0xFFFFF800) == 0) {
                // 2-byte sequence
                symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
              } else if ((codePoint & 0xFFFF0000) == 0) {
                // 3-byte sequence
                checkScalarValue(codePoint);
                symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
                symbol += createByte(codePoint, 6);
              } else if ((codePoint & 0xFFE00000) == 0) {
                // 4-byte sequence
                symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
                symbol += createByte(codePoint, 12);
                symbol += createByte(codePoint, 6);
              }

              symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
              return symbol;
            }

            function utf8encode(string) {
              var codePoints = ucs2decode(string);
              var length = codePoints.length;
              var index = -1;
              var codePoint;
              var byteString = '';

              while (++index < length) {
                codePoint = codePoints[index];
                byteString += encodeCodePoint(codePoint);
              }

              return byteString;
            }
            /*--------------------------------------------------------------------------*/


            function readContinuationByte() {
              if (byteIndex >= byteCount) {
                throw Error('Invalid byte index');
              }

              var continuationByte = byteArray[byteIndex] & 0xFF;
              byteIndex++;

              if ((continuationByte & 0xC0) == 0x80) {
                return continuationByte & 0x3F;
              } // If we end up here, it’s not a continuation byte


              throw Error('Invalid continuation byte');
            }

            function decodeSymbol() {
              var byte1;
              var byte2;
              var byte3;
              var byte4;
              var codePoint;

              if (byteIndex > byteCount) {
                throw Error('Invalid byte index');
              }

              if (byteIndex == byteCount) {
                return false;
              } // Read first byte


              byte1 = byteArray[byteIndex] & 0xFF;
              byteIndex++; // 1-byte sequence (no continuation bytes)

              if ((byte1 & 0x80) == 0) {
                return byte1;
              } // 2-byte sequence


              if ((byte1 & 0xE0) == 0xC0) {
                var byte2 = readContinuationByte();
                codePoint = (byte1 & 0x1F) << 6 | byte2;

                if (codePoint >= 0x80) {
                  return codePoint;
                } else {
                  throw Error('Invalid continuation byte');
                }
              } // 3-byte sequence (may include unpaired surrogates)


              if ((byte1 & 0xF0) == 0xE0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;

                if (codePoint >= 0x0800) {
                  checkScalarValue(codePoint);
                  return codePoint;
                } else {
                  throw Error('Invalid continuation byte');
                }
              } // 4-byte sequence


              if ((byte1 & 0xF8) == 0xF0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                byte4 = readContinuationByte();
                codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;

                if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                  return codePoint;
                }
              }

              throw Error('Invalid UTF-8 detected');
            }

            var byteArray;
            var byteCount;
            var byteIndex;

            function utf8decode(byteString) {
              byteArray = ucs2decode(byteString);
              byteCount = byteArray.length;
              byteIndex = 0;
              var codePoints = [];
              var tmp;

              while ((tmp = decodeSymbol()) !== false) {
                codePoints.push(tmp);
              }

              return ucs2encode(codePoints);
            }
            /*--------------------------------------------------------------------------*/


            var utf8 = {
              'version': '2.0.0',
              'encode': utf8encode,
              'decode': utf8decode
            }; // Some AMD build optimizers, like r.js, check for specific condition patterns
            // like the following:

            if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
              define(function () {
                return utf8;
              });
            } else if (freeExports && !freeExports.nodeType) {
              if (freeModule) {
                // in Node.js or RingoJS v0.8.0+
                freeModule.exports = utf8;
              } else {
                // in Narwhal or RingoJS v0.7.0-
                var object = {};
                var hasOwnProperty = object.hasOwnProperty;

                for (var key in utf8) {
                  hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
                }
              }
            } else {
              // in Rhino or a web browser
              root.utf8 = utf8;
            }
          })(this);
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}],
      30: [function (_dereq_, module, exports) {
        'use strict';

        var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
            length = 64,
            map = {},
            seed = 0,
            i = 0,
            prev;
        /**
         * Return a string representing the specified number.
         *
         * @param {Number} num The number to convert.
         * @returns {String} The string representation of the number.
         * @api public
         */

        function encode(num) {
          var encoded = '';

          do {
            encoded = alphabet[num % length] + encoded;
            num = Math.floor(num / length);
          } while (num > 0);

          return encoded;
        }
        /**
         * Return the integer value specified by the given string.
         *
         * @param {String} str The string to convert.
         * @returns {Number} The integer value represented by the string.
         * @api public
         */


        function decode(str) {
          var decoded = 0;

          for (i = 0; i < str.length; i++) {
            decoded = decoded * length + map[str.charAt(i)];
          }

          return decoded;
        }
        /**
         * Yeast: A tiny growing id generator.
         *
         * @returns {String} A unique id.
         * @api public
         */


        function yeast() {
          var now = encode(+new Date());
          if (now !== prev) return seed = 0, prev = now;
          return now + '.' + encode(seed++);
        } //
        // Map each character to its index.
        //


        for (; i < length; i++) {
          map[alphabet[i]] = i;
        } //
        // Expose the `yeast`, `encode` and `decode` functions.
        //


        yeast.encode = encode;
        yeast.decode = decode;
        module.exports = yeast;
      }, {}],
      31: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var url = _dereq_('./url');

        var parser = _dereq_('socket.io-parser');

        var Manager = _dereq_('./manager');

        var debug = _dereq_('debug')('socket.io-client');
        /**
         * Module exports.
         */


        module.exports = exports = lookup;
        /**
         * Managers cache.
         */

        var cache = exports.managers = {};
        /**
         * Looks up an existing `Manager` for multiplexing.
         * If the user summons:
         *
         *   `io('http://localhost/a');`
         *   `io('http://localhost/b');`
         *
         * We reuse the existing instance based on same scheme/port/host,
         * and we initialize sockets for each namespace.
         *
         * @api public
         */

        function lookup(uri, opts) {
          if (typeof uri == 'object') {
            opts = uri;
            uri = undefined;
          }

          opts = opts || {};
          var parsed = url(uri);
          var source = parsed.source;
          var id = parsed.id;
          var path = parsed.path;
          var sameNamespace = cache[id] && path in cache[id].nsps;
          var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;
          var io;

          if (newConnection) {
            debug('ignoring socket cache for %s', source);
            io = Manager(source, opts);
          } else {
            if (!cache[id]) {
              debug('new io instance for %s', source);
              cache[id] = Manager(source, opts);
            }

            io = cache[id];
          }

          return io.socket(parsed.path);
        }
        /**
         * Protocol version.
         *
         * @api public
         */


        exports.protocol = parser.protocol;
        /**
         * `connect`.
         *
         * @param {String} uri
         * @api public
         */

        exports.connect = lookup;
        /**
         * Expose constructors for standalone build.
         *
         * @api public
         */

        exports.Manager = _dereq_('./manager');
        exports.Socket = _dereq_('./socket');
      }, {
        "./manager": 32,
        "./socket": 34,
        "./url": 35,
        "debug": 39,
        "socket.io-parser": 47
      }],
      32: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var eio = _dereq_('engine.io-client');

        var Socket = _dereq_('./socket');

        var Emitter = _dereq_('component-emitter');

        var parser = _dereq_('socket.io-parser');

        var on = _dereq_('./on');

        var bind = _dereq_('component-bind');

        var debug = _dereq_('debug')('socket.io-client:manager');

        var indexOf = _dereq_('indexof');

        var Backoff = _dereq_('backo2');
        /**
         * IE6+ hasOwnProperty
         */


        var has = Object.prototype.hasOwnProperty;
        /**
         * Module exports
         */

        module.exports = Manager;
        /**
         * `Manager` constructor.
         *
         * @param {String} engine instance or engine uri/opts
         * @param {Object} options
         * @api public
         */

        function Manager(uri, opts) {
          if (!(this instanceof Manager)) return new Manager(uri, opts);

          if (uri && 'object' == typeof uri) {
            opts = uri;
            uri = undefined;
          }

          opts = opts || {};
          opts.path = opts.path || '/socket.io';
          this.nsps = {};
          this.subs = [];
          this.opts = opts;
          this.reconnection(opts.reconnection !== false);
          this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          this.reconnectionDelay(opts.reconnectionDelay || 1000);
          this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
          this.randomizationFactor(opts.randomizationFactor || 0.5);
          this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
          });
          this.timeout(null == opts.timeout ? 20000 : opts.timeout);
          this.readyState = 'closed';
          this.uri = uri;
          this.connecting = [];
          this.lastPing = null;
          this.encoding = false;
          this.packetBuffer = [];
          this.encoder = new parser.Encoder();
          this.decoder = new parser.Decoder();
          this.autoConnect = opts.autoConnect !== false;
          if (this.autoConnect) this.open();
        }
        /**
         * Propagate given event to sockets and emit on `this`
         *
         * @api private
         */


        Manager.prototype.emitAll = function () {
          this.emit.apply(this, arguments);

          for (var nsp in this.nsps) {
            if (has.call(this.nsps, nsp)) {
              this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
            }
          }
        };
        /**
         * Update `socket.id` of all sockets
         *
         * @api private
         */


        Manager.prototype.updateSocketIds = function () {
          for (var nsp in this.nsps) {
            if (has.call(this.nsps, nsp)) {
              this.nsps[nsp].id = this.engine.id;
            }
          }
        };
        /**
         * Mix in `Emitter`.
         */


        Emitter(Manager.prototype);
        /**
         * Sets the `reconnection` config.
         *
         * @param {Boolean} true/false if it should automatically reconnect
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.reconnection = function (v) {
          if (!arguments.length) return this._reconnection;
          this._reconnection = !!v;
          return this;
        };
        /**
         * Sets the reconnection attempts config.
         *
         * @param {Number} max reconnection attempts before giving up
         * @return {Manager} self or value
         * @api public
         */


        Manager.prototype.reconnectionAttempts = function (v) {
          if (!arguments.length) return this._reconnectionAttempts;
          this._reconnectionAttempts = v;
          return this;
        };
        /**
         * Sets the delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */


        Manager.prototype.reconnectionDelay = function (v) {
          if (!arguments.length) return this._reconnectionDelay;
          this._reconnectionDelay = v;
          this.backoff && this.backoff.setMin(v);
          return this;
        };

        Manager.prototype.randomizationFactor = function (v) {
          if (!arguments.length) return this._randomizationFactor;
          this._randomizationFactor = v;
          this.backoff && this.backoff.setJitter(v);
          return this;
        };
        /**
         * Sets the maximum delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */


        Manager.prototype.reconnectionDelayMax = function (v) {
          if (!arguments.length) return this._reconnectionDelayMax;
          this._reconnectionDelayMax = v;
          this.backoff && this.backoff.setMax(v);
          return this;
        };
        /**
         * Sets the connection timeout. `false` to disable
         *
         * @return {Manager} self or value
         * @api public
         */


        Manager.prototype.timeout = function (v) {
          if (!arguments.length) return this._timeout;
          this._timeout = v;
          return this;
        };
        /**
         * Starts trying to reconnect if reconnection is enabled and we have not
         * started reconnecting yet
         *
         * @api private
         */


        Manager.prototype.maybeReconnectOnOpen = function () {
          // Only try to reconnect if it's the first time we're connecting
          if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
          }
        };
        /**
         * Sets the current transport `socket`.
         *
         * @param {Function} optional, callback
         * @return {Manager} self
         * @api public
         */


        Manager.prototype.open = Manager.prototype.connect = function (fn) {
          debug('readyState %s', this.readyState);
          if (~this.readyState.indexOf('open')) return this;
          debug('opening %s', this.uri);
          this.engine = eio(this.uri, this.opts);
          var socket = this.engine;
          var self = this;
          this.readyState = 'opening';
          this.skipReconnect = false; // emit `open`

          var openSub = on(socket, 'open', function () {
            self.onopen();
            fn && fn();
          }); // emit `connect_error`

          var errorSub = on(socket, 'error', function (data) {
            debug('connect_error');
            self.cleanup();
            self.readyState = 'closed';
            self.emitAll('connect_error', data);

            if (fn) {
              var err = new Error('Connection error');
              err.data = data;
              fn(err);
            } else {
              // Only do this if there is no fn to handle the error
              self.maybeReconnectOnOpen();
            }
          }); // emit `connect_timeout`

          if (false !== this._timeout) {
            var timeout = this._timeout;
            debug('connect attempt will timeout after %d', timeout); // set timer

            var timer = setTimeout(function () {
              debug('connect attempt timed out after %d', timeout);
              openSub.destroy();
              socket.close();
              socket.emit('error', 'timeout');
              self.emitAll('connect_timeout', timeout);
            }, timeout);
            this.subs.push({
              destroy: function destroy() {
                clearTimeout(timer);
              }
            });
          }

          this.subs.push(openSub);
          this.subs.push(errorSub);
          return this;
        };
        /**
         * Called upon transport open.
         *
         * @api private
         */


        Manager.prototype.onopen = function () {
          debug('open'); // clear old subs

          this.cleanup(); // mark as open

          this.readyState = 'open';
          this.emit('open'); // add new subs

          var socket = this.engine;
          this.subs.push(on(socket, 'data', bind(this, 'ondata')));
          this.subs.push(on(socket, 'ping', bind(this, 'onping')));
          this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
          this.subs.push(on(socket, 'error', bind(this, 'onerror')));
          this.subs.push(on(socket, 'close', bind(this, 'onclose')));
          this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
        };
        /**
         * Called upon a ping.
         *
         * @api private
         */


        Manager.prototype.onping = function () {
          this.lastPing = new Date();
          this.emitAll('ping');
        };
        /**
         * Called upon a packet.
         *
         * @api private
         */


        Manager.prototype.onpong = function () {
          this.emitAll('pong', new Date() - this.lastPing);
        };
        /**
         * Called with data.
         *
         * @api private
         */


        Manager.prototype.ondata = function (data) {
          this.decoder.add(data);
        };
        /**
         * Called when parser fully decodes a packet.
         *
         * @api private
         */


        Manager.prototype.ondecoded = function (packet) {
          this.emit('packet', packet);
        };
        /**
         * Called upon socket error.
         *
         * @api private
         */


        Manager.prototype.onerror = function (err) {
          debug('error', err);
          this.emitAll('error', err);
        };
        /**
         * Creates a new socket for the given `nsp`.
         *
         * @return {Socket}
         * @api public
         */


        Manager.prototype.socket = function (nsp) {
          var socket = this.nsps[nsp];

          if (!socket) {
            socket = new Socket(this, nsp);
            this.nsps[nsp] = socket;
            var self = this;
            socket.on('connecting', onConnecting);
            socket.on('connect', function () {
              socket.id = self.engine.id;
            });

            if (this.autoConnect) {
              // manually call here since connecting evnet is fired before listening
              onConnecting();
            }
          }

          function onConnecting() {
            if (!~indexOf(self.connecting, socket)) {
              self.connecting.push(socket);
            }
          }

          return socket;
        };
        /**
         * Called upon a socket close.
         *
         * @param {Socket} socket
         */


        Manager.prototype.destroy = function (socket) {
          var index = indexOf(this.connecting, socket);
          if (~index) this.connecting.splice(index, 1);
          if (this.connecting.length) return;
          this.close();
        };
        /**
         * Writes a packet.
         *
         * @param {Object} packet
         * @api private
         */


        Manager.prototype.packet = function (packet) {
          debug('writing packet %j', packet);
          var self = this;

          if (!self.encoding) {
            // encode, then write to engine with result
            self.encoding = true;
            this.encoder.encode(packet, function (encodedPackets) {
              for (var i = 0; i < encodedPackets.length; i++) {
                self.engine.write(encodedPackets[i], packet.options);
              }

              self.encoding = false;
              self.processPacketQueue();
            });
          } else {
            // add packet to the queue
            self.packetBuffer.push(packet);
          }
        };
        /**
         * If packet buffer is non-empty, begins encoding the
         * next packet in line.
         *
         * @api private
         */


        Manager.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var pack = this.packetBuffer.shift();
            this.packet(pack);
          }
        };
        /**
         * Clean up transport subscriptions and packet buffer.
         *
         * @api private
         */


        Manager.prototype.cleanup = function () {
          debug('cleanup');
          var sub;

          while (sub = this.subs.shift()) {
            sub.destroy();
          }

          this.packetBuffer = [];
          this.encoding = false;
          this.lastPing = null;
          this.decoder.destroy();
        };
        /**
         * Close the current socket.
         *
         * @api private
         */


        Manager.prototype.close = Manager.prototype.disconnect = function () {
          debug('disconnect');
          this.skipReconnect = true;
          this.reconnecting = false;

          if ('opening' == this.readyState) {
            // `onclose` will not fire because
            // an open event never happened
            this.cleanup();
          }

          this.backoff.reset();
          this.readyState = 'closed';
          if (this.engine) this.engine.close();
        };
        /**
         * Called upon engine close.
         *
         * @api private
         */


        Manager.prototype.onclose = function (reason) {
          debug('onclose');
          this.cleanup();
          this.backoff.reset();
          this.readyState = 'closed';
          this.emit('close', reason);

          if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
          }
        };
        /**
         * Attempt a reconnection.
         *
         * @api private
         */


        Manager.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;
          var self = this;

          if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug('reconnect failed');
            this.backoff.reset();
            this.emitAll('reconnect_failed');
            this.reconnecting = false;
          } else {
            var delay = this.backoff.duration();
            debug('will wait %dms before reconnect attempt', delay);
            this.reconnecting = true;
            var timer = setTimeout(function () {
              if (self.skipReconnect) return;
              debug('attempting reconnect');
              self.emitAll('reconnect_attempt', self.backoff.attempts);
              self.emitAll('reconnecting', self.backoff.attempts); // check again for the case socket closed in above events

              if (self.skipReconnect) return;
              self.open(function (err) {
                if (err) {
                  debug('reconnect attempt error');
                  self.reconnecting = false;
                  self.reconnect();
                  self.emitAll('reconnect_error', err.data);
                } else {
                  debug('reconnect success');
                  self.onreconnect();
                }
              });
            }, delay);
            this.subs.push({
              destroy: function destroy() {
                clearTimeout(timer);
              }
            });
          }
        };
        /**
         * Called upon successful reconnect.
         *
         * @api private
         */


        Manager.prototype.onreconnect = function () {
          var attempt = this.backoff.attempts;
          this.reconnecting = false;
          this.backoff.reset();
          this.updateSocketIds();
          this.emitAll('reconnect', attempt);
        };
      }, {
        "./on": 33,
        "./socket": 34,
        "backo2": 36,
        "component-bind": 37,
        "component-emitter": 38,
        "debug": 39,
        "engine.io-client": 1,
        "indexof": 42,
        "socket.io-parser": 47
      }],
      33: [function (_dereq_, module, exports) {
        /**
         * Module exports.
         */
        module.exports = on;
        /**
         * Helper for subscriptions.
         *
         * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
         * @param {String} event name
         * @param {Function} callback
         * @api public
         */

        function on(obj, ev, fn) {
          obj.on(ev, fn);
          return {
            destroy: function destroy() {
              obj.removeListener(ev, fn);
            }
          };
        }
      }, {}],
      34: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var parser = _dereq_('socket.io-parser');

        var Emitter = _dereq_('component-emitter');

        var toArray = _dereq_('to-array');

        var on = _dereq_('./on');

        var bind = _dereq_('component-bind');

        var debug = _dereq_('debug')('socket.io-client:socket');

        var hasBin = _dereq_('has-binary');
        /**
         * Module exports.
         */


        module.exports = exports = Socket;
        /**
         * Internal events (blacklisted).
         * These events can't be emitted by the user.
         *
         * @api private
         */

        var events = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1
        };
        /**
         * Shortcut to `Emitter#emit`.
         */

        var emit = Emitter.prototype.emit;
        /**
         * `Socket` constructor.
         *
         * @api public
         */

        function Socket(io, nsp) {
          this.io = io;
          this.nsp = nsp;
          this.json = this; // compat

          this.ids = 0;
          this.acks = {};
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.connected = false;
          this.disconnected = true;
          if (this.io.autoConnect) this.open();
        }
        /**
         * Mix in `Emitter`.
         */


        Emitter(Socket.prototype);
        /**
         * Subscribe to open, close and packet events
         *
         * @api private
         */

        Socket.prototype.subEvents = function () {
          if (this.subs) return;
          var io = this.io;
          this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
        };
        /**
         * "Opens" the socket.
         *
         * @api public
         */


        Socket.prototype.open = Socket.prototype.connect = function () {
          if (this.connected) return this;
          this.subEvents();
          this.io.open(); // ensure open

          if ('open' == this.io.readyState) this.onopen();
          this.emit('connecting');
          return this;
        };
        /**
         * Sends a `message` event.
         *
         * @return {Socket} self
         * @api public
         */


        Socket.prototype.send = function () {
          var args = toArray(arguments);
          args.unshift('message');
          this.emit.apply(this, args);
          return this;
        };
        /**
         * Override `emit`.
         * If the event is in `events`, it's emitted normally.
         *
         * @param {String} event name
         * @return {Socket} self
         * @api public
         */


        Socket.prototype.emit = function (ev) {
          if (events.hasOwnProperty(ev)) {
            emit.apply(this, arguments);
            return this;
          }

          var args = toArray(arguments);
          var parserType = parser.EVENT; // default

          if (hasBin(args)) {
            parserType = parser.BINARY_EVENT;
          } // binary


          var packet = {
            type: parserType,
            data: args
          };
          packet.options = {};
          packet.options.compress = !this.flags || false !== this.flags.compress; // event ack callback

          if ('function' == typeof args[args.length - 1]) {
            debug('emitting packet with ack id %d', this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
          }

          if (this.connected) {
            this.packet(packet);
          } else {
            this.sendBuffer.push(packet);
          }

          delete this.flags;
          return this;
        };
        /**
         * Sends a packet.
         *
         * @param {Object} packet
         * @api private
         */


        Socket.prototype.packet = function (packet) {
          packet.nsp = this.nsp;
          this.io.packet(packet);
        };
        /**
         * Called upon engine `open`.
         *
         * @api private
         */


        Socket.prototype.onopen = function () {
          debug('transport is open - connecting'); // write connect packet if necessary

          if ('/' != this.nsp) {
            this.packet({
              type: parser.CONNECT
            });
          }
        };
        /**
         * Called upon engine `close`.
         *
         * @param {String} reason
         * @api private
         */


        Socket.prototype.onclose = function (reason) {
          debug('close (%s)', reason);
          this.connected = false;
          this.disconnected = true;
          delete this.id;
          this.emit('disconnect', reason);
        };
        /**
         * Called with socket packet.
         *
         * @param {Object} packet
         * @api private
         */


        Socket.prototype.onpacket = function (packet) {
          if (packet.nsp != this.nsp) return;

          switch (packet.type) {
            case parser.CONNECT:
              this.onconnect();
              break;

            case parser.EVENT:
              this.onevent(packet);
              break;

            case parser.BINARY_EVENT:
              this.onevent(packet);
              break;

            case parser.ACK:
              this.onack(packet);
              break;

            case parser.BINARY_ACK:
              this.onack(packet);
              break;

            case parser.DISCONNECT:
              this.ondisconnect();
              break;

            case parser.ERROR:
              this.emit('error', packet.data);
              break;
          }
        };
        /**
         * Called upon a server event.
         *
         * @param {Object} packet
         * @api private
         */


        Socket.prototype.onevent = function (packet) {
          var args = packet.data || [];
          debug('emitting event %j', args);

          if (null != packet.id) {
            debug('attaching ack callback to event');
            args.push(this.ack(packet.id));
          }

          if (this.connected) {
            emit.apply(this, args);
          } else {
            this.receiveBuffer.push(args);
          }
        };
        /**
         * Produces an ack callback to emit with an event.
         *
         * @api private
         */


        Socket.prototype.ack = function (id) {
          var self = this;
          var sent = false;
          return function () {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            var args = toArray(arguments);
            debug('sending ack %j', args);
            var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
            self.packet({
              type: type,
              id: id,
              data: args
            });
          };
        };
        /**
         * Called upon a server acknowlegement.
         *
         * @param {Object} packet
         * @api private
         */


        Socket.prototype.onack = function (packet) {
          var ack = this.acks[packet.id];

          if ('function' == typeof ack) {
            debug('calling ack %s with %j', packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
          } else {
            debug('bad ack %s', packet.id);
          }
        };
        /**
         * Called upon server connect.
         *
         * @api private
         */


        Socket.prototype.onconnect = function () {
          this.connected = true;
          this.disconnected = false;
          this.emit('connect');
          this.emitBuffered();
        };
        /**
         * Emit buffered events (received and emitted).
         *
         * @api private
         */


        Socket.prototype.emitBuffered = function () {
          var i;

          for (i = 0; i < this.receiveBuffer.length; i++) {
            emit.apply(this, this.receiveBuffer[i]);
          }

          this.receiveBuffer = [];

          for (i = 0; i < this.sendBuffer.length; i++) {
            this.packet(this.sendBuffer[i]);
          }

          this.sendBuffer = [];
        };
        /**
         * Called upon server disconnect.
         *
         * @api private
         */


        Socket.prototype.ondisconnect = function () {
          debug('server disconnect (%s)', this.nsp);
          this.destroy();
          this.onclose('io server disconnect');
        };
        /**
         * Called upon forced client/server side disconnections,
         * this method ensures the manager stops tracking us and
         * that reconnections don't get triggered for this.
         *
         * @api private.
         */


        Socket.prototype.destroy = function () {
          if (this.subs) {
            // clean subscriptions to avoid reconnections
            for (var i = 0; i < this.subs.length; i++) {
              this.subs[i].destroy();
            }

            this.subs = null;
          }

          this.io.destroy(this);
        };
        /**
         * Disconnects the socket manually.
         *
         * @return {Socket} self
         * @api public
         */


        Socket.prototype.close = Socket.prototype.disconnect = function () {
          if (this.connected) {
            debug('performing disconnect (%s)', this.nsp);
            this.packet({
              type: parser.DISCONNECT
            });
          } // remove socket from pool


          this.destroy();

          if (this.connected) {
            // fire events
            this.onclose('io client disconnect');
          }

          return this;
        };
        /**
         * Sets the compress flag.
         *
         * @param {Boolean} if `true`, compresses the sending data
         * @return {Socket} self
         * @api public
         */


        Socket.prototype.compress = function (compress) {
          this.flags = this.flags || {};
          this.flags.compress = compress;
          return this;
        };
      }, {
        "./on": 33,
        "component-bind": 37,
        "component-emitter": 38,
        "debug": 39,
        "has-binary": 41,
        "socket.io-parser": 47,
        "to-array": 51
      }],
      35: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */
          var parseuri = _dereq_('parseuri');

          var debug = _dereq_('debug')('socket.io-client:url');
          /**
           * Module exports.
           */


          module.exports = url;
          /**
           * URL parser.
           *
           * @param {String} url
           * @param {Object} An object meant to mimic window.location.
           *                 Defaults to window.location.
           * @api public
           */

          function url(uri, loc) {
            var obj = uri; // default to window.location

            var loc = loc || global.location;
            if (null == uri) uri = loc.protocol + '//' + loc.host; // relative path support

            if ('string' == typeof uri) {
              if ('/' == uri.charAt(0)) {
                if ('/' == uri.charAt(1)) {
                  uri = loc.protocol + uri;
                } else {
                  uri = loc.host + uri;
                }
              }

              if (!/^(https?|wss?):\/\//.test(uri)) {
                debug('protocol-less url %s', uri);

                if ('undefined' != typeof loc) {
                  uri = loc.protocol + '//' + uri;
                } else {
                  uri = 'https://' + uri;
                }
              } // parse


              debug('parse %s', uri);
              obj = parseuri(uri);
            } // make sure we treat `localhost:80` and `localhost` equally


            if (!obj.port) {
              if (/^(http|ws)$/.test(obj.protocol)) {
                obj.port = '80';
              } else if (/^(http|ws)s$/.test(obj.protocol)) {
                obj.port = '443';
              }
            }

            obj.path = obj.path || '/';
            var ipv6 = obj.host.indexOf(':') !== -1;
            var host = ipv6 ? '[' + obj.host + ']' : obj.host; // define unique id

            obj.id = obj.protocol + '://' + host + ':' + obj.port; // define href

            obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port ? '' : ':' + obj.port);
            return obj;
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "debug": 39,
        "parseuri": 45
      }],
      36: [function (_dereq_, module, exports) {
        /**
         * Expose `Backoff`.
         */
        module.exports = Backoff;
        /**
         * Initialize backoff timer with `opts`.
         *
         * - `min` initial timeout in milliseconds [100]
         * - `max` max timeout [10000]
         * - `jitter` [0]
         * - `factor` [2]
         *
         * @param {Object} opts
         * @api public
         */

        function Backoff(opts) {
          opts = opts || {};
          this.ms = opts.min || 100;
          this.max = opts.max || 10000;
          this.factor = opts.factor || 2;
          this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
          this.attempts = 0;
        }
        /**
         * Return the backoff duration.
         *
         * @return {Number}
         * @api public
         */


        Backoff.prototype.duration = function () {
          var ms = this.ms * Math.pow(this.factor, this.attempts++);

          if (this.jitter) {
            var rand = Math.random();
            var deviation = Math.floor(rand * this.jitter * ms);
            ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
          }

          return Math.min(ms, this.max) | 0;
        };
        /**
         * Reset the number of attempts.
         *
         * @api public
         */


        Backoff.prototype.reset = function () {
          this.attempts = 0;
        };
        /**
         * Set the minimum duration
         *
         * @api public
         */


        Backoff.prototype.setMin = function (min) {
          this.ms = min;
        };
        /**
         * Set the maximum duration
         *
         * @api public
         */


        Backoff.prototype.setMax = function (max) {
          this.max = max;
        };
        /**
         * Set the jitter
         *
         * @api public
         */


        Backoff.prototype.setJitter = function (jitter) {
          this.jitter = jitter;
        };
      }, {}],
      37: [function (_dereq_, module, exports) {
        /**
         * Slice reference.
         */
        var slice = [].slice;
        /**
         * Bind `obj` to `fn`.
         *
         * @param {Object} obj
         * @param {Function|String} fn or string
         * @return {Function}
         * @api public
         */

        module.exports = function (obj, fn) {
          if ('string' == typeof fn) fn = obj[fn];
          if ('function' != typeof fn) throw new Error('bind() requires a function');
          var args = slice.call(arguments, 2);
          return function () {
            return fn.apply(obj, args.concat(slice.call(arguments)));
          };
        };
      }, {}],
      38: [function (_dereq_, module, exports) {
        /**
         * Expose `Emitter`.
         */
        module.exports = Emitter;
        /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */

        function Emitter(obj) {
          if (obj) return mixin(obj);
        }

        ;
        /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */

        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }

          return obj;
        }
        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
          return this;
        };
        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.once = function (event, fn) {
          function on() {
            this.off(event, on);
            fn.apply(this, arguments);
          }

          on.fn = fn;
          this.on(event, on);
          return this;
        };
        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {}; // all

          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          } // specific event


          var callbacks = this._callbacks['$' + event];
          if (!callbacks) return this; // remove all handlers

          if (1 == arguments.length) {
            delete this._callbacks['$' + event];
            return this;
          } // remove specific handler


          var cb;

          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];

            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }

          return this;
        };
        /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */


        Emitter.prototype.emit = function (event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks['$' + event];

          if (callbacks) {
            callbacks = callbacks.slice(0);

            for (var i = 0, len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }

          return this;
        };
        /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */


        Emitter.prototype.listeners = function (event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks['$' + event] || [];
        };
        /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */


        Emitter.prototype.hasListeners = function (event) {
          return !!this.listeners(event).length;
        };
      }, {}],
      39: [function (_dereq_, module, exports) {
        arguments[4][17][0].apply(exports, arguments);
      }, {
        "./debug": 40,
        "dup": 17
      }],
      40: [function (_dereq_, module, exports) {
        arguments[4][18][0].apply(exports, arguments);
      }, {
        "dup": 18,
        "ms": 44
      }],
      41: [function (_dereq_, module, exports) {
        (function (global) {
          /*
           * Module requirements.
           */
          var isArray = _dereq_('isarray');
          /**
           * Module exports.
           */


          module.exports = hasBinary;
          /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */

          function hasBinary(data) {
            function _hasBinary(obj) {
              if (!obj) return false;

              if (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                return true;
              }

              if (isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                  if (_hasBinary(obj[i])) {
                    return true;
                  }
                }
              } else if (obj && 'object' == typeof obj) {
                // see: https://github.com/Automattic/has-binary/pull/4
                if (obj.toJSON && 'function' == typeof obj.toJSON) {
                  obj = obj.toJSON();
                }

                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                    return true;
                  }
                }
              }

              return false;
            }

            return _hasBinary(data);
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "isarray": 43
      }],
      42: [function (_dereq_, module, exports) {
        arguments[4][23][0].apply(exports, arguments);
      }, {
        "dup": 23
      }],
      43: [function (_dereq_, module, exports) {
        arguments[4][24][0].apply(exports, arguments);
      }, {
        "dup": 24
      }],
      44: [function (_dereq_, module, exports) {
        arguments[4][25][0].apply(exports, arguments);
      }, {
        "dup": 25
      }],
      45: [function (_dereq_, module, exports) {
        arguments[4][28][0].apply(exports, arguments);
      }, {
        "dup": 28
      }],
      46: [function (_dereq_, module, exports) {
        (function (global) {
          /*global Blob,File*/

          /**
           * Module requirements
           */
          var isArray = _dereq_('isarray');

          var isBuf = _dereq_('./is-buffer');
          /**
           * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
           * Anything with blobs or files should be fed through removeBlobs before coming
           * here.
           *
           * @param {Object} packet - socket.io event packet
           * @return {Object} with deconstructed packet and list of buffers
           * @api public
           */


          exports.deconstructPacket = function (packet) {
            var buffers = [];
            var packetData = packet.data;

            function _deconstructPacket(data) {
              if (!data) return data;

              if (isBuf(data)) {
                var placeholder = {
                  _placeholder: true,
                  num: buffers.length
                };
                buffers.push(data);
                return placeholder;
              } else if (isArray(data)) {
                var newData = new Array(data.length);

                for (var i = 0; i < data.length; i++) {
                  newData[i] = _deconstructPacket(data[i]);
                }

                return newData;
              } else if ('object' == typeof data && !(data instanceof Date)) {
                var newData = {};

                for (var key in data) {
                  newData[key] = _deconstructPacket(data[key]);
                }

                return newData;
              }

              return data;
            }

            var pack = packet;
            pack.data = _deconstructPacket(packetData);
            pack.attachments = buffers.length; // number of binary 'attachments'

            return {
              packet: pack,
              buffers: buffers
            };
          };
          /**
           * Reconstructs a binary packet from its placeholder packet and buffers
           *
           * @param {Object} packet - event packet with placeholders
           * @param {Array} buffers - binary buffers to put in placeholder positions
           * @return {Object} reconstructed packet
           * @api public
           */


          exports.reconstructPacket = function (packet, buffers) {
            var curPlaceHolder = 0;

            function _reconstructPacket(data) {
              if (data && data._placeholder) {
                var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)

                return buf;
              } else if (isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                  data[i] = _reconstructPacket(data[i]);
                }

                return data;
              } else if (data && 'object' == typeof data) {
                for (var key in data) {
                  data[key] = _reconstructPacket(data[key]);
                }

                return data;
              }

              return data;
            }

            packet.data = _reconstructPacket(packet.data);
            packet.attachments = undefined; // no longer useful

            return packet;
          };
          /**
           * Asynchronously removes Blobs or Files from data via
           * FileReader's readAsArrayBuffer method. Used before encoding
           * data as msgpack. Calls callback with the blobless data.
           *
           * @param {Object} data
           * @param {Function} callback
           * @api private
           */


          exports.removeBlobs = function (data, callback) {
            function _removeBlobs(obj, curKey, containingObject) {
              if (!obj) return obj; // convert any blob

              if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                pendingBlobs++; // async filereader

                var fileReader = new FileReader();

                fileReader.onload = function () {
                  // this.result == arraybuffer
                  if (containingObject) {
                    containingObject[curKey] = this.result;
                  } else {
                    bloblessData = this.result;
                  } // if nothing pending its callback time


                  if (! --pendingBlobs) {
                    callback(bloblessData);
                  }
                };

                fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
              } else if (isArray(obj)) {
                // handle array
                for (var i = 0; i < obj.length; i++) {
                  _removeBlobs(obj[i], i, obj);
                }
              } else if (obj && 'object' == typeof obj && !isBuf(obj)) {
                // and object
                for (var key in obj) {
                  _removeBlobs(obj[key], key, obj);
                }
              }
            }

            var pendingBlobs = 0;
            var bloblessData = data;

            _removeBlobs(bloblessData);

            if (!pendingBlobs) {
              callback(bloblessData);
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {
        "./is-buffer": 48,
        "isarray": 43
      }],
      47: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */
        var debug = _dereq_('debug')('socket.io-parser');

        var json = _dereq_('json3');

        var isArray = _dereq_('isarray');

        var Emitter = _dereq_('component-emitter');

        var binary = _dereq_('./binary');

        var isBuf = _dereq_('./is-buffer');
        /**
         * Protocol version.
         *
         * @api public
         */


        exports.protocol = 4;
        /**
         * Packet types.
         *
         * @api public
         */

        exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'BINARY_EVENT', 'ACK', 'BINARY_ACK', 'ERROR'];
        /**
         * Packet type `connect`.
         *
         * @api public
         */

        exports.CONNECT = 0;
        /**
         * Packet type `disconnect`.
         *
         * @api public
         */

        exports.DISCONNECT = 1;
        /**
         * Packet type `event`.
         *
         * @api public
         */

        exports.EVENT = 2;
        /**
         * Packet type `ack`.
         *
         * @api public
         */

        exports.ACK = 3;
        /**
         * Packet type `error`.
         *
         * @api public
         */

        exports.ERROR = 4;
        /**
         * Packet type 'binary event'
         *
         * @api public
         */

        exports.BINARY_EVENT = 5;
        /**
         * Packet type `binary ack`. For acks with binary arguments.
         *
         * @api public
         */

        exports.BINARY_ACK = 6;
        /**
         * Encoder constructor.
         *
         * @api public
         */

        exports.Encoder = Encoder;
        /**
         * Decoder constructor.
         *
         * @api public
         */

        exports.Decoder = Decoder;
        /**
         * A socket.io Encoder instance
         *
         * @api public
         */

        function Encoder() {}
        /**
         * Encode a packet as a single string if non-binary, or as a
         * buffer sequence, depending on packet type.
         *
         * @param {Object} obj - packet object
         * @param {Function} callback - function to handle encodings (likely engine.write)
         * @return Calls callback with Array of encodings
         * @api public
         */


        Encoder.prototype.encode = function (obj, callback) {
          debug('encoding packet %j', obj);

          if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
            encodeAsBinary(obj, callback);
          } else {
            var encoding = encodeAsString(obj);
            callback([encoding]);
          }
        };
        /**
         * Encode packet as string.
         *
         * @param {Object} packet
         * @return {String} encoded
         * @api private
         */


        function encodeAsString(obj) {
          var str = '';
          var nsp = false; // first is type

          str += obj.type; // attachments if we have them

          if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
            str += obj.attachments;
            str += '-';
          } // if we have a namespace other than `/`
          // we append it followed by a comma `,`


          if (obj.nsp && '/' != obj.nsp) {
            nsp = true;
            str += obj.nsp;
          } // immediately followed by the id


          if (null != obj.id) {
            if (nsp) {
              str += ',';
              nsp = false;
            }

            str += obj.id;
          } // json data


          if (null != obj.data) {
            if (nsp) str += ',';
            str += json.stringify(obj.data);
          }

          debug('encoded %j as %s', obj, str);
          return str;
        }
        /**
         * Encode packet as 'buffer sequence' by removing blobs, and
         * deconstructing packet into object with placeholders and
         * a list of buffers.
         *
         * @param {Object} packet
         * @return {Buffer} encoded
         * @api private
         */


        function encodeAsBinary(obj, callback) {
          function writeEncoding(bloblessData) {
            var deconstruction = binary.deconstructPacket(bloblessData);
            var pack = encodeAsString(deconstruction.packet);
            var buffers = deconstruction.buffers;
            buffers.unshift(pack); // add packet info to beginning of data list

            callback(buffers); // write all the buffers
          }

          binary.removeBlobs(obj, writeEncoding);
        }
        /**
         * A socket.io Decoder instance
         *
         * @return {Object} decoder
         * @api public
         */


        function Decoder() {
          this.reconstructor = null;
        }
        /**
         * Mix in `Emitter` with Decoder.
         */


        Emitter(Decoder.prototype);
        /**
         * Decodes an ecoded packet string into packet JSON.
         *
         * @param {String} obj - encoded packet
         * @return {Object} packet
         * @api public
         */

        Decoder.prototype.add = function (obj) {
          var packet;

          if ('string' == typeof obj) {
            packet = decodeString(obj);

            if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
              // binary packet's json
              this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

              if (this.reconstructor.reconPack.attachments === 0) {
                this.emit('decoded', packet);
              }
            } else {
              // non-binary full packet
              this.emit('decoded', packet);
            }
          } else if (isBuf(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
              throw new Error('got binary data when not reconstructing a packet');
            } else {
              packet = this.reconstructor.takeBinaryData(obj);

              if (packet) {
                // received final buffer
                this.reconstructor = null;
                this.emit('decoded', packet);
              }
            }
          } else {
            throw new Error('Unknown type: ' + obj);
          }
        };
        /**
         * Decode a packet String (JSON data)
         *
         * @param {String} str
         * @return {Object} packet
         * @api private
         */


        function decodeString(str) {
          var p = {};
          var i = 0; // look up type

          p.type = Number(str.charAt(0));
          if (null == exports.types[p.type]) return error(); // look up attachments if type binary

          if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
            var buf = '';

            while (str.charAt(++i) != '-') {
              buf += str.charAt(i);
              if (i == str.length) break;
            }

            if (buf != Number(buf) || str.charAt(i) != '-') {
              throw new Error('Illegal attachments');
            }

            p.attachments = Number(buf);
          } // look up namespace (if any)


          if ('/' == str.charAt(i + 1)) {
            p.nsp = '';

            while (++i) {
              var c = str.charAt(i);
              if (',' == c) break;
              p.nsp += c;
              if (i == str.length) break;
            }
          } else {
            p.nsp = '/';
          } // look up id


          var next = str.charAt(i + 1);

          if ('' !== next && Number(next) == next) {
            p.id = '';

            while (++i) {
              var c = str.charAt(i);

              if (null == c || Number(c) != c) {
                --i;
                break;
              }

              p.id += str.charAt(i);
              if (i == str.length) break;
            }

            p.id = Number(p.id);
          } // look up json data


          if (str.charAt(++i)) {
            try {
              p.data = json.parse(str.substr(i));
            } catch (e) {
              return error();
            }
          }

          debug('decoded %s as %j', str, p);
          return p;
        }
        /**
         * Deallocates a parser's resources
         *
         * @api public
         */


        Decoder.prototype.destroy = function () {
          if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
          }
        };
        /**
         * A manager of a binary event's 'buffer sequence'. Should
         * be constructed whenever a packet of type BINARY_EVENT is
         * decoded.
         *
         * @param {Object} packet
         * @return {BinaryReconstructor} initialized reconstructor
         * @api private
         */


        function BinaryReconstructor(packet) {
          this.reconPack = packet;
          this.buffers = [];
        }
        /**
         * Method to be called when binary data received from connection
         * after a BINARY_EVENT packet.
         *
         * @param {Buffer | ArrayBuffer} binData - the raw binary data received
         * @return {null | Object} returns null if more binary data is expected or
         *   a reconstructed packet object if all buffers have been received.
         * @api private
         */


        BinaryReconstructor.prototype.takeBinaryData = function (binData) {
          this.buffers.push(binData);

          if (this.buffers.length == this.reconPack.attachments) {
            // done with buffer list
            var packet = binary.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
          }

          return null;
        };
        /**
         * Cleans up binary packet reconstruction variables.
         *
         * @api private
         */


        BinaryReconstructor.prototype.finishedReconstruction = function () {
          this.reconPack = null;
          this.buffers = [];
        };

        function error(data) {
          return {
            type: exports.ERROR,
            data: 'parser error'
          };
        }
      }, {
        "./binary": 46,
        "./is-buffer": 48,
        "component-emitter": 49,
        "debug": 39,
        "isarray": 43,
        "json3": 50
      }],
      48: [function (_dereq_, module, exports) {
        (function (global) {
          module.exports = isBuf;
          /**
           * Returns true if obj is a buffer or an arraybuffer.
           *
           * @api private
           */

          function isBuf(obj) {
            return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}],
      49: [function (_dereq_, module, exports) {
        arguments[4][15][0].apply(exports, arguments);
      }, {
        "dup": 15
      }],
      50: [function (_dereq_, module, exports) {
        (function (global) {
          /*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
          ;
          (function () {
            // Detect the `define` function exposed by asynchronous module loaders. The
            // strict `define` check is necessary for compatibility with `r.js`.
            var isLoader = typeof define === "function" && define.amd; // A set of types used to distinguish objects from primitives.

            var objectTypes = {
              "function": true,
              "object": true
            }; // Detect the `exports` object exposed by CommonJS implementations.

            var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports; // Use the `global` object exposed by Node (including Browserify via
            // `insert-module-globals`), Narwhal, and Ringo as the default context,
            // and the `window` object in browsers. Rhino exports a `global` function
            // instead.

            var root = objectTypes[typeof window] && window || this,
                freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

            if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
              root = freeGlobal;
            } // Public: Initializes JSON 3 using the given `context` object, attaching the
            // `stringify` and `parse` functions to the specified `exports` object.


            function runInContext(context, exports) {
              context || (context = root["Object"]());
              exports || (exports = root["Object"]()); // Native constructor aliases.

              var Number = context["Number"] || root["Number"],
                  String = context["String"] || root["String"],
                  Object = context["Object"] || root["Object"],
                  Date = context["Date"] || root["Date"],
                  SyntaxError = context["SyntaxError"] || root["SyntaxError"],
                  TypeError = context["TypeError"] || root["TypeError"],
                  Math = context["Math"] || root["Math"],
                  nativeJSON = context["JSON"] || root["JSON"]; // Delegate to the native `stringify` and `parse` implementations.

              if (typeof nativeJSON == "object" && nativeJSON) {
                exports.stringify = nativeJSON.stringify;
                exports.parse = nativeJSON.parse;
              } // Convenience aliases.


              var objectProto = Object.prototype,
                  getClass = objectProto.toString,
                  _isProperty,
                  _forEach,
                  undef; // Test the `Date#getUTC*` methods. Based on work by @Yaffle.


              var isExtended = new Date(-3509827334573292);

              try {
                // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
                // results for certain dates in Opera >= 10.53.
                isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && // Safari < 2.0.2 stores the internal millisecond time value correctly,
                // but clips the values returned by the date methods to the range of
                // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
                isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
              } catch (exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
              // implementations are spec-compliant. Based on work by Ken Snyder.


              function has(name) {
                if (has[name] !== undef) {
                  // Return cached feature test result.
                  return has[name];
                }

                var isSupported;

                if (name == "bug-string-char-index") {
                  // IE <= 7 doesn't support accessing string characters using square
                  // bracket notation. IE 8 only supports this for primitives.
                  isSupported = "a"[0] != "a";
                } else if (name == "json") {
                  // Indicates whether both `JSON.stringify` and `JSON.parse` are
                  // supported.
                  isSupported = has("json-stringify") && has("json-parse");
                } else {
                  var value,
                      serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}"; // Test `JSON.stringify`.

                  if (name == "json-stringify") {
                    var stringify = exports.stringify,
                        stringifySupported = typeof stringify == "function" && isExtended;

                    if (stringifySupported) {
                      // A test function object with a custom `toJSON` method.
                      (value = function value() {
                        return 1;
                      }).toJSON = value;

                      try {
                        stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                        // primitives as object literals.
                        stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                        // literals.
                        stringify(new Number()) === "0" && stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                        // does not define a canonical JSON representation (this applies to
                        // objects with `toJSON` properties as well, *unless* they are nested
                        // within an object or array).
                        stringify(getClass) === undef && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                        // FF 3.1b3 pass this test.
                        stringify(undef) === undef && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                        // respectively, if the value is omitted entirely.
                        stringify() === undef && // FF 3.1b1, 2 throw an error if the given value is not a number,
                        // string, array, object, Boolean, or `null` literal. This applies to
                        // objects with custom `toJSON` methods as well, unless they are nested
                        // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                        // methods entirely.
                        stringify(value) === "1" && stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                        // `"[null]"`.
                        stringify([undef]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                        stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                        // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                        // elides non-JSON values from objects and arrays, unless they
                        // define custom `toJSON` methods.
                        stringify([undef, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                        // where character escape codes are expected (e.g., `\b` => `\u0008`).
                        stringify({
                          "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                        }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                        stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                        // serialize extended years.
                        stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                        stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                        // four-digit years instead of six-digit years. Credits: @Yaffle.
                        stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                        // values less than 1000. Credits: @Yaffle.
                        stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                      } catch (exception) {
                        stringifySupported = false;
                      }
                    }

                    isSupported = stringifySupported;
                  } // Test `JSON.parse`.


                  if (name == "json-parse") {
                    var parse = exports.parse;

                    if (typeof parse == "function") {
                      try {
                        // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                        // Conforming implementations should also coerce the initial argument to
                        // a string prior to parsing.
                        if (parse("0") === 0 && !parse(false)) {
                          // Simple parsing test.
                          value = parse(serialized);
                          var parseSupported = value["a"].length == 5 && value["a"][0] === 1;

                          if (parseSupported) {
                            try {
                              // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                              parseSupported = !parse('"\t"');
                            } catch (exception) {}

                            if (parseSupported) {
                              try {
                                // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                                // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                                // certain octal literals.
                                parseSupported = parse("01") !== 1;
                              } catch (exception) {}
                            }

                            if (parseSupported) {
                              try {
                                // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                                // points. These environments, along with FF 3.1b1 and 2,
                                // also allow trailing commas in JSON objects and arrays.
                                parseSupported = parse("1.") !== 1;
                              } catch (exception) {}
                            }
                          }
                        }
                      } catch (exception) {
                        parseSupported = false;
                      }
                    }

                    isSupported = parseSupported;
                  }
                }

                return has[name] = !!isSupported;
              }

              if (!has("json")) {
                // Common `[[Class]]` name aliases.
                var functionClass = "[object Function]",
                    dateClass = "[object Date]",
                    numberClass = "[object Number]",
                    stringClass = "[object String]",
                    arrayClass = "[object Array]",
                    booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.

                var charIndexBuggy = has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.

                if (!isExtended) {
                  var floor = Math.floor; // A mapping between the months of the year and the number of days between
                  // January 1st and the first of the respective month.

                  var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; // Internal: Calculates the number of days between the Unix epoch and the
                  // first day of the given month.

                  var getDay = function getDay(year, month) {
                    return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                  };
                } // Internal: Determines if a property is a direct property of the given
                // object. Delegates to the native `Object#hasOwnProperty` method.


                if (!(_isProperty = objectProto.hasOwnProperty)) {
                  _isProperty = function isProperty(property) {
                    var members = {},
                        constructor;

                    if ((members.__proto__ = null, members.__proto__ = {
                      // The *proto* property cannot be set multiple times in recent
                      // versions of Firefox and SeaMonkey.
                      "toString": 1
                    }, members).toString != getClass) {
                      // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                      // supports the mutable *proto* property.
                      _isProperty = function isProperty(property) {
                        // Capture and break the object's prototype chain (see section 8.6.2
                        // of the ES 5.1 spec). The parenthesized expression prevents an
                        // unsafe transformation by the Closure Compiler.
                        var original = this.__proto__,
                            result = (property in (this.__proto__ = null, this)); // Restore the original prototype chain.

                        this.__proto__ = original;
                        return result;
                      };
                    } else {
                      // Capture a reference to the top-level `Object` constructor.
                      constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
                      // other environments.

                      _isProperty = function isProperty(property) {
                        var parent = (this.constructor || constructor).prototype;
                        return property in this && !(property in parent && this[property] === parent[property]);
                      };
                    }

                    members = null;
                    return _isProperty.call(this, property);
                  };
                } // Internal: Normalizes the `for...in` iteration algorithm across
                // environments. Each enumerated key is yielded to a `callback` function.


                _forEach = function forEach(object, callback) {
                  var size = 0,
                      Properties,
                      members,
                      property; // Tests for bugs in the current environment's `for...in` algorithm. The
                  // `valueOf` property inherits the non-enumerable flag from
                  // `Object.prototype` in older versions of IE, Netscape, and Mozilla.

                  (Properties = function Properties() {
                    this.valueOf = 0;
                  }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.

                  members = new Properties();

                  for (property in members) {
                    // Ignore all properties inherited from `Object.prototype`.
                    if (_isProperty.call(members, property)) {
                      size++;
                    }
                  }

                  Properties = members = null; // Normalize the iteration algorithm.

                  if (!size) {
                    // A list of non-enumerable properties inherited from `Object.prototype`.
                    members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                    // properties.

                    _forEach = function forEach(object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          length;
                      var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || _isProperty;

                      for (property in object) {
                        // Gecko <= 1.0 enumerates the `prototype` property of functions under
                        // certain conditions; IE does not.
                        if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                          callback(property);
                        }
                      } // Manually invoke the callback for each non-enumerable property.


                      for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {
                        ;
                      }
                    };
                  } else if (size == 2) {
                    // Safari <= 2.0.4 enumerates shadowed properties twice.
                    _forEach = function forEach(object, callback) {
                      // Create a set of iterated properties.
                      var members = {},
                          isFunction = getClass.call(object) == functionClass,
                          property;

                      for (property in object) {
                        // Store each property name to prevent double enumeration. The
                        // `prototype` property of functions is not enumerated due to cross-
                        // environment inconsistencies.
                        if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
                          callback(property);
                        }
                      }
                    };
                  } else {
                    // No bugs detected; use the standard `for...in` algorithm.
                    _forEach = function forEach(object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          isConstructor;

                      for (property in object) {
                        if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                          callback(property);
                        }
                      } // Manually invoke the callback for the `constructor` property due to
                      // cross-environment inconsistencies.


                      if (isConstructor || _isProperty.call(object, property = "constructor")) {
                        callback(property);
                      }
                    };
                  }

                  return _forEach(object, callback);
                }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
                // `filter` argument may specify either a function that alters how object and
                // array members are serialized, or an array of strings and numbers that
                // indicates which properties should be serialized. The optional `width`
                // argument may be either a string or number that specifies the indentation
                // level of the output.


                if (!has("json-stringify")) {
                  // Internal: A map of control characters and their escaped equivalents.
                  var Escapes = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                  }; // Internal: Converts `value` into a zero-padded string such that its
                  // length is at least equal to `width`. The `width` must be <= 6.

                  var leadingZeroes = "000000";

                  var toPaddedString = function toPaddedString(width, value) {
                    // The `|| 0` expression is necessary to work around a bug in
                    // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                    return (leadingZeroes + (value || 0)).slice(-width);
                  }; // Internal: Double-quotes a string `value`, replacing all ASCII control
                  // characters (characters with code unit values between 0 and 31) with
                  // their escaped equivalents. This is an implementation of the
                  // `Quote(value)` operation defined in ES 5.1 section 15.12.3.


                  var unicodePrefix = "\\u00";

                  var quote = function quote(value) {
                    var result = '"',
                        index = 0,
                        length = value.length,
                        useCharIndex = !charIndexBuggy || length > 10;
                    var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);

                    for (; index < length; index++) {
                      var charCode = value.charCodeAt(index); // If the character is a control character, append its Unicode or
                      // shorthand escape sequence; otherwise, append the character as-is.

                      switch (charCode) {
                        case 8:
                        case 9:
                        case 10:
                        case 12:
                        case 13:
                        case 34:
                        case 92:
                          result += Escapes[charCode];
                          break;

                        default:
                          if (charCode < 32) {
                            result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                            break;
                          }

                          result += useCharIndex ? symbols[index] : value.charAt(index);
                      }
                    }

                    return result + '"';
                  }; // Internal: Recursively serializes an object. Implements the
                  // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.


                  var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
                    var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;

                    try {
                      // Necessary for host object support.
                      value = object[property];
                    } catch (exception) {}

                    if (typeof value == "object" && value) {
                      className = getClass.call(value);

                      if (className == dateClass && !_isProperty.call(value, "toJSON")) {
                        if (value > -1 / 0 && value < 1 / 0) {
                          // Dates are serialized according to the `Date#toJSON` method
                          // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                          // for the ISO 8601 date time string format.
                          if (getDay) {
                            // Manually compute the year, month, date, hours, minutes,
                            // seconds, and milliseconds if the `getUTC*` methods are
                            // buggy. Adapted from @Yaffle's `date-shim` project.
                            date = floor(value / 864e5);

                            for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {
                              ;
                            }

                            for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {
                              ;
                            }

                            date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                            // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                            // to compute `A modulo B`, as the `%` operator does not
                            // correspond to the `modulo` operation for negative numbers.

                            time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                            // decomposing the time within the day. See section 15.9.1.10.

                            hours = floor(time / 36e5) % 24;
                            minutes = floor(time / 6e4) % 60;
                            seconds = floor(time / 1e3) % 60;
                            milliseconds = time % 1e3;
                          } else {
                            year = value.getUTCFullYear();
                            month = value.getUTCMonth();
                            date = value.getUTCDate();
                            hours = value.getUTCHours();
                            minutes = value.getUTCMinutes();
                            seconds = value.getUTCSeconds();
                            milliseconds = value.getUTCMilliseconds();
                          } // Serialize extended years correctly.


                          value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                          // digits; milliseconds should have three.
                          "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                          "." + toPaddedString(3, milliseconds) + "Z";
                        } else {
                          value = null;
                        }
                      } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
                        // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                        // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                        // ignores all `toJSON` methods on these objects unless they are
                        // defined directly on an instance.
                        value = value.toJSON(property);
                      }
                    }

                    if (callback) {
                      // If a replacement function was provided, call it to obtain the value
                      // for serialization.
                      value = callback.call(object, property, value);
                    }

                    if (value === null) {
                      return "null";
                    }

                    className = getClass.call(value);

                    if (className == booleanClass) {
                      // Booleans are represented literally.
                      return "" + value;
                    } else if (className == numberClass) {
                      // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                      // `"null"`.
                      return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                    } else if (className == stringClass) {
                      // Strings are double-quoted and escaped.
                      return quote("" + value);
                    } // Recursively serialize objects and arrays.


                    if (typeof value == "object") {
                      // Check for cyclic structures. This is a linear search; performance
                      // is inversely proportional to the number of unique nested objects.
                      for (length = stack.length; length--;) {
                        if (stack[length] === value) {
                          // Cyclic structures cannot be serialized by `JSON.stringify`.
                          throw TypeError();
                        }
                      } // Add the object to the stack of traversed objects.


                      stack.push(value);
                      results = []; // Save the current indentation level and indent one additional level.

                      prefix = indentation;
                      indentation += whitespace;

                      if (className == arrayClass) {
                        // Recursively serialize array elements.
                        for (index = 0, length = value.length; index < length; index++) {
                          element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                          results.push(element === undef ? "null" : element);
                        }

                        result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                      } else {
                        // Recursively serialize object members. Members are selected from
                        // either a user-specified list of property names, or the object
                        // itself.
                        _forEach(properties || value, function (property) {
                          var element = serialize(property, value, callback, properties, whitespace, indentation, stack);

                          if (element !== undef) {
                            // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                            // is not the empty string, let `member` {quote(property) + ":"}
                            // be the concatenation of `member` and the `space` character."
                            // The "`space` character" refers to the literal space
                            // character, not the `space` {width} argument provided to
                            // `JSON.stringify`.
                            results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                          }
                        });

                        result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                      } // Remove the object from the traversed object stack.


                      stack.pop();
                      return result;
                    }
                  }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.


                  exports.stringify = function (source, filter, width) {
                    var whitespace, callback, properties, className;

                    if (objectTypes[typeof filter] && filter) {
                      if ((className = getClass.call(filter)) == functionClass) {
                        callback = filter;
                      } else if (className == arrayClass) {
                        // Convert the property names array into a makeshift set.
                        properties = {};

                        for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {
                          ;
                        }
                      }
                    }

                    if (width) {
                      if ((className = getClass.call(width)) == numberClass) {
                        // Convert the `width` to an integer and create a string containing
                        // `width` number of space characters.
                        if ((width -= width % 1) > 0) {
                          for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {
                            ;
                          }
                        }
                      } else if (className == stringClass) {
                        whitespace = width.length <= 10 ? width : width.slice(0, 10);
                      }
                    } // Opera <= 7.54u2 discards the values associated with empty string keys
                    // (`""`) only if they are used directly within an object member list
                    // (e.g., `!("" in { "": 1})`).


                    return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                  };
                } // Public: Parses a JSON source string.


                if (!has("json-parse")) {
                  var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
                  // equivalents.

                  var Unescapes = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "\t",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                  }; // Internal: Stores the parser state.

                  var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.

                  var abort = function abort() {
                    Index = Source = null;
                    throw SyntaxError();
                  }; // Internal: Returns the next token, or `"$"` if the parser has reached
                  // the end of the source string. A token may be a string, number, `null`
                  // literal, or Boolean literal.


                  var lex = function lex() {
                    var source = Source,
                        length = source.length,
                        value,
                        begin,
                        position,
                        isSigned,
                        charCode;

                    while (Index < length) {
                      charCode = source.charCodeAt(Index);

                      switch (charCode) {
                        case 9:
                        case 10:
                        case 13:
                        case 32:
                          // Skip whitespace tokens, including tabs, carriage returns, line
                          // feeds, and space characters.
                          Index++;
                          break;

                        case 123:
                        case 125:
                        case 91:
                        case 93:
                        case 58:
                        case 44:
                          // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                          // the current position.
                          value = charIndexBuggy ? source.charAt(Index) : source[Index];
                          Index++;
                          return value;

                        case 34:
                          // `"` delimits a JSON string; advance to the next character and
                          // begin parsing the string. String tokens are prefixed with the
                          // sentinel `@` character to distinguish them from punctuators and
                          // end-of-string tokens.
                          for (value = "@", Index++; Index < length;) {
                            charCode = source.charCodeAt(Index);

                            if (charCode < 32) {
                              // Unescaped ASCII control characters (those with a code unit
                              // less than the space character) are not permitted.
                              abort();
                            } else if (charCode == 92) {
                              // A reverse solidus (`\`) marks the beginning of an escaped
                              // control character (including `"`, `\`, and `/`) or Unicode
                              // escape sequence.
                              charCode = source.charCodeAt(++Index);

                              switch (charCode) {
                                case 92:
                                case 34:
                                case 47:
                                case 98:
                                case 116:
                                case 110:
                                case 102:
                                case 114:
                                  // Revive escaped control characters.
                                  value += Unescapes[charCode];
                                  Index++;
                                  break;

                                case 117:
                                  // `\u` marks the beginning of a Unicode escape sequence.
                                  // Advance to the first character and validate the
                                  // four-digit code point.
                                  begin = ++Index;

                                  for (position = Index + 4; Index < position; Index++) {
                                    charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                                    // insensitive) that form a single hexadecimal value.

                                    if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                      // Invalid Unicode escape sequence.
                                      abort();
                                    }
                                  } // Revive the escaped character.


                                  value += fromCharCode("0x" + source.slice(begin, Index));
                                  break;

                                default:
                                  // Invalid escape sequence.
                                  abort();
                              }
                            } else {
                              if (charCode == 34) {
                                // An unescaped double-quote character marks the end of the
                                // string.
                                break;
                              }

                              charCode = source.charCodeAt(Index);
                              begin = Index; // Optimize for the common case where a string is valid.

                              while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                charCode = source.charCodeAt(++Index);
                              } // Append the string as-is.


                              value += source.slice(begin, Index);
                            }
                          }

                          if (source.charCodeAt(Index) == 34) {
                            // Advance to the next character and return the revived string.
                            Index++;
                            return value;
                          } // Unterminated string.


                          abort();

                        default:
                          // Parse numbers and literals.
                          begin = Index; // Advance past the negative sign, if one is specified.

                          if (charCode == 45) {
                            isSigned = true;
                            charCode = source.charCodeAt(++Index);
                          } // Parse an integer or floating-point value.


                          if (charCode >= 48 && charCode <= 57) {
                            // Leading zeroes are interpreted as octal literals.
                            if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                              // Illegal octal literal.
                              abort();
                            }

                            isSigned = false; // Parse the integer component.

                            for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {
                              ;
                            } // Floats cannot contain a leading decimal point; however, this
                            // case is already accounted for by the parser.


                            if (source.charCodeAt(Index) == 46) {
                              position = ++Index; // Parse the decimal component.

                              for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {
                                ;
                              }

                              if (position == Index) {
                                // Illegal trailing decimal.
                                abort();
                              }

                              Index = position;
                            } // Parse exponents. The `e` denoting the exponent is
                            // case-insensitive.


                            charCode = source.charCodeAt(Index);

                            if (charCode == 101 || charCode == 69) {
                              charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                              // specified.

                              if (charCode == 43 || charCode == 45) {
                                Index++;
                              } // Parse the exponential component.


                              for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {
                                ;
                              }

                              if (position == Index) {
                                // Illegal empty exponent.
                                abort();
                              }

                              Index = position;
                            } // Coerce the parsed value to a JavaScript number.


                            return +source.slice(begin, Index);
                          } // A negative sign may only precede numbers.


                          if (isSigned) {
                            abort();
                          } // `true`, `false`, and `null` literals.


                          if (source.slice(Index, Index + 4) == "true") {
                            Index += 4;
                            return true;
                          } else if (source.slice(Index, Index + 5) == "false") {
                            Index += 5;
                            return false;
                          } else if (source.slice(Index, Index + 4) == "null") {
                            Index += 4;
                            return null;
                          } // Unrecognized token.


                          abort();
                      }
                    } // Return the sentinel `$` character if the parser has reached the end
                    // of the source string.


                    return "$";
                  }; // Internal: Parses a JSON `value` token.


                  var get = function get(value) {
                    var results, hasMembers;

                    if (value == "$") {
                      // Unexpected end of input.
                      abort();
                    }

                    if (typeof value == "string") {
                      if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                        // Remove the sentinel `@` character.
                        return value.slice(1);
                      } // Parse object and array literals.


                      if (value == "[") {
                        // Parses a JSON array, returning a new JavaScript array.
                        results = [];

                        for (;; hasMembers || (hasMembers = true)) {
                          value = lex(); // A closing square bracket marks the end of the array literal.

                          if (value == "]") {
                            break;
                          } // If the array literal contains elements, the current token
                          // should be a comma separating the previous element from the
                          // next.


                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();

                              if (value == "]") {
                                // Unexpected trailing `,` in array literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each array element.
                              abort();
                            }
                          } // Elisions and leading commas are not permitted.


                          if (value == ",") {
                            abort();
                          }

                          results.push(get(value));
                        }

                        return results;
                      } else if (value == "{") {
                        // Parses a JSON object, returning a new JavaScript object.
                        results = {};

                        for (;; hasMembers || (hasMembers = true)) {
                          value = lex(); // A closing curly brace marks the end of the object literal.

                          if (value == "}") {
                            break;
                          } // If the object literal contains members, the current token
                          // should be a comma separator.


                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();

                              if (value == "}") {
                                // Unexpected trailing `,` in object literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each object member.
                              abort();
                            }
                          } // Leading commas are not permitted, object property names must be
                          // double-quoted strings, and a `:` must separate each property
                          // name and value.


                          if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                            abort();
                          }

                          results[value.slice(1)] = get(lex());
                        }

                        return results;
                      } // Unexpected token encountered.


                      abort();
                    }

                    return value;
                  }; // Internal: Updates a traversed object member.


                  var update = function update(source, property, callback) {
                    var element = walk(source, property, callback);

                    if (element === undef) {
                      delete source[property];
                    } else {
                      source[property] = element;
                    }
                  }; // Internal: Recursively traverses a parsed JSON object, invoking the
                  // `callback` function for each value. This is an implementation of the
                  // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.


                  var walk = function walk(source, property, callback) {
                    var value = source[property],
                        length;

                    if (typeof value == "object" && value) {
                      // `forEach` can't be used to traverse an array in Opera <= 8.54
                      // because its `Object#hasOwnProperty` implementation returns `false`
                      // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                      if (getClass.call(value) == arrayClass) {
                        for (length = value.length; length--;) {
                          update(value, length, callback);
                        }
                      } else {
                        _forEach(value, function (property) {
                          update(value, property, callback);
                        });
                      }
                    }

                    return callback.call(source, property, value);
                  }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.


                  exports.parse = function (source, callback) {
                    var result, value;
                    Index = 0;
                    Source = "" + source;
                    result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.

                    if (lex() != "$") {
                      abort();
                    } // Reset the parser state.


                    Index = Source = null;
                    return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
                  };
                }
              }

              exports["runInContext"] = runInContext;
              return exports;
            }

            if (freeExports && !isLoader) {
              // Export for CommonJS environments.
              runInContext(root, freeExports);
            } else {
              // Export for web browsers and JavaScript engines.
              var nativeJSON = root.JSON,
                  previousJSON = root["JSON3"],
                  isRestored = false;
              var JSON3 = runInContext(root, root["JSON3"] = {
                // Public: Restores the original value of the global `JSON` object and
                // returns a reference to the `JSON3` object.
                "noConflict": function noConflict() {
                  if (!isRestored) {
                    isRestored = true;
                    root.JSON = nativeJSON;
                    root["JSON3"] = previousJSON;
                    nativeJSON = previousJSON = null;
                  }

                  return JSON3;
                }
              });
              root.JSON = {
                "parse": JSON3.parse,
                "stringify": JSON3.stringify
              };
            } // Export for asynchronous module loaders.


            if (isLoader) {
              define(function () {
                return JSON3;
              });
            }
          }).call(this);
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}],
      51: [function (_dereq_, module, exports) {
        module.exports = toArray;

        function toArray(list, index) {
          var array = [];
          index = index || 0;

          for (var i = index || 0; i < list.length; i++) {
            array[i - index] = list[i];
          }

          return array;
        }
      }, {}]
    }, {}, [31])(31);
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXFNjcmlwdFxcbGlic1xcc29ja2V0LWlvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksQ0FBQyxNQUFELElBQVcsQ0FBQyxFQUFFLENBQUMsR0FBSCxDQUFPLFFBQXZCLEVBQWlDO0FBQ2hDLEdBQUMsVUFBVSxDQUFWLEVBQWE7QUFDYixRQUFJLE9BQU8sT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPLE1BQVAsS0FBa0IsV0FBckQsRUFBa0U7QUFDakUsTUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixDQUFDLEVBQWxCO0FBQ0EsS0FGRCxNQUVPLElBQUksT0FBTyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE1BQU0sQ0FBQyxHQUEzQyxFQUFnRDtBQUN0RCxNQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUssQ0FBTCxDQUFOO0FBQ0EsS0FGTSxNQUVBO0FBQ04sVUFBSSxDQUFKOztBQUNBLFVBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2xDLFFBQUEsQ0FBQyxHQUFHLE1BQUo7QUFDQSxPQUZELE1BRU8sSUFBSSxPQUFPLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDekMsUUFBQSxDQUFDLEdBQUcsTUFBSjtBQUNBLE9BRk0sTUFFQSxJQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUN2QyxRQUFBLENBQUMsR0FBRyxJQUFKO0FBQ0EsT0FGTSxNQUVBO0FBQ04sUUFBQSxDQUFDLEdBQUcsSUFBSjtBQUNBOztBQUNELE1BQUEsQ0FBQyxDQUFDLEVBQUYsR0FBTyxDQUFDLEVBQVI7QUFDQTtBQUNELEdBbEJELEVBa0JHLFlBQVk7QUFDZCxRQUFJLE1BQUosRUFBWSxNQUFaLEVBQW9CLE9BQXBCO0FBQ0EsV0FBUSxTQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQjtBQUMzQixlQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxF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