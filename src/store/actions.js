export function toggleDrawer(store, payload) {
  store.commit('toggleDrawer', payload ? payload.value : null);
}
