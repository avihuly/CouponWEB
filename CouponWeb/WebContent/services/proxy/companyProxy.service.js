angular.module("Coupon")
    .service('companyProxy', function ($http) {
        var baseUrl = "coupon/admin";


        this.getAll = function () {
            return $http.get(baseUrl + "/getAllCompanies");
        }

        this.create = function (company) {
            var companyToCreate = angular.copy(company);
            companyToCreate.id = null; // NOTE: backend needs id as part of

            return $http({
                method: 'POST',
                url: baseUrl + "/createCompany",
                headers: {'Content-Type': 'application/json'},
                data: company
            })
        }
        this.update = function (id, company) {
            var companyToUpdate = angular.copy(company);
            companyToUpdate.id = id;

            return $http({
                method: 'POST',
                url: baseUrl + "/updateCompany",
                headers: {'Content-Type': 'application/json'},
                data: companyToUpdate
            })
        }

        this.remove = function (id) {
            return $http({
                method: 'Delete',
                url: baseUrl + "/removeCompany",
                headers: {'Content-Type': 'text/plain'},
                data: id
            })
        }

        this.getByid = function (id) {

        }

    });
