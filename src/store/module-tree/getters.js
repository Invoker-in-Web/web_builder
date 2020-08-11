export function getActiveElement(state) {
  return state.activeElement;
}
export function getActiveElementClasses(state) {
  const styles = state.activeElement.settings?.styling.classes;
  return !styles ? {} : styles;
}
