<template>
  <q-page class="bg-black row no-wrap">
    <!-- <ShortcutPanel /> -->
    <aside class="shortcuts col-auto text-grey-6 q-mr-sm column justify-between">
      <div class="shortcuts-top">
        <div class="button-container bg-dark text-yellow">
          <q-icon name="emoji_emotions" size="1.3em" />
        </div>
        <div class="button-container bg-dark column">
          <q-icon name="add" size="2em"
            @click="isComponentLibraryOpened = !isComponentLibraryOpened"
            :class="{'text-white' : isComponentLibraryOpened}"
          />
          <q-icon name="account_tree" size="1.5em"
            @click="isTreeOpened = !isTreeOpened"
            :class="{'text-white' : isTreeOpened}"
          />
          <q-icon name="code" size="2em" />
          <q-icon name="view_sidebar" size="1.5em"
            @click="toggleDrawer"
            :class="{'text-white' : isRightDrawerOpened}"
          />
        </div>
        <div class="button-container bg-dark column">
          <q-icon name="palette" size="1.8em" />
          <q-icon name="storage" size="1.5em" />
          <q-icon name="subscript" size="1.8em" />
        </div>
      </div>
      <div class="shortcuts-bottom">
        <div class="button-container bg-dark column">
          <q-icon name="cast" size="1.5em" />
          <q-icon name="fullscreen" size="1.8em"
            @click="toggleFullscreen"
            :class="{'text-white' : isFullscreen}"
          />
          <q-icon name="visibility" size="1.5em" />
        </div>
      </div>
    </aside>
    <section class="components-panel q-mr-sm column"
      :class="{'slide-left' : !isComponentLibraryOpened}"
    >
      <div class="components-panel-title bg-dark q-pl-sm">
        <p class="text-grey-6">component library <span class="text-white">default</span></p>
      </div>
      <ComponentLibrary />
    </section>
    <section class="main-panel q-mr-sm col-grow column">
      <div class="main-panel-header bg-dark q-pl-sm">
        <p class="text-white">Header</p>
      </div>
      <div class="main-panel-body row col-grow no-wrap">
        <Tree :isOpened="isTreeOpened" />

          <Renderer class="main-panel-renderer scroll col-grow relative-position" />
      </div>
      <div class="main-panel-footer bg-dark q-mb-sm q-pl-sm">
        <p class="text-white">Footer</p>
      </div>
    </section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Tree from '../components/Tree';
import ComponentLibrary from '../components/ComponentLibrary';
import Renderer from '../components/Renderer';

export default {
  name: 'PageIndex',
  components: {
    Tree,
    ComponentLibrary,
    Renderer,
  },
  data() {
    return {
      isComponentLibraryOpened: true,
      isTreeOpened: true,
      isFullscreen: false,
    };
  },
  methods: {
    ...mapActions(['toggleDrawer']),
    toggleFullscreen() {
      if (this.isFullscreen) {
        document.exitFullscreen();
      } else {
        document.body.requestFullscreen();
      }
      this.isFullscreen = !this.isFullscreen;
    },
  },
  computed: {
    ...mapState(['isRightDrawerOpened']),
  },
};
</script>

<style lang="scss">
  .button-container {
    margin: 10px 0;
  }
  .button-container .q-icon:hover {
    cursor: pointer;
    color: #fff;
  }
  .shortcuts-top .button-container:first-of-type .q-icon {
    height: 25px;
  }

  .button-container .q-icon {
    width: 35px;
    height: 35px;
  }
  .components-panel {
    width: 250px;
    overflow: hidden;
    transition: all .2s;
    flex-shrink: 0;
  }
  .main-panel {
    flex: 1 1;
  }
  .components-panel-title,
  .main-panel-header {
    margin: 10px 0;
    width: 100%;
    height: 25px;
  }
  .main-panel-body {
    flex: 1 1 auto;
    width: 100%;
  }
  .main-panel-footer {
    margin-top: 10px;
    width: 100%;
    height: 25px;
  }
  .component-logo {
    width: 45px;
    height: 45px;
    border: 1px solid $grey;
    border-radius: 50%;
  }
  .slide-left {
    width: 0;
    margin: 0 !important;
    padding: 0 !important;
  }
  .slide-left::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .main-panel-tree {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .main-panel-renderer {
    width: 200px;
    flex-shrink: 1;
    max-width: 200px;
    max-height: calc(100vh - 88px);
  }
  .main-panel-renderer::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  .main-panel-renderer::-webkit-scrollbar-thumb {
    background: $grey-9;
    border-radius: 4px;
  }
</style>
