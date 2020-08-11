<template>
  <div class="q-mb-lg hidden">
    <p class="q-my-sm q-mx-md">Typography and Classes</p>
    <q-select class="q-ma-xs col-11" options-dense
        filled dense v-model="model" :options="[]" label="typography class" />
  </div>
</template>

<script>
export default {
  name: 'Typography',
  data() {
    return {
      model: null,
    };
  },
};
</script>

<style lang="scss">
</style>
