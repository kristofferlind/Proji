#Testfall
<!--
	##AF1.1 Skapa projekt
	Projektledaren väljer att skapa ett projekt, systemet ber projektledaren välja namn på projektet, projektledaren väljer namn och systemet skapar sedan ett projekt med detta namn.
	Systemet visar sedan en överblickssida av projektet.

	##AF1.2 Lägga till projektmedlemmar
	Projektledaren väljer att lägga till projektmedlemmar, systemet frågar efter namn. Projektledaren väljer ett eller flera namn och medlemmen/medlemmarna läggs sedan till i projektet.

	##AF1.3 Ta bort projektmedlemmar
	Projektledaren väljer att ta bort projektmedlemmar, systemet presenterar projektets medlemmar. Projektledaren väljer ett eller flera namn och medlemmen/medlemmarna läggs sedan till i projektet.

	##AF1.4 Ställa in vilken information som är tillgänglig för kund
	Projektledaren väljer att ställa in information som ska vara tillgänglig för kund, systemet presenterar möjliga alternativ, projektledaren väljer ibland alternativen, datalagringen sparar valda inställningar

	##AF2.1 - Lägga till dokument
	**Avgränsning:** System  
	**Nivå:** Användarmål  
	**Primär aktör:** Projektmedlem  
	**Intressenter:**  
	Projektledare: Vill snabbt kunna få upp en organiserad bas för dokumentationen  
	Projektmedlem: Vill kunna arbeta med systemet  

	**Förkrav:** Projektmedlemmen måste vara autentiserad  
	**Efterkrav:** Dokumentet har skapats  
	**Huvudscenario:**  
	1. Projektmedlemmen väljer att skapa ett nytt dokument  
	2. Systemet frågar efter namn och dokumenttyp  
	3. Projektmedlemmen väljer namn  
	4. Systemet skapar filen och presenterar den  
	5. Gå till AF2.2 - Hantera dokument

	**Alternativt scenario:**  
	4a. Namnet används redan  
	  4a1. gå till steg 2  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
-->
##TF AF2.2 - Hantera textbaserade dokument
Målet för detta testfall är att undersöka att det går att hantera ett dokument.

###Förkrav
Inloggad, projekt skapat, dokumentet "vision"
###Efterkrav
Kontrollera att innehållet sparats korrekt

###Scenario
1. "Överblick":"Öppna dokument":"vision"  
2. Systemet presenterar dokumentet "vision" av typen "vision"  
3. Lägg till detta projektets vision i dokumentet  
4. Systemet presenterar hjälp för vardera avsnitt  
5. Spara dokumentet och avsluta  
6. Systemet presenterar "Överblick"  

3a. Skriv in information som inte stämmer överens med ett avsnitt
  1. Kontrollera att varning och hjälp visas  


3b. Stäng fönstret under pågående inmatning
  1. Kontrollera att den inmatade informationen finns kvar
  2. Spara och avsluta
  3. Kontrollera att den inmatade informationen sparats
  
  2a. Avbryt dokumentredigeringen  
  <p>1. Kontrollera att ingen av ändringarna sparats</p>


5a. Välj att avbryta redigeringen av dokumentet
  1. Kontrollera att ändringarna inte har sparats  


<!--















1a. "Överblick":"Öppna dokument":"test-vision"  
  1. Dokumentet "test-vision" av typen "vision" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1b. "Överblick":"Öppna dokument":"test-kravspecifikation"  
  1. Dokumentet "test-kravspecifikation" av typen "kravspecifikation" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1c. "Överblick":"Öppna dokument":"test-krav"  
  1. Dokumentet "test-krav" av typen "krav" presenteras  
  2. Lägg till testdata i några celler 
  3. gå till steg 4  

1d. "Överblick":"Öppna dokument":"test-projektplan"  
  1. Dokumentet "test-projektplan" av typen "projektplan" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1e. "Överblick":"Öppna dokument":"test-iterationsplan"  
  1. Dokumentet "test-iterationsplan" av typen "iterationsplan" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1f. "Överblick":"Öppna dokument":"test-ordlista"  
  1. Dokumentet "test-ordlista" av typen "ordlista" presenteras  
  2. Lägg till några ord och definitioner i ordlistan  
  3. gå till steg 4  

1g. "Överblick":"Öppna dokument":"test-testspecifikation"  
  1. Dokumentet "test-testspecifikation" av typen "testspecifikation" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1h. "Överblick":"Öppna dokument":"test-testrapport"  
  1. Dokumentet "test-testrapport" av typen "testrapport" presenteras  
  2. Lägg till testdata i form av lorem ipsum paragrafer på samtliga avsnitt  
  3. gå till steg 4  

1i. "Överblick":"Öppna dokument":"test-användningsfall"  
  1. Dokumentet "test-användningsfall" av typen "användningsfall" presenteras  
  2. Lägg till några korta användningsfall  
  3. gå till steg 4  






 ##AF2.2 - Hantera dokument
**Avgränsning:** System  
**Nivå:** Användarmål  
**Primär aktör:** Projektmedlem  
**Intressenter:**  
Projektledare: Vill snabbt kunna få upp en organiserad bas för dokumentationen  
Projektmedlem: Vill kunna arbeta med systemet  

**Förkrav:** Projektmedlemmen måste vara autentiserad  
**Efterkrav:** Dokumentet har sparats  
**Huvudscenario:**  
1. Projektmedlemmen väljer hantera ett dokument  
2. Systemet presenterar dokumentet 
3. Användaren lägger till innehåll i dokumentet
4. Datalagringen sparar dokumentet och dess innehåll

**Alternativt scenario:**  
2a. Vald dokumenttyp är vision  
  1. Systemet applicerar mall för vision  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2b. Vald dokumenttyp är kravspecifikation  
  1. Systemet applicerar mall för kravspecifikation  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  
  
  2ba. Om vald projekttyp är iterativ, projektet är i ett tidigt stadie och kravspecifikationen börjar bli väl utförlig  
  ba1. Systemet varnar för tendenser mot vattenfallsmodellen  
  ba2. gå till 2b2  

2c. Vald dokumenttyp är krav  
  1. Systemet applicerar mall för krav  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2d. Vald dokumenttyp är projektplan  
  1. Systemet applicerar mall för projektplan  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2e. Vald dokumenttyp är iterationsplan  
  1. Systemet applicerar mall för iterationsplan  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2f. Vald dokumenttyp är ordlista  
  1. Systemet applicerar mall för ordlista  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2g. Vald dokumenttyp är testspecifikation  
  1. Systemet applicerar mall för testspecifikation  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  

2h. Vald dokumenttyp är testrapport  
  1. Systemet applicerar mall för testrapport  
  2. Användaren lägger till innehåll i dokumentet  
  3. Systemet presenterar hjälptext för aktuellt avsnitt  
  4. Användaren väljer att avsluta redigeringen  
  5. Gå till 4  
  
##AF2.3 - Lägga till händelse
En projektmedlem väljer att lägga till en händelse, systemet efterfrågar namn, datum och beskrivning. D

##AF2.4 - Kommunicera med enskild projektmedlem
En projektmedlem väljer att skicka ett meddelande till en specifik medlem, om användaren är inloggad presenteras meddelandet för denna annars visas det vid nästa inloggning

##AF2.5 - Kommunicera med samtliga projektmedlemmar
En projektmedlem väljer att skicka ett meddelande till samtliga medlemmar, systemet presenterar meddelandet för samtliga användare

##AF2.6 - Lägga till idé
En projektmedlem väljer att lägga till en idé, systemet lagrar denna och presenterar tillsammans med resterande idéer

##AF2.7 - Ta bort dokument  
En projektmedlem väljer att ta bort ett dokument, om ingen arbetar med dokumentet exkluderar systemet denna från systemet och mellanlagrar den i ett arkiv

##AF2.8 - Ta bort idé  
En projektmedlem väljer att ta bort en idé, systemet tar bort idén

##AF2.9 - Ta bort händelse  
En projektmedlem väljer att ta bort en händelse, systemet tar bort händelsen

##AF2.10 - Hantera tabellbaserat dokument  
AF2.2 med lämpliga variationer

##AF2.11 - Hantera listbaserat dokument  
AF2.2 med lämpliga variationer
-->
