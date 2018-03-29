<template>
  <v-ons-page>
    <gmap-map
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      >
      <gmap-info-window
        :options="info.options"
        :position="center"
        :opened="info.open"
        @closeclick="info.open=false">
        <div v-html="info.text"></div>
      </gmap-info-window>
      <gmap-marker
        :position="center"
        :clickable="true"
        @click="toggleInfoWindow()">
      </gmap-marker>
    </gmap-map>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBoT9vrns02SpAXL7m1LuFQ_2g9U0JiBY8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    }
  });
  export default{
    data() {
      const center = {
        lat: 35.6818052,
        lng: 139.7719504
      };
      return {
        center: center,
        info: {
          options: {
            pixelOffset: {
              width: 0,
              height: -35
            },
          },
          open: false,
          text: "Cybozu, Nihonbashi tower 27F, <br />2-7-1 Nihonbashi, Chuo-ku, Tokyo"
        }
      };
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      toggleInfoWindow() {
        console.log(true)
        this.info.open = true;
      }
    }
  };
</script>
