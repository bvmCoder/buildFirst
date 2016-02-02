(function () {
    'use strict';

    var buildFirst = angular.module('buildFirst');
    var serviceAccount = function serviceAccount($http, $q) {
        var count = 0,
            accLgnd = ['#F7BD14', '#254C71', '#712929', '#607244', '#372D6D', '#0A72B0', '#187665', '#51234F', '#939598', '#456B74'],
            lgndLength = accLgnd.length,
            guid = 0;
        var _getClientCAID = function _getClientCAID() {
            guid++;
            var CAID = new Date().getTime().toString() + guid;
            //console.log(CAID);
            return (CAID);
        };
        var _getLgnd = function _getLgnd() {
            var val = accLgnd[count];
            count = (count >= (lgndLength - 1)) ? 0 : (count + 1);
            return val;
        };
        var _rstLgnd = function _rstLgnd() {
            count = 0;
        };
        var _all = function _all() {
            return $q(function (resolve) {
                $http.get('data/accounts.json')
                    .success(function (accounts) {
                        var accLength = accounts.length;
                        for (var i = 0; i < accLength; i++) {
                            accounts[i].caid = _getClientCAID();
                            accounts[i].legend = _getLgnd();
                        }
                        console.log(accounts);
                        resolve(accounts);
                    })

            })
        };
        var _ratios = function _ratios(rows, totalMarket) {
            var src = rows || [],
                ratios = {};
            for (var i = 0; i < src.length; i++) {
                ratios[src[i].caid] = {
                    value: (src[i].marketValue / totalMarket),
                    legend: src[i].legend
                }
            }

        };
        var _totalValue = function _totalValue(rows) {
            var src = rows || [],
                _totalMarket = 0,
                _cash = 0;

            for (var i = 0; i < src.length; i++) {
                _totalMarket += src[i].marketValue;
                _cash += src[i].cash;
            }
            return {
                totalMarket: _totalMarket,
                cash: _cash
            }
        };

        var _add = function _add(name, marketValue, cash) {
            return $q(function (resolve) {
                resolve({
                    caid: _getClientCAID(),
                    name: name,
                    marketValue: marketValue,
                    cash: cash,
                    legend: _getLgnd()
                });
            });
        };
        console.log(_add());
        return {
            getCaid: _getClientCAID,
            getLegend: _getLgnd,
            resetLegend: _rstLgnd,
            getAllAcount: _all,
            getRatio: _ratios,
            getTotalValue: _totalValue,
            addAll: _add
        }
    };


    buildFirst.factory('serviceAccount', serviceAccount);
})();