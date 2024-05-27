# Instructables setup Serene Sketch

#### By Britt Franken en Esteban Martinez


 ![Foto van het begin scherm](/docs/Begin%20scherm.png)

Deze installatie is ontstaan vanuit het idee om een ruimte te creëren waar iedereen tot rust kan komen. Het concept lijkt op een snoezelruimte, maar met een unieke draai:

bezoekers kunnen zelf hun omgeving vormgeven door te tekenen, waarna hun creaties de ruimte inkleden.

Snoezelruimtes worden vaak gebruikt voor personen op een buitengewone school, waarbij de personen tot rust moeten kunnen komen. Hierbij kan je denken aan personen met een verstandelijke beperking, autisme, ADHD, ... .

# Materiaal / Benodigdheden

#### Materiaal:
- Beamer
- Stoel om de beamer op te zetten
- Laptop
- Verdeelstekker
- Hdmi kabel
- Donkere ruimte
- Kussens
- Kleuren verlichting
- Knoppen (wit en blauw)
- Glazenplaat
- Camera
- Raspberry PI
- Kabels

#### Software:
- Visual Studio Code
- Basic Code Knowledge
- Open AI generator
- Github
- NodeRed
- MakerCase

#### Tools:
- Lazercutter
- Boormachine

# Stap 1

Voordat we van start kunnen gaan, moeten we eerst de GitHub-code op de computer krijgen door deze te klonen. Volg hiervoor de onderstaande stappen:

- Open de link: *[Github Serene Sketch](https://github.com/BrittFranken9/IMMI)*
- Kopieer de link die je nodig hebt vanuit de groene knop met de tekst "Code".
- Open je terminal en navigeer naar de map waarin je de code wilt klonen.
- Typ in deze map het volgende commando: `git clone` gevolgd door de gekopieerde link.
- Druk op Enter om de code te klonen.

# Stap 2

Vervolgens kan je in de terminal terug naar de map gaan waar je de code gecloned hebt en doe je `npm install`

# Stap 3

Na je Stap 2 hebt gedaan ga je in de terminal `npm install openai@^4.0.0`.Dit moet je doen om de API key van OpenAI te kunnen gebruiken. Nu moet alles geïnstalleerd zijn. 

Het is ook even handig om te zien af je al een account hebt bij OpenAI of niet. Zo niet dan zou ik er een aanmaken. ([OpenAI](https://platform.openai.com/apps))

# Stap 4

Nu gaan we de API Key aanmaken en in de code zetten. Nadat je bent ingelogged bij OpenAI. Normaal gezien krijg je de opties ChatGPT of API en wij gaan natuurlijk API kiezen. 
![apps](/docs/openai_apps.png)

Daarna ga je naar het slotje met het naam API keys. 
![key](/docs/choice.png)

Als je daarop hebt geklikt ziet je de optie van `+ Create new secret key`. Klik daarop en geef het een naam (Optioneel) dan drup op `Create secret key`. als je dit alles hebt gedaan dan kopieer je de Key en zet je het in de code bij de map apiKey.example.js.
![api_key](/docs/api_key.png)

# Stap 5

Alles in je map staat nu klaar om te starten.

Enkel nog `npm run dev` invoeren in je terminal bij de juiste map en surfen naar `http://localhost:3000/`

# Stap 6

Nu zullen we de code een beetje uitleggen van hoe het in elkaar zit. Ik deel dit op in 4 delen `html`, `css`, `javascript` en `Node Red`.

### htmml:
index.html:
De `html` is vrij simpel. Die is ingedeeld in 2 delen. De eerste zie je canvas en die is voor de achtergrond animatie en homepage. Ook wordt dit gebruikt voor de loadingscreen maar dat wordt uitgelegd bij `javascript`. 
![canvas](/docs/canvas.png)

Daarna komt het gedeelte waar onze ai image tevoorschijn komt. Daarin kan je nog andere functies zien in `<form>` dat is voor als je images wilt genereren met tekst maar voor nu is dat een comment en niet zichtbaar op de webpagina.
![canvas](/docs/image_container.png)

loadingscreen.html:
Is het laadscherm dat tevoorschijn komt als je op de blauwe knop hebt gedrukt. Deze is al toegevoegd in de `javascript`. Waardoor je dit kan negeren. Dit staat er nog voor referentie voor hoe wij op de loadingscreen zijn gekomen.

### css: 
De css is vrij simpel. Het belangrijkste zijn vooral de body en canvas. Daar verander je bijna alles qua lettertype stijl en positie van de tekst. De rest van de css is voor als je met tekst ai images genereren wilt werken. Dan zijn er de stijl voor de tekst en daar verandert je de grote van u lettertype. 
![canvas](/docs/css.png)

### javascript:
Bij de javascript is het bij de code zelf als ingedeeld met titels overals zodat je weet wat wat is. Maar ik zal kort uitleggen wat alles doet. De eerste deel zijn de variable en de nodige imports (api key en style). Daarna komt de lijn om te zorgen dat als je een image gaat genereren dat de webpagina niet refresht. 
![canvas](/docs/variables.png)

Volgende is onze image generator. Hier in ga je bij `prompt` zetten wat je afbeelding wil laten worden met de beschrijving van de foto.
![canvas](/docs/ai_generator.png)

Dan komt de websocket en dat is de connectie tussen de raspberry PI en onze computer. 
![canvas](/docs/websocket.png)

Als laatste is onze animaties. Dit is ingedeeld in twee delen. Één is voor de achtergrond animatie en de andere is voor de loading animatie. 
![canvas](/docs/animatie.png)
![canvas](/docs/loading_animatie.png)

### Node Red:
De Node Red is de gedeeltde dat je gebruikt via de Raspberry Pi. Als je [Raspberry PI](https://meeplemaker.github.io/idl4-cc-rpi-install/) nog niet heb geinstaleerd klik op de link ([Install Raspberry PI](https://meeplemaker.github.io/idl4-cc-rpi-install/)). Eenmaal je dat hebt gedaan en alles hebt geinstalleerd heb je normaal gezien ook Node Red erin gezet. 

Nu kunnen we praten wat we gaan doen met de raspberry pi. De raspberry heeft 2 functies. De eerste is 2 knoppen herkennen wanneer erop wordt gedrukt en tweede is foto's nemen van getekende voorwerp. Daarvoor gaan we nog een paar dingen in de terminal toevoegen. Één ervan is [tensor-flow](https://flows.nodered.org/node/node-red-contrib-tensorflow) en in de terminal zet je `npm install node-red-contrib-tensorflow`. Dit zorgt ervoor dat een afbeelding beschreven kan worden met woorden. De tweede is voor de [usbcamera](https://flows.nodered.org/node/node-red-contrib-usbcamera) daarvoor ga je op de terminal `npm install node-red-contrib-usbcamera` en op de terminal van de raspberry PI `sudo apt install fswebcam`. Deze zorgt ervoor dat we foto's kunnen maken met een webcam. 

Nu gaan we in Node Red de foto hieronder na maken. Daar ge je plug-ins toevoegen van tensor-flow, image tools en usb camera.

![Node-Red](/docs/node_red.jpg)

### Extra commentaar

Bij deze code maken we gebruik van tensor-flow. Omdat OpenAI Vision op het moment van maken van deze code Vision de server blokkeerde. Dit kan nu gefixed zijn bij een update. Wij raden aan om is te kijken of het mogelijk is nu want tensor-flow is heel beberkt en herkent niet veel objecten. Deze 2 opties is om te zorgen dat afbeelingen worden beschreven in woorden voor de javascript code.

Ook kan er bij de Node red en Websocket code een verandering gebeuren. Daar kan je zorgen dat als je op de kop drukt voor een foto te trekken, dat ineens de loading screen animatie gebeurt.

# Stap 7

 ![Foto 3D model doos](/docs/Tafel%203D%20opmaak%20(1).png)

Nu de code klaarstaat, moet de tafel gemaakt worden. Hier zie je hoe de tafel in sketchup is vormgegeven, zo weet je al ongeveer hoe hij eruit komt te zien als je de tafel in elkaar gestoken hebt.

![Foto van doos in Illustrator 1](/docs/Tafel%20makercase.png)

Deze illustrator file download je en zet je op een usb stick. Vervolgens ga je deze cutten met de lazercutter. Nadat deze helemaal is gecut ga je nog enkele gaten boren om ervoor te zorgen dat je overal je kabels kan wegwerken of naar buiten kan laten komen.

# Stap 8

![Tafel in elkaar zetten](/docs/Tafel%20in%20elkaar%20opbouw.jpg)

Nadat de doos volledig klaar is steek je hem in elkaar, let hierbij op dat je eerst de camera goed plakt aan de onderkant van de grootste plank met het gatje in. Hier moet je opletten dat de camera in de goede richting word geplakt zodat de foto's een beetje logisch getrokken worden. De tafel in elkaar steken gebeurd zoals je op de foto ziet, en zoals je zag op de sketchup. Er is rekening gehouden met de kabels en de raspberry die in de tafel verwerkt gaat worden.

Daarnaast zoek je nog een glazenplaat die past bovenop de tafel. Deze mag niet kleiner zijn dan 31 op 32 centimeter. Zo kan deze niet in het gat vallen en kan je hem vastmaken op het tafelblad. Wij hebben dit met overschotten gedaan van het lazercutten, door deze vlka naast de plaat vast te lijmen, maar dit kan je evengoed gewoon vastlijmen of gewoon los laten liggen.

# Stap 9

Als de tafel in elkaar zit kan je alle kabels in de tafel installeren. Je verbind de raspberry met de groene plaat en steekt deze in het bovenste vakje. In de groene plaat zitten verschillende kabels die ervoor zorgen dat onze knoppen werken. Ook steekt er een batterij in met kabels die ervoor zorgt dat de knoppen ligt geven. Dit is dan weer om de sfeer erin te krijgen.

Daarnaast laat je alle kabels in de doos naar beneden zakken en zorg je ervoor dat de beamer verbonden kan worden met de raspberry en de laptop die in de tafel steken. In het onderste gedeeldte steekt dus nog een laptop omdat de raspberry het niet altijd aankan. Daarna plaats je de beamer op een stoel vooraan de tafel zodat deze op de muur gericht kan worden.

Als laatste plaats je nog een lamp in de tafel zelf. Deze is nodig om de foto goed te trekken. Deze kan je verstoppen onder het vakje waar de raspberry inzit zodat niemand deze ziet. Bij de tafel leg je ook een wit blad of een witte plaat die je er telkens bovenop kan leggen voor je een foto trekt. Deze houd het licht tegen en zorgt ervoor dat de foto goed gemaakt kan worden en dat het herkant wat er ligt.

![Opzet van de tafel](/docs/Opzet%20met%20foto.jpg)

# Stap 10

Naar de host gaan om scherm te krijgen => Esteban

# Stap 11

Nu is het nog belangrijk om de ruimte donker te krijgen. Dit doe je door alluminiumfolie met water tegen de raam te plakken. Zo komt er geen licht meer binnen en is de ruimte duister geworden.

Om deze duisternis was gezelliger te maken gebruiken we de kleuren verlichting, deze zetten we op blauw-groen zodat het wat rustiger word als mensen binnen komen. Ook hebben we nog een wat straffere lamp die ervoor zorgt dat je alles ziet.

# Stap 12

Als allerlaatste stap doe je de aankleding van de ruimte, hier leg je kussens en/of enkele dekens om het wat knusser te maken zoals een echte snoezelruimte.

![Aankleding van de ruimte](/docs/Aankleding%20ruimte.jpg)
