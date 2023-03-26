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
  </div>
</template>
