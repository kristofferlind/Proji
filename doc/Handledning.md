#Handledning v.17
##Problem
* nginclude - hade fel tidigare, dirtychecking görs, men $digest där triggas aldrig av ändringar i ngview($rootscope.$digest?)
* klumpig lösning för att få in userId och projectId i controller; leder till klumpiga tester (resolve?)

##Funderingar
* central stub/mockup vs separata för vardera test/testsvit
* testa externa bibliotek? enbart egen kod? exkludera allt utom egen kod till istanbul(coverage)?

##Fokus
Denna veckan har jag lagt fokus på att lära mig testning, främst enhetstestning och börjat kika på integrationstestning(e2e).
