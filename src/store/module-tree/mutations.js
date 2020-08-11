import Vue from 'vue';

export function setActiveItem(state, activeItem) {
  state.activeElement = activeItem;
}
export function setInitialActiveItem(state) {
  if (!state.treeNodes.length) return;

  const firstNode = state.treeNodes[0];

  state.activeElement = firstNode;
}

export function setPropValueByName(state, { propName, value }) {
  Vue.set(state.activeElement.settings.props, propName, value);
}

export function setActiveClasses(state, { classes }) {
  Vue.set(state.activeElement.settings.styling, 'classes', classes);
}
export function setActiveCss(state, { propName, value }) {
  Vue.set(state.activeElement.settings.styling.css, propName, value);
}

export function setIsReordering(state, bool) {
  state.isReordering = bool;
}

export function deleteNode(state, { id, findObjectById }) {
  const { parent, result } = findObjectById(state.treeNodes, id);

  const index = parent.findIndex(el => el.id === id);

  // Проверка на то, является ли активный элемент потомком удаляемого
  function checkIfHasActiveChild(currentObj, activeId) {
    if (currentObj.id === activeId) state.activeElement = {};

    if (currentObj.children?.length) {
      currentObj.children.forEach(child => checkIfHasActiveChild(child, activeId));
    }
  }

  checkIfHasActiveChild(result, state.activeElement.id);
  parent.splice(index, 1);
}

export function setRequiredProp(state, { propName, value }) {
  Vue.set(state.activeElement.requiredProps, propName, value);
}
