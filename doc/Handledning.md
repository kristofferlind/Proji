#Handledning v.19
##Problem
* Får inte testning av drag & drop att fungera. [https://github.com/kl222jy/Proji/blob/master/test/e2e/sprintView.e2e.js#L16-L26], jag tror att event inte hinner trigga för att det går för snabbt. Jag har dock försökt med enskilda actions och sleep funktioner emellan, och då verkar inget alls hända.

##Funderingar
* Hur ska man egentligen tänka kring controllers, som det är nu har jag en controller per vy, kanske varit bättre att dela upp det baserat på vad de gör? och sedan infoga controllers i vyer efter behov?

##Fokus
Under förra veckan körde jag fokus på integrationstestning, den här veckan har jag fortsatt arbeta med funktionalitet, främst uppgiftshantering. Tänkte också försöka bygga någon form av notifikationssystem och få igång travis.

##Intressant?
Löste det tidigare problemet med projectId(och även sprintId), fortfarande inte någon direkt vacker lösning. Men det känns som det här är mer på rätt väg och framförallt fungerar det mycket bättre. [https://github.com/kl222jy/Proji/blob/master/app/scripts/app.js#L78-L80]

#Handledning v.17
##Problem
* nginclude - hade fel tidigare, dirtychecking görs, men $digest där triggas aldrig av ändringar i ngview($rootscope.$digest?)
* klumpig lösning för att få in userId och projectId i controller; leder till klumpiga tester (resolve?)

##Funderingar
* central stub/mockup vs separata för vardera test/testsvit
* testa externa bibliotek? enbart egen kod? exkludera allt utom egen kod till istanbul(coverage)?

##Fokus
Denna veckan har jag lagt fokus på att lära mig testning, främst enhetstestning och börjat kika på integrationstestning(e2e).
