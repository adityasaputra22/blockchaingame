
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS5qcyJdLCJuYW1lcyI6WyJiY3hBZGFwdGVyIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhclByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJtYXhTdGFyRHVyYXRpb24iLCJtaW5TdGFyRHVyYXRpb24iLCJncm91bmQiLCJOb2RlIiwicGxheWVyIiwic2NvcmVEaXNwbGF5IiwiTGFiZWwiLCJhY2NvdW50RGlzcGxheSIsImJhbGFuY2VEaXNwbGF5Iiwic2NvcmVBdWRpbyIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdyb3VuZFkiLCJ5IiwiaGVpZ2h0IiwidGltZXIiLCJzdGFyRHVyYXRpb24iLCJzcGF3bk5ld1N0YXIiLCJzY29yZSIsImFjY291bnRfbmFtZSIsInNlbGYiLCJpbml0U0RLIiwicmVzIiwiY29uc29sZSIsImxvZyIsImxvZ2luIiwic3RyaW5nIiwiZ2V0QmFsYW5jZUJ5QWNjb3VudCIsImRhdGEiLCJDT0NPUyIsIm5ld1N0YXIiLCJpbnN0YW50aWF0ZSIsIm5vZGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwianVtcEhlaWdodCIsIm1heFgiLCJ3aWR0aCIsInYyIiwidXBkYXRlIiwiZHQiLCJnYW1lT3ZlciIsImVuYWJsZWQiLCJnYWluU2NvcmUiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJzdG9wQWxsQWN0aW9ucyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwic2VuZFdpbkNvY29zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBREo7QUFLUkMsSUFBQUEsZUFBZSxFQUFFLENBTFQ7QUFNUkMsSUFBQUEsZUFBZSxFQUFFLENBTlQ7QUFPUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKSixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1U7QUFGTCxLQVBBO0FBV1JDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLElBREw7QUFFSk4sTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNVO0FBRkwsS0FYQTtBQWVSRSxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDYTtBQUZDLEtBZk47QUFtQlJDLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWlQsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkcsS0FuQlI7QUF1QlJFLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWlYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNhO0FBRkcsS0F2QlI7QUEyQlJHLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUlgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNpQjtBQUZEO0FBM0JKLEdBSFA7QUFvQ0xDLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQixTQUFLQyxPQUFMLEdBQWUsS0FBS1YsTUFBTCxDQUFZVyxDQUFaLEdBQWdCLEtBQUtYLE1BQUwsQ0FBWVksTUFBWixHQUFtQixDQUFsRDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLFNBQUtDLFlBQUw7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQUMsSUFBQUEsSUFBSSxHQUFHLElBQVA7O0FBQ0EsUUFBRzdCLFVBQUgsRUFBYztBQUNWQSxNQUFBQSxVQUFVLENBQUM4QixPQUFYLENBQW1CLFVBQVNDLEdBQVQsRUFBYTtBQUM1QkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUFzQkYsR0FBdEI7O0FBQ0YsWUFBR0EsR0FBSCxFQUFPO0FBQ0wvQixVQUFBQSxVQUFVLENBQUNrQyxLQUFYLENBQWlCLFVBQVNILEdBQVQsRUFBYTtBQUMxQkMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWixFQUFvQkYsR0FBcEI7QUFDQUYsWUFBQUEsSUFBSSxDQUFDYixjQUFMLENBQW9CbUIsTUFBcEIsR0FBNkJKLEdBQUcsQ0FBQ0gsWUFBakM7QUFDQUMsWUFBQUEsSUFBSSxDQUFDRCxZQUFMLEdBQW9CRyxHQUFHLENBQUNILFlBQXhCO0FBQ0E1QixZQUFBQSxVQUFVLENBQUNvQyxtQkFBWCxDQUErQkwsR0FBRyxDQUFDSCxZQUFuQyxFQUFnRCxVQUFTRyxHQUFULEVBQWE7QUFDekRDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQWtDRixHQUFsQztBQUNBRixjQUFBQSxJQUFJLENBQUNaLGNBQUwsQ0FBb0JrQixNQUFwQixHQUE2QkosR0FBRyxDQUFDTSxJQUFKLENBQVNDLEtBQXRDO0FBQ0gsYUFIRDtBQUlILFdBUkQ7QUFTRDtBQUNGLE9BYkQ7QUFjSDtBQUNKLEdBNURJO0FBOERMWixFQUFBQSxZQUFZLEVBQUUsd0JBQVc7QUFDckIsUUFBSWEsT0FBTyxHQUFHckMsRUFBRSxDQUFDc0MsV0FBSCxDQUFlLEtBQUtsQyxVQUFwQixDQUFkO0FBQ0EsU0FBS21DLElBQUwsQ0FBVUMsUUFBVixDQUFtQkgsT0FBbkI7QUFDQUEsSUFBQUEsT0FBTyxDQUFDSSxXQUFSLENBQW9CLEtBQUtDLGtCQUFMLEVBQXBCO0FBQ0FMLElBQUFBLE9BQU8sQ0FBQ00sWUFBUixDQUFxQixNQUFyQixFQUE2QkMsSUFBN0IsR0FBb0MsSUFBcEM7QUFDQSxTQUFLckIsWUFBTCxHQUFvQixLQUFLZixlQUFMLEdBQXVCcUMsSUFBSSxDQUFDQyxNQUFMLE1BQWlCLEtBQUt2QyxlQUFMLEdBQXVCLEtBQUtDLGVBQTdDLENBQTNDO0FBQ0EsU0FBS2MsS0FBTCxHQUFhLENBQWI7QUFDSCxHQXJFSTtBQXVFTG9CLEVBQUFBLGtCQUFrQixFQUFFLDhCQUFZO0FBQzVCLFFBQUlLLEtBQUssR0FBRyxDQUFaO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUs3QixPQUFMLEdBQWUwQixJQUFJLENBQUNDLE1BQUwsS0FBZ0IsS0FBS25DLE1BQUwsQ0FBWWdDLFlBQVosQ0FBeUIsUUFBekIsRUFBbUNNLFVBQWxFLEdBQStFLEVBQTNGO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtYLElBQUwsQ0FBVVksS0FBVixHQUFnQixDQUEzQjtBQUNBSixJQUFBQSxLQUFLLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQWpCLElBQXdCLENBQXhCLEdBQTRCSSxJQUFwQztBQUNBLFdBQU9sRCxFQUFFLENBQUNvRCxFQUFILENBQU1MLEtBQU4sRUFBYUMsS0FBYixDQUFQO0FBQ0gsR0E3RUk7QUErRUxLLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBRWxCLFFBQUksS0FBS2hDLEtBQUwsR0FBYSxLQUFLQyxZQUF0QixFQUFvQztBQUNoQyxXQUFLZ0MsUUFBTDtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFmLENBRmdDLENBRVI7O0FBQ3hCO0FBQ0g7O0FBQ0QsU0FBS2xDLEtBQUwsSUFBY2dDLEVBQWQ7QUFDSCxHQXZGSTtBQXlGTEcsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUtoQyxLQUFMLElBQWMsQ0FBZDtBQUNBLFNBQUtiLFlBQUwsQ0FBa0JxQixNQUFsQixHQUEyQixZQUFZLEtBQUtSLEtBQTVDO0FBQ0F6QixJQUFBQSxFQUFFLENBQUMwRCxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBSzNDLFVBQS9CLEVBQTJDLEtBQTNDO0FBQ0gsR0E3Rkk7QUErRkx1QyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsU0FBSzVDLE1BQUwsQ0FBWWlELGNBQVo7QUFDQTVELElBQUFBLEVBQUUsQ0FBQzZELFFBQUgsQ0FBWUMsU0FBWixDQUFzQixVQUF0QjtBQUNBaEMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUEyQixLQUFLTCxZQUFoQzs7QUFDQSxRQUFHLEtBQUtELEtBQUwsR0FBVyxDQUFkLEVBQWdCO0FBQ1osVUFBRyxLQUFLQyxZQUFMLElBQXFCLE1BQXhCLEVBQStCO0FBQzNCSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvREFBWjtBQUNBO0FBQ0g7O0FBQ0RqQyxNQUFBQSxVQUFVLENBQUNpRSxZQUFYLENBQXdCLEtBQUtyQyxZQUE3QixFQUEwQyxLQUFLRCxLQUEvQyxFQUFxRCxVQUFTSSxHQUFULEVBQWE7QUFDOURDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBMkJGLEdBQTNCO0FBQ0gsT0FGRDtBQUdIO0FBQ0o7QUE1R0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJjeEFkYXB0ZXIgPSByZXF1aXJlKFwiYmN4QWRhcHRlclwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG4gICAgICAgIGdyb3VuZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBhY2NvdW50RGlzcGxheToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGJhbGFuY2VEaXNwbGF5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0LzI7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmFjY291bnRfbmFtZSA9ICcnO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoYmN4QWRhcHRlcil7XG4gICAgICAgICAgICBiY3hBZGFwdGVyLmluaXRTREsoZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImluaXRTREtcIixyZXMpXG4gICAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgYmN4QWRhcHRlci5sb2dpbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luXCIscmVzKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY291bnREaXNwbGF5LnN0cmluZyA9IHJlcy5hY2NvdW50X25hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjb3VudF9uYW1lID0gcmVzLmFjY291bnRfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgYmN4QWRhcHRlci5nZXRCYWxhbmNlQnlBY2NvdW50KHJlcy5hY2NvdW50X25hbWUsZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QmFsYW5jZUJ5QWNjb3VudFwiLHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmFsYW5jZURpc3BsYXkuc3RyaW5nID0gcmVzLmRhdGEuQ09DT1M7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbigpKTtcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgdGhpcy5zdGFyRHVyYXRpb24gPSB0aGlzLm1pblN0YXJEdXJhdGlvbiArIE1hdGgucmFuZG9tKCkgKiAodGhpcy5tYXhTdGFyRHVyYXRpb24gLSB0aGlzLm1pblN0YXJEdXJhdGlvbik7XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgIH0sXG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcbiAgICAgICAgdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgTWF0aC5yYW5kb20oKSAqIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykuanVtcEhlaWdodCArIDUwO1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aC8yO1xuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuICAgICAgICByZXR1cm4gY2MudjIocmFuZFgsIHJhbmRZKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgICAgICBpZiAodGhpcy50aW1lciA+IHRoaXMuc3RhckR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTsgICAvLyBkaXNhYmxlIGdhbWVPdmVyIGxvZ2ljIHRvIGF2b2lkIGxvYWQgc2NlbmUgcmVwZWF0ZWRseVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgfSxcblxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmU7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZUF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IFxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWVvdmVyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWNjb3VudF9uYW1lXCIsdGhpcy5hY2NvdW50X25hbWUpXG4gICAgICAgIGlmKHRoaXMuc2NvcmU+MCl7XG4gICAgICAgICAgICBpZih0aGlzLmFjY291bnRfbmFtZSA9PSAndGVzdCcpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBjb250cmFjdCBhY2NvdW50LCBjYW4gbm90IHRyYW5zZmVyIHRvIHNlbGZcIilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiY3hBZGFwdGVyLnNlbmRXaW5Db2Nvcyh0aGlzLmFjY291bnRfbmFtZSx0aGlzLnNjb3JlLGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kV2luQ29jb3NcIixyZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=