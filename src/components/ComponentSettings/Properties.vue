<template>
    <div>

    <q-input class="q-ma-md"
      filled dense type="search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-item-section v-for="prop in generatedProps"
      :key="prop.propName + prop.type" class="q-ma-sm">

      <q-item-label v-if="prop.type === 'text'">
        <q-item-section>
          <q-input
            dense
            outlined
            class="q-ma-sm"
            :label="prop.propName"
            :value="getPropValueByName(prop.propName)"
            @input="setPropValueByName({
              settingType: 'props',
              propName: prop.propName,
              value: $event
            })"
          >
            <template v-slot:append
              v-if="isRequiredPropNotFilled(prop)">
              <q-icon name="warning" color="orange-5" size=".7em" />
            </template>
          </q-input>
        </q-item-section>
      </q-item-label>

      <q-item-label v-else-if="prop.type === 'checkbox'"
        class="row items-center justify-between">
        <q-item-label class="q-ma-sm"> {{prop.propName}} </q-item-label>
        <q-toggle
          :value="getPropValueByName(prop.propName)"
          @input="setPropValueByName({
            settingType: 'props',
            propName: prop.propName,
            value: $event
          })"
        />
      </q-item-label>

      <q-item-label v-else-if="prop.type === 'colorpicker'">
          <q-input class="q-ma-sm q-pb-none"
            filled
            dense
            :label="prop.propName"
            :value="getPropValueByName(prop.propName)"
            @input="setPropValueByName({
              settingType: 'props',
              propName: prop.propName,
              value: $event
            })"
          >
        </q-input>
      </q-item-label>

      <q-item-label v-else class="q-ma-sm">
        <q-select
          filled
          dense
          :value="getPropValueByName(prop.propName)"
          @input="setPropValueByName({
            settingType: 'props',
            propName: prop.propName,
            value: $event
          })"
          use-input
          input-debounce="0"
          :label="prop.propName"
          :options="prop.options"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-item-label>

    </q-item-section>
    </div>
</template>

<script>
import vue from 'vue';
import { mapActions, mapState } from 'vuex';
import quasarConfig from '../../../quasar.conf';

export default {
  data() {
    return {
      customization: {
        QBtn: {
          order: ['label', 'size', 'type', 'padding',
            'align', 'color', 'textColor', 'outline', 'ripple'],
          dropdownList: ['size', 'type', 'padding', 'align'],
          colorpickerList: ['color', 'textColor'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['left', 'right', 'center', 'around', 'between', 'evenly'];

              case 'size':
                return ['xs', 'sm', 'md', 'lg', 'xl'];
              case 'padding':
                return ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
              case 'type':
                return ['a', 'submit', 'button', 'reset'];
            }
          }),
        },
        QTooltip: {
          order: ['target', 'contentClass', 'contentStyle', 'delay', 'hideDelay'],
          dropdownList: ['anchor', 'self'],
          colorpickerList: [],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['top left', 'top middle', 'top right', 'center left',
                  'center middle', 'center right',
                  'bottom left', 'bottom middle', 'bottom right'];
            }
          }),
        },
        // imgStyle has type === Object (by default)
        // now converts to 'text', should handle "Object" case
        QImg: {
          order: ['src', 'width', 'height', 'position', 'imgClass', 'imgStyle'],
          dropdownList: [],
          colorpickerList: [],
        },
        QIcon: {
          order: ['name', 'size', 'color'],
          dropdownList: ['size'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['xs', 'sm', 'md', 'lg', 'xl'];
            }
          }),
          colorpickerList: ['color'],
        },
        QBadge: {
          order: ['label', 'aling', 'color', 'textcolor'],
          dropdownList: ['align'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['top', 'middle', 'bottom'];
            }
          }),
          colorpickerList: ['color'],
        },
        QInput: {
          order: ['name', 'label', 'for', 'value', 'type', 'labelColor', 'bgColor',
            'mask', 'outlined', 'filled', 'readonly', 'debounce'],
          dropdownList: ['type'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['text', 'password', 'textarea', 'email',
                  'search', 'tel', 'file', 'number', 'url', 'time', 'date'];
            }
          }),
          colorpickerList: ['labelColor', 'bgColor'],
        },
        QTime: {
          order: ['name', 'value', 'size', 'readonly', 'color', 'textColor', 'disable', 'defaultDate'],
          dropdownList: ['calendar'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['gregorian', 'persian'];
            }
          }),
          colorpickerList: ['color', 'textColor'],
        },
        QBtnToggle: {
          order: ['name', 'value', 'readonly', 'color', 'textColor',
            'disable', 'toggleColor', 'toggleTextColor', 'outline'],
          dropdownList: [],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
            }
          }),
          colorpickerList: ['color', 'textColor', 'toggleColor', 'toggleTextColor'],
        },
        QCheckbox: {
          order: ['name', 'value', 'label', 'size', 'fontSize', 'readonly', 'color', 'textColor',
            'disable', 'toggleColor', 'toggleTextColor', 'outline'],
          dropdownList: ['size', 'toggleOrder'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['tf', 'ft'];
              case 'size':
                return ['xs', 'sm', 'md', 'lg', 'xl'];
            }
          }),
          colorpickerList: ['color'],
        },
        QBtnDropdown: {
          order: ['value', 'label', 'size', 'dropdownIcon', 'type',
            'padding', 'color', 'textColor', 'align', 'disable', 'disableDropdown',
            'toggleTextColor', 'outline'],
          dropdownList: ['type', 'align', 'menuAnchor', 'menuSelf'],
          dropdownOptions: (dropdownList => {
            switch (dropdownList) {
              default:
                return ['a', 'submit', 'button', 'reset'];

              case 'align':
                return ['left', 'right', 'center', 'around', 'between', 'evenly'];

              case 'menuAnchore':
              case 'menuSelf':
                return ['top left', 'top middle', 'top right', 'center left', 'center middle',
                  'center right', 'bottom left', 'bottom center', 'bottom right'];
            }
          }),
          colorpickerList: ['color', 'textColor'],
        },
      },
    };
  },
  methods: {
    ...mapActions({
      setPropValueByName: 'tree/setPropValueByName',
      setFilledRequiredProps: 'tree/setFilledRequiredProps',
    }),

    getQuasarComponent() {
      if (!quasarConfig().framework.components.includes(this.getComponentName)) {
        throw new Error(`компонента ${this.getComponentName} не зарегистрирована`);
      }
      return vue.component(this.getComponentName);
    },

    generateQuasarProps(Component, customization) {
      if (Component.options.props === undefined) return [];

      const props = Object.entries(Component.options.props).map(prop => {
        const [propName, propDatas] = prop;

        function transformMultitypeToPrimitive(array) {
          if (array === undefined) return 'text';
          return array.some(type => type === Boolean) ? 'checkbox' : 'text';
        }

        // если type === enum && type[some] === String || Boolean => 'text' || 'dropdown'
        function getPrimitiveType(obj, config) {
          switch (true) {
            // если type === enum и в нем нет String/Boolean
            default:
              return transformMultitypeToPrimitive(obj.type);

            case obj.type === Function:
              return 'function';

            case obj.type === Boolean:
              return 'checkbox';

              // case obj.type === Object: for imgStyle (temporary solution)
            case config === undefined:
            case obj.type === Array:
            case obj.type === Number:
            case obj.type === Object:

              return 'text';

            case !obj.type || obj.type === String:
              if (config.dropdownList.includes(propName)) return 'dropdown';

              return config.colorpickerList.includes(propName) ? 'colorpicker' : 'text';
          }
        }

        const normalizedProps = {
          propName,
          type: getPrimitiveType(propDatas, customization),
        };

        if (propDatas.required) normalizedProps.required = propDatas.required;

        if (propDatas.default) normalizedProps.default = propDatas.default;

        if (normalizedProps.type === 'dropdown') {
          normalizedProps.options = customization.dropdownOptions(propName);
        }
        return normalizedProps;
      }).filter(prop => prop.type !== 'function');

      const sortingProps = [];
      const unsortedProps = [];

      if (customization !== undefined) {
        props.filter(prop => (
          customization.order.includes(prop.propName)
            ? sortingProps.push(prop) : unsortedProps.push(prop)
        ));

        sortingProps.sort((a, b) => (
          customization.order.indexOf(a.propName) > customization.order.indexOf(b.propName) ? 1 : -1
        ));
      }

      const sortedProps = sortingProps.concat(unsortedProps)
        .filter(prop => prop.type !== 'function')
        .sort(a => (a.required ? -1 : 1));

      return (sortedProps.length) ? sortedProps : props;
    },

    getPropValueByName(propName) {
      const propValue = this.activeElement.settings.props[propName];
      const generatedProp = this.generatedProps.find(prop => prop.propName === propName);
      const defaultValue = generatedProp.default;

      return (propValue !== undefined) ? propValue : defaultValue;
    },

    isRequiredPropNotFilled(prop) {
      return prop.required && !this.activeElement.requiredProps[prop.propName];
    },
  },

  computed: {
    ...mapState({
      activeElement: state => state.tree.activeElement,
    }),

    getComponentName() {
      return this.activeElement.componentName;
    },

    generatedProps() {
      if (!this.activeElement.id) return [];

      const propName = this.activeElement.componentName;

      if (this.customization === undefined) {
        return this.generateQuasarProps(this.getQuasarComponent());
      }

      // если в инструкции для пропсы есть propName - добавляем кастомизацию

      return (Object.keys(this.customization).indexOf(propName) !== -1)
        ? this.generateQuasarProps(this.getQuasarComponent(), this.customization[propName])
        : this.generateQuasarProps(this.getQuasarComponent());
    },
  },
};
</script>
