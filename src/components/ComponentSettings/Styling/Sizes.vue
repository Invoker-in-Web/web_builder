<template>
  <div>
    <p class="q-my-sm q-mx-md">Maximize</p>
    <div class="row justify-center hidden">
      <q-btn-toggle
        v-model="maximize"
        color="grey-9"
        toggle-color="green"
        clearable
        size="sm"
        :options="[
          {value: 'fit', slot: 'fit'},
          {value: 'height', slot: 'height'},
          {value: 'width', slot: 'width'}
        ]"
      >
        <template v-slot:fit>
          <div class="row items-center no-wrap">
            <div class="text-center">Fit</div>
            <q-icon right name="zoom_out_map" />
          </div>
        </template>
        <template v-slot:height>
          <div class="row items-center no-wrap">
            <div class="text-center">Height</div>
            <q-icon right name="height" />
          </div>
        </template>
        <template v-slot:width>
          <div class="row items-center no-wrap">
            <div class="text-center">Width</div>
            <q-icon right name="height" class="rotate-90" />
          </div>
        </template>
      </q-btn-toggle>
    </div>
    <div class="q-mt-sm row justify-evenly">
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.minWidth"
        @input="setActiveStyles({
          type: 'css',
          propName: 'minWidth',
          value: $event
        })"
        label="min-width" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.minHeight"
        @input="setActiveStyles({
          type: 'css',
          propName: 'minHeight',
          value: $event
        })"
        label="min-height" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.width"
        @input="setActiveStyles({
          type: 'css',
          propName: 'width',
          value: $event
        })"
        label="width" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.height"
        @input="setActiveStyles({
          type: 'css',
          propName: 'height',
          value: $event
        })"
        label="height" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.maxWidth"
        @input="setActiveStyles({
          type: 'css',
          propName: 'maxWidth',
          value: $event
        })"
        label="max-width" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.maxHeight"
        @input="setActiveStyles({
          type: 'css',
          propName: 'maxHeight',
          value: $event
        })"
        label="max-height" type="text" size="10px" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Sizes',
  data() {
    return {
      maximize: null,
      minWidth: null,
      minHeight: null,
      width: null,
      height: null,
      maxWidth: null,
      maxHeight: null,
    };
  },
  methods: {
    ...mapActions({
      setActiveStyles: 'tree/setActiveStyles',
    }),
  },
  computed: {
    getActiveStyles() {
      const styles = this.$store.state.tree.activeElement.settings?.styling.css;
      return !styles ? {} : styles;
    },
  },
};
</script>

<style lang="scss">
</style>
