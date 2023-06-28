<template>
  <div>
    <b-modal id="modal-aba" scrollable title="Légende des espèces ABA" size="l" hide-footer centered>
      <p>La American Birding Association (ABA) classe les espèces d'Amérique du Nord par niveau de rarité :</p>
      <b-row class="mb-2">
        <b-col>
          <strong>Code-3: Rare</strong>: Espèce présente en très petit nombre, mais annuellement. Cela comprend les
          visiteurs et les rares résidents reproducteurs.
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <strong>Code-4: Occasionnel</strong>: Espèces non enregistrées annuellement, mais avec six ou plus nombre
          total d'observation - dont trois ou plus au cours des 30 dernières années - reflétant un certain schéma
          d'occurrence.
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <strong>Code-5: Accidentel</strong>Espèces enregistrées cinq fois ou moins , ou moins de trois records au
          cours des 30 dernières années.
        </b-col>
      </b-row>
      <b-button href="https://www.aba.org/aba-checklist/" target="_blank"> Plus d'informations </b-button>
    </b-modal>
    <b-modal id="modal-exotic" scrollable title="Légende des espèces exotiques" size="l" hide-footer centered>
      <p>
        Toutes les observations d’espèces exotiques dans eBird sont classées dans l’une des trois catégories suivantes :
      </p>
      <b-row class="mb-2">
        <b-col md="auto"><b-img :src="'exotic_N.png'" class="h-16" /></b-col>
        <b-col>
          <strong>Naturalisé</strong>: Les populations exotiques autosuffisantes, se reproduisant dans la nature,
          persistant pendant de nombreuses années et non maintenues par des lâchers continus (peut également inclure des
          visiteurs (égarés) de populations naturalisées). Ces mentions sont comptabilisées dans les données d''eBird
          et, lorsqu''applicable, ont été validées par les comités d''homologation des espèces rares.
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col md="auto"><b-img :src="'exotic_P.png'" class="h-16" /></b-col>
        <b-col>
          <strong>Provisoire</strong>: Soit : 1) membre d''une population exotique se reproduisant en milieu naturel
          depuis plusieurs années, autosuffisante mais n''ayant pas encore été naturalisée ; 2) rareté de provenance
          incertaine, qui pourrait plausiblement être un visiteur (égaré/vagrant) ou un oiseau échappé de captivité.
          Lorsqu''applicable, eBird envoie aux comités d'homologation des espèces rares les mentions d''espèces
          auparavant considérées comme de provenance incertaine.
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col md="auto"><b-img :src="'exotic_X.png'" class="h-16" /></b-col>
        <b-col>
          <strong>Echappé</strong>: Espèce exotique échappée ou relâchée, ou suspectée de l'avoir été. Inclut les
          individus s'étant reproduits dans la nature mais qui ne répondent pas encore aux critères pour accéder au
          statut Provisoire. Les espèces échappées ne sont pas prises en compte dans les totaux d'eBird.
        </b-col>
      </b-row>
      <b-button href="https://support.ebird.org/fr/support/solutions/articles/48001218430" target="_blank">
        Plus d'informations
      </b-button>
    </b-modal>
    <b-modal id="modal-bilan" scrollable title="Bilan ornithologique" size="xl" hide-footer centered>
      <p>
        Au début du trip, je vous expliquais qu'on a dessiné notre trajet pour maximiser le nombre d'espèces vues pour
        notre liste US, et c'est mission réussie ! C'est l'un des voyages les plus prolifiques que l'on ait fait,
        principalement parce que le timing était idéal (printemps = migration + oiseaux qui chantent) et la large base
        de données disponible sur eBird US offre des informations précises sur la localisation des oiseaux. Voici
        ci-dessous quelques points forts en images, sons, et stats :
      </p>

      <h4>Médias en masse</h4>
      <p>
        J'ai investi dans un nouvel objectif (Nikon 500mm PF) juste avant le voyage, et j'en ai bien profité : au total,
        on aura pris
        <a
          href="https://media.ebird.org/catalog?searchField=user&userId=USER497615&sort=rating_rank_desc&unconfirmed=incl&regionCode=US&beginMonth=4&endMonth=12&beginYear=2023&endYear=2023"
          target="_blank"
          >2 159 photos et 33 vidéos</a
        >, auxquelles s'ajoutent 567 enregistrements audio. Tous ces médias ont nécessité pas mal de travail d'édition
        en cours de route, mais on a (quasiment) atteint l'objectif d'avoir au moins une photo ou/et un audio pour
        chaque espèce vue : seules 16 espèces n'ont ni audio ni photos !
      </p>
      <p>Voici une petite sélection de nos photos préférées :</p>

      <b-carousel :interval="20000" controls indicators class="bg-light card">
        <b-carousel-slide v-for="t in top10photos" :key="t">
          <template #img>
            <iframe
              :src="'https://macaulaylibrary.org/asset/' + t + '/embed'"
              height="530"
              width="60%"
              frameborder="0"
              allowfullscreen
              style="margin: 0 auto; display: block"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <p>
        Chercher un maximum d'oiseaux nous amène à découvrir toute une diversité d'ecosystèmes. Ce qu'on apprécie
        particulièrement, c'est s'imprégner d'atmosphères uniques, crées en grande partie par les chants et sons divers
        que l'on entend au fil de la journée. Moins populaires que les photos, les sons forment une grande partie de
        notre expérience de l'ornithologie. On imagine souvent des sons mélodiques mais on trouve dans tous les genres !
        Voici quelques sons qu'on a bien aimé ou qui ont été le résultat de longues recherches :
      </p>
      <b-carousel :interval="20000" controls indicators class="bg-light card mb-4">
        <b-carousel-slide v-for="t in top10audios" :key="t">
          <template #img>
            <iframe
              :src="'https://macaulaylibrary.org/asset/' + t + '/embed'"
              height="390"
              width="640"
              frameborder="0"
              allowfullscreen
              style="margin: 0 auto; display: block"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <h4>Des surprises et des loupés</h4>
      <p>
        On vous a parlé des réussites, mais il y a aussi eu quelques loupés. Au total, il nous manque 15 espèce que je
        pensais possibles (mais difficiles).
      </p>
      <b-button v-b-toggle.collapse-1 variant="primary" class="mb-2">Voir les loupés</b-button>
      <b-collapse id="collapse-1" class="mt-2 mb-2">
        <b-card>
          <ol>
            <li>
              <b>Ruddy Ground Dove</b>: Habituellement présente dans le Sud Est de l'Arizona, cette colombe rousse n'a
              pas été vue depuis fin mars.
            </li>
            <li>
              <b>Buff-collared Nightjar</b>: Il s'agit d'un engoulevant chanteur trouvé uniquement à la frontière entre
              l'Arizona et le Mexique, dans un lieu très difficile d'accès (4x4 quasi obligatoire) dans une zone où un
              cartel semble assez actif. Un guide nous a raconté que des birders y auraient trouvé un sac rempli de
              plusieurs milliers de dollars...! Déjà plutôt hésitants au vu de l'état de la route, on a décidé que
              l'espèce ne valait pas la peine de prendre de risque.
            </li>
            <li>
              <b>White-eared Hummingbird</b>: Ce colibri arrive sur son lieu de nidification à des dates variables entre
              fin avril et fin mai. Cette année, ils sont arrivés le 10 mai, alors que nous avions déjà quitté cette
              région quelques jours plus tôt. Deux personnes les avaient signalés déjà début mai, suite à quoi on a
              passé une après-midi entière dans l'espoir de les voir, mais cette observation a finalement été rejetée...
            </li>
            <li>
              <b>Berylline Hummingbird</b>: Même cas de figure - ce colibri est arrivé entre le 7 et 15 mai dans le sud
              de l'Arizona, alors qu'on avait déjà quitté la région - trop loin pour faire demi-tour !
            </li>
            <li>
              <b>Black Turnstone</b>: Ces tournepierres sont des hivernants communs sur la côte ouest. Quelques
              individus restent plus tard dans la saison, jusqu'en été mais, avec leurs movements liés à la marée, ils
              restent assez compliqués à trouver. On a raté un petit groupe de 2-3 individus à San Diego (vu la veille
              et le lendemain de notre passage, mais pas le jour-même...).
            </li>
            <li>
              <b>Cassin's Auklet</b>: Il faut de la patience et de la chance pour voir les alcidés lors de seawatch. La
              plupart sont sur leur lieu de nidification plus au nord, ou passent trop au large pour permettre une
              identification fiable.
            </li>
            <li>
              <b>Yellow-footed Gull</b>: Ce goéland est un visiteur estival au sud de la Californie mais se fait de plus
              en plus rare ces dernières années. Il n'a pas été vu cette année.
            </li>
            <li>
              <b>Black Storm-Petrel</b>: Avec un peu de chance, cette océanite est possible à voir en seawatch ou lors
              d'une sortie pélagique sur la cote ouest.
            </li>
            <li>
              <b>Black-vented Shearwater</b>: Idem pour ce puffin cul-noir (pas mal comme nom ?!) - il faudra retenter
              notre chance !
            </li>
            <li>
              <b>Tufted Flycatcher</b>: observé presque chaque année en Arizona, ce gobe-mouche est rare et localisé, et
              n'a pas été vu cette année.
            </li>
            <li>
              <b>Black-throated Magpie-Jay</b>: On a cherché cette espèce exotique 1-2 heures tout au sud de la
              Californie sans succès. L'objectif étant de cibler les espèces nicheuses, on a décidé de continuer notre
              route.
            </li>
            <li>
              <b>Brown Jay</b>: Ce geai n'est pas vu toutes les années dans le sud du Texas, mais a été vu cette année.
              On était donc plutôt optimistes, jusqu'à ce que l'on réalise qu'ils étaient sur une propriété privée où il
              faut payer un guide privé, ce qui nous a un peu refroidi...
            </li>
            <li>
              <b>Red-vented Bulbul</b>: Cette espèce exotique introduite au Texas est trouvée seulement à Austin
              (Texas), trop loin de notre route.
            </li>
            <li>
              <b>Rufous-backed Robin</b>: Vu quasiment tous les ans en Arizona, mis à part quelques individus de
              passage, aucun n'avait été vu sur son territoire lors de notre passage...
            </li>
            <li>
              <b>Great tit</b>: Une espèce bien connue en Europe ! Il y a une petite population de mésanges
              charbonnières le long du lac Michigan. On a décidé de faire l'impasse sur celle-ci, car elle impliquait un
              gros détour à la fin de notre voyage, alors qu'on avait déjà beaucoup de km dans les jambes...
            </li>
          </ol>
        </b-card>
      </b-collapse>
      <p>
        En contrepartie, on a aussi vu certaines espèces que j'avais considérées impossibles, de belles surprises !
        Beaucoup sont des espèces plutôt communes en Europe, mais rares de ce côté de l'océan.
      </p>
      <b-button v-b-toggle.collapse-2 variant="primary" class="mb-2">Voir les surprises</b-button>
      <b-collapse id="collapse-2" class="mt-2 mb-2">
        <b-card>
          <ol>
            <li>
              <b>Garganey</b> : Cette sarcelle a été trouvée à juste quelques heures de notre route, donc on a fait le
              détour, et on a ensuite continué par le Nebraska.
            </li>
            <li>
              <b>Common Crane</b> : Déjà lancés sur le Nebraska, on décide de tenter notre chance pour la grue cendrée
              vu depuis plusieurs semaines dans un immense groupe de grues. Alors que Raph se prépare à scanner parmis
              le groupe étalé sur les champs tout autour de nous, Améline met les jumelles dessus à peine sortie de la
              voiture, gros coup de bol !
            </li>
            <li>
              <b>Red-footed Booby</b> : Cette gannette ne figurait pas sur notre liste mais a été vue dans le port
              duquel démarrait ma sortie pélagique, et le bateau a fait un petit crochet pour la voir.
            </li>
            <li>
              <b>Pied Wagtail</b> : Bergeronnette commune en Europe, il s'agissait cette fois-ci de la sous-espèce
              asiatique.
            </li>
            <li>
              <b>Spotted Dove</b> : Tourterelle que l'on a cherchée dans une zone résidentielle entre la côte et les
              montagnes californiennes.
            </li>
            <li>
              <b>Burrowing Parakeet</b> : Ce perroquet a complètement échappé à mes recherches avant le voyage et
              n'était donc pas du tout sur notre radar ! Heureusement je l'ai vu sur l'app eBird une fois sur place.
            </li>
          </ol>
        </b-card>
      </b-collapse>
      <p>
        Ce qui nous reste pour une autre fois : les hivernants de la cote ouest (Surfbird, Black Turnstone, Pacific
        Golden Plover, Rock Sandpiper, Yellow-billed Diver), pas mal d'oiseaux marins (Ancien, Parakeet, et Cassin's
        Auklets, Sabine's gull, Horned puffin, Laysin albatros, Black Storm petrel, Northern Fulmar, Black-vented
        shearwater, Atlantic Puffin) et des espèces vues de façon très rare en Floride, Texas ou Arizona. Il reste
        également des espèces hivernantes dans l'Est, certaines très rare, principalement des chouettes (Hawk Owl, Great
        Grey Owl, Long-eared Owl, Arctic Redpoll).
      </p>

      <h4>Statistiques</h4>
      Nous avons birdé un total de 570 heures (notre moyenne pour toute l'année d'habitude !). Essayant de valoriser la
      précision des données collectées, on a fait des checklists plus courtes que d'habitude, et plutôt stationaires
      qu'en mouvement. Avec 254 espèces ajoutées (pour un total de 673 aux Etats-Unis) notre liste est bien remplie ! Il
      y a quand même 714 personnes qui ont une liste encore plus exhaustive sur eBird, mais à ce stade de l'année,
      quatre personnes seulement ont vu plus d'espèces que nous aux US (Alaska et Hawai exclus).
      <iframe width="100%" height="300px" frameborder="0" scrolling="no" src="//plotly.com/~rafnuss/99.embed"></iframe>

      <h3>Quelques chiffres</h3>
      <b-row>
        <b-col>
          <h5>Checklists</h5>
          <b-table style="max-height: 300px" striped hover small sticky-header :items="summary" />
        </b-col>
        <b-col>
          <h5>Nombre de vues/espèce</h5>
          <b-table
            style="max-height: 300px"
            striped
            hover
            small
            sticky-header
            :items="species_occurance"
            :fields="[
              {
                key: 'name',
                label: 'Common Name',
              },
              {
                key: 'val',
                label: '#',
              },
            ]"
          ></b-table>
        </b-col>

        <b-col>
          <h5>Nombre d'individus comptés/espèce</h5>
          <b-table
            style="max-height: 300px"
            striped
            hover
            small
            sticky-header
            :items="species_count"
            :fields="[
              {
                key: 'name',
                label: 'Common Name',
              },
              {
                key: 'val',
                label: '#',
              },
            ]"
          ></b-table>
        </b-col>
      </b-row>

      <h3>Le coloriage de birder</h3>
      Pour aider à faire passer le temps lors des trajets en voiture, on a essayé de faire une liste pour chaque
      "county" (conté) traversé !
      <b-img src="USCountyMap.png" fluid />

      <h3>Nombre d'espèces observées/jour</h3>
      <p>
        On visait plutôt la liste US dans son ensemble que de voir un maximum d'espèces chaque jour, donc la plupart des
        jours sont plutôt bas. Record battu le jour de l'anniversaire de Mady. Beau cadeau, non ?
      </p>
      <b-img src="SpeciesCalendar.jpg" fluid />
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top10photos: [
        "554249831",
        "567019731",
        "559931871",
        "573047761",
        "559165981",
        "559157971",
        "581204711",
        "576496561",
        "581195481",
        "555605991",
        "567022721",
      ],

      top10audios: [
        "586558551",
        "586564191",
        "573124881",
        "561302331",
        "559487821",
        "579706931",
        "559471091",
        "579706501",
        "586563641",
        "559460411",
        "559470931",
        "559487761",
        "586562481",
        "579712471",
        "586558371",
      ],
      summary: [
        { description: "Durée totale (jours)", "#": 19 },
        { description: "Km parcourus au total (km)", "#": 1004 },
        { description: "Moyenne du nb d'espèces", "#": 16.7 },
        { description: "Moyenne du nb d'individus", "#": 444 },
        { description: "Médianne du nb d'espèces / checklist en mouvement", "#": 20 },
        { description: "Durée moyenne des checklists en mouvement (min)", "#": 56 },
        { description: "Distance moyenne des checklists en mouvement (km)", "#": 2.4 },
        { description: "Médianne du nb d'espèces / checklist stationaire", "#": 9 },
        { description: "Durée moyenne des checklists stationaires (min)", "#": 17 },
      ],
      species_occurance: [
        { name: "American Robin", val: 308 },
        { name: "Red-winged Blackbird", val: 288 },
        { name: "Turkey Vulture", val: 273 },
        { name: "Mourning Dove", val: 273 },
        { name: "American Crow", val: 212 },
        { name: "Common Starling", val: 205 },
        { name: "Common Raven", val: 184 },
        { name: "Song Sparrow", val: 174 },
        { name: "Canada Goose", val: 172 },
        { name: "Mallard", val: 167 },
        { name: "Red-tailed Hawk", val: 152 },
        { name: "Barn Swallow", val: 149 },
        { name: "House Sparrow", val: 136 },
        { name: "Common Yellowthroat", val: 130 },
        { name: "Dark-eyed Junco", val: 127 },
        { name: "Killdeer", val: 124 },
        { name: "Common Grackle", val: 121 },
        { name: "Yellow-rumped Warbler", val: 121 },
        { name: "Yellow Warbler", val: 117 },
        { name: "Western Meadowlark", val: 112 },
        { name: "Feral Pigeon", val: 110 },
        { name: "Brown-headed Cowbird", val: 110 },
        { name: "Northern Flicker", val: 109 },
        { name: "House Finch", val: 107 },
        { name: "Tree Swallow", val: 102 },
        { name: "Northern Cardinal", val: 101 },
        { name: "Collared Dove", val: 101 },
        { name: "Gadwall", val: 94 },
        { name: "Northern Mockingbird", val: 92 },
        { name: "White-winged Dove", val: 91 },
        { name: "Warbling Vireo", val: 89 },
        { name: "Spotted Towhee", val: 88 },
        { name: "White-crowned Sparrow", val: 84 },
        { name: "Cliff Swallow", val: 81 },
        { name: "Chipping Sparrow", val: 81 },
        { name: "House Wren", val: 81 },
        { name: "Black-headed Grosbeak", val: 80 },
        { name: "Northern Shoveler", val: 80 },
        { name: "Great-tailed Grackle", val: 78 },
        { name: "Western Tanager", val: 76 },
        { name: "American Coot", val: 74 },
        { name: "Double-crested Cormorant", val: 74 },
        { name: "Great Blue Heron", val: 72 },
        { name: "Cedar Waxwing", val: 72 },
        { name: "Savannah Sparrow", val: 71 },
        { name: "Ring-billed Gull", val: 70 },
        { name: "Wilson's Warbler", val: 69 },
        { name: "Shore Lark", val: 68 },
        { name: "Blue-winged Teal", val: 66 },
        { name: "Swainson's Thrush", val: 65 },
        { name: "American Goldfinch", val: 65 },
        { name: "Wilson's Snipe", val: 62 },
        { name: "Bald Eagle", val: 62 },
        { name: "Red-breasted Nuthatch", val: 60 },
        { name: "Violet-green Swallow", val: 60 },
        { name: "American Kestrel", val: 59 },
        { name: "Ruddy Duck", val: 59 },
        { name: "Eurasian/Green-winged Teal", val: 58 },
        { name: "Pacific-slope Flycatcher", val: 58 },
        { name: "Lesser Scaup", val: 56 },
        { name: "Orange-crowned Warbler", val: 56 },
        { name: "Black-billed Magpie", val: 56 },
        { name: "Blue Jay", val: 55 },
        { name: "Bewick's Wren", val: 55 },
        { name: "Ladder-backed Woodpecker", val: 54 },
        { name: "Brewer's Blackbird", val: 54 },
        { name: "Townsend's Warbler", val: 54 },
        { name: "Nashville Warbler", val: 52 },
        { name: "American Wigeon", val: 52 },
        { name: "Northern Rough-winged Swallow", val: 52 },
        { name: "Western Kingbird", val: 52 },
        { name: "Ruby-crowned Kinglet", val: 51 },
        { name: "Swainson's Hawk", val: 50 },
        { name: "Yellow-headed Blackbird", val: 49 },
        { name: "Hermit Thrush", val: 48 },
        { name: "Brown Creeper", val: 48 },
        { name: "Western Wood-Pewee", val: 48 },
        { name: "Steller's Jay", val: 48 },
        { name: "Ash-throated Flycatcher", val: 48 },
        { name: "Black-capped Chickadee", val: 48 },
        { name: "Golden-crowned Kinglet", val: 47 },
        { name: "Bufflehead", val: 46 },
        { name: "Northern Harrier", val: 46 },
        { name: "Pine Siskin", val: 46 },
        { name: "Lesser Goldfinch", val: 46 },
        { name: "Vesper Sparrow", val: 45 },
        { name: "Spotted Sandpiper", val: 43 },
        { name: "Mountain Chickadee", val: 43 },
        { name: "Osprey", val: 42 },
        { name: "Clay-coloured Sparrow", val: 42 },
        { name: "White-throated Swift", val: 41 },
        { name: "Northern Pintail", val: 41 },
        { name: "Swamp Sparrow", val: 41 },
        { name: "Brown-crested Flycatcher", val: 41 },
        { name: "Red-eyed Vireo", val: 41 },
        { name: "Downy Woodpecker", val: 40 },
        { name: "Anna's Hummingbird", val: 39 },
        { name: "Hairy Woodpecker", val: 39 },
        { name: "Acorn Woodpecker", val: 39 },
        { name: "Eastern Kingbird", val: 39 },
        { name: "Sandhill Crane", val: 38 },
        { name: "American White Pelican", val: 38 },
        { name: "Pied-billed Grebe", val: 38 },
        { name: "Blue-grey Gnatcatcher", val: 38 },
        { name: "White-breasted Nuthatch", val: 38 },
        { name: "White-throated Sparrow", val: 38 },
        { name: "Black-chinned Hummingbird", val: 37 },
        { name: "Great White Egret", val: 37 },
        { name: "Verdin", val: 37 },
        { name: "Redhead", val: 37 },
        { name: "Sora", val: 37 },
        { name: "California Gull", val: 36 },
        { name: "Golden-fronted Woodpecker", val: 36 },
        { name: "Cinnamon Teal", val: 35 },
        { name: "Ring-necked Duck", val: 33 },
        { name: "Marsh Wren", val: 33 },
        { name: "Great Northern Diver", val: 33 },
        { name: "Lark Sparrow", val: 30 },
        { name: "Herring Gull", val: 30 },
        { name: "Summer Tanager", val: 30 },
        { name: "Chestnut-backed Chickadee", val: 30 },
        { name: "Eastern Meadowlark", val: 30 },
        { name: "Black-throated Sparrow", val: 29 },
        { name: "Olive Sparrow", val: 29 },
        { name: "Least Flycatcher", val: 29 },
        { name: "Western Gull", val: 29 },
        { name: "Broad-tailed Hummingbird", val: 29 },
        { name: "Caspian Tern", val: 28 },
        { name: "Red-bellied Woodpecker", val: 28 },
        { name: "Lincoln's Sparrow", val: 28 },
        { name: "Lazuli Bunting", val: 28 },
        { name: "Black-throated Grey Warbler", val: 28 },
        { name: "Scissor-tailed Flycatcher", val: 28 },
        { name: "Dusky Flycatcher", val: 27 },
        { name: "Willet", val: 27 },
        { name: "Bell's Vireo", val: 27 },
        { name: "Black-crested Titmouse", val: 26 },
        { name: "Veery", val: 26 },
        { name: "Canyon Wren", val: 26 },
        { name: "Alder Flycatcher", val: 26 },
        { name: "MacGillivray's Warbler", val: 26 },
        { name: "Yellow-breasted Chat", val: 26 },
        { name: "Bullock's Oriole", val: 26 },
        { name: "Common Crossbill", val: 26 },
        { name: "Wild Turkey", val: 26 },
        { name: "Black-necked Grebe", val: 26 },
        { name: "Say's Phoebe", val: 26 },
        { name: "Carolina Wren", val: 26 },
        { name: "Canyon Towhee", val: 25 },
        { name: "Goosander", val: 25 },
        { name: "Fox Sparrow", val: 25 },
        { name: "Brown Pelican", val: 25 },
        { name: "Purple Martin", val: 25 },
        { name: "Couch's Kingbird", val: 25 },
        { name: "Plumbeous Vireo", val: 25 },
        { name: "Pigeon Guillemot", val: 24 },
        { name: "Hammond's Flycatcher", val: 24 },
        { name: "Black-necked Stilt", val: 24 },
        { name: "Hooded Oriole", val: 24 },
        { name: "Red-breasted Merganser", val: 24 },
        { name: "Cassin's Vireo", val: 24 },
        { name: "Great Horned Owl", val: 23 },
        { name: "Broad-billed Hummingbird", val: 23 },
        { name: "Belted Kingfisher", val: 23 },
        { name: "Band-tailed Pigeon", val: 23 },
        { name: "Great Kiskadee", val: 23 },
        { name: "Black Phoebe", val: 23 },
        { name: "Western Bluebird", val: 23 },
        { name: "Sharp-shinned Hawk", val: 22 },
        { name: "Western Grebe", val: 22 },
        { name: "Chestnut-collared Longspur", val: 22 },
        { name: "Olive-sided Flycatcher", val: 22 },
        { name: "American Black Vulture", val: 22 },
        { name: "Snowy Egret", val: 22 },
        { name: "Hooded Merganser", val: 22 },
        { name: "Bushtit", val: 22 },
        { name: "American Redstart", val: 22 },
        { name: "Cassin's Kingbird", val: 22 },
        { name: "Black-bellied Whistling-Duck", val: 21 },
        { name: "Pacific Diver", val: 21 },
        { name: "Common Pheasant", val: 21 },
        { name: "American Avocet", val: 21 },
        { name: "Sand Martin", val: 21 },
        { name: "Brewer's Sparrow", val: 21 },
        { name: "Pelagic Cormorant", val: 21 },
        { name: "Canvasback", val: 20 },
        { name: "Cassin's Finch", val: 20 },
        { name: "Purple Finch", val: 20 },
        { name: "Franklin's Gull", val: 20 },
        { name: "Curve-billed Thrasher", val: 20 },
        { name: "Cactus Wren", val: 19 },
        { name: "Lesser Nighthawk", val: 19 },
        { name: "Sedge Wren", val: 19 },
        { name: "Grey Catbird", val: 19 },
        { name: "Long-billed Curlew", val: 19 },
        { name: "Common Pauraque", val: 19 },
        { name: "Greater Yellowlegs", val: 19 },
        { name: "Pacific Wren", val: 19 },
        { name: "Brandt's Cormorant", val: 19 },
        { name: "Rufous-crowned Sparrow", val: 18 },
        { name: "Wood Duck", val: 18 },
        { name: "Mexican Jay", val: 18 },
        { name: "Pyrrhuloxia", val: 18 },
        { name: "Common Nighthawk", val: 18 },
        { name: "Willow Flycatcher", val: 18 },
        { name: "Eastern Phoebe", val: 18 },
        { name: "Forster's Tern", val: 18 },
        { name: "Gambel's Quail", val: 17 },
        { name: "Chimney Swift", val: 17 },
        { name: "Scott's Oriole", val: 17 },
        { name: "Laughing Gull", val: 17 },
        { name: "Townsend's Solitaire", val: 17 },
        { name: "Mountain Bluebird", val: 17 },
        { name: "Field Sparrow", val: 17 },
        { name: "Ferruginous Hawk", val: 16 },
        { name: "Crested Caracara", val: 16 },
        { name: "Greater Roadrunner", val: 16 },
        { name: "Dusky-capped Flycatcher", val: 16 },
        { name: "Indigo Bunting", val: 16 },
        { name: "Wilson's Phalarope", val: 16 },
        { name: "Grace's Warbler", val: 16 },
        { name: "Lesser Yellowlegs", val: 16 },
        { name: "Green Jay", val: 15 },
        { name: "Bronzed Cowbird", val: 15 },
        { name: "Hepatic Tanager", val: 15 },
        { name: "Vermilion Flycatcher", val: 15 },
        { name: "Rock Wren", val: 15 },
        { name: "American Tree Sparrow", val: 15 },
        { name: "Common Guillemot", val: 15 },
        { name: "Hutton's Vireo", val: 15 },
        { name: "Cooper's Hawk", val: 14 },
        { name: "Grasshopper Sparrow", val: 14 },
        { name: "Tufted Titmouse", val: 14 },
        { name: "Common Goldeneye", val: 14 },
        { name: "California Quail", val: 14 },
        { name: "Scaled Quail", val: 14 },
        { name: "Rhinoceros Auklet", val: 14 },
        { name: "Bonaparte's Gull", val: 14 },
        { name: "Common Ground Dove", val: 14 },
        { name: "Pileated Woodpecker", val: 14 },
        { name: "Glaucous-winged Gull", val: 14 },
        { name: "Marbled Godwit", val: 14 },
        { name: "Surf Scoter", val: 14 },
        { name: "Black-and-white Warbler", val: 14 },
        { name: "Phainopepla", val: 14 },
        { name: "Green-tailed Towhee", val: 14 },
        { name: "Rufous Hummingbird", val: 14 },
        { name: "Hermit Warbler", val: 14 },
        { name: "Chestnut-sided Warbler", val: 14 },
        { name: "Pygmy Nuthatch", val: 14 },
        { name: "Woodhouse's Scrub-Jay", val: 13 },
        { name: "Golden Eagle", val: 13 },
        { name: "Marbled Murrelet", val: 13 },
        { name: "Wrentit", val: 13 },
        { name: "Lucy's Warbler", val: 13 },
        { name: "Tennessee Warbler", val: 13 },
        { name: "White-tipped Dove", val: 13 },
        { name: "California Towhee", val: 13 },
        { name: "Painted Redstart", val: 13 },
        { name: "Neotropic Cormorant", val: 13 },
        { name: "Blue Grosbeak", val: 13 },
        { name: "Rose-breasted Grosbeak", val: 13 },
        { name: "White-faced Ibis", val: 13 },
        { name: "Thick-billed Longspur", val: 13 },
        { name: "Long-billed Thrasher", val: 13 },
        { name: "White-eyed Vireo", val: 13 },
        { name: "Buff-bellied Pipit", val: 12 },
        { name: "Mexican Whip-poor-will", val: 12 },
        { name: "California Scrub-Jay", val: 12 },
        { name: "Green Heron", val: 12 },
        { name: "Inca Dove", val: 12 },
        { name: "Eastern Wood-Pewee", val: 12 },
        { name: "Black Oystercatcher", val: 12 },
        { name: "Loggerhead Shrike", val: 12 },
        { name: "Virginia's Warbler", val: 12 },
        { name: "Clark's Nutcracker", val: 12 },
        { name: "Painted Bunting", val: 12 },
        { name: "Tropical Kingbird", val: 12 },
        { name: "Greater Scaup", val: 11 },
        { name: "Bridled Titmouse", val: 11 },
        { name: "Red-shouldered Hawk", val: 11 },
        { name: "Baird's Sparrow", val: 11 },
        { name: "Black Tern", val: 11 },
        { name: "Bobolink", val: 11 },
        { name: "Long-billed Dowitcher", val: 11 },
        { name: "Black-crowned Night-Heron", val: 11 },
        { name: "Plain Chachalaca", val: 11 },
        { name: "Harris's Hawk", val: 11 },
        { name: "Ovenbird", val: 11 },
        { name: "Eastern Bluebird", val: 11 },
        { name: "LeConte's Sparrow", val: 10 },
        { name: "Baird's Sandpiper", val: 10 },
        { name: "Trumpeter Swan", val: 10 },
        { name: "Tricoloured Heron", val: 10 },
        { name: "White-winged Scoter", val: 10 },
        { name: "Abert's Towhee", val: 10 },
        { name: "Eastern Towhee", val: 10 },
        { name: "Slavonian Grebe", val: 10 },
        { name: "Carolina Chickadee", val: 10 },
        { name: "Brown Thrasher", val: 10 },
        { name: "Winter Wren", val: 10 },
        { name: "Mexican Duck", val: 9 },
        { name: "Cattle Egret", val: 9 },
        { name: "Vaux's Swift", val: 9 },
        { name: "Chihuahuan Raven", val: 9 },
        { name: "Rivoli's Hummingbird", val: 9 },
        { name: "Gull-billed Tern", val: 9 },
        { name: "Mourning Warbler", val: 9 },
        { name: "Baltimore Oriole", val: 9 },
        { name: "Orchard Oriole", val: 9 },
        { name: "Varied Thrush", val: 9 },
        { name: "Gila Woodpecker", val: 9 },
        { name: "Red-breasted Sapsucker", val: 9 },
        { name: "Snow Goose", val: 8 },
        { name: "Sprague's Pipit", val: 8 },
        { name: "Upland Sandpiper", val: 8 },
        { name: "Broad-winged Hawk", val: 8 },
        { name: "Least Sandpiper", val: 8 },
        { name: "Evening Grosbeak", val: 8 },
        { name: "Mute Swan", val: 8 },
        { name: "Yellow-bellied Flycatcher", val: 8 },
        { name: "Peregrine Falcon", val: 8 },
        { name: "American Moorhen", val: 8 },
        { name: "Black-tailed Gnatcatcher", val: 8 },
        { name: "Virginia Rail", val: 8 },
        { name: "Allen's Hummingbird", val: 8 },
        { name: "American Black Duck", val: 7 },
        { name: "Ruby-throated Hummingbird", val: 7 },
        { name: "Oak Titmouse", val: 7 },
        { name: "Barrow's Goldeneye", val: 7 },
        { name: "Snowy Plover", val: 7 },
        { name: "Cordilleran Flycatcher", val: 7 },
        { name: "Grey Flycatcher", val: 7 },
        { name: "White Ibis", val: 7 },
        { name: "Harlequin Duck", val: 7 },
        { name: "Wood Thrush", val: 7 },
        { name: "Yellow-eyed Junco", val: 7 },
        { name: "Red-headed Woodpecker", val: 7 },
        { name: "Elf Owl", val: 7 },
        { name: "Common Poorwill", val: 7 },
        { name: "Elegant Tern", val: 7 },
        { name: "Sharp-tailed Grouse", val: 7 },
        { name: "Clark's Grebe", val: 6 },
        { name: "Red-crowned Parrot", val: 6 },
        { name: "Bell's Sparrow", val: 6 },
        { name: "Zone-tailed Hawk", val: 6 },
        { name: "Grey Hawk", val: 6 },
        { name: "Western Sandpiper", val: 6 },
        { name: "Pectoral Sandpiper", val: 6 },
        { name: "Northern Beardless-Tyrannulet", val: 6 },
        { name: "Greater Sage-Grouse", val: 6 },
        { name: "Northern Bobwhite", val: 6 },
        { name: "Greater Pewee", val: 6 },
        { name: "Nuttall's Woodpecker", val: 6 },
        { name: "Red-throated Diver", val: 6 },
        { name: "Northern Pygmy-Owl", val: 6 },
        { name: "Altamira Oriole", val: 6 },
        { name: "Western Screech-Owl", val: 6 },
        { name: "Whimbrel", val: 6 },
        { name: "Mountain Quail", val: 6 },
        { name: "Grey Partridge", val: 6 },
        { name: "Cave Swallow", val: 6 },
        { name: "Green Parakeet", val: 6 },
        { name: "Black Skimmer", val: 6 },
        { name: "Northern Parula", val: 6 },
        { name: "Red-naped Sapsucker", val: 6 },
        { name: "California Thrasher", val: 6 },
        { name: "Clay-coloured Thrush", val: 6 },
        { name: "Anhinga", val: 5 },
        { name: "Sooty Shearwater", val: 5 },
        { name: "Semipalmated Sandpiper", val: 5 },
        { name: "Red-faced Warbler", val: 5 },
        { name: "Semipalmated Plover", val: 5 },
        { name: "Groove-billed Ani", val: 5 },
        { name: "White-headed Woodpecker", val: 5 },
        { name: "Little Blue Heron", val: 5 },
        { name: "Rusty Blackbird", val: 5 },
        { name: "Colima Warbler", val: 5 },
        { name: "Brown-capped Rosy-Finch", val: 5 },
        { name: "Two-barred Crossbill", val: 5 },
        { name: "Great Crested Flycatcher", val: 5 },
        { name: "Black-footed Albatross", val: 5 },
        { name: "Pine Grosbeak", val: 5 },
        { name: "Scarlet Tanager", val: 5 },
        { name: "Red-necked Grebe", val: 5 },
        { name: "Calliope Hummingbird", val: 5 },
        { name: "Blackburnian Warbler", val: 5 },
        { name: "Least Tern", val: 5 },
        { name: "Barred Owl", val: 5 },
        { name: "Crissal Thrasher", val: 5 },
        { name: "Solitary Sandpiper", val: 5 },
        { name: "Blue-headed Vireo", val: 5 },
        { name: "Buff-bellied Hummingbird", val: 4 },
        { name: "Ruffed Grouse", val: 4 },
        { name: "Costa's Hummingbird", val: 4 },
        { name: "American Dipper", val: 4 },
        { name: "Fish Crow", val: 4 },
        { name: "Yellow Rail", val: 4 },
        { name: "Arizona Woodpecker", val: 4 },
        { name: "Merlin", val: 4 },
        { name: "Pinyon Jay", val: 4 },
        { name: "Mississippi Kite", val: 4 },
        { name: "Heermann's Gull", val: 4 },
        { name: "Great Black-backed Gull", val: 4 },
        { name: "Whiskered Screech-Owl", val: 4 },
        { name: "Northern Waterthrush", val: 4 },
        { name: "Varied Bunting", val: 4 },
        { name: "Canada Jay", val: 4 },
        { name: "Rufous-winged Sparrow", val: 4 },
        { name: "Cassin's Sparrow", val: 4 },
        { name: "American Golden Plover", val: 4 },
        { name: "Grey Plover", val: 4 },
        { name: "Hooded Warbler", val: 4 },
        { name: "Kirtland's Warbler", val: 4 },
        { name: "Black-throated Green Warbler", val: 4 },
        { name: "Williamson's Sapsucker", val: 4 },
        { name: "Dickcissel", val: 4 },
        { name: "Common Tern", val: 4 },
        { name: "Greater Prairie-Chicken", val: 4 },
        { name: "Black-capped Vireo", val: 4 },
        { name: "Northern Saw-whet Owl", val: 3 },
        { name: "Chukar", val: 3 },
        { name: "Pink-footed Shearwater", val: 3 },
        { name: "Ruddy Turnstone", val: 3 },
        { name: "Burrowing Owl", val: 3 },
        { name: "American Bittern", val: 3 },
        { name: "Rough-legged Buzzard", val: 3 },
        { name: "Common Black Hawk", val: 3 },
        { name: "Lark Bunting", val: 3 },
        { name: "Dunlin", val: 3 },
        { name: "Lucifer Hummingbird", val: 3 },
        { name: "Green Kingfisher", val: 3 },
        { name: "Long-tailed Duck", val: 3 },
        { name: "Yellow-billed Cuckoo", val: 3 },
        { name: "Black-billed Cuckoo", val: 3 },
        { name: "Sooty Grouse", val: 3 },
        { name: "Prairie Falcon", val: 3 },
        { name: "Tufted Puffin", val: 3 },
        { name: "White-tailed Hawk", val: 3 },
        { name: "Least Bittern", val: 3 },
        { name: "Ringed Kingfisher", val: 3 },
        { name: "Eastern Screech-Owl", val: 3 },
        { name: "Lewis's Woodpecker", val: 3 },
        { name: "Sage Thrasher", val: 3 },
        { name: "Louisiana Waterthrush", val: 3 },
        { name: "Olive Warbler", val: 3 },
        { name: "Red-necked Phalarope", val: 3 },
        { name: "American Three-toed Woodpecker", val: 3 },
        { name: "American Woodcock", val: 3 },
        { name: "Golden-cheeked Warbler", val: 3 },
        { name: "Pine Warbler", val: 3 },
        { name: "Yellow-bellied Sapsucker", val: 3 },
        { name: "Lawrence's Goldfinch", val: 3 },
        { name: "Black-chinned Sparrow", val: 3 },
        { name: "Royal Tern", val: 3 },
        { name: "Elegant Trogon", val: 3 },
        { name: "Lesser Prairie-Chicken", val: 3 },
        { name: "Yellow-throated Vireo", val: 3 },
        { name: "Harris's Sparrow", val: 3 },
        { name: "Tricoloured Blackbird", val: 2 },
        { name: "Egyptian Goose", val: 2 },
        { name: "Yellow-headed Parrot", val: 2 },
        { name: "Eastern Whip-poor-will", val: 2 },
        { name: "Island Scrub-Jay", val: 2 },
        { name: "Short-eared Owl", val: 2 },
        { name: "Lapland Bunting", val: 2 },
        { name: "Sanderling", val: 2 },
        { name: "Red Knot", val: 2 },
        { name: "Stilt Sandpiper", val: 2 },
        { name: "Canada Warbler", val: 2 },
        { name: "Bewick's Swan", val: 2 },
        { name: "Black Swift", val: 2 },
        { name: "Montezuma Quail", val: 2 },
        { name: "Dusky Grouse", val: 2 },
        { name: "Reddish Egret", val: 2 },
        { name: "Buff-breasted Flycatcher", val: 2 },
        { name: "California Condor", val: 2 },
        { name: "Audubon's Oriole", val: 2 },
        { name: "White-tailed Ptarmigan", val: 2 },
        { name: "Blue-throated Mountain-gem", val: 2 },
        { name: "Black Rail", val: 2 },
        { name: "Grey-crowned Rosy-Finch", val: 2 },
        { name: "Yellow-crowned Night-Heron", val: 2 },
        { name: "Connecticut Warbler", val: 2 },
        { name: "Eurasian Tree Sparrow", val: 2 },
        { name: "Red-billed Pigeon", val: 2 },
        { name: "Botteri's Sparrow", val: 2 },
        { name: "Yellow-billed Magpie", val: 2 },
        { name: "Roseate Spoonbill", val: 2 },
        { name: "Mexican Chickadee", val: 2 },
        { name: "Prothonotary Warbler", val: 2 },
        { name: "Flammulated Owl", val: 2 },
        { name: "Red-whiskered Bulbul", val: 2 },
        { name: "Ridgway's Rail", val: 2 },
        { name: "Yellow-throated Warbler", val: 2 },
        { name: "Magnolia Warbler", val: 2 },
        { name: "Cape May Warbler", val: 2 },
        { name: "Great Grey Owl", val: 2 },
        { name: "Spotted Owl", val: 2 },
        { name: "Chihuahuan Meadowlark", val: 2 },
        { name: "Scripps's Murrelet", val: 2 },
        { name: "Himalayan Snowcock", val: 2 },
        { name: "LeConte's Thrasher", val: 2 },
        { name: "Barn Owl", val: 2 },
        { name: "Golden-winged Warbler", val: 2 },
        { name: "Pin-tailed Whydah", val: 2 },
        { name: "Swinhoe's White-eye", val: 2 },
        { name: "Northern Goshawk", val: 1 },
        { name: "Tengmalm's Owl", val: 1 },
        { name: "Yellow-collared Lovebird", val: 1 },
        { name: "Rosy-faced Lovebird", val: 1 },
        { name: "Eurasian Skylark", val: 1 },
        { name: "White-fronted Parrot", val: 1 },
        { name: "Red-lored Parrot", val: 1 },
        { name: "Lilac-crowned Parrot", val: 1 },
        { name: "Nelson's Sparrow", val: 1 },
        { name: "Five-striped Sparrow", val: 1 },
        { name: "Mottled Duck", val: 1 },
        { name: "Ross's Goose", val: 1 },
        { name: "Chuck-will's-widow", val: 1 },
        { name: "Sagebrush Sparrow", val: 1 },
        { name: "Juniper Titmouse", val: 1 },
        { name: "Rufous-capped Warbler", val: 1 },
        { name: "Short-tailed Hawk", val: 1 },
        { name: "Smith's Longspur", val: 1 },
        { name: "Spruce Grouse", val: 1 },
        { name: "Gunnison Sage-Grouse", val: 1 },
        { name: "Mountain Plover", val: 1 },
        { name: "Gilded Flicker", val: 1 },
        { name: "Burrowing Parakeet", val: 1 },
        { name: "Fulvous Whistling-Duck", val: 1 },
        { name: "White-tailed Kite", val: 1 },
        { name: "Orange-cheeked Waxbill", val: 1 },
        { name: "Northern Red Bishop", val: 1 },
        { name: "Aplomado Falcon", val: 1 },
        { name: "Kentucky Warbler", val: 1 },
        { name: "Ferruginous Pygmy-Owl", val: 1 },
        { name: "Common Crane", val: 1 },
        { name: "Short-billed Gull", val: 1 },
        { name: "Violet-crowned Hummingbird", val: 1 },
        { name: "Black Rosy-Finch", val: 1 },
        { name: "Hudsonian Godwit", val: 1 },
        { name: "Cassia Crossbill", val: 1 },
        { name: "Sulphur-bellied Flycatcher", val: 1 },
        { name: "Rose-throated Becard", val: 1 },
        { name: "Indian Peafowl", val: 1 },
        { name: "Black-backed Woodpecker", val: 1 },
        { name: "Flame-coloured Tanager", val: 1 },
        { name: "Glossy Ibis", val: 1 },
        { name: "California Gnatcatcher", val: 1 },
        { name: "Black-capped Gnatcatcher", val: 1 },
        { name: "Ring-necked Parakeet", val: 1 },
        { name: "Palm Warbler", val: 1 },
        { name: "Tropical Parula", val: 1 },
        { name: "Blackpoll Warbler", val: 1 },
        { name: "Garganey", val: 1 },
        { name: "Spotted Dove", val: 1 },
        { name: "Morelet's Seedeater", val: 1 },
        { name: "Brown Booby", val: 1 },
        { name: "Red-footed Booby", val: 1 },
        { name: "Least Grebe", val: 1 },
        { name: "Sandwich Tern", val: 1 },
        { name: "Bendire's Thrasher", val: 1 },
        { name: "Wandering Tattler", val: 1 },
        { name: "Thick-billed Kingbird", val: 1 },
        { name: "Blue-winged Warbler", val: 1 },
        { name: "Grey Vireo", val: 1 },
        { name: "Golden-crowned Sparrow", val: 1 },
      ],
      species_count: [
        { name: "Sandhill Crane", val: 194287 },
        { name: "Red-winged Blackbird", val: 14995 },
        { name: "American Coot", val: 11701 },
        { name: "Northern Shoveler", val: 9107 },
        { name: "Eurasian/Green-winged Teal", val: 7301 },
        { name: "Bonaparte's Gull", val: 7154 },
        { name: "Blue-winged Teal", val: 5816 },
        { name: "Red-breasted Merganser", val: 4998 },
        { name: "Brown Pelican", val: 4616 },
        { name: "Brandt's Cormorant", val: 3632 },
        { name: "Sooty Shearwater", val: 3060 },
        { name: "Common Starling", val: 3023 },
        { name: "Turkey Vulture", val: 2857 },
        { name: "Lesser Scaup", val: 2740 },
        { name: "Mallard", val: 2630 },
        { name: "Ring-billed Gull", val: 2630 },
        { name: "Tree Swallow", val: 2503 },
        { name: "Canada Goose", val: 2474 },
        { name: "Western Gull", val: 2460 },
        { name: "Cliff Swallow", val: 2262 },
        { name: "Pacific Diver", val: 2220 },
        { name: "Mourning Dove", val: 2192 },
        { name: "Common Grackle", val: 2133 },
        { name: "Gadwall", val: 2000 },
        { name: "Franklin's Gull", val: 1931 },
        { name: "American Robin", val: 1834 },
        { name: "American White Pelican", val: 1691 },
        { name: "Double-crested Cormorant", val: 1524 },
        { name: "Herring Gull", val: 1506 },
        { name: "Ruddy Duck", val: 1439 },
        { name: "Great-tailed Grackle", val: 1432 },
        { name: "Common Guillemot", val: 1260 },
        { name: "Barn Swallow", val: 1248 },
        { name: "California Gull", val: 1226 },
        { name: "White-winged Dove", val: 1200 },
        { name: "Song Sparrow", val: 1153 },
        { name: "Sand Martin", val: 1145 },
        { name: "White-faced Ibis", val: 1086 },
        { name: "American Crow", val: 1084 },
        { name: "Rhinoceros Auklet", val: 1081 },
        { name: "Yellow-headed Blackbird", val: 980 },
        { name: "House Sparrow", val: 965 },
        { name: "Feral Pigeon", val: 919 },
        { name: "Northern Pintail", val: 844 },
        { name: "Brown-headed Cowbird", val: 838 },
        { name: "Surf Scoter", val: 786 },
        { name: "Canvasback", val: 730 },
        { name: "Yellow Warbler", val: 715 },
        { name: "Shore Lark", val: 690 },
        { name: "Pine Siskin", val: 684 },
        { name: "Black-necked Grebe", val: 678 },
        { name: "Yellow-rumped Warbler", val: 665 },
        { name: "Ring-necked Duck", val: 652 },
        { name: "American Wigeon", val: 639 },
        { name: "Caspian Tern", val: 607 },
        { name: "Bufflehead", val: 604 },
        { name: "House Finch", val: 591 },
        { name: "White-winged Scoter", val: 579 },
        { name: "Dark-eyed Junco", val: 559 },
        { name: "Black Skimmer", val: 557 },
        { name: "Pigeon Guillemot", val: 551 },
        { name: "Snow Goose", val: 539 },
        { name: "White-crowned Sparrow", val: 516 },
        { name: "Chipping Sparrow", val: 496 },
        { name: "Wilson's Snipe", val: 477 },
        { name: "Pelagic Cormorant", val: 470 },
        { name: "Great Blue Heron", val: 466 },
        { name: "Northern Cardinal", val: 459 },
        { name: "Marsh Wren", val: 446 },
        { name: "Spotted Towhee", val: 440 },
        { name: "White-throated Swift", val: 434 },
        { name: "Western Meadowlark", val: 433 },
        { name: "Black Tern", val: 432 },
        { name: "Redhead", val: 425 },
        { name: "Common Raven", val: 416 },
        { name: "Common Yellowthroat", val: 412 },
        { name: "Brewer's Blackbird", val: 405 },
        { name: "Collared Dove", val: 400 },
        { name: "Northern Mockingbird", val: 393 },
        { name: "Western Tanager", val: 381 },
        { name: "Broad-winged Hawk", val: 378 },
        { name: "Cedar Waxwing", val: 377 },
        { name: "Northern Rough-winged Swallow", val: 357 },
        { name: "Killdeer", val: 354 },
        { name: "Smith's Longspur", val: 350 },
        { name: "Laughing Gull", val: 349 },
        { name: "Violet-green Swallow", val: 349 },
        { name: "Purple Martin", val: 341 },
        { name: "Long-billed Dowitcher", val: 338 },
        { name: "Savannah Sparrow", val: 322 },
        { name: "Western Grebe", val: 317 },
        { name: "Lesser Yellowlegs", val: 300 },
        { name: "Black-headed Grosbeak", val: 275 },
        { name: "Pectoral Sandpiper", val: 269 },
        { name: "Warbling Vireo", val: 257 },
        { name: "Baird's Sandpiper", val: 256 },
        { name: "Wilson's Phalarope", val: 245 },
        { name: "American Black Vulture", val: 239 },
        { name: "Northern Flicker", val: 237 },
        { name: "Chestnut-collared Longspur", val: 236 },
        { name: "Marbled Murrelet", val: 231 },
        { name: "Black-bellied Whistling-Duck", val: 229 },
        { name: "Lesser Goldfinch", val: 229 },
        { name: "Red-tailed Hawk", val: 226 },
        { name: "House Wren", val: 224 },
        { name: "Mississippi Kite", val: 221 },
        { name: "Bewick's Wren", val: 215 },
        { name: "Steller's Jay", val: 214 },
        { name: "Mountain Chickadee", val: 213 },
        { name: "American Avocet", val: 209 },
        { name: "Brown-capped Rosy-Finch", val: 205 },
        { name: "Bald Eagle", val: 193 },
        { name: "Thick-billed Longspur", val: 192 },
        { name: "Gambel's Quail", val: 189 },
        { name: "Golden-fronted Woodpecker", val: 186 },
        { name: "Swainson's Thrush", val: 180 },
        { name: "American Goldfinch", val: 178 },
        { name: "Forster's Tern", val: 177 },
        { name: "Wilson's Warbler", val: 175 },
        { name: "Ruby-crowned Kinglet", val: 174 },
        { name: "Scissor-tailed Flycatcher", val: 174 },
        { name: "Olive Sparrow", val: 171 },
        { name: "Red-eyed Vireo", val: 171 },
        { name: "Nashville Warbler", val: 163 },
        { name: "Black-necked Stilt", val: 162 },
        { name: "Cinnamon Teal", val: 162 },
        { name: "Townsend's Warbler", val: 160 },
        { name: "American Tree Sparrow", val: 159 },
        { name: "Least Sandpiper", val: 156 },
        { name: "Orange-crowned Warbler", val: 156 },
        { name: "Tufted Puffin", val: 152 },
        { name: "Pacific-slope Flycatcher", val: 151 },
        { name: "White-throated Sparrow", val: 151 },
        { name: "Verdin", val: 148 },
        { name: "Black-billed Magpie", val: 145 },
        { name: "Red-crowned Parrot", val: 143 },
        { name: "Swamp Sparrow", val: 143 },
        { name: "Black-chinned Hummingbird", val: 142 },
        { name: "Great Northern Diver", val: 142 },
        { name: "Blue-grey Gnatcatcher", val: 142 },
        { name: "Willet", val: 142 },
        { name: "Summer Tanager", val: 140 },
        { name: "Chimney Swift", val: 139 },
        { name: "Brown-crested Flycatcher", val: 138 },
        { name: "Western Wood-Pewee", val: 137 },
        { name: "Mexican Jay", val: 135 },
        { name: "Cassin's Finch", val: 135 },
        { name: "Bell's Vireo", val: 135 },
        { name: "Western Kingbird", val: 132 },
        { name: "Great White Egret", val: 130 },
        { name: "Swainson's Hawk", val: 129 },
        { name: "Acorn Woodpecker", val: 128 },
        { name: "Pied-billed Grebe", val: 127 },
        { name: "Red-breasted Nuthatch", val: 127 },
        { name: "Clay-coloured Sparrow", val: 126 },
        { name: "Wood Duck", val: 124 },
        { name: "Black-capped Chickadee", val: 124 },
        { name: "Ladder-backed Woodpecker", val: 122 },
        { name: "Vesper Sparrow", val: 122 },
        { name: "Ash-throated Flycatcher", val: 121 },
        { name: "Blue Jay", val: 119 },
        { name: "Broad-billed Hummingbird", val: 116 },
        { name: "Eastern Meadowlark", val: 114 },
        { name: "Green Parakeet", val: 113 },
        { name: "Couch's Kingbird", val: 112 },
        { name: "Lazuli Bunting", val: 111 },
        { name: "Least Tern", val: 110 },
        { name: "Hermit Thrush", val: 109 },
        { name: "Trumpeter Swan", val: 109 },
        { name: "Neotropic Cormorant", val: 109 },
        { name: "Golden-crowned Kinglet", val: 108 },
        { name: "Snowy Egret", val: 107 },
        { name: "Greater Scaup", val: 106 },
        { name: "Black-crested Titmouse", val: 105 },
        { name: "Bushtit", val: 105 },
        { name: "Wild Turkey", val: 104 },
        { name: "Anna's Hummingbird", val: 103 },
        { name: "Lesser Nighthawk", val: 101 },
        { name: "Marbled Godwit", val: 97 },
        { name: "Brown Creeper", val: 95 },
        { name: "Royal Tern", val: 94 },
        { name: "Long-billed Thrasher", val: 94 },
        { name: "Northern Harrier", val: 93 },
        { name: "Yellow-breasted Chat", val: 93 },
        { name: "Hooded Merganser", val: 92 },
        { name: "Black-throated Sparrow", val: 87 },
        { name: "California Quail", val: 87 },
        { name: "Yellow-eyed Junco", val: 87 },
        { name: "Two-barred Crossbill", val: 86 },
        { name: "Bronzed Cowbird", val: 85 },
        { name: "White-breasted Nuthatch", val: 85 },
        { name: "Lark Sparrow", val: 84 },
        { name: "Greater Yellowlegs", val: 83 },
        { name: "Broad-tailed Hummingbird", val: 82 },
        { name: "Spotted Sandpiper", val: 81 },
        { name: "Hermit Warbler", val: 81 },
        { name: "Sanderling", val: 80 },
        { name: "American Kestrel", val: 80 },
        { name: "Sedge Wren", val: 79 },
        { name: "Lapland Bunting", val: 78 },
        { name: "California Towhee", val: 78 },
        { name: "Eastern Kingbird", val: 78 },
        { name: "Goosander", val: 77 },
        { name: "Vaux's Swift", val: 74 },
        { name: "Chestnut-backed Chickadee", val: 74 },
        { name: "Bullock's Oriole", val: 73 },
        { name: "Scaled Quail", val: 71 },
        { name: "Sora", val: 71 },
        { name: "Common Goldeneye", val: 70 },
        { name: "Western Sandpiper", val: 69 },
        { name: "Mute Swan", val: 69 },
        { name: "Downy Woodpecker", val: 69 },
        { name: "Common Crossbill", val: 69 },
        { name: "Grace's Warbler", val: 69 },
        { name: "MacGillivray's Warbler", val: 68 },
        { name: "Brewer's Sparrow", val: 68 },
        { name: "Alder Flycatcher", val: 67 },
        { name: "Cactus Wren", val: 66 },
        { name: "Osprey", val: 66 },
        { name: "Dusky Flycatcher", val: 64 },
        { name: "Slavonian Grebe", val: 64 },
        { name: "Cattle Egret", val: 63 },
        { name: "Semipalmated Sandpiper", val: 62 },
        { name: "Red-bellied Woodpecker", val: 62 },
        { name: "Canyon Towhee", val: 61 },
        { name: "American Redstart", val: 61 },
        { name: "Hammond's Flycatcher", val: 60 },
        { name: "Band-tailed Pigeon", val: 60 },
        { name: "Field Sparrow", val: 60 },
        { name: "Phainopepla", val: 59 },
        { name: "Veery", val: 58 },
        { name: "Western Bluebird", val: 58 },
        { name: "Plumbeous Vireo", val: 57 },
        { name: "Grey Plover", val: 56 },
        { name: "Lincoln's Sparrow", val: 54 },
        { name: "Fox Sparrow", val: 54 },
        { name: "Black-throated Grey Warbler", val: 54 },
        { name: "Least Flycatcher", val: 53 },
        { name: "Lucy's Warbler", val: 53 },
        { name: "Canyon Wren", val: 52 },
        { name: "Clark's Nutcracker", val: 52 },
        { name: "Long-tailed Duck", val: 51 },
        { name: "Indigo Bunting", val: 51 },
        { name: "Cassin's Vireo", val: 51 },
        { name: "Elegant Tern", val: 50 },
        { name: "Fulvous Whistling-Duck", val: 48 },
        { name: "Hairy Woodpecker", val: 48 },
        { name: "Rusty Blackbird", val: 48 },
        { name: "Long-billed Curlew", val: 48 },
        { name: "Cave Swallow", val: 48 },
        { name: "Cassin's Kingbird", val: 48 },
        { name: "Great Kiskadee", val: 47 },
        { name: "Pinyon Jay", val: 46 },
        { name: "Tennessee Warbler", val: 45 },
        { name: "Mountain Bluebird", val: 45 },
        { name: "Pyrrhuloxia", val: 44 },
        { name: "Virginia's Warbler", val: 44 },
        { name: "Gila Woodpecker", val: 44 },
        { name: "Abert's Towhee", val: 44 },
        { name: "Carolina Wren", val: 44 },
        { name: "Curve-billed Thrasher", val: 44 },
        { name: "Crested Caracara", val: 43 },
        { name: "Bobolink", val: 43 },
        { name: "Mexican Duck", val: 42 },
        { name: "Rivoli's Hummingbird", val: 42 },
        { name: "Plain Chachalaca", val: 42 },
        { name: "Buff-bellied Pipit", val: 41 },
        { name: "Sprague's Pipit", val: 41 },
        { name: "White-tipped Dove", val: 41 },
        { name: "Black Phoebe", val: 41 },
        { name: "Bridled Titmouse", val: 40 },
        { name: "White Ibis", val: 40 },
        { name: "Common Pauraque", val: 39 },
        { name: "Rufous-crowned Sparrow", val: 38 },
        { name: "Grey Catbird", val: 38 },
        { name: "Say's Phoebe", val: 38 },
        { name: "Oak Titmouse", val: 37 },
        { name: "Dusky-capped Flycatcher", val: 37 },
        { name: "White-eyed Vireo", val: 37 },
        { name: "Tricoloured Blackbird", val: 36 },
        { name: "California Scrub-Jay", val: 36 },
        { name: "Tufted Titmouse", val: 36 },
        { name: "Wrentit", val: 36 },
        { name: "Willow Flycatcher", val: 36 },
        { name: "Hooded Oriole", val: 36 },
        { name: "Pygmy Nuthatch", val: 36 },
        { name: "Mexican Whip-poor-will", val: 35 },
        { name: "Black Oystercatcher", val: 35 },
        { name: "Scott's Oriole", val: 35 },
        { name: "American Golden Plover", val: 35 },
        { name: "Pacific Wren", val: 35 },
        { name: "Painted Redstart", val: 34 },
        { name: "Common Pheasant", val: 34 },
        { name: "Golden-cheeked Warbler", val: 34 },
        { name: "Great Horned Owl", val: 32 },
        { name: "Blue Grosbeak", val: 31 },
        { name: "Red-necked Grebe", val: 31 },
        { name: "Ovenbird", val: 31 },
        { name: "Dunlin", val: 30 },
        { name: "Gull-billed Tern", val: 30 },
        { name: "Vermilion Flycatcher", val: 30 },
        { name: "Woodhouse's Scrub-Jay", val: 29 },
        { name: "Common Nighthawk", val: 29 },
        { name: "American Moorhen", val: 29 },
        { name: "Black-and-white Warbler", val: 29 },
        { name: "Black-throated Green Warbler", val: 29 },
        { name: "Sharp-tailed Grouse", val: 29 },
        { name: "Sharp-shinned Hawk", val: 28 },
        { name: "Ross's Goose", val: 28 },
        { name: "Ferruginous Hawk", val: 28 },
        { name: "Snowy Plover", val: 28 },
        { name: "Olive-sided Flycatcher", val: 28 },
        { name: "Varied Thrush", val: 28 },
        { name: "Glaucous-winged Gull", val: 28 },
        { name: "Rock Wren", val: 28 },
        { name: "Chestnut-sided Warbler", val: 28 },
        { name: "Purple Finch", val: 27 },
        { name: "Painted Bunting", val: 27 },
        { name: "Hepatic Tanager", val: 27 },
        { name: "Lesser Prairie-Chicken", val: 27 },
        { name: "Tropical Kingbird", val: 27 },
        { name: "Red-faced Warbler", val: 26 },
        { name: "Belted Kingfisher", val: 26 },
        { name: "Townsend's Solitaire", val: 26 },
        { name: "Green-tailed Towhee", val: 26 },
        { name: "Rufous Hummingbird", val: 26 },
        { name: "Grasshopper Sparrow", val: 25 },
        { name: "Green Jay", val: 25 },
        { name: "Harris's Hawk", val: 25 },
        { name: "Carolina Chickadee", val: 25 },
        { name: "Baird's Sparrow", val: 23 },
        { name: "Harlequin Duck", val: 23 },
        { name: "Hutton's Vireo", val: 22 },
        { name: "Egyptian Goose", val: 21 },
        { name: "Stilt Sandpiper", val: 21 },
        { name: "Mourning Warbler", val: 21 },
        { name: "Heermann's Gull", val: 21 },
        { name: "Black-crowned Night-Heron", val: 21 },
        { name: "Eastern Phoebe", val: 21 },
        { name: "Cooper's Hawk", val: 20 },
        { name: "White-fronted Parrot", val: 20 },
        { name: "Red-lored Parrot", val: 20 },
        { name: "American Black Duck", val: 20 },
        { name: "Inca Dove", val: 20 },
        { name: "Fish Crow", val: 20 },
        { name: "Greater Roadrunner", val: 20 },
        { name: "Eastern Towhee", val: 20 },
        { name: "Greater Prairie-Chicken", val: 20 },
        { name: "Ruby-throated Hummingbird", val: 19 },
        { name: "Common Ground Dove", val: 19 },
        { name: "Eastern Wood-Pewee", val: 19 },
        { name: "Black Swift", val: 19 },
        { name: "Allen's Hummingbird", val: 19 },
        { name: "California Thrasher", val: 19 },
        { name: "Yellow-bellied Flycatcher", val: 18 },
        { name: "Winter Wren", val: 18 },
        { name: "Black-capped Vireo", val: 18 },
        { name: "Golden Eagle", val: 17 },
        { name: "Red-shouldered Hawk", val: 17 },
        { name: "Northern Bobwhite", val: 17 },
        { name: "Chihuahuan Raven", val: 17 },
        { name: "Lawrence's Goldfinch", val: 17 },
        { name: "Clark's Grebe", val: 16 },
        { name: "Anhinga", val: 16 },
        { name: "Semipalmated Plover", val: 16 },
        { name: "Greater Pewee", val: 16 },
        { name: "Cassin's Sparrow", val: 16 },
        { name: "Red-necked Phalarope", val: 16 },
        { name: "Rose-breasted Grosbeak", val: 16 },
        { name: "Green Heron", val: 15 },
        { name: "Pileated Woodpecker", val: 15 },
        { name: "Red-throated Diver", val: 15 },
        { name: "Northern Waterthrush", val: 15 },
        { name: "Black-tailed Gnatcatcher", val: 15 },
        { name: "LeConte's Sparrow", val: 14 },
        { name: "Barrow's Goldeneye", val: 14 },
        { name: "Little Blue Heron", val: 14 },
        { name: "Orchard Oriole", val: 14 },
        { name: "Loggerhead Shrike", val: 14 },
        { name: "Varied Bunting", val: 14 },
        { name: "Rufous-winged Sparrow", val: 14 },
        { name: "Black-footed Albatross", val: 14 },
        { name: "Eastern Bluebird", val: 14 },
        { name: "Greater Sage-Grouse", val: 13 },
        { name: "Tricoloured Heron", val: 13 },
        { name: "Common Poorwill", val: 13 },
        { name: "Grey Flycatcher", val: 12 },
        { name: "Altamira Oriole", val: 12 },
        { name: "Mountain Quail", val: 12 },
        { name: "Eurasian Tree Sparrow", val: 12 },
        { name: "Virginia Rail", val: 12 },
        { name: "Calliope Hummingbird", val: 12 },
        { name: "Brown Thrasher", val: 12 },
        { name: "Upland Sandpiper", val: 11 },
        { name: "Nuttall's Woodpecker", val: 11 },
        { name: "Cordilleran Flycatcher", val: 11 },
        { name: "Colima Warbler", val: 11 },
        { name: "Grey Partridge", val: 11 },
        { name: "Pine Grosbeak", val: 11 },
        { name: "Red-breasted Sapsucker", val: 11 },
        { name: "Harris's Sparrow", val: 11 },
        { name: "Rosy-faced Lovebird", val: 10 },
        { name: "Bell's Sparrow", val: 10 },
        { name: "Lark Bunting", val: 10 },
        { name: "Gunnison Sage-Grouse", val: 10 },
        { name: "Evening Grosbeak", val: 10 },
        { name: "White-headed Woodpecker", val: 10 },
        { name: "Wood Thrush", val: 10 },
        { name: "Baltimore Oriole", val: 10 },
        { name: "Canada Jay", val: 10 },
        { name: "Blackburnian Warbler", val: 10 },
        { name: "Least Grebe", val: 10 },
        { name: "Elf Owl", val: 9 },
        { name: "Pine Warbler", val: 9 },
        { name: "Red-naped Sapsucker", val: 9 },
        { name: "Barred Owl", val: 9 },
        { name: "Mottled Duck", val: 8 },
        { name: "Island Scrub-Jay", val: 8 },
        { name: "Ruddy Turnstone", val: 8 },
        { name: "Zone-tailed Hawk", val: 8 },
        { name: "Grey Hawk", val: 8 },
        { name: "Northern Beardless-Tyrannulet", val: 8 },
        { name: "Peregrine Falcon", val: 8 },
        { name: "Great Black-backed Gull", val: 8 },
        { name: "Red-headed Woodpecker", val: 8 },
        { name: "Whimbrel", val: 8 },
        { name: "Red-billed Pigeon", val: 8 },
        { name: "Kirtland's Warbler", val: 8 },
        { name: "Solitary Sandpiper", val: 8 },
        { name: "Clay-coloured Thrush", val: 8 },
        { name: "American Bittern", val: 7 },
        { name: "American Dipper", val: 7 },
        { name: "Northern Pygmy-Owl", val: 7 },
        { name: "California Condor", val: 7 },
        { name: "Western Screech-Owl", val: 7 },
        { name: "Whiskered Screech-Owl", val: 7 },
        { name: "Scarlet Tanager", val: 7 },
        { name: "American Woodcock", val: 7 },
        { name: "Dickcissel", val: 7 },
        { name: "Crissal Thrasher", val: 7 },
        { name: "Elegant Trogon", val: 7 },
        { name: "Buff-bellied Hummingbird", val: 6 },
        { name: "Costa's Hummingbird", val: 6 },
        { name: "Mountain Plover", val: 6 },
        { name: "Yellow Rail", val: 6 },
        { name: "Reddish Egret", val: 6 },
        { name: "Ring-necked Parakeet", val: 6 },
        { name: "Northern Parula", val: 6 },
        { name: "Hooded Warbler", val: 6 },
        { name: "Williamson's Sapsucker", val: 6 },
        { name: "Blue-headed Vireo", val: 6 },
        { name: "Eastern Whip-poor-will", val: 5 },
        { name: "Pink-footed Shearwater", val: 5 },
        { name: "Rough-legged Buzzard", val: 5 },
        { name: "Lucifer Hummingbird", val: 5 },
        { name: "Groove-billed Ani", val: 5 },
        { name: "Bewick's Swan", val: 5 },
        { name: "Montezuma Quail", val: 5 },
        { name: "Sooty Grouse", val: 5 },
        { name: "Great Crested Flycatcher", val: 5 },
        { name: "Red-whiskered Bulbul", val: 5 },
        { name: "Common Tern", val: 5 },
        { name: "Scripps's Murrelet", val: 5 },
        { name: "Pin-tailed Whydah", val: 5 },
        { name: "Northern Saw-whet Owl", val: 4 },
        { name: "Chukar", val: 4 },
        { name: "Burrowing Owl", val: 4 },
        { name: "Ruffed Grouse", val: 4 },
        { name: "Yellow-billed Cuckoo", val: 4 },
        { name: "Burrowing Parakeet", val: 4 },
        { name: "Arizona Woodpecker", val: 4 },
        { name: "Buff-breasted Flycatcher", val: 4 },
        { name: "Merlin", val: 4 },
        { name: "Prairie Falcon", val: 4 },
        { name: "White-tailed Hawk", val: 4 },
        { name: "Least Bittern", val: 4 },
        { name: "Grey-crowned Rosy-Finch", val: 4 },
        { name: "Cassia Crossbill", val: 4 },
        { name: "Lewis's Woodpecker", val: 4 },
        { name: "Sage Thrasher", val: 4 },
        { name: "Botteri's Sparrow", val: 4 },
        { name: "Olive Warbler", val: 4 },
        { name: "American Three-toed Woodpecker", val: 4 },
        { name: "Roseate Spoonbill", val: 4 },
        { name: "Yellow-throated Warbler", val: 4 },
        { name: "Magnolia Warbler", val: 4 },
        { name: "Golden-winged Warbler", val: 4 },
        { name: "Yellow-throated Vireo", val: 4 },
        { name: "Yellow-headed Parrot", val: 3 },
        { name: "Short-eared Owl", val: 3 },
        { name: "Common Black Hawk", val: 3 },
        { name: "Red Knot", val: 3 },
        { name: "Canada Warbler", val: 3 },
        { name: "Green Kingfisher", val: 3 },
        { name: "Black-billed Cuckoo", val: 3 },
        { name: "Gilded Flicker", val: 3 },
        { name: "Audubon's Oriole", val: 3 },
        { name: "White-tailed Ptarmigan", val: 3 },
        { name: "Ringed Kingfisher", val: 3 },
        { name: "Eastern Screech-Owl", val: 3 },
        { name: "Connecticut Warbler", val: 3 },
        { name: "Louisiana Waterthrush", val: 3 },
        { name: "Mexican Chickadee", val: 3 },
        { name: "Ridgway's Rail", val: 3 },
        { name: "Cape May Warbler", val: 3 },
        { name: "Yellow-bellied Sapsucker", val: 3 },
        { name: "Black-chinned Sparrow", val: 3 },
        { name: "Spotted Owl", val: 3 },
        { name: "Chihuahuan Meadowlark", val: 3 },
        { name: "LeConte's Thrasher", val: 3 },
        { name: "Blue-winged Warbler", val: 3 },
        { name: "Swinhoe's White-eye", val: 3 },
        { name: "Tengmalm's Owl", val: 2 },
        { name: "Lilac-crowned Parrot", val: 2 },
        { name: "Dusky Grouse", val: 2 },
        { name: "White-tailed Kite", val: 2 },
        { name: "Ferruginous Pygmy-Owl", val: 2 },
        { name: "Blue-throated Mountain-gem", val: 2 },
        { name: "Black Rail", val: 2 },
        { name: "Black Rosy-Finch", val: 2 },
        { name: "Yellow-crowned Night-Heron", val: 2 },
        { name: "Yellow-billed Magpie", val: 2 },
        { name: "Flame-coloured Tanager", val: 2 },
        { name: "Prothonotary Warbler", val: 2 },
        { name: "Flammulated Owl", val: 2 },
        { name: "Blackpoll Warbler", val: 2 },
        { name: "Great Grey Owl", val: 2 },
        { name: "Himalayan Snowcock", val: 2 },
        { name: "Sandwich Tern", val: 2 },
        { name: "Wandering Tattler", val: 2 },
        { name: "Thick-billed Kingbird", val: 2 },
        { name: "Barn Owl", val: 2 },
        { name: "Northern Goshawk", val: 1 },
        { name: "Yellow-collared Lovebird", val: 1 },
        { name: "Eurasian Skylark", val: 1 },
        { name: "Nelson's Sparrow", val: 1 },
        { name: "Five-striped Sparrow", val: 1 },
        { name: "Chuck-will's-widow", val: 1 },
        { name: "Sagebrush Sparrow", val: 1 },
        { name: "Juniper Titmouse", val: 1 },
        { name: "Rufous-capped Warbler", val: 1 },
        { name: "Short-tailed Hawk", val: 1 },
        { name: "Spruce Grouse", val: 1 },
        { name: "Orange-cheeked Waxbill", val: 1 },
        { name: "Northern Red Bishop", val: 1 },
        { name: "Aplomado Falcon", val: 1 },
        { name: "Kentucky Warbler", val: 1 },
        { name: "Common Crane", val: 1 },
        { name: "Short-billed Gull", val: 1 },
        { name: "Violet-crowned Hummingbird", val: 1 },
        { name: "Hudsonian Godwit", val: 1 },
        { name: "Sulphur-bellied Flycatcher", val: 1 },
        { name: "Rose-throated Becard", val: 1 },
        { name: "Indian Peafowl", val: 1 },
        { name: "Black-backed Woodpecker", val: 1 },
        { name: "Glossy Ibis", val: 1 },
        { name: "California Gnatcatcher", val: 1 },
        { name: "Black-capped Gnatcatcher", val: 1 },
        { name: "Palm Warbler", val: 1 },
        { name: "Tropical Parula", val: 1 },
        { name: "Garganey", val: 1 },
        { name: "Spotted Dove", val: 1 },
        { name: "Morelet's Seedeater", val: 1 },
        { name: "Brown Booby", val: 1 },
        { name: "Red-footed Booby", val: 1 },
        { name: "Bendire's Thrasher", val: 1 },
        { name: "Grey Vireo", val: 1 },
        { name: "Golden-crowned Sparrow", val: 1 },
      ],
    };
  },
};
</script>

<style>
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230070b3' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}
.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230070b3' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
</style>
