<template>
  <div class="q-mt-md column">
    <div class="row justify-around">
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.margin"
        @input="setActiveStyles({
          type: 'css',
          propName: 'margin',
          value: $event
        })"
        label="margin" type="text" size="10px" />
      <q-input class="q-my-xs col-5" filled dense
        :value="getActiveStyles.padding"
        @input="setActiveStyles({
          type: 'css',
          propName: 'padding',
          value: $event
        })"
        label="padding" type="text" size="10px" />
    </div>
    <div class="hidden row justify-around">
      <p class="q-mb-xs">Margin-all</p>
      <p class="q-mb-xs">Borders</p>
      <p class="q-mb-xs">Padding-all</p>
    </div>
    <div class="hidden row justify-between no-wrap">
      <div class="column">
        <q-btn color="grey-9" size="10px" text-color="white"
          label="xs" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="sm" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="md" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="lg" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="xl" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="none" class="q-ma-xs" />
      </div>
      <div class="column justify-start">
        <div class="row justify-center">
          <q-btn color="grey-9" size="10px" text-color="white"
            label="all" class="q-ma-xs col-3" />
          <q-btn color="grey-9" size="10px" text-color="white"
            label="color" class="q-ma-xs col-3" />
          <q-btn color="grey-9" size="10px" text-color="white"
            label="round" class="q-ma-xs col-4" />
        </div>
        <div class="custom-grid column justify-between items-center">
          <input type="text" class="margin-top" value="0">
          <div class="middle-row row justify-between">
            <input type="text" class="margin-left" value="0">
            <div class="border-block column justify-center items-center">
              <button class="border-top" />
              <div class="middle-row-inner row justify-center">
                <button class="border-left" />
                <div class="padding-block column justify-center items-center">

                  <input type="text" class="padding-top" value="0">
                  <div class="inside-row row justify-between">
                    <input type="text" class="padding-left" value="0">
                    <div />
                    <input type="text" class="padding-right" value="0">
                  </div>
                  <input type="text" class="padding-bottom" value="0">

                </div>
                <button class="border-right" />
              </div>
              <button class="border-bottom" />
            </div>
            <input type="text" class="margin-right" value="0">
          </div>
          <input type="text" class="margin-bottom" value="0">
        </div>
      </div>
      <div class="column">
        <q-btn color="grey-9" size="10px" text-color="white"
          label="xs" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="sm" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="md" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="lg" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="xl" class="q-ma-xs" />
        <q-btn color="grey-9" size="10px" text-color="white"
          label="none" class="q-ma-xs" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Spacing',
  data() {
    return {
      margin: null,
      padding: null,
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
.custom-grid {
  margin-top: 3px;
}
.custom-grid input,
.custom-grid button {
  background-color: $grey-9;
  border: none;
  outline: none;
}
.custom-grid input {
  color: #fff;
  text-align: center;
}
.custom-grid button:hover {
  background-color: $grey-8;
  cursor: pointer;
}
.custom-grid > input {
  width: 150px;
  height: 18px;
}
.custom-grid .middle-row > input {
  width: 18px;
  height: 128px;
}
.custom-grid .middle-row .border-block {
  width: 114px;
}
.custom-grid .border-block > button {
  width: 100px;
  height: 10px;
  background-color: $grey-9;
  border: none;
  outline: none;
}
.custom-grid .middle-row-inner > button {
  width: 10px;
  height: 95px;
}
.custom-grid .padding-block {
  width: 76px;
}
.custom-grid .padding-block > input {
  width: 60px;
  height: 18px;
}
.custom-grid .inside-row {
  height: 45px;
}
.custom-grid .inside-row > input {
  width: 18px;
  height: 100%;
}
.custom-grid .inside-row > div {
  width: 24px;
}
</style>
