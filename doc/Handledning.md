#Handledning v.17
##Problem
* exempeltest mot angularjs.org fungerar, men inte motsvarande test mot egen server
* nginclude - hade fel tidigare, dirtychecking görs, men $digest där triggas aldrig av ändringar i ngview
* klumpig lösning för att få in userId och projectId i controller; leder till klumpiga tester (resolve?)

##Funderingar
* central stub/mockup vs separata för vardera test/testsvit

##Fokus
Denna veckan har jag lagt fokus på att lära mig testning, främst enhetstestning och börjat kika på integrationstestning(e2e).
