#Proji [![Build Status](https://magnum.travis-ci.com/kl222jy/Proji.svg?token=x65pavhqtxosaF5kvHEc)](https://magnum.travis-ci.com/kl222jy/Proji) [![Code Climate](https://codeclimate.com/repos/5391a9f86956800c37004204/badges/a0c57e4246a4af8f32f4/gpa.png)](https://codeclimate.com/repos/5391a9f86956800c37004204/feed)

Ett projekthanteringssystem som görs till kursen 1DV430.

Dokumentation finns i mappen doc, körbar version finns på [http://proji.se].

##Fel
Drag & drop fungerar inte i Internet Explorer

##Installation
git clone -> npm install (Installerar även compass och selenium. Kräver node, python, ruby och java)

##Testning
npm test (kör enhetstester, startar upp server och selenium, kör integrationstester)  
Efter att detta kommando genomförts finns statistik över testningen i mappen coverage.

##Kör
npm run (startar server och öppnar applikation i standardwebbläsare)  
Applikationen fungerar bäst i chrome

##Övrigt
grunt build, bygger dist  
grunt e2e, kör enbart integrationstester
karma start, kör enhetstester vid sparande