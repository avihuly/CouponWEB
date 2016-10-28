angular.module("Coupon")
    .service('companyCouponProxy', function ($http, couponFactory) {
        var baseUrl = "coupon/company";


        this.getAll = function () {
            return $http.get(baseUrl + "/getAllCoupons");
        }

        this.create = function (coupon) {
            return $http({
                method: 'POST',
                url: baseUrl + "/createCoupon",
                headers: {'Content-Type': 'application/json'},
                data: coupon
            })
        }

        this.update = function (id, coupon) {
            // server needs a full coupon object
            var couponToUpdate = couponFactory();
            couponToUpdate.id = id;
            couponToUpdate.price = coupon.price;
            couponToUpdate.endDate = coupon.endDate;

            return $http({
                method: 'POST',
                url: baseUrl + "/updateCoupon",
                headers: {'Content-Type': 'application/json'},
                data: couponToUpdate
            })
        }

        this.remove = function (id) {
            return $http({
                method: 'Delete',
                url: baseUrl + "/removeCoupon",
                headers: {'Content-Type': 'text/plain'},
                data: id
            });
        }

        this.getCouponByID = function (id) {
            return $http({
                method: 'POST',
                url: baseUrl + "/getCoupon",
                headers: {'Content-Type': 'text/plain'},
                data: id
            });
        }
        
        //TODO: not sure I did it right
        this.getCouponsByType = function (type) {
            return $http({
                method: 'POST',
                url: baseUrl + "/getCouponByType",
                headers: {'Content-Type': 'text/plain'},
                data: type
            });
        }
        
      //TODO: not sure I did it right
       this.getCouponByPrice = function (price) {
            return $http({
                method: 'POST',
                url: baseUrl + "/getCouponByPrice",
                headers: {'Content-Type': 'text/plain'},
                data: price
            });
        }
        
      //TODO: not sure I did it right
       this.getCouponStartDate = function (date) {
            return $http({
                method: 'POST',
                url: baseUrl + "/getCouponStartDate",
                headers: {'Content-Type': 'text/plain'},
                data: date
            });
        }
       
     //TODO: not sure I did it right
       this.getCouponEndDate = function (date) {
            return $http({
                method: 'POST',
                url: baseUrl + "/getCouponEndtDate",
                headers: {'Content-Type': 'text/plain'},
                data: date
            });
        }
    });
