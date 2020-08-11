<template>
  <div class="component-library list bg-dark q-mb-sm col-grow"
  >
    <q-list v-for="section in sections"
            :key="section.id"
            class="row items-start q-mb-md"
    >
      <q-item-label class="text-white col-12 q-ma-sm">
        {{section.name}}
      </q-item-label>

      <q-separator dark spaced="sm" color="grey-9" size="1px" class="q-mb-sm" />

      <q-item-section
        v-for="component in section.children"
        :key="component.id" class="text-center col-3 q-py-xs"
        @dragstart="onDragStart($event, component, section.name)"
        draggable="true"
      >
        <q-item-label class="text-blue">
          <div
            class="component-logo relative-position"
            :style="{ borderColor: $store.state.colorTypes[section.name] }"
          >
              <q-icon
                :name="component.icon"
                :color="$store.state.colorTypes[section.name]"
                class="absolute-center"
                size="1.8em"
              />
          </div>
        </q-item-label>
        <q-item-label caption>
          {{component.label}}
        </q-item-label>
      </q-item-section>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ['isOpened'],
  data() {
    return {
      sections: [
        {
          name: 'Basic',
          children: [
            {
              label: 'Container',
              componentName: 'QPageContainer',
              icon: 'crop_5_4',
            },
            {
              label: 'Image',
              componentName: 'QImg',
              icon: 'insert_photo',
            },
            {
              label: 'Icon',
              componentName: 'QIcon',
              icon: 'info',
            },
            {
              label: 'Badge',
              componentName: 'QBadge',
              icon: 'label',
            },
            {
              label: 'Tooltip',
              componentName: 'QTooltip',
              icon: 'message',
            },
          ],
        },
        {
          name: 'Form',
          children: [
            {
              label: 'Button',
              componentName: 'QBtn',
              icon: 'crop_square',
            },
            {
              label: 'Text Input',
              componentName: 'QInput',
              icon: 'text_fields',
            },
            {
              label: 'Date Input',
              componentName: 'QTime',
              icon: 'calendar_today',
            },
            {
              label: 'Toggle',
              componentName: 'QBtnToggle',
              icon: 'toggle_on',
            },
            {
              label: 'Checkbox',
              componentName: 'QCheckbox',
              icon: 'check_circle',
            },
            {
              label: 'Dropdown Button',
              componentName: 'QBtnDropdown',
              icon: 'arrow_drop_down_circle',
            },
          ],
        },
      ],
    };
  },

  methods: {
    onDragStart(e, component, sectionName) {
      component.sectionName = sectionName;
      e.dataTransfer.setData('data', JSON.stringify(component));
      e.dataTransfer.dropEffect = 'move';
    },
  },

};

</script>

<style lang="scss">
  .component-library .component-logo {
    margin: 0 auto;
  }
  .component-library .q-item__section:hover {
    background-color: rgba(128, 128, 128, 0.1);
    cursor: pointer;
  }
  .component-library .q-item__section--main {
    margin-left: 0 !important;
  }
</style>
