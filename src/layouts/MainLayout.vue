<template>
  <q-layout view="lHr lpR lFr">

    <Drawer />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import Drawer from '../components/Drawer';

export default {
  name: 'MainLayout',

  components: {
    Drawer,
  },
};
</script>

<style lang="stylus">
  body {
    overflow: hidden;
  }
</style>
