* Det går att rösta flera gånger på samma idé
* uppdatering av include vyerna - lösning: http://stackoverflow.com/questions/19203777/angularjs-reload-ng-include-after-user-authentication-or-a-better-way-to-solve
* problemet med projectId, userId - lösning?: resolve på route, resolve hämtar projektId som i sin tur är beroende av userId, därför kommer båda alltid vara satta när en vy visas
i controllern kan jag sedan sätta $scope.projectId = $rootScope.currentUser.pid || $route.current.params
* integrationstester kräver ignoresynchronization, något avslutas aldrig, är det firebase?

