<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

window.uuidv4 = uuidv4;

export default {
  name: 'App',
};
</script>
