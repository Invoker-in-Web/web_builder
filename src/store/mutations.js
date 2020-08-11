export function toggleDrawer(state, customValue) {
  state.isRightDrawerOpened = !customValue
    ? !state.isRightDrawerOpened : customValue;
}
