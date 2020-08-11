<template>
  <div class="hidden">
    <p class="q-ma-sm">Align / Justify</p>
    <div class="q-mt-sm row justify-evenly">
      <q-btn color="grey-9" size="10px" text-color="white"
        label="left" icon="format_align_left" class="q-my-xs col-5" />
      <q-btn color="grey-9" size="10px" text-color="white"
        label="right" icon="format_align_right" class="q-my-xs col-5" />
      <q-btn color="grey-9" size="10px" text-color="white"
        label="center" icon="format_align_center" class="q-my-xs col-5" />
      <q-btn color="grey-9" size="10px" text-color="white"
        label="middle" icon="vertical_align_center" class="q-my-xs col-5" />
      <q-btn color="grey-9" size="10px" text-color="white"
        label="top" icon="vertical_align_top" class="q-my-xs col-5" />
      <q-btn color="grey-9" size="10px" text-color="white"
        label="bottom" icon="vertical_align_bottom" class="q-my-xs col-5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alignment',
};
</script>

<style lang="scss">
</style>
