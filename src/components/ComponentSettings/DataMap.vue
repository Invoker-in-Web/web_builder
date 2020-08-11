<template>
  <q-dialog full-height full-width maximized ref="dialog" @hide="hide">
    <q-card class="q-dialog-plugin column no-wrap">
      <div class="row justify-between items-center datamap-header">
        <div class="column q-mx-md q-my-sm">
          <span style="font-size: 24px">Data Map</span>
          <span class="text-blue">Knob</span>
        </div>

        <div class="row q-ma-sm datamap-header--main">
          <q-input
            class="q-ma-sm"
            style="width: 60px;"
            input-style="text-align: center"
            placeholder="prop"
            standout dense readonly
          >
          </q-input>
          <q-input class="col-grow" standout dense readonly />
        </div>

        <q-icon
          name="close"
          size="1.8em"
          class="q-mx-md q-my-sm cursor-pointer"
          @click="hide"
        />
      </div>

      <div class="datamap-body justify-left row no-wrap q-px-md q-py-sm">
        <div class="section quasar-sections main-section q-pa-sm">
          <div class="column wrap section-properties">
            <div class="q-ml-sm q-mb-sm text-grey">
              Properties
            </div>
            <div class="row q-pb-md">
              <q-btn-toggle
                class="toggle-buttons wrap"
                toggle-color="deep-purple-6"
                v-for="prop in quasarProps"
                :key="prop.label"
                :value="chain.attribute"
                @input="pressAttributeButton($event)"
                :clearable="true"
                :push="true"
                :options="[{value: prop.value, slot: 'button'}]"
              >
                <template v-slot:button>
                  <div class="button-title text-center">{{prop.value}}</div>
                  <q-icon name="check_circle" size="1.4em"
                    v-if="isStoreValue(prop.value)" />
                </template>
              </q-btn-toggle>
            </div>
          </div>

          <div class="column wrap q-mt-md section-directives">
            <div class="q-ml-sm q-mb-sm text-grey">
              Directives
            </div>

            <div class="row q-pb-md">
              <q-btn-toggle
                class="toggle-buttons wrap"
                toggle-color="deep-purple-6"
                v-for="directive in vueDirectives"
                :key="directive.label"
                :value="chain.attribute"
                @input="pressAttributeButton($event)"
                :clearable="true"
                :push="true"
                :options="[{value: directive.value, slot: 'button'}]"
              >
                <template v-slot:button>
                  <div class="button-title text-center">{{directive.value}}</div>
                  <q-icon name="check_circle" size="1.4em"
                    v-if="isStoreValue(directive.value)" />
                </template>
              </q-btn-toggle>
            </div>
            <div class="row q-pb-md">
              <q-btn-toggle
                class="toggle-buttons wrap"
                toggle-color="deep-purple-6"
                v-for="directive in customDirectives"
                :key="directive.label"
                :value="chain.attribute"
                @input="pressAttributeButton($event)"
                :clearable="true"
                :push="true"
                :options="[{value: directive.value, slot: 'button'}]"
              >
                <template v-slot:button>
                  <div class="button-title text-center">{{directive.value}}</div>
                  <q-icon name="check_circle" size="1.4em"
                    v-if="isStoreValue(directive.value)" />
                </template>
              </q-btn-toggle>
            </div>
          </div>

          <div class="column wrap q-mt-md subsection section-events">
            <div class="q-ml-sm q-mb-sm text-grey">
              Events
            </div>
            <div class="row q-pb-md">
              <q-btn-toggle
                class="toggle-buttons wrap"
                toggle-color="deep-purple-6"
                v-for="event in allEvents"
                :key="event.label"
                :value="chain.attribute"
                @input="pressAttributeButton($event)"
                :clearable="true"
                :push="true"
                :options="[{value: event.value, slot: 'button'}]"
              >
                <template v-slot:button>
                  <div class="button-title text-center">{{event.label}}</div>
                  <q-icon name="check_circle" size="1.4em"
                    v-if="isStoreValue(event.value)" />
                </template>
              </q-btn-toggle>
            </div>
          </div>
        </div>

        <template v-if="[...events, ...keyEvents].includes(chain.attribute)">
          <div class="icon-between-sections relative-position">
            <q-icon
              class="absolute-center"
              size="50px"
              name="keyboard_arrow_right"
            />
          </div>

          <div class="section quasar-sections modifiers-section q-pa-sm q-pr-md">
            <div class="q-ml-sm q-mb-sm text-grey">
              Event Modifiers
            </div>

            <q-btn-toggle
              class="toggle-buttons wrap"
              toggle-color="deep-purple-6"
              v-for="modifier in allModifiers"
              :key="modifier.label"
              :value="chain.modifiers[modifier.label]"
              @input="changeModifiers(modifier.label)"
              :clearable="true"
              :push="true"
              :options="[modifier]"
            />
          </div>
        </template>

        <template v-if="chain.attribute">
          <div class="icon-between-sections relative-position q-mx-sm">
            <q-icon
              class="absolute-center"
              size="50px"
              name="drag_handle"
            />
          </div>

          <div class="section applets q-pa-sm">
            <div class="q-ml-sm q-mb-sm text-grey">
              Source: Custom Code
            </div>
            <q-btn-toggle
              class="toggle-buttons open-editor wrap q-mb-md"
              toggle-color="deep-purple-6"
              v-model="chain.useCustomCode"
              :clearable="true"
              :push="true"
              :options="[{value: true, slot: 'button'}]"
            >
              <template v-slot:button>
                <div class="text-center">Open editor</div>
                <q-icon name="code" size="1.4em" />
              </template>
            </q-btn-toggle>

            <div class="q-ml-sm q-mb-sm text-grey">
              Source: Applets
            </div>
            <div v-for="applet in appletNames" :key="applet">
              <q-item
                @click="setPropertyToChain('applet', applet)"
                clickable
                class="items-center"
                :style="{
                  background: chain.applet === applet ? '#404040' : 'transparent'
                }"
              >
                <q-item-label>{{applet}}</q-item-label>
              </q-item>
            </div>
          </div>
        </template>

        <div v-else class="col-grow relative-position">
          <p class="text-h5 text-center absolute-center">Select an attribute on the left <br/>
          to view possible options</p>
        </div>

        <template v-if="chain.applet">
          <div class="icon-between-sections relative-position q-mx-sm">
            <q-icon
              class="absolute-center"
              size="50px"
              name="keyboard_arrow_right"
            />
          </div>

          <div class="section applets q-pa-sm">
            <div class="q-ml-sm q-mb-sm text-grey">
              Controls
            </div>
            <div v-for="control in controlNames" :key="control">
              <q-item
                @click="setPropertyToChain('control', control)"
                clickable
                class="items-center"
                :style="{
                  background: chain.control === control ? '#404040' : 'transparent'
                }"
              >
                <q-item-label>{{control}}</q-item-label>
              </q-item>
            </div>
          </div>
        </template>

        <template v-if="chain.control">
          <div class="icon-between-sections relative-position q-mx-sm">
            <q-icon
              class="absolute-center"
              size="50px"
              name="keyboard_arrow_right"
            />
          </div>

          <div class="section applets q-pa-sm">
            <div class="q-ml-sm q-mb-sm text-grey">
              Control properties
            </div>
            <div v-for="[prop, value] in controlProps" :key="prop">
              <q-item
                @click="setPropertyToChain('controlProp', prop, value)"
                clickable
                class="items-center"
                :style="{
                  background: chain.controlProp === prop ? '#404040' : 'transparent'
                }"
              >
                <q-item-label>
                  <div>{{prop}}</div>
                  <div class="text-grey">{{value}}</div>
                </q-item-label>
              </q-item>
            </div>
          </div>
        </template>
      </div>

    </q-card>
  </q-dialog>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import props from './Properties';

export default {
  name: 'DataMap',
  data() {
    return {
      chain: {},

      events: ['blur', 'click', 'mouseover',
        'mouseout', 'focusin', 'focusout'],
      keyEvents: ['input', 'keyup'],
      modifiers: ['stop', 'prevent', 'capture', 'self',
        'once', 'passive'],
      keyModifiers: ['enter', 'esc', 'space', 'up', 'down',
        'left', 'right', 'ctrl', 'alt', 'shift'],
    };
  },

  computed: {
    ...mapState({
      activeElement: state => state.tree.activeElement,
      siebelData: state => state.siebelData,
      componentData: state => state.tree.activeElement.settings.data,
    }),

    quasarProps() {
      const quasarProps = props.methods
        .generateQuasarProps(Vue.component(this.activeElement.componentName));
      return quasarProps.map(prop => ({
        label: prop.propName,
        value: prop.propName,
      }));
    },

    vueDirectives() {
      const vueDirectives = ['v-text', 'v-if', 'v-else', 'v-else-if', 'v-show'];
      return vueDirectives.map(vueDirective => ({
        label: vueDirective,
        value: vueDirective,
      }));
    },

    customDirectives() {
      const customDirectives = ['v-ripple', 'v-close-popup'];
      return customDirectives.map(customDirective => ({
        label: customDirective,
        value: customDirective,
      }));
    },

    allEvents: vm => [...vm.events, ...vm.keyEvents].map(event => ({
      label: `@${event}`,
      value: event,
    })),

    allModifiers() {
      const isKeyEvent = this.keyEvents.includes(this.chain.attribute);
      const modifiers = isKeyEvent
        ? [...this.modifiers, ...this.keyModifiers]
        : this.modifiers;
      return modifiers.map(m => ({ label: m, value: m }));
    },

    appletNames() {
      return Object.entries(this.siebelData).map(applet => {
        const [appletName] = applet;
        return appletName;
      });
    },

    controlNames() {
      if (!this.chain.applet) return [];

      const appletObj = this.siebelData[this.chain.applet];
      return Object.keys(appletObj);
    },

    controlProps() {
      if (!this.chain.control) return [];

      const controlObj = this.siebelData[this.chain.applet][this.chain.control];
      return controlObj ? Object.entries(controlObj) : [];
    },
  },

  watch: {
    'chain.attribute': function attribute(newVal) {
      if (this.isStoreValue(newVal)) {
        this.chain = { ...this.componentData[newVal] };
        return;
      }

      Vue.set(this.chain, 'modifiers', {});
      Vue.set(this.chain, 'applet', null);
    },
    'chain.applet': function applet() {
      if (!this.isStoreValue(this.chain.attribute)) {
        Vue.set(this.chain, 'control', null);
      }
    },
    'chain.control': function control() {
      if (!this.isStoreValue(this.chain.attribute)) {
        Vue.set(this.chain, 'controlProp', null);
      }
    },
  },

  methods: {
    show() { this.$refs.dialog.show(); },
    hide() { this.$refs.dialog.hide(); },

    setPropertyToChain(type, prop, value) {
      Vue.set(this.chain, type, prop);
      if (value !== undefined) Vue.set(this.chain, 'value', value);
    },

    pressAttributeButton(btnValue) {
      Vue.set(this.chain, 'attribute', btnValue);
    },

    isStoreValue(propValue) {
      return this.componentData[propValue]?.attribute;
    },

    changeModifiers(label) {
      if (this.chain.modifiers[label]) Vue.set(this.chain.modifiers, label, null);
      else Vue.set(this.chain.modifiers, label, label);
    },
  },
};
</script>

<style lang="scss">
  /* Header styles */
  .datamap-header {
    border-bottom: 3px solid #141414;
  }
  .datamap-header--main {
    flex-grow: .8;
  }
  .q-field--standout.q-field--readonly .q-field__control:before {
    border: none;
  }
  .q-dialog__inner .q-dialog-plugin {
    overflow: hidden;
  }

  /* Body common styles */
  .q-dialog-plugin .datamap-body {
    width: 100vw;
    overflow-y: hidden;
  }
  .q-dialog-plugin .datamap-body::-webkit-scrollbar,
  .q-dialog-plugin .section::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  .q-dialog-plugin .datamap-body::-webkit-scrollbar-thumb,
  .q-dialog-plugin .section::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 4px;
  }

  /* Common sections styles */
  .q-dialog-plugin .section {
    height: 100%;
    background-color: #222222;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 0 0;
  }

  /* Quasar (main + modifiers) section styles */
  .q-dialog-plugin .quasar-sections button {
    max-height: 30px;
  }
  .q-dialog-plugin .quasar-sections .q-btn__wrapper {
    padding: 4px 6px !important;
  }
  .q-dialog-plugin .quasar-sections .q-btn__content {
    position: relative;
  }
  .q-dialog-plugin .quasar-sections .q-btn__content span {
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }
  .q-dialog-plugin .quasar-sections .toggle-buttons {
    flex-wrap: wrap;
    flex-direction: row;
    box-shadow: none;
  }
  .q-dialog-plugin .quasar-sections .toggle-buttons {
    width: 30%;
    margin: 4px;
    border-radius: 4px !important;
  }
  .q-dialog-plugin .quasar-sections .toggle-buttons button {
    width: 100%;
    font-size: .85em;
    text-transform: lowercase;
  }

  /* Main section styles */
  .q-dialog-plugin .main-section {
    flex-basis: 400px;
  }
  .q-dialog-plugin .button-title {
    flex: .6 .6 60%;
    text-overflow: ellipsis;
    overflow: hidden
  }

  /* Modifiers section styles */
  .q-dialog-plugin .modifiers-section {
    flex-basis: 140px;
  }
  .q-dialog-plugin .modifiers-section .toggle-buttons,
  .q-dialog-plugin .modifiers-section .toggle-buttons button {
    width: 100%;
  }

  /* Applet section styles */
  .q-dialog-plugin .applets {
    flex-basis: 180px;
    background-color: #222222;
  }
  .q-dialog-plugin .open-editor,
  .q-dialog-plugin .open-editor button {
    width: 100%;
  }
  .q-dialog-plugin .open-editor button {
    font-size: 12px;
  }
  .q-dialog-plugin .open-editor .q-btn__content {
    justify-content: space-around;
  }

  /* Miscellaneous and utility styles */
  .q-dialog-plugin .icon-between-sections {
    flex: 0 0 50px;
  }
  .q-dialog-plugin .section-text {
    font-size: 1.2em;
  }
  .q-dialog-plugin .section-text_subtitle {
    font-size: 1em;
  }
</style>
