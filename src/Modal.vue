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
    <b-modal id="modal-bilan" scrollable title="Top 10" size="xl" hide-footer centered>
      <p>
        Au debut du trip, je vous expliquais que notre trajet cherchait à maximizer le nombre d'espèces vues pour notre
        liste US. Nous avons modifié notre retour en cours de route pour aussi augmenter notre life liste Canada. C'est
        un des trips plus plus successful parce que le timing etait parfait, les données disponbile sur ebird permetter
        une tres bonne preparation et connaissance des especes.
      </p>

      <h4>Life list stats</h4>
      Avec 254 especes ajoutés (total of 673) notre liste est tres elevée! A la date de fin de notre voyage, on finis
      5ieme pour la
      <a href="https://ebird.org/top100?region=USA+Lower+48&locInfo.regionCode=lower48&year=2023&rankedBy=spp"
        >year list USA lower 48</a
      >
      et
      <a href="https://ebird.org/top100?region=ABA+Continental&locInfo.regionCode=abac&year=2023&rankedBy=spp"
        >ABA continental</a
      >
      (a la date de la fin du trip), mais seulement 714 sur la
      <a href="https://ebird.org/top100?region=USA+Lower+48&locInfo.regionCode=lower48&year=AAAA&rankedBy=spp"
        >life list USA lower 48</a
      >. Pour augmenter la vrai list USA, il nous faudra aller voyager en Alaska et Hawai. Une autre fois! Nous avons
      birder un total de 570 heurs (notre moyenne annuel sur les 6 dernières années). Essayant de plus valoriser les
      données collecté, nos checklists eBird sont plus courte (16min contre une moyenne a 30 minutes) et nous faisont
      plus de checklist stationaire plutot que traveling.

      <h4>Top 10 atmosphere:</h4>
      <ol>
        <li>grassland</li>
        <li>seawatch nord ouest</li>
        <li>hummingbird</li>
        <li>crane</li>
        <li>bear divide</li>
        <li>mountain of cascadia</li>
        <li>grouse of colorado</li>
        <li>golden</li>
        <li>cheeck warbler</li>
        <li>big bend</li>
        <li>portal</li>
        <li>bog (calgari + minisota)</li>
      </ol>
      <h4>Top 10 medias</h4>
      Pendant le trip, on a upload
      <a
        href="https://media.ebird.org/catalog?searchField=user&userId=USER497615&sort=rating_rank_desc&unconfirmed=incl&regionCode=US&beginMonth=4&endMonth=12&beginYear=2023&endYear=2023"
        target="_blank"
      >
        2'159 photos, 600 audios et 33 videos
      </a>
      sur la library macaulay, disponible pour la recherche. C'est difficile d'en choisir les meilleur mais voici notre
      top 10 personel:

      <b-button v-b-toggle.collapse-top10 variant="secondary">Voir le top10 photo</b-button>
      <b-collapse id="collapse-top10" class="mt-2">
        <b-card>
          <b-row>
            <b-col v-for="(t, i) in top10" :key="t.code">
              <h4>Top {{ i + 1 }}</h4>
              <iframe
                :src="'https://macaulaylibrary.org/asset/' + t + '/embed'"
                height="515"
                width="640"
                frameborder="0"
                allowfullscreen
              />
            </b-col>
          </b-row>
        </b-card>
      </b-collapse>

      <h4>Media</h4>
      Nous avons aussi essayer d'avoir un maximum d'espece avec un media (photo ou/et audio). Avec ... audios, ...
      photos et ... videos, nous avons ..% des especes avec au moins un des trois medias.

      <h4>Les ratés</h4>
      Vous me connaissez, je prefere faire la liste des especes qui me reste a voir/que j'ai raté, plutot que

      <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p>
            14 espece que je pensais possible (mais toute difficile) avant le trips que on n'a pas vu. Et ... que je
            pensais pas possible qu'on a vu!
          </p>

          <ol>
            <li>Ruddy Ground Dove : not seen this year at its usual spot in AZ.</li>
            <li>Buff-collared Nightjar access road not easy</li>
            <li>White-eared Hummingbird arrived a week or two after we left AZ</li>
            <li>
              Berylline Hummingbird arrived a week or two after we left AZ. only arrive later, still very rare and not
              present every year
            </li>
            <li>
              Black Turnstone hiverant avec quelques individus qui linger into the summer. tried a several spot but
              missed by not much...
            </li>
            <li>
              Cassin's Auklet : looked for in seawatch. We thought we saw one, but it was probably a marbled molting
            </li>
            <li>
              Yellow-footed Gull isiteur estivant au sud de la californie mais qui se fait de plus en plus rare ces
              dernière année. Nous l'avons laisser tombé au profit de NP. N'a pa
            </li>
            <li>
              8 et 9 Black Storm-Petrel and Black-vented Shearwater: possible en sea-watch ou pelagic sur la cote ouest
              mais pas vu
            </li>
            <li>
              Tufted Flycatcher: observsé presque chaque année en AZ (mais rare et localize), mais pas cette année
            </li>
            <li>
              Black-throated Magpie-Jay: EX, cherché 1-2 hr dans le sud de CA, mais comme c'est un EX on a laisser
              tombée
            </li>
            <li>Brown Jay private property ou il faut payer un guide privé.</li>
            <li>Red-vented Bulbul: austin</li>
            <li>Rufous-backed Robin</li>
            <li>grey tit</li>
          </ol>
        </b-card>
      </b-collapse>
      <p>
        Ce qui nous reste en plus pour un autre trip: - hivernant de la cote ouest: Surfbird, Black Turnstone, Pacific
        Golden Plover, Rock Sandpiper, yellow-billed diver - mais aussi pas mal de seabird: Ancien, parroquet, Cassin's
        auklet, sabine's gull, Horned puffin, laysin albatros, storm petrel. Northern fulmar black-vented shearwater -
        Atlantic puffin nichant sur une ile main au en seawatch sur la cote pendant l'hivers - vagrant du sud: rareté de
        floride, texas ou arizona. beaucoup d'espece possible mais difficule - minisotta en hiver: hawk owl et great
        grey owl peu de nicheur, plus facile en hiver. arctic redpoll - Long-eared owl: difficile a trouver
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top10: [
        "585874271",
        "581195481",
        "555615561",
        "585874271",
        "581195481",
        "555615561",
        "585874271",
        "581195481",
        "555615561",
        "585874271",
      ],
    };
  },
};
</script>
