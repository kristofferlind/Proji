#Proji [![Build Status](https://magnum.travis-ci.com/kl222jy/Proji.svg?token=x65pavhqtxosaF5kvHEc)](https://magnum.travis-ci.com/kl222jy/Proji)

Ett projekthanteringssystem som görs till kursen 1DV430.

Dokumentation finns i mappen doc, körbar version finns på [http://proji.se].

##Installation
git clone -> npm install (Installerar även compass och selenium. Kräver node, python, ruby och java)

##Testning
npm test (kör enhetstester, startar upp server och selenium, kör integrationstester)  
Efter att detta kommando genomförts finns statistik över testningen i mappen coverage.

##Kör
npm run (startar server och öppnar applikation i standardwebbläsare)

##Övrigt
grunt build, bygger dist  
grunt e2e, kör enbart integrationstester
karma start, kör enhetstester vid sparande