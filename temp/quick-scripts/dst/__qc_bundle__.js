
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/SDK/bcx/bcxAdapter');
require('./assets/SDK/bcx/core.min');
require('./assets/SDK/bcx/plugins.min');
require('./assets/migration/use_reversed_rotateBy');
require('./assets/migration/use_reversed_rotateTo');
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/scripts/Game');
require('./assets/scripts/GameOver');
require('./assets/scripts/Player');
require('./assets/scripts/Star');
require('./assets/scripts/StartGame');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

var bcxAdapter = require("bcxAdapter");

cc.Class({
  "extends": cc.Component,
  properties: {
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    maxStarDuration: 0,
    minStarDuration: 0,
    ground: {
      "default": null,
      type: cc.Node
    },
    player: {
      "default": null,
      type: cc.Node
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    accountDisplay: {
      "default": null,
      type: cc.Label
    },
    balanceDisplay: {
      "default": null,
      type: cc.Label
    },
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  onLoad: function onLoad() {
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.spawnNewStar();
    this.score = 0;
    this.account_name = '';
    self = this;

    if (bcxAdapter) {
      bcxAdapter.initSDK(function (res) {
        console.log("initSDK", res);

        if (res) {
          bcxAdapter.login(function (res) {
            console.log("login", res);
            self.accountDisplay.string = res.account_name;
            self.account_name = res.account_name;
            bcxAdapter.getBalanceByAccount(res.account_name, function (res) {
              console.log("getBalanceByAccount", res);
              self.balanceDisplay.string = res.data.COCOS;
            });
          });
        }
      });
    }
  },
  spawnNewStar: function spawnNewStar() {
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getNewStarPosition());
    newStar.getComponent('Star').game = this;
    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0;
    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    return cc.v2(randX, randY);
  },
  update: function update(dt) {
    if (this.timer > this.starDuration) {
      this.gameOver();
      this.enabled = false; // disable gameOver logic to avoid load scene repeatedly

      return;
    }

    this.timer += dt;
  },
  gainScore: function gainScore() {
    this.score += 1;
    this.scoreDisplay.string = 'Score: ' + this.score;
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },
  gameOver: function gameOver() {
    this.player.stopAllActions();
    cc.director.loadScene('gameover');
    console.log("account_name", this.account_name);

    if (this.score > 0) {
      if (this.account_name == 'test') {
        console.log("you are contract account, can not transfer to self");
        return;
      }

      bcxAdapter.sendWinCocos(this.account_name, this.score, function (res) {
        console.log("sendWinCocos", res);
      });
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJiY3hBZGFwdGVyIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhclByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJtYXhTdGFyRHVyYXRpb24iLCJtaW5TdGFyRHVyYXRpb24iLCJncm91bmQiLCJOb2RlIiwicGxheWVyIiwic2NvcmVEaXNwbGF5IiwiTGFiZWwiLCJhY2NvdW50RGlzcGxheSIsImJhbGFuY2VEaXNwbGF5Iiwic2NvcmVBdWRpbyIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsImFjY291bnRfbmFtZSIsInNlbGYiLCJpbml0U0RLIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxvZ2luIiwic3RyaW5nIiwiZ2V0QmFsYW5jZUJ5QWNjb3VudCIsImRhdGEiLCJDT0NPUyIsIm5ld1N0YXIiLCJpbnN0YW50aWF0ZSIsIm5vZGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwianVtcEhlaWdodCIsIm1heFgiLCJ3aWR0aCIsInYyIiwidXBkYXRlIiwiZHQiLCJnYW1lT3ZlciIsImVuYWJsZWQiLCJnYWluU2NvcmUiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJzdG9wQWxsQWN0aW9ucyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwic2VuZFdpbkNvY29zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQ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QTNDO0FBQ0gsR0E3Rkk7QUErRkx1QyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsU0FBSzVDLE1BQUwsQ0FBWWlELGNBQVo7QUFDQTVELElBQUFBLEVBQUUsQ0FBQzZELFFBQUgsQ0FBWUMsU0FBWixDQUFzQixVQUF0QjtBQUNBaEMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUEyQixLQUFLTCxZQUFoQzs7QUFDQSxRQUFHLEtBQUtELEtBQUwsR0FBVyxDQUFkLEVBQWdCO0FBQ1osVUFBRyxLQUFLQyxZQUFMLElBQXFCLE1BQXhCLEVBQStCO0FBQzNCSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvREFBWjtBQUNBO0FBQ0g7O0FBQ0RqQyxNQUFBQSxVQUFVLENBQUNpRSxZQUFYLENBQXdCLEtBQUtyQyxZQUE3QixFQUEwQyxLQUFLRCxLQUEvQyxFQUFxRCxVQUFTSSxHQUFULEVBQWE7QUFDOURDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBMkJGLEdBQTNCO0FBQ0gsT0FGRDtBQUdIO0FBQ0o7QUE1R0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJjeEFkYXB0ZXIgPSByZXF1aXJlKFwiYmN4QWRhcHRlclwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG4gICAgICAgIGdyb3VuZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBhY2NvdW50RGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGJhbGFuY2VEaXNwbGF5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0LzI7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmFjY291bnRfbmFtZSA9ICcnO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoYmN4QWRhcHRlcil7XG4gICAgICAgICAgICBiY3hBZGFwdGVyLmluaXRTREsoZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluaXRTREtcIixyZXMpXG4gICAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgYmN4QWRhcHRlci5sb2dpbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luXCIscmVzKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY291bnREaXNwbGF5LnN0cmluZyA9IHJlcy5hY2NvdW50X25hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjb3VudF9uYW1lID0gcmVzLmFjY291bnRfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgYmN4QWRhcHRlci5nZXRCYWxhbmNlQnlBY2NvdW50KHJlcy5hY2NvdW50X25hbWUsZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QmFsYW5jZUJ5QWNjb3VudFwiLHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmFsYW5jZURpc3BsYXkuc3RyaW5nID0gcmVzLmRhdGEuQ09DT1M7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbigpKTtcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSB0aGlzLm1pblN0YXJEdXJhdGlvbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhTdGFyRHVyYXRpb24gLSB0aGlzLm1pblN0YXJEdXJhdGlvbik7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgIH0sXG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcbiAgICAgICAgdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgICAgICBpZiAodGhpcy50aW1lciA+IHRoaXMuc3RhckR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTsgICAvLyBkaXNhYmxlIGdhbWVPdmVyIGxvZ2ljIHRvIGF2b2lkIGxvYWQgc2NlbmUgcmVwZWF0ZWRseVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgfSxcblxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZUF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IFxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWVvdmVyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjb3VudF9uYW1lXCIsdGhpcy5hY2NvdW50X25hbWUpXG4gICAgICAgIGlmKHRoaXMuc2NvcmU+MCl7XG4gICAgICAgICAgICBpZih0aGlzLmFjY291bnRfbmFtZSA9PSAndGVzdCcpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBjb250cmFjdCBhY2NvdW50LCBjYW4gbm90IHRyYW5zZmVyIHRvIHNlbGZcIilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiY3hBZGFwdGVyLnNlbmRXaW5Db2Nvcyh0aGlzLmFjY291bnRfbmFtZSx0aGlzLnNjb3JlLGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kV2luQ29jb3NcIixyZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/SDK/bcx/bcxAdapter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97258OmOcZEJIes7LV/pGyQ', 'bcxAdapter');
// SDK/bcx/bcxAdapter.js

"use strict";

// import BCX from 'bcx.min.js' 
require('./core.min');

require('./plugins.min'); //cocos配置


var _configParams = {
  ws_node_list: [{
    url: "ws://39.106.126.54:8049",
    name: "COCOS3.0节点2"
  }],
  networks: [{
    core_asset: "COCOS",
    chain_id: '7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9'
  }],
  faucetUrl: 'http://47.93.62.96:8041',
  auto_reconnect: true,
  worker: false,
  real_sub: true,
  check_cached_nodes_data: true
};
var BCXAdpater = cc.Class({
  // onLoad () {},
  start: function start() {//console.info("window=1=",window.BcxWeb);
  },
  initSDK: function initSDK(callback) {
    this.contractName = "contract.starproject"; //合约名称

    if (window.BcxWeb) {
      this.bcl = window.BcxWeb;
      console.log("===bcl---");

      if (callback) {
        callback(true);
      }
    } else {
      console.log("===bcl--cocos-");
      var self = this;
      self.bcl = new BCX(_configParams);
      Cocosjs.plugins(new CocosBCX()); //connect pc-plugin between sdk

      Cocosjs.cocos.connect('My-App').then(function (connected) {
        console.log("connected==" + connected);

        if (!connected) {
          //检测一下注入
          self.checkWindowBcx(function (is_success) {
            console.log("is_success==", is_success);

            if (is_success) {
              if (callback) {
                console.log("is_success==222");
                callback(true);
              }
            } else {
              console.log("no_cocos_pay");
              callback(false);
            }
          });
          return false;
        } //此时走的是coocspay客户端


        var cocos = Cocosjs.cocos;
        self.bcl = cocos.cocosBcx(self.bcl);

        if (self.bcl) {
          if (callback) {
            callback(true);
          }
        } else {
          if (callback) {
            callback(null);
          }
        }
      })["catch"](function (e) {
        console.log("connect error---" + JSON.stringify(e));
      });
    }
  },
  checkWindowBcx: function checkWindowBcx(callback) {
    //目前进来的时候可能还没有吧bcx挂在window 需要个定时器
    var check_count = 0;
    var self = this;
    var sdk_intervral = setInterval(function () {
      console.log("checkWindowBcx", window.BcxWeb);

      if (window.BcxWeb) {
        self.bcl = window.BcxWeb;

        if (callback) {
          callback(true);
        }

        clearInterval(sdk_intervral);
      }

      if (check_count >= 3) {
        clearInterval(sdk_intervral);

        if (callback) {
          callback(false);
        }
      }

      check_count = check_count + 1;
    }, 1000);
  },
  login: function login(callback) {
    var _this = this;

    if (this.bcl) {
      try {
        console.log("login===adada=");
        this.bcl.getAccountInfo().then(function (res) {
          console.log("res.account_name==" + res.account_name);
          _this.bcl.account_name = res.account_name;

          if (callback) {
            callback(res);
          }
        });
      } catch (e) {
        console.log("login==e====" + e);
        console.log("his.bcl.account_name===" + this.bcl.account_name);

        if (this.bcl.account_name) {
          if (callback) {
            callback(this.bcl.account_name);
          }
        }
      }
    }
  },
  getBalanceByAccount: function getBalanceByAccount(account, callback) {
    this.bcl.queryAccountBalances({
      assetId: 'COCOS',
      account: account
    }).then(function (res) {
      console.info('getBalanceByAccount==', res);

      if (res.code === -25 || res.code === 125) {
        //表示还没有这种代币，先给与赋值为0
        res.code = 1;
        res.data.COCOS = 0;

        if (callback) {
          callback(res);
        }
      }

      if (res.code === 1) {
        if (callback) {
          callback(res);
        }
      } else if (callback) {
        callback(res);
      }
    });
  },
  sendWinCocos: function sendWinCocos(account, stars, callback) {
    this.bcl.callContractFunction({
      nameOrId: this.contractName,
      functionName: 'sendstar',
      valueList: [account, stars] ////

    }).then(function (res) {
      console.info("draw res=", res);

      if (res.code === 1) {
        callback(res);
      } else {
        callback(res);
      }
    })["catch"](function (e) {
      console.info("draw lottery error=", JSON.stringify(e));
    });
  }
});
var bcxAdapter = new BCXAdpater();
bcxAdapter.start();
module.exports = bcxAdapter;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU0RLXFxiY3hcXGJjeEFkYXB0ZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIl9jb25maWdQYXJhbXMiLCJ3c19ub2RlX2xpc3QiLCJ1cmwiLCJuYW1lIiwibmV0d29ya3MiLCJjb3JlX2Fzc2V0IiwiY2hhaW5faWQiLCJmYXVjZXRVcmwiLCJhdXRvX3JlY29ubmVjdCIsIndvcmtlciIsInJlYWxfc3ViIiwiY2hlY2tfY2FjaGVkX25vZGVzX2RhdGEiLCJCQ1hBZHBhdGVyIiwiY2MiLCJDbGFzcyIsInN0YXJ0IiwiaW5pdFNESyIsImNhbGxiYWNrIiwiY29udHJhY3ROYW1lIiwid2luZG93IiwiQmN4V2ViIiwiYmNsIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJCQ1giLCJDb2Nvc2pzIiwicGx1Z2lucyIsIkNvY29zQkNYIiwiY29jb3MiLCJjb25uZWN0IiwidGhlbiIsImNvbm5lY3RlZCIsImNoZWNrV2luZG93QmN4IiwiaXNfc3VjY2VzcyIsImNvY29zQmN4IiwiZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGVja19jb3VudCIsInNka19pbnRlcnZyYWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJsb2dpbiIsImdldEFjY291bnRJbmZvIiwicmVzIiwiYWNjb3VudF9uYW1lIiwiZ2V0QmFsYW5jZUJ5QWNjb3VudCIsImFjY291bnQiLCJxdWVyeUFjY291bnRCYWxhbmNlcyIsImFzc2V0SWQiLCJpbmZvIiwiY29kZSIsImRhdGEiLCJDT0NPUyIsInNlbmRXaW5Db2NvcyIsInN0YXJzIiwiY2FsbENvbnRyYWN0RnVuY3Rpb24iLCJuYW1lT3JJZCIsImZ1bmN0aW9uTmFtZSIsInZhbHVlTGlzdCIsImJjeEFkYXB0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0FBQ0FBLE9BQU8sQ0FBQyxZQUFELENBQVA7O0FBRUFBLE9BQU8sQ0FBQyxlQUFELENBQVAsRUFFQTs7O0FB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TSxDQUFDQyxPQUFQLEdBQWlCRixVQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuLy8gaW1wb3J0IEJDWCBmcm9tICdiY3gubWluLmpzJyBcbnJlcXVpcmUoJy4vY29yZS5taW4nKVxuXG5yZXF1aXJlKCcuL3BsdWdpbnMubWluJylcblxuLy9jb2Nvc+mFjee9rlxudmFyIF9jb25maWdQYXJhbXMgPSB7XG4gICAgd3Nfbm9kZV9saXN0OiBbe1xuICAgICAgICB1cmw6IFwid3M6Ly8zOS4xMDYuMTI2LjU0OjgwNDlcIixcbiAgICAgICAgbmFtZTogXCJDT0NPUzMuMOiKgueCuTJcIlxuICAgIH1dLFxuICAgIG5ldHdvcmtzOiBbe1xuICAgICAgICBjb3JlX2Fzc2V0OiBcIkNPQ09TXCIsXG4gICAgICAgIGNoYWluX2lkOiAnN2Q4OWI4NGYyMmFmMGIxNTA3ODBhMmIxMjFhYTZjNzE1YjE5MjYxYzhiN2ZlMGZkYTNhNTY0NTc0ZWQ3ZDNlOSdcbiAgICB9XSxcbiAgICBmYXVjZXRVcmw6ICdodHRwOi8vNDcuOTMuNjIuOTY6ODA0MScsXG4gICAgYXV0b19yZWNvbm5lY3Q6IHRydWUsXG4gICAgd29ya2VyOiBmYWxzZSxcbiAgICByZWFsX3N1YjogdHJ1ZSxcbiAgICBjaGVja19jYWNoZWRfbm9kZXNfZGF0YTogdHJ1ZSxcbn07XG5cblxuXG5sZXQgQkNYQWRwYXRlciA9IGNjLkNsYXNzKHtcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vY29uc29sZS5pbmZvKFwid2luZG93PTE9XCIsd2luZG93LkJjeFdlYik7XG4gICAgfSxcblxuICAgIGluaXRTREsgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jb250cmFjdE5hbWUgPSBcImNvbnRyYWN0LnN0YXJwcm9qZWN0XCI7ICAgICAgICAgLy/lkIjnuqblkI3np7BcbiAgICAgICAgICAgIGlmICh3aW5kb3cuQmN4V2ViKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iY2wgPSAgd2luZG93LkJjeFdlYjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PWJjbC0tLVwiKVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09PWJjbC0tY29jb3MtXCIpXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgc2VsZi5iY2wgPSBuZXcgQkNYKF9jb25maWdQYXJhbXMpO1xuICAgICAgICAgICAgICAgIENvY29zanMucGx1Z2lucyhuZXcgQ29jb3NCQ1goKSlcbiAgICAgICAgICAgICAgICAvL2Nvbm5lY3QgcGMtcGx1Z2luIGJldHdlZW4gc2RrXG4gICAgICAgICAgICAgICAgQ29jb3Nqcy5jb2Nvcy5jb25uZWN0KCdNeS1BcHAnKS50aGVuKGNvbm5lY3RlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkPT1cIitjb25uZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+S4gOS4i+azqOWFpVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGVja1dpbmRvd0JjeChmdW5jdGlvbihpc19zdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzX3N1Y2Nlc3M9PVwiLGlzX3N1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNfc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc19zdWNjZXNzPT0yMjJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub19jb2Nvc19wYXlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIC8v5q2k5pe26LWw55qE5pivY29vY3NwYXnlrqLmiLfnq69cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29jb3MgPSBDb2Nvc2pzLmNvY29zXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYmNsID0gY29jb3MuY29jb3NCY3goc2VsZi5iY2wpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmJjbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdCBlcnJvci0tLVwiK0pTT04uc3RyaW5naWZ5KGUpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgY2hlY2tXaW5kb3dCY3goY2FsbGJhY2spe1xuICAgICAgICAvL+ebruWJjei/m+adpeeahOaXtuWAmeWPr+iDvei/mOayoeacieWQp2JjeOaMguWcqHdpbmRvdyDpnIDopoHkuKrlrprml7blmahcbiAgICAgICAgbGV0IGNoZWNrX2NvdW50ID0gMFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgbGV0IHNka19pbnRlcnZyYWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja1dpbmRvd0JjeFwiLHdpbmRvdy5CY3hXZWIpXG4gICAgICAgICAgICBpZiAod2luZG93LkJjeFdlYil7XG4gICAgICAgICAgICAgICAgc2VsZi5iY2wgPSB3aW5kb3cuQmN4V2ViXG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNka19pbnRlcnZyYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGNoZWNrX2NvdW50Pj0zKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNka19pbnRlcnZyYWwpO1xuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hlY2tfY291bnQgPSBjaGVja19jb3VudCArIDFcblxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9LFxuXG4gICAgbG9naW4oY2FsbGJhY2spe1xuICAgICAgICBpZih0aGlzLmJjbCl7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbj09PWFkYWRhPVwiKVxuICAgICAgICAgICAgICAgIHRoaXMuYmNsLmdldEFjY291bnRJbmZvKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcy5hY2NvdW50X25hbWU9PVwiK3Jlcy5hY2NvdW50X25hbWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmNsLmFjY291bnRfbmFtZSA9IHJlcy5hY2NvdW50X25hbWUgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW49PWU9PT09XCIrZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhpcy5iY2wuYWNjb3VudF9uYW1lPT09XCIrdGhpcy5iY2wuYWNjb3VudF9uYW1lKVxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYmNsLmFjY291bnRfbmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5iY2wuYWNjb3VudF9uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEJhbGFuY2VCeUFjY291bnQgKGFjY291bnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYmNsLnF1ZXJ5QWNjb3VudEJhbGFuY2VzKHtcbiAgICAgICAgICAgIGFzc2V0SWQ6J0NPQ09TJyxcbiAgICAgICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgIFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldEJhbGFuY2VCeUFjY291bnQ9PScscmVzKTtcblxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAtMjUgfHwgcmVzLmNvZGUgPT09IDEyNSkge1xuICAgICAgICAgICAgICAgIC8v6KGo56S66L+Y5rKh5pyJ6L+Z56eN5Luj5biB77yM5YWI57uZ5LiO6LWL5YC85Li6MFxuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gMTtcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5DT0NPUyA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNlbmRXaW5Db2NvcyhhY2NvdW50LHN0YXJzLGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYmNsLmNhbGxDb250cmFjdEZ1bmN0aW9uKHtcbiAgICAgICAgICAgIG5hbWVPcklkOiB0aGlzLmNvbnRyYWN0TmFtZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uTmFtZTogJ3NlbmRzdGFyJyxcbiAgICAgICAgICAgIHZhbHVlTGlzdDpbYWNjb3VudCwgc3RhcnNdLC8vLy9cbiAgICAgICAgICAgXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImRyYXcgcmVzPVwiLHJlcyk7XG5cbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiZHJhdyBsb3R0ZXJ5IGVycm9yPVwiLEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxufSk7XG5cbmxldCBiY3hBZGFwdGVyID0gbmV3IEJDWEFkcGF0ZXIoKTtcbmJjeEFkYXB0ZXIuc3RhcnQoKTtcbm1vZHVsZS5leHBvcnRzID0gYmN4QWRhcHRlcjsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateTo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53833DSMbBDzZLaovA8jsj4', 'use_reversed_rotateTo');
// migration/use_reversed_rotateTo.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.2.1/v2.2.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.2.1/v2.2.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateTo._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlVG8uanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVUbyIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVlBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsUUFBWixHQUF1QixJQUF2QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSB1c2VkIGZvciBwcm9qZWN0cyBjb21wYXRpYmxlIHdpdGggdjIuMS4wL3YyLjEuMS92Mi4yLjEvdjIuMi4yIHZlcnNpb25zLlxyXG4gKiBZb3UgZG8gbm90IG5lZWQgdG8gbWFudWFsbHkgYWRkIHRoaXMgc2NyaXB0IGluIGFueSBvdGhlciBwcm9qZWN0LlxyXG4gKiBJZiB5b3UgZG9uJ3QgdXNlIGNjLkFjdGlvbiBpbiB5b3VyIHByb2plY3QsIHlvdSBjYW4gZGVsZXRlIHRoaXMgc2NyaXB0IGRpcmVjdGx5LlxyXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxyXG4gKlxyXG4gKiDmraTohJrmnKznlLEgQ29jb3MgQ3JlYXRvciDoh6rliqjnlJ/miJDvvIzku4XnlKjkuo7lhbzlrrkgdjIuMS4wL3YyLjEuMS92Mi4yLjEvdjIuMi4yIOeJiOacrOeahOW3peeoi++8jFxyXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIEFjdGlvbu+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67mnInmiZjnrqHkuo4gZ2l0IOetieeJiOacrOW6k++8jOivt+WwhuatpOiEmuacrOS4gOW5tuS4iuS8oOOAglxyXG4gKi9cclxuXHJcbmNjLlJvdGF0ZVRvLl9yZXZlcnNlID0gdHJ1ZTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/SDK/bcx/plugins.min.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72367rp2FlPxI56nm0II73Y', 'plugins.min');
// SDK/bcx/plugins.min.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  var e = {};

  function n(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) {
      n.d(r, o, function (e) {
        return t[e];
      }.bind(null, o));
    }
    return r;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 6);
}([function (t, e) {
  t.exports = function (t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  };
}, function (t, e) {
  t.exports = function (t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  };
}, function (t, e) {
  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
    }
  }

  t.exports = function (t, e, r) {
    return e && n(t.prototype, e), r && n(t, r), t;
  };
}, function (t, e, n) {
  var r = n(7),
      o = n(8);

  t.exports = function (t, e) {
    return !e || "object" !== r(e) && "function" != typeof e ? o(t) : e;
  };
}, function (t, e) {
  function n(e) {
    return t.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, n(e);
  }

  t.exports = n;
}, function (t, e, n) {
  var r = n(9);

  t.exports = function (t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && r(t, e);
  };
}, function (t, e, n) {
  "use strict";

  n.r(e), n.d(e, "default", function () {
    return m;
  });

  var r = n(0),
      o = n.n(r),
      u = n(1),
      c = n.n(u),
      i = n(2),
      f = n.n(i),
      s = n(3),
      a = n.n(s),
      l = n(4),
      p = n.n(l),
      y = n(5),
      d = n.n(y),
      b = Cocosjs.WALLET_METHODS,
      h = Cocosjs.SocketService,
      m = function (t) {
    function e() {
      return c()(this, e), a()(this, p()(e).call(this, Cocosjs.Blockchains.COCOSBCX, Cocosjs.PluginTypes.BLOCKCHAIN_SUPPORT));
    }

    return d()(e, t), f()(e, [{
      key: "setSocketService",
      value: function value(t) {
        h = t;
      }
    }, {
      key: "hookProvider",
      value: function value() {
        throw new Error("cocos hook provider not enabled yet.");
      }
    }, {
      key: "signatureProvider",
      value: function value() {
        return 0 >= arguments.length || arguments[0], function (t) {
          return function (t, e) {
            return new Proxy(t, e);
          }(t, {
            get: function get(t, n) {
              return "function" == typeof t[n] ? function () {
                for (var r = arguments.length, o = Array(r), u = 0; u < r; u++) {
                  o[u] = arguments[u];
                }

                return Cocosjs.cocos.isExtension ? t[n].apply(t, o) : n === b.transferAsset ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.transferAsset].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.callContractFunction ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.callContractFunction].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.creatNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.creatNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.transferNHAsset ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.transferNHAsset].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.fillNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.fillNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.cancelNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.cancelNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.getAccountInfo ? new Promise(function (t, n) {
                  e.methods()[b.getAccountInfo]({}).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : t[n].apply(t, o);
              } : t[n];
            }
          });
        };
      }
    }], [{
      key: "methods",
      value: function value() {
        var t;
        return t = {}, o()(t, b.transferAsset, function (t) {
          return h.sendApiRequest({
            type: "requestTransfer",
            payload: t
          });
        }), o()(t, b.callContractFunction, function (t) {
          return h.sendApiRequest({
            type: "callContractFunction",
            payload: t
          });
        }), o()(t, b.fillNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "fillNHAssetOrder",
            payload: t
          });
        }), o()(t, b.transferNHAsset, function (t) {
          return h.sendApiRequest({
            type: "transferNHAsset",
            payload: t
          });
        }), o()(t, b.cancelNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "cancelNHAssetOrder",
            payload: t
          });
        }), o()(t, b.creatNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "creatNHAssetOrder",
            payload: t
          });
        }), o()(t, b.getAccountInfo, function () {
          return h.sendApiRequest({
            type: "getAccountInfo",
            payload: {}
          });
        }), t;
      }
    }]), e;
  }(Cocosjs.Plugin);

  "undefined" != typeof window && (window.CocosBCX = m);
}, function (t, e) {
  function n(t) {
    return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function r(e) {
    return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? t.exports = r = function r(t) {
      return n(t);
    } : t.exports = r = function r(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t);
    }, r(e);
  }

  t.exports = r;
}, function (t, e) {
  t.exports = function (t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  };
}, function (t, e) {
  function n(e, r) {
    return t.exports = n = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    }, n(e, r);
  }

  t.exports = n;
}]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU0RLXFxiY3hcXHBsdWdpbnMubWluLmpzIl0sIm5hbWVzIjpbInQiLCJlIiwibiIsInIiLCJleHBvcnRzIiwibyIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwiZCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJfX2VzTW9kdWxlIiwiY3JlYXRlIiwiYmluZCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIlR5cGVFcnJvciIsImxlbmd0aCIsImtleSIsInNldFByb3RvdHlwZU9mIiwiZ2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJjb25zdHJ1Y3RvciIsInUiLCJmIiwiYSIsInkiLCJiIiwiQ29jb3NqcyIsIldBTExFVF9NRVRIT0RTIiwiaCIsIlNvY2tldFNlcnZpY2UiLCJCbG9ja2NoYWlucyIsIkNPQ09TQkNYIiwiUGx1Z2luVHlwZXMiLCJCTE9DS0NIQUlOX1NVUFBPUlQiLCJFcnJvciIsImFyZ3VtZW50cyIsIlByb3h5IiwiQXJyYXkiLCJjb2NvcyIsImlzRXh0ZW5zaW9uIiwiYXBwbHkiLCJ0cmFuc2ZlckFzc2V0IiwiUHJvbWlzZSIsIm1ldGhvZHMiLCJ0aGVuIiwiY2FsbENvbnRyYWN0RnVuY3Rpb24iLCJjcmVhdE5IQXNzZXRPcmRlciIsInRyYW5zZmVyTkhBc3NldCIsImZpbGxOSEFzc2V0T3JkZXIiLCJjYW5jZWxOSEFzc2V0T3JkZXIiLCJnZXRBY2NvdW50SW5mbyIsInNlbmRBcGlSZXF1ZXN0IiwidHlwZSIsInBheWxvYWQiLCJQbHVnaW4iLCJ3aW5kb3ciLCJDb2Nvc0JDWCIsIml0ZXJhdG9yIiwiUmVmZXJlbmNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUlDLENBQUMs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V0MsQ0FBWCxFQUFhO0FBQUMsV0FBU0MsQ0FBVCxDQUFXRCxDQUFYLEVBQWFFLENBQWIsRUFBZTtBQUFDLFdBQU9ILENBQUMsQ0FBQ0ksT0FBRixHQUFVRixDQUFDLEdBQUNVLE1BQU0sQ0FBQ21CLGNBQVAsSUFBdUIsVUFBUy9CLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUMsYUFBT0QsQ0FBQyxDQUFDaUMsU0FBRixHQUFZaEMsQ0FBWixFQUFjRCxDQUFyQjtBQUF1QixLQUF4RSxFQUF5RUUsQ0FBQyxDQUFDRCxDQUFELEVBQUdFLENBQUgsQ0FBakY7QUFBdUY7O0FBQUFILEVBQUFBLENBQUMsQ0FBQ0ksT0FBRixHQUFVRixDQUFWO0FBQVksQ0FBbGxKLENBQTk0QixDQUFEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCl7dmFyIGU9e307ZnVuY3Rpb24gbihyKXtpZihlW3JdKXJldHVybiBlW3JdLmV4cG9ydHM7dmFyIG89ZVtyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsbiksby5sPSEwLG8uZXhwb3J0c31uLm09dCxuLmM9ZSxuLmQ9ZnVuY3Rpb24odCxlLHIpe24ubyh0LGUpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbih0KXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24odCxlKXtpZigxJmUmJih0PW4odCkpLDgmZSlyZXR1cm4gdDtpZig0JmUmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiZ0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6dH0pLDImZSYmXCJzdHJpbmdcIiE9dHlwZW9mIHQpZm9yKHZhciBvIGluIHQpbi5kKHIsbyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0uYmluZChudWxsLG8pKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKHQpe3ZhciBlPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBuLmQoZSxcImFcIixlKSxlfSxuLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LG4ucD1cIlwiLG4obi5zPTYpfShbZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBlIGluIHQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfX0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX10LmV4cG9ydHM9ZnVuY3Rpb24odCxlLHIpe3JldHVybiBlJiZuKHQucHJvdG90eXBlLGUpLHImJm4odCxyKSx0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNyksbz1uKDgpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiFlfHxcIm9iamVjdFwiIT09cihlKSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZT9vKHQpOmV9fSxmdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIHQuZXhwb3J0cz1uPU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3QuZ2V0UHJvdG90eXBlT2Y6ZnVuY3Rpb24odCl7cmV0dXJuIHQuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YodCl9LG4oZSl9dC5leHBvcnRzPW59LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDkpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTt0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmcih0LGUpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO24ucihlKSxuLmQoZSxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBtfSk7dmFyIHI9bigwKSxvPW4ubihyKSx1PW4oMSksYz1uLm4odSksaT1uKDIpLGY9bi5uKGkpLHM9bigzKSxhPW4ubihzKSxsPW4oNCkscD1uLm4obCkseT1uKDUpLGQ9bi5uKHkpLGI9Q29jb3Nqcy5XQUxMRVRfTUVUSE9EUyxoPUNvY29zanMuU29ja2V0U2VydmljZSxtPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoKXtyZXR1cm4gYygpKHRoaXMsZSksYSgpKHRoaXMscCgpKGUpLmNhbGwodGhpcyxDb2Nvc2pzLkJsb2NrY2hhaW5zLkNPQ09TQkNYLENvY29zanMuUGx1Z2luVHlwZXMuQkxPQ0tDSEFJTl9TVVBQT1JUKSl9cmV0dXJuIGQoKShlLHQpLGYoKShlLFt7a2V5Olwic2V0U29ja2V0U2VydmljZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe2g9dH19LHtrZXk6XCJob29rUHJvdmlkZXJcIix2YWx1ZTpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcImNvY29zIGhvb2sgcHJvdmlkZXIgbm90IGVuYWJsZWQgeWV0LlwiKX19LHtrZXk6XCJzaWduYXR1cmVQcm92aWRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIDA+PWFyZ3VtZW50cy5sZW5ndGh8fGFyZ3VtZW50c1swXSxmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3IFByb3h5KHQsZSl9KHQse2dldDpmdW5jdGlvbih0LG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHRbbl0/ZnVuY3Rpb24oKXtmb3IodmFyIHI9YXJndW1lbnRzLmxlbmd0aCxvPUFycmF5KHIpLHU9MDt1PHI7dSsrKW9bdV09YXJndW1lbnRzW3VdO3JldHVybiBDb2Nvc2pzLmNvY29zLmlzRXh0ZW5zaW9uP3Rbbl0uYXBwbHkodCxvKTpuPT09Yi50cmFuc2ZlckFzc2V0P25ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7dmFyIHI7KHI9ZS5tZXRob2RzKCkpW2IudHJhbnNmZXJBc3NldF0uYXBwbHkocixvKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSkuY2F0Y2goZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9KX0pOm49PT1iLmNhbGxDb250cmFjdEZ1bmN0aW9uP25ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7dmFyIHI7KHI9ZS5tZXRob2RzKCkpW2IuY2FsbENvbnRyYWN0RnVuY3Rpb25dLmFwcGx5KHIsbykudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBuKHQpfSl9KTpuPT09Yi5jcmVhdE5IQXNzZXRPcmRlcj9uZXcgUHJvbWlzZShmdW5jdGlvbih0LG4pe3ZhciByOyhyPWUubWV0aG9kcygpKVtiLmNyZWF0TkhBc3NldE9yZGVyXS5hcHBseShyLG8pLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KS5jYXRjaChmdW5jdGlvbih0KXtyZXR1cm4gbih0KX0pfSk6bj09PWIudHJhbnNmZXJOSEFzc2V0P25ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7dmFyIHI7KHI9ZS5tZXRob2RzKCkpW2IudHJhbnNmZXJOSEFzc2V0XS5hcHBseShyLG8pLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KS5jYXRjaChmdW5jdGlvbih0KXtyZXR1cm4gbih0KX0pfSk6bj09PWIuZmlsbE5IQXNzZXRPcmRlcj9uZXcgUHJvbWlzZShmdW5jdGlvbih0LG4pe3ZhciByOyhyPWUubWV0aG9kcygpKVtiLmZpbGxOSEFzc2V0T3JkZXJdLmFwcGx5KHIsbykudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBuKHQpfSl9KTpuPT09Yi5jYW5jZWxOSEFzc2V0T3JkZXI/bmV3IFByb21pc2UoZnVuY3Rpb24odCxuKXt2YXIgcjsocj1lLm1ldGhvZHMoKSlbYi5jYW5jZWxOSEFzc2V0T3JkZXJdLmFwcGx5KHIsbykudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBuKHQpfSl9KTpuPT09Yi5nZXRBY2NvdW50SW5mbz9uZXcgUHJvbWlzZShmdW5jdGlvbih0LG4pe2UubWV0aG9kcygpW2IuZ2V0QWNjb3VudEluZm9dKHt9KS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSkuY2F0Y2goZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9KX0pOnRbbl0uYXBwbHkodCxvKX06dFtuXX19KX19fV0sW3trZXk6XCJtZXRob2RzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4gdD17fSxvKCkodCxiLnRyYW5zZmVyQXNzZXQsZnVuY3Rpb24odCl7cmV0dXJuIGguc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJyZXF1ZXN0VHJhbnNmZXJcIixwYXlsb2FkOnR9KX0pLG8oKSh0LGIuY2FsbENvbnRyYWN0RnVuY3Rpb24sZnVuY3Rpb24odCl7cmV0dXJuIGguc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJjYWxsQ29udHJhY3RGdW5jdGlvblwiLHBheWxvYWQ6dH0pfSksbygpKHQsYi5maWxsTkhBc3NldE9yZGVyLGZ1bmN0aW9uKHQpe3JldHVybiBoLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiZmlsbE5IQXNzZXRPcmRlclwiLHBheWxvYWQ6dH0pfSksbygpKHQsYi50cmFuc2Zlck5IQXNzZXQsZnVuY3Rpb24odCl7cmV0dXJuIGguc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJ0cmFuc2Zlck5IQXNzZXRcIixwYXlsb2FkOnR9KX0pLG8oKSh0LGIuY2FuY2VsTkhBc3NldE9yZGVyLGZ1bmN0aW9uKHQpe3JldHVybiBoLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiY2FuY2VsTkhBc3NldE9yZGVyXCIscGF5bG9hZDp0fSl9KSxvKCkodCxiLmNyZWF0TkhBc3NldE9yZGVyLGZ1bmN0aW9uKHQpe3JldHVybiBoLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiY3JlYXROSEFzc2V0T3JkZXJcIixwYXlsb2FkOnR9KX0pLG8oKSh0LGIuZ2V0QWNjb3VudEluZm8sZnVuY3Rpb24oKXtyZXR1cm4gaC5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImdldEFjY291bnRJbmZvXCIscGF5bG9hZDp7fX0pfSksdH19XSksZX0oQ29jb3Nqcy5QbHVnaW4pO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuQ29jb3NCQ1g9bSl9LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbih0KXtyZXR1cm4obj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9ZnVuY3Rpb24gcihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PT1uKFN5bWJvbC5pdGVyYXRvcik/dC5leHBvcnRzPXI9ZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9OnQuZXhwb3J0cz1yPWZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6bih0KX0scihlKX10LmV4cG9ydHM9cn0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYodm9pZCAwPT09dCl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4oZSxyKXtyZXR1cm4gdC5leHBvcnRzPW49T2JqZWN0LnNldFByb3RvdHlwZU9mfHxmdW5jdGlvbih0LGUpe3JldHVybiB0Ll9fcHJvdG9fXz1lLHR9LG4oZSxyKX10LmV4cG9ydHM9bn1dKTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameOver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c95cZfvnhKeLQ+u7MHUy+e', 'GameOver');
// scripts/GameOver.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {},
  // onLoad () {},
  start: function start() {},
  replay: function replay() {
    cc.director.loadScene('game');
    console.log("replay");
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZU92ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsInJlcGxheSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxLQVRLLG1CQVNJLENBRVIsQ0FYSTtBQWFOQyxFQUFBQSxNQUFNLEVBQUMsa0JBQVU7QUFDaEJMLElBQUFBLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFDQSxHQWhCSyxDQWlCTDs7QUFqQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwczovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcbiAgIFxyXG4gICByZXBsYXk6ZnVuY3Rpb24oKXtcclxuICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgY29uc29sZS5sb2coXCJyZXBsYXlcIik7XHJcbiAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da2884JMMxJ/o9l3om1FL/s', 'use_v2.1-2.2.1_cc.Toggle_event');
// migration/use_v2.1-2.2.1_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0 ～ 2.2.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 ~ 2.2.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether to trigger 'toggle' and 'checkEvents' events when modifying 'toggle.isChecked' in the code
  // 在代码中修改 'toggle.isChecked' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_isChecked = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMS0yLjIuMV9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVlBLElBQUlBLEVBQUUsQ0FBQ0MsTUFBUCxFQUFlO0FBQ1g7QUFDQTtBQUNBRCxFQUFBQSxFQUFFLENBQUNDLE1BQUgsQ0FBVUMsK0JBQVYsR0FBNEMsSUFBNUM7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSB1c2VkIGZvciBwcm9qZWN0cyBjb21wYXRpYmxlIHdpdGggdGhlIHYyLjEuMCDvvZ4gMi4yLjEgdmVyc2lvbi5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5Ub2dnbGUgaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMCB+IDIuMi4xIOeJiOacrOeahOW3peeoi++8jFxyXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIFRvZ2dsZe+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67mnInmiZjnrqHkuo4gZ2l0IOetieeJiOacrOW6k++8jOivt+WwhuatpOiEmuacrOS4gOW5tuS4iuS8oOOAglxyXG4gKi9cclxuXHJcbmlmIChjYy5Ub2dnbGUpIHtcclxuICAgIC8vIFdoZXRoZXIgdG8gdHJpZ2dlciAndG9nZ2xlJyBhbmQgJ2NoZWNrRXZlbnRzJyBldmVudHMgd2hlbiBtb2RpZnlpbmcgJ3RvZ2dsZS5pc0NoZWNrZWQnIGluIHRoZSBjb2RlXHJcbiAgICAvLyDlnKjku6PnoIHkuK3kv67mlLkgJ3RvZ2dsZS5pc0NoZWNrZWQnIOaXtuaYr+WQpuinpuWPkSAndG9nZ2xlJyDkuI4gJ2NoZWNrRXZlbnRzJyDkuovku7ZcclxuICAgIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkID0gdHJ1ZTtcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6c688v72QdOKamCGCT+xaAd', 'Player');
// scripts/Player.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    accel: 0,
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  setJumpAction: function setJumpAction() {
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
    var callback = cc.callFunc(this.playJumpSound, this);
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
  },
  playJumpSound: function playJumpSound() {
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  onKeyDown: function onKeyDown(event) {
    // set a flag when key pressed
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;

      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    // unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },
  onLoad: function onLoad() {
    this.jumpAction = this.setJumpAction();
    this.node.runAction(this.jumpAction);
    this.accLeft = false;
    this.accRight = false;
    this.xSpeed = 0;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onDestroy: function onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  update: function update(dt) {
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }

    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // if speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    this.node.x += this.xSpeed * dt;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsIm1heE1vdmVTcGVlZCIsImFjY2VsIiwianVtcEF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsInNldEp1bXBBY3Rpb24iLCJqdW1wVXAiLCJtb3ZlQnkiLCJ2MiIsImVhc2luZyIsImVhc2VDdWJpY0FjdGlvbk91dCIsImp1bXBEb3duIiwiZWFzZUN1YmljQWN0aW9uSW4iLCJjYWxsYmFjayIsImNhbGxGdW5jIiwicGxheUp1bXBTb3VuZCIsInJlcGVhdEZvcmV2ZXIiLCJzZXF1ZW5jZSIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsIm9uS2V5RG93biIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwiYSIsImFjY0xlZnQiLCJkIiwiYWNjUmlnaHQiLCJvbktleVVwIiwib25Mb2FkIiwianVtcEFjdGlvbiIsIm5vZGUiLCJydW5BY3Rpb24iLCJ4U3BlZWQiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIktFWV9VUCIsIm9uRGVzdHJveSIsIm9mZiIsInVwZGF0ZSIsImR0IiwiTWF0aCIsImFicyIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUUsQ0FESjtBQUVSQyxJQUFBQSxZQUFZLEVBQUUsQ0FGTjtBQUdSQyxJQUFBQSxZQUFZLEVBQUUsQ0FITjtBQUlSQyxJQUFBQSxLQUFLLEVBQUUsQ0FKQztBQUtSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRVQsRUFB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QUFDeUMsV0FBSCxDQUFlTyxHQUFmLENBQW1CaEQsRUFBRSxDQUFDMkMsV0FBSCxDQUFlQyxTQUFmLENBQXlCRSxNQUE1QyxFQUFvRCxLQUFLWCxPQUF6RCxFQUFrRSxJQUFsRTtBQUNILEdBaEVJO0FBa0VMYyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQixRQUFJLEtBQUtsQixPQUFULEVBQWtCO0FBQ2QsV0FBS1EsTUFBTCxJQUFlLEtBQUtqQyxLQUFMLEdBQWEyQyxFQUE1QjtBQUNILEtBRkQsTUFFTyxJQUFJLEtBQUtoQixRQUFULEVBQW1CO0FBQ3RCLFdBQUtNLE1BQUwsSUFBZSxLQUFLakMsS0FBTCxHQUFhMkMsRUFBNUI7QUFDSDs7QUFFRCxRQUFLQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLWixNQUFkLElBQXdCLEtBQUtsQyxZQUFsQyxFQUFpRDtBQUM3QztBQUNBLFdBQUtrQyxNQUFMLEdBQWMsS0FBS2xDLFlBQUwsR0FBb0IsS0FBS2tDLE1BQXpCLEdBQWtDVyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLWixNQUFkLENBQWhEO0FBQ0g7O0FBRUQsU0FBS0YsSUFBTCxDQUFVZSxDQUFWLElBQWUsS0FBS2IsTUFBTCxHQUFjVSxFQUE3QjtBQUNIO0FBL0VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGp1bXBIZWlnaHQ6IDAsXG4gICAgICAgIGp1bXBEdXJhdGlvbjogMCxcbiAgICAgICAgbWF4TW92ZVNwZWVkOiAwLFxuICAgICAgICBhY2NlbDogMCxcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIHNldEp1bXBBY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGp1bXBVcCA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MudjIoMCwgdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy52MigwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLnBsYXlKdW1wU291bmQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLCBjYWxsYmFjaykpO1xuICAgIH0sXG5cbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgb25LZXlEb3duIChldmVudCkge1xuICAgICAgICAvLyBzZXQgYSBmbGFnIHdoZW4ga2V5IHByZXNzZWRcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25LZXlVcCAoZXZlbnQpIHtcbiAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXG4gICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5zZXRKdW1wQWN0aW9uKCk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24odGhpcy5qdW1wQWN0aW9uKTtcblxuICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG5cbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkICkge1xuICAgICAgICAgICAgLy8gaWYgc3BlZWQgcmVhY2ggbGltaXQsIHVzZSBtYXggc3BlZWQgd2l0aCBjdXJyZW50IGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateBy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06e8elhuzZAfoEAhsDPiL4B', 'use_reversed_rotateBy');
// migration/use_reversed_rotateBy.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.3.0/v2.3.1/v2.3.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.3.0/v2.3.1/v2.3.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateBy._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlQnkuanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVCeSIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVlBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsUUFBWixHQUF1QixJQUF2QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSB1c2VkIGZvciBwcm9qZWN0cyBjb21wYXRpYmxlIHdpdGggdjIuMS4wL3YyLjEuMS92Mi4zLjAvdjIuMy4xL3YyLjMuMiB2ZXJzaW9ucy5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5BY3Rpb24gaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMC92Mi4xLjEvdjIuMy4wL3YyLjMuMS92Mi4zLjIg54mI5pys55qE5bel56iL77yMXHJcbiAqIOS9oOaXoOmcgOWcqOS7u+S9leWFtuWug+mhueebruS4reaJi+WKqOa3u+WKoOatpOiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67kuK3msqHnlKjliLAgQWN0aW9u77yM5Y+v55u05o6l5Yig6Zmk6K+l6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruacieaJmOeuoeS6jiBnaXQg562J54mI5pys5bqT77yM6K+35bCG5q2k6ISa5pys5LiA5bm25LiK5Lyg44CCXHJcbiAqL1xyXG5cclxuY2MuUm90YXRlQnkuX3JldmVyc2UgPSB0cnVlO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/StartGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09680ecHhxO5Zq+If8fZaJy', 'StartGame');
// scripts/StartGame.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },
  // onLoad () {},
  startGame: function startGame() {
    cc.director.loadScene('game');
    console.log("start");
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3RhcnRHYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnRHYW1lIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb25zb2xlIiwibG9nIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQUMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CSixJQUFBQSxFQUFFLENBQUNLLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixNQUF0QjtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO0FBQ0gsR0ExQkk7QUE0QkxDLEVBQUFBLEtBNUJLLG1CQTRCRyxDQUVQLENBOUJJLENBZ0NMOztBQWhDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHBzOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgIFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Star');
// scripts/Star.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    pickRadius: 0
  },
  getPlayerDistance: function getPlayerDistance() {
    var playerPos = this.game.player.getPosition();
    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  onPicked: function onPicked() {
    this.game.spawnNewStar();
    this.game.gainScore();
    this.node.destroy();
  },
  update: function update(dt) {
    if (this.getPlayerDistance() < this.pickRadius) {
      this.onPicked();
      return;
    }

    var opacityRatio = 1 - this.game.timer / this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3Rhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBpY2tSYWRpdXMiLCJnZXRQbGF5ZXJEaXN0YW5jZSIsInBsYXllclBvcyIsImdhbWUiLCJwbGF5ZXIiLCJnZXRQb3NpdGlvbiIsImRpc3QiLCJub2RlIiwicG9zaXRpb24iLCJzdWIiLCJtYWciLCJvblBpY2tlZCIsInNwYXduTmV3U3RhciIsImdhaW5TY29yZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJkdCIsIm9wYWNpdHlSYXRpbyIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwibWluT3BhY2l0eSIsIm9wYWNpdHkiLCJNYXRoIiwiZmxvb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFESixHQUhQO0FBT0xDLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCLFFBQUlDLFNBQVMsR0FBRyxLQUFLQyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFdBQWpCLEVBQWhCO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsR0FBbkIsQ0FBdUJQLFNBQXZCLEVBQWtDUSxHQUFsQyxFQUFYO0FBQ0EsV0FBT0osSUFBUDtBQUNILEdBWEk7QUFhTEssRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCLFNBQUtSLElBQUwsQ0FBVVMsWUFBVjtBQUNBLFNBQUtULElBQUwsQ0FBVVUsU0FBVjtBQUNBLFNBQUtOLElBQUwsQ0FBVU8sT0FBVjtBQUNILEdBakJJO0FBbUJMQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQixRQUFJLEtBQUtmLGlCQUFMLEtBQTJCLEtBQUtELFVBQXBDLEVBQWdEO0FBQzVDLFdBQUtXLFFBQUw7QUFDQTtBQUNIOztBQUVELFFBQUlNLFlBQVksR0FBRyxJQUFJLEtBQUtkLElBQUwsQ0FBVWUsS0FBVixHQUFnQixLQUFLZixJQUFMLENBQVVnQixZQUFqRDtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLFNBQUtiLElBQUwsQ0FBVWMsT0FBVixHQUFvQkQsVUFBVSxHQUFHRSxJQUFJLENBQUNDLEtBQUwsQ0FBV04sWUFBWSxJQUFJLE1BQU1HLFVBQVYsQ0FBdkIsQ0FBakM7QUFDSDtBQTVCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwaWNrUmFkaXVzOiAwLFxuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGxheWVyUG9zID0gdGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZGlzdCA9IHRoaXMubm9kZS5wb3NpdGlvbi5zdWIocGxheWVyUG9zKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIGRpc3Q7XG4gICAgfSxcblxuICAgIG9uUGlja2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3RhcigpO1xuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmdldFBsYXllckRpc3RhbmNlKCkgPCB0aGlzLnBpY2tSYWRpdXMpIHtcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyL3RoaXMuZ2FtZS5zdGFyRHVyYXRpb247XG4gICAgICAgIHZhciBtaW5PcGFjaXR5ID0gNTA7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gbWluT3BhY2l0eSArIE1hdGguZmxvb3Iob3BhY2l0eVJhdGlvICogKDI1NSAtIG1pbk9wYWNpdHkpKTtcbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/SDK/bcx/core.min.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd17fdO4dGdKeZ0KncmF6wpb', 'core.min');
// SDK/bcx/core.min.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  var e = {};

  function n(r) {
    if (e[r]) return e[r].exports;
    var i = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
  }

  n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var i in t) {
      n.d(r, i, function (e) {
        return t[e];
      }.bind(null, i));
    }
    return r;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 64);
}([function (t, e) {
  t.exports = function (t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  };
}, function (t, e, n) {
  t.exports = n(35);
}, function (t, e) {
  t.exports = function (t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  };
}, function (t, e) {
  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
    }
  }

  t.exports = function (t, e, r) {
    return e && n(t.prototype, e), r && n(t, r), t;
  };
}, function (t, e) {
  "function" == typeof Object.create ? t.exports = function (t, e) {
    t.super_ = e, t.prototype = Object.create(e.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    });
  } : t.exports = function (t, e) {
    t.super_ = e;

    var n = function n() {};

    n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
  };
}, function (t, e) {
  function n(t, e, n, r, i, o, s) {
    try {
      var a = t[o](s),
          u = a.value;
    } catch (t) {
      return void n(t);
    }

    a.done ? e(u) : Promise.resolve(u).then(r, i);
  }

  t.exports = function (t) {
    return function () {
      var e = this,
          r = arguments;
      return new Promise(function (i, o) {
        var s = t.apply(e, r);

        function a(t) {
          n(s, i, o, a, u, "next", t);
        }

        function u(t) {
          n(s, i, o, a, u, "throw", t);
        }

        a(void 0);
      });
    };
  };
}, function (t, e, n) {
  var r = n(16),
      i = r.Buffer;

  function o(t, e) {
    for (var n in t) {
      e[n] = t[n];
    }
  }

  function s(t, e, n) {
    return i(t, e, n);
  }

  i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r : (o(r, e), e.Buffer = s), o(i, s), s.from = function (t, e, n) {
    if ("number" == typeof t) throw new TypeError("Argument must not be a number");
    return i(t, e, n);
  }, s.alloc = function (t, e, n) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    var r = i(t);
    return void 0 !== e ? "string" == typeof n ? r.fill(e, n) : r.fill(e) : r.fill(0), r;
  }, s.allocUnsafe = function (t) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    return i(t);
  }, s.allocUnsafeSlow = function (t) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    return r.SlowBuffer(t);
  };
}, function (t, e) {
  var n;

  n = function () {
    return this;
  }();

  try {
    n = n || new Function("return this")();
  } catch (t) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
  }

  t.exports = n;
}, function (t, e, n) {
  "use strict";

  var r = n(12),
      i = Object.keys || function (t) {
    var e = [];

    for (var n in t) {
      e.push(n);
    }

    return e;
  };

  t.exports = f;
  var o = n(10);
  o.inherits = n(4);
  var s = n(25),
      a = n(19);
  o.inherits(f, s);

  for (var u = i(a.prototype), c = 0; c < u.length; c++) {
    var h = u[c];
    f.prototype[h] || (f.prototype[h] = a.prototype[h]);
  }

  function f(t) {
    if (!(this instanceof f)) return new f(t);
    s.call(this, t), a.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", l);
  }

  function l() {
    this.allowHalfOpen || this._writableState.ended || r.nextTick(d, this);
  }

  function d(t) {
    t.end();
  }

  Object.defineProperty(f.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(f.prototype, "destroyed", {
    get: function get() {
      return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(t) {
      void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t);
    }
  }), f.prototype._destroy = function (t, e) {
    this.push(null), this.end(), r.nextTick(e, t);
  };
}, function (t, e, n) {
  var r = n(6).Buffer;

  function i(t, e) {
    this._block = r.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0;
  }

  i.prototype.update = function (t, e) {
    "string" == typeof t && (e = e || "utf8", t = r.from(t, e));

    for (var n = this._block, i = this._blockSize, o = t.length, s = this._len, a = 0; a < o;) {
      for (var u = s % i, c = Math.min(o - a, i - u), h = 0; h < c; h++) {
        n[u + h] = t[a + h];
      }

      a += c, (s += c) % i == 0 && this._update(n);
    }

    return this._len += o, this;
  }, i.prototype.digest = function (t) {
    var e = this._len % this._blockSize;
    this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var n = 8 * this._len;
    if (n <= 4294967295) this._block.writeUInt32BE(n, this._blockSize - 4);else {
      var r = (4294967295 & n) >>> 0,
          i = (n - r) / 4294967296;
      this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4);
    }

    this._update(this._block);

    var o = this._hash();

    return t ? o.toString(t) : o;
  }, i.prototype._update = function () {
    throw new Error("_update must be implemented by subclass");
  }, t.exports = i;
}, function (t, e, n) {
  (function (t) {
    function n(t) {
      return Object.prototype.toString.call(t);
    }

    e.isArray = function (t) {
      return Array.isArray ? Array.isArray(t) : "[object Array]" === n(t);
    }, e.isBoolean = function (t) {
      return "boolean" == typeof t;
    }, e.isNull = function (t) {
      return null === t;
    }, e.isNullOrUndefined = function (t) {
      return null == t;
    }, e.isNumber = function (t) {
      return "number" == typeof t;
    }, e.isString = function (t) {
      return "string" == typeof t;
    }, e.isSymbol = function (t) {
      return "symbol" == _typeof(t);
    }, e.isUndefined = function (t) {
      return void 0 === t;
    }, e.isRegExp = function (t) {
      return "[object RegExp]" === n(t);
    }, e.isObject = function (t) {
      return "object" == _typeof(t) && null !== t;
    }, e.isDate = function (t) {
      return "[object Date]" === n(t);
    }, e.isError = function (t) {
      return "[object Error]" === n(t) || t instanceof Error;
    }, e.isFunction = function (t) {
      return "function" == typeof t;
    }, e.isPrimitive = function (t) {
      return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == _typeof(t) || void 0 === t;
    }, e.isBuffer = t.isBuffer;
  }).call(this, n(16).Buffer);
}, function (t, e) {
  var n,
      r,
      i = t.exports = {};

  function o() {
    throw new Error("setTimeout has not been defined");
  }

  function s() {
    throw new Error("clearTimeout has not been defined");
  }

  function a(t) {
    if (n === setTimeout) return setTimeout(t, 0);
    if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);

    try {
      return n(t, 0);
    } catch (e) {
      try {
        return n.call(null, t, 0);
      } catch (e) {
        return n.call(this, t, 0);
      }
    }
  }

  !function () {
    try {
      n = "function" == typeof setTimeout ? setTimeout : o;
    } catch (t) {
      n = o;
    }

    try {
      r = "function" == typeof clearTimeout ? clearTimeout : s;
    } catch (t) {
      r = s;
    }
  }();
  var u,
      c = [],
      h = !1,
      f = -1;

  function l() {
    h && u && (h = !1, u.length ? c = u.concat(c) : f = -1, c.length && d());
  }

  function d() {
    if (!h) {
      var t = a(l);
      h = !0;

      for (var e = c.length; e;) {
        for (u = c, c = []; ++f < e;) {
          u && u[f].run();
        }

        f = -1, e = c.length;
      }

      u = null, h = !1, function (t) {
        if (r === clearTimeout) return clearTimeout(t);
        if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);

        try {
          r(t);
        } catch (e) {
          try {
            return r.call(null, t);
          } catch (e) {
            return r.call(this, t);
          }
        }
      }(t);
    }
  }

  function p(t, e) {
    this.fun = t, this.array = e;
  }

  function g() {}

  i.nextTick = function (t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
      e[n - 1] = arguments[n];
    }
    c.push(new p(t, e)), 1 !== c.length || h || a(d);
  }, p.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function (t) {
    return [];
  }, i.binding = function (t) {
    throw new Error("process.binding is not supported");
  }, i.cwd = function () {
    return "/";
  }, i.chdir = function (t) {
    throw new Error("process.chdir is not supported");
  }, i.umask = function () {
    return 0;
  };
}, function (t, e, n) {
  "use strict";

  (function (e) {
    void 0 === e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
      nextTick: function nextTick(t, n, r, i) {
        if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
        var o,
            s,
            a = arguments.length;

        switch (a) {
          case 0:
          case 1:
            return e.nextTick(t);

          case 2:
            return e.nextTick(function () {
              t.call(null, n);
            });

          case 3:
            return e.nextTick(function () {
              t.call(null, n, r);
            });

          case 4:
            return e.nextTick(function () {
              t.call(null, n, r, i);
            });

          default:
            for (o = new Array(a - 1), s = 0; s < o.length;) {
              o[s++] = arguments[s];
            }

            return e.nextTick(function () {
              t.apply(null, o);
            });
        }
      }
    } : t.exports = e;
  }).call(this, n(11));
}, function (t, e, n) {
  var r = n(21),
      i = n(62);

  t.exports = function (t, e) {
    return !e || "object" !== r(e) && "function" != typeof e ? i(t) : e;
  };
}, function (t, e) {
  function n(e) {
    return t.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, n(e);
  }

  t.exports = n;
}, function (t, e, n) {
  var r = n(63);

  t.exports = function (t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && r(t, e);
  };
}, function (t, e, n) {
  "use strict";

  (function (t) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
    var r = n(42),
        i = n(43),
        o = n(23);

    function s() {
      return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }

    function a(t, e) {
      if (s() < e) throw new RangeError("Invalid typed array length");
      return u.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = u.prototype : (null === t && (t = new u(e)), t.length = e), t;
    }

    function u(t, e, n) {
      if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t, e, n);

      if ("number" == typeof t) {
        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
        return f(this, t);
      }

      return c(this, t, e, n);
    }

    function c(t, e, n, r) {
      if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, n, r) {
        if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
        if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
        e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
        u.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = u.prototype : t = l(t, e);
        return t;
      }(t, e, n, r) : "string" == typeof e ? function (t, e, n) {
        "string" == typeof n && "" !== n || (n = "utf8");
        if (!u.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
        var r = 0 | p(e, n),
            i = (t = a(t, r)).write(e, n);
        i !== r && (t = t.slice(0, i));
        return t;
      }(t, e, n) : function (t, e) {
        if (u.isBuffer(e)) {
          var n = 0 | d(e.length);
          return 0 === (t = a(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
        }

        if (e) {
          if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? a(t, 0) : l(t, e);
          if ("Buffer" === e.type && o(e.data)) return l(t, e.data);
        }

        var r;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }(t, e);
    }

    function h(t) {
      if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
      if (t < 0) throw new RangeError('"size" argument must not be negative');
    }

    function f(t, e) {
      if (h(e), t = a(t, e < 0 ? 0 : 0 | d(e)), !u.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) {
        t[n] = 0;
      }
      return t;
    }

    function l(t, e) {
      var n = e.length < 0 ? 0 : 0 | d(e.length);
      t = a(t, n);

      for (var r = 0; r < n; r += 1) {
        t[r] = 255 & e[r];
      }

      return t;
    }

    function d(t) {
      if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
      return 0 | t;
    }

    function p(t, e) {
      if (u.isBuffer(t)) return t.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
      "string" != typeof t && (t = "" + t);
      var n = t.length;
      if (0 === n) return 0;

      for (var r = !1;;) {
        switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return n;

          case "utf8":
          case "utf-8":
          case void 0:
            return D(t).length;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * n;

          case "hex":
            return n >>> 1;

          case "base64":
            return q(t).length;

          default:
            if (r) return D(t).length;
            e = ("" + e).toLowerCase(), r = !0;
        }
      }
    }

    function g(t, e, n) {
      var r = t[e];
      t[e] = t[n], t[n] = r;
    }

    function y(t, e, n, r, i) {
      if (0 === t.length) return -1;

      if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
        if (i) return -1;
        n = t.length - 1;
      } else if (n < 0) {
        if (!i) return -1;
        n = 0;
      }

      if ("string" == typeof e && (e = u.from(e, r)), u.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, i);
      if ("number" == typeof e) return e &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, i);
      throw new TypeError("val must be string, number or Buffer");
    }

    function v(t, e, n, r, i) {
      var o,
          s = 1,
          a = t.length,
          u = e.length;

      if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
        if (t.length < 2 || e.length < 2) return -1;
        s = 2, a /= 2, u /= 2, n /= 2;
      }

      function c(t, e) {
        return 1 === s ? t[e] : t.readUInt16BE(e * s);
      }

      if (i) {
        var h = -1;

        for (o = n; o < a; o++) {
          if (c(t, o) === c(e, -1 === h ? 0 : o - h)) {
            if (-1 === h && (h = o), o - h + 1 === u) return h * s;
          } else -1 !== h && (o -= o - h), h = -1;
        }
      } else for (n + u > a && (n = a - u), o = n; o >= 0; o--) {
        for (var f = !0, l = 0; l < u; l++) {
          if (c(t, o + l) !== c(e, l)) {
            f = !1;
            break;
          }
        }

        if (f) return o;
      }

      return -1;
    }

    function w(t, e, n, r) {
      n = Number(n) || 0;
      var i = t.length - n;
      r ? (r = Number(r)) > i && (r = i) : r = i;
      var o = e.length;
      if (o % 2 != 0) throw new TypeError("Invalid hex string");
      r > o / 2 && (r = o / 2);

      for (var s = 0; s < r; ++s) {
        var a = parseInt(e.substr(2 * s, 2), 16);
        if (isNaN(a)) return s;
        t[n + s] = a;
      }

      return s;
    }

    function _(t, e, n, r) {
      return W(D(e, t.length - n), t, n, r);
    }

    function b(t, e, n, r) {
      return W(function (t) {
        for (var e = [], n = 0; n < t.length; ++n) {
          e.push(255 & t.charCodeAt(n));
        }

        return e;
      }(e), t, n, r);
    }

    function m(t, e, n, r) {
      return b(t, e, n, r);
    }

    function k(t, e, n, r) {
      return W(q(e), t, n, r);
    }

    function E(t, e, n, r) {
      return W(function (t, e) {
        for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) {
          n = t.charCodeAt(s), r = n >> 8, i = n % 256, o.push(i), o.push(r);
        }

        return o;
      }(e, t.length - n), t, n, r);
    }

    function S(t, e, n) {
      return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
    }

    function x(t, e, n) {
      n = Math.min(t.length, n);

      for (var r = [], i = e; i < n;) {
        var o,
            s,
            a,
            u,
            c = t[i],
            h = null,
            f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
        if (i + f <= n) switch (f) {
          case 1:
            c < 128 && (h = c);
            break;

          case 2:
            128 == (192 & (o = t[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (h = u);
            break;

          case 3:
            o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (h = u);
            break;

          case 4:
            o = t[i + 1], s = t[i + 2], a = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (h = u);
        }
        null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), i += f;
      }

      return function (t) {
        var e = t.length;
        if (e <= A) return String.fromCharCode.apply(String, t);
        var n = "",
            r = 0;

        for (; r < e;) {
          n += String.fromCharCode.apply(String, t.slice(r, r += A));
        }

        return n;
      }(r);
    }

    e.Buffer = u, e.SlowBuffer = function (t) {
      +t != t && (t = 0);
      return u.alloc(+t);
    }, e.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
      try {
        var t = new Uint8Array(1);
        return t.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function foo() {
            return 42;
          }
        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
      } catch (t) {
        return !1;
      }
    }(), e.kMaxLength = s(), u.poolSize = 8192, u._augment = function (t) {
      return t.__proto__ = u.prototype, t;
    }, u.from = function (t, e, n) {
      return c(null, t, e, n);
    }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
      value: null,
      configurable: !0
    })), u.alloc = function (t, e, n) {
      return function (t, e, n, r) {
        return h(e), e <= 0 ? a(t, e) : void 0 !== n ? "string" == typeof r ? a(t, e).fill(n, r) : a(t, e).fill(n) : a(t, e);
      }(null, t, e, n);
    }, u.allocUnsafe = function (t) {
      return f(null, t);
    }, u.allocUnsafeSlow = function (t) {
      return f(null, t);
    }, u.isBuffer = function (t) {
      return !(null == t || !t._isBuffer);
    }, u.compare = function (t, e) {
      if (!u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
      if (t === e) return 0;

      for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i) {
        if (t[i] !== e[i]) {
          n = t[i], r = e[i];
          break;
        }
      }

      return n < r ? -1 : r < n ? 1 : 0;
    }, u.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;

        default:
          return !1;
      }
    }, u.concat = function (t, e) {
      if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return u.alloc(0);
      var n;
      if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) {
        e += t[n].length;
      }
      var r = u.allocUnsafe(e),
          i = 0;

      for (n = 0; n < t.length; ++n) {
        var s = t[n];
        if (!u.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
        s.copy(r, i), i += s.length;
      }

      return r;
    }, u.byteLength = p, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {
      var t = this.length;
      if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

      for (var e = 0; e < t; e += 2) {
        g(this, e, e + 1);
      }

      return this;
    }, u.prototype.swap32 = function () {
      var t = this.length;
      if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

      for (var e = 0; e < t; e += 4) {
        g(this, e, e + 3), g(this, e + 1, e + 2);
      }

      return this;
    }, u.prototype.swap64 = function () {
      var t = this.length;
      if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

      for (var e = 0; e < t; e += 8) {
        g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
      }

      return this;
    }, u.prototype.toString = function () {
      var t = 0 | this.length;
      return 0 === t ? "" : 0 === arguments.length ? x(this, 0, t) : function (t, e, n) {
        var r = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
        if ((n >>>= 0) <= (e >>>= 0)) return "";

        for (t || (t = "utf8");;) {
          switch (t) {
            case "hex":
              return R(this, e, n);

            case "utf8":
            case "utf-8":
              return x(this, e, n);

            case "ascii":
              return T(this, e, n);

            case "latin1":
            case "binary":
              return I(this, e, n);

            case "base64":
              return S(this, e, n);

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return O(this, e, n);

            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0;
          }
        }
      }.apply(this, arguments);
    }, u.prototype.equals = function (t) {
      if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t || 0 === u.compare(this, t);
    }, u.prototype.inspect = function () {
      var t = "",
          n = e.INSPECT_MAX_BYTES;
      return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">";
    }, u.prototype.compare = function (t, e, n, r, i) {
      if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
      if (r >= i && e >= n) return 0;
      if (r >= i) return -1;
      if (e >= n) return 1;
      if (this === t) return 0;

      for (var o = (i >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (e >>>= 0), a = Math.min(o, s), c = this.slice(r, i), h = t.slice(e, n), f = 0; f < a; ++f) {
        if (c[f] !== h[f]) {
          o = c[f], s = h[f];
          break;
        }
      }

      return o < s ? -1 : s < o ? 1 : 0;
    }, u.prototype.includes = function (t, e, n) {
      return -1 !== this.indexOf(t, e, n);
    }, u.prototype.indexOf = function (t, e, n) {
      return y(this, t, e, n, !0);
    }, u.prototype.lastIndexOf = function (t, e, n) {
      return y(this, t, e, n, !1);
    }, u.prototype.write = function (t, e, n, r) {
      if (void 0 === e) r = "utf8", n = this.length, e = 0;else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;else {
        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
      }
      var i = this.length - e;
      if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      r || (r = "utf8");

      for (var o = !1;;) {
        switch (r) {
          case "hex":
            return w(this, t, e, n);

          case "utf8":
          case "utf-8":
            return _(this, t, e, n);

          case "ascii":
            return b(this, t, e, n);

          case "latin1":
          case "binary":
            return m(this, t, e, n);

          case "base64":
            return k(this, t, e, n);

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return E(this, t, e, n);

          default:
            if (o) throw new TypeError("Unknown encoding: " + r);
            r = ("" + r).toLowerCase(), o = !0;
        }
      }
    }, u.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    var A = 4096;

    function T(t, e, n) {
      var r = "";
      n = Math.min(t.length, n);

      for (var i = e; i < n; ++i) {
        r += String.fromCharCode(127 & t[i]);
      }

      return r;
    }

    function I(t, e, n) {
      var r = "";
      n = Math.min(t.length, n);

      for (var i = e; i < n; ++i) {
        r += String.fromCharCode(t[i]);
      }

      return r;
    }

    function R(t, e, n) {
      var r = t.length;
      (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);

      for (var i = "", o = e; o < n; ++o) {
        i += F(t[o]);
      }

      return i;
    }

    function O(t, e, n) {
      for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) {
        i += String.fromCharCode(r[o] + 256 * r[o + 1]);
      }

      return i;
    }

    function P(t, e, n) {
      if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
      if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
    }

    function B(t, e, n, r, i, o) {
      if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
      if (n + r > t.length) throw new RangeError("Index out of range");
    }

    function L(t, e, n, r) {
      e < 0 && (e = 65535 + e + 1);

      for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) {
        t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
      }
    }

    function C(t, e, n, r) {
      e < 0 && (e = 4294967295 + e + 1);

      for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) {
        t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255;
      }
    }

    function M(t, e, n, r, i, o) {
      if (n + r > t.length) throw new RangeError("Index out of range");
      if (n < 0) throw new RangeError("Index out of range");
    }

    function j(t, e, n, r, o) {
      return o || M(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4;
    }

    function N(t, e, n, r, o) {
      return o || M(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8;
    }

    u.prototype.slice = function (t, e) {
      var n,
          r = this.length;
      if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), u.TYPED_ARRAY_SUPPORT) (n = this.subarray(t, e)).__proto__ = u.prototype;else {
        var i = e - t;
        n = new u(i, void 0);

        for (var o = 0; o < i; ++o) {
          n[o] = this[o + t];
        }
      }
      return n;
    }, u.prototype.readUIntLE = function (t, e, n) {
      t |= 0, e |= 0, n || P(t, e, this.length);

      for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) {
        r += this[t + o] * i;
      }

      return r;
    }, u.prototype.readUIntBE = function (t, e, n) {
      t |= 0, e |= 0, n || P(t, e, this.length);

      for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) {
        r += this[t + --e] * i;
      }

      return r;
    }, u.prototype.readUInt8 = function (t, e) {
      return e || P(t, 1, this.length), this[t];
    }, u.prototype.readUInt16LE = function (t, e) {
      return e || P(t, 2, this.length), this[t] | this[t + 1] << 8;
    }, u.prototype.readUInt16BE = function (t, e) {
      return e || P(t, 2, this.length), this[t] << 8 | this[t + 1];
    }, u.prototype.readUInt32LE = function (t, e) {
      return e || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
    }, u.prototype.readUInt32BE = function (t, e) {
      return e || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
    }, u.prototype.readIntLE = function (t, e, n) {
      t |= 0, e |= 0, n || P(t, e, this.length);

      for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) {
        r += this[t + o] * i;
      }

      return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r;
    }, u.prototype.readIntBE = function (t, e, n) {
      t |= 0, e |= 0, n || P(t, e, this.length);

      for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) {
        o += this[t + --r] * i;
      }

      return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
    }, u.prototype.readInt8 = function (t, e) {
      return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
    }, u.prototype.readInt16LE = function (t, e) {
      e || P(t, 2, this.length);
      var n = this[t] | this[t + 1] << 8;
      return 32768 & n ? 4294901760 | n : n;
    }, u.prototype.readInt16BE = function (t, e) {
      e || P(t, 2, this.length);
      var n = this[t + 1] | this[t] << 8;
      return 32768 & n ? 4294901760 | n : n;
    }, u.prototype.readInt32LE = function (t, e) {
      return e || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
    }, u.prototype.readInt32BE = function (t, e) {
      return e || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
    }, u.prototype.readFloatLE = function (t, e) {
      return e || P(t, 4, this.length), i.read(this, t, !0, 23, 4);
    }, u.prototype.readFloatBE = function (t, e) {
      return e || P(t, 4, this.length), i.read(this, t, !1, 23, 4);
    }, u.prototype.readDoubleLE = function (t, e) {
      return e || P(t, 8, this.length), i.read(this, t, !0, 52, 8);
    }, u.prototype.readDoubleBE = function (t, e) {
      return e || P(t, 8, this.length), i.read(this, t, !1, 52, 8);
    }, u.prototype.writeUIntLE = function (t, e, n, r) {
      (t = +t, e |= 0, n |= 0, r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
      var i = 1,
          o = 0;

      for (this[e] = 255 & t; ++o < n && (i *= 256);) {
        this[e + o] = t / i & 255;
      }

      return e + n;
    }, u.prototype.writeUIntBE = function (t, e, n, r) {
      (t = +t, e |= 0, n |= 0, r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
      var i = n - 1,
          o = 1;

      for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) {
        this[e + i] = t / o & 255;
      }

      return e + n;
    }, u.prototype.writeUInt8 = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
    }, u.prototype.writeUInt16LE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2;
    }, u.prototype.writeUInt16BE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2;
    }, u.prototype.writeUInt32LE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : C(this, t, e, !0), e + 4;
    }, u.prototype.writeUInt32BE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4;
    }, u.prototype.writeIntLE = function (t, e, n, r) {
      if (t = +t, e |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        B(this, t, e, n, i - 1, -i);
      }

      var o = 0,
          s = 1,
          a = 0;

      for (this[e] = 255 & t; ++o < n && (s *= 256);) {
        t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
      }

      return e + n;
    }, u.prototype.writeIntBE = function (t, e, n, r) {
      if (t = +t, e |= 0, !r) {
        var i = Math.pow(2, 8 * n - 1);
        B(this, t, e, n, i - 1, -i);
      }

      var o = n - 1,
          s = 1,
          a = 0;

      for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) {
        t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
      }

      return e + n;
    }, u.prototype.writeInt8 = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
    }, u.prototype.writeInt16LE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2;
    }, u.prototype.writeInt16BE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2;
    }, u.prototype.writeInt32LE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : C(this, t, e, !0), e + 4;
    }, u.prototype.writeInt32BE = function (t, e, n) {
      return t = +t, e |= 0, n || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4;
    }, u.prototype.writeFloatLE = function (t, e, n) {
      return j(this, t, e, !0, n);
    }, u.prototype.writeFloatBE = function (t, e, n) {
      return j(this, t, e, !1, n);
    }, u.prototype.writeDoubleLE = function (t, e, n) {
      return N(this, t, e, !0, n);
    }, u.prototype.writeDoubleBE = function (t, e, n) {
      return N(this, t, e, !1, n);
    }, u.prototype.copy = function (t, e, n, r) {
      if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
      if (0 === t.length || 0 === this.length) return 0;
      if (e < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
      if (r < 0) throw new RangeError("sourceEnd out of bounds");
      r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
      var i,
          o = r - n;
      if (this === t && n < e && e < r) for (i = o - 1; i >= 0; --i) {
        t[i + e] = this[i + n];
      } else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) {
        t[i + e] = this[i + n];
      } else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
      return o;
    }, u.prototype.fill = function (t, e, n, r) {
      if ("string" == typeof t) {
        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
          var i = t.charCodeAt(0);
          i < 256 && (t = i);
        }

        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
        if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
      } else "number" == typeof t && (t &= 255);

      if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
      if (n <= e) return this;
      var o;
      if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < n; ++o) {
        this[o] = t;
      } else {
        var s = u.isBuffer(t) ? t : D(new u(t, r).toString()),
            a = s.length;

        for (o = 0; o < n - e; ++o) {
          this[o + e] = s[o % a];
        }
      }
      return this;
    };
    var U = /[^+\/0-9A-Za-z-_]/g;

    function F(t) {
      return t < 16 ? "0" + t.toString(16) : t.toString(16);
    }

    function D(t, e) {
      var n;
      e = e || 1 / 0;

      for (var r = t.length, i = null, o = [], s = 0; s < r; ++s) {
        if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
          if (!i) {
            if (n > 56319) {
              (e -= 3) > -1 && o.push(239, 191, 189);
              continue;
            }

            if (s + 1 === r) {
              (e -= 3) > -1 && o.push(239, 191, 189);
              continue;
            }

            i = n;
            continue;
          }

          if (n < 56320) {
            (e -= 3) > -1 && o.push(239, 191, 189), i = n;
            continue;
          }

          n = 65536 + (i - 55296 << 10 | n - 56320);
        } else i && (e -= 3) > -1 && o.push(239, 191, 189);

        if (i = null, n < 128) {
          if ((e -= 1) < 0) break;
          o.push(n);
        } else if (n < 2048) {
          if ((e -= 2) < 0) break;
          o.push(n >> 6 | 192, 63 & n | 128);
        } else if (n < 65536) {
          if ((e -= 3) < 0) break;
          o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
        } else {
          if (!(n < 1114112)) throw new Error("Invalid code point");
          if ((e -= 4) < 0) break;
          o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
        }
      }

      return o;
    }

    function q(t) {
      return r.toByteArray(function (t) {
        if ((t = function (t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
        }(t).replace(U, "")).length < 2) return "";

        for (; t.length % 4 != 0;) {
          t += "=";
        }

        return t;
      }(t));
    }

    function W(t, e, n, r) {
      for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) {
        e[i + n] = t[i];
      }

      return i;
    }
  }).call(this, n(7));
}, function (t, e, n) {
  "use strict";

  var r,
      i = "object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) ? Reflect : null,
      o = i && "function" == typeof i.apply ? i.apply : function (t, e, n) {
    return Function.prototype.apply.call(t, e, n);
  };
  r = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function (t) {
    return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
  } : function (t) {
    return Object.getOwnPropertyNames(t);
  };

  var s = Number.isNaN || function (t) {
    return t != t;
  };

  function a() {
    a.init.call(this);
  }

  t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var u = 10;

  function c(t) {
    return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
  }

  function h(t, e, n, r) {
    var i, o, s, a;
    if ("function" != typeof n) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(n));
    if (void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), o = t._events), s = o[e]), void 0 === s) s = o[e] = n, ++t._eventsCount;else if ("function" == typeof s ? s = o[e] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), (i = c(t)) > 0 && s.length > i && !s.warned) {
      s.warned = !0;
      var u = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = t, u.type = e, u.count = s.length, a = u, console && console.warn && console.warn(a);
    }
    return t;
  }

  function f(t, e, n) {
    var r = {
      fired: !1,
      wrapFn: void 0,
      target: t,
      type: e,
      listener: n
    },
        i = function () {
      for (var t = [], e = 0; e < arguments.length; e++) {
        t.push(arguments[e]);
      }

      this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, o(this.listener, this.target, t));
    }.bind(r);

    return i.listener = n, r.wrapFn = i, i;
  }

  function l(t, e, n) {
    var r = t._events;
    if (void 0 === r) return [];
    var i = r[e];
    return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function (t) {
      for (var e = new Array(t.length), n = 0; n < e.length; ++n) {
        e[n] = t[n].listener || t[n];
      }

      return e;
    }(i) : p(i, i.length);
  }

  function d(t) {
    var e = this._events;

    if (void 0 !== e) {
      var n = e[t];
      if ("function" == typeof n) return 1;
      if (void 0 !== n) return n.length;
    }

    return 0;
  }

  function p(t, e) {
    for (var n = new Array(e), r = 0; r < e; ++r) {
      n[r] = t[r];
    }

    return n;
  }

  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function get() {
      return u;
    },
    set: function set(t) {
      if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
      u = t;
    }
  }), a.init = function () {
    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function (t) {
    if ("number" != typeof t || t < 0 || s(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
    return this._maxListeners = t, this;
  }, a.prototype.getMaxListeners = function () {
    return c(this);
  }, a.prototype.emit = function (t) {
    for (var e = [], n = 1; n < arguments.length; n++) {
      e.push(arguments[n]);
    }

    var r = "error" === t,
        i = this._events;
    if (void 0 !== i) r = r && void 0 === i.error;else if (!r) return !1;

    if (r) {
      var s;
      if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
      var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
      throw a.context = s, a;
    }

    var u = i[t];
    if (void 0 === u) return !1;
    if ("function" == typeof u) o(u, this, e);else {
      var c = u.length,
          h = p(u, c);

      for (n = 0; n < c; ++n) {
        o(h[n], this, e);
      }
    }
    return !0;
  }, a.prototype.addListener = function (t, e) {
    return h(this, t, e, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function (t, e) {
    return h(this, t, e, !0);
  }, a.prototype.once = function (t, e) {
    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(e));
    return this.on(t, f(this, t, e)), this;
  }, a.prototype.prependOnceListener = function (t, e) {
    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(e));
    return this.prependListener(t, f(this, t, e)), this;
  }, a.prototype.removeListener = function (t, e) {
    var n, r, i, o, s;
    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(e));
    if (void 0 === (r = this._events)) return this;
    if (void 0 === (n = r[t])) return this;
    if (n === e || n.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, n.listener || e));else if ("function" != typeof n) {
      for (i = -1, o = n.length - 1; o >= 0; o--) {
        if (n[o] === e || n[o].listener === e) {
          s = n[o].listener, i = o;
          break;
        }
      }

      if (i < 0) return this;
      0 === i ? n.shift() : function (t, e) {
        for (; e + 1 < t.length; e++) {
          t[e] = t[e + 1];
        }

        t.pop();
      }(n, i), 1 === n.length && (r[t] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", t, s || e);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function (t) {
    var e, n, r;
    if (void 0 === (n = this._events)) return this;
    if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[t]), this;

    if (0 === arguments.length) {
      var i,
          o = Object.keys(n);

      for (r = 0; r < o.length; ++r) {
        "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
      }

      return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
    }

    if ("function" == typeof (e = n[t])) this.removeListener(t, e);else if (void 0 !== e) for (r = e.length - 1; r >= 0; r--) {
      this.removeListener(t, e[r]);
    }
    return this;
  }, a.prototype.listeners = function (t) {
    return l(this, t, !0);
  }, a.prototype.rawListeners = function (t) {
    return l(this, t, !1);
  }, a.listenerCount = function (t, e) {
    return "function" == typeof t.listenerCount ? t.listenerCount(e) : d.call(t, e);
  }, a.prototype.listenerCount = d, a.prototype.eventNames = function () {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
}, function (t, e, n) {
  (e = t.exports = n(25)).Stream = e, e.Readable = e, e.Writable = n(19), e.Duplex = n(8), e.Transform = n(28), e.PassThrough = n(50);
}, function (t, e, n) {
  "use strict";

  (function (e, r, i) {
    var o = n(12);

    function s(t) {
      var e = this;
      this.next = null, this.entry = null, this.finish = function () {
        !function (t, e, n) {
          var r = t.entry;
          t.entry = null;

          for (; r;) {
            var i = r.callback;
            e.pendingcb--, i(n), r = r.next;
          }

          e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t;
        }(e, t);
      };
    }

    t.exports = w;
    var a,
        u = !e.browser && ["v0.10", "v0.9."].indexOf(e.version.slice(0, 5)) > -1 ? r : o.nextTick;
    w.WritableState = v;
    var c = n(10);
    c.inherits = n(4);

    var h = {
      deprecate: n(49)
    },
        f = n(26),
        l = n(6).Buffer,
        d = i.Uint8Array || function () {};

    var p,
        g = n(27);

    function y() {}

    function v(t, e) {
      a = a || n(8), t = t || {};
      var r = e instanceof a;
      this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode);
      var i = t.highWaterMark,
          c = t.writableHighWaterMark,
          h = this.objectMode ? 16 : 16384;
      this.highWaterMark = i || 0 === i ? i : r && (c || 0 === c) ? c : h, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
      var f = !1 === t.decodeStrings;
      this.decodeStrings = !f, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (t) {
        !function (t, e) {
          var n = t._writableState,
              r = n.sync,
              i = n.writecb;
          if (function (t) {
            t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0;
          }(n), e) !function (t, e, n, r, i) {
            --e.pendingcb, n ? (o.nextTick(i, r), o.nextTick(S, t, e), t._writableState.errorEmitted = !0, t.emit("error", r)) : (i(r), t._writableState.errorEmitted = !0, t.emit("error", r), S(t, e));
          }(t, n, r, e, i);else {
            var s = k(n);
            s || n.corked || n.bufferProcessing || !n.bufferedRequest || m(t, n), r ? u(b, t, n, s, i) : b(t, n, s, i);
          }
        }(e, t);
      }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s(this);
    }

    function w(t) {
      if (a = a || n(8), !(p.call(w, this) || this instanceof a)) return new w(t);
      this._writableState = new v(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t["final"] && (this._final = t["final"])), f.call(this);
    }

    function _(t, e, n, r, i, o, s) {
      e.writelen = r, e.writecb = s, e.writing = !0, e.sync = !0, n ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1;
    }

    function b(t, e, n, r) {
      n || function (t, e) {
        0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"));
      }(t, e), e.pendingcb--, r(), S(t, e);
    }

    function m(t, e) {
      e.bufferProcessing = !0;
      var n = e.bufferedRequest;

      if (t._writev && n && n.next) {
        var r = e.bufferedRequestCount,
            i = new Array(r),
            o = e.corkedRequestsFree;
        o.entry = n;

        for (var a = 0, u = !0; n;) {
          i[a] = n, n.isBuf || (u = !1), n = n.next, a += 1;
        }

        i.allBuffers = u, _(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new s(e), e.bufferedRequestCount = 0;
      } else {
        for (; n;) {
          var c = n.chunk,
              h = n.encoding,
              f = n.callback;
          if (_(t, e, !1, e.objectMode ? 1 : c.length, c, h, f), n = n.next, e.bufferedRequestCount--, e.writing) break;
        }

        null === n && (e.lastBufferedRequest = null);
      }

      e.bufferedRequest = n, e.bufferProcessing = !1;
    }

    function k(t) {
      return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing;
    }

    function E(t, e) {
      t._final(function (n) {
        e.pendingcb--, n && t.emit("error", n), e.prefinished = !0, t.emit("prefinish"), S(t, e);
      });
    }

    function S(t, e) {
      var n = k(e);
      return n && (!function (t, e) {
        e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, o.nextTick(E, t, e)) : (e.prefinished = !0, t.emit("prefinish")));
      }(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), n;
    }

    c.inherits(w, f), v.prototype.getBuffer = function () {
      for (var t = this.bufferedRequest, e = []; t;) {
        e.push(t), t = t.next;
      }

      return e;
    }, function () {
      try {
        Object.defineProperty(v.prototype, "buffer", {
          get: h.deprecate(function () {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (t) {}
    }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance], Object.defineProperty(w, Symbol.hasInstance, {
      value: function value(t) {
        return !!p.call(this, t) || this === w && t && t._writableState instanceof v;
      }
    })) : p = function p(t) {
      return t instanceof this;
    }, w.prototype.pipe = function () {
      this.emit("error", new Error("Cannot pipe, not readable"));
    }, w.prototype.write = function (t, e, n) {
      var r,
          i = this._writableState,
          s = !1,
          a = !i.objectMode && (r = t, l.isBuffer(r) || r instanceof d);
      return a && !l.isBuffer(t) && (t = function (t) {
        return l.from(t);
      }(t)), "function" == typeof e && (n = e, e = null), a ? e = "buffer" : e || (e = i.defaultEncoding), "function" != typeof n && (n = y), i.ended ? function (t, e) {
        var n = new Error("write after end");
        t.emit("error", n), o.nextTick(e, n);
      }(this, n) : (a || function (t, e, n, r) {
        var i = !0,
            s = !1;
        return null === n ? s = new TypeError("May not write null values to stream") : "string" == typeof n || void 0 === n || e.objectMode || (s = new TypeError("Invalid non-string/buffer chunk")), s && (t.emit("error", s), o.nextTick(r, s), i = !1), i;
      }(this, i, t, n)) && (i.pendingcb++, s = function (t, e, n, r, i, o) {
        if (!n) {
          var s = function (t, e, n) {
            t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = l.from(e, n));
            return e;
          }(e, r, i);

          r !== s && (n = !0, i = "buffer", r = s);
        }

        var a = e.objectMode ? 1 : r.length;
        e.length += a;
        var u = e.length < e.highWaterMark;
        u || (e.needDrain = !0);

        if (e.writing || e.corked) {
          var c = e.lastBufferedRequest;
          e.lastBufferedRequest = {
            chunk: r,
            encoding: i,
            isBuf: n,
            callback: o,
            next: null
          }, c ? c.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1;
        } else _(t, e, !1, a, r, i, o);

        return u;
      }(this, i, a, t, e, n)), s;
    }, w.prototype.cork = function () {
      this._writableState.corked++;
    }, w.prototype.uncork = function () {
      var t = this._writableState;
      t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || m(this, t));
    }, w.prototype.setDefaultEncoding = function (t) {
      if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
      return this._writableState.defaultEncoding = t, this;
    }, Object.defineProperty(w.prototype, "writableHighWaterMark", {
      enumerable: !1,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    }), w.prototype._write = function (t, e, n) {
      n(new Error("_write() is not implemented"));
    }, w.prototype._writev = null, w.prototype.end = function (t, e, n) {
      var r = this._writableState;
      "function" == typeof t ? (n = t, t = null, e = null) : "function" == typeof e && (n = e, e = null), null != t && this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || function (t, e, n) {
        e.ending = !0, S(t, e), n && (e.finished ? o.nextTick(n) : t.once("finish", n));
        e.ended = !0, t.writable = !1;
      }(this, r, n);
    }, Object.defineProperty(w.prototype, "destroyed", {
      get: function get() {
        return void 0 !== this._writableState && this._writableState.destroyed;
      },
      set: function set(t) {
        this._writableState && (this._writableState.destroyed = t);
      }
    }), w.prototype.destroy = g.destroy, w.prototype._undestroy = g.undestroy, w.prototype._destroy = function (t, e) {
      this.end(), e(t);
    };
  }).call(this, n(11), n(47).setImmediate, n(7));
}, function (t, e, n) {
  "use strict";

  var r = n(6).Buffer,
      i = r.isEncoding || function (t) {
    switch ((t = "" + t) && t.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;

      default:
        return !1;
    }
  };

  function o(t) {
    var e;

    switch (this.encoding = function (t) {
      var e = function (t) {
        if (!t) return "utf8";

        for (var e;;) {
          switch (t) {
            case "utf8":
            case "utf-8":
              return "utf8";

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";

            case "latin1":
            case "binary":
              return "latin1";

            case "base64":
            case "ascii":
            case "hex":
              return t;

            default:
              if (e) return;
              t = ("" + t).toLowerCase(), e = !0;
          }
        }
      }(t);

      if ("string" != typeof e && (r.isEncoding === i || !i(t))) throw new Error("Unknown encoding: " + t);
      return e || t;
    }(t), this.encoding) {
      case "utf16le":
        this.text = u, this.end = c, e = 4;
        break;

      case "utf8":
        this.fillLast = a, e = 4;
        break;

      case "base64":
        this.text = h, this.end = f, e = 3;
        break;

      default:
        return this.write = l, void (this.end = d);
    }

    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(e);
  }

  function s(t) {
    return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2;
  }

  function a(t) {
    var e = this.lastTotal - this.lastNeed,
        n = function (t, e, n) {
      if (128 != (192 & e[0])) return t.lastNeed = 0, "�";

      if (t.lastNeed > 1 && e.length > 1) {
        if (128 != (192 & e[1])) return t.lastNeed = 1, "�";
        if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�";
      }
    }(this, t);

    return void 0 !== n ? n : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length));
  }

  function u(t, e) {
    if ((t.length - e) % 2 == 0) {
      var n = t.toString("utf16le", e);

      if (n) {
        var r = n.charCodeAt(n.length - 1);
        if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], n.slice(0, -1);
      }

      return n;
    }

    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1);
  }

  function c(t) {
    var e = t && t.length ? this.write(t) : "";

    if (this.lastNeed) {
      var n = this.lastTotal - this.lastNeed;
      return e + this.lastChar.toString("utf16le", 0, n);
    }

    return e;
  }

  function h(t, e) {
    var n = (t.length - e) % 3;
    return 0 === n ? t.toString("base64", e) : (this.lastNeed = 3 - n, this.lastTotal = 3, 1 === n ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - n));
  }

  function f(t) {
    var e = t && t.length ? this.write(t) : "";
    return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e;
  }

  function l(t) {
    return t.toString(this.encoding);
  }

  function d(t) {
    return t && t.length ? this.write(t) : "";
  }

  e.StringDecoder = o, o.prototype.write = function (t) {
    if (0 === t.length) return "";
    var e, n;

    if (this.lastNeed) {
      if (void 0 === (e = this.fillLast(t))) return "";
      n = this.lastNeed, this.lastNeed = 0;
    } else n = 0;

    return n < t.length ? e ? e + this.text(t, n) : this.text(t, n) : e || "";
  }, o.prototype.end = function (t) {
    var e = t && t.length ? this.write(t) : "";
    return this.lastNeed ? e + "�" : e;
  }, o.prototype.text = function (t, e) {
    var n = function (t, e, n) {
      var r = e.length - 1;
      if (r < n) return 0;
      var i = s(e[r]);
      if (i >= 0) return i > 0 && (t.lastNeed = i - 1), i;
      if (--r < n || -2 === i) return 0;
      if ((i = s(e[r])) >= 0) return i > 0 && (t.lastNeed = i - 2), i;
      if (--r < n || -2 === i) return 0;
      if ((i = s(e[r])) >= 0) return i > 0 && (2 === i ? i = 0 : t.lastNeed = i - 3), i;
      return 0;
    }(this, t, e);

    if (!this.lastNeed) return t.toString("utf8", e);
    this.lastTotal = n;
    var r = t.length - (n - this.lastNeed);
    return t.copy(this.lastChar, 0, r), t.toString("utf8", e, r);
  }, o.prototype.fillLast = function (t) {
    if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length;
  };
}, function (t, e) {
  function n(t) {
    return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function r(e) {
    return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? t.exports = r = function r(t) {
      return n(t);
    } : t.exports = r = function r(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t);
    }, r(e);
  }

  t.exports = r;
}, function (t, e, n) {
  "use strict";

  var r = n(6).Buffer,
      i = n(24).Transform;

  function o(t) {
    i.call(this), this._block = r.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }

  n(4)(o, i), o.prototype._transform = function (t, e, n) {
    var r = null;

    try {
      this.update(t, e);
    } catch (t) {
      r = t;
    }

    n(r);
  }, o.prototype._flush = function (t) {
    var e = null;

    try {
      this.push(this.digest());
    } catch (t) {
      e = t;
    }

    t(e);
  }, o.prototype.update = function (t, e) {
    if (function (t, e) {
      if (!r.isBuffer(t) && "string" != typeof t) throw new TypeError(e + " must be a string or a buffer");
    }(t, "Data"), this._finalized) throw new Error("Digest already called");
    r.isBuffer(t) || (t = r.from(t, e));

    for (var n = this._block, i = 0; this._blockOffset + t.length - i >= this._blockSize;) {
      for (var o = this._blockOffset; o < this._blockSize;) {
        n[o++] = t[i++];
      }

      this._update(), this._blockOffset = 0;
    }

    for (; i < t.length;) {
      n[this._blockOffset++] = t[i++];
    }

    for (var s = 0, a = 8 * t.length; a > 0; ++s) {
      this._length[s] += a, (a = this._length[s] / 4294967296 | 0) > 0 && (this._length[s] -= 4294967296 * a);
    }

    return this;
  }, o.prototype._update = function () {
    throw new Error("_update is not implemented");
  }, o.prototype.digest = function (t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;

    var e = this._digest();

    void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;

    for (var n = 0; n < 4; ++n) {
      this._length[n] = 0;
    }

    return e;
  }, o.prototype._digest = function () {
    throw new Error("_digest is not implemented");
  }, t.exports = o;
}, function (t, e) {
  var n = {}.toString;

  t.exports = Array.isArray || function (t) {
    return "[object Array]" == n.call(t);
  };
}, function (t, e, n) {
  t.exports = i;
  var r = n(17).EventEmitter;

  function i() {
    r.call(this);
  }

  n(4)(i, r), i.Readable = n(18), i.Writable = n(51), i.Duplex = n(52), i.Transform = n(53), i.PassThrough = n(54), i.Stream = i, i.prototype.pipe = function (t, e) {
    var n = this;

    function i(e) {
      t.writable && !1 === t.write(e) && n.pause && n.pause();
    }

    function o() {
      n.readable && n.resume && n.resume();
    }

    n.on("data", i), t.on("drain", o), t._isStdio || e && !1 === e.end || (n.on("end", a), n.on("close", u));
    var s = !1;

    function a() {
      s || (s = !0, t.end());
    }

    function u() {
      s || (s = !0, "function" == typeof t.destroy && t.destroy());
    }

    function c(t) {
      if (h(), 0 === r.listenerCount(this, "error")) throw t;
    }

    function h() {
      n.removeListener("data", i), t.removeListener("drain", o), n.removeListener("end", a), n.removeListener("close", u), n.removeListener("error", c), t.removeListener("error", c), n.removeListener("end", h), n.removeListener("close", h), t.removeListener("close", h);
    }

    return n.on("error", c), t.on("error", c), n.on("end", h), n.on("close", h), t.on("close", h), t.emit("pipe", n), t;
  };
}, function (t, e, n) {
  "use strict";

  (function (e, r) {
    var i = n(12);
    t.exports = _;
    var o,
        s = n(23);
    _.ReadableState = w;
    n(17).EventEmitter;

    var a = function a(t, e) {
      return t.listeners(e).length;
    },
        u = n(26),
        c = n(6).Buffer,
        h = e.Uint8Array || function () {};

    var f = n(10);
    f.inherits = n(4);
    var l = n(44),
        d = void 0;
    d = l && l.debuglog ? l.debuglog("stream") : function () {};
    var p,
        g = n(45),
        y = n(27);
    f.inherits(_, u);
    var v = ["error", "close", "destroy", "pause", "resume"];

    function w(t, e) {
      t = t || {};
      var r = e instanceof (o = o || n(8));
      this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
      var i = t.highWaterMark,
          s = t.readableHighWaterMark,
          a = this.objectMode ? 16 : 16384;
      this.highWaterMark = i || 0 === i ? i : r && (s || 0 === s) ? s : a, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new g(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (p || (p = n(20).StringDecoder), this.decoder = new p(t.encoding), this.encoding = t.encoding);
    }

    function _(t) {
      if (o = o || n(8), !(this instanceof _)) return new _(t);
      this._readableState = new w(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), u.call(this);
    }

    function b(t, e, n, r, i) {
      var o,
          s = t._readableState;
      null === e ? (s.reading = !1, function (t, e) {
        if (e.ended) return;

        if (e.decoder) {
          var n = e.decoder.end();
          n && n.length && (e.buffer.push(n), e.length += e.objectMode ? 1 : n.length);
        }

        e.ended = !0, S(t);
      }(t, s)) : (i || (o = function (t, e) {
        var n;
        r = e, c.isBuffer(r) || r instanceof h || "string" == typeof e || void 0 === e || t.objectMode || (n = new TypeError("Invalid non-string/buffer chunk"));
        var r;
        return n;
      }(s, e)), o ? t.emit("error", o) : s.objectMode || e && e.length > 0 ? ("string" == typeof e || s.objectMode || Object.getPrototypeOf(e) === c.prototype || (e = function (t) {
        return c.from(t);
      }(e)), r ? s.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : m(t, s, e, !0) : s.ended ? t.emit("error", new Error("stream.push() after EOF")) : (s.reading = !1, s.decoder && !n ? (e = s.decoder.write(e), s.objectMode || 0 !== e.length ? m(t, s, e, !1) : A(t, s)) : m(t, s, e, !1))) : r || (s.reading = !1));
      return function (t) {
        return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length);
      }(s);
    }

    function m(t, e, n, r) {
      e.flowing && 0 === e.length && !e.sync ? (t.emit("data", n), t.read(0)) : (e.length += e.objectMode ? 1 : n.length, r ? e.buffer.unshift(n) : e.buffer.push(n), e.needReadable && S(t)), A(t, e);
    }

    Object.defineProperty(_.prototype, "destroyed", {
      get: function get() {
        return void 0 !== this._readableState && this._readableState.destroyed;
      },
      set: function set(t) {
        this._readableState && (this._readableState.destroyed = t);
      }
    }), _.prototype.destroy = y.destroy, _.prototype._undestroy = y.undestroy, _.prototype._destroy = function (t, e) {
      this.push(null), e(t);
    }, _.prototype.push = function (t, e) {
      var n,
          r = this._readableState;
      return r.objectMode ? n = !0 : "string" == typeof t && ((e = e || r.defaultEncoding) !== r.encoding && (t = c.from(t, e), e = ""), n = !0), b(this, t, e, !1, n);
    }, _.prototype.unshift = function (t) {
      return b(this, t, null, !0, !1);
    }, _.prototype.isPaused = function () {
      return !1 === this._readableState.flowing;
    }, _.prototype.setEncoding = function (t) {
      return p || (p = n(20).StringDecoder), this._readableState.decoder = new p(t), this._readableState.encoding = t, this;
    };
    var k = 8388608;

    function E(t, e) {
      return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function (t) {
        return t >= k ? t = k : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t;
      }(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0));
    }

    function S(t) {
      var e = t._readableState;
      e.needReadable = !1, e.emittedReadable || (d("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? i.nextTick(x, t) : x(t));
    }

    function x(t) {
      d("emit readable"), t.emit("readable"), O(t);
    }

    function A(t, e) {
      e.readingMore || (e.readingMore = !0, i.nextTick(T, t, e));
    }

    function T(t, e) {
      for (var n = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (d("maybeReadMore read 0"), t.read(0), n !== e.length);) {
        n = e.length;
      }

      e.readingMore = !1;
    }

    function I(t) {
      d("readable nexttick read 0"), t.read(0);
    }

    function R(t, e) {
      e.reading || (d("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), O(t), e.flowing && !e.reading && t.read(0);
    }

    function O(t) {
      var e = t._readableState;

      for (d("flow", e.flowing); e.flowing && null !== t.read();) {
        ;
      }
    }

    function P(t, e) {
      return 0 === e.length ? null : (e.objectMode ? n = e.buffer.shift() : !t || t >= e.length ? (n = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : n = function (t, e, n) {
        var r;
        t < e.head.data.length ? (r = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : r = t === e.head.data.length ? e.shift() : n ? function (t, e) {
          var n = e.head,
              r = 1,
              i = n.data;
          t -= i.length;

          for (; n = n.next;) {
            var o = n.data,
                s = t > o.length ? o.length : t;

            if (s === o.length ? i += o : i += o.slice(0, t), 0 === (t -= s)) {
              s === o.length ? (++r, n.next ? e.head = n.next : e.head = e.tail = null) : (e.head = n, n.data = o.slice(s));
              break;
            }

            ++r;
          }

          return e.length -= r, i;
        }(t, e) : function (t, e) {
          var n = c.allocUnsafe(t),
              r = e.head,
              i = 1;
          r.data.copy(n), t -= r.data.length;

          for (; r = r.next;) {
            var o = r.data,
                s = t > o.length ? o.length : t;

            if (o.copy(n, n.length - t, 0, s), 0 === (t -= s)) {
              s === o.length ? (++i, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = o.slice(s));
              break;
            }

            ++i;
          }

          return e.length -= i, n;
        }(t, e);
        return r;
      }(t, e.buffer, e.decoder), n);
      var n;
    }

    function B(t) {
      var e = t._readableState;
      if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
      e.endEmitted || (e.ended = !0, i.nextTick(L, e, t));
    }

    function L(t, e) {
      t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"));
    }

    function C(t, e) {
      for (var n = 0, r = t.length; n < r; n++) {
        if (t[n] === e) return n;
      }

      return -1;
    }

    _.prototype.read = function (t) {
      d("read", t), t = parseInt(t, 10);
      var e = this._readableState,
          n = t;
      if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return d("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? B(this) : S(this), null;
      if (0 === (t = E(t, e)) && e.ended) return 0 === e.length && B(this), null;
      var r,
          i = e.needReadable;
      return d("need readable", i), (0 === e.length || e.length - t < e.highWaterMark) && d("length less than watermark", i = !0), e.ended || e.reading ? d("reading or ended", i = !1) : i && (d("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = E(n, e))), null === (r = t > 0 ? P(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), n !== t && e.ended && B(this)), null !== r && this.emit("data", r), r;
    }, _.prototype._read = function (t) {
      this.emit("error", new Error("_read() is not implemented"));
    }, _.prototype.pipe = function (t, e) {
      var n = this,
          o = this._readableState;

      switch (o.pipesCount) {
        case 0:
          o.pipes = t;
          break;

        case 1:
          o.pipes = [o.pipes, t];
          break;

        default:
          o.pipes.push(t);
      }

      o.pipesCount += 1, d("pipe count=%d opts=%j", o.pipesCount, e);
      var u = (!e || !1 !== e.end) && t !== r.stdout && t !== r.stderr ? h : _;

      function c(e, r) {
        d("onunpipe"), e === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, d("cleanup"), t.removeListener("close", v), t.removeListener("finish", w), t.removeListener("drain", f), t.removeListener("error", y), t.removeListener("unpipe", c), n.removeListener("end", h), n.removeListener("end", _), n.removeListener("data", g), l = !0, !o.awaitDrain || t._writableState && !t._writableState.needDrain || f());
      }

      function h() {
        d("onend"), t.end();
      }

      o.endEmitted ? i.nextTick(u) : n.once("end", u), t.on("unpipe", c);

      var f = function (t) {
        return function () {
          var e = t._readableState;
          d("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && a(t, "data") && (e.flowing = !0, O(t));
        };
      }(n);

      t.on("drain", f);
      var l = !1;
      var p = !1;

      function g(e) {
        d("ondata"), p = !1, !1 !== t.write(e) || p || ((1 === o.pipesCount && o.pipes === t || o.pipesCount > 1 && -1 !== C(o.pipes, t)) && !l && (d("false write response, pause", n._readableState.awaitDrain), n._readableState.awaitDrain++, p = !0), n.pause());
      }

      function y(e) {
        d("onerror", e), _(), t.removeListener("error", y), 0 === a(t, "error") && t.emit("error", e);
      }

      function v() {
        t.removeListener("finish", w), _();
      }

      function w() {
        d("onfinish"), t.removeListener("close", v), _();
      }

      function _() {
        d("unpipe"), n.unpipe(t);
      }

      return n.on("data", g), function (t, e, n) {
        if ("function" == typeof t.prependListener) return t.prependListener(e, n);
        t._events && t._events[e] ? s(t._events[e]) ? t._events[e].unshift(n) : t._events[e] = [n, t._events[e]] : t.on(e, n);
      }(t, "error", y), t.once("close", v), t.once("finish", w), t.emit("pipe", n), o.flowing || (d("pipe resume"), n.resume()), t;
    }, _.prototype.unpipe = function (t) {
      var e = this._readableState,
          n = {
        hasUnpiped: !1
      };
      if (0 === e.pipesCount) return this;
      if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, n), this);

      if (!t) {
        var r = e.pipes,
            i = e.pipesCount;
        e.pipes = null, e.pipesCount = 0, e.flowing = !1;

        for (var o = 0; o < i; o++) {
          r[o].emit("unpipe", this, n);
        }

        return this;
      }

      var s = C(e.pipes, t);
      return -1 === s ? this : (e.pipes.splice(s, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, n), this);
    }, _.prototype.on = function (t, e) {
      var n = u.prototype.on.call(this, t, e);
      if ("data" === t) !1 !== this._readableState.flowing && this.resume();else if ("readable" === t) {
        var r = this._readableState;
        r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && S(this) : i.nextTick(I, this));
      }
      return n;
    }, _.prototype.addListener = _.prototype.on, _.prototype.resume = function () {
      var t = this._readableState;
      return t.flowing || (d("resume"), t.flowing = !0, function (t, e) {
        e.resumeScheduled || (e.resumeScheduled = !0, i.nextTick(R, t, e));
      }(this, t)), this;
    }, _.prototype.pause = function () {
      return d("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (d("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
    }, _.prototype.wrap = function (t) {
      var e = this,
          n = this._readableState,
          r = !1;

      for (var i in t.on("end", function () {
        if (d("wrapped end"), n.decoder && !n.ended) {
          var t = n.decoder.end();
          t && t.length && e.push(t);
        }

        e.push(null);
      }), t.on("data", function (i) {
        (d("wrapped data"), n.decoder && (i = n.decoder.write(i)), n.objectMode && null == i) || (n.objectMode || i && i.length) && (e.push(i) || (r = !0, t.pause()));
      }), t) {
        void 0 === this[i] && "function" == typeof t[i] && (this[i] = function (e) {
          return function () {
            return t[e].apply(t, arguments);
          };
        }(i));
      }

      for (var o = 0; o < v.length; o++) {
        t.on(v[o], this.emit.bind(this, v[o]));
      }

      return this._read = function (e) {
        d("wrapped _read", e), r && (r = !1, t.resume());
      }, this;
    }, Object.defineProperty(_.prototype, "readableHighWaterMark", {
      enumerable: !1,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    }), _._fromList = P;
  }).call(this, n(7), n(11));
}, function (t, e, n) {
  t.exports = n(17).EventEmitter;
}, function (t, e, n) {
  "use strict";

  var r = n(12);

  function i(t, e) {
    t.emit("error", e);
  }

  t.exports = {
    destroy: function destroy(t, e) {
      var n = this,
          o = this._readableState && this._readableState.destroyed,
          s = this._writableState && this._writableState.destroyed;
      return o || s ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || r.nextTick(i, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
        !e && t ? (r.nextTick(i, n, t), n._writableState && (n._writableState.errorEmitted = !0)) : e && e(t);
      }), this);
    },
    undestroy: function undestroy() {
      this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
    }
  };
}, function (t, e, n) {
  "use strict";

  t.exports = s;
  var r = n(8),
      i = n(10);

  function o(t, e) {
    var n = this._transformState;
    n.transforming = !1;
    var r = n.writecb;
    if (!r) return this.emit("error", new Error("write callback called multiple times"));
    n.writechunk = null, n.writecb = null, null != e && this.push(e), r(t);
    var i = this._readableState;
    i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }

  function s(t) {
    if (!(this instanceof s)) return new s(t);
    r.call(this, t), this._transformState = {
      afterTransform: o.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", a);
  }

  function a() {
    var t = this;
    "function" == typeof this._flush ? this._flush(function (e, n) {
      u(t, e, n);
    }) : u(this, null, null);
  }

  function u(t, e, n) {
    if (e) return t.emit("error", e);
    if (null != n && t.push(n), t._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (t._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return t.push(null);
  }

  i.inherits = n(4), i.inherits(s, r), s.prototype.push = function (t, e) {
    return this._transformState.needTransform = !1, r.prototype.push.call(this, t, e);
  }, s.prototype._transform = function (t, e, n) {
    throw new Error("_transform() is not implemented");
  }, s.prototype._write = function (t, e, n) {
    var r = this._transformState;

    if (r.writecb = n, r.writechunk = t, r.writeencoding = e, !r.transforming) {
      var i = this._readableState;
      (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
    }
  }, s.prototype._read = function (t) {
    var e = this._transformState;
    null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
  }, s.prototype._destroy = function (t, e) {
    var n = this;

    r.prototype._destroy.call(this, t, function (t) {
      e(t), n.emit("close");
    });
  };
}, function (t, e, n) {
  var r = n(4),
      i = n(9),
      o = n(6).Buffer,
      s = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
      a = new Array(64);

  function u() {
    this.init(), this._w = a, i.call(this, 64, 56);
  }

  function c(t, e, n) {
    return n ^ t & (e ^ n);
  }

  function h(t, e, n) {
    return t & e | n & (t | e);
  }

  function f(t) {
    return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10);
  }

  function l(t) {
    return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7);
  }

  function d(t) {
    return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3;
  }

  r(u, i), u.prototype.init = function () {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  }, u.prototype._update = function (t) {
    for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, p = 0 | this._f, g = 0 | this._g, y = 0 | this._h, v = 0; v < 16; ++v) {
      n[v] = t.readInt32BE(4 * v);
    }

    for (; v < 64; ++v) {
      n[v] = 0 | (((e = n[v - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10) + n[v - 7] + d(n[v - 15]) + n[v - 16];
    }

    for (var w = 0; w < 64; ++w) {
      var _ = y + l(u) + c(u, p, g) + s[w] + n[w] | 0,
          b = f(r) + h(r, i, o) | 0;

      y = g, g = p, p = u, u = a + _ | 0, a = o, o = i, i = r, r = _ + b | 0;
    }

    this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0, this._f = p + this._f | 0, this._g = g + this._g | 0, this._h = y + this._h | 0;
  }, u.prototype._hash = function () {
    var t = o.allocUnsafe(32);
    return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(4),
      i = n(9),
      o = n(6).Buffer,
      s = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
      a = new Array(160);

  function u() {
    this.init(), this._w = a, i.call(this, 128, 112);
  }

  function c(t, e, n) {
    return n ^ t & (e ^ n);
  }

  function h(t, e, n) {
    return t & e | n & (t | e);
  }

  function f(t, e) {
    return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25);
  }

  function l(t, e) {
    return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23);
  }

  function d(t, e) {
    return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7;
  }

  function p(t, e) {
    return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25);
  }

  function g(t, e) {
    return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6;
  }

  function y(t, e) {
    return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26);
  }

  function v(t, e) {
    return t >>> 0 < e >>> 0 ? 1 : 0;
  }

  r(u, i), u.prototype.init = function () {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  }, u.prototype._update = function (t) {
    for (var e = this._w, n = 0 | this._ah, r = 0 | this._bh, i = 0 | this._ch, o = 0 | this._dh, a = 0 | this._eh, u = 0 | this._fh, w = 0 | this._gh, _ = 0 | this._hh, b = 0 | this._al, m = 0 | this._bl, k = 0 | this._cl, E = 0 | this._dl, S = 0 | this._el, x = 0 | this._fl, A = 0 | this._gl, T = 0 | this._hl, I = 0; I < 32; I += 2) {
      e[I] = t.readInt32BE(4 * I), e[I + 1] = t.readInt32BE(4 * I + 4);
    }

    for (; I < 160; I += 2) {
      var R = e[I - 30],
          O = e[I - 30 + 1],
          P = d(R, O),
          B = p(O, R),
          L = g(R = e[I - 4], O = e[I - 4 + 1]),
          C = y(O, R),
          M = e[I - 14],
          j = e[I - 14 + 1],
          N = e[I - 32],
          U = e[I - 32 + 1],
          F = B + j | 0,
          D = P + M + v(F, B) | 0;
      D = (D = D + L + v(F = F + C | 0, C) | 0) + N + v(F = F + U | 0, U) | 0, e[I] = D, e[I + 1] = F;
    }

    for (var q = 0; q < 160; q += 2) {
      D = e[q], F = e[q + 1];
      var W = h(n, r, i),
          Y = h(b, m, k),
          H = f(n, b),
          z = f(b, n),
          K = l(a, S),
          V = l(S, a),
          J = s[q],
          X = s[q + 1],
          G = c(a, u, w),
          $ = c(S, x, A),
          Q = T + V | 0,
          Z = _ + K + v(Q, T) | 0;
      Z = (Z = (Z = Z + G + v(Q = Q + $ | 0, $) | 0) + J + v(Q = Q + X | 0, X) | 0) + D + v(Q = Q + F | 0, F) | 0;
      var tt = z + Y | 0,
          et = H + W + v(tt, z) | 0;
      _ = w, T = A, w = u, A = x, u = a, x = S, a = o + Z + v(S = E + Q | 0, E) | 0, o = i, E = k, i = r, k = m, r = n, m = b, n = Z + et + v(b = Q + tt | 0, Q) | 0;
    }

    this._al = this._al + b | 0, this._bl = this._bl + m | 0, this._cl = this._cl + k | 0, this._dl = this._dl + E | 0, this._el = this._el + S | 0, this._fl = this._fl + x | 0, this._gl = this._gl + A | 0, this._hl = this._hl + T | 0, this._ah = this._ah + n + v(this._al, b) | 0, this._bh = this._bh + r + v(this._bl, m) | 0, this._ch = this._ch + i + v(this._cl, k) | 0, this._dh = this._dh + o + v(this._dl, E) | 0, this._eh = this._eh + a + v(this._el, S) | 0, this._fh = this._fh + u + v(this._fl, x) | 0, this._gh = this._gh + w + v(this._gl, A) | 0, this._hh = this._hh + _ + v(this._hl, T) | 0;
  }, u.prototype._hash = function () {
    var t = o.allocUnsafe(64);

    function e(e, n, r) {
      t.writeInt32BE(e, r), t.writeInt32BE(n, r + 4);
    }

    return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl, 48), e(this._hh, this._hl, 56), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(36),
      i = n(37),
      o = n(38);

  t.exports = function (t, e) {
    return r(t) || i(t, e) || o();
  };
}, function (t, e, n) {
  var r = n(39),
      i = n(40);

  t.exports = function (t) {
    if (r.crypto && r.crypto.getRandomValues) return r.crypto.getRandomValues(t);
    if ("object" == _typeof(r.msCrypto) && "function" == typeof r.msCrypto.getRandomValues) return r.msCrypto.getRandomValues(t);

    if (i.randomBytes) {
      if (!(t instanceof Uint8Array)) throw new TypeError("expected Uint8Array");

      if (t.length > 65536) {
        var e = new Error();
        throw e.code = 22, e.message = "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" + t.length + ") exceeds the number of bytes of entropy available via this API (65536).", e.name = "QuotaExceededError", e;
      }

      var n = i.randomBytes(t.length);
      return t.set(n), t;
    }

    throw new Error("No secure random number generator available.");
  };
}, function (t, e, n) {
  "use strict";

  var r = n(4),
      i = n(41),
      o = n(55),
      s = n(56),
      a = n(61);

  function u(t) {
    a.call(this, "digest"), this._hash = t;
  }

  r(u, a), u.prototype._update = function (t) {
    this._hash.update(t);
  }, u.prototype._final = function () {
    return this._hash.digest();
  }, t.exports = function (t) {
    return "md5" === (t = t.toLowerCase()) ? new i() : "rmd160" === t || "ripemd160" === t ? new o() : new u(s(t));
  };
}, function (t, e, n) {
  (function (e) {
    var n = null;
    "undefined" != typeof WebSocket ? n = WebSocket : "undefined" != typeof MozWebSocket ? n = MozWebSocket : void 0 !== e ? n = e.WebSocket || e.MozWebSocket : "undefined" != typeof window ? n = window.WebSocket || window.MozWebSocket : "undefined" != typeof self && (n = self.WebSocket || self.MozWebSocket), t.exports = n;
  }).call(this, n(7));
}, function (t, e, n) {
  var r = function (t) {
    "use strict";

    var e,
        n = Object.prototype,
        r = n.hasOwnProperty,
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        s = i.asyncIterator || "@@asyncIterator",
        a = i.toStringTag || "@@toStringTag";

    function u(t, e, n, r) {
      var i = e && e.prototype instanceof g ? e : g,
          o = Object.create(i.prototype),
          s = new T(r || []);
      return o._invoke = function (t, e, n) {
        var r = h;
        return function (i, o) {
          if (r === l) throw new Error("Generator is already running");

          if (r === d) {
            if ("throw" === i) throw o;
            return R();
          }

          for (n.method = i, n.arg = o;;) {
            var s = n.delegate;

            if (s) {
              var a = S(s, n);

              if (a) {
                if (a === p) continue;
                return a;
              }
            }

            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (r === h) throw r = d, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = l;
            var u = c(t, e, n);

            if ("normal" === u.type) {
              if (r = n.done ? d : f, u.arg === p) continue;
              return {
                value: u.arg,
                done: n.done
              };
            }

            "throw" === u.type && (r = d, n.method = "throw", n.arg = u.arg);
          }
        };
      }(t, n, s), o;
    }

    function c(t, e, n) {
      try {
        return {
          type: "normal",
          arg: t.call(e, n)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }

    t.wrap = u;
    var h = "suspendedStart",
        f = "suspendedYield",
        l = "executing",
        d = "completed",
        p = {};

    function g() {}

    function y() {}

    function v() {}

    var w = {};

    w[o] = function () {
      return this;
    };

    var _ = Object.getPrototypeOf,
        b = _ && _(_(I([])));

    b && b !== n && r.call(b, o) && (w = b);
    var m = v.prototype = g.prototype = Object.create(w);

    function k(t) {
      ["next", "throw", "return"].forEach(function (e) {
        t[e] = function (t) {
          return this._invoke(e, t);
        };
      });
    }

    function E(t) {
      var e;

      this._invoke = function (n, i) {
        function o() {
          return new Promise(function (e, o) {
            !function e(n, i, o, s) {
              var a = c(t[n], t, i);

              if ("throw" !== a.type) {
                var u = a.arg,
                    h = u.value;
                return h && "object" == _typeof(h) && r.call(h, "__await") ? Promise.resolve(h.__await).then(function (t) {
                  e("next", t, o, s);
                }, function (t) {
                  e("throw", t, o, s);
                }) : Promise.resolve(h).then(function (t) {
                  u.value = t, o(u);
                }, function (t) {
                  return e("throw", t, o, s);
                });
              }

              s(a.arg);
            }(n, i, e, o);
          });
        }

        return e = e ? e.then(o, o) : o();
      };
    }

    function S(t, n) {
      var r = t.iterator[n.method];

      if (r === e) {
        if (n.delegate = null, "throw" === n.method) {
          if (t.iterator["return"] && (n.method = "return", n.arg = e, S(t, n), "throw" === n.method)) return p;
          n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return p;
      }

      var i = c(r, t.iterator, n.arg);
      if ("throw" === i.type) return n.method = "throw", n.arg = i.arg, n.delegate = null, p;
      var o = i.arg;
      return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = e), n.delegate = null, p) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, p);
    }

    function x(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }

    function A(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }

    function T(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(x, this), this.reset(!0);
    }

    function I(t) {
      if (t) {
        var n = t[o];
        if (n) return n.call(t);
        if ("function" == typeof t.next) return t;

        if (!isNaN(t.length)) {
          var i = -1,
              s = function n() {
            for (; ++i < t.length;) {
              if (r.call(t, i)) return n.value = t[i], n.done = !1, n;
            }

            return n.value = e, n.done = !0, n;
          };

          return s.next = s;
        }
      }

      return {
        next: R
      };
    }

    function R() {
      return {
        value: e,
        done: !0
      };
    }

    return y.prototype = m.constructor = v, v.constructor = y, v[a] = y.displayName = "GeneratorFunction", t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, v) : (t.__proto__ = v, a in t || (t[a] = "GeneratorFunction")), t.prototype = Object.create(m), t;
    }, t.awrap = function (t) {
      return {
        __await: t
      };
    }, k(E.prototype), E.prototype[s] = function () {
      return this;
    }, t.AsyncIterator = E, t.async = function (e, n, r, i) {
      var o = new E(u(e, n, r, i));
      return t.isGeneratorFunction(n) ? o : o.next().then(function (t) {
        return t.done ? t.value : o.next();
      });
    }, k(m), m[a] = "Generator", m[o] = function () {
      return this;
    }, m.toString = function () {
      return "[object Generator]";
    }, t.keys = function (t) {
      var e = [];

      for (var n in t) {
        e.push(n);
      }

      return e.reverse(), function n() {
        for (; e.length;) {
          var r = e.pop();
          if (r in t) return n.value = r, n.done = !1, n;
        }

        return n.done = !0, n;
      };
    }, t.values = I, T.prototype = {
      constructor: T,
      reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(A), !t) for (var n in this) {
          "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
        }
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(t) {
        if (this.done) throw t;
        var n = this;

        function i(r, i) {
          return a.type = "throw", a.arg = t, n.next = r, i && (n.method = "next", n.arg = e), !!i;
        }

        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var s = this.tryEntries[o],
              a = s.completion;
          if ("root" === s.tryLoc) return i("end");

          if (s.tryLoc <= this.prev) {
            var u = r.call(s, "catchLoc"),
                c = r.call(s, "finallyLoc");

            if (u && c) {
              if (this.prev < s.catchLoc) return i(s.catchLoc, !0);
              if (this.prev < s.finallyLoc) return i(s.finallyLoc);
            } else if (u) {
              if (this.prev < s.catchLoc) return i(s.catchLoc, !0);
            } else {
              if (!c) throw new Error("try statement without catch or finally");
              if (this.prev < s.finallyLoc) return i(s.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t, e) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var i = this.tryEntries[n];

          if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
            var o = i;
            break;
          }
        }

        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
        var s = o ? o.completion : {};
        return s.type = t, s.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, p) : this.complete(s);
      },
      complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), p;
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), A(n), p;
        }
      },
      "catch": function _catch(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];

          if (n.tryLoc === t) {
            var r = n.completion;

            if ("throw" === r.type) {
              var i = r.arg;
              A(n);
            }

            return i;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(t, n, r) {
        return this.delegate = {
          iterator: I(t),
          resultName: n,
          nextLoc: r
        }, "next" === this.method && (this.arg = e), p;
      }
    }, t;
  }(t.exports);

  try {
    regeneratorRuntime = r;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(r);
  }
}, function (t, e) {
  t.exports = function (t) {
    if (Array.isArray(t)) return t;
  };
}, function (t, e) {
  t.exports = function (t, e) {
    var n = [],
        r = !0,
        i = !1,
        o = void 0;

    try {
      for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !e || n.length !== e); r = !0) {
        ;
      }
    } catch (t) {
      i = !0, o = t;
    } finally {
      try {
        r || null == a["return"] || a["return"]();
      } finally {
        if (i) throw o;
      }
    }

    return n;
  };
}, function (t, e) {
  t.exports = function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}, function (t, e, n) {
  (function (e) {
    var n;
    n = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}, t.exports = n;
  }).call(this, n(7));
}, function (t, e) {}, function (t, e, n) {
  "use strict";

  var r = n(4),
      i = n(22),
      o = n(6).Buffer,
      s = new Array(16);

  function a() {
    i.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }

  function u(t, e) {
    return t << e | t >>> 32 - e;
  }

  function c(t, e, n, r, i, o, s) {
    return u(t + (e & n | ~e & r) + i + o | 0, s) + e | 0;
  }

  function h(t, e, n, r, i, o, s) {
    return u(t + (e & r | n & ~r) + i + o | 0, s) + e | 0;
  }

  function f(t, e, n, r, i, o, s) {
    return u(t + (e ^ n ^ r) + i + o | 0, s) + e | 0;
  }

  function l(t, e, n, r, i, o, s) {
    return u(t + (n ^ (e | ~r)) + i + o | 0, s) + e | 0;
  }

  r(a, i), a.prototype._update = function () {
    for (var t = s, e = 0; e < 16; ++e) {
      t[e] = this._block.readInt32LE(4 * e);
    }

    var n = this._a,
        r = this._b,
        i = this._c,
        o = this._d;
    n = c(n, r, i, o, t[0], 3614090360, 7), o = c(o, n, r, i, t[1], 3905402710, 12), i = c(i, o, n, r, t[2], 606105819, 17), r = c(r, i, o, n, t[3], 3250441966, 22), n = c(n, r, i, o, t[4], 4118548399, 7), o = c(o, n, r, i, t[5], 1200080426, 12), i = c(i, o, n, r, t[6], 2821735955, 17), r = c(r, i, o, n, t[7], 4249261313, 22), n = c(n, r, i, o, t[8], 1770035416, 7), o = c(o, n, r, i, t[9], 2336552879, 12), i = c(i, o, n, r, t[10], 4294925233, 17), r = c(r, i, o, n, t[11], 2304563134, 22), n = c(n, r, i, o, t[12], 1804603682, 7), o = c(o, n, r, i, t[13], 4254626195, 12), i = c(i, o, n, r, t[14], 2792965006, 17), n = h(n, r = c(r, i, o, n, t[15], 1236535329, 22), i, o, t[1], 4129170786, 5), o = h(o, n, r, i, t[6], 3225465664, 9), i = h(i, o, n, r, t[11], 643717713, 14), r = h(r, i, o, n, t[0], 3921069994, 20), n = h(n, r, i, o, t[5], 3593408605, 5), o = h(o, n, r, i, t[10], 38016083, 9), i = h(i, o, n, r, t[15], 3634488961, 14), r = h(r, i, o, n, t[4], 3889429448, 20), n = h(n, r, i, o, t[9], 568446438, 5), o = h(o, n, r, i, t[14], 3275163606, 9), i = h(i, o, n, r, t[3], 4107603335, 14), r = h(r, i, o, n, t[8], 1163531501, 20), n = h(n, r, i, o, t[13], 2850285829, 5), o = h(o, n, r, i, t[2], 4243563512, 9), i = h(i, o, n, r, t[7], 1735328473, 14), n = f(n, r = h(r, i, o, n, t[12], 2368359562, 20), i, o, t[5], 4294588738, 4), o = f(o, n, r, i, t[8], 2272392833, 11), i = f(i, o, n, r, t[11], 1839030562, 16), r = f(r, i, o, n, t[14], 4259657740, 23), n = f(n, r, i, o, t[1], 2763975236, 4), o = f(o, n, r, i, t[4], 1272893353, 11), i = f(i, o, n, r, t[7], 4139469664, 16), r = f(r, i, o, n, t[10], 3200236656, 23), n = f(n, r, i, o, t[13], 681279174, 4), o = f(o, n, r, i, t[0], 3936430074, 11), i = f(i, o, n, r, t[3], 3572445317, 16), r = f(r, i, o, n, t[6], 76029189, 23), n = f(n, r, i, o, t[9], 3654602809, 4), o = f(o, n, r, i, t[12], 3873151461, 11), i = f(i, o, n, r, t[15], 530742520, 16), n = l(n, r = f(r, i, o, n, t[2], 3299628645, 23), i, o, t[0], 4096336452, 6), o = l(o, n, r, i, t[7], 1126891415, 10), i = l(i, o, n, r, t[14], 2878612391, 15), r = l(r, i, o, n, t[5], 4237533241, 21), n = l(n, r, i, o, t[12], 1700485571, 6), o = l(o, n, r, i, t[3], 2399980690, 10), i = l(i, o, n, r, t[10], 4293915773, 15), r = l(r, i, o, n, t[1], 2240044497, 21), n = l(n, r, i, o, t[8], 1873313359, 6), o = l(o, n, r, i, t[15], 4264355552, 10), i = l(i, o, n, r, t[6], 2734768916, 15), r = l(r, i, o, n, t[13], 1309151649, 21), n = l(n, r, i, o, t[4], 4149444226, 6), o = l(o, n, r, i, t[11], 3174756917, 10), i = l(i, o, n, r, t[2], 718787259, 15), r = l(r, i, o, n, t[9], 3951481745, 21), this._a = this._a + n | 0, this._b = this._b + r | 0, this._c = this._c + i | 0, this._d = this._d + o | 0;
  }, a.prototype._digest = function () {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var t = o.allocUnsafe(16);
    return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t;
  }, t.exports = a;
}, function (t, e, n) {
  "use strict";

  e.byteLength = function (t) {
    var e = c(t),
        n = e[0],
        r = e[1];
    return 3 * (n + r) / 4 - r;
  }, e.toByteArray = function (t) {
    for (var e, n = c(t), r = n[0], s = n[1], a = new o(function (t, e, n) {
      return 3 * (e + n) / 4 - n;
    }(0, r, s)), u = 0, h = s > 0 ? r - 4 : r, f = 0; f < h; f += 4) {
      e = i[t.charCodeAt(f)] << 18 | i[t.charCodeAt(f + 1)] << 12 | i[t.charCodeAt(f + 2)] << 6 | i[t.charCodeAt(f + 3)], a[u++] = e >> 16 & 255, a[u++] = e >> 8 & 255, a[u++] = 255 & e;
    }

    2 === s && (e = i[t.charCodeAt(f)] << 2 | i[t.charCodeAt(f + 1)] >> 4, a[u++] = 255 & e);
    1 === s && (e = i[t.charCodeAt(f)] << 10 | i[t.charCodeAt(f + 1)] << 4 | i[t.charCodeAt(f + 2)] >> 2, a[u++] = e >> 8 & 255, a[u++] = 255 & e);
    return a;
  }, e.fromByteArray = function (t) {
    for (var e, n = t.length, i = n % 3, o = [], s = 0, a = n - i; s < a; s += 16383) {
      o.push(h(t, s, s + 16383 > a ? a : s + 16383));
    }

    1 === i ? (e = t[n - 1], o.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === i && (e = (t[n - 2] << 8) + t[n - 1], o.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
    return o.join("");
  };

  for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) {
    r[a] = s[a], i[s.charCodeAt(a)] = a;
  }

  function c(t) {
    var e = t.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var n = t.indexOf("=");
    return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4];
  }

  function h(t, e, n) {
    for (var i, o, s = [], a = e; a < n; a += 3) {
      i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(r[(o = i) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
    }

    return s.join("");
  }

  i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
}, function (t, e) {
  e.read = function (t, e, n, r, i) {
    var o,
        s,
        a = 8 * i - r - 1,
        u = (1 << a) - 1,
        c = u >> 1,
        h = -7,
        f = n ? i - 1 : 0,
        l = n ? -1 : 1,
        d = t[e + f];

    for (f += l, o = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; o = 256 * o + t[e + f], f += l, h -= 8) {
      ;
    }

    for (s = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; s = 256 * s + t[e + f], f += l, h -= 8) {
      ;
    }

    if (0 === o) o = 1 - c;else {
      if (o === u) return s ? NaN : 1 / 0 * (d ? -1 : 1);
      s += Math.pow(2, r), o -= c;
    }
    return (d ? -1 : 1) * s * Math.pow(2, o - r);
  }, e.write = function (t, e, n, r, i, o) {
    var s,
        a,
        u,
        c = 8 * o - i - 1,
        h = (1 << c) - 1,
        f = h >> 1,
        l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        d = r ? 0 : o - 1,
        p = r ? 1 : -1,
        g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + f >= 1 ? l / u : l * Math.pow(2, 1 - f)) * u >= 2 && (s++, u /= 2), s + f >= h ? (a = 0, s = h) : s + f >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + d] = 255 & a, d += p, a /= 256, i -= 8) {
      ;
    }

    for (s = s << i | a, c += i; c > 0; t[n + d] = 255 & s, d += p, s /= 256, c -= 8) {
      ;
    }

    t[n + d - p] |= 128 * g;
  };
}, function (t, e) {}, function (t, e, n) {
  "use strict";

  var r = n(6).Buffer,
      i = n(46);
  t.exports = function () {
    function t() {
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.head = null, this.tail = null, this.length = 0;
    }

    return t.prototype.push = function (t) {
      var e = {
        data: t,
        next: null
      };
      this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length;
    }, t.prototype.unshift = function (t) {
      var e = {
        data: t,
        next: this.head
      };
      0 === this.length && (this.tail = e), this.head = e, ++this.length;
    }, t.prototype.shift = function () {
      if (0 !== this.length) {
        var t = this.head.data;
        return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
      }
    }, t.prototype.clear = function () {
      this.head = this.tail = null, this.length = 0;
    }, t.prototype.join = function (t) {
      if (0 === this.length) return "";

      for (var e = this.head, n = "" + e.data; e = e.next;) {
        n += t + e.data;
      }

      return n;
    }, t.prototype.concat = function (t) {
      if (0 === this.length) return r.alloc(0);
      if (1 === this.length) return this.head.data;

      for (var e, n, i, o = r.allocUnsafe(t >>> 0), s = this.head, a = 0; s;) {
        e = s.data, n = o, i = a, e.copy(n, i), a += s.data.length, s = s.next;
      }

      return o;
    }, t;
  }(), i && i.inspect && i.inspect.custom && (t.exports.prototype[i.inspect.custom] = function () {
    var t = i.inspect({
      length: this.length
    });
    return this.constructor.name + " " + t;
  });
}, function (t, e) {}, function (t, e, n) {
  (function (t) {
    var r = void 0 !== t && t || "undefined" != typeof self && self || window,
        i = Function.prototype.apply;

    function o(t, e) {
      this._id = t, this._clearFn = e;
    }

    e.setTimeout = function () {
      return new o(i.call(setTimeout, r, arguments), clearTimeout);
    }, e.setInterval = function () {
      return new o(i.call(setInterval, r, arguments), clearInterval);
    }, e.clearTimeout = e.clearInterval = function (t) {
      t && t.close();
    }, o.prototype.unref = o.prototype.ref = function () {}, o.prototype.close = function () {
      this._clearFn.call(r, this._id);
    }, e.enroll = function (t, e) {
      clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
    }, e.unenroll = function (t) {
      clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
    }, e._unrefActive = e.active = function (t) {
      clearTimeout(t._idleTimeoutId);
      var e = t._idleTimeout;
      e >= 0 && (t._idleTimeoutId = setTimeout(function () {
        t._onTimeout && t._onTimeout();
      }, e));
    }, n(48), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate;
  }).call(this, n(7));
}, function (t, e, n) {
  (function (t, e) {
    !function (t, n) {
      "use strict";

      if (!t.setImmediate) {
        var r,
            i,
            o,
            s,
            a,
            u = 1,
            c = {},
            h = !1,
            f = t.document,
            l = Object.getPrototypeOf && Object.getPrototypeOf(t);
        l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? r = function r(t) {
          e.nextTick(function () {
            p(t);
          });
        } : !function () {
          if (t.postMessage && !t.importScripts) {
            var e = !0,
                n = t.onmessage;
            return t.onmessage = function () {
              e = !1;
            }, t.postMessage("", "*"), t.onmessage = n, e;
          }
        }() ? t.MessageChannel ? ((o = new MessageChannel()).port1.onmessage = function (t) {
          p(t.data);
        }, r = function r(t) {
          o.port2.postMessage(t);
        }) : f && "onreadystatechange" in f.createElement("script") ? (i = f.documentElement, r = function r(t) {
          var e = f.createElement("script");
          e.onreadystatechange = function () {
            p(t), e.onreadystatechange = null, i.removeChild(e), e = null;
          }, i.appendChild(e);
        }) : r = function r(t) {
          setTimeout(p, 0, t);
        } : (s = "setImmediate$" + Math.random() + "$", a = function a(e) {
          e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(s) && p(+e.data.slice(s.length));
        }, t.addEventListener ? t.addEventListener("message", a, !1) : t.attachEvent("onmessage", a), r = function r(e) {
          t.postMessage(s + e, "*");
        }), l.setImmediate = function (t) {
          "function" != typeof t && (t = new Function("" + t));

          for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) {
            e[n] = arguments[n + 1];
          }

          var i = {
            callback: t,
            args: e
          };
          return c[u] = i, r(u), u++;
        }, l.clearImmediate = d;
      }

      function d(t) {
        delete c[t];
      }

      function p(t) {
        if (h) setTimeout(p, 0, t);else {
          var e = c[t];

          if (e) {
            h = !0;

            try {
              !function (t) {
                var e = t.callback,
                    r = t.args;

                switch (r.length) {
                  case 0:
                    e();
                    break;

                  case 1:
                    e(r[0]);
                    break;

                  case 2:
                    e(r[0], r[1]);
                    break;

                  case 3:
                    e(r[0], r[1], r[2]);
                    break;

                  default:
                    e.apply(n, r);
                }
              }(e);
            } finally {
              d(t), h = !1;
            }
          }
        }
      }
    }("undefined" == typeof self ? void 0 === t ? this : t : self);
  }).call(this, n(7), n(11));
}, function (t, e, n) {
  (function (e) {
    function n(t) {
      try {
        if (!e.localStorage) return !1;
      } catch (t) {
        return !1;
      }

      var n = e.localStorage[t];
      return null != n && "true" === String(n).toLowerCase();
    }

    t.exports = function (t, e) {
      if (n("noDeprecation")) return t;
      var r = !1;
      return function () {
        if (!r) {
          if (n("throwDeprecation")) throw new Error(e);
          n("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0;
        }

        return t.apply(this, arguments);
      };
    };
  }).call(this, n(7));
}, function (t, e, n) {
  "use strict";

  t.exports = o;
  var r = n(28),
      i = n(10);

  function o(t) {
    if (!(this instanceof o)) return new o(t);
    r.call(this, t);
  }

  i.inherits = n(4), i.inherits(o, r), o.prototype._transform = function (t, e, n) {
    n(null, t);
  };
}, function (t, e, n) {
  t.exports = n(19);
}, function (t, e, n) {
  t.exports = n(8);
}, function (t, e, n) {
  t.exports = n(18).Transform;
}, function (t, e, n) {
  t.exports = n(18).PassThrough;
}, function (t, e, n) {
  "use strict";

  var r = n(16).Buffer,
      i = n(4),
      o = n(22),
      s = new Array(16),
      a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
      u = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
      c = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
      h = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
      f = [0, 1518500249, 1859775393, 2400959708, 2840853838],
      l = [1352829926, 1548603684, 1836072691, 2053994217, 0];

  function d() {
    o.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }

  function p(t, e) {
    return t << e | t >>> 32 - e;
  }

  function g(t, e, n, r, i, o, s, a) {
    return p(t + (e ^ n ^ r) + o + s | 0, a) + i | 0;
  }

  function y(t, e, n, r, i, o, s, a) {
    return p(t + (e & n | ~e & r) + o + s | 0, a) + i | 0;
  }

  function v(t, e, n, r, i, o, s, a) {
    return p(t + ((e | ~n) ^ r) + o + s | 0, a) + i | 0;
  }

  function w(t, e, n, r, i, o, s, a) {
    return p(t + (e & r | n & ~r) + o + s | 0, a) + i | 0;
  }

  function _(t, e, n, r, i, o, s, a) {
    return p(t + (e ^ (n | ~r)) + o + s | 0, a) + i | 0;
  }

  i(d, o), d.prototype._update = function () {
    for (var t = s, e = 0; e < 16; ++e) {
      t[e] = this._block.readInt32LE(4 * e);
    }

    for (var n = 0 | this._a, r = 0 | this._b, i = 0 | this._c, o = 0 | this._d, d = 0 | this._e, b = 0 | this._a, m = 0 | this._b, k = 0 | this._c, E = 0 | this._d, S = 0 | this._e, x = 0; x < 80; x += 1) {
      var A, T;
      x < 16 ? (A = g(n, r, i, o, d, t[a[x]], f[0], c[x]), T = _(b, m, k, E, S, t[u[x]], l[0], h[x])) : x < 32 ? (A = y(n, r, i, o, d, t[a[x]], f[1], c[x]), T = w(b, m, k, E, S, t[u[x]], l[1], h[x])) : x < 48 ? (A = v(n, r, i, o, d, t[a[x]], f[2], c[x]), T = v(b, m, k, E, S, t[u[x]], l[2], h[x])) : x < 64 ? (A = w(n, r, i, o, d, t[a[x]], f[3], c[x]), T = y(b, m, k, E, S, t[u[x]], l[3], h[x])) : (A = _(n, r, i, o, d, t[a[x]], f[4], c[x]), T = g(b, m, k, E, S, t[u[x]], l[4], h[x])), n = d, d = o, o = p(i, 10), i = r, r = A, b = S, S = E, E = p(k, 10), k = m, m = T;
    }

    var I = this._b + i + E | 0;
    this._b = this._c + o + S | 0, this._c = this._d + d + b | 0, this._d = this._e + n + m | 0, this._e = this._a + r + k | 0, this._a = I;
  }, d.prototype._digest = function () {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var t = r.alloc ? r.alloc(20) : new r(20);
    return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t;
  }, t.exports = d;
}, function (t, e, n) {
  (e = t.exports = function (t) {
    t = t.toLowerCase();
    var n = e[t];
    if (!n) throw new Error(t + " is not supported (we accept pull requests)");
    return new n();
  }).sha = n(57), e.sha1 = n(58), e.sha224 = n(59), e.sha256 = n(29), e.sha384 = n(60), e.sha512 = n(30);
}, function (t, e, n) {
  var r = n(4),
      i = n(9),
      o = n(6).Buffer,
      s = [1518500249, 1859775393, -1894007588, -899497514],
      a = new Array(80);

  function u() {
    this.init(), this._w = a, i.call(this, 64, 56);
  }

  function c(t) {
    return t << 30 | t >>> 2;
  }

  function h(t, e, n, r) {
    return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r;
  }

  r(u, i), u.prototype.init = function () {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  }, u.prototype._update = function (t) {
    for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, f = 0; f < 16; ++f) {
      n[f] = t.readInt32BE(4 * f);
    }

    for (; f < 80; ++f) {
      n[f] = n[f - 3] ^ n[f - 8] ^ n[f - 14] ^ n[f - 16];
    }

    for (var l = 0; l < 80; ++l) {
      var d = ~~(l / 20),
          p = 0 | ((e = r) << 5 | e >>> 27) + h(d, i, o, a) + u + n[l] + s[d];
      u = a, a = o, o = c(i), i = r, r = p;
    }

    this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0;
  }, u.prototype._hash = function () {
    var t = o.allocUnsafe(20);
    return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(4),
      i = n(9),
      o = n(6).Buffer,
      s = [1518500249, 1859775393, -1894007588, -899497514],
      a = new Array(80);

  function u() {
    this.init(), this._w = a, i.call(this, 64, 56);
  }

  function c(t) {
    return t << 5 | t >>> 27;
  }

  function h(t) {
    return t << 30 | t >>> 2;
  }

  function f(t, e, n, r) {
    return 0 === t ? e & n | ~e & r : 2 === t ? e & n | e & r | n & r : e ^ n ^ r;
  }

  r(u, i), u.prototype.init = function () {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  }, u.prototype._update = function (t) {
    for (var e, n = this._w, r = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, l = 0; l < 16; ++l) {
      n[l] = t.readInt32BE(4 * l);
    }

    for (; l < 80; ++l) {
      n[l] = (e = n[l - 3] ^ n[l - 8] ^ n[l - 14] ^ n[l - 16]) << 1 | e >>> 31;
    }

    for (var d = 0; d < 80; ++d) {
      var p = ~~(d / 20),
          g = c(r) + f(p, i, o, a) + u + n[d] + s[p] | 0;
      u = a, a = o, o = h(i), i = r, r = g;
    }

    this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0;
  }, u.prototype._hash = function () {
    var t = o.allocUnsafe(20);
    return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(4),
      i = n(29),
      o = n(9),
      s = n(6).Buffer,
      a = new Array(64);

  function u() {
    this.init(), this._w = a, o.call(this, 64, 56);
  }

  r(u, i), u.prototype.init = function () {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, u.prototype._hash = function () {
    var t = s.allocUnsafe(28);
    return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(4),
      i = n(30),
      o = n(9),
      s = n(6).Buffer,
      a = new Array(160);

  function u() {
    this.init(), this._w = a, o.call(this, 128, 112);
  }

  r(u, i), u.prototype.init = function () {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, u.prototype._hash = function () {
    var t = s.allocUnsafe(48);

    function e(e, n, r) {
      t.writeInt32BE(e, r), t.writeInt32BE(n, r + 4);
    }

    return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t;
  }, t.exports = u;
}, function (t, e, n) {
  var r = n(6).Buffer,
      i = n(24).Transform,
      o = n(20).StringDecoder;

  function s(t) {
    i.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this["final"] = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }

  n(4)(s, i), s.prototype.update = function (t, e, n) {
    "string" == typeof t && (t = r.from(t, e));

    var i = this._update(t);

    return this.hashMode ? this : (n && (i = this._toString(i, n)), i);
  }, s.prototype.setAutoPadding = function () {}, s.prototype.getAuthTag = function () {
    throw new Error("trying to get auth tag in unsupported state");
  }, s.prototype.setAuthTag = function () {
    throw new Error("trying to set auth tag in unsupported state");
  }, s.prototype.setAAD = function () {
    throw new Error("trying to set aad in unsupported state");
  }, s.prototype._transform = function (t, e, n) {
    var r;

    try {
      this.hashMode ? this._update(t) : this.push(this._update(t));
    } catch (t) {
      r = t;
    } finally {
      n(r);
    }
  }, s.prototype._flush = function (t) {
    var e;

    try {
      this.push(this.__final());
    } catch (t) {
      e = t;
    }

    t(e);
  }, s.prototype._finalOrDigest = function (t) {
    var e = this.__final() || r.alloc(0);
    return t && (e = this._toString(e, t, !0)), e;
  }, s.prototype._toString = function (t, e, n) {
    if (this._decoder || (this._decoder = new o(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");

    var r = this._decoder.write(t);

    return n && (r += this._decoder.end()), r;
  }, t.exports = s;
}, function (t, e) {
  t.exports = function (t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  };
}, function (t, e) {
  function n(e, r) {
    return t.exports = n = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    }, n(e, r);
  }

  t.exports = n;
}, function (t, e, n) {
  "use strict";

  n.r(e);
  var r = {};
  n.r(r), n.d(r, "BLOCKCHAIN_SUPPORT", function () {
    return d;
  }), n.d(r, "WALLET_SUPPORT", function () {
    return p;
  });

  var i,
      o = n(1),
      s = n.n(o),
      a = n(5),
      u = n.n(a),
      c = n(2),
      h = n.n(c),
      f = n(3),
      l = n.n(f),
      d = "blockchain_support",
      p = "wallet_support",
      g = new (function () {
    function t() {
      h()(this, t), this.plugins = [];
    }

    return l()(t, [{
      key: "loadPlugin",
      value: function value(t) {
        this.plugin(t.name) || this.plugins.push(t);
      }
    }, {
      key: "wallets",
      value: function value() {
        return this.plugins.filter(function (t) {
          return t.type === p;
        });
      }
    }, {
      key: "signatureProviders",
      value: function value() {
        return this.plugins.filter(function (t) {
          return t.type === d;
        });
      }
    }, {
      key: "supportedBlockchains",
      value: function value() {
        return this.signatureProviders().map(function () {
          return name;
        });
      }
    }, {
      key: "plugin",
      value: function value(t) {
        return this.plugins.find(function (e) {
          return e.name === t;
        });
      }
    }, {
      key: "endorsedNetworks",
      value: function () {
        var t = u()(s.a.mark(function t() {
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, Promise.all(this.signatureProviders().map(function () {
                    var t = u()(s.a.mark(function t(e) {
                      return s.a.wrap(function (t) {
                        for (;;) {
                          switch (t.prev = t.next) {
                            case 0:
                              return t.next = 2, e.getEndorsedNetwork();

                            case 2:
                              return t.abrupt("return", t.sent);

                            case 3:
                            case "end":
                              return t.stop();
                          }
                        }
                      }, t);
                    }));
                    return function () {
                      return t.apply(this, arguments);
                    };
                  }()));

                case 2:
                  return t.abrupt("return", t.sent);

                case 3:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }]), t;
  }())(),
      y = n(21),
      v = n.n(y),
      w = n(31),
      _ = n.n(w),
      b = {},
      m = function m() {
    return "undefined" == typeof window ? {
      localStorage: {
        setItem: function setItem(t, e) {
          return b[t] = e;
        },
        getItem: function getItem(t) {
          return b[t] || null;
        },
        removeItem: function removeItem(t) {
          return delete b[t];
        }
      }
    } : window;
  },
      k = function () {
    function t() {
      h()(this, t);
    }

    return l()(t, null, [{
      key: "setAppKey",
      value: function value(t) {
        m().localStorage.setItem("appkey", t);
      }
    }, {
      key: "getAppKey",
      value: function value() {
        return m().localStorage.getItem("appkey");
      }
    }, {
      key: "removeAppKey",
      value: function value() {
        return m().localStorage.removeItem("appkey");
      }
    }, {
      key: "setNonce",
      value: function value(t) {
        m().localStorage.setItem("nonce", t);
      }
    }, {
      key: "getNonce",
      value: function value() {
        return m().localStorage.getItem("nonce");
      }
    }, {
      key: "removeNonce",
      value: function value() {
        return m().localStorage.removeItem("nonce");
      }
    }]), t;
  }(),
      E = n(32),
      S = n.n(E),
      x = n(33),
      A = n.n(x),
      T = n(34),
      I = n.n(T),
      R = null,
      O = !1,
      P = !1,
      B = [],
      L = function L(t) {
    return A()("sha256").update(t).digest("hex");
  },
      C = function C() {
    var t = new Uint8Array(24);
    return S()(t), t.join("");
  },
      M = function M() {
    var t;
    return "www." === (t = "undefined" == typeof location ? i : location.hasOwnProperty("hostname") && location.hostname.length && "localhost" !== location.hostname ? location.hostname : i).substr(0, 4) && (t = t.replace("www.", "")), t;
  },
      j = k.getAppKey();

  j || (j = "appkey:" + C());

  var N,
      U = function U() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
        e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
    null === t && null === e ? R.send("40/Cocos-BCX") : R.send("42/Cocos-BCX," + JSON.stringify([t, e]));
  },
      F = null,
      D = function D() {
    var t = !!(0 < arguments.length && void 0 !== arguments[0]) && arguments[0];
    return new Promise(function (e, n) {
      F = {
        resolve: e,
        reject: n
      }, U("pair", {
        data: {
          appkey: j,
          origin: M(),
          passthrough: t
        },
        plugin: i
      });
    });
  },
      q = {},
      W = function () {
    function t() {
      h()(this, t);
    }

    return l()(t, null, [{
      key: "init",
      value: function value(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 6e5;
        i = t, this.timeout = e;
      }
    }, {
      key: "getOrigin",
      value: function value() {
        return M();
      }
    }, {
      key: "addEventHandler",
      value: function value(t, e) {
        e || (e = "app"), q[e] = t;
      }
    }, {
      key: "removeEventHandler",
      value: function value(t) {
        t || (t = "app"), delete q[t];
      }
    }, {
      key: "link",
      value: function value() {
        var t = this;
        return Promise.race([new Promise(function (e) {
          return setTimeout(function () {
            O || (e(!1), R && (R.disconnect(), R = null));
          }, t.timeout);
        }), new Promise(function () {
          var t = u()(s.a.mark(function t(e) {
            var n, r;
            return s.a.wrap(function (t) {
              for (;;) {
                switch (t.prev = t.next) {
                  case 0:
                    return n = function n() {
                      R.onmessage = function (i) {
                        if (-1 === i.data.indexOf("42/Cocos-BCX")) return !1;

                        var o = JSON.parse(i.data.replace("42/Cocos-BCX,", "")),
                            s = _()(o, 2),
                            a = s[0],
                            u = s[1];

                        return "paired" === a ? t(u) : "rekey" === a ? e() : "api" === a ? n(u) : "event" === a ? r(u) : void 0;
                      };

                      var t = function t(_t) {
                        if (P = _t) {
                          var e = k.getAppKey(),
                              n = -1 < j.indexOf("appkey:") ? L(j) : j;
                          e && e === n || (k.setAppKey(n), j = k.getAppKey());
                        }

                        F.resolve(_t);
                      },
                          e = function e() {
                        j = "appkey:" + C(), U("rekeyed", {
                          data: {
                            appkey: j,
                            origin: M()
                          },
                          plugin: i
                        });
                      },
                          n = function n(t) {
                        if (t) {
                          var e = B.find(function (e) {
                            return e.id === t.id;
                          });
                          if (e) B = B.filter(function (e) {
                            return e.id !== t.id;
                          }), "object" === v()(t.result) && null !== t.result && t.result.hasOwnProperty("isError") ? e.reject(t.result) : e.resolve(t.result);
                        }
                      },
                          r = function r(t) {
                        var e = t.event,
                            n = t.payload;
                        Object.keys(q).length && Object.keys(q).map(function (t) {
                          q[t](e, n);
                        });
                      };
                    }, r = function r() {
                      var t,
                          r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
                      r || (t = new Promise(function (t) {
                        return r = t;
                      }));
                      var i = "".concat("ws://").concat("127.0.0.1:50005").concat("/socket.io/?EIO=3&transport=websocket"),
                          o = new I.a(i);
                      return o.onerror = function () {
                        e(!1), r(!1);
                      }, o.onopen = function () {
                        R = o, U(), clearTimeout(null), O = !0, D(!0).then(function () {
                          e(!0), r(!0);
                        }), n();
                      }, t;
                    }, t.next = 4, r();

                  case 4:
                  case "end":
                    return t.stop();
                }
              }
            }, t);
          }));
          return function () {
            return t.apply(this, arguments);
          };
        }())]);
      }
    }, {
      key: "isConnected",
      value: function value() {
        return O;
      }
    }, {
      key: "isPaired",
      value: function value() {
        return P;
      }
    }, {
      key: "disconnect",
      value: function value() {
        return R && R.close(), !0;
      }
    }, {
      key: "removeAppKeys",
      value: function value() {
        k.removeAppKey(), k.removeNonce();
      }
    }, {
      key: "sendApiRequest",
      value: function value(t) {
        return new Promise(function (e, n) {
          return "identityFromPermissions" !== t.type || P ? void D().then(function () {
            if (!P) return n({
              code: "not_paired",
              message: "The user did not allow this app to connect to their Cocos"
            });
            t.id = C(), t.appkey = j, t.nonce = k.getNonce() || 0;
            var r = C();
            t.nextNonce = L(r), k.setNonce(r), t.hasOwnProperty("payload") && !t.payload.hasOwnProperty("origin") && (t.payload.origin = M()), B.push(Object.assign(t, {
              resolve: e,
              reject: n
            })), U("api", {
              data: t,
              plugin: i
            });
          }) : e(!1);
        });
      }
    }]), t;
  }(),
      Y = function () {
    function t() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
          n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
      h()(this, t), this.name = e, this.type = n;
    }

    return l()(t, [{
      key: "isSignatureProvider",
      value: function value() {
        return this.type === d;
      }
    }, {
      key: "isValid",
      value: function value() {
        return Object.keys(r).map(function (t) {
          return r[t];
        }).includes(this.type);
      }
    }], [{
      key: "placeholder",
      value: function value() {
        return new t();
      }
    }, {
      key: "fromJson",
      value: function value(e) {
        return Object.assign(t.placeholder(), e);
      }
    }]), t;
  }(),
      H = {
    EOS: "eos",
    ETH: "eth",
    TRX: "trx",
    COCOSBCX: "cocosBcx"
  },
      z = (Object.keys(H).map(function (t) {
    return {
      key: t,
      value: H[t]
    };
  }), function () {
    function t() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : H.EOS,
          n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
          i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
          o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : null;
      h()(this, t), this.blockchain = e, this.contract = n, this.symbol = r, this.name = i || r, this.decimals = o;
    }

    return l()(t, null, [{
      key: "placeholder",
      value: function value() {
        return new t();
      }
    }, {
      key: "fromJson",
      value: function value(t) {
        return Object.assign(this.placeholder(), t);
      }
    }]), t;
  }()),
      K = function () {
    function t() {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
          n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "https",
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "",
          i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0,
          o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : H.EOS,
          s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "";
      h()(this, t), this.name = e, this.protocol = n, this.host = r, this.port = i, this.blockchain = o, this.chainId = s.toString(), this.token = null;
    }

    return l()(t, [{
      key: "fullhost",
      value: function value() {
        return "".concat(this.protocol, "://").concat(this.host).concat(this.port ? ":" : "").concat(this.port);
      }
    }, {
      key: "unique",
      value: function value() {
        return ("".concat(this.blockchain, ":") + (this.chainId.length ? "chain:".concat(this.chainId) : "".concat(this.host, ":").concat(this.port))).toLowerCase();
      }
    }], [{
      key: "placeholder",
      value: function value() {
        return new t();
      }
    }, {
      key: "fromJson",
      value: function value(e) {
        var n = Object.assign(t.placeholder(), e);
        return n.chainId = n.chainId ? n.chainId.toString() : "", n.token = e.hasOwnProperty("token") && e.token ? z.fromJson(e.token) : null, n;
      }
    }]), t;
  }(),
      V = n(0),
      J = n.n(V),
      X = {
    disconnect: "disconnect",
    isConnected: "isConnected",
    isPaired: "isPaired",
    addEventHandler: "addEventHandler",
    removeEventHandler: "removeEventHandler",
    listen: "listen",
    getAccountInfo: "getAccountInfo",
    getVersion: "getVersion",
    getIdentity: "getIdentity",
    getIdentityFromPermissions: "getIdentityFromPermissions",
    forgetIdentity: "forgetIdentity",
    updateIdentity: "updateIdentity",
    authenticate: "authenticate",
    getArbitrarySignature: "getArbitrarySignature",
    getPublicKey: "getPublicKey",
    linkAccount: "linkAccount",
    hasAccountFor: "hasAccountFor",
    suggestNetwork: "suggestNetwork",
    requestTransfer: "requestTransfer",
    requestSignature: "requestSignature",
    createTransaction: "createTransaction",
    addToken: "addToken",
    transferAsset: "transferAsset",
    callContractFunction: "callContractFunction",
    creatNHAssetOrder: "creatNHAssetOrder",
    transferNHAsset: "transferNHAsset",
    fillNHAssetOrder: "fillNHAssetOrder",
    cancelNHAssetOrder: "cancelNHAssetOrder"
  },
      G = (N = {}, J()(N, X.getIdentity, "login"), J()(N, X.forgetIdentity, "logout"), J()(N, X.getIdentityFromPermissions, "checkLogin"), N),
      $ = function () {
    function t(e, n, r) {
      h()(this, t);

      var i = function i(t) {
        return function () {
          throw new Error("".concat(e, " does not support the ").concat(t, " method."));
        };
      };

      Object.keys(X).map(function (t) {
        return function (t, e) {
          void 0 === r[e] && (r[e] = t || i(e)), G[e] && void 0 === r[G[e]] && (r[G[e]] = r[e] ? r[e] : i(e));
        }(n[t], t);
      });
    }

    return l()(t, null, [{
      key: "bindBasics",
      value: function value(t) {
        t.account = function () {
          return t.account_name ? t.account_name : void 0;
        };
      }
    }]), t;
  }(),
      Q = n(13),
      Z = n.n(Q),
      tt = n(14),
      et = n.n(tt),
      nt = n(15),
      rt = n.n(nt),
      it = function (t) {
    function e(t, n) {
      var r;
      return h()(this, e), (r = Z()(this, et()(e).call(this, H.EOS, p))).name = "CocosSockets", r.context = t, r.holderFns = n, r;
    }

    return rt()(e, t), l()(e, [{
      key: "connect",
      value: function value(t) {
        var e = this,
            n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        return new Promise(function (r) {
          if (!t || !t.length) throw new Error("You must specify a name for this connection");
          n = Object.assign({
            initTimeout: 1e4,
            linkTimeout: 3e4
          }, n), W.init(t, n.linkTimeout), W.link().then(function () {
            var t = u()(s.a.mark(function t(n) {
              return s.a.wrap(function (t) {
                for (;;) {
                  switch (t.prev = t.next) {
                    case 0:
                      if (n) {
                        t.next = 2;
                        break;
                      }

                      return t.abrupt("return", !1);

                    case 2:
                      return e.holderFns.get().isExtension = !1, e.holderFns.get().wallet || (e.holderFns.get().wallet = e.name), t.abrupt("return", r(!0));

                    case 5:
                    case "end":
                      return t.stop();
                  }
                }
              }, t);
            }));
            return function () {
              return t.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: "runAfterInterfacing",
      value: function () {
        var t = u()(s.a.mark(function t() {
          var e = this;
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return this.holderFns.get().addEventHandler(function (t, n) {
                    return e.eventHandler(t, n);
                  }, "internal"), t.next = 3, this.holderFns.get().getIdentityFromPermissions();

                case 3:
                  return this.holderFns.get().account_name = t.sent, t.abrupt("return", !0);

                case 5:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }, {
      key: "methods",
      value: function value() {
        var t,
            e = this,
            n = function n(t, _n) {
          return (t || _n) && (e.holderFns.get().account_name = t), _n || t;
        };

        return t = {}, J()(t, X.disconnect, function () {
          return W.disconnect();
        }), J()(t, X.isConnected, function () {
          return W.isConnected();
        }), J()(t, X.isPaired, function () {
          return W.isPaired();
        }), J()(t, X.addEventHandler, function (t) {
          var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          return W.addEventHandler(t, e);
        }), J()(t, X.removeEventHandler, function () {
          var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
          return W.removeEventHandler(t);
        }), J()(t, X.listen, function (t) {
          return W.addEventHandler(t);
        }), J()(t, X.getVersion, function () {
          return W.sendApiRequest({
            type: "getVersion",
            payload: {}
          });
        }), J()(t, X.getIdentity, function (t) {
          return W.sendApiRequest({
            type: "getOrRequestIdentity",
            payload: {
              fields: t || {
                accounts: [e.holderFns.get().network]
              }
            }
          }).then(n);
        }), J()(t, X.getIdentityFromPermissions, function () {
          return W.sendApiRequest({
            type: "identityFromPermissions",
            payload: {}
          }).then(n);
        }), J()(t, X.lockAccount, function () {
          return W.sendApiRequest({
            type: "lockAccount",
            payload: {}
          }).then(n);
        }), J()(t, X.forgetIdentity, function () {
          return W.sendApiRequest({
            type: "forgetIdentity",
            payload: {}
          }).then(function (t) {
            return n(null, t);
          });
        }), J()(t, X.updateIdentity, function (t) {
          var e = t.name,
              r = t.kyc;
          return W.sendApiRequest({
            type: "updateIdentity",
            payload: {
              name: e,
              kyc: r
            }
          }).then(function (t) {
            return t ? n(t) : null;
          });
        }), J()(t, X.authenticate, function (t) {
          var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
              n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
          return W.sendApiRequest({
            type: "authenticate",
            payload: {
              nonce: t,
              data: e,
              publicKey: n
            }
          });
        }), J()(t, X.getArbitrarySignature, function (t, e) {
          return W.sendApiRequest({
            type: "requestArbitrarySignature",
            payload: {
              publicKey: t,
              data: e
            }
          });
        }), J()(t, X.getPublicKey, function (t) {
          return W.sendApiRequest({
            type: "getPublicKey",
            payload: {
              blockchain: t
            }
          });
        }), J()(t, X.linkAccount, function (t, n) {
          return W.sendApiRequest({
            type: "linkAccount",
            payload: {
              account: t,
              network: n || e.holderFns.get().network
            }
          });
        }), J()(t, X.hasAccountFor, function (t) {
          return W.sendApiRequest({
            type: "hasAccountFor",
            payload: {
              network: t || e.holderFns.get().network
            }
          });
        }), J()(t, X.suggestNetwork, function (t) {
          return W.sendApiRequest({
            type: "requestAddNetwork",
            payload: {
              network: t || e.holderFns.get().network
            }
          });
        }), J()(t, X.requestTransfer, function (t, n, r) {
          var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
          return W.sendApiRequest({
            type: "requestTransfer",
            payload: {
              network: t || e.holderFns.get().network,
              to: n,
              amount: r,
              options: i
            }
          });
        }), J()(t, X.callContractFunction, function (t, n, r, i, o, s) {
          return W.sendApiRequest({
            type: "callContractFunction",
            payload: {
              network: t || e.holderFns.get().network,
              nameOrId: n,
              functionName: r,
              valueList: i,
              runtime: o,
              onlyGetFee: s
            }
          });
        }), J()(t, X.creatNHAssetOrder, function (t, n, r, i, o, s, a, u) {
          return W.sendApiRequest({
            type: "creatNHAssetOrder",
            payload: {
              network: t || e.holderFns.get().network,
              otcAccount: n,
              orderFee: r,
              NHAssetId: i,
              price: o,
              priceAssetId: s,
              expiration: a,
              memo: u
            }
          });
        }), J()(t, X.fillNHAssetOrder, function (t, n) {
          return W.sendApiRequest({
            type: "fillNHAssetOrder",
            payload: {
              network: t || e.holderFns.get().network,
              orderId: n
            }
          });
        }), J()(t, X.cancelNHAssetOrder, function (t, n) {
          return W.sendApiRequest({
            type: "cancelNHAssetOrder",
            payload: {
              network: t || e.holderFns.get().network,
              orderId: n
            }
          });
        }), J()(t, X.transferNHAsset, function (t, n, r) {
          return W.sendApiRequest({
            type: "transferNHAsset",
            payload: {
              network: t || e.holderFns.get().network,
              toAccount: n,
              NHAssetIds: r
            }
          });
        }), J()(t, X.getAccountInfo, function (t) {
          return W.sendApiRequest({
            type: "getAccountInfo",
            payload: {
              network: t || e.holderFns.get().network
            }
          });
        }), J()(t, X.requestSignature, function (t) {
          return W.sendApiRequest({
            type: "requestSignature",
            payload: t
          });
        }), J()(t, X.createTransaction, function (t, n, r, i) {
          return W.sendApiRequest({
            type: "createTransaction",
            payload: {
              blockchain: t,
              actions: n,
              account: r,
              network: i || e.holderFns.get().network
            }
          });
        }), J()(t, X.addToken, function (t, n) {
          return W.sendApiRequest({
            type: "addToken",
            payload: {
              token: t,
              network: n || e.holderFns.get().network
            }
          });
        }), t;
      }
    }, {
      key: "eventHandler",
      value: function () {
        var t = u()(s.a.mark(function t(e) {
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  t.t0 = e, t.next = t.t0 === ut.Disconnected ? 3 : t.t0 === ut.LoggedOut ? 5 : 9;
                  break;

                case 3:
                  return this.holderFns.get().account_name = null, t.abrupt("break", 9);

                case 5:
                  return t.next = 7, this.holderFns.get().getIdentityFromPermissions();

                case 7:
                  return this.holderFns.get().account_name = t.sent, t.abrupt("break", 9);

                case 9:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }]), e;
  }(Y),
      ot = !1,
      st = function () {
    var t = u()(s.a.mark(function t() {
      var e,
          n,
          r = arguments;
      return s.a.wrap(function (t) {
        for (;;) {
          switch (t.prev = t.next) {
            case 0:
              return e = 0 < r.length && void 0 !== r[0] ? r[0] : null, n = 1 < r.length && void 0 !== r[1] ? r[1] : 0, t.abrupt("return", new Promise(function (t) {
                return e || (e = t), ot ? e(!0) : 5 < n ? e(!1) : void setTimeout(function () {
                  return st(e, n + 1);
                }, 100);
              }));

            case 3:
            case "end":
              return t.stop();
          }
        }
      }, t);
    }));
    return function () {
      return t.apply(this, arguments);
    };
  }(),
      at = function (t) {
    function e(t, n) {
      var r;
      return h()(this, e), (r = Z()(this, et()(e).call(this, H.COCOSBCX, p))).name = "CocosExtension", r.context = t, r.holderFns = n, r;
    }

    return rt()(e, t), l()(e, [{
      key: "connect",
      value: function value() {
        var t = this;
        return "undefined" != typeof window && "undefined" != typeof document && (void 0 !== window.BcxWeb && void 0 !== window.BcxWeb.BCX || void 0 !== window.BcxWeb && void 0 !== window.BcxWeb.getAccountInfo() ? ot = !0 : document.addEventListener("cocosLoaded", function () {
          return ot = !0;
        })), new Promise(function () {
          var e = u()(s.a.mark(function e(n) {
            return s.a.wrap(function (e) {
              for (;;) {
                switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, st();

                  case 2:
                    e.sent && (!t.holderFns.get().wallet && (t.holderFns.get().wallet = t.name), n(!0));

                  case 4:
                  case "end":
                    return e.stop();
                }
              }
            }, e);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }());
      }
    }, {
      key: "runBeforeInterfacing",
      value: function () {
        var t = u()(s.a.mark(function t() {
          var e;
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return this.holderFns.get().wallet === this.name && (window.BcxWeb.wallet = this.name, e = this.holderFns.get(), void 0 === window.BcxWeb ? void 0 !== window.BcxWeb && void 0 !== window.BcxWeb.getAccountInfo() && (e.cocosBcx = function () {
                    return window.BcxWeb;
                  }) : e.cocosBcx = function () {
                    return window.BcxWeb;
                  }), this.holderFns.set(e), this.context = this.holderFns.get(), t.abrupt("return", !0);

                case 4:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }, {
      key: "runAfterInterfacing",
      value: function () {
        var t = u()(s.a.mark(function t() {
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return this.context.isExtension = !0, t.abrupt("return", !0);

                case 2:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }, {
      key: "methods",
      value: function value() {
        return J()({}, X.getIdentity, function () {
          console.log("getid");
        });
      }
    }]), e;
  }(Y);

  n.d(e, "EVENTS", function () {
    return ut;
  }), n.d(e, "Plugin", function () {
    return Y;
  }), n.d(e, "PluginTypes", function () {
    return r;
  }), n.d(e, "Blockchains", function () {
    return H;
  }), n.d(e, "Network", function () {
    return K;
  }), n.d(e, "SocketService", function () {
    return W;
  }), n.d(e, "WalletInterface", function () {
    return $;
  }), n.d(e, "WALLET_METHODS", function () {
    return X;
  });

  var ut = {
    Disconnected: "dced",
    LoggedOut: "logout"
  },
      ct = [],
      ht = {},
      ft = function () {
    function t() {
      h()(this, t), this.account_name = null, this.network = null, g.loadPlugin(new it(this, ht)), g.loadPlugin(new at(this, ht));
    }

    return l()(t, [{
      key: "loadPlugin",
      value: function value(t) {
        if (!t.isValid()) throw new Error("".concat(t.name, " doesn't seem to be a valid CocosJS plugin."));
        g.loadPlugin(t), t.type === d && (this[t.name] = t.signatureProvider(function () {
          if (!ht.get().account_name) throw new Error("No Identity");
        }, function () {
          return ht.get().account_name;
        }), this[t.name + "Hook"] = t.hookProvider, ct.push(t.setSocketService)), t.type === p && t.init(this, ht, ct);
      }
    }, {
      key: "connect",
      value: function () {
        var t = u()(s.a.mark(function t(e, n) {
          var r;
          return s.a.wrap(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return n || (n = {}), this.network = n.hasOwnProperty("network") ? n.network : null, r = g.wallets(), t.next = 5, Promise.race(r.map(function (t) {
                    return t.connect(e, n).then(u()(s.a.mark(function e() {
                      return s.a.wrap(function (e) {
                        for (;;) {
                          switch (e.prev = e.next) {
                            case 0:
                              if ("function" != typeof t.runBeforeInterfacing) {
                                e.next = 3;
                                break;
                              }

                              return e.next = 3, t.runBeforeInterfacing();

                            case 3:
                              if (new $(t.name, t.methods(), ht.get()), "function" != typeof t.runAfterInterfacing) {
                                e.next = 7;
                                break;
                              }

                              return e.next = 7, t.runAfterInterfacing();

                            case 7:
                              return $.bindBasics(ht.get()), e.abrupt("return", !0);

                            case 9:
                            case "end":
                              return e.stop();
                          }
                        }
                      }, e);
                    })));
                  }).concat(new Promise(function (t) {
                    return setTimeout(function () {
                      return t(!1);
                    }, n.initTimeout || 5e3);
                  })));

                case 5:
                  return t.abrupt("return", t.sent);

                case 6:
                case "end":
                  return t.stop();
              }
            }
          }, t, this);
        }));
        return function () {
          return t.apply(this, arguments);
        };
      }()
    }]), t;
  }(),
      lt = new Proxy(new (function () {
    function t(e) {
      h()(this, t), this.cocos = e;
    }

    return l()(t, [{
      key: "plugins",
      value: function value() {
        var t = this;

        if (!this.cocos.isExtension) {
          for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) {
            n[r] = arguments[r];
          }

          n.map(function (e) {
            return t.cocos.loadPlugin(e);
          });
        }
      }
    }, {
      key: "connect",
      value: function value() {
        var t;
        return (t = this.cocos).connect.apply(t, arguments);
      }
    }, {
      key: "catchAll",
      value: function value() {}
    }]), t;
  }())(new ft()), {
    get: function get(t, e) {
      return void 0 === t[e] ? t.cocos[e] : t[e];
    }
  });

  ht.set = function (t) {
    return lt.cocos = t;
  }, ht.get = function () {
    return lt.cocos;
  }, "undefined" != typeof window && (window.Cocosjs = lt), lt.Plugin = Y, lt.PluginTypes = r, lt.Blockchains = H, lt.Network = K, lt.Token = z, lt.SocketService = W, lt.EVENTS = ut, lt.WalletInterface = $, lt.WALLET_METHODS = X, window.Cocosjs = lt;
  e["default"] = Cocosjs;
}]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU0RLXFxiY3hcXGNvcmUubWluLmpzIl0sIm5hbWVzIjpbInQiLCJlIiwibiIsInIiLCJleHBvcnRzIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJkIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJfX2VzTW9kdWxlIiwiY3JlYXRlIiwiYmluZCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIlR5cGVFcnJvciIsImxlbmd0aCIsImtleSIsInN1cGVyXyIsImNvbnN0cnVjdG9yIiwiYSIsInUiLCJkb25lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJCdWZmZXIiLCJmcm9tIiwiYWxsb2MiLCJhbGxvY1Vuc2FmZSIsImFsbG9jVW5zYWZlU2xvdyIsImZpbGwiLCJTbG93QnVmZmVyIiwiRnVuY3Rpb24iLCJ3aW5kb3ciLCJrZXlzIiwicHVzaCIsImYiLCJpbmhlcml0cyIsImgiLCJyZWFkYWJsZSIsImFsbG93SGFsZk9wZW4iLCJvbmNlIiwiX3dyaXRhYmxlU3RhdGUiLCJlbmRlZCIsIm5leHRUaWNrIiwiZW5kIiwiaGlnaFdhdGVyTWFyayIsIl9yZWFkYWJsZVN0YXRlIiwiZGVzdHJveWVkIiwic2V0IiwiX2Rlc3Ryb3kiLCJfYmxvY2siLCJfZmluYWxTaXplIiwiX2Jsb2NrU2l6ZSIsIl9sZW4iLCJ1cGRhdGUiLCJNYXRoIiwibWluIiwiX3VwZGF0ZSIsImRpZ2VzdCIsIndyaXRlVUludDMyQkUiLCJfaGFzaCIsInRvU3RyaW5nIiwiRXJyb3IiLCJpc0FycmF5IiwiQXJyYXkiLCJpc0Jvb2xlYW4iLCJpc051bGwiLCJpc051bGxPclVuZGVmaW5lZCIsImlzTnVtYmVyIiwiaXNTdHJpbmciLCJpc1N5bWJvbCIsImlzVW5kZWZpbmVkIiwiaXNSZWdFeHAiLCJpc09iamVjdCIsImlzRGF0ZSIsImlzRXJyb3IiLCJpc0Z1bmN0aW9uIiwiaXNQcmltaXRpdmUiLCJpc0J1ZmZlciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjb25jYXQiLCJydW4iLCJmdW4iLCJhcnJheSIsImciLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwib24iLCJhZGRMaXN0ZW5lciIsIm9mZiIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW1pdCIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJiaW5kaW5nIiwiY3dkIiwiY2hkaXIiLCJ1bWFzayIsImluZGV4T2YiLCJzZXRQcm90b3R5cGVPZiIsImdldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiVFlQRURfQVJSQVlfU1VQUE9SVCIsIlJhbmdlRXJyb3IiLCJVaW50OEFycmF5IiwiQXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiaXNFbmNvZGluZyIsIndyaXRlIiwic2xpY2UiLCJjb3B5IiwiYnVmZmVyIiwidHlwZSIsImRhdGEiLCJpc1ZpZXciLCJEIiwicSIsInRvTG93ZXJDYXNlIiwieSIsImlzTmFOIiwidiIsImxhc3RJbmRleE9mIiwiU3RyaW5nIiwicmVhZFVJbnQxNkJFIiwidyIsIk51bWJlciIsInBhcnNlSW50Iiwic3Vic3RyIiwiXyIsIlciLCJiIiwiY2hhckNvZGVBdCIsImsiLCJFIiwiUyIsImZyb21CeXRlQXJyYXkiLCJ4IiwiQSIsImZyb21DaGFyQ29kZSIsIklOU1BFQ1RfTUFYX0JZVEVTIiwiZm9vIiwic3ViYXJyYXkiLCJrTWF4TGVuZ3RoIiwicG9vbFNpemUiLCJfYXVnbWVudCIsInNwZWNpZXMiLCJfaXNCdWZmZXIiLCJjb21wYXJlIiwic3dhcDE2Iiwic3dhcDMyIiwic3dhcDY0IiwiUiIsIlQiLCJJIiwiTyIsImVxdWFscyIsImluc3BlY3QiLCJtYXRjaCIsImpvaW4iLCJpbmNsdWRlcyIsImlzRmluaXRlIiwidG9KU09OIiwiX2FyciIsIkYiLCJQIiwiQiIsIkwiLCJDIiwiTSIsImoiLCJOIiwicmVhZFVJbnRMRSIsInJlYWRVSW50QkUiLCJyZWFkVUludDgiLCJyZWFkVUludDE2TEUiLCJyZWFkVUludDMyTEUiLCJyZWFkVUludDMyQkUiLCJyZWFkSW50TEUiLCJwb3ciLCJyZWFkSW50QkUiLCJyZWFkSW50OCIsInJlYWRJbnQxNkxFIiwicmVhZEludDE2QkUiLCJyZWFkSW50MzJMRSIsInJlYWRJbnQzMkJFIiwicmVhZEZsb2F0TEUiLCJyZWFkIiwicmVhZEZsb2F0QkUiLCJyZWFkRG91YmxlTEUiLCJyZWFkRG91YmxlQkUiLCJ3cml0ZVVJbnRMRSIsIndyaXRlVUludEJFIiwid3JpdGVVSW50OCIsImZsb29yIiwid3JpdGVVSW50MTZMRSIsIndyaXRlVUludDE2QkUiLCJ3cml0ZVVJbnQzMkxFIiwid3JpdGVJbnRMRSIsIndyaXRlSW50QkUiLCJ3cml0ZUludDgiLCJ3cml0ZUludDE2TEUiLCJ3cml0ZUludDE2QkUiLCJ3cml0ZUludDMyTEUiLCJ3cml0ZUludDMyQkUiLCJ3cml0ZUZsb2F0TEUiLCJ3cml0ZUZsb2F0QkUiLCJ3cml0ZURvdWJsZUxFIiwid3JpdGVEb3VibGVCRSIsIlUiLCJ0b0J5dGVBcnJheSIsInRyaW0iLCJyZXBsYWNlIiwiUmVmbGVjdCIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiaW5pdCIsIkV2ZW50RW1pdHRlciIsIl9ldmVudHMiLCJfZXZlbnRzQ291bnQiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsIm5ld0xpc3RlbmVyIiwibGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwiZmlyZWQiLCJ3cmFwRm4iLCJ0YXJnZXQiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlcnJvciIsIm1lc3NhZ2UiLCJjb250ZXh0Iiwic2hpZnQiLCJwb3AiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsIlN0cmVhbSIsIlJlYWRhYmxlIiwiV3JpdGFibGUiLCJEdXBsZXgiLCJUcmFuc2Zvcm0iLCJQYXNzVGhyb3VnaCIsIm5leHQiLCJlbnRyeSIsImZpbmlzaCIsImNhbGxiYWNrIiwicGVuZGluZ2NiIiwiY29ya2VkUmVxdWVzdHNGcmVlIiwiV3JpdGFibGVTdGF0ZSIsImRlcHJlY2F0ZSIsIm9iamVjdE1vZGUiLCJ3cml0YWJsZU9iamVjdE1vZGUiLCJ3cml0YWJsZUhpZ2hXYXRlck1hcmsiLCJmaW5hbENhbGxlZCIsIm5lZWREcmFpbiIsImVuZGluZyIsImZpbmlzaGVkIiwiZGVjb2RlU3RyaW5ncyIsImRlZmF1bHRFbmNvZGluZyIsIndyaXRpbmciLCJjb3JrZWQiLCJzeW5jIiwiYnVmZmVyUHJvY2Vzc2luZyIsIm9ud3JpdGUiLCJ3cml0ZWNiIiwid3JpdGVsZW4iLCJlcnJvckVtaXR0ZWQiLCJidWZmZXJlZFJlcXVlc3QiLCJsYXN0QnVmZmVyZWRSZXF1ZXN0IiwicHJlZmluaXNoZWQiLCJidWZmZXJlZFJlcXVlc3RDb3VudCIsIl93cml0ZSIsIndyaXRldiIsIl93cml0ZXYiLCJkZXN0cm95IiwiX2ZpbmFsIiwiaXNCdWYiLCJhbGxCdWZmZXJzIiwiY2h1bmsiLCJlbmNvZGluZyIsImdldEJ1ZmZlciIsImhhc0luc3RhbmNlIiwicGlwZSIsImNvcmsiLCJ1bmNvcmsiLCJzZXREZWZhdWx0RW5jb2RpbmciLCJfdW5kZXN0cm95IiwidW5kZXN0cm95Iiwic2V0SW1tZWRpYXRlIiwidGV4dCIsImZpbGxMYXN0IiwibGFzdE5lZWQiLCJsYXN0VG90YWwiLCJsYXN0Q2hhciIsIlN0cmluZ0RlY29kZXIiLCJpdGVyYXRvciIsIl9ibG9ja09mZnNldCIsIl9sZW5ndGgiLCJfZmluYWxpemVkIiwiX3RyYW5zZm9ybSIsIl9mbHVzaCIsIl9kaWdlc3QiLCJwYXVzZSIsInJlc3VtZSIsIl9pc1N0ZGlvIiwiUmVhZGFibGVTdGF0ZSIsImRlYnVnbG9nIiwicmVhZGFibGVPYmplY3RNb2RlIiwicmVhZGFibGVIaWdoV2F0ZXJNYXJrIiwicGlwZXMiLCJwaXBlc0NvdW50IiwiZmxvd2luZyIsImVuZEVtaXR0ZWQiLCJyZWFkaW5nIiwibmVlZFJlYWRhYmxlIiwiZW1pdHRlZFJlYWRhYmxlIiwicmVhZGFibGVMaXN0ZW5pbmciLCJyZXN1bWVTY2hlZHVsZWQiLCJhd2FpdERyYWluIiwicmVhZGluZ01vcmUiLCJkZWNvZGVyIiwiX3JlYWQiLCJpc1BhdXNlZCIsInNldEVuY29kaW5nIiwiaGVhZCIsImNsZWFyIiwidGFpbCIsInN0ZG91dCIsInN0ZGVyciIsImhhc1VucGlwZWQiLCJ1bnBpcGUiLCJzcGxpY2UiLCJ3cmFwIiwiX2Zyb21MaXN0IiwiX3RyYW5zZm9ybVN0YXRlIiwidHJhbnNmb3JtaW5nIiwid3JpdGVjaHVuayIsImFmdGVyVHJhbnNmb3JtIiwibmVlZFRyYW5zZm9ybSIsIndyaXRlZW5jb2RpbmciLCJ0cmFuc2Zvcm0iLCJmbHVzaCIsIl93IiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsIl9mIiwiX2ciLCJfaCIsIl9haCIsIl9iaCIsIl9jaCIsIl9kaCIsIl9laCIsIl9maCIsIl9naCIsIl9oaCIsIl9hbCIsIl9ibCIsIl9jbCIsIl9kbCIsIl9lbCIsIl9mbCIsIl9nbCIsIl9obCIsIlkiLCJIIiwieiIsIksiLCJWIiwiSiIsIlgiLCJHIiwiJCIsIlEiLCJaIiwidHQiLCJldCIsImNyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsIm1zQ3J5cHRvIiwicmFuZG9tQnl0ZXMiLCJjb2RlIiwiV2ViU29ja2V0IiwiTW96V2ViU29ja2V0Iiwic2VsZiIsImFzeW5jSXRlcmF0b3IiLCJfaW52b2tlIiwibWV0aG9kIiwiYXJnIiwiZGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsImZvckVhY2giLCJfX2F3YWl0IiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJtYXJrIiwiYXdyYXAiLCJBc3luY0l0ZXJhdG9yIiwiYXN5bmMiLCJyZXZlcnNlIiwidmFsdWVzIiwicHJldiIsImNoYXJBdCIsInN0b3AiLCJydmFsIiwiY29tcGxldGUiLCJkZWxlZ2F0ZVlpZWxkIiwicmVnZW5lcmF0b3JSdW50aW1lIiwiTmFOIiwiYWJzIiwibG9nIiwiTE4yIiwiY3VzdG9tIiwiX2lkIiwiX2NsZWFyRm4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJjbG9zZSIsInVucmVmIiwicmVmIiwiZW5yb2xsIiwiX2lkbGVUaW1lb3V0SWQiLCJfaWRsZVRpbWVvdXQiLCJ1bmVucm9sbCIsIl91bnJlZkFjdGl2ZSIsImFjdGl2ZSIsIl9vblRpbWVvdXQiLCJjbGVhckltbWVkaWF0ZSIsImRvY3VtZW50IiwicHJvY2VzcyIsInBvc3RNZXNzYWdlIiwiaW1wb3J0U2NyaXB0cyIsIm9ubWVzc2FnZSIsIk1lc3NhZ2VDaGFubmVsIiwicG9ydDEiLCJwb3J0MiIsImNyZWF0ZUVsZW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicmFuZG9tIiwic291cmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYXJncyIsImxvY2FsU3RvcmFnZSIsInRyYWNlIiwic2hhIiwic2hhMSIsInNoYTIyNCIsInNoYTI1NiIsInNoYTM4NCIsInNoYTUxMiIsImhhc2hNb2RlIiwiX2ZpbmFsT3JEaWdlc3QiLCJfX2ZpbmFsIiwiX2RlY29kZXIiLCJfZW5jb2RpbmciLCJfdG9TdHJpbmciLCJzZXRBdXRvUGFkZGluZyIsImdldEF1dGhUYWciLCJzZXRBdXRoVGFnIiwic2V0QUFEIiwiUmVmZXJlbmNlRXJyb3IiLCJwbHVnaW5zIiwicGx1Z2luIiwiZmlsdGVyIiwic2lnbmF0dXJlUHJvdmlkZXJzIiwibWFwIiwiZmluZCIsImFsbCIsImdldEVuZG9yc2VkTmV0d29yayIsInNldEl0ZW0iLCJnZXRJdGVtIiwicmVtb3ZlSXRlbSIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJnZXRBcHBLZXkiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlamVjdCIsImFwcGtleSIsIm9yaWdpbiIsInBhc3N0aHJvdWdoIiwidGltZW91dCIsInJhY2UiLCJkaXNjb25uZWN0IiwicGFyc2UiLCJzZXRBcHBLZXkiLCJpZCIsInJlc3VsdCIsImV2ZW50IiwicGF5bG9hZCIsIm9uZXJyb3IiLCJvbm9wZW4iLCJyZW1vdmVBcHBLZXkiLCJyZW1vdmVOb25jZSIsIm5vbmNlIiwiZ2V0Tm9uY2UiLCJuZXh0Tm9uY2UiLCJzZXROb25jZSIsImFzc2lnbiIsInBsYWNlaG9sZGVyIiwiRU9TIiwiRVRIIiwiVFJYIiwiQ09DT1NCQ1giLCJibG9ja2NoYWluIiwiY29udHJhY3QiLCJzeW1ib2wiLCJkZWNpbWFscyIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJjaGFpbklkIiwidG9rZW4iLCJmcm9tSnNvbiIsImlzQ29ubmVjdGVkIiwiaXNQYWlyZWQiLCJhZGRFdmVudEhhbmRsZXIiLCJyZW1vdmVFdmVudEhhbmRsZXIiLCJsaXN0ZW4iLCJnZXRBY2NvdW50SW5mbyIsImdldFZlcnNpb24iLCJnZXRJZGVudGl0eSIsImdldElkZW50aXR5RnJvbVBlcm1pc3Npb25zIiwiZm9yZ2V0SWRlbnRpdHkiLCJ1cGRhdGVJZGVudGl0eSIsImF1dGhlbnRpY2F0ZSIsImdldEFyYml0cmFyeVNpZ25hdHVyZSIsImdldFB1YmxpY0tleSIsImxpbmtBY2NvdW50IiwiaGFzQWNjb3VudEZvciIsInN1Z2dlc3ROZXR3b3JrIiwicmVxdWVzdFRyYW5zZmVyIiwicmVxdWVzdFNpZ25hdHVyZSIsImNyZWF0ZVRyYW5zYWN0aW9uIiwiYWRkVG9rZW4iLCJ0cmFuc2ZlckFzc2V0IiwiY2FsbENvbnRyYWN0RnVuY3Rpb24iLCJjcmVhdE5IQXNzZXRPcmRlciIsInRyYW5zZmVyTkhBc3NldCIsImZpbGxOSEFzc2V0T3JkZXIiLCJjYW5jZWxOSEFzc2V0T3JkZXIiLCJhY2NvdW50IiwiYWNjb3VudF9uYW1lIiwibnQiLCJydCIsIml0IiwiaG9sZGVyRm5zIiwiaW5pdFRpbWVvdXQiLCJsaW5rVGltZW91dCIsImxpbmsiLCJpc0V4dGVuc2lvbiIsIndhbGxldCIsImV2ZW50SGFuZGxlciIsInNlbmRBcGlSZXF1ZXN0IiwiZmllbGRzIiwiYWNjb3VudHMiLCJuZXR3b3JrIiwibG9ja0FjY291bnQiLCJreWMiLCJwdWJsaWNLZXkiLCJ0byIsImFtb3VudCIsIm9wdGlvbnMiLCJuYW1lT3JJZCIsImZ1bmN0aW9uTmFtZSIsInZhbHVlTGlzdCIsInJ1bnRpbWUiLCJvbmx5R2V0RmVlIiwib3RjQWNjb3VudCIsIm9yZGVyRmVlIiwiTkhBc3NldElkIiwicHJpY2UiLCJwcmljZUFzc2V0SWQiLCJleHBpcmF0aW9uIiwibWVtbyIsIm9yZGVySWQiLCJ0b0FjY291bnQiLCJOSEFzc2V0SWRzIiwiYWN0aW9ucyIsInQwIiwidXQiLCJEaXNjb25uZWN0ZWQiLCJMb2dnZWRPdXQiLCJvdCIsInN0IiwiYXQiLCJCY3hXZWIiLCJCQ1giLCJjb2Nvc0JjeCIsImN0IiwiaHQiLCJmdCIsImxvYWRQbHVnaW4iLCJpc1ZhbGlkIiwic2lnbmF0dXJlUHJvdmlkZXIiLCJob29rUHJvdmlkZXIiLCJzZXRTb2NrZXRTZXJ2aWNlIiwid2FsbGV0cyIsImNvbm5lY3QiLCJydW5CZWZvcmVJbnRlcmZhY2luZyIsIm1ldGhvZHMiLCJydW5BZnRlckludGVyZmFjaW5nIiwiYmluZEJhc2ljcyIsImx0IiwiUHJveHkiLCJjb2NvcyIsIkNvY29zanMiLCJQbHVnaW4iLCJQbHVnaW5UeXBlcyIsIkJsb2NrY2hhaW5zIiwiTmV0d29yayIsIlRva2VuIiwiU29ja2V0U2VydmljZSIsIkVWRU5UUyIsIldhbGxldEludGVyZmFjZSIsIldBTExFVF9NRVRIT0RTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFJQyxDQUFDLEdBQUMsRUFBTjs7QUFBUyxXQUFTQyxDQUFULENBQVdDLENBQVgsRUFBYTtBQUFDLFFBQUdGLENBQUMsQ0FBQ0UsQ0FBRCxDQUFKLEVBQVEsT0FBT0YsQ0FBQyxDQUFDRSxDQUFELENBQUQsQ0FBS0MsT0FBWjtBQUFvQixRQUFJQyxDQUFDLEdBQUNKLENBQUMsQ0FBQ0UsQ0FBRCxDQUFELEdBQUs7QUFBQ0UsTUFBQUEsQ0FBQyxFQUFDRixDQUFIO0FBQUtHLE1BQUFBLENBQUMsRUFBQyxDQUFDLENBQVI7QUFBVUYsTUFBQUEsT0FBTyxFQUFDO0FBQWxCLEtBQVg7QUFBaUMsV0FBT0osQ0FBQyxDQUFDRyxDQUFELENBQUQsQ0FBS0ksSUFBTCxDQUFVRixDQUFDLENBQUNELE9BQVosRUFBb0JDLENBQXBCLEVBQXNCQSxDQUFDLENBQUNELE9BQXhCLEVBQWdDRixDQUFoQyxHQUFtQ0csQ0FBQyxDQUFDQyxDQUFGLEdBQUksQ0FBQyxDQUF4QyxFQUEwQ0QsQ0FBQyxDQUFDRCxPQUFuRDtBQUEyRDs7QUFBQUYsRUFBQUEsQ0FBQyxDQUFDTSxDQUFGLEdBQUlSLENBQUosRUFBTUUsQ0FBQyxDQUFDTyxDQUFGLEdBQUlSLENBQVYsRUFBWUMsQ0FBQyxDQUFDUSxDQUFGLEdBQUksVUFBU1YsQ0FBVCxFQUFXQyxDQUFYLEVBQWFFLENBQWIsRUFBZTtBQUFDRCxJQUFBQSxDQUFDLENBQUNTLENBQUYsQ0FBSVgsQ0FBSixFQUFNQyxDQUFOLEtBQVVXLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQmIsQ0FBdEIsRUFBd0JDLENBQXhCLEVBQTBCO0FBQUNhLE1BQUFBLFVBQVUsRUFBQyxDQUFDLENBQWI7QUFBZUMsTUFBQUEsR0FBRyxFQUFDWjtB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QUF6akQ7O0FBQTZnRWlvQixFQUFBQSxFQUFFLENBQUNqa0IsR0FBSCxHQUFPLFVBQVNqRSxDQUFULEVBQVc7QUFBQyxXQUFPK29CLEVBQUUsQ0FBQ0UsS0FBSCxHQUFTanBCLENBQWhCO0FBQWtCLEdBQXJDLEVBQXNDa29CLEVBQUUsQ0FBQ25uQixHQUFILEdBQU8sWUFBVTtBQUFDLFdBQU9nb0IsRUFBRSxDQUFDRSxLQUFWO0FBQWdCLEdBQXhFLEVBQXlFLGVBQWEsT0FBT2htQixNQUFwQixLQUE2QkEsTUFBTSxDQUFDaW1CLE9BQVAsR0FBZUgsRUFBNUMsQ0FBekUsRUFBeUhBLEVBQUUsQ0FBQ0ksTUFBSCxHQUFVcFEsQ0FBbkksRUFBcUlnUSxFQUFFLENBQUNLLFdBQUgsR0FBZWpwQixDQUFwSixFQUFzSjRvQixFQUFFLENBQUNNLFdBQUgsR0FBZXJRLENBQXJLLEVBQXVLK1AsRUFBRSxDQUFDTyxPQUFILEdBQVdwUSxDQUFsTCxFQUFvTDZQLEVBQUUsQ0FBQ1EsS0FBSCxHQUFTdFEsQ0FBN0wsRUFBK0w4UCxFQUFFLENBQUNTLGFBQUgsR0FBaUIvZixDQUFoTixFQUFrTnNmLEVBQUUsQ0FBQ1UsTUFBSCxHQUFVakMsRUFBNU4sRUFBK051QixFQUFFLENBQUNXLGVBQUgsR0FBbUJuUSxDQUFsUCxFQUFvUHdQLEVBQUUsQ0FBQ1ksY0FBSCxHQUFrQnRRLENBQXRRLEVBQXdRcFcsTUFBTSxDQUFDaW1CLE9BQVAsR0FBZUgsRUFBdlI7QUFBMFI5b0IsRUFBQUEsQ0FBQyxXQUFELEdBQVVpcEIsT0FBVjtBQUFrQixDQVAxbnRHLENBQS80QixDQUFEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCl7dmFyIGU9e307ZnVuY3Rpb24gbihyKXtpZihlW3JdKXJldHVybiBlW3JdLmV4cG9ydHM7dmFyIGk9ZVtyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsbiksaS5sPSEwLGkuZXhwb3J0c31uLm09dCxuLmM9ZSxuLmQ9ZnVuY3Rpb24odCxlLHIpe24ubyh0LGUpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbih0KXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24odCxlKXtpZigxJmUmJih0PW4odCkpLDgmZSlyZXR1cm4gdDtpZig0JmUmJlwib2JqZWN0XCI9PXR5cGVvZiB0JiZ0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6dH0pLDImZSYmXCJzdHJpbmdcIiE9dHlwZW9mIHQpZm9yKHZhciBpIGluIHQpbi5kKHIsaSxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0uYmluZChudWxsLGkpKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKHQpe3ZhciBlPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBuLmQoZSxcImFcIixlKSxlfSxuLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LG4ucD1cIlwiLG4obi5zPTY0KX0oW2Z1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9bigzNSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX19LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbih0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLmtleSxyKX19dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxyKXtyZXR1cm4gZSYmbih0LnByb3RvdHlwZSxlKSxyJiZuKHQsciksdH19LGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgT2JqZWN0LmNyZWF0ZT90LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt0LnN1cGVyXz1lLHQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTp0LGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pfTp0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt0LnN1cGVyXz1lO3ZhciBuPWZ1bmN0aW9uKCl7fTtuLnByb3RvdHlwZT1lLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgbix0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj10fX0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKHQsZSxuLHIsaSxvLHMpe3RyeXt2YXIgYT10W29dKHMpLHU9YS52YWx1ZX1jYXRjaCh0KXtyZXR1cm4gdm9pZCBuKHQpfWEuZG9uZT9lKHUpOlByb21pc2UucmVzb2x2ZSh1KS50aGVuKHIsaSl9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe3ZhciBlPXRoaXMscj1hcmd1bWVudHM7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGksbyl7dmFyIHM9dC5hcHBseShlLHIpO2Z1bmN0aW9uIGEodCl7bihzLGksbyxhLHUsXCJuZXh0XCIsdCl9ZnVuY3Rpb24gdSh0KXtuKHMsaSxvLGEsdSxcInRocm93XCIsdCl9YSh2b2lkIDApfSl9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTYpLGk9ci5CdWZmZXI7ZnVuY3Rpb24gbyh0LGUpe2Zvcih2YXIgbiBpbiB0KWVbbl09dFtuXX1mdW5jdGlvbiBzKHQsZSxuKXtyZXR1cm4gaSh0LGUsbil9aS5mcm9tJiZpLmFsbG9jJiZpLmFsbG9jVW5zYWZlJiZpLmFsbG9jVW5zYWZlU2xvdz90LmV4cG9ydHM9cjoobyhyLGUpLGUuQnVmZmVyPXMpLG8oaSxzKSxzLmZyb209ZnVuY3Rpb24odCxlLG4pe2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlclwiKTtyZXR1cm4gaSh0LGUsbil9LHMuYWxsb2M9ZnVuY3Rpb24odCxlLG4pe2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyXCIpO3ZhciByPWkodCk7cmV0dXJuIHZvaWQgMCE9PWU/XCJzdHJpbmdcIj09dHlwZW9mIG4/ci5maWxsKGUsbik6ci5maWxsKGUpOnIuZmlsbCgwKSxyfSxzLmFsbG9jVW5zYWZlPWZ1bmN0aW9uKHQpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyXCIpO3JldHVybiBpKHQpfSxzLmFsbG9jVW5zYWZlU2xvdz1mdW5jdGlvbih0KXtpZihcIm51bWJlclwiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlclwiKTtyZXR1cm4gci5TbG93QnVmZmVyKHQpfX0sZnVuY3Rpb24odCxlKXt2YXIgbjtuPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KCk7dHJ5e249bnx8bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKX1jYXRjaCh0KXtcIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiYobj13aW5kb3cpfXQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMiksaT1PYmplY3Qua2V5c3x8ZnVuY3Rpb24odCl7dmFyIGU9W107Zm9yKHZhciBuIGluIHQpZS5wdXNoKG4pO3JldHVybiBlfTt0LmV4cG9ydHM9Zjt2YXIgbz1uKDEwKTtvLmluaGVyaXRzPW4oNCk7dmFyIHM9bigyNSksYT1uKDE5KTtvLmluaGVyaXRzKGYscyk7Zm9yKHZhciB1PWkoYS5wcm90b3R5cGUpLGM9MDtjPHUubGVuZ3RoO2MrKyl7dmFyIGg9dVtjXTtmLnByb3RvdHlwZVtoXXx8KGYucHJvdG90eXBlW2hdPWEucHJvdG90eXBlW2hdKX1mdW5jdGlvbiBmKHQpe2lmKCEodGhpcyBpbnN0YW5jZW9mIGYpKXJldHVybiBuZXcgZih0KTtzLmNhbGwodGhpcyx0KSxhLmNhbGwodGhpcyx0KSx0JiYhMT09PXQucmVhZGFibGUmJih0aGlzLnJlYWRhYmxlPSExKSx0JiYhMT09PXQud3JpdGFibGUmJih0aGlzLndyaXRhYmxlPSExKSx0aGlzLmFsbG93SGFsZk9wZW49ITAsdCYmITE9PT10LmFsbG93SGFsZk9wZW4mJih0aGlzLmFsbG93SGFsZk9wZW49ITEpLHRoaXMub25jZShcImVuZFwiLGwpfWZ1bmN0aW9uIGwoKXt0aGlzLmFsbG93SGFsZk9wZW58fHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWR8fHIubmV4dFRpY2soZCx0aGlzKX1mdW5jdGlvbiBkKHQpe3QuZW5kKCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGYucHJvdG90eXBlLFwid3JpdGFibGVIaWdoV2F0ZXJNYXJrXCIse2VudW1lcmFibGU6ITEsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyaXRhYmxlU3RhdGUuaGlnaFdhdGVyTWFya319KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZi5wcm90b3R5cGUsXCJkZXN0cm95ZWRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMCE9PXRoaXMuX3JlYWRhYmxlU3RhdGUmJnZvaWQgMCE9PXRoaXMuX3dyaXRhYmxlU3RhdGUmJih0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZCYmdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQpfSxzZXQ6ZnVuY3Rpb24odCl7dm9pZCAwIT09dGhpcy5fcmVhZGFibGVTdGF0ZSYmdm9pZCAwIT09dGhpcy5fd3JpdGFibGVTdGF0ZSYmKHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkPXQsdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ9dCl9fSksZi5wcm90b3R5cGUuX2Rlc3Ryb3k9ZnVuY3Rpb24odCxlKXt0aGlzLnB1c2gobnVsbCksdGhpcy5lbmQoKSxyLm5leHRUaWNrKGUsdCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big2KS5CdWZmZXI7ZnVuY3Rpb24gaSh0LGUpe3RoaXMuX2Jsb2NrPXIuYWxsb2ModCksdGhpcy5fZmluYWxTaXplPWUsdGhpcy5fYmxvY2tTaXplPXQsdGhpcy5fbGVuPTB9aS5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKHQsZSl7XCJzdHJpbmdcIj09dHlwZW9mIHQmJihlPWV8fFwidXRmOFwiLHQ9ci5mcm9tKHQsZSkpO2Zvcih2YXIgbj10aGlzLl9ibG9jayxpPXRoaXMuX2Jsb2NrU2l6ZSxvPXQubGVuZ3RoLHM9dGhpcy5fbGVuLGE9MDthPG87KXtmb3IodmFyIHU9cyVpLGM9TWF0aC5taW4oby1hLGktdSksaD0wO2g8YztoKyspblt1K2hdPXRbYStoXTthKz1jLChzKz1jKSVpPT0wJiZ0aGlzLl91cGRhdGUobil9cmV0dXJuIHRoaXMuX2xlbis9byx0aGlzfSxpLnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fbGVuJXRoaXMuX2Jsb2NrU2l6ZTt0aGlzLl9ibG9ja1tlXT0xMjgsdGhpcy5fYmxvY2suZmlsbCgwLGUrMSksZT49dGhpcy5fZmluYWxTaXplJiYodGhpcy5fdXBkYXRlKHRoaXMuX2Jsb2NrKSx0aGlzLl9ibG9jay5maWxsKDApKTt2YXIgbj04KnRoaXMuX2xlbjtpZihuPD00Mjk0OTY3Mjk1KXRoaXMuX2Jsb2NrLndyaXRlVUludDMyQkUobix0aGlzLl9ibG9ja1NpemUtNCk7ZWxzZXt2YXIgcj0oNDI5NDk2NzI5NSZuKT4+PjAsaT0obi1yKS80Mjk0OTY3Mjk2O3RoaXMuX2Jsb2NrLndyaXRlVUludDMyQkUoaSx0aGlzLl9ibG9ja1NpemUtOCksdGhpcy5fYmxvY2sud3JpdGVVSW50MzJCRShyLHRoaXMuX2Jsb2NrU2l6ZS00KX10aGlzLl91cGRhdGUodGhpcy5fYmxvY2spO3ZhciBvPXRoaXMuX2hhc2goKTtyZXR1cm4gdD9vLnRvU3RyaW5nKHQpOm99LGkucHJvdG90eXBlLl91cGRhdGU9ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJfdXBkYXRlIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3NcIil9LHQuZXhwb3J0cz1pfSxmdW5jdGlvbih0LGUsbil7KGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4odCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX1lLmlzQXJyYXk9ZnVuY3Rpb24odCl7cmV0dXJuIEFycmF5LmlzQXJyYXk/QXJyYXkuaXNBcnJheSh0KTpcIltvYmplY3QgQXJyYXldXCI9PT1uKHQpfSxlLmlzQm9vbGVhbj1mdW5jdGlvbih0KXtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHR9LGUuaXNOdWxsPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT09dH0sZS5pc051bGxPclVuZGVmaW5lZD1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dH0sZS5pc051bWJlcj1mdW5jdGlvbih0KXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgdH0sZS5pc1N0cmluZz1mdW5jdGlvbih0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdH0sZS5pc1N5bWJvbD1mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH0sZS5pc1VuZGVmaW5lZD1mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dH0sZS5pc1JlZ0V4cD1mdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09bih0KX0sZS5pc09iamVjdD1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdCYmbnVsbCE9PXR9LGUuaXNEYXRlPWZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09bih0KX0sZS5pc0Vycm9yPWZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBFcnJvcl1cIj09PW4odCl8fHQgaW5zdGFuY2VvZiBFcnJvcn0sZS5pc0Z1bmN0aW9uPWZ1bmN0aW9uKHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHR9LGUuaXNQcmltaXRpdmU9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PT10fHxcImJvb2xlYW5cIj09dHlwZW9mIHR8fFwibnVtYmVyXCI9PXR5cGVvZiB0fHxcInN0cmluZ1wiPT10eXBlb2YgdHx8XCJzeW1ib2xcIj09dHlwZW9mIHR8fHZvaWQgMD09PXR9LGUuaXNCdWZmZXI9dC5pc0J1ZmZlcn0pLmNhbGwodGhpcyxuKDE2KS5CdWZmZXIpfSxmdW5jdGlvbih0LGUpe3ZhciBuLHIsaT10LmV4cG9ydHM9e307ZnVuY3Rpb24gbygpe3Rocm93IG5ldyBFcnJvcihcInNldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9ZnVuY3Rpb24gcygpe3Rocm93IG5ldyBFcnJvcihcImNsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZFwiKX1mdW5jdGlvbiBhKHQpe2lmKG49PT1zZXRUaW1lb3V0KXJldHVybiBzZXRUaW1lb3V0KHQsMCk7aWYoKG49PT1vfHwhbikmJnNldFRpbWVvdXQpcmV0dXJuIG49c2V0VGltZW91dCxzZXRUaW1lb3V0KHQsMCk7dHJ5e3JldHVybiBuKHQsMCl9Y2F0Y2goZSl7dHJ5e3JldHVybiBuLmNhbGwobnVsbCx0LDApfWNhdGNoKGUpe3JldHVybiBuLmNhbGwodGhpcyx0LDApfX19IWZ1bmN0aW9uKCl7dHJ5e249XCJmdW5jdGlvblwiPT10eXBlb2Ygc2V0VGltZW91dD9zZXRUaW1lb3V0Om99Y2F0Y2godCl7bj1vfXRyeXtyPVwiZnVuY3Rpb25cIj09dHlwZW9mIGNsZWFyVGltZW91dD9jbGVhclRpbWVvdXQ6c31jYXRjaCh0KXtyPXN9fSgpO3ZhciB1LGM9W10saD0hMSxmPS0xO2Z1bmN0aW9uIGwoKXtoJiZ1JiYoaD0hMSx1Lmxlbmd0aD9jPXUuY29uY2F0KGMpOmY9LTEsYy5sZW5ndGgmJmQoKSl9ZnVuY3Rpb24gZCgpe2lmKCFoKXt2YXIgdD1hKGwpO2g9ITA7Zm9yKHZhciBlPWMubGVuZ3RoO2U7KXtmb3IodT1jLGM9W107KytmPGU7KXUmJnVbZl0ucnVuKCk7Zj0tMSxlPWMubGVuZ3RofXU9bnVsbCxoPSExLGZ1bmN0aW9uKHQpe2lmKHI9PT1jbGVhclRpbWVvdXQpcmV0dXJuIGNsZWFyVGltZW91dCh0KTtpZigocj09PXN8fCFyKSYmY2xlYXJUaW1lb3V0KXJldHVybiByPWNsZWFyVGltZW91dCxjbGVhclRpbWVvdXQodCk7dHJ5e3IodCl9Y2F0Y2goZSl7dHJ5e3JldHVybiByLmNhbGwobnVsbCx0KX1jYXRjaChlKXtyZXR1cm4gci5jYWxsKHRoaXMsdCl9fX0odCl9fWZ1bmN0aW9uIHAodCxlKXt0aGlzLmZ1bj10LHRoaXMuYXJyYXk9ZX1mdW5jdGlvbiBnKCl7fWkubmV4dFRpY2s9ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSk7aWYoYXJndW1lbnRzLmxlbmd0aD4xKWZvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspZVtuLTFdPWFyZ3VtZW50c1tuXTtjLnB1c2gobmV3IHAodCxlKSksMSE9PWMubGVuZ3RofHxofHxhKGQpfSxwLnByb3RvdHlwZS5ydW49ZnVuY3Rpb24oKXt0aGlzLmZ1bi5hcHBseShudWxsLHRoaXMuYXJyYXkpfSxpLnRpdGxlPVwiYnJvd3NlclwiLGkuYnJvd3Nlcj0hMCxpLmVudj17fSxpLmFyZ3Y9W10saS52ZXJzaW9uPVwiXCIsaS52ZXJzaW9ucz17fSxpLm9uPWcsaS5hZGRMaXN0ZW5lcj1nLGkub25jZT1nLGkub2ZmPWcsaS5yZW1vdmVMaXN0ZW5lcj1nLGkucmVtb3ZlQWxsTGlzdGVuZXJzPWcsaS5lbWl0PWcsaS5wcmVwZW5kTGlzdGVuZXI9ZyxpLnByZXBlbmRPbmNlTGlzdGVuZXI9ZyxpLmxpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm5bXX0saS5iaW5kaW5nPWZ1bmN0aW9uKHQpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfSxpLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifSxpLmNoZGlyPWZ1bmN0aW9uKHQpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX0saS51bWFzaz1mdW5jdGlvbigpe3JldHVybiAwfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiOyhmdW5jdGlvbihlKXt2b2lkIDA9PT1lfHwhZS52ZXJzaW9ufHwwPT09ZS52ZXJzaW9uLmluZGV4T2YoXCJ2MC5cIil8fDA9PT1lLnZlcnNpb24uaW5kZXhPZihcInYxLlwiKSYmMCE9PWUudmVyc2lvbi5pbmRleE9mKFwidjEuOC5cIik/dC5leHBvcnRzPXtuZXh0VGljazpmdW5jdGlvbih0LG4scixpKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiY2FsbGJhY2tcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTt2YXIgbyxzLGE9YXJndW1lbnRzLmxlbmd0aDtzd2l0Y2goYSl7Y2FzZSAwOmNhc2UgMTpyZXR1cm4gZS5uZXh0VGljayh0KTtjYXNlIDI6cmV0dXJuIGUubmV4dFRpY2soZnVuY3Rpb24oKXt0LmNhbGwobnVsbCxuKX0pO2Nhc2UgMzpyZXR1cm4gZS5uZXh0VGljayhmdW5jdGlvbigpe3QuY2FsbChudWxsLG4scil9KTtjYXNlIDQ6cmV0dXJuIGUubmV4dFRpY2soZnVuY3Rpb24oKXt0LmNhbGwobnVsbCxuLHIsaSl9KTtkZWZhdWx0OmZvcihvPW5ldyBBcnJheShhLTEpLHM9MDtzPG8ubGVuZ3RoOylvW3MrK109YXJndW1lbnRzW3NdO3JldHVybiBlLm5leHRUaWNrKGZ1bmN0aW9uKCl7dC5hcHBseShudWxsLG8pfSl9fX06dC5leHBvcnRzPWV9KS5jYWxsKHRoaXMsbigxMSkpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDYyKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4hZXx8XCJvYmplY3RcIiE9PXIoZSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGU/aSh0KTplfX0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKGUpe3JldHVybiB0LmV4cG9ydHM9bj1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSxuKGUpfXQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big2Myk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZSYmZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTp0LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSxlJiZyKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7KGZ1bmN0aW9uKHQpe1xuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xudmFyIHI9big0MiksaT1uKDQzKSxvPW4oMjMpO2Z1bmN0aW9uIHMoKXtyZXR1cm4gdS5UWVBFRF9BUlJBWV9TVVBQT1JUPzIxNDc0ODM2NDc6MTA3Mzc0MTgyM31mdW5jdGlvbiBhKHQsZSl7aWYocygpPGUpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aFwiKTtyZXR1cm4gdS5UWVBFRF9BUlJBWV9TVVBQT1JUPyh0PW5ldyBVaW50OEFycmF5KGUpKS5fX3Byb3RvX189dS5wcm90b3R5cGU6KG51bGw9PT10JiYodD1uZXcgdShlKSksdC5sZW5ndGg9ZSksdH1mdW5jdGlvbiB1KHQsZSxuKXtpZighKHUuVFlQRURfQVJSQVlfU1VQUE9SVHx8dGhpcyBpbnN0YW5jZW9mIHUpKXJldHVybiBuZXcgdSh0LGUsbik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIklmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nXCIpO3JldHVybiBmKHRoaXMsdCl9cmV0dXJuIGModGhpcyx0LGUsbil9ZnVuY3Rpb24gYyh0LGUsbixyKXtpZihcIm51bWJlclwiPT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJmUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9mdW5jdGlvbih0LGUsbixyKXtpZihlLmJ5dGVMZW5ndGgsbjwwfHxlLmJ5dGVMZW5ndGg8bil0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidvZmZzZXQnIGlzIG91dCBvZiBib3VuZHNcIik7aWYoZS5ieXRlTGVuZ3RoPG4rKHJ8fDApKXRocm93IG5ldyBSYW5nZUVycm9yKFwiJ2xlbmd0aCcgaXMgb3V0IG9mIGJvdW5kc1wiKTtlPXZvaWQgMD09PW4mJnZvaWQgMD09PXI/bmV3IFVpbnQ4QXJyYXkoZSk6dm9pZCAwPT09cj9uZXcgVWludDhBcnJheShlLG4pOm5ldyBVaW50OEFycmF5KGUsbixyKTt1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHQ9ZSkuX19wcm90b19fPXUucHJvdG90eXBlOnQ9bCh0LGUpO3JldHVybiB0fSh0LGUsbixyKTpcInN0cmluZ1wiPT10eXBlb2YgZT9mdW5jdGlvbih0LGUsbil7XCJzdHJpbmdcIj09dHlwZW9mIG4mJlwiXCIhPT1ufHwobj1cInV0ZjhcIik7aWYoIXUuaXNFbmNvZGluZyhuKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpO3ZhciByPTB8cChlLG4pLGk9KHQ9YSh0LHIpKS53cml0ZShlLG4pO2khPT1yJiYodD10LnNsaWNlKDAsaSkpO3JldHVybiB0fSh0LGUsbik6ZnVuY3Rpb24odCxlKXtpZih1LmlzQnVmZmVyKGUpKXt2YXIgbj0wfGQoZS5sZW5ndGgpO3JldHVybiAwPT09KHQ9YSh0LG4pKS5sZW5ndGg/dDooZS5jb3B5KHQsMCwwLG4pLHQpfWlmKGUpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBBcnJheUJ1ZmZlciYmZS5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcnx8XCJsZW5ndGhcImluIGUpcmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGUubGVuZ3RofHwocj1lLmxlbmd0aCkhPXI/YSh0LDApOmwodCxlKTtpZihcIkJ1ZmZlclwiPT09ZS50eXBlJiZvKGUuZGF0YSkpcmV0dXJuIGwodCxlLmRhdGEpfXZhciByO3Rocm93IG5ldyBUeXBlRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuXCIpfSh0LGUpfWZ1bmN0aW9uIGgodCl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpO2lmKHQ8MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKX1mdW5jdGlvbiBmKHQsZSl7aWYoaChlKSx0PWEodCxlPDA/MDowfGQoZSkpLCF1LlRZUEVEX0FSUkFZX1NVUFBPUlQpZm9yKHZhciBuPTA7bjxlOysrbil0W25dPTA7cmV0dXJuIHR9ZnVuY3Rpb24gbCh0LGUpe3ZhciBuPWUubGVuZ3RoPDA/MDowfGQoZS5sZW5ndGgpO3Q9YSh0LG4pO2Zvcih2YXIgcj0wO3I8bjtyKz0xKXRbcl09MjU1JmVbcl07cmV0dXJuIHR9ZnVuY3Rpb24gZCh0KXtpZih0Pj1zKCkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtIHNpemU6IDB4XCIrcygpLnRvU3RyaW5nKDE2KStcIiBieXRlc1wiKTtyZXR1cm4gMHx0fWZ1bmN0aW9uIHAodCxlKXtpZih1LmlzQnVmZmVyKHQpKXJldHVybiB0Lmxlbmd0aDtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJlwiZnVuY3Rpb25cIj09dHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyYmKEFycmF5QnVmZmVyLmlzVmlldyh0KXx8dCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSlyZXR1cm4gdC5ieXRlTGVuZ3RoO1wic3RyaW5nXCIhPXR5cGVvZiB0JiYodD1cIlwiK3QpO3ZhciBuPXQubGVuZ3RoO2lmKDA9PT1uKXJldHVybiAwO2Zvcih2YXIgcj0hMTs7KXN3aXRjaChlKXtjYXNlXCJhc2NpaVwiOmNhc2VcImxhdGluMVwiOmNhc2VcImJpbmFyeVwiOnJldHVybiBuO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2Ugdm9pZCAwOnJldHVybiBEKHQpLmxlbmd0aDtjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4gMipuO2Nhc2VcImhleFwiOnJldHVybiBuPj4+MTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gcSh0KS5sZW5ndGg7ZGVmYXVsdDppZihyKXJldHVybiBEKHQpLmxlbmd0aDtlPShcIlwiK2UpLnRvTG93ZXJDYXNlKCkscj0hMH19ZnVuY3Rpb24gZyh0LGUsbil7dmFyIHI9dFtlXTt0W2VdPXRbbl0sdFtuXT1yfWZ1bmN0aW9uIHkodCxlLG4scixpKXtpZigwPT09dC5sZW5ndGgpcmV0dXJuLTE7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4/KHI9bixuPTApOm4+MjE0NzQ4MzY0Nz9uPTIxNDc0ODM2NDc6bjwtMjE0NzQ4MzY0OCYmKG49LTIxNDc0ODM2NDgpLG49K24saXNOYU4obikmJihuPWk/MDp0Lmxlbmd0aC0xKSxuPDAmJihuPXQubGVuZ3RoK24pLG4+PXQubGVuZ3RoKXtpZihpKXJldHVybi0xO249dC5sZW5ndGgtMX1lbHNlIGlmKG48MCl7aWYoIWkpcmV0dXJuLTE7bj0wfWlmKFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT11LmZyb20oZSxyKSksdS5pc0J1ZmZlcihlKSlyZXR1cm4gMD09PWUubGVuZ3RoPy0xOnYodCxlLG4scixpKTtpZihcIm51bWJlclwiPT10eXBlb2YgZSlyZXR1cm4gZSY9MjU1LHUuVFlQRURfQVJSQVlfU1VQUE9SVCYmXCJmdW5jdGlvblwiPT10eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZj9pP1VpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCh0LGUsbik6VWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbCh0LGUsbik6dih0LFtlXSxuLHIsaSk7dGhyb3cgbmV3IFR5cGVFcnJvcihcInZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlclwiKX1mdW5jdGlvbiB2KHQsZSxuLHIsaSl7dmFyIG8scz0xLGE9dC5sZW5ndGgsdT1lLmxlbmd0aDtpZih2b2lkIDAhPT1yJiYoXCJ1Y3MyXCI9PT0ocj1TdHJpbmcocikudG9Mb3dlckNhc2UoKSl8fFwidWNzLTJcIj09PXJ8fFwidXRmMTZsZVwiPT09cnx8XCJ1dGYtMTZsZVwiPT09cikpe2lmKHQubGVuZ3RoPDJ8fGUubGVuZ3RoPDIpcmV0dXJuLTE7cz0yLGEvPTIsdS89MixuLz0yfWZ1bmN0aW9uIGModCxlKXtyZXR1cm4gMT09PXM/dFtlXTp0LnJlYWRVSW50MTZCRShlKnMpfWlmKGkpe3ZhciBoPS0xO2ZvcihvPW47bzxhO28rKylpZihjKHQsbyk9PT1jKGUsLTE9PT1oPzA6by1oKSl7aWYoLTE9PT1oJiYoaD1vKSxvLWgrMT09PXUpcmV0dXJuIGgqc31lbHNlLTEhPT1oJiYoby09by1oKSxoPS0xfWVsc2UgZm9yKG4rdT5hJiYobj1hLXUpLG89bjtvPj0wO28tLSl7Zm9yKHZhciBmPSEwLGw9MDtsPHU7bCsrKWlmKGModCxvK2wpIT09YyhlLGwpKXtmPSExO2JyZWFrfWlmKGYpcmV0dXJuIG99cmV0dXJuLTF9ZnVuY3Rpb24gdyh0LGUsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgaT10Lmxlbmd0aC1uO3I/KHI9TnVtYmVyKHIpKT5pJiYocj1pKTpyPWk7dmFyIG89ZS5sZW5ndGg7aWYobyUyIT0wKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGhleCBzdHJpbmdcIik7cj5vLzImJihyPW8vMik7Zm9yKHZhciBzPTA7czxyOysrcyl7dmFyIGE9cGFyc2VJbnQoZS5zdWJzdHIoMipzLDIpLDE2KTtpZihpc05hTihhKSlyZXR1cm4gczt0W24rc109YX1yZXR1cm4gc31mdW5jdGlvbiBfKHQsZSxuLHIpe3JldHVybiBXKEQoZSx0Lmxlbmd0aC1uKSx0LG4scil9ZnVuY3Rpb24gYih0LGUsbixyKXtyZXR1cm4gVyhmdW5jdGlvbih0KXtmb3IodmFyIGU9W10sbj0wO248dC5sZW5ndGg7KytuKWUucHVzaCgyNTUmdC5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gZX0oZSksdCxuLHIpfWZ1bmN0aW9uIG0odCxlLG4scil7cmV0dXJuIGIodCxlLG4scil9ZnVuY3Rpb24gayh0LGUsbixyKXtyZXR1cm4gVyhxKGUpLHQsbixyKX1mdW5jdGlvbiBFKHQsZSxuLHIpe3JldHVybiBXKGZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuLHIsaSxvPVtdLHM9MDtzPHQubGVuZ3RoJiYhKChlLT0yKTwwKTsrK3Mpbj10LmNoYXJDb2RlQXQocykscj1uPj44LGk9biUyNTYsby5wdXNoKGkpLG8ucHVzaChyKTtyZXR1cm4gb30oZSx0Lmxlbmd0aC1uKSx0LG4scil9ZnVuY3Rpb24gUyh0LGUsbil7cmV0dXJuIDA9PT1lJiZuPT09dC5sZW5ndGg/ci5mcm9tQnl0ZUFycmF5KHQpOnIuZnJvbUJ5dGVBcnJheSh0LnNsaWNlKGUsbikpfWZ1bmN0aW9uIHgodCxlLG4pe249TWF0aC5taW4odC5sZW5ndGgsbik7Zm9yKHZhciByPVtdLGk9ZTtpPG47KXt2YXIgbyxzLGEsdSxjPXRbaV0saD1udWxsLGY9Yz4yMzk/NDpjPjIyMz8zOmM+MTkxPzI6MTtpZihpK2Y8PW4pc3dpdGNoKGYpe2Nhc2UgMTpjPDEyOCYmKGg9Yyk7YnJlYWs7Y2FzZSAyOjEyOD09KDE5MiYobz10W2krMV0pKSYmKHU9KDMxJmMpPDw2fDYzJm8pPjEyNyYmKGg9dSk7YnJlYWs7Y2FzZSAzOm89dFtpKzFdLHM9dFtpKzJdLDEyOD09KDE5MiZvKSYmMTI4PT0oMTkyJnMpJiYodT0oMTUmYyk8PDEyfCg2MyZvKTw8Nnw2MyZzKT4yMDQ3JiYodTw1NTI5Nnx8dT41NzM0MykmJihoPXUpO2JyZWFrO2Nhc2UgNDpvPXRbaSsxXSxzPXRbaSsyXSxhPXRbaSszXSwxMjg9PSgxOTImbykmJjEyOD09KDE5MiZzKSYmMTI4PT0oMTkyJmEpJiYodT0oMTUmYyk8PDE4fCg2MyZvKTw8MTJ8KDYzJnMpPDw2fDYzJmEpPjY1NTM1JiZ1PDExMTQxMTImJihoPXUpfW51bGw9PT1oPyhoPTY1NTMzLGY9MSk6aD42NTUzNSYmKGgtPTY1NTM2LHIucHVzaChoPj4+MTAmMTAyM3w1NTI5NiksaD01NjMyMHwxMDIzJmgpLHIucHVzaChoKSxpKz1mfXJldHVybiBmdW5jdGlvbih0KXt2YXIgZT10Lmxlbmd0aDtpZihlPD1BKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZyx0KTt2YXIgbj1cIlwiLHI9MDtmb3IoO3I8ZTspbis9U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsdC5zbGljZShyLHIrPUEpKTtyZXR1cm4gbn0ocil9ZS5CdWZmZXI9dSxlLlNsb3dCdWZmZXI9ZnVuY3Rpb24odCl7K3QhPXQmJih0PTApO3JldHVybiB1LmFsbG9jKCt0KX0sZS5JTlNQRUNUX01BWF9CWVRFUz01MCx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ9dm9pZCAwIT09dC5UWVBFRF9BUlJBWV9TVVBQT1JUP3QuVFlQRURfQVJSQVlfU1VQUE9SVDpmdW5jdGlvbigpe3RyeXt2YXIgdD1uZXcgVWludDhBcnJheSgxKTtyZXR1cm4gdC5fX3Byb3RvX189e19fcHJvdG9fXzpVaW50OEFycmF5LnByb3RvdHlwZSxmb286ZnVuY3Rpb24oKXtyZXR1cm4gNDJ9fSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXkmJjA9PT10LnN1YmFycmF5KDEsMSkuYnl0ZUxlbmd0aH1jYXRjaCh0KXtyZXR1cm4hMX19KCksZS5rTWF4TGVuZ3RoPXMoKSx1LnBvb2xTaXplPTgxOTIsdS5fYXVnbWVudD1mdW5jdGlvbih0KXtyZXR1cm4gdC5fX3Byb3RvX189dS5wcm90b3R5cGUsdH0sdS5mcm9tPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gYyhudWxsLHQsZSxuKX0sdS5UWVBFRF9BUlJBWV9TVVBQT1JUJiYodS5wcm90b3R5cGUuX19wcm90b19fPVVpbnQ4QXJyYXkucHJvdG90eXBlLHUuX19wcm90b19fPVVpbnQ4QXJyYXksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnNwZWNpZXMmJnVbU3ltYm9sLnNwZWNpZXNdPT09dSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHUsU3ltYm9sLnNwZWNpZXMse3ZhbHVlOm51bGwsY29uZmlndXJhYmxlOiEwfSkpLHUuYWxsb2M9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBmdW5jdGlvbih0LGUsbixyKXtyZXR1cm4gaChlKSxlPD0wP2EodCxlKTp2b2lkIDAhPT1uP1wic3RyaW5nXCI9PXR5cGVvZiByP2EodCxlKS5maWxsKG4scik6YSh0LGUpLmZpbGwobik6YSh0LGUpfShudWxsLHQsZSxuKX0sdS5hbGxvY1Vuc2FmZT1mdW5jdGlvbih0KXtyZXR1cm4gZihudWxsLHQpfSx1LmFsbG9jVW5zYWZlU2xvdz1mdW5jdGlvbih0KXtyZXR1cm4gZihudWxsLHQpfSx1LmlzQnVmZmVyPWZ1bmN0aW9uKHQpe3JldHVybiEobnVsbD09dHx8IXQuX2lzQnVmZmVyKX0sdS5jb21wYXJlPWZ1bmN0aW9uKHQsZSl7aWYoIXUuaXNCdWZmZXIodCl8fCF1LmlzQnVmZmVyKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzXCIpO2lmKHQ9PT1lKXJldHVybiAwO2Zvcih2YXIgbj10Lmxlbmd0aCxyPWUubGVuZ3RoLGk9MCxvPU1hdGgubWluKG4scik7aTxvOysraSlpZih0W2ldIT09ZVtpXSl7bj10W2ldLHI9ZVtpXTticmVha31yZXR1cm4gbjxyPy0xOnI8bj8xOjB9LHUuaXNFbmNvZGluZz1mdW5jdGlvbih0KXtzd2l0Y2goU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwibGF0aW4xXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LHUuY29uY2F0PWZ1bmN0aW9uKHQsZSl7aWYoIW8odCkpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJyk7aWYoMD09PXQubGVuZ3RoKXJldHVybiB1LmFsbG9jKDApO3ZhciBuO2lmKHZvaWQgMD09PWUpZm9yKGU9MCxuPTA7bjx0Lmxlbmd0aDsrK24pZSs9dFtuXS5sZW5ndGg7dmFyIHI9dS5hbGxvY1Vuc2FmZShlKSxpPTA7Zm9yKG49MDtuPHQubGVuZ3RoOysrbil7dmFyIHM9dFtuXTtpZighdS5pc0J1ZmZlcihzKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKTtzLmNvcHkocixpKSxpKz1zLmxlbmd0aH1yZXR1cm4gcn0sdS5ieXRlTGVuZ3RoPXAsdS5wcm90b3R5cGUuX2lzQnVmZmVyPSEwLHUucHJvdG90eXBlLnN3YXAxNj1mdW5jdGlvbigpe3ZhciB0PXRoaXMubGVuZ3RoO2lmKHQlMiE9MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzXCIpO2Zvcih2YXIgZT0wO2U8dDtlKz0yKWcodGhpcyxlLGUrMSk7cmV0dXJuIHRoaXN9LHUucHJvdG90eXBlLnN3YXAzMj1mdW5jdGlvbigpe3ZhciB0PXRoaXMubGVuZ3RoO2lmKHQlNCE9MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzXCIpO2Zvcih2YXIgZT0wO2U8dDtlKz00KWcodGhpcyxlLGUrMyksZyh0aGlzLGUrMSxlKzIpO3JldHVybiB0aGlzfSx1LnByb3RvdHlwZS5zd2FwNjQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmxlbmd0aDtpZih0JTghPTApdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0c1wiKTtmb3IodmFyIGU9MDtlPHQ7ZSs9OClnKHRoaXMsZSxlKzcpLGcodGhpcyxlKzEsZSs2KSxnKHRoaXMsZSsyLGUrNSksZyh0aGlzLGUrMyxlKzQpO3JldHVybiB0aGlzfSx1LnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3ZhciB0PTB8dGhpcy5sZW5ndGg7cmV0dXJuIDA9PT10P1wiXCI6MD09PWFyZ3VtZW50cy5sZW5ndGg/eCh0aGlzLDAsdCk6ZnVuY3Rpb24odCxlLG4pe3ZhciByPSExO2lmKCh2b2lkIDA9PT1lfHxlPDApJiYoZT0wKSxlPnRoaXMubGVuZ3RoKXJldHVyblwiXCI7aWYoKHZvaWQgMD09PW58fG4+dGhpcy5sZW5ndGgpJiYobj10aGlzLmxlbmd0aCksbjw9MClyZXR1cm5cIlwiO2lmKChuPj4+PTApPD0oZT4+Pj0wKSlyZXR1cm5cIlwiO2Zvcih0fHwodD1cInV0ZjhcIik7Oylzd2l0Y2godCl7Y2FzZVwiaGV4XCI6cmV0dXJuIFIodGhpcyxlLG4pO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnJldHVybiB4KHRoaXMsZSxuKTtjYXNlXCJhc2NpaVwiOnJldHVybiBUKHRoaXMsZSxuKTtjYXNlXCJsYXRpbjFcIjpjYXNlXCJiaW5hcnlcIjpyZXR1cm4gSSh0aGlzLGUsbik7Y2FzZVwiYmFzZTY0XCI6cmV0dXJuIFModGhpcyxlLG4pO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiBPKHRoaXMsZSxuKTtkZWZhdWx0OmlmKHIpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gZW5jb2Rpbmc6IFwiK3QpO3Q9KHQrXCJcIikudG9Mb3dlckNhc2UoKSxyPSEwfX0uYXBwbHkodGhpcyxhcmd1bWVudHMpfSx1LnByb3RvdHlwZS5lcXVhbHM9ZnVuY3Rpb24odCl7aWYoIXUuaXNCdWZmZXIodCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXJcIik7cmV0dXJuIHRoaXM9PT10fHwwPT09dS5jb21wYXJlKHRoaXMsdCl9LHUucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXt2YXIgdD1cIlwiLG49ZS5JTlNQRUNUX01BWF9CWVRFUztyZXR1cm4gdGhpcy5sZW5ndGg+MCYmKHQ9dGhpcy50b1N0cmluZyhcImhleFwiLDAsbikubWF0Y2goLy57Mn0vZykuam9pbihcIiBcIiksdGhpcy5sZW5ndGg+biYmKHQrPVwiIC4uLiBcIikpLFwiPEJ1ZmZlciBcIit0K1wiPlwifSx1LnByb3RvdHlwZS5jb21wYXJlPWZ1bmN0aW9uKHQsZSxuLHIsaSl7aWYoIXUuaXNCdWZmZXIodCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXJcIik7aWYodm9pZCAwPT09ZSYmKGU9MCksdm9pZCAwPT09biYmKG49dD90Lmxlbmd0aDowKSx2b2lkIDA9PT1yJiYocj0wKSx2b2lkIDA9PT1pJiYoaT10aGlzLmxlbmd0aCksZTwwfHxuPnQubGVuZ3RofHxyPDB8fGk+dGhpcy5sZW5ndGgpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJvdXQgb2YgcmFuZ2UgaW5kZXhcIik7aWYocj49aSYmZT49bilyZXR1cm4gMDtpZihyPj1pKXJldHVybi0xO2lmKGU+PW4pcmV0dXJuIDE7aWYodGhpcz09PXQpcmV0dXJuIDA7Zm9yKHZhciBvPShpPj4+PTApLShyPj4+PTApLHM9KG4+Pj49MCktKGU+Pj49MCksYT1NYXRoLm1pbihvLHMpLGM9dGhpcy5zbGljZShyLGkpLGg9dC5zbGljZShlLG4pLGY9MDtmPGE7KytmKWlmKGNbZl0hPT1oW2ZdKXtvPWNbZl0scz1oW2ZdO2JyZWFrfXJldHVybiBvPHM/LTE6czxvPzE6MH0sdS5wcm90b3R5cGUuaW5jbHVkZXM9ZnVuY3Rpb24odCxlLG4pe3JldHVybi0xIT09dGhpcy5pbmRleE9mKHQsZSxuKX0sdS5wcm90b3R5cGUuaW5kZXhPZj1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHkodGhpcyx0LGUsbiwhMCl9LHUucHJvdG90eXBlLmxhc3RJbmRleE9mPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4geSh0aGlzLHQsZSxuLCExKX0sdS5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24odCxlLG4scil7aWYodm9pZCAwPT09ZSlyPVwidXRmOFwiLG49dGhpcy5sZW5ndGgsZT0wO2Vsc2UgaWYodm9pZCAwPT09biYmXCJzdHJpbmdcIj09dHlwZW9mIGUpcj1lLG49dGhpcy5sZW5ndGgsZT0wO2Vsc2V7aWYoIWlzRmluaXRlKGUpKXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkXCIpO2V8PTAsaXNGaW5pdGUobik/KG58PTAsdm9pZCAwPT09ciYmKHI9XCJ1dGY4XCIpKToocj1uLG49dm9pZCAwKX12YXIgaT10aGlzLmxlbmd0aC1lO2lmKCh2b2lkIDA9PT1ufHxuPmkpJiYobj1pKSx0Lmxlbmd0aD4wJiYobjwwfHxlPDApfHxlPnRoaXMubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHNcIik7cnx8KHI9XCJ1dGY4XCIpO2Zvcih2YXIgbz0hMTs7KXN3aXRjaChyKXtjYXNlXCJoZXhcIjpyZXR1cm4gdyh0aGlzLHQsZSxuKTtjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpyZXR1cm4gXyh0aGlzLHQsZSxuKTtjYXNlXCJhc2NpaVwiOnJldHVybiBiKHRoaXMsdCxlLG4pO2Nhc2VcImxhdGluMVwiOmNhc2VcImJpbmFyeVwiOnJldHVybiBtKHRoaXMsdCxlLG4pO2Nhc2VcImJhc2U2NFwiOnJldHVybiBrKHRoaXMsdCxlLG4pO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiBFKHRoaXMsdCxlLG4pO2RlZmF1bHQ6aWYobyl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrcik7cj0oXCJcIityKS50b0xvd2VyQ2FzZSgpLG89ITB9fSx1LnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX07dmFyIEE9NDA5NjtmdW5jdGlvbiBUKHQsZSxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4odC5sZW5ndGgsbik7Zm9yKHZhciBpPWU7aTxuOysraSlyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyZ0W2ldKTtyZXR1cm4gcn1mdW5jdGlvbiBJKHQsZSxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4odC5sZW5ndGgsbik7Zm9yKHZhciBpPWU7aTxuOysraSlyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHRbaV0pO3JldHVybiByfWZ1bmN0aW9uIFIodCxlLG4pe3ZhciByPXQubGVuZ3RoOyghZXx8ZTwwKSYmKGU9MCksKCFufHxuPDB8fG4+cikmJihuPXIpO2Zvcih2YXIgaT1cIlwiLG89ZTtvPG47KytvKWkrPUYodFtvXSk7cmV0dXJuIGl9ZnVuY3Rpb24gTyh0LGUsbil7Zm9yKHZhciByPXQuc2xpY2UoZSxuKSxpPVwiXCIsbz0wO288ci5sZW5ndGg7bys9MilpKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHJbb10rMjU2KnJbbysxXSk7cmV0dXJuIGl9ZnVuY3Rpb24gUCh0LGUsbil7aWYodCUxIT0wfHx0PDApdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJvZmZzZXQgaXMgbm90IHVpbnRcIik7aWYodCtlPm4pdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpfWZ1bmN0aW9uIEIodCxlLG4scixpLG8pe2lmKCF1LmlzQnVmZmVyKHQpKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpO2lmKGU+aXx8ZTxvKXRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpO2lmKG4rcj50Lmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IG91dCBvZiByYW5nZVwiKX1mdW5jdGlvbiBMKHQsZSxuLHIpe2U8MCYmKGU9NjU1MzUrZSsxKTtmb3IodmFyIGk9MCxvPU1hdGgubWluKHQubGVuZ3RoLW4sMik7aTxvOysraSl0W24raV09KGUmMjU1PDw4KihyP2k6MS1pKSk+Pj44KihyP2k6MS1pKX1mdW5jdGlvbiBDKHQsZSxuLHIpe2U8MCYmKGU9NDI5NDk2NzI5NStlKzEpO2Zvcih2YXIgaT0wLG89TWF0aC5taW4odC5sZW5ndGgtbiw0KTtpPG87KytpKXRbbitpXT1lPj4+OCoocj9pOjMtaSkmMjU1fWZ1bmN0aW9uIE0odCxlLG4scixpLG8pe2lmKG4rcj50Lmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IG91dCBvZiByYW5nZVwiKTtpZihuPDApdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbmRleCBvdXQgb2YgcmFuZ2VcIil9ZnVuY3Rpb24gaih0LGUsbixyLG8pe3JldHVybiBvfHxNKHQsMCxuLDQpLGkud3JpdGUodCxlLG4sciwyMyw0KSxuKzR9ZnVuY3Rpb24gTih0LGUsbixyLG8pe3JldHVybiBvfHxNKHQsMCxuLDgpLGkud3JpdGUodCxlLG4sciw1Miw4KSxuKzh9dS5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24odCxlKXt2YXIgbixyPXRoaXMubGVuZ3RoO2lmKCh0PX5+dCk8MD8odCs9cik8MCYmKHQ9MCk6dD5yJiYodD1yKSwoZT12b2lkIDA9PT1lP3I6fn5lKTwwPyhlKz1yKTwwJiYoZT0wKTplPnImJihlPXIpLGU8dCYmKGU9dCksdS5UWVBFRF9BUlJBWV9TVVBQT1JUKShuPXRoaXMuc3ViYXJyYXkodCxlKSkuX19wcm90b19fPXUucHJvdG90eXBlO2Vsc2V7dmFyIGk9ZS10O249bmV3IHUoaSx2b2lkIDApO2Zvcih2YXIgbz0wO288aTsrK28pbltvXT10aGlzW28rdF19cmV0dXJuIG59LHUucHJvdG90eXBlLnJlYWRVSW50TEU9ZnVuY3Rpb24odCxlLG4pe3R8PTAsZXw9MCxufHxQKHQsZSx0aGlzLmxlbmd0aCk7Zm9yKHZhciByPXRoaXNbdF0saT0xLG89MDsrK288ZSYmKGkqPTI1Nik7KXIrPXRoaXNbdCtvXSppO3JldHVybiByfSx1LnByb3RvdHlwZS5yZWFkVUludEJFPWZ1bmN0aW9uKHQsZSxuKXt0fD0wLGV8PTAsbnx8UCh0LGUsdGhpcy5sZW5ndGgpO2Zvcih2YXIgcj10aGlzW3QrLS1lXSxpPTE7ZT4wJiYoaSo9MjU2KTspcis9dGhpc1t0Ky0tZV0qaTtyZXR1cm4gcn0sdS5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fFAodCwxLHRoaXMubGVuZ3RoKSx0aGlzW3RdfSx1LnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8UCh0LDIsdGhpcy5sZW5ndGgpLHRoaXNbdF18dGhpc1t0KzFdPDw4fSx1LnByb3RvdHlwZS5yZWFkVUludDE2QkU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8UCh0LDIsdGhpcy5sZW5ndGgpLHRoaXNbdF08PDh8dGhpc1t0KzFdfSx1LnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8UCh0LDQsdGhpcy5sZW5ndGgpLCh0aGlzW3RdfHRoaXNbdCsxXTw8OHx0aGlzW3QrMl08PDE2KSsxNjc3NzIxNip0aGlzW3QrM119LHUucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbih0LGUpe3JldHVybiBlfHxQKHQsNCx0aGlzLmxlbmd0aCksMTY3NzcyMTYqdGhpc1t0XSsodGhpc1t0KzFdPDwxNnx0aGlzW3QrMl08PDh8dGhpc1t0KzNdKX0sdS5wcm90b3R5cGUucmVhZEludExFPWZ1bmN0aW9uKHQsZSxuKXt0fD0wLGV8PTAsbnx8UCh0LGUsdGhpcy5sZW5ndGgpO2Zvcih2YXIgcj10aGlzW3RdLGk9MSxvPTA7KytvPGUmJihpKj0yNTYpOylyKz10aGlzW3Qrb10qaTtyZXR1cm4gcj49KGkqPTEyOCkmJihyLT1NYXRoLnBvdygyLDgqZSkpLHJ9LHUucHJvdG90eXBlLnJlYWRJbnRCRT1mdW5jdGlvbih0LGUsbil7dHw9MCxlfD0wLG58fFAodCxlLHRoaXMubGVuZ3RoKTtmb3IodmFyIHI9ZSxpPTEsbz10aGlzW3QrLS1yXTtyPjAmJihpKj0yNTYpOylvKz10aGlzW3QrLS1yXSppO3JldHVybiBvPj0oaSo9MTI4KSYmKG8tPU1hdGgucG93KDIsOCplKSksb30sdS5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8UCh0LDEsdGhpcy5sZW5ndGgpLDEyOCZ0aGlzW3RdPy0xKigyNTUtdGhpc1t0XSsxKTp0aGlzW3RdfSx1LnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbih0LGUpe2V8fFAodCwyLHRoaXMubGVuZ3RoKTt2YXIgbj10aGlzW3RdfHRoaXNbdCsxXTw8ODtyZXR1cm4gMzI3Njgmbj80Mjk0OTAxNzYwfG46bn0sdS5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24odCxlKXtlfHxQKHQsMix0aGlzLmxlbmd0aCk7dmFyIG49dGhpc1t0KzFdfHRoaXNbdF08PDg7cmV0dXJuIDMyNzY4Jm4/NDI5NDkwMTc2MHxuOm59LHUucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fFAodCw0LHRoaXMubGVuZ3RoKSx0aGlzW3RdfHRoaXNbdCsxXTw8OHx0aGlzW3QrMl08PDE2fHRoaXNbdCszXTw8MjR9LHUucHJvdG90eXBlLnJlYWRJbnQzMkJFPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fFAodCw0LHRoaXMubGVuZ3RoKSx0aGlzW3RdPDwyNHx0aGlzW3QrMV08PDE2fHRoaXNbdCsyXTw8OHx0aGlzW3QrM119LHUucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fFAodCw0LHRoaXMubGVuZ3RoKSxpLnJlYWQodGhpcyx0LCEwLDIzLDQpfSx1LnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbih0LGUpe3JldHVybiBlfHxQKHQsNCx0aGlzLmxlbmd0aCksaS5yZWFkKHRoaXMsdCwhMSwyMyw0KX0sdS5wcm90b3R5cGUucmVhZERvdWJsZUxFPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV8fFAodCw4LHRoaXMubGVuZ3RoKSxpLnJlYWQodGhpcyx0LCEwLDUyLDgpfSx1LnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZXx8UCh0LDgsdGhpcy5sZW5ndGgpLGkucmVhZCh0aGlzLHQsITEsNTIsOCl9LHUucHJvdG90eXBlLndyaXRlVUludExFPWZ1bmN0aW9uKHQsZSxuLHIpeyh0PSt0LGV8PTAsbnw9MCxyKXx8Qih0aGlzLHQsZSxuLE1hdGgucG93KDIsOCpuKS0xLDApO3ZhciBpPTEsbz0wO2Zvcih0aGlzW2VdPTI1NSZ0OysrbzxuJiYoaSo9MjU2KTspdGhpc1tlK29dPXQvaSYyNTU7cmV0dXJuIGUrbn0sdS5wcm90b3R5cGUud3JpdGVVSW50QkU9ZnVuY3Rpb24odCxlLG4scil7KHQ9K3QsZXw9MCxufD0wLHIpfHxCKHRoaXMsdCxlLG4sTWF0aC5wb3coMiw4Km4pLTEsMCk7dmFyIGk9bi0xLG89MTtmb3IodGhpc1tlK2ldPTI1NSZ0Oy0taT49MCYmKG8qPTI1Nik7KXRoaXNbZStpXT10L28mMjU1O3JldHVybiBlK259LHUucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PSt0LGV8PTAsbnx8Qih0aGlzLHQsZSwxLDI1NSwwKSx1LlRZUEVEX0FSUkFZX1NVUFBPUlR8fCh0PU1hdGguZmxvb3IodCkpLHRoaXNbZV09MjU1JnQsZSsxfSx1LnByb3RvdHlwZS53cml0ZVVJbnQxNkxFPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD0rdCxlfD0wLG58fEIodGhpcyx0LGUsMiw2NTUzNSwwKSx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHRoaXNbZV09MjU1JnQsdGhpc1tlKzFdPXQ+Pj44KTpMKHRoaXMsdCxlLCEwKSxlKzJ9LHUucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PSt0LGV8PTAsbnx8Qih0aGlzLHQsZSwyLDY1NTM1LDApLHUuVFlQRURfQVJSQVlfU1VQUE9SVD8odGhpc1tlXT10Pj4+OCx0aGlzW2UrMV09MjU1JnQpOkwodGhpcyx0LGUsITEpLGUrMn0sdS5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9K3QsZXw9MCxufHxCKHRoaXMsdCxlLDQsNDI5NDk2NzI5NSwwKSx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHRoaXNbZSszXT10Pj4+MjQsdGhpc1tlKzJdPXQ+Pj4xNix0aGlzW2UrMV09dD4+PjgsdGhpc1tlXT0yNTUmdCk6Qyh0aGlzLHQsZSwhMCksZSs0fSx1LnByb3RvdHlwZS53cml0ZVVJbnQzMkJFPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD0rdCxlfD0wLG58fEIodGhpcyx0LGUsNCw0Mjk0OTY3Mjk1LDApLHUuVFlQRURfQVJSQVlfU1VQUE9SVD8odGhpc1tlXT10Pj4+MjQsdGhpc1tlKzFdPXQ+Pj4xNix0aGlzW2UrMl09dD4+PjgsdGhpc1tlKzNdPTI1NSZ0KTpDKHRoaXMsdCxlLCExKSxlKzR9LHUucHJvdG90eXBlLndyaXRlSW50TEU9ZnVuY3Rpb24odCxlLG4scil7aWYodD0rdCxlfD0wLCFyKXt2YXIgaT1NYXRoLnBvdygyLDgqbi0xKTtCKHRoaXMsdCxlLG4saS0xLC1pKX12YXIgbz0wLHM9MSxhPTA7Zm9yKHRoaXNbZV09MjU1JnQ7KytvPG4mJihzKj0yNTYpOyl0PDAmJjA9PT1hJiYwIT09dGhpc1tlK28tMV0mJihhPTEpLHRoaXNbZStvXT0odC9zPj4wKS1hJjI1NTtyZXR1cm4gZStufSx1LnByb3RvdHlwZS53cml0ZUludEJFPWZ1bmN0aW9uKHQsZSxuLHIpe2lmKHQ9K3QsZXw9MCwhcil7dmFyIGk9TWF0aC5wb3coMiw4Km4tMSk7Qih0aGlzLHQsZSxuLGktMSwtaSl9dmFyIG89bi0xLHM9MSxhPTA7Zm9yKHRoaXNbZStvXT0yNTUmdDstLW8+PTAmJihzKj0yNTYpOyl0PDAmJjA9PT1hJiYwIT09dGhpc1tlK28rMV0mJihhPTEpLHRoaXNbZStvXT0odC9zPj4wKS1hJjI1NTtyZXR1cm4gZStufSx1LnByb3RvdHlwZS53cml0ZUludDg9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PSt0LGV8PTAsbnx8Qih0aGlzLHQsZSwxLDEyNywtMTI4KSx1LlRZUEVEX0FSUkFZX1NVUFBPUlR8fCh0PU1hdGguZmxvb3IodCkpLHQ8MCYmKHQ9MjU1K3QrMSksdGhpc1tlXT0yNTUmdCxlKzF9LHUucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9K3QsZXw9MCxufHxCKHRoaXMsdCxlLDIsMzI3NjcsLTMyNzY4KSx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHRoaXNbZV09MjU1JnQsdGhpc1tlKzFdPXQ+Pj44KTpMKHRoaXMsdCxlLCEwKSxlKzJ9LHUucHJvdG90eXBlLndyaXRlSW50MTZCRT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9K3QsZXw9MCxufHxCKHRoaXMsdCxlLDIsMzI3NjcsLTMyNzY4KSx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHRoaXNbZV09dD4+PjgsdGhpc1tlKzFdPTI1NSZ0KTpMKHRoaXMsdCxlLCExKSxlKzJ9LHUucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9K3QsZXw9MCxufHxCKHRoaXMsdCxlLDQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCksdS5UWVBFRF9BUlJBWV9TVVBQT1JUPyh0aGlzW2VdPTI1NSZ0LHRoaXNbZSsxXT10Pj4+OCx0aGlzW2UrMl09dD4+PjE2LHRoaXNbZSszXT10Pj4+MjQpOkModGhpcyx0LGUsITApLGUrNH0sdS5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD0rdCxlfD0wLG58fEIodGhpcyx0LGUsNCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSx0PDAmJih0PTQyOTQ5NjcyOTUrdCsxKSx1LlRZUEVEX0FSUkFZX1NVUFBPUlQ/KHRoaXNbZV09dD4+PjI0LHRoaXNbZSsxXT10Pj4+MTYsdGhpc1tlKzJdPXQ+Pj44LHRoaXNbZSszXT0yNTUmdCk6Qyh0aGlzLHQsZSwhMSksZSs0fSx1LnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBqKHRoaXMsdCxlLCEwLG4pfSx1LnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBqKHRoaXMsdCxlLCExLG4pfSx1LnByb3RvdHlwZS53cml0ZURvdWJsZUxFPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gTih0aGlzLHQsZSwhMCxuKX0sdS5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIE4odGhpcyx0LGUsITEsbil9LHUucHJvdG90eXBlLmNvcHk9ZnVuY3Rpb24odCxlLG4scil7aWYobnx8KG49MCkscnx8MD09PXJ8fChyPXRoaXMubGVuZ3RoKSxlPj10Lmxlbmd0aCYmKGU9dC5sZW5ndGgpLGV8fChlPTApLHI+MCYmcjxuJiYocj1uKSxyPT09bilyZXR1cm4gMDtpZigwPT09dC5sZW5ndGh8fDA9PT10aGlzLmxlbmd0aClyZXR1cm4gMDtpZihlPDApdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJ0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzXCIpO2lmKG48MHx8bj49dGhpcy5sZW5ndGgpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzXCIpO2lmKHI8MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInNvdXJjZUVuZCBvdXQgb2YgYm91bmRzXCIpO3I+dGhpcy5sZW5ndGgmJihyPXRoaXMubGVuZ3RoKSx0Lmxlbmd0aC1lPHItbiYmKHI9dC5sZW5ndGgtZStuKTt2YXIgaSxvPXItbjtpZih0aGlzPT09dCYmbjxlJiZlPHIpZm9yKGk9by0xO2k+PTA7LS1pKXRbaStlXT10aGlzW2krbl07ZWxzZSBpZihvPDFlM3x8IXUuVFlQRURfQVJSQVlfU1VQUE9SVClmb3IoaT0wO2k8bzsrK2kpdFtpK2VdPXRoaXNbaStuXTtlbHNlIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKHQsdGhpcy5zdWJhcnJheShuLG4rbyksZSk7cmV0dXJuIG99LHUucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24odCxlLG4scil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlPyhyPWUsZT0wLG49dGhpcy5sZW5ndGgpOlwic3RyaW5nXCI9PXR5cGVvZiBuJiYocj1uLG49dGhpcy5sZW5ndGgpLDE9PT10Lmxlbmd0aCl7dmFyIGk9dC5jaGFyQ29kZUF0KDApO2k8MjU2JiYodD1pKX1pZih2b2lkIDAhPT1yJiZcInN0cmluZ1wiIT10eXBlb2Ygcil0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZ1wiKTtpZihcInN0cmluZ1wiPT10eXBlb2YgciYmIXUuaXNFbmNvZGluZyhyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrcil9ZWxzZVwibnVtYmVyXCI9PXR5cGVvZiB0JiYodCY9MjU1KTtpZihlPDB8fHRoaXMubGVuZ3RoPGV8fHRoaXMubGVuZ3RoPG4pdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJPdXQgb2YgcmFuZ2UgaW5kZXhcIik7aWYobjw9ZSlyZXR1cm4gdGhpczt2YXIgbztpZihlPj4+PTAsbj12b2lkIDA9PT1uP3RoaXMubGVuZ3RoOm4+Pj4wLHR8fCh0PTApLFwibnVtYmVyXCI9PXR5cGVvZiB0KWZvcihvPWU7bzxuOysrbyl0aGlzW29dPXQ7ZWxzZXt2YXIgcz11LmlzQnVmZmVyKHQpP3Q6RChuZXcgdSh0LHIpLnRvU3RyaW5nKCkpLGE9cy5sZW5ndGg7Zm9yKG89MDtvPG4tZTsrK28pdGhpc1tvK2VdPXNbbyVhXX1yZXR1cm4gdGhpc307dmFyIFU9L1teK1xcLzAtOUEtWmEtei1fXS9nO2Z1bmN0aW9uIEYodCl7cmV0dXJuIHQ8MTY/XCIwXCIrdC50b1N0cmluZygxNik6dC50b1N0cmluZygxNil9ZnVuY3Rpb24gRCh0LGUpe3ZhciBuO2U9ZXx8MS8wO2Zvcih2YXIgcj10Lmxlbmd0aCxpPW51bGwsbz1bXSxzPTA7czxyOysrcyl7aWYoKG49dC5jaGFyQ29kZUF0KHMpKT41NTI5NSYmbjw1NzM0NCl7aWYoIWkpe2lmKG4+NTYzMTkpeyhlLT0zKT4tMSYmby5wdXNoKDIzOSwxOTEsMTg5KTtjb250aW51ZX1pZihzKzE9PT1yKXsoZS09Myk+LTEmJm8ucHVzaCgyMzksMTkxLDE4OSk7Y29udGludWV9aT1uO2NvbnRpbnVlfWlmKG48NTYzMjApeyhlLT0zKT4tMSYmby5wdXNoKDIzOSwxOTEsMTg5KSxpPW47Y29udGludWV9bj02NTUzNisoaS01NTI5Njw8MTB8bi01NjMyMCl9ZWxzZSBpJiYoZS09Myk+LTEmJm8ucHVzaCgyMzksMTkxLDE4OSk7aWYoaT1udWxsLG48MTI4KXtpZigoZS09MSk8MClicmVhaztvLnB1c2gobil9ZWxzZSBpZihuPDIwNDgpe2lmKChlLT0yKTwwKWJyZWFrO28ucHVzaChuPj42fDE5Miw2MyZufDEyOCl9ZWxzZSBpZihuPDY1NTM2KXtpZigoZS09Myk8MClicmVhaztvLnB1c2gobj4+MTJ8MjI0LG4+PjYmNjN8MTI4LDYzJm58MTI4KX1lbHNle2lmKCEobjwxMTE0MTEyKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNvZGUgcG9pbnRcIik7aWYoKGUtPTQpPDApYnJlYWs7by5wdXNoKG4+PjE4fDI0MCxuPj4xMiY2M3wxMjgsbj4+NiY2M3wxMjgsNjMmbnwxMjgpfX1yZXR1cm4gb31mdW5jdGlvbiBxKHQpe3JldHVybiByLnRvQnl0ZUFycmF5KGZ1bmN0aW9uKHQpe2lmKCh0PWZ1bmN0aW9uKHQpe3JldHVybiB0LnRyaW0/dC50cmltKCk6dC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfSh0KS5yZXBsYWNlKFUsXCJcIikpLmxlbmd0aDwyKXJldHVyblwiXCI7Zm9yKDt0Lmxlbmd0aCU0IT0wOyl0Kz1cIj1cIjtyZXR1cm4gdH0odCkpfWZ1bmN0aW9uIFcodCxlLG4scil7Zm9yKHZhciBpPTA7aTxyJiYhKGkrbj49ZS5sZW5ndGh8fGk+PXQubGVuZ3RoKTsrK2kpZVtpK25dPXRbaV07cmV0dXJuIGl9fSkuY2FsbCh0aGlzLG4oNykpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHIsaT1cIm9iamVjdFwiPT10eXBlb2YgUmVmbGVjdD9SZWZsZWN0Om51bGwsbz1pJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBpLmFwcGx5P2kuYXBwbHk6ZnVuY3Rpb24odCxlLG4pe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0LGUsbil9O3I9aSYmXCJmdW5jdGlvblwiPT10eXBlb2YgaS5vd25LZXlzP2kub3duS2V5czpPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzP2Z1bmN0aW9uKHQpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0KSl9OmZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KX07dmFyIHM9TnVtYmVyLmlzTmFOfHxmdW5jdGlvbih0KXtyZXR1cm4gdCE9dH07ZnVuY3Rpb24gYSgpe2EuaW5pdC5jYWxsKHRoaXMpfXQuZXhwb3J0cz1hLGEuRXZlbnRFbWl0dGVyPWEsYS5wcm90b3R5cGUuX2V2ZW50cz12b2lkIDAsYS5wcm90b3R5cGUuX2V2ZW50c0NvdW50PTAsYS5wcm90b3R5cGUuX21heExpc3RlbmVycz12b2lkIDA7dmFyIHU9MTA7ZnVuY3Rpb24gYyh0KXtyZXR1cm4gdm9pZCAwPT09dC5fbWF4TGlzdGVuZXJzP2EuZGVmYXVsdE1heExpc3RlbmVyczp0Ll9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gaCh0LGUsbixyKXt2YXIgaSxvLHMsYTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIG4pO2lmKHZvaWQgMD09PShvPXQuX2V2ZW50cyk/KG89dC5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdC5fZXZlbnRzQ291bnQ9MCk6KHZvaWQgMCE9PW8ubmV3TGlzdGVuZXImJih0LmVtaXQoXCJuZXdMaXN0ZW5lclwiLGUsbi5saXN0ZW5lcj9uLmxpc3RlbmVyOm4pLG89dC5fZXZlbnRzKSxzPW9bZV0pLHZvaWQgMD09PXMpcz1vW2VdPW4sKyt0Ll9ldmVudHNDb3VudDtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHM/cz1vW2VdPXI/W24sc106W3Msbl06cj9zLnVuc2hpZnQobik6cy5wdXNoKG4pLChpPWModCkpPjAmJnMubGVuZ3RoPmkmJiFzLndhcm5lZCl7cy53YXJuZWQ9ITA7dmFyIHU9bmV3IEVycm9yKFwiUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiBcIitzLmxlbmd0aCtcIiBcIitTdHJpbmcoZSkrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTt1Lm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIix1LmVtaXR0ZXI9dCx1LnR5cGU9ZSx1LmNvdW50PXMubGVuZ3RoLGE9dSxjb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybihhKX1yZXR1cm4gdH1mdW5jdGlvbiBmKHQsZSxuKXt2YXIgcj17ZmlyZWQ6ITEsd3JhcEZuOnZvaWQgMCx0YXJnZXQ6dCx0eXBlOmUsbGlzdGVuZXI6bn0saT1mdW5jdGlvbigpe2Zvcih2YXIgdD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl0LnB1c2goYXJndW1lbnRzW2VdKTt0aGlzLmZpcmVkfHwodGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLG8odGhpcy5saXN0ZW5lcix0aGlzLnRhcmdldCx0KSl9LmJpbmQocik7cmV0dXJuIGkubGlzdGVuZXI9bixyLndyYXBGbj1pLGl9ZnVuY3Rpb24gbCh0LGUsbil7dmFyIHI9dC5fZXZlbnRzO2lmKHZvaWQgMD09PXIpcmV0dXJuW107dmFyIGk9cltlXTtyZXR1cm4gdm9pZCAwPT09aT9bXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBpP24/W2kubGlzdGVuZXJ8fGldOltpXTpuP2Z1bmN0aW9uKHQpe2Zvcih2YXIgZT1uZXcgQXJyYXkodC5sZW5ndGgpLG49MDtuPGUubGVuZ3RoOysrbillW25dPXRbbl0ubGlzdGVuZXJ8fHRbbl07cmV0dXJuIGV9KGkpOnAoaSxpLmxlbmd0aCl9ZnVuY3Rpb24gZCh0KXt2YXIgZT10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09ZSl7dmFyIG49ZVt0XTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXJldHVybiAxO2lmKHZvaWQgMCE9PW4pcmV0dXJuIG4ubGVuZ3RofXJldHVybiAwfWZ1bmN0aW9uIHAodCxlKXtmb3IodmFyIG49bmV3IEFycmF5KGUpLHI9MDtyPGU7KytyKW5bcl09dFtyXTtyZXR1cm4gbn1PYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdX0sc2V0OmZ1bmN0aW9uKHQpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0fHx0PDB8fHModCkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK3QrXCIuXCIpO3U9dH19KSxhLmluaXQ9ZnVuY3Rpb24oKXt2b2lkIDAhPT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCksdGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dm9pZCAwfSxhLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24odCl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIHR8fHQ8MHx8cyh0KSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrdCtcIi5cIik7cmV0dXJuIHRoaXMuX21heExpc3RlbmVycz10LHRoaXN9LGEucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiBjKHRoaXMpfSxhLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1bXSxuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyllLnB1c2goYXJndW1lbnRzW25dKTt2YXIgcj1cImVycm9yXCI9PT10LGk9dGhpcy5fZXZlbnRzO2lmKHZvaWQgMCE9PWkpcj1yJiZ2b2lkIDA9PT1pLmVycm9yO2Vsc2UgaWYoIXIpcmV0dXJuITE7aWYocil7dmFyIHM7aWYoZS5sZW5ndGg+MCYmKHM9ZVswXSkscyBpbnN0YW5jZW9mIEVycm9yKXRocm93IHM7dmFyIGE9bmV3IEVycm9yKFwiVW5oYW5kbGVkIGVycm9yLlwiKyhzP1wiIChcIitzLm1lc3NhZ2UrXCIpXCI6XCJcIikpO3Rocm93IGEuY29udGV4dD1zLGF9dmFyIHU9aVt0XTtpZih2b2lkIDA9PT11KXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHUpbyh1LHRoaXMsZSk7ZWxzZXt2YXIgYz11Lmxlbmd0aCxoPXAodSxjKTtmb3Iobj0wO248YzsrK24pbyhoW25dLHRoaXMsZSl9cmV0dXJuITB9LGEucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGgodGhpcyx0LGUsITEpfSxhLnByb3RvdHlwZS5vbj1hLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixhLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gaCh0aGlzLHQsZSwhMCl9LGEucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO3JldHVybiB0aGlzLm9uKHQsZih0aGlzLHQsZSkpLHRoaXN9LGEucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO3JldHVybiB0aGlzLnByZXBlbmRMaXN0ZW5lcih0LGYodGhpcyx0LGUpKSx0aGlzfSxhLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbih0LGUpe3ZhciBuLHIsaSxvLHM7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKTtpZih2b2lkIDA9PT0ocj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PShuPXJbdF0pKXJldHVybiB0aGlzO2lmKG49PT1lfHxuLmxpc3RlbmVyPT09ZSkwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOihkZWxldGUgclt0XSxyLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHQsbi5saXN0ZW5lcnx8ZSkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil7Zm9yKGk9LTEsbz1uLmxlbmd0aC0xO28+PTA7by0tKWlmKG5bb109PT1lfHxuW29dLmxpc3RlbmVyPT09ZSl7cz1uW29dLmxpc3RlbmVyLGk9bzticmVha31pZihpPDApcmV0dXJuIHRoaXM7MD09PWk/bi5zaGlmdCgpOmZ1bmN0aW9uKHQsZSl7Zm9yKDtlKzE8dC5sZW5ndGg7ZSsrKXRbZV09dFtlKzFdO3QucG9wKCl9KG4saSksMT09PW4ubGVuZ3RoJiYoclt0XT1uWzBdKSx2b2lkIDAhPT1yLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHQsc3x8ZSl9cmV0dXJuIHRoaXN9LGEucHJvdG90eXBlLm9mZj1hLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcixhLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24odCl7dmFyIGUsbixyO2lmKHZvaWQgMD09PShuPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09bi5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApOnZvaWQgMCE9PW5bdF0mJigwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOmRlbGV0ZSBuW3RdKSx0aGlzO2lmKDA9PT1hcmd1bWVudHMubGVuZ3RoKXt2YXIgaSxvPU9iamVjdC5rZXlzKG4pO2ZvcihyPTA7cjxvLmxlbmd0aDsrK3IpXCJyZW1vdmVMaXN0ZW5lclwiIT09KGk9b1tyXSkmJnRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGkpO3JldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpLHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTAsdGhpc31pZihcImZ1bmN0aW9uXCI9PXR5cGVvZihlPW5bdF0pKXRoaXMucmVtb3ZlTGlzdGVuZXIodCxlKTtlbHNlIGlmKHZvaWQgMCE9PWUpZm9yKHI9ZS5sZW5ndGgtMTtyPj0wO3ItLSl0aGlzLnJlbW92ZUxpc3RlbmVyKHQsZVtyXSk7cmV0dXJuIHRoaXN9LGEucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm4gbCh0aGlzLHQsITApfSxhLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnM9ZnVuY3Rpb24odCl7cmV0dXJuIGwodGhpcyx0LCExKX0sYS5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKHQsZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdC5saXN0ZW5lckNvdW50P3QubGlzdGVuZXJDb3VudChlKTpkLmNhbGwodCxlKX0sYS5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1kLGEucHJvdG90eXBlLmV2ZW50TmFtZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQ+MD9yKHRoaXMuX2V2ZW50cyk6W119fSxmdW5jdGlvbih0LGUsbil7KGU9dC5leHBvcnRzPW4oMjUpKS5TdHJlYW09ZSxlLlJlYWRhYmxlPWUsZS5Xcml0YWJsZT1uKDE5KSxlLkR1cGxleD1uKDgpLGUuVHJhbnNmb3JtPW4oMjgpLGUuUGFzc1Rocm91Z2g9big1MCl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oZSxyLGkpe3ZhciBvPW4oMTIpO2Z1bmN0aW9uIHModCl7dmFyIGU9dGhpczt0aGlzLm5leHQ9bnVsbCx0aGlzLmVudHJ5PW51bGwsdGhpcy5maW5pc2g9ZnVuY3Rpb24oKXshZnVuY3Rpb24odCxlLG4pe3ZhciByPXQuZW50cnk7dC5lbnRyeT1udWxsO2Zvcig7cjspe3ZhciBpPXIuY2FsbGJhY2s7ZS5wZW5kaW5nY2ItLSxpKG4pLHI9ci5uZXh0fWUuY29ya2VkUmVxdWVzdHNGcmVlP2UuY29ya2VkUmVxdWVzdHNGcmVlLm5leHQ9dDplLmNvcmtlZFJlcXVlc3RzRnJlZT10fShlLHQpfX10LmV4cG9ydHM9dzt2YXIgYSx1PSFlLmJyb3dzZXImJltcInYwLjEwXCIsXCJ2MC45LlwiXS5pbmRleE9mKGUudmVyc2lvbi5zbGljZSgwLDUpKT4tMT9yOm8ubmV4dFRpY2s7dy5Xcml0YWJsZVN0YXRlPXY7dmFyIGM9bigxMCk7Yy5pbmhlcml0cz1uKDQpO3ZhciBoPXtkZXByZWNhdGU6big0OSl9LGY9bigyNiksbD1uKDYpLkJ1ZmZlcixkPWkuVWludDhBcnJheXx8ZnVuY3Rpb24oKXt9O3ZhciBwLGc9bigyNyk7ZnVuY3Rpb24geSgpe31mdW5jdGlvbiB2KHQsZSl7YT1hfHxuKDgpLHQ9dHx8e307dmFyIHI9ZSBpbnN0YW5jZW9mIGE7dGhpcy5vYmplY3RNb2RlPSEhdC5vYmplY3RNb2RlLHImJih0aGlzLm9iamVjdE1vZGU9dGhpcy5vYmplY3RNb2RlfHwhIXQud3JpdGFibGVPYmplY3RNb2RlKTt2YXIgaT10LmhpZ2hXYXRlck1hcmssYz10LndyaXRhYmxlSGlnaFdhdGVyTWFyayxoPXRoaXMub2JqZWN0TW9kZT8xNjoxNjM4NDt0aGlzLmhpZ2hXYXRlck1hcms9aXx8MD09PWk/aTpyJiYoY3x8MD09PWMpP2M6aCx0aGlzLmhpZ2hXYXRlck1hcms9TWF0aC5mbG9vcih0aGlzLmhpZ2hXYXRlck1hcmspLHRoaXMuZmluYWxDYWxsZWQ9ITEsdGhpcy5uZWVkRHJhaW49ITEsdGhpcy5lbmRpbmc9ITEsdGhpcy5lbmRlZD0hMSx0aGlzLmZpbmlzaGVkPSExLHRoaXMuZGVzdHJveWVkPSExO3ZhciBmPSExPT09dC5kZWNvZGVTdHJpbmdzO3RoaXMuZGVjb2RlU3RyaW5ncz0hZix0aGlzLmRlZmF1bHRFbmNvZGluZz10LmRlZmF1bHRFbmNvZGluZ3x8XCJ1dGY4XCIsdGhpcy5sZW5ndGg9MCx0aGlzLndyaXRpbmc9ITEsdGhpcy5jb3JrZWQ9MCx0aGlzLnN5bmM9ITAsdGhpcy5idWZmZXJQcm9jZXNzaW5nPSExLHRoaXMub253cml0ZT1mdW5jdGlvbih0KXshZnVuY3Rpb24odCxlKXt2YXIgbj10Ll93cml0YWJsZVN0YXRlLHI9bi5zeW5jLGk9bi53cml0ZWNiO2lmKGZ1bmN0aW9uKHQpe3Qud3JpdGluZz0hMSx0LndyaXRlY2I9bnVsbCx0Lmxlbmd0aC09dC53cml0ZWxlbix0LndyaXRlbGVuPTB9KG4pLGUpIWZ1bmN0aW9uKHQsZSxuLHIsaSl7LS1lLnBlbmRpbmdjYixuPyhvLm5leHRUaWNrKGksciksby5uZXh0VGljayhTLHQsZSksdC5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQ9ITAsdC5lbWl0KFwiZXJyb3JcIixyKSk6KGkociksdC5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQ9ITAsdC5lbWl0KFwiZXJyb3JcIixyKSxTKHQsZSkpfSh0LG4scixlLGkpO2Vsc2V7dmFyIHM9ayhuKTtzfHxuLmNvcmtlZHx8bi5idWZmZXJQcm9jZXNzaW5nfHwhbi5idWZmZXJlZFJlcXVlc3R8fG0odCxuKSxyP3UoYix0LG4scyxpKTpiKHQsbixzLGkpfX0oZSx0KX0sdGhpcy53cml0ZWNiPW51bGwsdGhpcy53cml0ZWxlbj0wLHRoaXMuYnVmZmVyZWRSZXF1ZXN0PW51bGwsdGhpcy5sYXN0QnVmZmVyZWRSZXF1ZXN0PW51bGwsdGhpcy5wZW5kaW5nY2I9MCx0aGlzLnByZWZpbmlzaGVkPSExLHRoaXMuZXJyb3JFbWl0dGVkPSExLHRoaXMuYnVmZmVyZWRSZXF1ZXN0Q291bnQ9MCx0aGlzLmNvcmtlZFJlcXVlc3RzRnJlZT1uZXcgcyh0aGlzKX1mdW5jdGlvbiB3KHQpe2lmKGE9YXx8big4KSwhKHAuY2FsbCh3LHRoaXMpfHx0aGlzIGluc3RhbmNlb2YgYSkpcmV0dXJuIG5ldyB3KHQpO3RoaXMuX3dyaXRhYmxlU3RhdGU9bmV3IHYodCx0aGlzKSx0aGlzLndyaXRhYmxlPSEwLHQmJihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LndyaXRlJiYodGhpcy5fd3JpdGU9dC53cml0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgdC53cml0ZXYmJih0aGlzLl93cml0ZXY9dC53cml0ZXYpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuZGVzdHJveSYmKHRoaXMuX2Rlc3Ryb3k9dC5kZXN0cm95KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmZpbmFsJiYodGhpcy5fZmluYWw9dC5maW5hbCkpLGYuY2FsbCh0aGlzKX1mdW5jdGlvbiBfKHQsZSxuLHIsaSxvLHMpe2Uud3JpdGVsZW49cixlLndyaXRlY2I9cyxlLndyaXRpbmc9ITAsZS5zeW5jPSEwLG4/dC5fd3JpdGV2KGksZS5vbndyaXRlKTp0Ll93cml0ZShpLG8sZS5vbndyaXRlKSxlLnN5bmM9ITF9ZnVuY3Rpb24gYih0LGUsbixyKXtufHxmdW5jdGlvbih0LGUpezA9PT1lLmxlbmd0aCYmZS5uZWVkRHJhaW4mJihlLm5lZWREcmFpbj0hMSx0LmVtaXQoXCJkcmFpblwiKSl9KHQsZSksZS5wZW5kaW5nY2ItLSxyKCksUyh0LGUpfWZ1bmN0aW9uIG0odCxlKXtlLmJ1ZmZlclByb2Nlc3Npbmc9ITA7dmFyIG49ZS5idWZmZXJlZFJlcXVlc3Q7aWYodC5fd3JpdGV2JiZuJiZuLm5leHQpe3ZhciByPWUuYnVmZmVyZWRSZXF1ZXN0Q291bnQsaT1uZXcgQXJyYXkociksbz1lLmNvcmtlZFJlcXVlc3RzRnJlZTtvLmVudHJ5PW47Zm9yKHZhciBhPTAsdT0hMDtuOylpW2FdPW4sbi5pc0J1Znx8KHU9ITEpLG49bi5uZXh0LGErPTE7aS5hbGxCdWZmZXJzPXUsXyh0LGUsITAsZS5sZW5ndGgsaSxcIlwiLG8uZmluaXNoKSxlLnBlbmRpbmdjYisrLGUubGFzdEJ1ZmZlcmVkUmVxdWVzdD1udWxsLG8ubmV4dD8oZS5jb3JrZWRSZXF1ZXN0c0ZyZWU9by5uZXh0LG8ubmV4dD1udWxsKTplLmNvcmtlZFJlcXVlc3RzRnJlZT1uZXcgcyhlKSxlLmJ1ZmZlcmVkUmVxdWVzdENvdW50PTB9ZWxzZXtmb3IoO247KXt2YXIgYz1uLmNodW5rLGg9bi5lbmNvZGluZyxmPW4uY2FsbGJhY2s7aWYoXyh0LGUsITEsZS5vYmplY3RNb2RlPzE6Yy5sZW5ndGgsYyxoLGYpLG49bi5uZXh0LGUuYnVmZmVyZWRSZXF1ZXN0Q291bnQtLSxlLndyaXRpbmcpYnJlYWt9bnVsbD09PW4mJihlLmxhc3RCdWZmZXJlZFJlcXVlc3Q9bnVsbCl9ZS5idWZmZXJlZFJlcXVlc3Q9bixlLmJ1ZmZlclByb2Nlc3Npbmc9ITF9ZnVuY3Rpb24gayh0KXtyZXR1cm4gdC5lbmRpbmcmJjA9PT10Lmxlbmd0aCYmbnVsbD09PXQuYnVmZmVyZWRSZXF1ZXN0JiYhdC5maW5pc2hlZCYmIXQud3JpdGluZ31mdW5jdGlvbiBFKHQsZSl7dC5fZmluYWwoZnVuY3Rpb24obil7ZS5wZW5kaW5nY2ItLSxuJiZ0LmVtaXQoXCJlcnJvclwiLG4pLGUucHJlZmluaXNoZWQ9ITAsdC5lbWl0KFwicHJlZmluaXNoXCIpLFModCxlKX0pfWZ1bmN0aW9uIFModCxlKXt2YXIgbj1rKGUpO3JldHVybiBuJiYoIWZ1bmN0aW9uKHQsZSl7ZS5wcmVmaW5pc2hlZHx8ZS5maW5hbENhbGxlZHx8KFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuX2ZpbmFsPyhlLnBlbmRpbmdjYisrLGUuZmluYWxDYWxsZWQ9ITAsby5uZXh0VGljayhFLHQsZSkpOihlLnByZWZpbmlzaGVkPSEwLHQuZW1pdChcInByZWZpbmlzaFwiKSkpfSh0LGUpLDA9PT1lLnBlbmRpbmdjYiYmKGUuZmluaXNoZWQ9ITAsdC5lbWl0KFwiZmluaXNoXCIpKSksbn1jLmluaGVyaXRzKHcsZiksdi5wcm90b3R5cGUuZ2V0QnVmZmVyPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMuYnVmZmVyZWRSZXF1ZXN0LGU9W107dDspZS5wdXNoKHQpLHQ9dC5uZXh0O3JldHVybiBlfSxmdW5jdGlvbigpe3RyeXtPYmplY3QuZGVmaW5lUHJvcGVydHkodi5wcm90b3R5cGUsXCJidWZmZXJcIix7Z2V0OmguZGVwcmVjYXRlKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0QnVmZmVyKCl9LFwiX3dyaXRhYmxlU3RhdGUuYnVmZmVyIGlzIGRlcHJlY2F0ZWQuIFVzZSBfd3JpdGFibGVTdGF0ZS5nZXRCdWZmZXIgaW5zdGVhZC5cIixcIkRFUDAwMDNcIil9KX1jYXRjaCh0KXt9fSgpLFwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmhhc0luc3RhbmNlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXT8ocD1GdW5jdGlvbi5wcm90b3R5cGVbU3ltYm9sLmhhc0luc3RhbmNlXSxPYmplY3QuZGVmaW5lUHJvcGVydHkodyxTeW1ib2wuaGFzSW5zdGFuY2Use3ZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiEhcC5jYWxsKHRoaXMsdCl8fHRoaXM9PT13JiYodCYmdC5fd3JpdGFibGVTdGF0ZSBpbnN0YW5jZW9mIHYpfX0pKTpwPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgdGhpc30sdy5wcm90b3R5cGUucGlwZT1mdW5jdGlvbigpe3RoaXMuZW1pdChcImVycm9yXCIsbmV3IEVycm9yKFwiQ2Fubm90IHBpcGUsIG5vdCByZWFkYWJsZVwiKSl9LHcucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcixpPXRoaXMuX3dyaXRhYmxlU3RhdGUscz0hMSxhPSFpLm9iamVjdE1vZGUmJihyPXQsbC5pc0J1ZmZlcihyKXx8ciBpbnN0YW5jZW9mIGQpO3JldHVybiBhJiYhbC5pc0J1ZmZlcih0KSYmKHQ9ZnVuY3Rpb24odCl7cmV0dXJuIGwuZnJvbSh0KX0odCkpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUsZT1udWxsKSxhP2U9XCJidWZmZXJcIjplfHwoZT1pLmRlZmF1bHRFbmNvZGluZyksXCJmdW5jdGlvblwiIT10eXBlb2YgbiYmKG49eSksaS5lbmRlZD9mdW5jdGlvbih0LGUpe3ZhciBuPW5ldyBFcnJvcihcIndyaXRlIGFmdGVyIGVuZFwiKTt0LmVtaXQoXCJlcnJvclwiLG4pLG8ubmV4dFRpY2soZSxuKX0odGhpcyxuKTooYXx8ZnVuY3Rpb24odCxlLG4scil7dmFyIGk9ITAscz0hMTtyZXR1cm4gbnVsbD09PW4/cz1uZXcgVHlwZUVycm9yKFwiTWF5IG5vdCB3cml0ZSBudWxsIHZhbHVlcyB0byBzdHJlYW1cIik6XCJzdHJpbmdcIj09dHlwZW9mIG58fHZvaWQgMD09PW58fGUub2JqZWN0TW9kZXx8KHM9bmV3IFR5cGVFcnJvcihcIkludmFsaWQgbm9uLXN0cmluZy9idWZmZXIgY2h1bmtcIikpLHMmJih0LmVtaXQoXCJlcnJvclwiLHMpLG8ubmV4dFRpY2socixzKSxpPSExKSxpfSh0aGlzLGksdCxuKSkmJihpLnBlbmRpbmdjYisrLHM9ZnVuY3Rpb24odCxlLG4scixpLG8pe2lmKCFuKXt2YXIgcz1mdW5jdGlvbih0LGUsbil7dC5vYmplY3RNb2RlfHwhMT09PXQuZGVjb2RlU3RyaW5nc3x8XCJzdHJpbmdcIiE9dHlwZW9mIGV8fChlPWwuZnJvbShlLG4pKTtyZXR1cm4gZX0oZSxyLGkpO3IhPT1zJiYobj0hMCxpPVwiYnVmZmVyXCIscj1zKX12YXIgYT1lLm9iamVjdE1vZGU/MTpyLmxlbmd0aDtlLmxlbmd0aCs9YTt2YXIgdT1lLmxlbmd0aDxlLmhpZ2hXYXRlck1hcms7dXx8KGUubmVlZERyYWluPSEwKTtpZihlLndyaXRpbmd8fGUuY29ya2VkKXt2YXIgYz1lLmxhc3RCdWZmZXJlZFJlcXVlc3Q7ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0PXtjaHVuazpyLGVuY29kaW5nOmksaXNCdWY6bixjYWxsYmFjazpvLG5leHQ6bnVsbH0sYz9jLm5leHQ9ZS5sYXN0QnVmZmVyZWRSZXF1ZXN0OmUuYnVmZmVyZWRSZXF1ZXN0PWUubGFzdEJ1ZmZlcmVkUmVxdWVzdCxlLmJ1ZmZlcmVkUmVxdWVzdENvdW50Kz0xfWVsc2UgXyh0LGUsITEsYSxyLGksbyk7cmV0dXJuIHV9KHRoaXMsaSxhLHQsZSxuKSksc30sdy5wcm90b3R5cGUuY29yaz1mdW5jdGlvbigpe3RoaXMuX3dyaXRhYmxlU3RhdGUuY29ya2VkKyt9LHcucHJvdG90eXBlLnVuY29yaz1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX3dyaXRhYmxlU3RhdGU7dC5jb3JrZWQmJih0LmNvcmtlZC0tLHQud3JpdGluZ3x8dC5jb3JrZWR8fHQuZmluaXNoZWR8fHQuYnVmZmVyUHJvY2Vzc2luZ3x8IXQuYnVmZmVyZWRSZXF1ZXN0fHxtKHRoaXMsdCkpfSx3LnByb3RvdHlwZS5zZXREZWZhdWx0RW5jb2Rpbmc9ZnVuY3Rpb24odCl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXQudG9Mb3dlckNhc2UoKSksIShbXCJoZXhcIixcInV0ZjhcIixcInV0Zi04XCIsXCJhc2NpaVwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIixcInVjczJcIixcInVjcy0yXCIsXCJ1dGYxNmxlXCIsXCJ1dGYtMTZsZVwiLFwicmF3XCJdLmluZGV4T2YoKHQrXCJcIikudG9Mb3dlckNhc2UoKSk+LTEpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIit0KTtyZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5kZWZhdWx0RW5jb2Rpbmc9dCx0aGlzfSxPYmplY3QuZGVmaW5lUHJvcGVydHkody5wcm90b3R5cGUsXCJ3cml0YWJsZUhpZ2hXYXRlck1hcmtcIix7ZW51bWVyYWJsZTohMSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JpdGFibGVTdGF0ZS5oaWdoV2F0ZXJNYXJrfX0pLHcucHJvdG90eXBlLl93cml0ZT1mdW5jdGlvbih0LGUsbil7bihuZXcgRXJyb3IoXCJfd3JpdGUoKSBpcyBub3QgaW1wbGVtZW50ZWRcIikpfSx3LnByb3RvdHlwZS5fd3JpdGV2PW51bGwsdy5wcm90b3R5cGUuZW5kPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10aGlzLl93cml0YWJsZVN0YXRlO1wiZnVuY3Rpb25cIj09dHlwZW9mIHQ/KG49dCx0PW51bGwsZT1udWxsKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lLGU9bnVsbCksbnVsbCE9dCYmdGhpcy53cml0ZSh0LGUpLHIuY29ya2VkJiYoci5jb3JrZWQ9MSx0aGlzLnVuY29yaygpKSxyLmVuZGluZ3x8ci5maW5pc2hlZHx8ZnVuY3Rpb24odCxlLG4pe2UuZW5kaW5nPSEwLFModCxlKSxuJiYoZS5maW5pc2hlZD9vLm5leHRUaWNrKG4pOnQub25jZShcImZpbmlzaFwiLG4pKTtlLmVuZGVkPSEwLHQud3JpdGFibGU9ITF9KHRoaXMscixuKX0sT2JqZWN0LmRlZmluZVByb3BlcnR5KHcucHJvdG90eXBlLFwiZGVzdHJveWVkXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB2b2lkIDAhPT10aGlzLl93cml0YWJsZVN0YXRlJiZ0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZH0sc2V0OmZ1bmN0aW9uKHQpe3RoaXMuX3dyaXRhYmxlU3RhdGUmJih0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZD10KX19KSx3LnByb3RvdHlwZS5kZXN0cm95PWcuZGVzdHJveSx3LnByb3RvdHlwZS5fdW5kZXN0cm95PWcudW5kZXN0cm95LHcucHJvdG90eXBlLl9kZXN0cm95PWZ1bmN0aW9uKHQsZSl7dGhpcy5lbmQoKSxlKHQpfX0pLmNhbGwodGhpcyxuKDExKSxuKDQ3KS5zZXRJbW1lZGlhdGUsbig3KSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDYpLkJ1ZmZlcixpPXIuaXNFbmNvZGluZ3x8ZnVuY3Rpb24odCl7c3dpdGNoKCh0PVwiXCIrdCkmJnQudG9Mb3dlckNhc2UoKSl7Y2FzZVwiaGV4XCI6Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJiYXNlNjRcIjpjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpjYXNlXCJyYXdcIjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiExfX07ZnVuY3Rpb24gbyh0KXt2YXIgZTtzd2l0Y2godGhpcy5lbmNvZGluZz1mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbih0KXtpZighdClyZXR1cm5cInV0ZjhcIjtmb3IodmFyIGU7Oylzd2l0Y2godCl7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6cmV0dXJuXCJ1dGY4XCI7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuXCJ1dGYxNmxlXCI7Y2FzZVwibGF0aW4xXCI6Y2FzZVwiYmluYXJ5XCI6cmV0dXJuXCJsYXRpbjFcIjtjYXNlXCJiYXNlNjRcIjpjYXNlXCJhc2NpaVwiOmNhc2VcImhleFwiOnJldHVybiB0O2RlZmF1bHQ6aWYoZSlyZXR1cm47dD0oXCJcIit0KS50b0xvd2VyQ2FzZSgpLGU9ITB9fSh0KTtpZihcInN0cmluZ1wiIT10eXBlb2YgZSYmKHIuaXNFbmNvZGluZz09PWl8fCFpKHQpKSl0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIit0KTtyZXR1cm4gZXx8dH0odCksdGhpcy5lbmNvZGluZyl7Y2FzZVwidXRmMTZsZVwiOnRoaXMudGV4dD11LHRoaXMuZW5kPWMsZT00O2JyZWFrO2Nhc2VcInV0ZjhcIjp0aGlzLmZpbGxMYXN0PWEsZT00O2JyZWFrO2Nhc2VcImJhc2U2NFwiOnRoaXMudGV4dD1oLHRoaXMuZW5kPWYsZT0zO2JyZWFrO2RlZmF1bHQ6cmV0dXJuIHRoaXMud3JpdGU9bCx2b2lkKHRoaXMuZW5kPWQpfXRoaXMubGFzdE5lZWQ9MCx0aGlzLmxhc3RUb3RhbD0wLHRoaXMubGFzdENoYXI9ci5hbGxvY1Vuc2FmZShlKX1mdW5jdGlvbiBzKHQpe3JldHVybiB0PD0xMjc/MDp0Pj41PT02PzI6dD4+ND09MTQ/Mzp0Pj4zPT0zMD80OnQ+PjY9PTI/LTE6LTJ9ZnVuY3Rpb24gYSh0KXt2YXIgZT10aGlzLmxhc3RUb3RhbC10aGlzLmxhc3ROZWVkLG49ZnVuY3Rpb24odCxlLG4pe2lmKDEyOCE9KDE5MiZlWzBdKSlyZXR1cm4gdC5sYXN0TmVlZD0wLFwi77+9XCI7aWYodC5sYXN0TmVlZD4xJiZlLmxlbmd0aD4xKXtpZigxMjghPSgxOTImZVsxXSkpcmV0dXJuIHQubGFzdE5lZWQ9MSxcIu+/vVwiO2lmKHQubGFzdE5lZWQ+MiYmZS5sZW5ndGg+MiYmMTI4IT0oMTkyJmVbMl0pKXJldHVybiB0Lmxhc3ROZWVkPTIsXCLvv71cIn19KHRoaXMsdCk7cmV0dXJuIHZvaWQgMCE9PW4/bjp0aGlzLmxhc3ROZWVkPD10Lmxlbmd0aD8odC5jb3B5KHRoaXMubGFzdENoYXIsZSwwLHRoaXMubGFzdE5lZWQpLHRoaXMubGFzdENoYXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywwLHRoaXMubGFzdFRvdGFsKSk6KHQuY29weSh0aGlzLmxhc3RDaGFyLGUsMCx0Lmxlbmd0aCksdm9pZCh0aGlzLmxhc3ROZWVkLT10Lmxlbmd0aCkpfWZ1bmN0aW9uIHUodCxlKXtpZigodC5sZW5ndGgtZSklMj09MCl7dmFyIG49dC50b1N0cmluZyhcInV0ZjE2bGVcIixlKTtpZihuKXt2YXIgcj1uLmNoYXJDb2RlQXQobi5sZW5ndGgtMSk7aWYocj49NTUyOTYmJnI8PTU2MzE5KXJldHVybiB0aGlzLmxhc3ROZWVkPTIsdGhpcy5sYXN0VG90YWw9NCx0aGlzLmxhc3RDaGFyWzBdPXRbdC5sZW5ndGgtMl0sdGhpcy5sYXN0Q2hhclsxXT10W3QubGVuZ3RoLTFdLG4uc2xpY2UoMCwtMSl9cmV0dXJuIG59cmV0dXJuIHRoaXMubGFzdE5lZWQ9MSx0aGlzLmxhc3RUb3RhbD0yLHRoaXMubGFzdENoYXJbMF09dFt0Lmxlbmd0aC0xXSx0LnRvU3RyaW5nKFwidXRmMTZsZVwiLGUsdC5sZW5ndGgtMSl9ZnVuY3Rpb24gYyh0KXt2YXIgZT10JiZ0Lmxlbmd0aD90aGlzLndyaXRlKHQpOlwiXCI7aWYodGhpcy5sYXN0TmVlZCl7dmFyIG49dGhpcy5sYXN0VG90YWwtdGhpcy5sYXN0TmVlZDtyZXR1cm4gZSt0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKFwidXRmMTZsZVwiLDAsbil9cmV0dXJuIGV9ZnVuY3Rpb24gaCh0LGUpe3ZhciBuPSh0Lmxlbmd0aC1lKSUzO3JldHVybiAwPT09bj90LnRvU3RyaW5nKFwiYmFzZTY0XCIsZSk6KHRoaXMubGFzdE5lZWQ9My1uLHRoaXMubGFzdFRvdGFsPTMsMT09PW4/dGhpcy5sYXN0Q2hhclswXT10W3QubGVuZ3RoLTFdOih0aGlzLmxhc3RDaGFyWzBdPXRbdC5sZW5ndGgtMl0sdGhpcy5sYXN0Q2hhclsxXT10W3QubGVuZ3RoLTFdKSx0LnRvU3RyaW5nKFwiYmFzZTY0XCIsZSx0Lmxlbmd0aC1uKSl9ZnVuY3Rpb24gZih0KXt2YXIgZT10JiZ0Lmxlbmd0aD90aGlzLndyaXRlKHQpOlwiXCI7cmV0dXJuIHRoaXMubGFzdE5lZWQ/ZSt0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKFwiYmFzZTY0XCIsMCwzLXRoaXMubGFzdE5lZWQpOmV9ZnVuY3Rpb24gbCh0KXtyZXR1cm4gdC50b1N0cmluZyh0aGlzLmVuY29kaW5nKX1mdW5jdGlvbiBkKHQpe3JldHVybiB0JiZ0Lmxlbmd0aD90aGlzLndyaXRlKHQpOlwiXCJ9ZS5TdHJpbmdEZWNvZGVyPW8sby5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24odCl7aWYoMD09PXQubGVuZ3RoKXJldHVyblwiXCI7dmFyIGUsbjtpZih0aGlzLmxhc3ROZWVkKXtpZih2b2lkIDA9PT0oZT10aGlzLmZpbGxMYXN0KHQpKSlyZXR1cm5cIlwiO249dGhpcy5sYXN0TmVlZCx0aGlzLmxhc3ROZWVkPTB9ZWxzZSBuPTA7cmV0dXJuIG48dC5sZW5ndGg/ZT9lK3RoaXMudGV4dCh0LG4pOnRoaXMudGV4dCh0LG4pOmV8fFwiXCJ9LG8ucHJvdG90eXBlLmVuZD1mdW5jdGlvbih0KXt2YXIgZT10JiZ0Lmxlbmd0aD90aGlzLndyaXRlKHQpOlwiXCI7cmV0dXJuIHRoaXMubGFzdE5lZWQ/ZStcIu+/vVwiOmV9LG8ucHJvdG90eXBlLnRleHQ9ZnVuY3Rpb24odCxlKXt2YXIgbj1mdW5jdGlvbih0LGUsbil7dmFyIHI9ZS5sZW5ndGgtMTtpZihyPG4pcmV0dXJuIDA7dmFyIGk9cyhlW3JdKTtpZihpPj0wKXJldHVybiBpPjAmJih0Lmxhc3ROZWVkPWktMSksaTtpZigtLXI8bnx8LTI9PT1pKXJldHVybiAwO2lmKChpPXMoZVtyXSkpPj0wKXJldHVybiBpPjAmJih0Lmxhc3ROZWVkPWktMiksaTtpZigtLXI8bnx8LTI9PT1pKXJldHVybiAwO2lmKChpPXMoZVtyXSkpPj0wKXJldHVybiBpPjAmJigyPT09aT9pPTA6dC5sYXN0TmVlZD1pLTMpLGk7cmV0dXJuIDB9KHRoaXMsdCxlKTtpZighdGhpcy5sYXN0TmVlZClyZXR1cm4gdC50b1N0cmluZyhcInV0ZjhcIixlKTt0aGlzLmxhc3RUb3RhbD1uO3ZhciByPXQubGVuZ3RoLShuLXRoaXMubGFzdE5lZWQpO3JldHVybiB0LmNvcHkodGhpcy5sYXN0Q2hhciwwLHIpLHQudG9TdHJpbmcoXCJ1dGY4XCIsZSxyKX0sby5wcm90b3R5cGUuZmlsbExhc3Q9ZnVuY3Rpb24odCl7aWYodGhpcy5sYXN0TmVlZDw9dC5sZW5ndGgpcmV0dXJuIHQuY29weSh0aGlzLmxhc3RDaGFyLHRoaXMubGFzdFRvdGFsLXRoaXMubGFzdE5lZWQsMCx0aGlzLmxhc3ROZWVkKSx0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsMCx0aGlzLmxhc3RUb3RhbCk7dC5jb3B5KHRoaXMubGFzdENoYXIsdGhpcy5sYXN0VG90YWwtdGhpcy5sYXN0TmVlZCwwLHQubGVuZ3RoKSx0aGlzLmxhc3ROZWVkLT10Lmxlbmd0aH19LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbih0KXtyZXR1cm4obj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9ZnVuY3Rpb24gcihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PT1uKFN5bWJvbC5pdGVyYXRvcik/dC5leHBvcnRzPXI9ZnVuY3Rpb24odCl7cmV0dXJuIG4odCl9OnQuZXhwb3J0cz1yPWZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6bih0KX0scihlKX10LmV4cG9ydHM9cn0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNikuQnVmZmVyLGk9bigyNCkuVHJhbnNmb3JtO2Z1bmN0aW9uIG8odCl7aS5jYWxsKHRoaXMpLHRoaXMuX2Jsb2NrPXIuYWxsb2NVbnNhZmUodCksdGhpcy5fYmxvY2tTaXplPXQsdGhpcy5fYmxvY2tPZmZzZXQ9MCx0aGlzLl9sZW5ndGg9WzAsMCwwLDBdLHRoaXMuX2ZpbmFsaXplZD0hMX1uKDQpKG8saSksby5wcm90b3R5cGUuX3RyYW5zZm9ybT1mdW5jdGlvbih0LGUsbil7dmFyIHI9bnVsbDt0cnl7dGhpcy51cGRhdGUodCxlKX1jYXRjaCh0KXtyPXR9bihyKX0sby5wcm90b3R5cGUuX2ZsdXNoPWZ1bmN0aW9uKHQpe3ZhciBlPW51bGw7dHJ5e3RoaXMucHVzaCh0aGlzLmRpZ2VzdCgpKX1jYXRjaCh0KXtlPXR9dChlKX0sby5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKHQsZSl7aWYoZnVuY3Rpb24odCxlKXtpZighci5pc0J1ZmZlcih0KSYmXCJzdHJpbmdcIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcihlK1wiIG11c3QgYmUgYSBzdHJpbmcgb3IgYSBidWZmZXJcIil9KHQsXCJEYXRhXCIpLHRoaXMuX2ZpbmFsaXplZCl0aHJvdyBuZXcgRXJyb3IoXCJEaWdlc3QgYWxyZWFkeSBjYWxsZWRcIik7ci5pc0J1ZmZlcih0KXx8KHQ9ci5mcm9tKHQsZSkpO2Zvcih2YXIgbj10aGlzLl9ibG9jayxpPTA7dGhpcy5fYmxvY2tPZmZzZXQrdC5sZW5ndGgtaT49dGhpcy5fYmxvY2tTaXplOyl7Zm9yKHZhciBvPXRoaXMuX2Jsb2NrT2Zmc2V0O288dGhpcy5fYmxvY2tTaXplOyluW28rK109dFtpKytdO3RoaXMuX3VwZGF0ZSgpLHRoaXMuX2Jsb2NrT2Zmc2V0PTB9Zm9yKDtpPHQubGVuZ3RoOyluW3RoaXMuX2Jsb2NrT2Zmc2V0KytdPXRbaSsrXTtmb3IodmFyIHM9MCxhPTgqdC5sZW5ndGg7YT4wOysrcyl0aGlzLl9sZW5ndGhbc10rPWEsKGE9dGhpcy5fbGVuZ3RoW3NdLzQyOTQ5NjcyOTZ8MCk+MCYmKHRoaXMuX2xlbmd0aFtzXS09NDI5NDk2NzI5NiphKTtyZXR1cm4gdGhpc30sby5wcm90b3R5cGUuX3VwZGF0ZT1mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIl91cGRhdGUgaXMgbm90IGltcGxlbWVudGVkXCIpfSxvLnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24odCl7aWYodGhpcy5fZmluYWxpemVkKXRocm93IG5ldyBFcnJvcihcIkRpZ2VzdCBhbHJlYWR5IGNhbGxlZFwiKTt0aGlzLl9maW5hbGl6ZWQ9ITA7dmFyIGU9dGhpcy5fZGlnZXN0KCk7dm9pZCAwIT09dCYmKGU9ZS50b1N0cmluZyh0KSksdGhpcy5fYmxvY2suZmlsbCgwKSx0aGlzLl9ibG9ja09mZnNldD0wO2Zvcih2YXIgbj0wO248NDsrK24pdGhpcy5fbGVuZ3RoW25dPTA7cmV0dXJuIGV9LG8ucHJvdG90eXBlLl9kaWdlc3Q9ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJfZGlnZXN0IGlzIG5vdCBpbXBsZW1lbnRlZFwiKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09bi5jYWxsKHQpfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1pO3ZhciByPW4oMTcpLkV2ZW50RW1pdHRlcjtmdW5jdGlvbiBpKCl7ci5jYWxsKHRoaXMpfW4oNCkoaSxyKSxpLlJlYWRhYmxlPW4oMTgpLGkuV3JpdGFibGU9big1MSksaS5EdXBsZXg9big1MiksaS5UcmFuc2Zvcm09big1MyksaS5QYXNzVGhyb3VnaD1uKDU0KSxpLlN0cmVhbT1pLGkucHJvdG90eXBlLnBpcGU9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzO2Z1bmN0aW9uIGkoZSl7dC53cml0YWJsZSYmITE9PT10LndyaXRlKGUpJiZuLnBhdXNlJiZuLnBhdXNlKCl9ZnVuY3Rpb24gbygpe24ucmVhZGFibGUmJm4ucmVzdW1lJiZuLnJlc3VtZSgpfW4ub24oXCJkYXRhXCIsaSksdC5vbihcImRyYWluXCIsbyksdC5faXNTdGRpb3x8ZSYmITE9PT1lLmVuZHx8KG4ub24oXCJlbmRcIixhKSxuLm9uKFwiY2xvc2VcIix1KSk7dmFyIHM9ITE7ZnVuY3Rpb24gYSgpe3N8fChzPSEwLHQuZW5kKCkpfWZ1bmN0aW9uIHUoKXtzfHwocz0hMCxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmRlc3Ryb3kmJnQuZGVzdHJveSgpKX1mdW5jdGlvbiBjKHQpe2lmKGgoKSwwPT09ci5saXN0ZW5lckNvdW50KHRoaXMsXCJlcnJvclwiKSl0aHJvdyB0fWZ1bmN0aW9uIGgoKXtuLnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLGkpLHQucmVtb3ZlTGlzdGVuZXIoXCJkcmFpblwiLG8pLG4ucmVtb3ZlTGlzdGVuZXIoXCJlbmRcIixhKSxuLnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIix1KSxuLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIixjKSx0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIixjKSxuLnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsaCksbi5yZW1vdmVMaXN0ZW5lcihcImNsb3NlXCIsaCksdC5yZW1vdmVMaXN0ZW5lcihcImNsb3NlXCIsaCl9cmV0dXJuIG4ub24oXCJlcnJvclwiLGMpLHQub24oXCJlcnJvclwiLGMpLG4ub24oXCJlbmRcIixoKSxuLm9uKFwiY2xvc2VcIixoKSx0Lm9uKFwiY2xvc2VcIixoKSx0LmVtaXQoXCJwaXBlXCIsbiksdH19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oZSxyKXt2YXIgaT1uKDEyKTt0LmV4cG9ydHM9Xzt2YXIgbyxzPW4oMjMpO18uUmVhZGFibGVTdGF0ZT13O24oMTcpLkV2ZW50RW1pdHRlcjt2YXIgYT1mdW5jdGlvbih0LGUpe3JldHVybiB0Lmxpc3RlbmVycyhlKS5sZW5ndGh9LHU9bigyNiksYz1uKDYpLkJ1ZmZlcixoPWUuVWludDhBcnJheXx8ZnVuY3Rpb24oKXt9O3ZhciBmPW4oMTApO2YuaW5oZXJpdHM9big0KTt2YXIgbD1uKDQ0KSxkPXZvaWQgMDtkPWwmJmwuZGVidWdsb2c/bC5kZWJ1Z2xvZyhcInN0cmVhbVwiKTpmdW5jdGlvbigpe307dmFyIHAsZz1uKDQ1KSx5PW4oMjcpO2YuaW5oZXJpdHMoXyx1KTt2YXIgdj1bXCJlcnJvclwiLFwiY2xvc2VcIixcImRlc3Ryb3lcIixcInBhdXNlXCIsXCJyZXN1bWVcIl07ZnVuY3Rpb24gdyh0LGUpe3Q9dHx8e307dmFyIHI9ZSBpbnN0YW5jZW9mKG89b3x8big4KSk7dGhpcy5vYmplY3RNb2RlPSEhdC5vYmplY3RNb2RlLHImJih0aGlzLm9iamVjdE1vZGU9dGhpcy5vYmplY3RNb2RlfHwhIXQucmVhZGFibGVPYmplY3RNb2RlKTt2YXIgaT10LmhpZ2hXYXRlck1hcmsscz10LnJlYWRhYmxlSGlnaFdhdGVyTWFyayxhPXRoaXMub2JqZWN0TW9kZT8xNjoxNjM4NDt0aGlzLmhpZ2hXYXRlck1hcms9aXx8MD09PWk/aTpyJiYoc3x8MD09PXMpP3M6YSx0aGlzLmhpZ2hXYXRlck1hcms9TWF0aC5mbG9vcih0aGlzLmhpZ2hXYXRlck1hcmspLHRoaXMuYnVmZmVyPW5ldyBnLHRoaXMubGVuZ3RoPTAsdGhpcy5waXBlcz1udWxsLHRoaXMucGlwZXNDb3VudD0wLHRoaXMuZmxvd2luZz1udWxsLHRoaXMuZW5kZWQ9ITEsdGhpcy5lbmRFbWl0dGVkPSExLHRoaXMucmVhZGluZz0hMSx0aGlzLnN5bmM9ITAsdGhpcy5uZWVkUmVhZGFibGU9ITEsdGhpcy5lbWl0dGVkUmVhZGFibGU9ITEsdGhpcy5yZWFkYWJsZUxpc3RlbmluZz0hMSx0aGlzLnJlc3VtZVNjaGVkdWxlZD0hMSx0aGlzLmRlc3Ryb3llZD0hMSx0aGlzLmRlZmF1bHRFbmNvZGluZz10LmRlZmF1bHRFbmNvZGluZ3x8XCJ1dGY4XCIsdGhpcy5hd2FpdERyYWluPTAsdGhpcy5yZWFkaW5nTW9yZT0hMSx0aGlzLmRlY29kZXI9bnVsbCx0aGlzLmVuY29kaW5nPW51bGwsdC5lbmNvZGluZyYmKHB8fChwPW4oMjApLlN0cmluZ0RlY29kZXIpLHRoaXMuZGVjb2Rlcj1uZXcgcCh0LmVuY29kaW5nKSx0aGlzLmVuY29kaW5nPXQuZW5jb2RpbmcpfWZ1bmN0aW9uIF8odCl7aWYobz1vfHxuKDgpLCEodGhpcyBpbnN0YW5jZW9mIF8pKXJldHVybiBuZXcgXyh0KTt0aGlzLl9yZWFkYWJsZVN0YXRlPW5ldyB3KHQsdGhpcyksdGhpcy5yZWFkYWJsZT0hMCx0JiYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC5yZWFkJiYodGhpcy5fcmVhZD10LnJlYWQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuZGVzdHJveSYmKHRoaXMuX2Rlc3Ryb3k9dC5kZXN0cm95KSksdS5jYWxsKHRoaXMpfWZ1bmN0aW9uIGIodCxlLG4scixpKXt2YXIgbyxzPXQuX3JlYWRhYmxlU3RhdGU7bnVsbD09PWU/KHMucmVhZGluZz0hMSxmdW5jdGlvbih0LGUpe2lmKGUuZW5kZWQpcmV0dXJuO2lmKGUuZGVjb2Rlcil7dmFyIG49ZS5kZWNvZGVyLmVuZCgpO24mJm4ubGVuZ3RoJiYoZS5idWZmZXIucHVzaChuKSxlLmxlbmd0aCs9ZS5vYmplY3RNb2RlPzE6bi5sZW5ndGgpfWUuZW5kZWQ9ITAsUyh0KX0odCxzKSk6KGl8fChvPWZ1bmN0aW9uKHQsZSl7dmFyIG47cj1lLGMuaXNCdWZmZXIocil8fHIgaW5zdGFuY2VvZiBofHxcInN0cmluZ1wiPT10eXBlb2YgZXx8dm9pZCAwPT09ZXx8dC5vYmplY3RNb2RlfHwobj1uZXcgVHlwZUVycm9yKFwiSW52YWxpZCBub24tc3RyaW5nL2J1ZmZlciBjaHVua1wiKSk7dmFyIHI7cmV0dXJuIG59KHMsZSkpLG8/dC5lbWl0KFwiZXJyb3JcIixvKTpzLm9iamVjdE1vZGV8fGUmJmUubGVuZ3RoPjA/KFwic3RyaW5nXCI9PXR5cGVvZiBlfHxzLm9iamVjdE1vZGV8fE9iamVjdC5nZXRQcm90b3R5cGVPZihlKT09PWMucHJvdG90eXBlfHwoZT1mdW5jdGlvbih0KXtyZXR1cm4gYy5mcm9tKHQpfShlKSkscj9zLmVuZEVtaXR0ZWQ/dC5lbWl0KFwiZXJyb3JcIixuZXcgRXJyb3IoXCJzdHJlYW0udW5zaGlmdCgpIGFmdGVyIGVuZCBldmVudFwiKSk6bSh0LHMsZSwhMCk6cy5lbmRlZD90LmVtaXQoXCJlcnJvclwiLG5ldyBFcnJvcihcInN0cmVhbS5wdXNoKCkgYWZ0ZXIgRU9GXCIpKToocy5yZWFkaW5nPSExLHMuZGVjb2RlciYmIW4/KGU9cy5kZWNvZGVyLndyaXRlKGUpLHMub2JqZWN0TW9kZXx8MCE9PWUubGVuZ3RoP20odCxzLGUsITEpOkEodCxzKSk6bSh0LHMsZSwhMSkpKTpyfHwocy5yZWFkaW5nPSExKSk7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiF0LmVuZGVkJiYodC5uZWVkUmVhZGFibGV8fHQubGVuZ3RoPHQuaGlnaFdhdGVyTWFya3x8MD09PXQubGVuZ3RoKX0ocyl9ZnVuY3Rpb24gbSh0LGUsbixyKXtlLmZsb3dpbmcmJjA9PT1lLmxlbmd0aCYmIWUuc3luYz8odC5lbWl0KFwiZGF0YVwiLG4pLHQucmVhZCgwKSk6KGUubGVuZ3RoKz1lLm9iamVjdE1vZGU/MTpuLmxlbmd0aCxyP2UuYnVmZmVyLnVuc2hpZnQobik6ZS5idWZmZXIucHVzaChuKSxlLm5lZWRSZWFkYWJsZSYmUyh0KSksQSh0LGUpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShfLnByb3RvdHlwZSxcImRlc3Ryb3llZFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5fcmVhZGFibGVTdGF0ZSYmdGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWR9LHNldDpmdW5jdGlvbih0KXt0aGlzLl9yZWFkYWJsZVN0YXRlJiYodGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQ9dCl9fSksXy5wcm90b3R5cGUuZGVzdHJveT15LmRlc3Ryb3ksXy5wcm90b3R5cGUuX3VuZGVzdHJveT15LnVuZGVzdHJveSxfLnByb3RvdHlwZS5fZGVzdHJveT1mdW5jdGlvbih0LGUpe3RoaXMucHVzaChudWxsKSxlKHQpfSxfLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKHQsZSl7dmFyIG4scj10aGlzLl9yZWFkYWJsZVN0YXRlO3JldHVybiByLm9iamVjdE1vZGU/bj0hMDpcInN0cmluZ1wiPT10eXBlb2YgdCYmKChlPWV8fHIuZGVmYXVsdEVuY29kaW5nKSE9PXIuZW5jb2RpbmcmJih0PWMuZnJvbSh0LGUpLGU9XCJcIiksbj0hMCksYih0aGlzLHQsZSwhMSxuKX0sXy5wcm90b3R5cGUudW5zaGlmdD1mdW5jdGlvbih0KXtyZXR1cm4gYih0aGlzLHQsbnVsbCwhMCwhMSl9LF8ucHJvdG90eXBlLmlzUGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuITE9PT10aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmd9LF8ucHJvdG90eXBlLnNldEVuY29kaW5nPWZ1bmN0aW9uKHQpe3JldHVybiBwfHwocD1uKDIwKS5TdHJpbmdEZWNvZGVyKSx0aGlzLl9yZWFkYWJsZVN0YXRlLmRlY29kZXI9bmV3IHAodCksdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmNvZGluZz10LHRoaXN9O3ZhciBrPTgzODg2MDg7ZnVuY3Rpb24gRSh0LGUpe3JldHVybiB0PD0wfHwwPT09ZS5sZW5ndGgmJmUuZW5kZWQ/MDplLm9iamVjdE1vZGU/MTp0IT10P2UuZmxvd2luZyYmZS5sZW5ndGg/ZS5idWZmZXIuaGVhZC5kYXRhLmxlbmd0aDplLmxlbmd0aDoodD5lLmhpZ2hXYXRlck1hcmsmJihlLmhpZ2hXYXRlck1hcms9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+PWs/dD1rOih0LS0sdHw9dD4+PjEsdHw9dD4+PjIsdHw9dD4+PjQsdHw9dD4+PjgsdHw9dD4+PjE2LHQrKyksdH0odCkpLHQ8PWUubGVuZ3RoP3Q6ZS5lbmRlZD9lLmxlbmd0aDooZS5uZWVkUmVhZGFibGU9ITAsMCkpfWZ1bmN0aW9uIFModCl7dmFyIGU9dC5fcmVhZGFibGVTdGF0ZTtlLm5lZWRSZWFkYWJsZT0hMSxlLmVtaXR0ZWRSZWFkYWJsZXx8KGQoXCJlbWl0UmVhZGFibGVcIixlLmZsb3dpbmcpLGUuZW1pdHRlZFJlYWRhYmxlPSEwLGUuc3luYz9pLm5leHRUaWNrKHgsdCk6eCh0KSl9ZnVuY3Rpb24geCh0KXtkKFwiZW1pdCByZWFkYWJsZVwiKSx0LmVtaXQoXCJyZWFkYWJsZVwiKSxPKHQpfWZ1bmN0aW9uIEEodCxlKXtlLnJlYWRpbmdNb3JlfHwoZS5yZWFkaW5nTW9yZT0hMCxpLm5leHRUaWNrKFQsdCxlKSl9ZnVuY3Rpb24gVCh0LGUpe2Zvcih2YXIgbj1lLmxlbmd0aDshZS5yZWFkaW5nJiYhZS5mbG93aW5nJiYhZS5lbmRlZCYmZS5sZW5ndGg8ZS5oaWdoV2F0ZXJNYXJrJiYoZChcIm1heWJlUmVhZE1vcmUgcmVhZCAwXCIpLHQucmVhZCgwKSxuIT09ZS5sZW5ndGgpOyluPWUubGVuZ3RoO2UucmVhZGluZ01vcmU9ITF9ZnVuY3Rpb24gSSh0KXtkKFwicmVhZGFibGUgbmV4dHRpY2sgcmVhZCAwXCIpLHQucmVhZCgwKX1mdW5jdGlvbiBSKHQsZSl7ZS5yZWFkaW5nfHwoZChcInJlc3VtZSByZWFkIDBcIiksdC5yZWFkKDApKSxlLnJlc3VtZVNjaGVkdWxlZD0hMSxlLmF3YWl0RHJhaW49MCx0LmVtaXQoXCJyZXN1bWVcIiksTyh0KSxlLmZsb3dpbmcmJiFlLnJlYWRpbmcmJnQucmVhZCgwKX1mdW5jdGlvbiBPKHQpe3ZhciBlPXQuX3JlYWRhYmxlU3RhdGU7Zm9yKGQoXCJmbG93XCIsZS5mbG93aW5nKTtlLmZsb3dpbmcmJm51bGwhPT10LnJlYWQoKTspO31mdW5jdGlvbiBQKHQsZSl7cmV0dXJuIDA9PT1lLmxlbmd0aD9udWxsOihlLm9iamVjdE1vZGU/bj1lLmJ1ZmZlci5zaGlmdCgpOiF0fHx0Pj1lLmxlbmd0aD8obj1lLmRlY29kZXI/ZS5idWZmZXIuam9pbihcIlwiKToxPT09ZS5idWZmZXIubGVuZ3RoP2UuYnVmZmVyLmhlYWQuZGF0YTplLmJ1ZmZlci5jb25jYXQoZS5sZW5ndGgpLGUuYnVmZmVyLmNsZWFyKCkpOm49ZnVuY3Rpb24odCxlLG4pe3ZhciByO3Q8ZS5oZWFkLmRhdGEubGVuZ3RoPyhyPWUuaGVhZC5kYXRhLnNsaWNlKDAsdCksZS5oZWFkLmRhdGE9ZS5oZWFkLmRhdGEuc2xpY2UodCkpOnI9dD09PWUuaGVhZC5kYXRhLmxlbmd0aD9lLnNoaWZ0KCk6bj9mdW5jdGlvbih0LGUpe3ZhciBuPWUuaGVhZCxyPTEsaT1uLmRhdGE7dC09aS5sZW5ndGg7Zm9yKDtuPW4ubmV4dDspe3ZhciBvPW4uZGF0YSxzPXQ+by5sZW5ndGg/by5sZW5ndGg6dDtpZihzPT09by5sZW5ndGg/aSs9bzppKz1vLnNsaWNlKDAsdCksMD09PSh0LT1zKSl7cz09PW8ubGVuZ3RoPygrK3Isbi5uZXh0P2UuaGVhZD1uLm5leHQ6ZS5oZWFkPWUudGFpbD1udWxsKTooZS5oZWFkPW4sbi5kYXRhPW8uc2xpY2UocykpO2JyZWFrfSsrcn1yZXR1cm4gZS5sZW5ndGgtPXIsaX0odCxlKTpmdW5jdGlvbih0LGUpe3ZhciBuPWMuYWxsb2NVbnNhZmUodCkscj1lLmhlYWQsaT0xO3IuZGF0YS5jb3B5KG4pLHQtPXIuZGF0YS5sZW5ndGg7Zm9yKDtyPXIubmV4dDspe3ZhciBvPXIuZGF0YSxzPXQ+by5sZW5ndGg/by5sZW5ndGg6dDtpZihvLmNvcHkobixuLmxlbmd0aC10LDAscyksMD09PSh0LT1zKSl7cz09PW8ubGVuZ3RoPygrK2ksci5uZXh0P2UuaGVhZD1yLm5leHQ6ZS5oZWFkPWUudGFpbD1udWxsKTooZS5oZWFkPXIsci5kYXRhPW8uc2xpY2UocykpO2JyZWFrfSsraX1yZXR1cm4gZS5sZW5ndGgtPWksbn0odCxlKTtyZXR1cm4gcn0odCxlLmJ1ZmZlcixlLmRlY29kZXIpLG4pO3ZhciBufWZ1bmN0aW9uIEIodCl7dmFyIGU9dC5fcmVhZGFibGVTdGF0ZTtpZihlLmxlbmd0aD4wKXRocm93IG5ldyBFcnJvcignXCJlbmRSZWFkYWJsZSgpXCIgY2FsbGVkIG9uIG5vbi1lbXB0eSBzdHJlYW0nKTtlLmVuZEVtaXR0ZWR8fChlLmVuZGVkPSEwLGkubmV4dFRpY2soTCxlLHQpKX1mdW5jdGlvbiBMKHQsZSl7dC5lbmRFbWl0dGVkfHwwIT09dC5sZW5ndGh8fCh0LmVuZEVtaXR0ZWQ9ITAsZS5yZWFkYWJsZT0hMSxlLmVtaXQoXCJlbmRcIikpfWZ1bmN0aW9uIEModCxlKXtmb3IodmFyIG49MCxyPXQubGVuZ3RoO248cjtuKyspaWYodFtuXT09PWUpcmV0dXJuIG47cmV0dXJuLTF9Xy5wcm90b3R5cGUucmVhZD1mdW5jdGlvbih0KXtkKFwicmVhZFwiLHQpLHQ9cGFyc2VJbnQodCwxMCk7dmFyIGU9dGhpcy5fcmVhZGFibGVTdGF0ZSxuPXQ7aWYoMCE9PXQmJihlLmVtaXR0ZWRSZWFkYWJsZT0hMSksMD09PXQmJmUubmVlZFJlYWRhYmxlJiYoZS5sZW5ndGg+PWUuaGlnaFdhdGVyTWFya3x8ZS5lbmRlZCkpcmV0dXJuIGQoXCJyZWFkOiBlbWl0UmVhZGFibGVcIixlLmxlbmd0aCxlLmVuZGVkKSwwPT09ZS5sZW5ndGgmJmUuZW5kZWQ/Qih0aGlzKTpTKHRoaXMpLG51bGw7aWYoMD09PSh0PUUodCxlKSkmJmUuZW5kZWQpcmV0dXJuIDA9PT1lLmxlbmd0aCYmQih0aGlzKSxudWxsO3ZhciByLGk9ZS5uZWVkUmVhZGFibGU7cmV0dXJuIGQoXCJuZWVkIHJlYWRhYmxlXCIsaSksKDA9PT1lLmxlbmd0aHx8ZS5sZW5ndGgtdDxlLmhpZ2hXYXRlck1hcmspJiZkKFwibGVuZ3RoIGxlc3MgdGhhbiB3YXRlcm1hcmtcIixpPSEwKSxlLmVuZGVkfHxlLnJlYWRpbmc/ZChcInJlYWRpbmcgb3IgZW5kZWRcIixpPSExKTppJiYoZChcImRvIHJlYWRcIiksZS5yZWFkaW5nPSEwLGUuc3luYz0hMCwwPT09ZS5sZW5ndGgmJihlLm5lZWRSZWFkYWJsZT0hMCksdGhpcy5fcmVhZChlLmhpZ2hXYXRlck1hcmspLGUuc3luYz0hMSxlLnJlYWRpbmd8fCh0PUUobixlKSkpLG51bGw9PT0ocj10PjA/UCh0LGUpOm51bGwpPyhlLm5lZWRSZWFkYWJsZT0hMCx0PTApOmUubGVuZ3RoLT10LDA9PT1lLmxlbmd0aCYmKGUuZW5kZWR8fChlLm5lZWRSZWFkYWJsZT0hMCksbiE9PXQmJmUuZW5kZWQmJkIodGhpcykpLG51bGwhPT1yJiZ0aGlzLmVtaXQoXCJkYXRhXCIscikscn0sXy5wcm90b3R5cGUuX3JlYWQ9ZnVuY3Rpb24odCl7dGhpcy5lbWl0KFwiZXJyb3JcIixuZXcgRXJyb3IoXCJfcmVhZCgpIGlzIG5vdCBpbXBsZW1lbnRlZFwiKSl9LF8ucHJvdG90eXBlLnBpcGU9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLG89dGhpcy5fcmVhZGFibGVTdGF0ZTtzd2l0Y2goby5waXBlc0NvdW50KXtjYXNlIDA6by5waXBlcz10O2JyZWFrO2Nhc2UgMTpvLnBpcGVzPVtvLnBpcGVzLHRdO2JyZWFrO2RlZmF1bHQ6by5waXBlcy5wdXNoKHQpfW8ucGlwZXNDb3VudCs9MSxkKFwicGlwZSBjb3VudD0lZCBvcHRzPSVqXCIsby5waXBlc0NvdW50LGUpO3ZhciB1PSghZXx8ITEhPT1lLmVuZCkmJnQhPT1yLnN0ZG91dCYmdCE9PXIuc3RkZXJyP2g6XztmdW5jdGlvbiBjKGUscil7ZChcIm9udW5waXBlXCIpLGU9PT1uJiZyJiYhMT09PXIuaGFzVW5waXBlZCYmKHIuaGFzVW5waXBlZD0hMCxkKFwiY2xlYW51cFwiKSx0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIix2KSx0LnJlbW92ZUxpc3RlbmVyKFwiZmluaXNoXCIsdyksdC5yZW1vdmVMaXN0ZW5lcihcImRyYWluXCIsZiksdC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIseSksdC5yZW1vdmVMaXN0ZW5lcihcInVucGlwZVwiLGMpLG4ucmVtb3ZlTGlzdGVuZXIoXCJlbmRcIixoKSxuLnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsXyksbi5yZW1vdmVMaXN0ZW5lcihcImRhdGFcIixnKSxsPSEwLCFvLmF3YWl0RHJhaW58fHQuX3dyaXRhYmxlU3RhdGUmJiF0Ll93cml0YWJsZVN0YXRlLm5lZWREcmFpbnx8ZigpKX1mdW5jdGlvbiBoKCl7ZChcIm9uZW5kXCIpLHQuZW5kKCl9by5lbmRFbWl0dGVkP2kubmV4dFRpY2sodSk6bi5vbmNlKFwiZW5kXCIsdSksdC5vbihcInVucGlwZVwiLGMpO3ZhciBmPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe3ZhciBlPXQuX3JlYWRhYmxlU3RhdGU7ZChcInBpcGVPbkRyYWluXCIsZS5hd2FpdERyYWluKSxlLmF3YWl0RHJhaW4mJmUuYXdhaXREcmFpbi0tLDA9PT1lLmF3YWl0RHJhaW4mJmEodCxcImRhdGFcIikmJihlLmZsb3dpbmc9ITAsTyh0KSl9fShuKTt0Lm9uKFwiZHJhaW5cIixmKTt2YXIgbD0hMTt2YXIgcD0hMTtmdW5jdGlvbiBnKGUpe2QoXCJvbmRhdGFcIikscD0hMSwhMSE9PXQud3JpdGUoZSl8fHB8fCgoMT09PW8ucGlwZXNDb3VudCYmby5waXBlcz09PXR8fG8ucGlwZXNDb3VudD4xJiYtMSE9PUMoby5waXBlcyx0KSkmJiFsJiYoZChcImZhbHNlIHdyaXRlIHJlc3BvbnNlLCBwYXVzZVwiLG4uX3JlYWRhYmxlU3RhdGUuYXdhaXREcmFpbiksbi5fcmVhZGFibGVTdGF0ZS5hd2FpdERyYWluKysscD0hMCksbi5wYXVzZSgpKX1mdW5jdGlvbiB5KGUpe2QoXCJvbmVycm9yXCIsZSksXygpLHQucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLHkpLDA9PT1hKHQsXCJlcnJvclwiKSYmdC5lbWl0KFwiZXJyb3JcIixlKX1mdW5jdGlvbiB2KCl7dC5yZW1vdmVMaXN0ZW5lcihcImZpbmlzaFwiLHcpLF8oKX1mdW5jdGlvbiB3KCl7ZChcIm9uZmluaXNoXCIpLHQucmVtb3ZlTGlzdGVuZXIoXCJjbG9zZVwiLHYpLF8oKX1mdW5jdGlvbiBfKCl7ZChcInVucGlwZVwiKSxuLnVucGlwZSh0KX1yZXR1cm4gbi5vbihcImRhdGFcIixnKSxmdW5jdGlvbih0LGUsbil7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC5wcmVwZW5kTGlzdGVuZXIpcmV0dXJuIHQucHJlcGVuZExpc3RlbmVyKGUsbik7dC5fZXZlbnRzJiZ0Ll9ldmVudHNbZV0/cyh0Ll9ldmVudHNbZV0pP3QuX2V2ZW50c1tlXS51bnNoaWZ0KG4pOnQuX2V2ZW50c1tlXT1bbix0Ll9ldmVudHNbZV1dOnQub24oZSxuKX0odCxcImVycm9yXCIseSksdC5vbmNlKFwiY2xvc2VcIix2KSx0Lm9uY2UoXCJmaW5pc2hcIix3KSx0LmVtaXQoXCJwaXBlXCIsbiksby5mbG93aW5nfHwoZChcInBpcGUgcmVzdW1lXCIpLG4ucmVzdW1lKCkpLHR9LF8ucHJvdG90eXBlLnVucGlwZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9yZWFkYWJsZVN0YXRlLG49e2hhc1VucGlwZWQ6ITF9O2lmKDA9PT1lLnBpcGVzQ291bnQpcmV0dXJuIHRoaXM7aWYoMT09PWUucGlwZXNDb3VudClyZXR1cm4gdCYmdCE9PWUucGlwZXM/dGhpczoodHx8KHQ9ZS5waXBlcyksZS5waXBlcz1udWxsLGUucGlwZXNDb3VudD0wLGUuZmxvd2luZz0hMSx0JiZ0LmVtaXQoXCJ1bnBpcGVcIix0aGlzLG4pLHRoaXMpO2lmKCF0KXt2YXIgcj1lLnBpcGVzLGk9ZS5waXBlc0NvdW50O2UucGlwZXM9bnVsbCxlLnBpcGVzQ291bnQ9MCxlLmZsb3dpbmc9ITE7Zm9yKHZhciBvPTA7bzxpO28rKylyW29dLmVtaXQoXCJ1bnBpcGVcIix0aGlzLG4pO3JldHVybiB0aGlzfXZhciBzPUMoZS5waXBlcyx0KTtyZXR1cm4tMT09PXM/dGhpczooZS5waXBlcy5zcGxpY2UocywxKSxlLnBpcGVzQ291bnQtPTEsMT09PWUucGlwZXNDb3VudCYmKGUucGlwZXM9ZS5waXBlc1swXSksdC5lbWl0KFwidW5waXBlXCIsdGhpcyxuKSx0aGlzKX0sXy5wcm90b3R5cGUub249ZnVuY3Rpb24odCxlKXt2YXIgbj11LnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsdCxlKTtpZihcImRhdGFcIj09PXQpITEhPT10aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcmJnRoaXMucmVzdW1lKCk7ZWxzZSBpZihcInJlYWRhYmxlXCI9PT10KXt2YXIgcj10aGlzLl9yZWFkYWJsZVN0YXRlO3IuZW5kRW1pdHRlZHx8ci5yZWFkYWJsZUxpc3RlbmluZ3x8KHIucmVhZGFibGVMaXN0ZW5pbmc9ci5uZWVkUmVhZGFibGU9ITAsci5lbWl0dGVkUmVhZGFibGU9ITEsci5yZWFkaW5nP3IubGVuZ3RoJiZTKHRoaXMpOmkubmV4dFRpY2soSSx0aGlzKSl9cmV0dXJuIG59LF8ucHJvdG90eXBlLmFkZExpc3RlbmVyPV8ucHJvdG90eXBlLm9uLF8ucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX3JlYWRhYmxlU3RhdGU7cmV0dXJuIHQuZmxvd2luZ3x8KGQoXCJyZXN1bWVcIiksdC5mbG93aW5nPSEwLGZ1bmN0aW9uKHQsZSl7ZS5yZXN1bWVTY2hlZHVsZWR8fChlLnJlc3VtZVNjaGVkdWxlZD0hMCxpLm5leHRUaWNrKFIsdCxlKSl9KHRoaXMsdCkpLHRoaXN9LF8ucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKCl7cmV0dXJuIGQoXCJjYWxsIHBhdXNlIGZsb3dpbmc9JWpcIix0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpLCExIT09dGhpcy5fcmVhZGFibGVTdGF0ZS5mbG93aW5nJiYoZChcInBhdXNlXCIpLHRoaXMuX3JlYWRhYmxlU3RhdGUuZmxvd2luZz0hMSx0aGlzLmVtaXQoXCJwYXVzZVwiKSksdGhpc30sXy5wcm90b3R5cGUud3JhcD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy5fcmVhZGFibGVTdGF0ZSxyPSExO2Zvcih2YXIgaSBpbiB0Lm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtpZihkKFwid3JhcHBlZCBlbmRcIiksbi5kZWNvZGVyJiYhbi5lbmRlZCl7dmFyIHQ9bi5kZWNvZGVyLmVuZCgpO3QmJnQubGVuZ3RoJiZlLnB1c2godCl9ZS5wdXNoKG51bGwpfSksdC5vbihcImRhdGFcIixmdW5jdGlvbihpKXsoZChcIndyYXBwZWQgZGF0YVwiKSxuLmRlY29kZXImJihpPW4uZGVjb2Rlci53cml0ZShpKSksbi5vYmplY3RNb2RlJiZudWxsPT1pKXx8KG4ub2JqZWN0TW9kZXx8aSYmaS5sZW5ndGgpJiYoZS5wdXNoKGkpfHwocj0hMCx0LnBhdXNlKCkpKX0pLHQpdm9pZCAwPT09dGhpc1tpXSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdFtpXSYmKHRoaXNbaV09ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHRbZV0uYXBwbHkodCxhcmd1bWVudHMpfX0oaSkpO2Zvcih2YXIgbz0wO288di5sZW5ndGg7bysrKXQub24odltvXSx0aGlzLmVtaXQuYmluZCh0aGlzLHZbb10pKTtyZXR1cm4gdGhpcy5fcmVhZD1mdW5jdGlvbihlKXtkKFwid3JhcHBlZCBfcmVhZFwiLGUpLHImJihyPSExLHQucmVzdW1lKCkpfSx0aGlzfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoXy5wcm90b3R5cGUsXCJyZWFkYWJsZUhpZ2hXYXRlck1hcmtcIix7ZW51bWVyYWJsZTohMSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fcmVhZGFibGVTdGF0ZS5oaWdoV2F0ZXJNYXJrfX0pLF8uX2Zyb21MaXN0PVB9KS5jYWxsKHRoaXMsbig3KSxuKDExKSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9bigxNykuRXZlbnRFbWl0dGVyfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMik7ZnVuY3Rpb24gaSh0LGUpe3QuZW1pdChcImVycm9yXCIsZSl9dC5leHBvcnRzPXtkZXN0cm95OmZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcyxvPXRoaXMuX3JlYWRhYmxlU3RhdGUmJnRoaXMuX3JlYWRhYmxlU3RhdGUuZGVzdHJveWVkLHM9dGhpcy5fd3JpdGFibGVTdGF0ZSYmdGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQ7cmV0dXJuIG98fHM/KGU/ZSh0KTohdHx8dGhpcy5fd3JpdGFibGVTdGF0ZSYmdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWR8fHIubmV4dFRpY2soaSx0aGlzLHQpLHRoaXMpOih0aGlzLl9yZWFkYWJsZVN0YXRlJiYodGhpcy5fcmVhZGFibGVTdGF0ZS5kZXN0cm95ZWQ9ITApLHRoaXMuX3dyaXRhYmxlU3RhdGUmJih0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZD0hMCksdGhpcy5fZGVzdHJveSh0fHxudWxsLGZ1bmN0aW9uKHQpeyFlJiZ0PyhyLm5leHRUaWNrKGksbix0KSxuLl93cml0YWJsZVN0YXRlJiYobi5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQ9ITApKTplJiZlKHQpfSksdGhpcyl9LHVuZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuX3JlYWRhYmxlU3RhdGUmJih0aGlzLl9yZWFkYWJsZVN0YXRlLmRlc3Ryb3llZD0hMSx0aGlzLl9yZWFkYWJsZVN0YXRlLnJlYWRpbmc9ITEsdGhpcy5fcmVhZGFibGVTdGF0ZS5lbmRlZD0hMSx0aGlzLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQ9ITEpLHRoaXMuX3dyaXRhYmxlU3RhdGUmJih0aGlzLl93cml0YWJsZVN0YXRlLmRlc3Ryb3llZD0hMSx0aGlzLl93cml0YWJsZVN0YXRlLmVuZGVkPSExLHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kaW5nPSExLHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQ9ITEsdGhpcy5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQ9ITEpfX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9czt2YXIgcj1uKDgpLGk9bigxMCk7ZnVuY3Rpb24gbyh0LGUpe3ZhciBuPXRoaXMuX3RyYW5zZm9ybVN0YXRlO24udHJhbnNmb3JtaW5nPSExO3ZhciByPW4ud3JpdGVjYjtpZighcilyZXR1cm4gdGhpcy5lbWl0KFwiZXJyb3JcIixuZXcgRXJyb3IoXCJ3cml0ZSBjYWxsYmFjayBjYWxsZWQgbXVsdGlwbGUgdGltZXNcIikpO24ud3JpdGVjaHVuaz1udWxsLG4ud3JpdGVjYj1udWxsLG51bGwhPWUmJnRoaXMucHVzaChlKSxyKHQpO3ZhciBpPXRoaXMuX3JlYWRhYmxlU3RhdGU7aS5yZWFkaW5nPSExLChpLm5lZWRSZWFkYWJsZXx8aS5sZW5ndGg8aS5oaWdoV2F0ZXJNYXJrKSYmdGhpcy5fcmVhZChpLmhpZ2hXYXRlck1hcmspfWZ1bmN0aW9uIHModCl7aWYoISh0aGlzIGluc3RhbmNlb2YgcykpcmV0dXJuIG5ldyBzKHQpO3IuY2FsbCh0aGlzLHQpLHRoaXMuX3RyYW5zZm9ybVN0YXRlPXthZnRlclRyYW5zZm9ybTpvLmJpbmQodGhpcyksbmVlZFRyYW5zZm9ybTohMSx0cmFuc2Zvcm1pbmc6ITEsd3JpdGVjYjpudWxsLHdyaXRlY2h1bms6bnVsbCx3cml0ZWVuY29kaW5nOm51bGx9LHRoaXMuX3JlYWRhYmxlU3RhdGUubmVlZFJlYWRhYmxlPSEwLHRoaXMuX3JlYWRhYmxlU3RhdGUuc3luYz0hMSx0JiYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC50cmFuc2Zvcm0mJih0aGlzLl90cmFuc2Zvcm09dC50cmFuc2Zvcm0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuZmx1c2gmJih0aGlzLl9mbHVzaD10LmZsdXNoKSksdGhpcy5vbihcInByZWZpbmlzaFwiLGEpfWZ1bmN0aW9uIGEoKXt2YXIgdD10aGlzO1wiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMuX2ZsdXNoP3RoaXMuX2ZsdXNoKGZ1bmN0aW9uKGUsbil7dSh0LGUsbil9KTp1KHRoaXMsbnVsbCxudWxsKX1mdW5jdGlvbiB1KHQsZSxuKXtpZihlKXJldHVybiB0LmVtaXQoXCJlcnJvclwiLGUpO2lmKG51bGwhPW4mJnQucHVzaChuKSx0Ll93cml0YWJsZVN0YXRlLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJDYWxsaW5nIHRyYW5zZm9ybSBkb25lIHdoZW4gd3MubGVuZ3RoICE9IDBcIik7aWYodC5fdHJhbnNmb3JtU3RhdGUudHJhbnNmb3JtaW5nKXRocm93IG5ldyBFcnJvcihcIkNhbGxpbmcgdHJhbnNmb3JtIGRvbmUgd2hlbiBzdGlsbCB0cmFuc2Zvcm1pbmdcIik7cmV0dXJuIHQucHVzaChudWxsKX1pLmluaGVyaXRzPW4oNCksaS5pbmhlcml0cyhzLHIpLHMucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5fdHJhbnNmb3JtU3RhdGUubmVlZFRyYW5zZm9ybT0hMSxyLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcyx0LGUpfSxzLnByb3RvdHlwZS5fdHJhbnNmb3JtPWZ1bmN0aW9uKHQsZSxuKXt0aHJvdyBuZXcgRXJyb3IoXCJfdHJhbnNmb3JtKCkgaXMgbm90IGltcGxlbWVudGVkXCIpfSxzLnByb3RvdHlwZS5fd3JpdGU9ZnVuY3Rpb24odCxlLG4pe3ZhciByPXRoaXMuX3RyYW5zZm9ybVN0YXRlO2lmKHIud3JpdGVjYj1uLHIud3JpdGVjaHVuaz10LHIud3JpdGVlbmNvZGluZz1lLCFyLnRyYW5zZm9ybWluZyl7dmFyIGk9dGhpcy5fcmVhZGFibGVTdGF0ZTsoci5uZWVkVHJhbnNmb3JtfHxpLm5lZWRSZWFkYWJsZXx8aS5sZW5ndGg8aS5oaWdoV2F0ZXJNYXJrKSYmdGhpcy5fcmVhZChpLmhpZ2hXYXRlck1hcmspfX0scy5wcm90b3R5cGUuX3JlYWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fdHJhbnNmb3JtU3RhdGU7bnVsbCE9PWUud3JpdGVjaHVuayYmZS53cml0ZWNiJiYhZS50cmFuc2Zvcm1pbmc/KGUudHJhbnNmb3JtaW5nPSEwLHRoaXMuX3RyYW5zZm9ybShlLndyaXRlY2h1bmssZS53cml0ZWVuY29kaW5nLGUuYWZ0ZXJUcmFuc2Zvcm0pKTplLm5lZWRUcmFuc2Zvcm09ITB9LHMucHJvdG90eXBlLl9kZXN0cm95PWZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcztyLnByb3RvdHlwZS5fZGVzdHJveS5jYWxsKHRoaXMsdCxmdW5jdGlvbih0KXtlKHQpLG4uZW1pdChcImNsb3NlXCIpfSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxpPW4oOSksbz1uKDYpLkJ1ZmZlcixzPVsxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOThdLGE9bmV3IEFycmF5KDY0KTtmdW5jdGlvbiB1KCl7dGhpcy5pbml0KCksdGhpcy5fdz1hLGkuY2FsbCh0aGlzLDY0LDU2KX1mdW5jdGlvbiBjKHQsZSxuKXtyZXR1cm4gbl50JihlXm4pfWZ1bmN0aW9uIGgodCxlLG4pe3JldHVybiB0JmV8biYodHxlKX1mdW5jdGlvbiBmKHQpe3JldHVybih0Pj4+Mnx0PDwzMCleKHQ+Pj4xM3x0PDwxOSleKHQ+Pj4yMnx0PDwxMCl9ZnVuY3Rpb24gbCh0KXtyZXR1cm4odD4+PjZ8dDw8MjYpXih0Pj4+MTF8dDw8MjEpXih0Pj4+MjV8dDw8Nyl9ZnVuY3Rpb24gZCh0KXtyZXR1cm4odD4+Pjd8dDw8MjUpXih0Pj4+MTh8dDw8MTQpXnQ+Pj4zfXIodSxpKSx1LnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2E9MTc3OTAzMzcwMyx0aGlzLl9iPTMxNDQxMzQyNzcsdGhpcy5fYz0xMDEzOTA0MjQyLHRoaXMuX2Q9Mjc3MzQ4MDc2Mix0aGlzLl9lPTEzNTk4OTMxMTksdGhpcy5fZj0yNjAwODIyOTI0LHRoaXMuX2c9NTI4NzM0NjM1LHRoaXMuX2g9MTU0MTQ1OTIyNSx0aGlzfSx1LnByb3RvdHlwZS5fdXBkYXRlPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXRoaXMuX3cscj0wfHRoaXMuX2EsaT0wfHRoaXMuX2Isbz0wfHRoaXMuX2MsYT0wfHRoaXMuX2QsdT0wfHRoaXMuX2UscD0wfHRoaXMuX2YsZz0wfHRoaXMuX2cseT0wfHRoaXMuX2gsdj0wO3Y8MTY7Kyt2KW5bdl09dC5yZWFkSW50MzJCRSg0KnYpO2Zvcig7djw2NDsrK3Ypblt2XT0wfCgoKGU9blt2LTJdKT4+PjE3fGU8PDE1KV4oZT4+PjE5fGU8PDEzKV5lPj4+MTApK25bdi03XStkKG5bdi0xNV0pK25bdi0xNl07Zm9yKHZhciB3PTA7dzw2NDsrK3cpe3ZhciBfPXkrbCh1KStjKHUscCxnKStzW3ddK25bd118MCxiPWYocikraChyLGksbyl8MDt5PWcsZz1wLHA9dSx1PWErX3wwLGE9byxvPWksaT1yLHI9XytifDB9dGhpcy5fYT1yK3RoaXMuX2F8MCx0aGlzLl9iPWkrdGhpcy5fYnwwLHRoaXMuX2M9byt0aGlzLl9jfDAsdGhpcy5fZD1hK3RoaXMuX2R8MCx0aGlzLl9lPXUrdGhpcy5fZXwwLHRoaXMuX2Y9cCt0aGlzLl9mfDAsdGhpcy5fZz1nK3RoaXMuX2d8MCx0aGlzLl9oPXkrdGhpcy5faHwwfSx1LnByb3RvdHlwZS5faGFzaD1mdW5jdGlvbigpe3ZhciB0PW8uYWxsb2NVbnNhZmUoMzIpO3JldHVybiB0LndyaXRlSW50MzJCRSh0aGlzLl9hLDApLHQud3JpdGVJbnQzMkJFKHRoaXMuX2IsNCksdC53cml0ZUludDMyQkUodGhpcy5fYyw4KSx0LndyaXRlSW50MzJCRSh0aGlzLl9kLDEyKSx0LndyaXRlSW50MzJCRSh0aGlzLl9lLDE2KSx0LndyaXRlSW50MzJCRSh0aGlzLl9mLDIwKSx0LndyaXRlSW50MzJCRSh0aGlzLl9nLDI0KSx0LndyaXRlSW50MzJCRSh0aGlzLl9oLDI4KSx0fSx0LmV4cG9ydHM9dX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksaT1uKDkpLG89big2KS5CdWZmZXIscz1bMTExNjM1MjQwOCwzNjA5NzY3NDU4LDE4OTk0NDc0NDEsNjAyODkxNzI1LDMwNDkzMjM0NzEsMzk2NDQ4NDM5OSwzOTIxMDA5NTczLDIxNzMyOTU1NDgsOTYxOTg3MTYzLDQwODE2Mjg0NzIsMTUwODk3MDk5MywzMDUzODM0MjY1LDI0NTM2MzU3NDgsMjkzNzY3MTU3OSwyODcwNzYzMjIxLDM2NjQ2MDk1NjAsMzYyNDM4MTA4MCwyNzM0ODgzMzk0LDMxMDU5ODQwMSwxMTY0OTk2NTQyLDYwNzIyNTI3OCwxMzIzNjEwNzY0LDE0MjY4ODE5ODcsMzU5MDMwNDk5NCwxOTI1MDc4Mzg4LDQwNjgxODIzODMsMjE2MjA3ODIwNiw5OTEzMzYxMTMsMjYxNDg4ODEwMyw2MzM4MDMzMTcsMzI0ODIyMjU4MCwzNDc5Nzc0ODY4LDM4MzUzOTA0MDEsMjY2NjYxMzQ1OCw0MDIyMjI0Nzc0LDk0NDcxMTEzOSwyNjQzNDcwNzgsMjM0MTI2Mjc3Myw2MDQ4MDc2MjgsMjAwNzgwMDkzMyw3NzAyNTU5ODMsMTQ5NTk5MDkwMSwxMjQ5MTUwMTIyLDE4NTY0MzEyMzUsMTU1NTA4MTY5MiwzMTc1MjE4MTMyLDE5OTYwNjQ5ODYsMjE5ODk1MDgzNywyNTU0MjIwODgyLDM5OTk3MTkzMzksMjgyMTgzNDM0OSw3NjY3ODQwMTYsMjk1Mjk5NjgwOCwyNTY2NTk0ODc5LDMyMTAzMTM2NzEsMzIwMzMzNzk1NiwzMzM2NTcxODkxLDEwMzQ0NTcwMjYsMzU4NDUyODcxMSwyNDY2OTQ4OTAxLDExMzkyNjk5MywzNzU4MzI2MzgzLDMzODI0MTg5NSwxNjg3MTc5MzYsNjY2MzA3MjA1LDExODgxNzk5NjQsNzczNTI5OTEyLDE1NDYwNDU3MzQsMTI5NDc1NzM3MiwxNTIyODA1NDg1LDEzOTYxODIyOTEsMjY0MzgzMzgyMywxNjk1MTgzNzAwLDIzNDM1MjczOTAsMTk4NjY2MTA1MSwxMDE0NDc3NDgwLDIxNzcwMjYzNTAsMTIwNjc1OTE0MiwyNDU2OTU2MDM3LDM0NDA3NzYyNywyNzMwNDg1OTIxLDEyOTA4NjM0NjAsMjgyMDMwMjQxMSwzMTU4NDU0MjczLDMyNTk3MzA4MDAsMzUwNTk1MjY1NywzMzQ1NzY0NzcxLDEwNjIxNzAwOCwzNTE2MDY1ODE3LDM2MDYwMDgzNDQsMzYwMDM1MjgwNCwxNDMyNzI1Nzc2LDQwOTQ1NzE5MDksMTQ2NzAzMTU5NCwyNzU0MjMzNDQsODUxMTY5NzIwLDQzMDIyNzczNCwzMTAwODIzNzUyLDUwNjk0ODYxNiwxMzYzMjU4MTk1LDY1OTA2MDU1NiwzNzUwNjg1NTkzLDg4Mzk5Nzg3NywzNzg1MDUwMjgwLDk1ODEzOTU3MSwzMzE4MzA3NDI3LDEzMjI4MjIyMTgsMzgxMjcyMzQwMywxNTM3MDAyMDYzLDIwMDMwMzQ5OTUsMTc0Nzg3Mzc3OSwzNjAyMDM2ODk5LDE5NTU1NjIyMjIsMTU3NTk5MDAxMiwyMDI0MTA0ODE1LDExMjU1OTI5MjgsMjIyNzczMDQ1MiwyNzE2OTA0MzA2LDIzNjE4NTI0MjQsNDQyNzc2MDQ0LDI0Mjg0MzY0NzQsNTkzNjk4MzQ0LDI3NTY3MzQxODcsMzczMzExMDI0OSwzMjA0MDMxNDc5LDI5OTkzNTE1NzMsMzMyOTMyNTI5OCwzODE1OTIwNDI3LDMzOTE1Njk2MTQsMzkyODM4MzkwMCwzNTE1MjY3MjcxLDU2NjI4MDcxMSwzOTQwMTg3NjA2LDM0NTQwNjk1MzQsNDExODYzMDI3MSw0MDAwMjM5OTkyLDExNjQxODQ3NCwxOTE0MTM4NTU0LDE3NDI5MjQyMSwyNzMxMDU1MjcwLDI4OTM4MDM1NiwzMjAzOTkzMDA2LDQ2MDM5MzI2OSwzMjA2MjAzMTUsNjg1NDcxNzMzLDU4NzQ5NjgzNiw4NTIxNDI5NzEsMTA4Njc5Mjg1MSwxMDE3MDM2Mjk4LDM2NTU0MzEwMCwxMTI2MDAwNTgwLDI2MTgyOTc2NzYsMTI4ODAzMzQ3MCwzNDA5ODU1MTU4LDE1MDE1MDU5NDgsNDIzNDUwOTg2NiwxNjA3MTY3OTE1LDk4NzE2NzQ2OCwxODE2NDAyMzE2LDEyNDYxODk1OTFdLGE9bmV3IEFycmF5KDE2MCk7ZnVuY3Rpb24gdSgpe3RoaXMuaW5pdCgpLHRoaXMuX3c9YSxpLmNhbGwodGhpcywxMjgsMTEyKX1mdW5jdGlvbiBjKHQsZSxuKXtyZXR1cm4gbl50JihlXm4pfWZ1bmN0aW9uIGgodCxlLG4pe3JldHVybiB0JmV8biYodHxlKX1mdW5jdGlvbiBmKHQsZSl7cmV0dXJuKHQ+Pj4yOHxlPDw0KV4oZT4+PjJ8dDw8MzApXihlPj4+N3x0PDwyNSl9ZnVuY3Rpb24gbCh0LGUpe3JldHVybih0Pj4+MTR8ZTw8MTgpXih0Pj4+MTh8ZTw8MTQpXihlPj4+OXx0PDwyMyl9ZnVuY3Rpb24gZCh0LGUpe3JldHVybih0Pj4+MXxlPDwzMSleKHQ+Pj44fGU8PDI0KV50Pj4+N31mdW5jdGlvbiBwKHQsZSl7cmV0dXJuKHQ+Pj4xfGU8PDMxKV4odD4+Pjh8ZTw8MjQpXih0Pj4+N3xlPDwyNSl9ZnVuY3Rpb24gZyh0LGUpe3JldHVybih0Pj4+MTl8ZTw8MTMpXihlPj4+Mjl8dDw8MyledD4+PjZ9ZnVuY3Rpb24geSh0LGUpe3JldHVybih0Pj4+MTl8ZTw8MTMpXihlPj4+Mjl8dDw8MyleKHQ+Pj42fGU8PDI2KX1mdW5jdGlvbiB2KHQsZSl7cmV0dXJuIHQ+Pj4wPGU+Pj4wPzE6MH1yKHUsaSksdS5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9haD0xNzc5MDMzNzAzLHRoaXMuX2JoPTMxNDQxMzQyNzcsdGhpcy5fY2g9MTAxMzkwNDI0Mix0aGlzLl9kaD0yNzczNDgwNzYyLHRoaXMuX2VoPTEzNTk4OTMxMTksdGhpcy5fZmg9MjYwMDgyMjkyNCx0aGlzLl9naD01Mjg3MzQ2MzUsdGhpcy5faGg9MTU0MTQ1OTIyNSx0aGlzLl9hbD00MDg5MjM1NzIwLHRoaXMuX2JsPTIyMjc4NzM1OTUsdGhpcy5fY2w9NDI3MTE3NTcyMyx0aGlzLl9kbD0xNTk1NzUwMTI5LHRoaXMuX2VsPTI5MTc1NjUxMzcsdGhpcy5fZmw9NzI1NTExMTk5LHRoaXMuX2dsPTQyMTUzODk1NDcsdGhpcy5faGw9MzI3MDMzMjA5LHRoaXN9LHUucHJvdG90eXBlLl91cGRhdGU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuX3csbj0wfHRoaXMuX2FoLHI9MHx0aGlzLl9iaCxpPTB8dGhpcy5fY2gsbz0wfHRoaXMuX2RoLGE9MHx0aGlzLl9laCx1PTB8dGhpcy5fZmgsdz0wfHRoaXMuX2doLF89MHx0aGlzLl9oaCxiPTB8dGhpcy5fYWwsbT0wfHRoaXMuX2JsLGs9MHx0aGlzLl9jbCxFPTB8dGhpcy5fZGwsUz0wfHRoaXMuX2VsLHg9MHx0aGlzLl9mbCxBPTB8dGhpcy5fZ2wsVD0wfHRoaXMuX2hsLEk9MDtJPDMyO0krPTIpZVtJXT10LnJlYWRJbnQzMkJFKDQqSSksZVtJKzFdPXQucmVhZEludDMyQkUoNCpJKzQpO2Zvcig7STwxNjA7SSs9Mil7dmFyIFI9ZVtJLTMwXSxPPWVbSS0zMCsxXSxQPWQoUixPKSxCPXAoTyxSKSxMPWcoUj1lW0ktNF0sTz1lW0ktNCsxXSksQz15KE8sUiksTT1lW0ktMTRdLGo9ZVtJLTE0KzFdLE49ZVtJLTMyXSxVPWVbSS0zMisxXSxGPUIranwwLEQ9UCtNK3YoRixCKXwwO0Q9KEQ9RCtMK3YoRj1GK0N8MCxDKXwwKStOK3YoRj1GK1V8MCxVKXwwLGVbSV09RCxlW0krMV09Rn1mb3IodmFyIHE9MDtxPDE2MDtxKz0yKXtEPWVbcV0sRj1lW3ErMV07dmFyIFc9aChuLHIsaSksWT1oKGIsbSxrKSxIPWYobixiKSx6PWYoYixuKSxLPWwoYSxTKSxWPWwoUyxhKSxKPXNbcV0sWD1zW3ErMV0sRz1jKGEsdSx3KSwkPWMoUyx4LEEpLFE9VCtWfDAsWj1fK0srdihRLFQpfDA7Wj0oWj0oWj1aK0crdihRPVErJHwwLCQpfDApK0ordihRPVErWHwwLFgpfDApK0QrdihRPVErRnwwLEYpfDA7dmFyIHR0PXorWXwwLGV0PUgrVyt2KHR0LHopfDA7Xz13LFQ9QSx3PXUsQT14LHU9YSx4PVMsYT1vK1ordihTPUUrUXwwLEUpfDAsbz1pLEU9ayxpPXIsaz1tLHI9bixtPWIsbj1aK2V0K3YoYj1RK3R0fDAsUSl8MH10aGlzLl9hbD10aGlzLl9hbCtifDAsdGhpcy5fYmw9dGhpcy5fYmwrbXwwLHRoaXMuX2NsPXRoaXMuX2NsK2t8MCx0aGlzLl9kbD10aGlzLl9kbCtFfDAsdGhpcy5fZWw9dGhpcy5fZWwrU3wwLHRoaXMuX2ZsPXRoaXMuX2ZsK3h8MCx0aGlzLl9nbD10aGlzLl9nbCtBfDAsdGhpcy5faGw9dGhpcy5faGwrVHwwLHRoaXMuX2FoPXRoaXMuX2FoK24rdih0aGlzLl9hbCxiKXwwLHRoaXMuX2JoPXRoaXMuX2JoK3Irdih0aGlzLl9ibCxtKXwwLHRoaXMuX2NoPXRoaXMuX2NoK2krdih0aGlzLl9jbCxrKXwwLHRoaXMuX2RoPXRoaXMuX2RoK28rdih0aGlzLl9kbCxFKXwwLHRoaXMuX2VoPXRoaXMuX2VoK2Erdih0aGlzLl9lbCxTKXwwLHRoaXMuX2ZoPXRoaXMuX2ZoK3Urdih0aGlzLl9mbCx4KXwwLHRoaXMuX2doPXRoaXMuX2doK3crdih0aGlzLl9nbCxBKXwwLHRoaXMuX2hoPXRoaXMuX2hoK18rdih0aGlzLl9obCxUKXwwfSx1LnByb3RvdHlwZS5faGFzaD1mdW5jdGlvbigpe3ZhciB0PW8uYWxsb2NVbnNhZmUoNjQpO2Z1bmN0aW9uIGUoZSxuLHIpe3Qud3JpdGVJbnQzMkJFKGUsciksdC53cml0ZUludDMyQkUobixyKzQpfXJldHVybiBlKHRoaXMuX2FoLHRoaXMuX2FsLDApLGUodGhpcy5fYmgsdGhpcy5fYmwsOCksZSh0aGlzLl9jaCx0aGlzLl9jbCwxNiksZSh0aGlzLl9kaCx0aGlzLl9kbCwyNCksZSh0aGlzLl9laCx0aGlzLl9lbCwzMiksZSh0aGlzLl9maCx0aGlzLl9mbCw0MCksZSh0aGlzLl9naCx0aGlzLl9nbCw0OCksZSh0aGlzLl9oaCx0aGlzLl9obCw1NiksdH0sdC5leHBvcnRzPXV9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDM2KSxpPW4oMzcpLG89bigzOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHIodCl8fGkodCxlKXx8bygpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzkpLGk9big0MCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHIuY3J5cHRvJiZyLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpcmV0dXJuIHIuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh0KTtpZihcIm9iamVjdFwiPT10eXBlb2Ygci5tc0NyeXB0byYmXCJmdW5jdGlvblwiPT10eXBlb2Ygci5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMpcmV0dXJuIHIubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHQpO2lmKGkucmFuZG9tQnl0ZXMpe2lmKCEodCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RlZCBVaW50OEFycmF5XCIpO2lmKHQubGVuZ3RoPjY1NTM2KXt2YXIgZT1uZXcgRXJyb3I7dGhyb3cgZS5jb2RlPTIyLGUubWVzc2FnZT1cIkZhaWxlZCB0byBleGVjdXRlICdnZXRSYW5kb21WYWx1ZXMnIG9uICdDcnlwdG8nOiBUaGUgQXJyYXlCdWZmZXJWaWV3J3MgYnl0ZSBsZW5ndGggKFwiK3QubGVuZ3RoK1wiKSBleGNlZWRzIHRoZSBudW1iZXIgb2YgYnl0ZXMgb2YgZW50cm9weSBhdmFpbGFibGUgdmlhIHRoaXMgQVBJICg2NTUzNikuXCIsZS5uYW1lPVwiUXVvdGFFeGNlZWRlZEVycm9yXCIsZX12YXIgbj1pLnJhbmRvbUJ5dGVzKHQubGVuZ3RoKTtyZXR1cm4gdC5zZXQobiksdH10aHJvdyBuZXcgRXJyb3IoXCJObyBzZWN1cmUgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgYXZhaWxhYmxlLlwiKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDQpLGk9big0MSksbz1uKDU1KSxzPW4oNTYpLGE9big2MSk7ZnVuY3Rpb24gdSh0KXthLmNhbGwodGhpcyxcImRpZ2VzdFwiKSx0aGlzLl9oYXNoPXR9cih1LGEpLHUucHJvdG90eXBlLl91cGRhdGU9ZnVuY3Rpb24odCl7dGhpcy5faGFzaC51cGRhdGUodCl9LHUucHJvdG90eXBlLl9maW5hbD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9oYXNoLmRpZ2VzdCgpfSx0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJtZDVcIj09PSh0PXQudG9Mb3dlckNhc2UoKSk/bmV3IGk6XCJybWQxNjBcIj09PXR8fFwicmlwZW1kMTYwXCI9PT10P25ldyBvOm5ldyB1KHModCkpfX0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbihlKXt2YXIgbj1udWxsO1widW5kZWZpbmVkXCIhPXR5cGVvZiBXZWJTb2NrZXQ/bj1XZWJTb2NrZXQ6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIE1veldlYlNvY2tldD9uPU1veldlYlNvY2tldDp2b2lkIDAhPT1lP249ZS5XZWJTb2NrZXR8fGUuTW96V2ViU29ja2V0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/bj13aW5kb3cuV2ViU29ja2V0fHx3aW5kb3cuTW96V2ViU29ja2V0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYobj1zZWxmLldlYlNvY2tldHx8c2VsZi5Nb3pXZWJTb2NrZXQpLHQuZXhwb3J0cz1ufSkuY2FsbCh0aGlzLG4oNykpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9ZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGUsbj1PYmplY3QucHJvdG90eXBlLHI9bi5oYXNPd25Qcm9wZXJ0eSxpPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbD9TeW1ib2w6e30sbz1pLml0ZXJhdG9yfHxcIkBAaXRlcmF0b3JcIixzPWkuYXN5bmNJdGVyYXRvcnx8XCJAQGFzeW5jSXRlcmF0b3JcIixhPWkudG9TdHJpbmdUYWd8fFwiQEB0b1N0cmluZ1RhZ1wiO2Z1bmN0aW9uIHUodCxlLG4scil7dmFyIGk9ZSYmZS5wcm90b3R5cGUgaW5zdGFuY2VvZiBnP2U6ZyxvPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHM9bmV3IFQocnx8W10pO3JldHVybiBvLl9pbnZva2U9ZnVuY3Rpb24odCxlLG4pe3ZhciByPWg7cmV0dXJuIGZ1bmN0aW9uKGksbyl7aWYocj09PWwpdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtpZihyPT09ZCl7aWYoXCJ0aHJvd1wiPT09aSl0aHJvdyBvO3JldHVybiBSKCl9Zm9yKG4ubWV0aG9kPWksbi5hcmc9bzs7KXt2YXIgcz1uLmRlbGVnYXRlO2lmKHMpe3ZhciBhPVMocyxuKTtpZihhKXtpZihhPT09cCljb250aW51ZTtyZXR1cm4gYX19aWYoXCJuZXh0XCI9PT1uLm1ldGhvZCluLnNlbnQ9bi5fc2VudD1uLmFyZztlbHNlIGlmKFwidGhyb3dcIj09PW4ubWV0aG9kKXtpZihyPT09aCl0aHJvdyByPWQsbi5hcmc7bi5kaXNwYXRjaEV4Y2VwdGlvbihuLmFyZyl9ZWxzZVwicmV0dXJuXCI9PT1uLm1ldGhvZCYmbi5hYnJ1cHQoXCJyZXR1cm5cIixuLmFyZyk7cj1sO3ZhciB1PWModCxlLG4pO2lmKFwibm9ybWFsXCI9PT11LnR5cGUpe2lmKHI9bi5kb25lP2Q6Zix1LmFyZz09PXApY29udGludWU7cmV0dXJue3ZhbHVlOnUuYXJnLGRvbmU6bi5kb25lfX1cInRocm93XCI9PT11LnR5cGUmJihyPWQsbi5tZXRob2Q9XCJ0aHJvd1wiLG4uYXJnPXUuYXJnKX19fSh0LG4scyksb31mdW5jdGlvbiBjKHQsZSxuKXt0cnl7cmV0dXJue3R5cGU6XCJub3JtYWxcIixhcmc6dC5jYWxsKGUsbil9fWNhdGNoKHQpe3JldHVybnt0eXBlOlwidGhyb3dcIixhcmc6dH19fXQud3JhcD11O3ZhciBoPVwic3VzcGVuZGVkU3RhcnRcIixmPVwic3VzcGVuZGVkWWllbGRcIixsPVwiZXhlY3V0aW5nXCIsZD1cImNvbXBsZXRlZFwiLHA9e307ZnVuY3Rpb24gZygpe31mdW5jdGlvbiB5KCl7fWZ1bmN0aW9uIHYoKXt9dmFyIHc9e307d1tvXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt2YXIgXz1PYmplY3QuZ2V0UHJvdG90eXBlT2YsYj1fJiZfKF8oSShbXSkpKTtiJiZiIT09biYmci5jYWxsKGIsbykmJih3PWIpO3ZhciBtPXYucHJvdG90eXBlPWcucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodyk7ZnVuY3Rpb24gayh0KXtbXCJuZXh0XCIsXCJ0aHJvd1wiLFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dFtlXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5faW52b2tlKGUsdCl9fSl9ZnVuY3Rpb24gRSh0KXt2YXIgZTt0aGlzLl9pbnZva2U9ZnVuY3Rpb24obixpKXtmdW5jdGlvbiBvKCl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGUsbyl7IWZ1bmN0aW9uIGUobixpLG8scyl7dmFyIGE9Yyh0W25dLHQsaSk7aWYoXCJ0aHJvd1wiIT09YS50eXBlKXt2YXIgdT1hLmFyZyxoPXUudmFsdWU7cmV0dXJuIGgmJlwib2JqZWN0XCI9PXR5cGVvZiBoJiZyLmNhbGwoaCxcIl9fYXdhaXRcIik/UHJvbWlzZS5yZXNvbHZlKGguX19hd2FpdCkudGhlbihmdW5jdGlvbih0KXtlKFwibmV4dFwiLHQsbyxzKX0sZnVuY3Rpb24odCl7ZShcInRocm93XCIsdCxvLHMpfSk6UHJvbWlzZS5yZXNvbHZlKGgpLnRoZW4oZnVuY3Rpb24odCl7dS52YWx1ZT10LG8odSl9LGZ1bmN0aW9uKHQpe3JldHVybiBlKFwidGhyb3dcIix0LG8scyl9KX1zKGEuYXJnKX0obixpLGUsbyl9KX1yZXR1cm4gZT1lP2UudGhlbihvLG8pOm8oKX19ZnVuY3Rpb24gUyh0LG4pe3ZhciByPXQuaXRlcmF0b3Jbbi5tZXRob2RdO2lmKHI9PT1lKXtpZihuLmRlbGVnYXRlPW51bGwsXCJ0aHJvd1wiPT09bi5tZXRob2Qpe2lmKHQuaXRlcmF0b3IucmV0dXJuJiYobi5tZXRob2Q9XCJyZXR1cm5cIixuLmFyZz1lLFModCxuKSxcInRocm93XCI9PT1uLm1ldGhvZCkpcmV0dXJuIHA7bi5tZXRob2Q9XCJ0aHJvd1wiLG4uYXJnPW5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpfXJldHVybiBwfXZhciBpPWMocix0Lml0ZXJhdG9yLG4uYXJnKTtpZihcInRocm93XCI9PT1pLnR5cGUpcmV0dXJuIG4ubWV0aG9kPVwidGhyb3dcIixuLmFyZz1pLmFyZyxuLmRlbGVnYXRlPW51bGwscDt2YXIgbz1pLmFyZztyZXR1cm4gbz9vLmRvbmU/KG5bdC5yZXN1bHROYW1lXT1vLnZhbHVlLG4ubmV4dD10Lm5leHRMb2MsXCJyZXR1cm5cIiE9PW4ubWV0aG9kJiYobi5tZXRob2Q9XCJuZXh0XCIsbi5hcmc9ZSksbi5kZWxlZ2F0ZT1udWxsLHApOm86KG4ubWV0aG9kPVwidGhyb3dcIixuLmFyZz1uZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksbi5kZWxlZ2F0ZT1udWxsLHApfWZ1bmN0aW9uIHgodCl7dmFyIGU9e3RyeUxvYzp0WzBdfTsxIGluIHQmJihlLmNhdGNoTG9jPXRbMV0pLDIgaW4gdCYmKGUuZmluYWxseUxvYz10WzJdLGUuYWZ0ZXJMb2M9dFszXSksdGhpcy50cnlFbnRyaWVzLnB1c2goZSl9ZnVuY3Rpb24gQSh0KXt2YXIgZT10LmNvbXBsZXRpb258fHt9O2UudHlwZT1cIm5vcm1hbFwiLGRlbGV0ZSBlLmFyZyx0LmNvbXBsZXRpb249ZX1mdW5jdGlvbiBUKHQpe3RoaXMudHJ5RW50cmllcz1be3RyeUxvYzpcInJvb3RcIn1dLHQuZm9yRWFjaCh4LHRoaXMpLHRoaXMucmVzZXQoITApfWZ1bmN0aW9uIEkodCl7aWYodCl7dmFyIG49dFtvXTtpZihuKXJldHVybiBuLmNhbGwodCk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC5uZXh0KXJldHVybiB0O2lmKCFpc05hTih0Lmxlbmd0aCkpe3ZhciBpPS0xLHM9ZnVuY3Rpb24gbigpe2Zvcig7KytpPHQubGVuZ3RoOylpZihyLmNhbGwodCxpKSlyZXR1cm4gbi52YWx1ZT10W2ldLG4uZG9uZT0hMSxuO3JldHVybiBuLnZhbHVlPWUsbi5kb25lPSEwLG59O3JldHVybiBzLm5leHQ9c319cmV0dXJue25leHQ6Un19ZnVuY3Rpb24gUigpe3JldHVybnt2YWx1ZTplLGRvbmU6ITB9fXJldHVybiB5LnByb3RvdHlwZT1tLmNvbnN0cnVjdG9yPXYsdi5jb25zdHJ1Y3Rvcj15LHZbYV09eS5kaXNwbGF5TmFtZT1cIkdlbmVyYXRvckZ1bmN0aW9uXCIsdC5pc0dlbmVyYXRvckZ1bmN0aW9uPWZ1bmN0aW9uKHQpe3ZhciBlPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnQuY29uc3RydWN0b3I7cmV0dXJuISFlJiYoZT09PXl8fFwiR2VuZXJhdG9yRnVuY3Rpb25cIj09PShlLmRpc3BsYXlOYW1lfHxlLm5hbWUpKX0sdC5tYXJrPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKHQsdik6KHQuX19wcm90b19fPXYsYSBpbiB0fHwodFthXT1cIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSx0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG0pLHR9LHQuYXdyYXA9ZnVuY3Rpb24odCl7cmV0dXJue19fYXdhaXQ6dH19LGsoRS5wcm90b3R5cGUpLEUucHJvdG90eXBlW3NdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9LHQuQXN5bmNJdGVyYXRvcj1FLHQuYXN5bmM9ZnVuY3Rpb24oZSxuLHIsaSl7dmFyIG89bmV3IEUodShlLG4scixpKSk7cmV0dXJuIHQuaXNHZW5lcmF0b3JGdW5jdGlvbihuKT9vOm8ubmV4dCgpLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuIHQuZG9uZT90LnZhbHVlOm8ubmV4dCgpfSl9LGsobSksbVthXT1cIkdlbmVyYXRvclwiLG1bb109ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30sbS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiW29iamVjdCBHZW5lcmF0b3JdXCJ9LHQua2V5cz1mdW5jdGlvbih0KXt2YXIgZT1bXTtmb3IodmFyIG4gaW4gdCllLnB1c2gobik7cmV0dXJuIGUucmV2ZXJzZSgpLGZ1bmN0aW9uIG4oKXtmb3IoO2UubGVuZ3RoOyl7dmFyIHI9ZS5wb3AoKTtpZihyIGluIHQpcmV0dXJuIG4udmFsdWU9cixuLmRvbmU9ITEsbn1yZXR1cm4gbi5kb25lPSEwLG59fSx0LnZhbHVlcz1JLFQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpULHJlc2V0OmZ1bmN0aW9uKHQpe2lmKHRoaXMucHJldj0wLHRoaXMubmV4dD0wLHRoaXMuc2VudD10aGlzLl9zZW50PWUsdGhpcy5kb25lPSExLHRoaXMuZGVsZWdhdGU9bnVsbCx0aGlzLm1ldGhvZD1cIm5leHRcIix0aGlzLmFyZz1lLHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKEEpLCF0KWZvcih2YXIgbiBpbiB0aGlzKVwidFwiPT09bi5jaGFyQXQoMCkmJnIuY2FsbCh0aGlzLG4pJiYhaXNOYU4oK24uc2xpY2UoMSkpJiYodGhpc1tuXT1lKX0sc3RvcDpmdW5jdGlvbigpe3RoaXMuZG9uZT0hMDt2YXIgdD10aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtpZihcInRocm93XCI9PT10LnR5cGUpdGhyb3cgdC5hcmc7cmV0dXJuIHRoaXMucnZhbH0sZGlzcGF0Y2hFeGNlcHRpb246ZnVuY3Rpb24odCl7aWYodGhpcy5kb25lKXRocm93IHQ7dmFyIG49dGhpcztmdW5jdGlvbiBpKHIsaSl7cmV0dXJuIGEudHlwZT1cInRocm93XCIsYS5hcmc9dCxuLm5leHQ9cixpJiYobi5tZXRob2Q9XCJuZXh0XCIsbi5hcmc9ZSksISFpfWZvcih2YXIgbz10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7bz49MDstLW8pe3ZhciBzPXRoaXMudHJ5RW50cmllc1tvXSxhPXMuY29tcGxldGlvbjtpZihcInJvb3RcIj09PXMudHJ5TG9jKXJldHVybiBpKFwiZW5kXCIpO2lmKHMudHJ5TG9jPD10aGlzLnByZXYpe3ZhciB1PXIuY2FsbChzLFwiY2F0Y2hMb2NcIiksYz1yLmNhbGwocyxcImZpbmFsbHlMb2NcIik7aWYodSYmYyl7aWYodGhpcy5wcmV2PHMuY2F0Y2hMb2MpcmV0dXJuIGkocy5jYXRjaExvYywhMCk7aWYodGhpcy5wcmV2PHMuZmluYWxseUxvYylyZXR1cm4gaShzLmZpbmFsbHlMb2MpfWVsc2UgaWYodSl7aWYodGhpcy5wcmV2PHMuY2F0Y2hMb2MpcmV0dXJuIGkocy5jYXRjaExvYywhMCl9ZWxzZXtpZighYyl0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtpZih0aGlzLnByZXY8cy5maW5hbGx5TG9jKXJldHVybiBpKHMuZmluYWxseUxvYyl9fX19LGFicnVwdDpmdW5jdGlvbih0LGUpe2Zvcih2YXIgbj10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7bj49MDstLW4pe3ZhciBpPXRoaXMudHJ5RW50cmllc1tuXTtpZihpLnRyeUxvYzw9dGhpcy5wcmV2JiZyLmNhbGwoaSxcImZpbmFsbHlMb2NcIikmJnRoaXMucHJldjxpLmZpbmFsbHlMb2Mpe3ZhciBvPWk7YnJlYWt9fW8mJihcImJyZWFrXCI9PT10fHxcImNvbnRpbnVlXCI9PT10KSYmby50cnlMb2M8PWUmJmU8PW8uZmluYWxseUxvYyYmKG89bnVsbCk7dmFyIHM9bz9vLmNvbXBsZXRpb246e307cmV0dXJuIHMudHlwZT10LHMuYXJnPWUsbz8odGhpcy5tZXRob2Q9XCJuZXh0XCIsdGhpcy5uZXh0PW8uZmluYWxseUxvYyxwKTp0aGlzLmNvbXBsZXRlKHMpfSxjb21wbGV0ZTpmdW5jdGlvbih0LGUpe2lmKFwidGhyb3dcIj09PXQudHlwZSl0aHJvdyB0LmFyZztyZXR1cm5cImJyZWFrXCI9PT10LnR5cGV8fFwiY29udGludWVcIj09PXQudHlwZT90aGlzLm5leHQ9dC5hcmc6XCJyZXR1cm5cIj09PXQudHlwZT8odGhpcy5ydmFsPXRoaXMuYXJnPXQuYXJnLHRoaXMubWV0aG9kPVwicmV0dXJuXCIsdGhpcy5uZXh0PVwiZW5kXCIpOlwibm9ybWFsXCI9PT10LnR5cGUmJmUmJih0aGlzLm5leHQ9ZSkscH0sZmluaXNoOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7ZT49MDstLWUpe3ZhciBuPXRoaXMudHJ5RW50cmllc1tlXTtpZihuLmZpbmFsbHlMb2M9PT10KXJldHVybiB0aGlzLmNvbXBsZXRlKG4uY29tcGxldGlvbixuLmFmdGVyTG9jKSxBKG4pLHB9fSxjYXRjaDpmdW5jdGlvbih0KXtmb3IodmFyIGU9dGhpcy50cnlFbnRyaWVzLmxlbmd0aC0xO2U+PTA7LS1lKXt2YXIgbj10aGlzLnRyeUVudHJpZXNbZV07aWYobi50cnlMb2M9PT10KXt2YXIgcj1uLmNvbXBsZXRpb247aWYoXCJ0aHJvd1wiPT09ci50eXBlKXt2YXIgaT1yLmFyZztBKG4pfXJldHVybiBpfX10aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIil9LGRlbGVnYXRlWWllbGQ6ZnVuY3Rpb24odCxuLHIpe3JldHVybiB0aGlzLmRlbGVnYXRlPXtpdGVyYXRvcjpJKHQpLHJlc3VsdE5hbWU6bixuZXh0TG9jOnJ9LFwibmV4dFwiPT09dGhpcy5tZXRob2QmJih0aGlzLmFyZz1lKSxwfX0sdH0odC5leHBvcnRzKTt0cnl7cmVnZW5lcmF0b3JSdW50aW1lPXJ9Y2F0Y2godCl7RnVuY3Rpb24oXCJyXCIsXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHIpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7dmFyIG49W10scj0hMCxpPSExLG89dm9pZCAwO3RyeXtmb3IodmFyIHMsYT10W1N5bWJvbC5pdGVyYXRvcl0oKTshKHI9KHM9YS5uZXh0KCkpLmRvbmUpJiYobi5wdXNoKHMudmFsdWUpLCFlfHxuLmxlbmd0aCE9PWUpO3I9ITApO31jYXRjaCh0KXtpPSEwLG89dH1maW5hbGx5e3RyeXtyfHxudWxsPT1hLnJldHVybnx8YS5yZXR1cm4oKX1maW5hbGx5e2lmKGkpdGhyb3cgb319cmV0dXJuIG59fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfX0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbihlKXt2YXIgbjtuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PWU/ZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnt9LHQuZXhwb3J0cz1ufSkuY2FsbCh0aGlzLG4oNykpfSxmdW5jdGlvbih0LGUpe30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNCksaT1uKDIyKSxvPW4oNikuQnVmZmVyLHM9bmV3IEFycmF5KDE2KTtmdW5jdGlvbiBhKCl7aS5jYWxsKHRoaXMsNjQpLHRoaXMuX2E9MTczMjU4NDE5Myx0aGlzLl9iPTQwMjMyMzM0MTcsdGhpcy5fYz0yNTYyMzgzMTAyLHRoaXMuX2Q9MjcxNzMzODc4fWZ1bmN0aW9uIHUodCxlKXtyZXR1cm4gdDw8ZXx0Pj4+MzItZX1mdW5jdGlvbiBjKHQsZSxuLHIsaSxvLHMpe3JldHVybiB1KHQrKGUmbnx+ZSZyKStpK298MCxzKStlfDB9ZnVuY3Rpb24gaCh0LGUsbixyLGksbyxzKXtyZXR1cm4gdSh0KyhlJnJ8biZ+cikraStvfDAscykrZXwwfWZ1bmN0aW9uIGYodCxlLG4scixpLG8scyl7cmV0dXJuIHUodCsoZV5uXnIpK2krb3wwLHMpK2V8MH1mdW5jdGlvbiBsKHQsZSxuLHIsaSxvLHMpe3JldHVybiB1KHQrKG5eKGV8fnIpKStpK298MCxzKStlfDB9cihhLGkpLGEucHJvdG90eXBlLl91cGRhdGU9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9cyxlPTA7ZTwxNjsrK2UpdFtlXT10aGlzLl9ibG9jay5yZWFkSW50MzJMRSg0KmUpO3ZhciBuPXRoaXMuX2Escj10aGlzLl9iLGk9dGhpcy5fYyxvPXRoaXMuX2Q7bj1jKG4scixpLG8sdFswXSwzNjE0MDkwMzYwLDcpLG89YyhvLG4scixpLHRbMV0sMzkwNTQwMjcxMCwxMiksaT1jKGksbyxuLHIsdFsyXSw2MDYxMDU4MTksMTcpLHI9YyhyLGksbyxuLHRbM10sMzI1MDQ0MTk2NiwyMiksbj1jKG4scixpLG8sdFs0XSw0MTE4NTQ4Mzk5LDcpLG89YyhvLG4scixpLHRbNV0sMTIwMDA4MDQyNiwxMiksaT1jKGksbyxuLHIsdFs2XSwyODIxNzM1OTU1LDE3KSxyPWMocixpLG8sbix0WzddLDQyNDkyNjEzMTMsMjIpLG49YyhuLHIsaSxvLHRbOF0sMTc3MDAzNTQxNiw3KSxvPWMobyxuLHIsaSx0WzldLDIzMzY1NTI4NzksMTIpLGk9YyhpLG8sbixyLHRbMTBdLDQyOTQ5MjUyMzMsMTcpLHI9YyhyLGksbyxuLHRbMTFdLDIzMDQ1NjMxMzQsMjIpLG49YyhuLHIsaSxvLHRbMTJdLDE4MDQ2MDM2ODIsNyksbz1jKG8sbixyLGksdFsxM10sNDI1NDYyNjE5NSwxMiksaT1jKGksbyxuLHIsdFsxNF0sMjc5Mjk2NTAwNiwxNyksbj1oKG4scj1jKHIsaSxvLG4sdFsxNV0sMTIzNjUzNTMyOSwyMiksaSxvLHRbMV0sNDEyOTE3MDc4Niw1KSxvPWgobyxuLHIsaSx0WzZdLDMyMjU0NjU2NjQsOSksaT1oKGksbyxuLHIsdFsxMV0sNjQzNzE3NzEzLDE0KSxyPWgocixpLG8sbix0WzBdLDM5MjEwNjk5OTQsMjApLG49aChuLHIsaSxvLHRbNV0sMzU5MzQwODYwNSw1KSxvPWgobyxuLHIsaSx0WzEwXSwzODAxNjA4Myw5KSxpPWgoaSxvLG4scix0WzE1XSwzNjM0NDg4OTYxLDE0KSxyPWgocixpLG8sbix0WzRdLDM4ODk0Mjk0NDgsMjApLG49aChuLHIsaSxvLHRbOV0sNTY4NDQ2NDM4LDUpLG89aChvLG4scixpLHRbMTRdLDMyNzUxNjM2MDYsOSksaT1oKGksbyxuLHIsdFszXSw0MTA3NjAzMzM1LDE0KSxyPWgocixpLG8sbix0WzhdLDExNjM1MzE1MDEsMjApLG49aChuLHIsaSxvLHRbMTNdLDI4NTAyODU4MjksNSksbz1oKG8sbixyLGksdFsyXSw0MjQzNTYzNTEyLDkpLGk9aChpLG8sbixyLHRbN10sMTczNTMyODQ3MywxNCksbj1mKG4scj1oKHIsaSxvLG4sdFsxMl0sMjM2ODM1OTU2MiwyMCksaSxvLHRbNV0sNDI5NDU4ODczOCw0KSxvPWYobyxuLHIsaSx0WzhdLDIyNzIzOTI4MzMsMTEpLGk9ZihpLG8sbixyLHRbMTFdLDE4MzkwMzA1NjIsMTYpLHI9ZihyLGksbyxuLHRbMTRdLDQyNTk2NTc3NDAsMjMpLG49ZihuLHIsaSxvLHRbMV0sMjc2Mzk3NTIzNiw0KSxvPWYobyxuLHIsaSx0WzRdLDEyNzI4OTMzNTMsMTEpLGk9ZihpLG8sbixyLHRbN10sNDEzOTQ2OTY2NCwxNikscj1mKHIsaSxvLG4sdFsxMF0sMzIwMDIzNjY1NiwyMyksbj1mKG4scixpLG8sdFsxM10sNjgxMjc5MTc0LDQpLG89ZihvLG4scixpLHRbMF0sMzkzNjQzMDA3NCwxMSksaT1mKGksbyxuLHIsdFszXSwzNTcyNDQ1MzE3LDE2KSxyPWYocixpLG8sbix0WzZdLDc2MDI5MTg5LDIzKSxuPWYobixyLGksbyx0WzldLDM2NTQ2MDI4MDksNCksbz1mKG8sbixyLGksdFsxMl0sMzg3MzE1MTQ2MSwxMSksaT1mKGksbyxuLHIsdFsxNV0sNTMwNzQyNTIwLDE2KSxuPWwobixyPWYocixpLG8sbix0WzJdLDMyOTk2Mjg2NDUsMjMpLGksbyx0WzBdLDQwOTYzMzY0NTIsNiksbz1sKG8sbixyLGksdFs3XSwxMTI2ODkxNDE1LDEwKSxpPWwoaSxvLG4scix0WzE0XSwyODc4NjEyMzkxLDE1KSxyPWwocixpLG8sbix0WzVdLDQyMzc1MzMyNDEsMjEpLG49bChuLHIsaSxvLHRbMTJdLDE3MDA0ODU1NzEsNiksbz1sKG8sbixyLGksdFszXSwyMzk5OTgwNjkwLDEwKSxpPWwoaSxvLG4scix0WzEwXSw0MjkzOTE1NzczLDE1KSxyPWwocixpLG8sbix0WzFdLDIyNDAwNDQ0OTcsMjEpLG49bChuLHIsaSxvLHRbOF0sMTg3MzMxMzM1OSw2KSxvPWwobyxuLHIsaSx0WzE1XSw0MjY0MzU1NTUyLDEwKSxpPWwoaSxvLG4scix0WzZdLDI3MzQ3Njg5MTYsMTUpLHI9bChyLGksbyxuLHRbMTNdLDEzMDkxNTE2NDksMjEpLG49bChuLHIsaSxvLHRbNF0sNDE0OTQ0NDIyNiw2KSxvPWwobyxuLHIsaSx0WzExXSwzMTc0NzU2OTE3LDEwKSxpPWwoaSxvLG4scix0WzJdLDcxODc4NzI1OSwxNSkscj1sKHIsaSxvLG4sdFs5XSwzOTUxNDgxNzQ1LDIxKSx0aGlzLl9hPXRoaXMuX2ErbnwwLHRoaXMuX2I9dGhpcy5fYityfDAsdGhpcy5fYz10aGlzLl9jK2l8MCx0aGlzLl9kPXRoaXMuX2Qrb3wwfSxhLnByb3RvdHlwZS5fZGlnZXN0PWZ1bmN0aW9uKCl7dGhpcy5fYmxvY2tbdGhpcy5fYmxvY2tPZmZzZXQrK109MTI4LHRoaXMuX2Jsb2NrT2Zmc2V0PjU2JiYodGhpcy5fYmxvY2suZmlsbCgwLHRoaXMuX2Jsb2NrT2Zmc2V0LDY0KSx0aGlzLl91cGRhdGUoKSx0aGlzLl9ibG9ja09mZnNldD0wKSx0aGlzLl9ibG9jay5maWxsKDAsdGhpcy5fYmxvY2tPZmZzZXQsNTYpLHRoaXMuX2Jsb2NrLndyaXRlVUludDMyTEUodGhpcy5fbGVuZ3RoWzBdLDU2KSx0aGlzLl9ibG9jay53cml0ZVVJbnQzMkxFKHRoaXMuX2xlbmd0aFsxXSw2MCksdGhpcy5fdXBkYXRlKCk7dmFyIHQ9by5hbGxvY1Vuc2FmZSgxNik7cmV0dXJuIHQud3JpdGVJbnQzMkxFKHRoaXMuX2EsMCksdC53cml0ZUludDMyTEUodGhpcy5fYiw0KSx0LndyaXRlSW50MzJMRSh0aGlzLl9jLDgpLHQud3JpdGVJbnQzMkxFKHRoaXMuX2QsMTIpLHR9LHQuZXhwb3J0cz1hfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZS5ieXRlTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBlPWModCksbj1lWzBdLHI9ZVsxXTtyZXR1cm4gMyoobityKS80LXJ9LGUudG9CeXRlQXJyYXk9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49Yyh0KSxyPW5bMF0scz1uWzFdLGE9bmV3IG8oZnVuY3Rpb24odCxlLG4pe3JldHVybiAzKihlK24pLzQtbn0oMCxyLHMpKSx1PTAsaD1zPjA/ci00OnIsZj0wO2Y8aDtmKz00KWU9aVt0LmNoYXJDb2RlQXQoZildPDwxOHxpW3QuY2hhckNvZGVBdChmKzEpXTw8MTJ8aVt0LmNoYXJDb2RlQXQoZisyKV08PDZ8aVt0LmNoYXJDb2RlQXQoZiszKV0sYVt1KytdPWU+PjE2JjI1NSxhW3UrK109ZT4+OCYyNTUsYVt1KytdPTI1NSZlOzI9PT1zJiYoZT1pW3QuY2hhckNvZGVBdChmKV08PDJ8aVt0LmNoYXJDb2RlQXQoZisxKV0+PjQsYVt1KytdPTI1NSZlKTsxPT09cyYmKGU9aVt0LmNoYXJDb2RlQXQoZildPDwxMHxpW3QuY2hhckNvZGVBdChmKzEpXTw8NHxpW3QuY2hhckNvZGVBdChmKzIpXT4+MixhW3UrK109ZT4+OCYyNTUsYVt1KytdPTI1NSZlKTtyZXR1cm4gYX0sZS5mcm9tQnl0ZUFycmF5PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQubGVuZ3RoLGk9biUzLG89W10scz0wLGE9bi1pO3M8YTtzKz0xNjM4MylvLnB1c2goaCh0LHMscysxNjM4Mz5hP2E6cysxNjM4MykpOzE9PT1pPyhlPXRbbi0xXSxvLnB1c2gocltlPj4yXStyW2U8PDQmNjNdK1wiPT1cIikpOjI9PT1pJiYoZT0odFtuLTJdPDw4KSt0W24tMV0sby5wdXNoKHJbZT4+MTBdK3JbZT4+NCY2M10rcltlPDwyJjYzXStcIj1cIikpO3JldHVybiBvLmpvaW4oXCJcIil9O2Zvcih2YXIgcj1bXSxpPVtdLG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSxzPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLGE9MCx1PXMubGVuZ3RoO2E8dTsrK2EpclthXT1zW2FdLGlbcy5jaGFyQ29kZUF0KGEpXT1hO2Z1bmN0aW9uIGModCl7dmFyIGU9dC5sZW5ndGg7aWYoZSU0PjApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgbj10LmluZGV4T2YoXCI9XCIpO3JldHVybi0xPT09biYmKG49ZSksW24sbj09PWU/MDo0LW4lNF19ZnVuY3Rpb24gaCh0LGUsbil7Zm9yKHZhciBpLG8scz1bXSxhPWU7YTxuO2ErPTMpaT0odFthXTw8MTYmMTY3MTE2ODApKyh0W2ErMV08PDgmNjUyODApKygyNTUmdFthKzJdKSxzLnB1c2goclsobz1pKT4+MTgmNjNdK3Jbbz4+MTImNjNdK3Jbbz4+NiY2M10rcls2MyZvXSk7cmV0dXJuIHMuam9pbihcIlwiKX1pW1wiLVwiLmNoYXJDb2RlQXQoMCldPTYyLGlbXCJfXCIuY2hhckNvZGVBdCgwKV09NjN9LGZ1bmN0aW9uKHQsZSl7ZS5yZWFkPWZ1bmN0aW9uKHQsZSxuLHIsaSl7dmFyIG8scyxhPTgqaS1yLTEsdT0oMTw8YSktMSxjPXU+PjEsaD0tNyxmPW4/aS0xOjAsbD1uPy0xOjEsZD10W2UrZl07Zm9yKGYrPWwsbz1kJigxPDwtaCktMSxkPj49LWgsaCs9YTtoPjA7bz0yNTYqbyt0W2UrZl0sZis9bCxoLT04KTtmb3Iocz1vJigxPDwtaCktMSxvPj49LWgsaCs9cjtoPjA7cz0yNTYqcyt0W2UrZl0sZis9bCxoLT04KTtpZigwPT09bylvPTEtYztlbHNle2lmKG89PT11KXJldHVybiBzP05hTjoxLzAqKGQ/LTE6MSk7cys9TWF0aC5wb3coMixyKSxvLT1jfXJldHVybihkPy0xOjEpKnMqTWF0aC5wb3coMixvLXIpfSxlLndyaXRlPWZ1bmN0aW9uKHQsZSxuLHIsaSxvKXt2YXIgcyxhLHUsYz04Km8taS0xLGg9KDE8PGMpLTEsZj1oPj4xLGw9MjM9PT1pP01hdGgucG93KDIsLTI0KS1NYXRoLnBvdygyLC03Nyk6MCxkPXI/MDpvLTEscD1yPzE6LTEsZz1lPDB8fDA9PT1lJiYxL2U8MD8xOjA7Zm9yKGU9TWF0aC5hYnMoZSksaXNOYU4oZSl8fGU9PT0xLzA/KGE9aXNOYU4oZSk/MTowLHM9aCk6KHM9TWF0aC5mbG9vcihNYXRoLmxvZyhlKS9NYXRoLkxOMiksZSoodT1NYXRoLnBvdygyLC1zKSk8MSYmKHMtLSx1Kj0yKSwoZSs9cytmPj0xP2wvdTpsKk1hdGgucG93KDIsMS1mKSkqdT49MiYmKHMrKyx1Lz0yKSxzK2Y+PWg/KGE9MCxzPWgpOnMrZj49MT8oYT0oZSp1LTEpKk1hdGgucG93KDIsaSkscys9Zik6KGE9ZSpNYXRoLnBvdygyLGYtMSkqTWF0aC5wb3coMixpKSxzPTApKTtpPj04O3RbbitkXT0yNTUmYSxkKz1wLGEvPTI1NixpLT04KTtmb3Iocz1zPDxpfGEsYys9aTtjPjA7dFtuK2RdPTI1NSZzLGQrPXAscy89MjU2LGMtPTgpO3RbbitkLXBdfD0xMjgqZ319LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big2KS5CdWZmZXIsaT1uKDQ2KTt0LmV4cG9ydHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyx0KSx0aGlzLmhlYWQ9bnVsbCx0aGlzLnRhaWw9bnVsbCx0aGlzLmxlbmd0aD0wfXJldHVybiB0LnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKHQpe3ZhciBlPXtkYXRhOnQsbmV4dDpudWxsfTt0aGlzLmxlbmd0aD4wP3RoaXMudGFpbC5uZXh0PWU6dGhpcy5oZWFkPWUsdGhpcy50YWlsPWUsKyt0aGlzLmxlbmd0aH0sdC5wcm90b3R5cGUudW5zaGlmdD1mdW5jdGlvbih0KXt2YXIgZT17ZGF0YTp0LG5leHQ6dGhpcy5oZWFkfTswPT09dGhpcy5sZW5ndGgmJih0aGlzLnRhaWw9ZSksdGhpcy5oZWFkPWUsKyt0aGlzLmxlbmd0aH0sdC5wcm90b3R5cGUuc2hpZnQ9ZnVuY3Rpb24oKXtpZigwIT09dGhpcy5sZW5ndGgpe3ZhciB0PXRoaXMuaGVhZC5kYXRhO3JldHVybiAxPT09dGhpcy5sZW5ndGg/dGhpcy5oZWFkPXRoaXMudGFpbD1udWxsOnRoaXMuaGVhZD10aGlzLmhlYWQubmV4dCwtLXRoaXMubGVuZ3RoLHR9fSx0LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuaGVhZD10aGlzLnRhaWw9bnVsbCx0aGlzLmxlbmd0aD0wfSx0LnByb3RvdHlwZS5qb2luPWZ1bmN0aW9uKHQpe2lmKDA9PT10aGlzLmxlbmd0aClyZXR1cm5cIlwiO2Zvcih2YXIgZT10aGlzLmhlYWQsbj1cIlwiK2UuZGF0YTtlPWUubmV4dDspbis9dCtlLmRhdGE7cmV0dXJuIG59LHQucHJvdG90eXBlLmNvbmNhdD1mdW5jdGlvbih0KXtpZigwPT09dGhpcy5sZW5ndGgpcmV0dXJuIHIuYWxsb2MoMCk7aWYoMT09PXRoaXMubGVuZ3RoKXJldHVybiB0aGlzLmhlYWQuZGF0YTtmb3IodmFyIGUsbixpLG89ci5hbGxvY1Vuc2FmZSh0Pj4+MCkscz10aGlzLmhlYWQsYT0wO3M7KWU9cy5kYXRhLG49byxpPWEsZS5jb3B5KG4saSksYSs9cy5kYXRhLmxlbmd0aCxzPXMubmV4dDtyZXR1cm4gb30sdH0oKSxpJiZpLmluc3BlY3QmJmkuaW5zcGVjdC5jdXN0b20mJih0LmV4cG9ydHMucHJvdG90eXBlW2kuaW5zcGVjdC5jdXN0b21dPWZ1bmN0aW9uKCl7dmFyIHQ9aS5pbnNwZWN0KHtsZW5ndGg6dGhpcy5sZW5ndGh9KTtyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lK1wiIFwiK3R9KX0sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSxuKXsoZnVuY3Rpb24odCl7dmFyIHI9dm9pZCAwIT09dCYmdHx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGZ8fHdpbmRvdyxpPUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtmdW5jdGlvbiBvKHQsZSl7dGhpcy5faWQ9dCx0aGlzLl9jbGVhckZuPWV9ZS5zZXRUaW1lb3V0PWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBvKGkuY2FsbChzZXRUaW1lb3V0LHIsYXJndW1lbnRzKSxjbGVhclRpbWVvdXQpfSxlLnNldEludGVydmFsPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBvKGkuY2FsbChzZXRJbnRlcnZhbCxyLGFyZ3VtZW50cyksY2xlYXJJbnRlcnZhbCl9LGUuY2xlYXJUaW1lb3V0PWUuY2xlYXJJbnRlcnZhbD1mdW5jdGlvbih0KXt0JiZ0LmNsb3NlKCl9LG8ucHJvdG90eXBlLnVucmVmPW8ucHJvdG90eXBlLnJlZj1mdW5jdGlvbigpe30sby5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXt0aGlzLl9jbGVhckZuLmNhbGwocix0aGlzLl9pZCl9LGUuZW5yb2xsPWZ1bmN0aW9uKHQsZSl7Y2xlYXJUaW1lb3V0KHQuX2lkbGVUaW1lb3V0SWQpLHQuX2lkbGVUaW1lb3V0PWV9LGUudW5lbnJvbGw9ZnVuY3Rpb24odCl7Y2xlYXJUaW1lb3V0KHQuX2lkbGVUaW1lb3V0SWQpLHQuX2lkbGVUaW1lb3V0PS0xfSxlLl91bnJlZkFjdGl2ZT1lLmFjdGl2ZT1mdW5jdGlvbih0KXtjbGVhclRpbWVvdXQodC5faWRsZVRpbWVvdXRJZCk7dmFyIGU9dC5faWRsZVRpbWVvdXQ7ZT49MCYmKHQuX2lkbGVUaW1lb3V0SWQ9c2V0VGltZW91dChmdW5jdGlvbigpe3QuX29uVGltZW91dCYmdC5fb25UaW1lb3V0KCl9LGUpKX0sbig0OCksZS5zZXRJbW1lZGlhdGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGYuc2V0SW1tZWRpYXRlfHx2b2lkIDAhPT10JiZ0LnNldEltbWVkaWF0ZXx8dGhpcyYmdGhpcy5zZXRJbW1lZGlhdGUsZS5jbGVhckltbWVkaWF0ZT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5jbGVhckltbWVkaWF0ZXx8dm9pZCAwIT09dCYmdC5jbGVhckltbWVkaWF0ZXx8dGhpcyYmdGhpcy5jbGVhckltbWVkaWF0ZX0pLmNhbGwodGhpcyxuKDcpKX0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbih0LGUpeyFmdW5jdGlvbih0LG4pe1widXNlIHN0cmljdFwiO2lmKCF0LnNldEltbWVkaWF0ZSl7dmFyIHIsaSxvLHMsYSx1PTEsYz17fSxoPSExLGY9dC5kb2N1bWVudCxsPU9iamVjdC5nZXRQcm90b3R5cGVPZiYmT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpO2w9bCYmbC5zZXRUaW1lb3V0P2w6dCxcIltvYmplY3QgcHJvY2Vzc11cIj09PXt9LnRvU3RyaW5nLmNhbGwodC5wcm9jZXNzKT9yPWZ1bmN0aW9uKHQpe2UubmV4dFRpY2soZnVuY3Rpb24oKXtwKHQpfSl9OiFmdW5jdGlvbigpe2lmKHQucG9zdE1lc3NhZ2UmJiF0LmltcG9ydFNjcmlwdHMpe3ZhciBlPSEwLG49dC5vbm1lc3NhZ2U7cmV0dXJuIHQub25tZXNzYWdlPWZ1bmN0aW9uKCl7ZT0hMX0sdC5wb3N0TWVzc2FnZShcIlwiLFwiKlwiKSx0Lm9ubWVzc2FnZT1uLGV9fSgpP3QuTWVzc2FnZUNoYW5uZWw/KChvPW5ldyBNZXNzYWdlQ2hhbm5lbCkucG9ydDEub25tZXNzYWdlPWZ1bmN0aW9uKHQpe3AodC5kYXRhKX0scj1mdW5jdGlvbih0KXtvLnBvcnQyLnBvc3RNZXNzYWdlKHQpfSk6ZiYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIGYuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT8oaT1mLmRvY3VtZW50RWxlbWVudCxyPWZ1bmN0aW9uKHQpe3ZhciBlPWYuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtlLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3AodCksZS5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCxpLnJlbW92ZUNoaWxkKGUpLGU9bnVsbH0saS5hcHBlbmRDaGlsZChlKX0pOnI9ZnVuY3Rpb24odCl7c2V0VGltZW91dChwLDAsdCl9OihzPVwic2V0SW1tZWRpYXRlJFwiK01hdGgucmFuZG9tKCkrXCIkXCIsYT1mdW5jdGlvbihlKXtlLnNvdXJjZT09PXQmJlwic3RyaW5nXCI9PXR5cGVvZiBlLmRhdGEmJjA9PT1lLmRhdGEuaW5kZXhPZihzKSYmcCgrZS5kYXRhLnNsaWNlKHMubGVuZ3RoKSl9LHQuYWRkRXZlbnRMaXN0ZW5lcj90LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYSwhMSk6dC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLGEpLHI9ZnVuY3Rpb24oZSl7dC5wb3N0TWVzc2FnZShzK2UsXCIqXCIpfSksbC5zZXRJbW1lZGlhdGU9ZnVuY3Rpb24odCl7XCJmdW5jdGlvblwiIT10eXBlb2YgdCYmKHQ9bmV3IEZ1bmN0aW9uKFwiXCIrdCkpO2Zvcih2YXIgZT1uZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aC0xKSxuPTA7bjxlLmxlbmd0aDtuKyspZVtuXT1hcmd1bWVudHNbbisxXTt2YXIgaT17Y2FsbGJhY2s6dCxhcmdzOmV9O3JldHVybiBjW3VdPWkscih1KSx1Kyt9LGwuY2xlYXJJbW1lZGlhdGU9ZH1mdW5jdGlvbiBkKHQpe2RlbGV0ZSBjW3RdfWZ1bmN0aW9uIHAodCl7aWYoaClzZXRUaW1lb3V0KHAsMCx0KTtlbHNle3ZhciBlPWNbdF07aWYoZSl7aD0hMDt0cnl7IWZ1bmN0aW9uKHQpe3ZhciBlPXQuY2FsbGJhY2sscj10LmFyZ3M7c3dpdGNoKHIubGVuZ3RoKXtjYXNlIDA6ZSgpO2JyZWFrO2Nhc2UgMTplKHJbMF0pO2JyZWFrO2Nhc2UgMjplKHJbMF0sclsxXSk7YnJlYWs7Y2FzZSAzOmUoclswXSxyWzFdLHJbMl0pO2JyZWFrO2RlZmF1bHQ6ZS5hcHBseShuLHIpfX0oZSl9ZmluYWxseXtkKHQpLGg9ITF9fX19fShcInVuZGVmaW5lZFwiPT10eXBlb2Ygc2VsZj92b2lkIDA9PT10P3RoaXM6dDpzZWxmKX0pLmNhbGwodGhpcyxuKDcpLG4oMTEpKX0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbihlKXtmdW5jdGlvbiBuKHQpe3RyeXtpZighZS5sb2NhbFN0b3JhZ2UpcmV0dXJuITF9Y2F0Y2godCl7cmV0dXJuITF9dmFyIG49ZS5sb2NhbFN0b3JhZ2VbdF07cmV0dXJuIG51bGwhPW4mJlwidHJ1ZVwiPT09U3RyaW5nKG4pLnRvTG93ZXJDYXNlKCl9dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYobihcIm5vRGVwcmVjYXRpb25cIikpcmV0dXJuIHQ7dmFyIHI9ITE7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoIXIpe2lmKG4oXCJ0aHJvd0RlcHJlY2F0aW9uXCIpKXRocm93IG5ldyBFcnJvcihlKTtuKFwidHJhY2VEZXByZWNhdGlvblwiKT9jb25zb2xlLnRyYWNlKGUpOmNvbnNvbGUud2FybihlKSxyPSEwfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19fSkuY2FsbCh0aGlzLG4oNykpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPW87dmFyIHI9bigyOCksaT1uKDEwKTtmdW5jdGlvbiBvKHQpe2lmKCEodGhpcyBpbnN0YW5jZW9mIG8pKXJldHVybiBuZXcgbyh0KTtyLmNhbGwodGhpcyx0KX1pLmluaGVyaXRzPW4oNCksaS5pbmhlcml0cyhvLHIpLG8ucHJvdG90eXBlLl90cmFuc2Zvcm09ZnVuY3Rpb24odCxlLG4pe24obnVsbCx0KX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9bigxOSl9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9big4KX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDE4KS5UcmFuc2Zvcm19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9bigxOCkuUGFzc1Rocm91Z2h9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDE2KS5CdWZmZXIsaT1uKDQpLG89bigyMikscz1uZXcgQXJyYXkoMTYpLGE9WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsNyw0LDEzLDEsMTAsNiwxNSwzLDEyLDAsOSw1LDIsMTQsMTEsOCwzLDEwLDE0LDQsOSwxNSw4LDEsMiw3LDAsNiwxMywxMSw1LDEyLDEsOSwxMSwxMCwwLDgsMTIsNCwxMywzLDcsMTUsMTQsNSw2LDIsNCwwLDUsOSw3LDEyLDIsMTAsMTQsMSwzLDgsMTEsNiwxNSwxM10sdT1bNSwxNCw3LDAsOSwyLDExLDQsMTMsNiwxNSw4LDEsMTAsMywxMiw2LDExLDMsNywwLDEzLDUsMTAsMTQsMTUsOCwxMiw0LDksMSwyLDE1LDUsMSwzLDcsMTQsNiw5LDExLDgsMTIsMiwxMCwwLDQsMTMsOCw2LDQsMSwzLDExLDE1LDAsNSwxMiwyLDEzLDksNywxMCwxNCwxMiwxNSwxMCw0LDEsNSw4LDcsNiwyLDEzLDE0LDAsMyw5LDExXSxjPVsxMSwxNCwxNSwxMiw1LDgsNyw5LDExLDEzLDE0LDE1LDYsNyw5LDgsNyw2LDgsMTMsMTEsOSw3LDE1LDcsMTIsMTUsOSwxMSw3LDEzLDEyLDExLDEzLDYsNywxNCw5LDEzLDE1LDE0LDgsMTMsNiw1LDEyLDcsNSwxMSwxMiwxNCwxNSwxNCwxNSw5LDgsOSwxNCw1LDYsOCw2LDUsMTIsOSwxNSw1LDExLDYsOCwxMywxMiw1LDEyLDEzLDE0LDExLDgsNSw2XSxoPVs4LDksOSwxMSwxMywxNSwxNSw1LDcsNyw4LDExLDE0LDE0LDEyLDYsOSwxMywxNSw3LDEyLDgsOSwxMSw3LDcsMTIsNyw2LDE1LDEzLDExLDksNywxNSwxMSw4LDYsNiwxNCwxMiwxMyw1LDE0LDEzLDEzLDcsNSwxNSw1LDgsMTEsMTQsMTQsNiwxNCw2LDksMTIsOSwxMiw1LDE1LDgsOCw1LDEyLDksMTIsNSwxNCw2LDgsMTMsNiw1LDE1LDEzLDExLDExXSxmPVswLDE1MTg1MDAyNDksMTg1OTc3NTM5MywyNDAwOTU5NzA4LDI4NDA4NTM4MzhdLGw9WzEzNTI4Mjk5MjYsMTU0ODYwMzY4NCwxODM2MDcyNjkxLDIwNTM5OTQyMTcsMF07ZnVuY3Rpb24gZCgpe28uY2FsbCh0aGlzLDY0KSx0aGlzLl9hPTE3MzI1ODQxOTMsdGhpcy5fYj00MDIzMjMzNDE3LHRoaXMuX2M9MjU2MjM4MzEwMix0aGlzLl9kPTI3MTczMzg3OCx0aGlzLl9lPTMyODUzNzc1MjB9ZnVuY3Rpb24gcCh0LGUpe3JldHVybiB0PDxlfHQ+Pj4zMi1lfWZ1bmN0aW9uIGcodCxlLG4scixpLG8scyxhKXtyZXR1cm4gcCh0KyhlXm5ecikrbytzfDAsYSkraXwwfWZ1bmN0aW9uIHkodCxlLG4scixpLG8scyxhKXtyZXR1cm4gcCh0KyhlJm58fmUmcikrbytzfDAsYSkraXwwfWZ1bmN0aW9uIHYodCxlLG4scixpLG8scyxhKXtyZXR1cm4gcCh0KygoZXx+bilecikrbytzfDAsYSkraXwwfWZ1bmN0aW9uIHcodCxlLG4scixpLG8scyxhKXtyZXR1cm4gcCh0KyhlJnJ8biZ+cikrbytzfDAsYSkraXwwfWZ1bmN0aW9uIF8odCxlLG4scixpLG8scyxhKXtyZXR1cm4gcCh0KyhlXihufH5yKSkrbytzfDAsYSkraXwwfWkoZCxvKSxkLnByb3RvdHlwZS5fdXBkYXRlPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PXMsZT0wO2U8MTY7KytlKXRbZV09dGhpcy5fYmxvY2sucmVhZEludDMyTEUoNCplKTtmb3IodmFyIG49MHx0aGlzLl9hLHI9MHx0aGlzLl9iLGk9MHx0aGlzLl9jLG89MHx0aGlzLl9kLGQ9MHx0aGlzLl9lLGI9MHx0aGlzLl9hLG09MHx0aGlzLl9iLGs9MHx0aGlzLl9jLEU9MHx0aGlzLl9kLFM9MHx0aGlzLl9lLHg9MDt4PDgwO3grPTEpe3ZhciBBLFQ7eDwxNj8oQT1nKG4scixpLG8sZCx0W2FbeF1dLGZbMF0sY1t4XSksVD1fKGIsbSxrLEUsUyx0W3VbeF1dLGxbMF0saFt4XSkpOng8MzI/KEE9eShuLHIsaSxvLGQsdFthW3hdXSxmWzFdLGNbeF0pLFQ9dyhiLG0sayxFLFMsdFt1W3hdXSxsWzFdLGhbeF0pKTp4PDQ4PyhBPXYobixyLGksbyxkLHRbYVt4XV0sZlsyXSxjW3hdKSxUPXYoYixtLGssRSxTLHRbdVt4XV0sbFsyXSxoW3hdKSk6eDw2ND8oQT13KG4scixpLG8sZCx0W2FbeF1dLGZbM10sY1t4XSksVD15KGIsbSxrLEUsUyx0W3VbeF1dLGxbM10saFt4XSkpOihBPV8obixyLGksbyxkLHRbYVt4XV0sZls0XSxjW3hdKSxUPWcoYixtLGssRSxTLHRbdVt4XV0sbFs0XSxoW3hdKSksbj1kLGQ9byxvPXAoaSwxMCksaT1yLHI9QSxiPVMsUz1FLEU9cChrLDEwKSxrPW0sbT1UfXZhciBJPXRoaXMuX2IraStFfDA7dGhpcy5fYj10aGlzLl9jK28rU3wwLHRoaXMuX2M9dGhpcy5fZCtkK2J8MCx0aGlzLl9kPXRoaXMuX2UrbittfDAsdGhpcy5fZT10aGlzLl9hK3Ira3wwLHRoaXMuX2E9SX0sZC5wcm90b3R5cGUuX2RpZ2VzdD1mdW5jdGlvbigpe3RoaXMuX2Jsb2NrW3RoaXMuX2Jsb2NrT2Zmc2V0KytdPTEyOCx0aGlzLl9ibG9ja09mZnNldD41NiYmKHRoaXMuX2Jsb2NrLmZpbGwoMCx0aGlzLl9ibG9ja09mZnNldCw2NCksdGhpcy5fdXBkYXRlKCksdGhpcy5fYmxvY2tPZmZzZXQ9MCksdGhpcy5fYmxvY2suZmlsbCgwLHRoaXMuX2Jsb2NrT2Zmc2V0LDU2KSx0aGlzLl9ibG9jay53cml0ZVVJbnQzMkxFKHRoaXMuX2xlbmd0aFswXSw1NiksdGhpcy5fYmxvY2sud3JpdGVVSW50MzJMRSh0aGlzLl9sZW5ndGhbMV0sNjApLHRoaXMuX3VwZGF0ZSgpO3ZhciB0PXIuYWxsb2M/ci5hbGxvYygyMCk6bmV3IHIoMjApO3JldHVybiB0LndyaXRlSW50MzJMRSh0aGlzLl9hLDApLHQud3JpdGVJbnQzMkxFKHRoaXMuX2IsNCksdC53cml0ZUludDMyTEUodGhpcy5fYyw4KSx0LndyaXRlSW50MzJMRSh0aGlzLl9kLDEyKSx0LndyaXRlSW50MzJMRSh0aGlzLl9lLDE2KSx0fSx0LmV4cG9ydHM9ZH0sZnVuY3Rpb24odCxlLG4peyhlPXQuZXhwb3J0cz1mdW5jdGlvbih0KXt0PXQudG9Mb3dlckNhc2UoKTt2YXIgbj1lW3RdO2lmKCFuKXRocm93IG5ldyBFcnJvcih0K1wiIGlzIG5vdCBzdXBwb3J0ZWQgKHdlIGFjY2VwdCBwdWxsIHJlcXVlc3RzKVwiKTtyZXR1cm4gbmV3IG59KS5zaGE9big1NyksZS5zaGExPW4oNTgpLGUuc2hhMjI0PW4oNTkpLGUuc2hhMjU2PW4oMjkpLGUuc2hhMzg0PW4oNjApLGUuc2hhNTEyPW4oMzApfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxpPW4oOSksbz1uKDYpLkJ1ZmZlcixzPVsxNTE4NTAwMjQ5LDE4NTk3NzUzOTMsLTE4OTQwMDc1ODgsLTg5OTQ5NzUxNF0sYT1uZXcgQXJyYXkoODApO2Z1bmN0aW9uIHUoKXt0aGlzLmluaXQoKSx0aGlzLl93PWEsaS5jYWxsKHRoaXMsNjQsNTYpfWZ1bmN0aW9uIGModCl7cmV0dXJuIHQ8PDMwfHQ+Pj4yfWZ1bmN0aW9uIGgodCxlLG4scil7cmV0dXJuIDA9PT10P2Umbnx+ZSZyOjI9PT10P2UmbnxlJnJ8biZyOmVebl5yfXIodSxpKSx1LnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2E9MTczMjU4NDE5Myx0aGlzLl9iPTQwMjMyMzM0MTcsdGhpcy5fYz0yNTYyMzgzMTAyLHRoaXMuX2Q9MjcxNzMzODc4LHRoaXMuX2U9MzI4NTM3NzUyMCx0aGlzfSx1LnByb3RvdHlwZS5fdXBkYXRlPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXRoaXMuX3cscj0wfHRoaXMuX2EsaT0wfHRoaXMuX2Isbz0wfHRoaXMuX2MsYT0wfHRoaXMuX2QsdT0wfHRoaXMuX2UsZj0wO2Y8MTY7KytmKW5bZl09dC5yZWFkSW50MzJCRSg0KmYpO2Zvcig7Zjw4MDsrK2YpbltmXT1uW2YtM11ebltmLThdXm5bZi0xNF1ebltmLTE2XTtmb3IodmFyIGw9MDtsPDgwOysrbCl7dmFyIGQ9fn4obC8yMCkscD0wfCgoZT1yKTw8NXxlPj4+MjcpK2goZCxpLG8sYSkrdStuW2xdK3NbZF07dT1hLGE9byxvPWMoaSksaT1yLHI9cH10aGlzLl9hPXIrdGhpcy5fYXwwLHRoaXMuX2I9aSt0aGlzLl9ifDAsdGhpcy5fYz1vK3RoaXMuX2N8MCx0aGlzLl9kPWErdGhpcy5fZHwwLHRoaXMuX2U9dSt0aGlzLl9lfDB9LHUucHJvdG90eXBlLl9oYXNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5hbGxvY1Vuc2FmZSgyMCk7cmV0dXJuIHQud3JpdGVJbnQzMkJFKDB8dGhpcy5fYSwwKSx0LndyaXRlSW50MzJCRSgwfHRoaXMuX2IsNCksdC53cml0ZUludDMyQkUoMHx0aGlzLl9jLDgpLHQud3JpdGVJbnQzMkJFKDB8dGhpcy5fZCwxMiksdC53cml0ZUludDMyQkUoMHx0aGlzLl9lLDE2KSx0fSx0LmV4cG9ydHM9dX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksaT1uKDkpLG89big2KS5CdWZmZXIscz1bMTUxODUwMDI0OSwxODU5Nzc1MzkzLC0xODk0MDA3NTg4LC04OTk0OTc1MTRdLGE9bmV3IEFycmF5KDgwKTtmdW5jdGlvbiB1KCl7dGhpcy5pbml0KCksdGhpcy5fdz1hLGkuY2FsbCh0aGlzLDY0LDU2KX1mdW5jdGlvbiBjKHQpe3JldHVybiB0PDw1fHQ+Pj4yN31mdW5jdGlvbiBoKHQpe3JldHVybiB0PDwzMHx0Pj4+Mn1mdW5jdGlvbiBmKHQsZSxuLHIpe3JldHVybiAwPT09dD9lJm58fmUmcjoyPT09dD9lJm58ZSZyfG4mcjplXm5ecn1yKHUsaSksdS5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9hPTE3MzI1ODQxOTMsdGhpcy5fYj00MDIzMjMzNDE3LHRoaXMuX2M9MjU2MjM4MzEwMix0aGlzLl9kPTI3MTczMzg3OCx0aGlzLl9lPTMyODUzNzc1MjAsdGhpc30sdS5wcm90b3R5cGUuX3VwZGF0ZT1mdW5jdGlvbih0KXtmb3IodmFyIGUsbj10aGlzLl93LHI9MHx0aGlzLl9hLGk9MHx0aGlzLl9iLG89MHx0aGlzLl9jLGE9MHx0aGlzLl9kLHU9MHx0aGlzLl9lLGw9MDtsPDE2OysrbCluW2xdPXQucmVhZEludDMyQkUoNCpsKTtmb3IoO2w8ODA7KytsKW5bbF09KGU9bltsLTNdXm5bbC04XV5uW2wtMTRdXm5bbC0xNl0pPDwxfGU+Pj4zMTtmb3IodmFyIGQ9MDtkPDgwOysrZCl7dmFyIHA9fn4oZC8yMCksZz1jKHIpK2YocCxpLG8sYSkrdStuW2RdK3NbcF18MDt1PWEsYT1vLG89aChpKSxpPXIscj1nfXRoaXMuX2E9cit0aGlzLl9hfDAsdGhpcy5fYj1pK3RoaXMuX2J8MCx0aGlzLl9jPW8rdGhpcy5fY3wwLHRoaXMuX2Q9YSt0aGlzLl9kfDAsdGhpcy5fZT11K3RoaXMuX2V8MH0sdS5wcm90b3R5cGUuX2hhc2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmFsbG9jVW5zYWZlKDIwKTtyZXR1cm4gdC53cml0ZUludDMyQkUoMHx0aGlzLl9hLDApLHQud3JpdGVJbnQzMkJFKDB8dGhpcy5fYiw0KSx0LndyaXRlSW50MzJCRSgwfHRoaXMuX2MsOCksdC53cml0ZUludDMyQkUoMHx0aGlzLl9kLDEyKSx0LndyaXRlSW50MzJCRSgwfHRoaXMuX2UsMTYpLHR9LHQuZXhwb3J0cz11fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KSxpPW4oMjkpLG89big5KSxzPW4oNikuQnVmZmVyLGE9bmV3IEFycmF5KDY0KTtmdW5jdGlvbiB1KCl7dGhpcy5pbml0KCksdGhpcy5fdz1hLG8uY2FsbCh0aGlzLDY0LDU2KX1yKHUsaSksdS5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9hPTMyMzgzNzEwMzIsdGhpcy5fYj05MTQxNTA2NjMsdGhpcy5fYz04MTI3MDI5OTksdGhpcy5fZD00MTQ0OTEyNjk3LHRoaXMuX2U9NDI5MDc3NTg1Nyx0aGlzLl9mPTE3NTA2MDMwMjUsdGhpcy5fZz0xNjk0MDc2ODM5LHRoaXMuX2g9MzIwNDA3NTQyOCx0aGlzfSx1LnByb3RvdHlwZS5faGFzaD1mdW5jdGlvbigpe3ZhciB0PXMuYWxsb2NVbnNhZmUoMjgpO3JldHVybiB0LndyaXRlSW50MzJCRSh0aGlzLl9hLDApLHQud3JpdGVJbnQzMkJFKHRoaXMuX2IsNCksdC53cml0ZUludDMyQkUodGhpcy5fYyw4KSx0LndyaXRlSW50MzJCRSh0aGlzLl9kLDEyKSx0LndyaXRlSW50MzJCRSh0aGlzLl9lLDE2KSx0LndyaXRlSW50MzJCRSh0aGlzLl9mLDIwKSx0LndyaXRlSW50MzJCRSh0aGlzLl9nLDI0KSx0fSx0LmV4cG9ydHM9dX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksaT1uKDMwKSxvPW4oOSkscz1uKDYpLkJ1ZmZlcixhPW5ldyBBcnJheSgxNjApO2Z1bmN0aW9uIHUoKXt0aGlzLmluaXQoKSx0aGlzLl93PWEsby5jYWxsKHRoaXMsMTI4LDExMil9cih1LGkpLHUucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYWg9MzQxODA3MDM2NSx0aGlzLl9iaD0xNjU0MjcwMjUwLHRoaXMuX2NoPTI0Mzg1MjkzNzAsdGhpcy5fZGg9MzU1NDYyMzYwLHRoaXMuX2VoPTE3MzE0MDU0MTUsdGhpcy5fZmg9MjM5NDE4MDIzMSx0aGlzLl9naD0zNjc1MDA4NTI1LHRoaXMuX2hoPTEyMDMwNjI4MTMsdGhpcy5fYWw9MzIzODM3MTAzMix0aGlzLl9ibD05MTQxNTA2NjMsdGhpcy5fY2w9ODEyNzAyOTk5LHRoaXMuX2RsPTQxNDQ5MTI2OTcsdGhpcy5fZWw9NDI5MDc3NTg1Nyx0aGlzLl9mbD0xNzUwNjAzMDI1LHRoaXMuX2dsPTE2OTQwNzY4MzksdGhpcy5faGw9MzIwNDA3NTQyOCx0aGlzfSx1LnByb3RvdHlwZS5faGFzaD1mdW5jdGlvbigpe3ZhciB0PXMuYWxsb2NVbnNhZmUoNDgpO2Z1bmN0aW9uIGUoZSxuLHIpe3Qud3JpdGVJbnQzMkJFKGUsciksdC53cml0ZUludDMyQkUobixyKzQpfXJldHVybiBlKHRoaXMuX2FoLHRoaXMuX2FsLDApLGUodGhpcy5fYmgsdGhpcy5fYmwsOCksZSh0aGlzLl9jaCx0aGlzLl9jbCwxNiksZSh0aGlzLl9kaCx0aGlzLl9kbCwyNCksZSh0aGlzLl9laCx0aGlzLl9lbCwzMiksZSh0aGlzLl9maCx0aGlzLl9mbCw0MCksdH0sdC5leHBvcnRzPXV9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYpLkJ1ZmZlcixpPW4oMjQpLlRyYW5zZm9ybSxvPW4oMjApLlN0cmluZ0RlY29kZXI7ZnVuY3Rpb24gcyh0KXtpLmNhbGwodGhpcyksdGhpcy5oYXNoTW9kZT1cInN0cmluZ1wiPT10eXBlb2YgdCx0aGlzLmhhc2hNb2RlP3RoaXNbdF09dGhpcy5fZmluYWxPckRpZ2VzdDp0aGlzLmZpbmFsPXRoaXMuX2ZpbmFsT3JEaWdlc3QsdGhpcy5fZmluYWwmJih0aGlzLl9fZmluYWw9dGhpcy5fZmluYWwsdGhpcy5fZmluYWw9bnVsbCksdGhpcy5fZGVjb2Rlcj1udWxsLHRoaXMuX2VuY29kaW5nPW51bGx9big0KShzLGkpLHMucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbih0LGUsbil7XCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXIuZnJvbSh0LGUpKTt2YXIgaT10aGlzLl91cGRhdGUodCk7cmV0dXJuIHRoaXMuaGFzaE1vZGU/dGhpczoobiYmKGk9dGhpcy5fdG9TdHJpbmcoaSxuKSksaSl9LHMucHJvdG90eXBlLnNldEF1dG9QYWRkaW5nPWZ1bmN0aW9uKCl7fSxzLnByb3RvdHlwZS5nZXRBdXRoVGFnPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwidHJ5aW5nIHRvIGdldCBhdXRoIHRhZyBpbiB1bnN1cHBvcnRlZCBzdGF0ZVwiKX0scy5wcm90b3R5cGUuc2V0QXV0aFRhZz1mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcInRyeWluZyB0byBzZXQgYXV0aCB0YWcgaW4gdW5zdXBwb3J0ZWQgc3RhdGVcIil9LHMucHJvdG90eXBlLnNldEFBRD1mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcInRyeWluZyB0byBzZXQgYWFkIGluIHVuc3VwcG9ydGVkIHN0YXRlXCIpfSxzLnByb3RvdHlwZS5fdHJhbnNmb3JtPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcjt0cnl7dGhpcy5oYXNoTW9kZT90aGlzLl91cGRhdGUodCk6dGhpcy5wdXNoKHRoaXMuX3VwZGF0ZSh0KSl9Y2F0Y2godCl7cj10fWZpbmFsbHl7bihyKX19LHMucHJvdG90eXBlLl9mbHVzaD1mdW5jdGlvbih0KXt2YXIgZTt0cnl7dGhpcy5wdXNoKHRoaXMuX19maW5hbCgpKX1jYXRjaCh0KXtlPXR9dChlKX0scy5wcm90b3R5cGUuX2ZpbmFsT3JEaWdlc3Q9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5fX2ZpbmFsKCl8fHIuYWxsb2MoMCk7cmV0dXJuIHQmJihlPXRoaXMuX3RvU3RyaW5nKGUsdCwhMCkpLGV9LHMucHJvdG90eXBlLl90b1N0cmluZz1mdW5jdGlvbih0LGUsbil7aWYodGhpcy5fZGVjb2Rlcnx8KHRoaXMuX2RlY29kZXI9bmV3IG8oZSksdGhpcy5fZW5jb2Rpbmc9ZSksdGhpcy5fZW5jb2RpbmchPT1lKXRocm93IG5ldyBFcnJvcihcImNhbid0IHN3aXRjaCBlbmNvZGluZ3NcIik7dmFyIHI9dGhpcy5fZGVjb2Rlci53cml0ZSh0KTtyZXR1cm4gbiYmKHIrPXRoaXMuX2RlY29kZXIuZW5kKCkpLHJ9LHQuZXhwb3J0cz1zfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PT10KXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbihlLHIpe3JldHVybiB0LmV4cG9ydHM9bj1PYmplY3Quc2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuX19wcm90b19fPWUsdH0sbihlLHIpfXQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7bi5yKGUpO3ZhciByPXt9O24ucihyKSxuLmQocixcIkJMT0NLQ0hBSU5fU1VQUE9SVFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGR9KSxuLmQocixcIldBTExFVF9TVVBQT1JUXCIsZnVuY3Rpb24oKXtyZXR1cm4gcH0pO3ZhciBpLG89bigxKSxzPW4ubihvKSxhPW4oNSksdT1uLm4oYSksYz1uKDIpLGg9bi5uKGMpLGY9bigzKSxsPW4ubihmKSxkPVwiYmxvY2tjaGFpbl9zdXBwb3J0XCIscD1cIndhbGxldF9zdXBwb3J0XCIsZz1uZXcoZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7aCgpKHRoaXMsdCksdGhpcy5wbHVnaW5zPVtdfXJldHVybiBsKCkodCxbe2tleTpcImxvYWRQbHVnaW5cIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLnBsdWdpbih0Lm5hbWUpfHx0aGlzLnBsdWdpbnMucHVzaCh0KX19LHtrZXk6XCJ3YWxsZXRzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wbHVnaW5zLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gdC50eXBlPT09cH0pfX0se2tleTpcInNpZ25hdHVyZVByb3ZpZGVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGx1Z2lucy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQudHlwZT09PWR9KX19LHtrZXk6XCJzdXBwb3J0ZWRCbG9ja2NoYWluc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJzKCkubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIG5hbWV9KX19LHtrZXk6XCJwbHVnaW5cIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5wbHVnaW5zLmZpbmQoZnVuY3Rpb24oZSl7cmV0dXJuIGUubmFtZT09PXR9KX19LHtrZXk6XCJlbmRvcnNlZE5ldHdvcmtzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD11KCkocy5hLm1hcmsoZnVuY3Rpb24gdCgpe3JldHVybiBzLmEud3JhcChmdW5jdGlvbih0KXtmb3IoOzspc3dpdGNoKHQucHJldj10Lm5leHQpe2Nhc2UgMDpyZXR1cm4gdC5uZXh0PTIsUHJvbWlzZS5hbGwodGhpcy5zaWduYXR1cmVQcm92aWRlcnMoKS5tYXAoZnVuY3Rpb24oKXt2YXIgdD11KCkocy5hLm1hcmsoZnVuY3Rpb24gdChlKXtyZXR1cm4gcy5hLndyYXAoZnVuY3Rpb24odCl7Zm9yKDs7KXN3aXRjaCh0LnByZXY9dC5uZXh0KXtjYXNlIDA6cmV0dXJuIHQubmV4dD0yLGUuZ2V0RW5kb3JzZWROZXR3b3JrKCk7Y2FzZSAyOnJldHVybiB0LmFicnVwdChcInJldHVyblwiLHQuc2VudCk7Y2FzZSAzOmNhc2VcImVuZFwiOnJldHVybiB0LnN0b3AoKX19LHQpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCkpKTtjYXNlIDI6cmV0dXJuIHQuYWJydXB0KFwicmV0dXJuXCIsdC5zZW50KTtjYXNlIDM6Y2FzZVwiZW5kXCI6cmV0dXJuIHQuc3RvcCgpfX0sdCx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfV0pLHR9KCkpLHk9bigyMSksdj1uLm4oeSksdz1uKDMxKSxfPW4ubih3KSxiPXt9LG09ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3tsb2NhbFN0b3JhZ2U6e3NldEl0ZW06ZnVuY3Rpb24odCxlKXtyZXR1cm4gYlt0XT1lfSxnZXRJdGVtOmZ1bmN0aW9uKHQpe3JldHVybiBiW3RdfHxudWxsfSxyZW1vdmVJdGVtOmZ1bmN0aW9uKHQpe3JldHVybiBkZWxldGUgYlt0XX19fTp3aW5kb3d9LGs9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7aCgpKHRoaXMsdCl9cmV0dXJuIGwoKSh0LG51bGwsW3trZXk6XCJzZXRBcHBLZXlcIix2YWx1ZTpmdW5jdGlvbih0KXttKCkubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhcHBrZXlcIix0KX19LHtrZXk6XCJnZXRBcHBLZXlcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBtKCkubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhcHBrZXlcIil9fSx7a2V5OlwicmVtb3ZlQXBwS2V5XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gbSgpLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYXBwa2V5XCIpfX0se2tleTpcInNldE5vbmNlXCIsdmFsdWU6ZnVuY3Rpb24odCl7bSgpLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibm9uY2VcIix0KX19LHtrZXk6XCJnZXROb25jZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIG0oKS5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5vbmNlXCIpfX0se2tleTpcInJlbW92ZU5vbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gbSgpLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwibm9uY2VcIil9fV0pLHR9KCksRT1uKDMyKSxTPW4ubihFKSx4PW4oMzMpLEE9bi5uKHgpLFQ9bigzNCksST1uLm4oVCksUj1udWxsLE89ITEsUD0hMSxCPVtdLEw9ZnVuY3Rpb24odCl7cmV0dXJuIEEoKShcInNoYTI1NlwiKS51cGRhdGUodCkuZGlnZXN0KFwiaGV4XCIpfSxDPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoMjQpO3JldHVybiBTKCkodCksdC5qb2luKFwiXCIpfSxNPWZ1bmN0aW9uKCl7dmFyIHQ7cmV0dXJuXCJ3d3cuXCI9PT0odD1cInVuZGVmaW5lZFwiPT10eXBlb2YgbG9jYXRpb24/aTpsb2NhdGlvbi5oYXNPd25Qcm9wZXJ0eShcImhvc3RuYW1lXCIpJiZsb2NhdGlvbi5ob3N0bmFtZS5sZW5ndGgmJlwibG9jYWxob3N0XCIhPT1sb2NhdGlvbi5ob3N0bmFtZT9sb2NhdGlvbi5ob3N0bmFtZTppKS5zdWJzdHIoMCw0KSYmKHQ9dC5yZXBsYWNlKFwid3d3LlwiLFwiXCIpKSx0fSxqPWsuZ2V0QXBwS2V5KCk7anx8KGo9XCJhcHBrZXk6XCIrQygpKTt2YXIgTixVPWZ1bmN0aW9uKCl7dmFyIHQ9MDxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGwsZT0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06bnVsbDtudWxsPT09dCYmbnVsbD09PWU/Ui5zZW5kKFwiNDAvQ29jb3MtQkNYXCIpOlIuc2VuZChcIjQyL0NvY29zLUJDWCxcIitKU09OLnN0cmluZ2lmeShbdCxlXSkpfSxGPW51bGwsRD1mdW5jdGlvbigpe3ZhciB0PSEhKDA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKSYmYXJndW1lbnRzWzBdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihlLG4pe0Y9e3Jlc29sdmU6ZSxyZWplY3Q6bn0sVShcInBhaXJcIix7ZGF0YTp7YXBwa2V5Omosb3JpZ2luOk0oKSxwYXNzdGhyb3VnaDp0fSxwbHVnaW46aX0pfSl9LHE9e30sVz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtoKCkodGhpcyx0KX1yZXR1cm4gbCgpKHQsbnVsbCxbe2tleTpcImluaXRcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06NmU1O2k9dCx0aGlzLnRpbWVvdXQ9ZX19LHtrZXk6XCJnZXRPcmlnaW5cIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBNKCl9fSx7a2V5OlwiYWRkRXZlbnRIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24odCxlKXtlfHwoZT1cImFwcFwiKSxxW2VdPXR9fSx7a2V5OlwicmVtb3ZlRXZlbnRIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24odCl7dHx8KHQ9XCJhcHBcIiksZGVsZXRlIHFbdF19fSx7a2V5OlwibGlua1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztyZXR1cm4gUHJvbWlzZS5yYWNlKFtuZXcgUHJvbWlzZShmdW5jdGlvbihlKXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe098fChlKCExKSxSJiYoUi5kaXNjb25uZWN0KCksUj1udWxsKSl9LHQudGltZW91dCl9KSxuZXcgUHJvbWlzZShmdW5jdGlvbigpe3ZhciB0PXUoKShzLmEubWFyayhmdW5jdGlvbiB0KGUpe3ZhciBuLHI7cmV0dXJuIHMuYS53cmFwKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5wcmV2PXQubmV4dCl7Y2FzZSAwOnJldHVybiBuPWZ1bmN0aW9uKCl7Ui5vbm1lc3NhZ2U9ZnVuY3Rpb24oaSl7aWYoLTE9PT1pLmRhdGEuaW5kZXhPZihcIjQyL0NvY29zLUJDWFwiKSlyZXR1cm4hMTt2YXIgbz1KU09OLnBhcnNlKGkuZGF0YS5yZXBsYWNlKFwiNDIvQ29jb3MtQkNYLFwiLFwiXCIpKSxzPV8oKShvLDIpLGE9c1swXSx1PXNbMV07cmV0dXJuXCJwYWlyZWRcIj09PWE/dCh1KTpcInJla2V5XCI9PT1hP2UoKTpcImFwaVwiPT09YT9uKHUpOlwiZXZlbnRcIj09PWE/cih1KTp2b2lkIDB9O3ZhciB0PWZ1bmN0aW9uKHQpe2lmKFA9dCl7dmFyIGU9ay5nZXRBcHBLZXkoKSxuPS0xPGouaW5kZXhPZihcImFwcGtleTpcIik/TChqKTpqO2UmJmU9PT1ufHwoay5zZXRBcHBLZXkobiksaj1rLmdldEFwcEtleSgpKX1GLnJlc29sdmUodCl9LGU9ZnVuY3Rpb24oKXtqPVwiYXBwa2V5OlwiK0MoKSxVKFwicmVrZXllZFwiLHtkYXRhOnthcHBrZXk6aixvcmlnaW46TSgpfSxwbHVnaW46aX0pfSxuPWZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBlPUIuZmluZChmdW5jdGlvbihlKXtyZXR1cm4gZS5pZD09PXQuaWR9KTtpZihlKUI9Qi5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUuaWQhPT10LmlkfSksXCJvYmplY3RcIj09PXYoKSh0LnJlc3VsdCkmJm51bGwhPT10LnJlc3VsdCYmdC5yZXN1bHQuaGFzT3duUHJvcGVydHkoXCJpc0Vycm9yXCIpP2UucmVqZWN0KHQucmVzdWx0KTplLnJlc29sdmUodC5yZXN1bHQpfX0scj1mdW5jdGlvbih0KXt2YXIgZT10LmV2ZW50LG49dC5wYXlsb2FkO09iamVjdC5rZXlzKHEpLmxlbmd0aCYmT2JqZWN0LmtleXMocSkubWFwKGZ1bmN0aW9uKHQpe3FbdF0oZSxuKX0pfX0scj1mdW5jdGlvbigpe3ZhciB0LHI9MDxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGw7cnx8KHQ9bmV3IFByb21pc2UoZnVuY3Rpb24odCl7cmV0dXJuIHI9dH0pKTt2YXIgaT1cIlwiLmNvbmNhdChcIndzOi8vXCIpLmNvbmNhdChcIjEyNy4wLjAuMTo1MDAwNVwiKS5jb25jYXQoXCIvc29ja2V0LmlvLz9FSU89MyZ0cmFuc3BvcnQ9d2Vic29ja2V0XCIpLG89bmV3IEkuYShpKTtyZXR1cm4gby5vbmVycm9yPWZ1bmN0aW9uKCl7ZSghMSkscighMSl9LG8ub25vcGVuPWZ1bmN0aW9uKCl7Uj1vLFUoKSxjbGVhclRpbWVvdXQobnVsbCksTz0hMCxEKCEwKS50aGVuKGZ1bmN0aW9uKCl7ZSghMCkscighMCl9KSxuKCl9LHR9LHQubmV4dD00LHIoKTtjYXNlIDQ6Y2FzZVwiZW5kXCI6cmV0dXJuIHQuc3RvcCgpfX0sdCl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKSldKX19LHtrZXk6XCJpc0Nvbm5lY3RlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIE99fSx7a2V5OlwiaXNQYWlyZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBQfX0se2tleTpcImRpc2Nvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBSJiZSLmNsb3NlKCksITB9fSx7a2V5OlwicmVtb3ZlQXBwS2V5c1wiLHZhbHVlOmZ1bmN0aW9uKCl7ay5yZW1vdmVBcHBLZXkoKSxrLnJlbW92ZU5vbmNlKCl9fSx7a2V5Olwic2VuZEFwaVJlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oZSxuKXtyZXR1cm5cImlkZW50aXR5RnJvbVBlcm1pc3Npb25zXCIhPT10LnR5cGV8fFA/dm9pZCBEKCkudGhlbihmdW5jdGlvbigpe2lmKCFQKXJldHVybiBuKHtjb2RlOlwibm90X3BhaXJlZFwiLG1lc3NhZ2U6XCJUaGUgdXNlciBkaWQgbm90IGFsbG93IHRoaXMgYXBwIHRvIGNvbm5lY3QgdG8gdGhlaXIgQ29jb3NcIn0pO3QuaWQ9QygpLHQuYXBwa2V5PWosdC5ub25jZT1rLmdldE5vbmNlKCl8fDA7dmFyIHI9QygpO3QubmV4dE5vbmNlPUwociksay5zZXROb25jZShyKSx0Lmhhc093blByb3BlcnR5KFwicGF5bG9hZFwiKSYmIXQucGF5bG9hZC5oYXNPd25Qcm9wZXJ0eShcIm9yaWdpblwiKSYmKHQucGF5bG9hZC5vcmlnaW49TSgpKSxCLnB1c2goT2JqZWN0LmFzc2lnbih0LHtyZXNvbHZlOmUscmVqZWN0Om59KSksVShcImFwaVwiLHtkYXRhOnQscGx1Z2luOml9KX0pOmUoITEpfSl9fV0pLHR9KCksWT1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgZT0wPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIixuPTE8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIlwiO2goKSh0aGlzLHQpLHRoaXMubmFtZT1lLHRoaXMudHlwZT1ufXJldHVybiBsKCkodCxbe2tleTpcImlzU2lnbmF0dXJlUHJvdmlkZXJcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnR5cGU9PT1kfX0se2tleTpcImlzVmFsaWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHJbdF19KS5pbmNsdWRlcyh0aGlzLnR5cGUpfX1dLFt7a2V5OlwicGxhY2Vob2xkZXJcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBuZXcgdH19LHtrZXk6XCJmcm9tSnNvblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuYXNzaWduKHQucGxhY2Vob2xkZXIoKSxlKX19XSksdH0oKSxIPXtFT1M6XCJlb3NcIixFVEg6XCJldGhcIixUUlg6XCJ0cnhcIixDT0NPU0JDWDpcImNvY29zQmN4XCJ9LHo9KE9iamVjdC5rZXlzKEgpLm1hcChmdW5jdGlvbih0KXtyZXR1cm57a2V5OnQsdmFsdWU6SFt0XX19KSxmdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgZT0wPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06SC5FT1Msbj0xPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJcIixyPTI8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcIlwiLGk9Mzxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOm51bGwsbz00PGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1s0XT9hcmd1bWVudHNbNF06bnVsbDtoKCkodGhpcyx0KSx0aGlzLmJsb2NrY2hhaW49ZSx0aGlzLmNvbnRyYWN0PW4sdGhpcy5zeW1ib2w9cix0aGlzLm5hbWU9aXx8cix0aGlzLmRlY2ltYWxzPW99cmV0dXJuIGwoKSh0LG51bGwsW3trZXk6XCJwbGFjZWhvbGRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB0fX0se2tleTpcImZyb21Kc29uXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5wbGFjZWhvbGRlcigpLHQpfX1dKSx0fSgpKSxLPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe3ZhciBlPTA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcIlwiLG49MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwiaHR0cHNcIixyPTI8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcIlwiLGk9Mzxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOjAsbz00PGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1s0XT9hcmd1bWVudHNbNF06SC5FT1Mscz01PGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1s1XT9hcmd1bWVudHNbNV06XCJcIjtoKCkodGhpcyx0KSx0aGlzLm5hbWU9ZSx0aGlzLnByb3RvY29sPW4sdGhpcy5ob3N0PXIsdGhpcy5wb3J0PWksdGhpcy5ibG9ja2NoYWluPW8sdGhpcy5jaGFpbklkPXMudG9TdHJpbmcoKSx0aGlzLnRva2VuPW51bGx9cmV0dXJuIGwoKSh0LFt7a2V5OlwiZnVsbGhvc3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwiXCIuY29uY2F0KHRoaXMucHJvdG9jb2wsXCI6Ly9cIikuY29uY2F0KHRoaXMuaG9zdCkuY29uY2F0KHRoaXMucG9ydD9cIjpcIjpcIlwiKS5jb25jYXQodGhpcy5wb3J0KX19LHtrZXk6XCJ1bmlxdWVcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybihcIlwiLmNvbmNhdCh0aGlzLmJsb2NrY2hhaW4sXCI6XCIpKyh0aGlzLmNoYWluSWQubGVuZ3RoP1wiY2hhaW46XCIuY29uY2F0KHRoaXMuY2hhaW5JZCk6XCJcIi5jb25jYXQodGhpcy5ob3N0LFwiOlwiKS5jb25jYXQodGhpcy5wb3J0KSkpLnRvTG93ZXJDYXNlKCl9fV0sW3trZXk6XCJwbGFjZWhvbGRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB0fX0se2tleTpcImZyb21Kc29uXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIG49T2JqZWN0LmFzc2lnbih0LnBsYWNlaG9sZGVyKCksZSk7cmV0dXJuIG4uY2hhaW5JZD1uLmNoYWluSWQ/bi5jaGFpbklkLnRvU3RyaW5nKCk6XCJcIixuLnRva2VuPWUuaGFzT3duUHJvcGVydHkoXCJ0b2tlblwiKSYmZS50b2tlbj96LmZyb21Kc29uKGUudG9rZW4pOm51bGwsbn19XSksdH0oKSxWPW4oMCksSj1uLm4oViksWD17ZGlzY29ubmVjdDpcImRpc2Nvbm5lY3RcIixpc0Nvbm5lY3RlZDpcImlzQ29ubmVjdGVkXCIsaXNQYWlyZWQ6XCJpc1BhaXJlZFwiLGFkZEV2ZW50SGFuZGxlcjpcImFkZEV2ZW50SGFuZGxlclwiLHJlbW92ZUV2ZW50SGFuZGxlcjpcInJlbW92ZUV2ZW50SGFuZGxlclwiLGxpc3RlbjpcImxpc3RlblwiLGdldEFjY291bnRJbmZvOlwiZ2V0QWNjb3VudEluZm9cIixnZXRWZXJzaW9uOlwiZ2V0VmVyc2lvblwiLGdldElkZW50aXR5OlwiZ2V0SWRlbnRpdHlcIixnZXRJZGVudGl0eUZyb21QZXJtaXNzaW9uczpcImdldElkZW50aXR5RnJvbVBlcm1pc3Npb25zXCIsZm9yZ2V0SWRlbnRpdHk6XCJmb3JnZXRJZGVudGl0eVwiLHVwZGF0ZUlkZW50aXR5OlwidXBkYXRlSWRlbnRpdHlcIixhdXRoZW50aWNhdGU6XCJhdXRoZW50aWNhdGVcIixnZXRBcmJpdHJhcnlTaWduYXR1cmU6XCJnZXRBcmJpdHJhcnlTaWduYXR1cmVcIixnZXRQdWJsaWNLZXk6XCJnZXRQdWJsaWNLZXlcIixsaW5rQWNjb3VudDpcImxpbmtBY2NvdW50XCIsaGFzQWNjb3VudEZvcjpcImhhc0FjY291bnRGb3JcIixzdWdnZXN0TmV0d29yazpcInN1Z2dlc3ROZXR3b3JrXCIscmVxdWVzdFRyYW5zZmVyOlwicmVxdWVzdFRyYW5zZmVyXCIscmVxdWVzdFNpZ25hdHVyZTpcInJlcXVlc3RTaWduYXR1cmVcIixjcmVhdGVUcmFuc2FjdGlvbjpcImNyZWF0ZVRyYW5zYWN0aW9uXCIsYWRkVG9rZW46XCJhZGRUb2tlblwiLHRyYW5zZmVyQXNzZXQ6XCJ0cmFuc2ZlckFzc2V0XCIsY2FsbENvbnRyYWN0RnVuY3Rpb246XCJjYWxsQ29udHJhY3RGdW5jdGlvblwiLGNyZWF0TkhBc3NldE9yZGVyOlwiY3JlYXROSEFzc2V0T3JkZXJcIix0cmFuc2Zlck5IQXNzZXQ6XCJ0cmFuc2Zlck5IQXNzZXRcIixmaWxsTkhBc3NldE9yZGVyOlwiZmlsbE5IQXNzZXRPcmRlclwiLGNhbmNlbE5IQXNzZXRPcmRlcjpcImNhbmNlbE5IQXNzZXRPcmRlclwifSxHPShOPXt9LEooKShOLFguZ2V0SWRlbnRpdHksXCJsb2dpblwiKSxKKCkoTixYLmZvcmdldElkZW50aXR5LFwibG9nb3V0XCIpLEooKShOLFguZ2V0SWRlbnRpdHlGcm9tUGVybWlzc2lvbnMsXCJjaGVja0xvZ2luXCIpLE4pLCQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUsbixyKXtoKCkodGhpcyx0KTt2YXIgaT1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQoZSxcIiBkb2VzIG5vdCBzdXBwb3J0IHRoZSBcIikuY29uY2F0KHQsXCIgbWV0aG9kLlwiKSl9fTtPYmplY3Qua2V5cyhYKS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHQsZSl7dm9pZCAwPT09cltlXSYmKHJbZV09dHx8aShlKSksR1tlXSYmdm9pZCAwPT09cltHW2VdXSYmKHJbR1tlXV09cltlXT9yW2VdOmkoZSkpfShuW3RdLHQpfSl9cmV0dXJuIGwoKSh0LG51bGwsW3trZXk6XCJiaW5kQmFzaWNzXCIsdmFsdWU6ZnVuY3Rpb24odCl7dC5hY2NvdW50PWZ1bmN0aW9uKCl7cmV0dXJuIHQuYWNjb3VudF9uYW1lP3QuYWNjb3VudF9uYW1lOnZvaWQgMH19fV0pLHR9KCksUT1uKDEzKSxaPW4ubihRKSx0dD1uKDE0KSxldD1uLm4odHQpLG50PW4oMTUpLHJ0PW4ubihudCksaXQ9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LG4pe3ZhciByO3JldHVybiBoKCkodGhpcyxlKSwocj1aKCkodGhpcyxldCgpKGUpLmNhbGwodGhpcyxILkVPUyxwKSkpLm5hbWU9XCJDb2Nvc1NvY2tldHNcIixyLmNvbnRleHQ9dCxyLmhvbGRlckZucz1uLHJ9cmV0dXJuIHJ0KCkoZSx0KSxsKCkoZSxbe2tleTpcImNvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9O3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyKXtpZighdHx8IXQubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IHNwZWNpZnkgYSBuYW1lIGZvciB0aGlzIGNvbm5lY3Rpb25cIik7bj1PYmplY3QuYXNzaWduKHtpbml0VGltZW91dDoxZTQsbGlua1RpbWVvdXQ6M2U0fSxuKSxXLmluaXQodCxuLmxpbmtUaW1lb3V0KSxXLmxpbmsoKS50aGVuKGZ1bmN0aW9uKCl7dmFyIHQ9dSgpKHMuYS5tYXJrKGZ1bmN0aW9uIHQobil7cmV0dXJuIHMuYS53cmFwKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5wcmV2PXQubmV4dCl7Y2FzZSAwOmlmKG4pe3QubmV4dD0yO2JyZWFrfXJldHVybiB0LmFicnVwdChcInJldHVyblwiLCExKTtjYXNlIDI6cmV0dXJuIGUuaG9sZGVyRm5zLmdldCgpLmlzRXh0ZW5zaW9uPSExLGUuaG9sZGVyRm5zLmdldCgpLndhbGxldHx8KGUuaG9sZGVyRm5zLmdldCgpLndhbGxldD1lLm5hbWUpLHQuYWJydXB0KFwicmV0dXJuXCIscighMCkpO2Nhc2UgNTpjYXNlXCJlbmRcIjpyZXR1cm4gdC5zdG9wKCl9fSx0KX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpKX0pfX0se2tleTpcInJ1bkFmdGVySW50ZXJmYWNpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXUoKShzLmEubWFyayhmdW5jdGlvbiB0KCl7dmFyIGU9dGhpcztyZXR1cm4gcy5hLndyYXAoZnVuY3Rpb24odCl7Zm9yKDs7KXN3aXRjaCh0LnByZXY9dC5uZXh0KXtjYXNlIDA6cmV0dXJuIHRoaXMuaG9sZGVyRm5zLmdldCgpLmFkZEV2ZW50SGFuZGxlcihmdW5jdGlvbih0LG4pe3JldHVybiBlLmV2ZW50SGFuZGxlcih0LG4pfSxcImludGVybmFsXCIpLHQubmV4dD0zLHRoaXMuaG9sZGVyRm5zLmdldCgpLmdldElkZW50aXR5RnJvbVBlcm1pc3Npb25zKCk7Y2FzZSAzOnJldHVybiB0aGlzLmhvbGRlckZucy5nZXQoKS5hY2NvdW50X25hbWU9dC5zZW50LHQuYWJydXB0KFwicmV0dXJuXCIsITApO2Nhc2UgNTpjYXNlXCJlbmRcIjpyZXR1cm4gdC5zdG9wKCl9fSx0LHRoaXMpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJtZXRob2RzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMsbj1mdW5jdGlvbih0LG4pe3JldHVybih0fHxuKSYmKGUuaG9sZGVyRm5zLmdldCgpLmFjY291bnRfbmFtZT10KSxufHx0fTtyZXR1cm4gdD17fSxKKCkodCxYLmRpc2Nvbm5lY3QsZnVuY3Rpb24oKXtyZXR1cm4gVy5kaXNjb25uZWN0KCl9KSxKKCkodCxYLmlzQ29ubmVjdGVkLGZ1bmN0aW9uKCl7cmV0dXJuIFcuaXNDb25uZWN0ZWQoKX0pLEooKSh0LFguaXNQYWlyZWQsZnVuY3Rpb24oKXtyZXR1cm4gVy5pc1BhaXJlZCgpfSksSigpKHQsWC5hZGRFdmVudEhhbmRsZXIsZnVuY3Rpb24odCl7dmFyIGU9MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOm51bGw7cmV0dXJuIFcuYWRkRXZlbnRIYW5kbGVyKHQsZSl9KSxKKCkodCxYLnJlbW92ZUV2ZW50SGFuZGxlcixmdW5jdGlvbigpe3ZhciB0PTA8YXJndW1lbnRzLmxlbmd0aCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpudWxsO3JldHVybiBXLnJlbW92ZUV2ZW50SGFuZGxlcih0KX0pLEooKSh0LFgubGlzdGVuLGZ1bmN0aW9uKHQpe3JldHVybiBXLmFkZEV2ZW50SGFuZGxlcih0KX0pLEooKSh0LFguZ2V0VmVyc2lvbixmdW5jdGlvbigpe3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiZ2V0VmVyc2lvblwiLHBheWxvYWQ6e319KX0pLEooKSh0LFguZ2V0SWRlbnRpdHksZnVuY3Rpb24odCl7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJnZXRPclJlcXVlc3RJZGVudGl0eVwiLHBheWxvYWQ6e2ZpZWxkczp0fHx7YWNjb3VudHM6W2UuaG9sZGVyRm5zLmdldCgpLm5ldHdvcmtdfX19KS50aGVuKG4pfSksSigpKHQsWC5nZXRJZGVudGl0eUZyb21QZXJtaXNzaW9ucyxmdW5jdGlvbigpe3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiaWRlbnRpdHlGcm9tUGVybWlzc2lvbnNcIixwYXlsb2FkOnt9fSkudGhlbihuKX0pLEooKSh0LFgubG9ja0FjY291bnQsZnVuY3Rpb24oKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImxvY2tBY2NvdW50XCIscGF5bG9hZDp7fX0pLnRoZW4obil9KSxKKCkodCxYLmZvcmdldElkZW50aXR5LGZ1bmN0aW9uKCl7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJmb3JnZXRJZGVudGl0eVwiLHBheWxvYWQ6e319KS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybiBuKG51bGwsdCl9KX0pLEooKSh0LFgudXBkYXRlSWRlbnRpdHksZnVuY3Rpb24odCl7dmFyIGU9dC5uYW1lLHI9dC5reWM7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJ1cGRhdGVJZGVudGl0eVwiLHBheWxvYWQ6e25hbWU6ZSxreWM6cn19KS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybiB0P24odCk6bnVsbH0pfSksSigpKHQsWC5hdXRoZW50aWNhdGUsZnVuY3Rpb24odCl7dmFyIGU9MTxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOm51bGwsbj0yPGFyZ3VtZW50cy5sZW5ndGgmJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06bnVsbDtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImF1dGhlbnRpY2F0ZVwiLHBheWxvYWQ6e25vbmNlOnQsZGF0YTplLHB1YmxpY0tleTpufX0pfSksSigpKHQsWC5nZXRBcmJpdHJhcnlTaWduYXR1cmUsZnVuY3Rpb24odCxlKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcInJlcXVlc3RBcmJpdHJhcnlTaWduYXR1cmVcIixwYXlsb2FkOntwdWJsaWNLZXk6dCxkYXRhOmV9fSl9KSxKKCkodCxYLmdldFB1YmxpY0tleSxmdW5jdGlvbih0KXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImdldFB1YmxpY0tleVwiLHBheWxvYWQ6e2Jsb2NrY2hhaW46dH19KX0pLEooKSh0LFgubGlua0FjY291bnQsZnVuY3Rpb24odCxuKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImxpbmtBY2NvdW50XCIscGF5bG9hZDp7YWNjb3VudDp0LG5ldHdvcms6bnx8ZS5ob2xkZXJGbnMuZ2V0KCkubmV0d29ya319KX0pLEooKSh0LFguaGFzQWNjb3VudEZvcixmdW5jdGlvbih0KXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImhhc0FjY291bnRGb3JcIixwYXlsb2FkOntuZXR3b3JrOnR8fGUuaG9sZGVyRm5zLmdldCgpLm5ldHdvcmt9fSl9KSxKKCkodCxYLnN1Z2dlc3ROZXR3b3JrLGZ1bmN0aW9uKHQpe3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwicmVxdWVzdEFkZE5ldHdvcmtcIixwYXlsb2FkOntuZXR3b3JrOnR8fGUuaG9sZGVyRm5zLmdldCgpLm5ldHdvcmt9fSl9KSxKKCkodCxYLnJlcXVlc3RUcmFuc2ZlcixmdW5jdGlvbih0LG4scil7dmFyIGk9Mzxhcmd1bWVudHMubGVuZ3RoJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOnt9O3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwicmVxdWVzdFRyYW5zZmVyXCIscGF5bG9hZDp7bmV0d29yazp0fHxlLmhvbGRlckZucy5nZXQoKS5uZXR3b3JrLHRvOm4sYW1vdW50OnIsb3B0aW9uczppfX0pfSksSigpKHQsWC5jYWxsQ29udHJhY3RGdW5jdGlvbixmdW5jdGlvbih0LG4scixpLG8scyl7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJjYWxsQ29udHJhY3RGdW5jdGlvblwiLHBheWxvYWQ6e25ldHdvcms6dHx8ZS5ob2xkZXJGbnMuZ2V0KCkubmV0d29yayxuYW1lT3JJZDpuLGZ1bmN0aW9uTmFtZTpyLHZhbHVlTGlzdDppLHJ1bnRpbWU6byxvbmx5R2V0RmVlOnN9fSl9KSxKKCkodCxYLmNyZWF0TkhBc3NldE9yZGVyLGZ1bmN0aW9uKHQsbixyLGksbyxzLGEsdSl7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJjcmVhdE5IQXNzZXRPcmRlclwiLHBheWxvYWQ6e25ldHdvcms6dHx8ZS5ob2xkZXJGbnMuZ2V0KCkubmV0d29yayxvdGNBY2NvdW50Om4sb3JkZXJGZWU6cixOSEFzc2V0SWQ6aSxwcmljZTpvLHByaWNlQXNzZXRJZDpzLGV4cGlyYXRpb246YSxtZW1vOnV9fSl9KSxKKCkodCxYLmZpbGxOSEFzc2V0T3JkZXIsZnVuY3Rpb24odCxuKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImZpbGxOSEFzc2V0T3JkZXJcIixwYXlsb2FkOntuZXR3b3JrOnR8fGUuaG9sZGVyRm5zLmdldCgpLm5ldHdvcmssb3JkZXJJZDpufX0pfSksSigpKHQsWC5jYW5jZWxOSEFzc2V0T3JkZXIsZnVuY3Rpb24odCxuKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImNhbmNlbE5IQXNzZXRPcmRlclwiLHBheWxvYWQ6e25ldHdvcms6dHx8ZS5ob2xkZXJGbnMuZ2V0KCkubmV0d29yayxvcmRlcklkOm59fSl9KSxKKCkodCxYLnRyYW5zZmVyTkhBc3NldCxmdW5jdGlvbih0LG4scil7cmV0dXJuIFcuc2VuZEFwaVJlcXVlc3Qoe3R5cGU6XCJ0cmFuc2Zlck5IQXNzZXRcIixwYXlsb2FkOntuZXR3b3JrOnR8fGUuaG9sZGVyRm5zLmdldCgpLm5ldHdvcmssdG9BY2NvdW50Om4sTkhBc3NldElkczpyfX0pfSksSigpKHQsWC5nZXRBY2NvdW50SW5mbyxmdW5jdGlvbih0KXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImdldEFjY291bnRJbmZvXCIscGF5bG9hZDp7bmV0d29yazp0fHxlLmhvbGRlckZucy5nZXQoKS5uZXR3b3JrfX0pfSksSigpKHQsWC5yZXF1ZXN0U2lnbmF0dXJlLGZ1bmN0aW9uKHQpe3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwicmVxdWVzdFNpZ25hdHVyZVwiLHBheWxvYWQ6dH0pfSksSigpKHQsWC5jcmVhdGVUcmFuc2FjdGlvbixmdW5jdGlvbih0LG4scixpKXtyZXR1cm4gVy5zZW5kQXBpUmVxdWVzdCh7dHlwZTpcImNyZWF0ZVRyYW5zYWN0aW9uXCIscGF5bG9hZDp7YmxvY2tjaGFpbjp0LGFjdGlvbnM6bixhY2NvdW50OnIsbmV0d29yazppfHxlLmhvbGRlckZucy5nZXQoKS5uZXR3b3JrfX0pfSksSigpKHQsWC5hZGRUb2tlbixmdW5jdGlvbih0LG4pe3JldHVybiBXLnNlbmRBcGlSZXF1ZXN0KHt0eXBlOlwiYWRkVG9rZW5cIixwYXlsb2FkOnt0b2tlbjp0LG5ldHdvcms6bnx8ZS5ob2xkZXJGbnMuZ2V0KCkubmV0d29ya319KX0pLHR9fSx7a2V5OlwiZXZlbnRIYW5kbGVyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD11KCkocy5hLm1hcmsoZnVuY3Rpb24gdChlKXtyZXR1cm4gcy5hLndyYXAoZnVuY3Rpb24odCl7Zm9yKDs7KXN3aXRjaCh0LnByZXY9dC5uZXh0KXtjYXNlIDA6dC50MD1lLHQubmV4dD10LnQwPT09dXQuRGlzY29ubmVjdGVkPzM6dC50MD09PXV0LkxvZ2dlZE91dD81Ojk7YnJlYWs7Y2FzZSAzOnJldHVybiB0aGlzLmhvbGRlckZucy5nZXQoKS5hY2NvdW50X25hbWU9bnVsbCx0LmFicnVwdChcImJyZWFrXCIsOSk7Y2FzZSA1OnJldHVybiB0Lm5leHQ9Nyx0aGlzLmhvbGRlckZucy5nZXQoKS5nZXRJZGVudGl0eUZyb21QZXJtaXNzaW9ucygpO2Nhc2UgNzpyZXR1cm4gdGhpcy5ob2xkZXJGbnMuZ2V0KCkuYWNjb3VudF9uYW1lPXQuc2VudCx0LmFicnVwdChcImJyZWFrXCIsOSk7Y2FzZSA5OmNhc2VcImVuZFwiOnJldHVybiB0LnN0b3AoKX19LHQsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX1dKSxlfShZKSxvdD0hMSxzdD1mdW5jdGlvbigpe3ZhciB0PXUoKShzLmEubWFyayhmdW5jdGlvbiB0KCl7dmFyIGUsbixyPWFyZ3VtZW50cztyZXR1cm4gcy5hLndyYXAoZnVuY3Rpb24odCl7Zm9yKDs7KXN3aXRjaCh0LnByZXY9dC5uZXh0KXtjYXNlIDA6cmV0dXJuIGU9MDxyLmxlbmd0aCYmdm9pZCAwIT09clswXT9yWzBdOm51bGwsbj0xPHIubGVuZ3RoJiZ2b2lkIDAhPT1yWzFdP3JbMV06MCx0LmFicnVwdChcInJldHVyblwiLG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQpe3JldHVybiBlfHwoZT10KSxvdD9lKCEwKTo1PG4/ZSghMSk6dm9pZCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHN0KGUsbisxKX0sMTAwKX0pKTtjYXNlIDM6Y2FzZVwiZW5kXCI6cmV0dXJuIHQuc3RvcCgpfX0sdCl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKSxhdD1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQsbil7dmFyIHI7cmV0dXJuIGgoKSh0aGlzLGUpLChyPVooKSh0aGlzLGV0KCkoZSkuY2FsbCh0aGlzLEguQ09DT1NCQ1gscCkpKS5uYW1lPVwiQ29jb3NFeHRlbnNpb25cIixyLmNvbnRleHQ9dCxyLmhvbGRlckZucz1uLHJ9cmV0dXJuIHJ0KCkoZSx0KSxsKCkoZSxbe2tleTpcImNvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiYodm9pZCAwIT09d2luZG93LkJjeFdlYiYmdm9pZCAwIT09d2luZG93LkJjeFdlYi5CQ1h8fHZvaWQgMCE9PXdpbmRvdy5CY3hXZWImJnZvaWQgMCE9PXdpbmRvdy5CY3hXZWIuZ2V0QWNjb3VudEluZm8oKT9vdD0hMDpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29jb3NMb2FkZWRcIixmdW5jdGlvbigpe3JldHVybiBvdD0hMH0pKSxuZXcgUHJvbWlzZShmdW5jdGlvbigpe3ZhciBlPXUoKShzLmEubWFyayhmdW5jdGlvbiBlKG4pe3JldHVybiBzLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDpyZXR1cm4gZS5uZXh0PTIsc3QoKTtjYXNlIDI6ZS5zZW50JiYoIXQuaG9sZGVyRm5zLmdldCgpLndhbGxldCYmKHQuaG9sZGVyRm5zLmdldCgpLndhbGxldD10Lm5hbWUpLG4oITApKTtjYXNlIDQ6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKSl9fSx7a2V5OlwicnVuQmVmb3JlSW50ZXJmYWNpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXUoKShzLmEubWFyayhmdW5jdGlvbiB0KCl7dmFyIGU7cmV0dXJuIHMuYS53cmFwKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5wcmV2PXQubmV4dCl7Y2FzZSAwOnJldHVybiB0aGlzLmhvbGRlckZucy5nZXQoKS53YWxsZXQ9PT10aGlzLm5hbWUmJih3aW5kb3cuQmN4V2ViLndhbGxldD10aGlzLm5hbWUsZT10aGlzLmhvbGRlckZucy5nZXQoKSx2b2lkIDA9PT13aW5kb3cuQmN4V2ViP3ZvaWQgMCE9PXdpbmRvdy5CY3hXZWImJnZvaWQgMCE9PXdpbmRvdy5CY3hXZWIuZ2V0QWNjb3VudEluZm8oKSYmKGUuY29jb3NCY3g9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LkJjeFdlYn0pOmUuY29jb3NCY3g9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LkJjeFdlYn0pLHRoaXMuaG9sZGVyRm5zLnNldChlKSx0aGlzLmNvbnRleHQ9dGhpcy5ob2xkZXJGbnMuZ2V0KCksdC5hYnJ1cHQoXCJyZXR1cm5cIiwhMCk7Y2FzZSA0OmNhc2VcImVuZFwiOnJldHVybiB0LnN0b3AoKX19LHQsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcInJ1bkFmdGVySW50ZXJmYWNpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXUoKShzLmEubWFyayhmdW5jdGlvbiB0KCl7cmV0dXJuIHMuYS53cmFwKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5wcmV2PXQubmV4dCl7Y2FzZSAwOnJldHVybiB0aGlzLmNvbnRleHQuaXNFeHRlbnNpb249ITAsdC5hYnJ1cHQoXCJyZXR1cm5cIiwhMCk7Y2FzZSAyOmNhc2VcImVuZFwiOnJldHVybiB0LnN0b3AoKX19LHQsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcIm1ldGhvZHNcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBKKCkoe30sWC5nZXRJZGVudGl0eSxmdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiZ2V0aWRcIil9KX19XSksZX0oWSk7bi5kKGUsXCJFVkVOVFNcIixmdW5jdGlvbigpe3JldHVybiB1dH0pLG4uZChlLFwiUGx1Z2luXCIsZnVuY3Rpb24oKXtyZXR1cm4gWX0pLG4uZChlLFwiUGx1Z2luVHlwZXNcIixmdW5jdGlvbigpe3JldHVybiByfSksbi5kKGUsXCJCbG9ja2NoYWluc1wiLGZ1bmN0aW9uKCl7cmV0dXJuIEh9KSxuLmQoZSxcIk5ldHdvcmtcIixmdW5jdGlvbigpe3JldHVybiBLfSksbi5kKGUsXCJTb2NrZXRTZXJ2aWNlXCIsZnVuY3Rpb24oKXtyZXR1cm4gV30pLG4uZChlLFwiV2FsbGV0SW50ZXJmYWNlXCIsZnVuY3Rpb24oKXtyZXR1cm4gJH0pLG4uZChlLFwiV0FMTEVUX01FVEhPRFNcIixmdW5jdGlvbigpe3JldHVybiBYfSk7dmFyIHV0PXtEaXNjb25uZWN0ZWQ6XCJkY2VkXCIsTG9nZ2VkT3V0OlwibG9nb3V0XCJ9LGN0PVtdLGh0PXt9LGZ0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2goKSh0aGlzLHQpLHRoaXMuYWNjb3VudF9uYW1lPW51bGwsdGhpcy5uZXR3b3JrPW51bGwsZy5sb2FkUGx1Z2luKG5ldyBpdCh0aGlzLGh0KSksZy5sb2FkUGx1Z2luKG5ldyBhdCh0aGlzLGh0KSl9cmV0dXJuIGwoKSh0LFt7a2V5OlwibG9hZFBsdWdpblwiLHZhbHVlOmZ1bmN0aW9uKHQpe2lmKCF0LmlzVmFsaWQoKSl0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQodC5uYW1lLFwiIGRvZXNuJ3Qgc2VlbSB0byBiZSBhIHZhbGlkIENvY29zSlMgcGx1Z2luLlwiKSk7Zy5sb2FkUGx1Z2luKHQpLHQudHlwZT09PWQmJih0aGlzW3QubmFtZV09dC5zaWduYXR1cmVQcm92aWRlcihmdW5jdGlvbigpe2lmKCFodC5nZXQoKS5hY2NvdW50X25hbWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gSWRlbnRpdHlcIil9LGZ1bmN0aW9uKCl7cmV0dXJuIGh0LmdldCgpLmFjY291bnRfbmFtZX0pLHRoaXNbdC5uYW1lK1wiSG9va1wiXT10Lmhvb2tQcm92aWRlcixjdC5wdXNoKHQuc2V0U29ja2V0U2VydmljZSkpLHQudHlwZT09PXAmJnQuaW5pdCh0aGlzLGh0LGN0KX19LHtrZXk6XCJjb25uZWN0XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD11KCkocy5hLm1hcmsoZnVuY3Rpb24gdChlLG4pe3ZhciByO3JldHVybiBzLmEud3JhcChmdW5jdGlvbih0KXtmb3IoOzspc3dpdGNoKHQucHJldj10Lm5leHQpe2Nhc2UgMDpyZXR1cm4gbnx8KG49e30pLHRoaXMubmV0d29yaz1uLmhhc093blByb3BlcnR5KFwibmV0d29ya1wiKT9uLm5ldHdvcms6bnVsbCxyPWcud2FsbGV0cygpLHQubmV4dD01LFByb21pc2UucmFjZShyLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdC5jb25uZWN0KGUsbikudGhlbih1KCkocy5hLm1hcmsoZnVuY3Rpb24gZSgpe3JldHVybiBzLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LnJ1bkJlZm9yZUludGVyZmFjaW5nKXtlLm5leHQ9MzticmVha31yZXR1cm4gZS5uZXh0PTMsdC5ydW5CZWZvcmVJbnRlcmZhY2luZygpO2Nhc2UgMzppZihuZXcgJCh0Lm5hbWUsdC5tZXRob2RzKCksaHQuZ2V0KCkpLFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQucnVuQWZ0ZXJJbnRlcmZhY2luZyl7ZS5uZXh0PTc7YnJlYWt9cmV0dXJuIGUubmV4dD03LHQucnVuQWZ0ZXJJbnRlcmZhY2luZygpO2Nhc2UgNzpyZXR1cm4gJC5iaW5kQmFzaWNzKGh0LmdldCgpKSxlLmFicnVwdChcInJldHVyblwiLCEwKTtjYXNlIDk6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSl9KSkpfSkuY29uY2F0KG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHQoITEpfSxuLmluaXRUaW1lb3V0fHw1ZTMpfSkpKTtjYXNlIDU6cmV0dXJuIHQuYWJydXB0KFwicmV0dXJuXCIsdC5zZW50KTtjYXNlIDY6Y2FzZVwiZW5kXCI6cmV0dXJuIHQuc3RvcCgpfX0sdCx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfV0pLHR9KCksbHQ9bmV3IFByb3h5KG5ldyhmdW5jdGlvbigpe2Z1bmN0aW9uIHQoZSl7aCgpKHRoaXMsdCksdGhpcy5jb2Nvcz1lfXJldHVybiBsKCkodCxbe2tleTpcInBsdWdpbnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7aWYoIXRoaXMuY29jb3MuaXNFeHRlbnNpb24pe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLG49QXJyYXkoZSkscj0wO3I8ZTtyKyspbltyXT1hcmd1bWVudHNbcl07bi5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIHQuY29jb3MubG9hZFBsdWdpbihlKX0pfX19LHtrZXk6XCJjb25uZWN0XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4odD10aGlzLmNvY29zKS5jb25uZWN0LmFwcGx5KHQsYXJndW1lbnRzKX19LHtrZXk6XCJjYXRjaEFsbFwiLHZhbHVlOmZ1bmN0aW9uKCl7fX1dKSx0fSgpKShuZXcgZnQpLHtnZXQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09dFtlXT90LmNvY29zW2VdOnRbZV19fSk7aHQuc2V0PWZ1bmN0aW9uKHQpe3JldHVybiBsdC5jb2Nvcz10fSxodC5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gbHQuY29jb3N9LFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuQ29jb3Nqcz1sdCksbHQuUGx1Z2luPVksbHQuUGx1Z2luVHlwZXM9cixsdC5CbG9ja2NoYWlucz1ILGx0Lk5ldHdvcms9SyxsdC5Ub2tlbj16LGx0LlNvY2tldFNlcnZpY2U9VyxsdC5FVkVOVFM9dXQsbHQuV2FsbGV0SW50ZXJmYWNlPSQsbHQuV0FMTEVUX01FVEhPRFM9WCx3aW5kb3cuQ29jb3Nqcz1sdDtlLmRlZmF1bHQ9Q29jb3Nqc31dKTsiXX0=
//------QC-SOURCE-SPLIT------
