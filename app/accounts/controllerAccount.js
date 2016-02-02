(function () {
    'use strict';

    var buildFirst = angular.module('buildFirst');
    var controllerAccount = function controllerAccount(serviceAccount, $log) {
        // POJO
        var self = this;

        var refreshRatios = function refreshRatios() {
            self.ratios = serviceAccount.getRatio(self.rows, self.totals.marketValue);
        };

        self.refresh = function refresh() {
            serviceAccount.resetLegend();
            serviceAccount.getAllAcount().then(function (accounts) {
                self.rows = accounts;
                self.totals = serviceAccount.getTotalValue(self.rows);
                refreshRatios();
                console.log(self.rows);
            });
        };

        self.refresh();


        self.orderReversed = true;
        self.toggleOrderRev = function toggleOrderRev() {
            self.orderReversed = !self.orderReversed;
        };


        self.orderByKeyword = 'marketValue';
        self.orderBy = function (filterStr) {
            self.orderByKeyword = filterStr || '';
        };

        self.selectedRow = null;
        self.selectRow = function selectRow(caid) {
            self.selectedRow = caid;
        };

        self.addAccount = function addAccount() {
            var marketValue = Math.random() * 100000,
                cash = Math.random() * 400000,
                name = 'Account ' + serviceAccount.getCaid().substring(11, 13);
            serviceAccount.addAll(name, marketValue, cash).then(function (record) {
                self.rows.push(record);
            });

            self.totals.marketValue += marketValue;
            self.totals.cash += cash;
            refreshRatios();
        };

    };


    buildFirst.controller('controllerAccount', ['serviceAccount', '$log',
        controllerAccount]);

})();