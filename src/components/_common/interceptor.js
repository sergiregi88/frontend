/*(function(){
  var interceptor=function($q,$log,$location,$rootScope){
	return {
		request:function(request){

			return request || $q.when(request);
		},

		responseError:function(response){
      console.log(response);
      if(response.status==404)
      {

      }
		}
	}
}
var interceptorsHttp=function($httpProvider){
	$httpProvider.interceptors.push(interceptor);
}
angular.module('lapinedaweb').config(interceptorsHttp);
}());*/
(function () {

    var interceptor = function ($q, $log, $location, $cookieStore, $rootScope) {
        return {
            request: function (request) {
                $log.info('request:' + request.url);
                console.log($cookieStore.get("laravel_session"));
                request.headers["laravel_session"] = $cookieStore.get("laravel_session");
                return request || $q.when(request);
            },
            responseError: function (response) {
              $log.error(response);
                $log.error("err: " + response.data.status + " de :" + response.config.url);
                if (response.status === 400) {
                   // $rootScope.mensaje = "Culpa mía :-(";
                } else if (response.status === 401) {
                    $rootScope.mensaje = "No hay derecho!!!";
                    $location.path('/register');
                } else if (response.status === 419) {
                    $rootScope.mensaje = "Estoy caduco!!!";
                    $cookieStore.remove("laravel_session")
                    $location.path('/login');
                } else if (response.status === 404) {
                    $rootScope.mensaje = "No se ha encontrado algo!!!";
                } else if (response.status === 500) {
                    $rootScope.mensaje = "El servidor ha fallado :-)";
                }
                return $q.reject(response);
            }
        };
    }

    var intercepcionesHttp = function ($httpProvider) {
        $httpProvider.interceptors.push(interceptor);
    }

    angular.module('lapinedaweb').config(intercepcionesHttp);

}());
/*angular.module('lapineda')

.provider('myCSRF',[function(){
  var headerName = 'X-XSRF-TOKEN';
  var cookieName = 'X-XSRF-TOKEN';
  var allowedMethods = ['GET'];

  this.setHeaderName = function(n) {
    headerName = n;
  }
  this.setCookieName = function(n) {
    cookieName = n;
  }
  this.setAllowedMethods = function(n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          console.log($cookies['cookieName'],"sss")
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
}]).config(function($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
});*
}());*/