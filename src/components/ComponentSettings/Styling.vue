<template>
  <div class="drawer-styling">
    <div v-if="checkActiveElement">
      <Sizes />
      <Grid @setClasses="setClasses" />
      <Spacing @setClasses="setClasses" />
      <Alignment />
      <Typography />
    </div>
    <div v-else class="absolute-center">
      <p class="text-h6 text-center">Select an active component</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Typography from './Styling/Typography';
import Sizes from './Styling/Sizes';
import Alignment from './Styling/Alignment';
import Grid from './Styling/Grid';
import Spacing from './Styling/Spacing';

export default {
  components: {
    Sizes, Alignment, Grid, Spacing, Typography,
  },

  data() {
    return {
      gridClasses: [],
      alignClasses: [],
      spacingClasses: [],
    };
  },
  computed: {
    classes: vm => [...vm.gridClasses, ...vm.alignClasses, ...vm.spacingClasses],
    checkActiveElement() {
      const activeEl = this.$store.getters['tree/getActiveElement'];
      return Object.keys(activeEl).length;
    },
  },
  methods: {
    ...mapActions({
      setActiveStyles: 'tree/setActiveStyles',
    }),
    setClasses({ sectionName, classes }) {
      this[sectionName] = classes;
      this.setActiveStyles({ type: 'classes', classes });
    },
  },
};
</script>

<style lang="scss">
  .drawer-body .button-checked {
    background-color: $green !important;
  }
  .drawer-styling .disabled {
    opacity: .1 !important;
  }
</style>
