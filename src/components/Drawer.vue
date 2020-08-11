<template>
  <q-drawer show-if-above v-model="isRightDrawerOpened" side="right" bordered>

    <div class="drawer-header">
      <div class="drawer-header__name">
        <p class="text-grey-5 q-mx-md q-mt-md q-mb-none">{{ getComponentTitle }}</p>
      </div>

      <div class="drawer-header__nav row justify-evenly">
        <q-icon name="list" size="1.8em" class="q-ma-sm"
          :class="{ active : activeTabs.properties }"
          @click="setActiveTab('properties')"
        />
        <q-icon name="brush" size="1.8em" class="q-ma-sm"
          :class="{ active : activeTabs.styling }"
          @click="setActiveTab('styling')"
        />
        <q-icon name="layers" size="1.8em" class="q-ma-sm"
          @click="showDialog"
        />
      </div>
    </div>

    <div class="drawer-body relative-position">
      <keep-alive>
        <Properties v-if="activeTabs.properties" />
      </keep-alive>
      <keep-alive>
        <Styling v-if="activeTabs.styling" />
      </keep-alive>
    </div>
  </q-drawer>
</template>

<script>
import Properties from './ComponentSettings/Properties';
import Styling from './ComponentSettings/Styling';
import DataMap from './ComponentSettings/DataMap';

export default {
  components: {
    Properties,
    Styling,
  },

  data() {
    return {
      activeTabName: 'Properties',
      activeTabs: {
        properties: true,
        styling: false,
      },
    };
  },

  methods: {
    setActiveTab(tabName) {
      Object.keys(this.activeTabs).forEach(key => {
        this.activeTabs[key] = false;
      });
      this.activeTabs[tabName] = true;
    },

    showDialog() {
      this.$q.dialog({
        component: DataMap,
        parent: this,
      });
    },
  },

  computed: {
    isRightDrawerOpened: {
      get() {
        return this.$store.state.isRightDrawerOpened;
      },
      set(value) {
        this.$store.commit('toggleDrawer', value);
      },
    },
    getComponentTitle() {
      return this.$store.state.tree.activeElement.label;
    },
  },
};
</script>

<style lang="scss">
  .q-drawer__content {
    display: flex;
    flex-direction: column;
  }
  .drawer-header {
    border-bottom: 2px solid #000;
    flex-grow: 0;
  }
  .drawer-header__name {
    font-size: 1.1rem;
  }
  .drawer-header__nav i {
    color: $grey;
  }
  .drawer-header__nav i:hover {
    color: #fff;
    cursor: pointer;
  }
  .drawer-header__nav i.active {
    color: #fff;
  }
  .drawer-body {
    flex-grow: 1;
    overflow-y: auto;
  }
  .drawer-body::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  .drawer-body::-webkit-scrollbar-thumb {
    background: $grey-9;
    border-radius: 4px;
  }
</style>
