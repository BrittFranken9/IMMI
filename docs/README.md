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

APi key installeren => Esteban

# Stap 4

Nu gaan we de API Key aanmaken en in de code zetten. Nadat je bent ingelogged bij OpenAI. Normaal gezien krijg je de opties ChatGPT of API en wij gaan natuurlijk API kiezen. Daarna ga je naar het slotje met het naam API keys. Als je daarop hebt geklikt ziet je de optie van `+ Create new secret key`. Klik daarop en geef het een naam (Optioneel) dan drup op `Create secret key`. als je dit alles hebt gedaan dan kopieer je de Key en zet je het in de code bij de map apiKey.example.js.
Api key in code zetten => Esteban

# Stap 5

Alles in je map staat nu klaar om te starten.

Enkel nog `npm run dev` invoeren in je terminal bij de juiste map en surfen naar `http://localhost:3000/`

# Stap 6

Nu zullen we de code een beetje uitleggen van hoe het in elkaar zit. Ik deel dit op in 4 delen `html`, `css`, `javascript` en `Node Red`.

### htmml:
De `html` is vrij simpel. Die is ingedeeld in 2 delen. De eerste zie je canvas en die is voor de achtergrond animatie en homepage. Ook wordt dit gebruikt voor de loadingscreen maar dat wordt uitgelegd bij `javascript`. 

Daarna komt het gedeelte waar onze ai image tevoorschijn komt. Daarin kan je nog andere functies zien in `<form>` dat is voor als je images wilt genereren met tekst.

### css: 


Code uitleg => Esteban

Voorbeeld:

loadingscreen.html:
Is het laadscherm dat tevoorschijn komt als je op de blauwe knop hebt gedrukt. Deze komt echter wat later en moet dus in de code zelf nog verplaatst worden...

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
