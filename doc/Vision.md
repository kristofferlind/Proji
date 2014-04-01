#Vision
Ett projekthanteringssystem som förenklar samarbete och skapande av dokumentation för projekt.

##Definitioner
* Dokumentation - hänvisar här till projektdokumentation i form av text och kalkylblad.
* Projektledare - ledaren för ett projekt i systemet
* Projektmedlem - samtliga medlemmar i ett projekt i systemet
* Informationsflöde - projektets samlade information eller delar av denna, informationsmängd, datamängd

##Bakgrund och problembeskrivning
Utan att använda sig av något system för att hantera dokumentation är det omständligt att samarbeta och strukturera upp informationen överskådligt.
Systemet är tänkt att fungera som en centralisering av dokumentation med hjälpmedel för att skapa och överblicka denna. 
Projektets medlemmar ska kunna hjälpas åt att hålla denna uppdaterad och funktioner ska finnas för att lättare kunna överblicka informationsflödet.
Systemet ska göra processen effektivare samtidigt som det förenklar den.

##Teknik
Mina huvudsakliga mål med kursen är att lära mig angular, testning, bli bättre på javascript och bekanta mig med utvecklingsverktyg. Jag skulle hemskt gärna vilja bekanta mig med mongodb och express, men jag tror inte jag hinner detta och har därför valt firebase som datalagring. Förhopppningen är att kunna sätta mig in i dessa under en sommarkurs. För mer specificerade listor, se bower.json och package.json.
* Språk: Javascript, CSS, HTML
* Ramverk: Angular
* Tjänst: Firebase
* Hosting: Binero
* Verktyg: Yeoman, Bower, Grunt, Travis CI(om jag hinner)
* Testning: Karma, Jasmine, Angular Scenario Runner/Protractor

##Användargrupper/Aktörer

###Oerfaren Projektledare
Har troligen en del erfarenhet av arbete i projektform och någorlunda kunskaper inom projektteknik

###Erfaren Projektledare
Välutbildad inom projektteknik, god vana av att styra projekt

###Oerfaren Projektmedlem
Bristande utbildning i projektteknik, troligen inte särskilt van vid att arbeta i grupp

###Erfaren Projektmedlem
Välutbildad inom projektteknik, har god vana av att arbeta i grupp.

###Projektkund
Skiftande datorvana, bör ha viss insyn i projektet.

Samtliga användargrupper har också ett intresse för effektiviseringen detta system innebär gentemot normalfallet.

##Intressenter
* Kristoffer Lind - Grundare - kristoffer@krad.se
* Linnéuniversitetet, 1dv404 - Kvalitetskontroll, dokumentation
* Linnéuniversitetet, 1dv430 - Kvalitetskontroll, projekt
* Github - Koppling för kodkontroller
* W3C - Kodstandard
* WCAG - Tillgänglighetsanpassning

##Liknande system
* freedcamp.com - ingen möjlighet att skapa filer på plats, snarare ett community med möjlighet att ladda upp filer.
* basecamp.com - klientvisning med restriktioner, sociala kopplingar för att främja diskussion i stora projekt, möjlighet att skapa textfiler - ingen hjälp.

##Baskrav
* BK1 - Projektmedlemmar ska enkelt och effektivt kunna hjälpas åt att hålla dokumentationen i toppskick
* BK2 - Kommunikation mellan projektmedlemmar ska främjas
* BK3 - Projektmedlemmar ska kunna få ut sina idéer i ett samlat format även om det för stunden kanske inte riktigt passar in i någon befintlig dokumentation
* BK4 - Det finns kontroller som hjälper till att minska risken för misslyckade projekt(ex. tendeser mot arbete i vattenfallsmodell)
* BK5 - Projektmedlemmar ska kunna få en förbättrad överblick över projektet
* BK6 - Automatiska utskick av händelser för att hålla konservativa medlemmar uppdaterade
