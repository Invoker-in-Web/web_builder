<template>
  <div>
    <p class="q-my-sm q-mx-md">Grid Row</p>
    <div class="row justify-around">
      <q-btn-toggle
        :value="gridRow"
        @input="value => setGridProperty('gridRow', value)"
        color="grey-9"
        toggle-color="green"
        size="sm"
        :ripple="false"
        spread
        clearable
        :options="[
          {label: 'Row', value: 'row'},
          {label: 'Column', value: 'column'},
        ]"
      />
      <q-btn-toggle
        :value="gridRowReverse"
        @input="value => setGridProperty('gridRowReverse', value)"
        color="grey-9"
        toggle-color="green"
        size="sm"
        :ripple="false"
        spread
        clearable
        :options="[
          {label: 'Reverse', value: 'reverse'},
        ]"
      />
    </div>
    <p class="q-my-sm q-mx-md">Grid Column</p>
    <div class="row justify-evenly">
      <q-btn-toggle
        :value="gridColumn"
        @input="value => setGridProperty('gridColumn', value)"
        color="grey-9"
        toggle-color="green"
        size="sm"
        :ripple="false"
        no-wrap
        clearable
        :options="[
          {label: 'Col', value: 'col'},
          {label: 'Col-auto', value: 'col-auto'},
          {label: 'Col-N', value: 'col-N'},
        ]"
      >
      </q-btn-toggle>
      <input id="col-n"
        :value="gridColumnN"
        @input="e => setGridProperty('gridColumnN', +e.target.value)"
        type="number"
        maxlength="2"
        min="1" max="12"
        :disabled="gridColumn !== 'col-N'"
      />
    </div>
    <div class="row justify-around q-mt-sm">
      <q-select
        class="q-ma-xs col-11"
        options-dense
        filled dense
        :value="position"
        @input="value => setGridProperty('position', value)"
        :options="defaultPositions"
        label="position"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Grid',

  data() {
    return {
      gridRow: null,
      gridRowReverse: null,
      gridColumn: null,
      gridColumnN: 12,

      position: null,
      defaultPositions: [
        'relative-position', 'absolute', 'absolute-center',
        'fixed', 'fixed-center', 'fullscreen'],
    };
  },
  computed: {
    ...mapGetters({
      getClasses: 'tree/getActiveElementClasses',
    }),
    gridRowClasses: vm => [vm.gridRow, vm.gridRowReverse],
    gridColumnClass: vm => (vm.gridColumn === 'col-N' ? `col-${vm.gridColumnN}` : vm.gridColumn),
    classes: vm => [...vm.gridRowClasses, vm.gridColumnClass, vm.position],
  },
  watch: {
    getClasses() {
      this.updateValues();
    },
  },
  created() {
    this.updateValues();
  },
  methods: {
    setClasses(classes) {
      this.$emit('setClasses', { sectionName: 'gridClasses', classes });
    },
    setGridProperty(property, value) {
      this[property] = value;
      this.setClasses(this.classes);
    },
    updateValues() {
      const classes = this.getClasses;

      this.gridRow = classes.find?.(cn => ['row', 'column'].includes(cn));
      this.gridRowReverse = classes.find?.(cn => cn === 'reverse');
      this.position = classes.find?.(cn => this.defaultPositions.includes(cn));

      let match;
      const res = classes.find?.(cn => {
        match = cn?.match(/^col-?(auto|(?<num>\d+))?$/);
        return match;
      });

      this.gridColumn = match?.groups.num ? 'col-N' : res;
      this.gridColumnN = match?.groups.num ? match.groups.num : 12;
    },
  },
};
</script>

<style lang="scss">
  #col-n {
    width: 56px;
    border: none;
    border-radius: 5px;
    padding-left: 5px;
    outline: none;
    color: #fff;
    background-color: $grey-9;
  }
</style>
