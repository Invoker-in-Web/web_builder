import Vue from 'vue';

export function dropItem(store, ctx) {
  const obj = JSON.parse(ctx.event.dataTransfer.getData('data'));

  const newItem = {
    label: obj.label,
    componentName: obj.componentName,
    color: store.rootState.colorTypes[obj.sectionName],
    requiredProps: (() => {
      const propName = obj.componentName;
      const componentOptions = Vue.component(propName).options;
      const requiredProps = {};
      if (!componentOptions.props) return requiredProps;

      Object.entries(componentOptions.props).forEach(quasarProp => {
        const [quasarPropName, quasarPropData] = quasarProp;
        if (quasarPropData.required === false) return;
        if (quasarPropData.required !== undefined) {
          requiredProps[quasarPropName] = false;
        }
      });
      return requiredProps;
    })(),
    settings: {
      props: {},
      styling: {
        classes: [],
        css: {},
      },
      data: {},
    },
    id: window.uuidv4(),
  };

  if (ctx.event.target.classList.contains('item-label')) {
    const { id } = ctx.event.target.dataset;

    const parentObject = ctx.findObjectById(store.state.treeNodes, id).parent;

    const index = parentObject.findIndex(el => el.id === id);

    parentObject.splice(index + 1, 0, newItem);
  } else {
    store.state.treeNodes.unshift(newItem);
  }
}

export function setActiveItem(store, { event, findObjectById }) {
  const { id } = event.target.dataset;
  const activeItem = findObjectById(store.state.treeNodes, id).result;
  store.commit('setActiveItem', activeItem);
}

export function setPropValueByName(store, payload) {
  store.commit('setPropValueByName', payload);

  const isPropRequired = Object.prototype
    .hasOwnProperty.call(store.state.activeElement.requiredProps, payload.propName);
  if (isPropRequired) {
    store.commit('setRequiredProp', {
      propName: payload.propName,
      value: !!payload.value.length,
    });
  }
}

export function setActiveStyles(store, content) {
  if (content.type === 'classes') store.commit('setActiveClasses', content);
  if (content.type === 'css') store.commit('setActiveCss', content);
}

export function setIsReordering(store, bool) {
  store.commit('setIsReordering', bool);
}

export function deleteNode(store, payload) {
  store.commit('deleteNode', payload);
}

export function setFilledRequiredProps(store, payload) {
  store.commit('setFilledRequiredProps', payload);
}
