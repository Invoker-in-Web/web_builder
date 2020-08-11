<script>
import Vue from 'vue';
import Vuex from 'vuex';

let renderResult;

export default {
  render(createElement) {
    if (this.isReordering) return renderResult;

    function renderNodes(array) {
      const siblings = [];

      array.forEach(component => {
        const children = component.children?.length
          ? renderNodes(component.children) : [];

        const hasFalseValue = Object.values(component.requiredProps)
          .some(value => value === false);

        const canWeRender = !hasFalseValue;

        if (canWeRender) {
          const { styling } = component.settings;
          siblings.push(createElement(Vue.component(component.componentName), {
            props: component.settings.props,
            class: styling.classes,
            style: styling.css,
          }, children));
        }
      });

      return siblings;
    }

    const rootNodes = renderNodes(this.treeNodes);

    renderResult = createElement('div', rootNodes);
    return renderResult;
  },

  computed: {
    ...Vuex.mapState('tree', ['activeElement', 'treeNodes', 'isReordering']),
  },
};
</script>

<style scoped>

</style>
