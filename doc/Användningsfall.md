#Användningsfall

##AF1.1 Skapa projekt
Projektledaren väljer att skapa ett projekt, systemet ber projektledaren välja namn på projektet, projektledaren väljer namn och systemet skapar sedan ett projekt med detta namn.
Systemet visar sedan en överblickssida av projektet.

##AF1.2 Lägga till projektmedlemmar
Projektledaren väljer att lägga till projektmedlemmar, systemet frågar efter namn. Projektledaren väljer ett eller flera namn och medlemmen/medlemmarna läggs sedan till i projektet.

##AF1.3 Ta bort projektmedlemmar
Projektledaren väljer att ta bort projektmedlemmar, systemet presenterar projektets medlemmar. Projektledaren väljer ett eller flera namn och medlemmen/medlemmarna läggs sedan till i projektet.

##AF1.4 Ställa in vilken information som är tillgänglig för kund
Projektledaren väljer att ställa in information som ska vara tillgänglig för kund, systemet presenterar möjliga alternativ, projektledaren väljer bland alternativen, datalagringen sparar valda inställningar

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
4. Systemet skapar filen utifrån dokumenttypens mall och presenterar den  
5. *Gå till AF2.2 - Hantera dokument*

**Alternativt scenario:**  
4a. Namnet används redan  
  4a1. *gå till steg 2*  
  
##AF2.2 - Hantera textbaserat dokument
**Avgränsning:** System  
**Nivå:** Användarmål  
**Primär aktör:** Projektmedlem  
**Intressenter:**  
Projektledare: Vill snabbt kunna få upp en organiserad bas för dokumentationen  
Projektmedlem: Vill kunna arbeta med systemet  

**Förkrav:** Projektmedlemmen måste vara autentiserad  
**Efterkrav:** Dokumentet har skapats  
**Huvudscenario:**  
1. Projektmedlemmen väljer hantera ett dokument  
2. Systemet presenterar dokumentet  
3. Projektmedlemmen lägger till innehåll i dokumentet  
4. Systemet presenterar hjälp för aktuell inmatning  
5. Projektmedlemmen väljer att verkställa ändringarna  
6. Systemet sparar innehållet  

**Alternativt scenario:**  
*a Projektmedlemmen stänger fönstret eller något allvarligt fel inträffar  
  1. Systemet försöker spara all data  
  2. *Användarfallet avbryts*  

3a Projektmedlemmen matar in innehåll som inte stämmer överens med dokumenttypen och aktuellt avsnitt
  1. Systemet presenterar en varning och ett hjälpavsnitt  
  2. *gå till steg 2*  
    
3b. Projektmedlemmen skriver för utförlig information i förhållande till projektets fas, vald dokumenttyp och projektform  
  1. Systemet varnar för tendenser mot vattenfallsmodellen  
  2. *gå till steg 2*  

##AF2.3 - Lägga till händelse
En projektmedlem väljer att lägga till en händelse, systemet efterfrågar namn, datum och beskrivning.

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
