
export function routerPerformedNavigation(state, currentRoute) {
  return Object.assign({}, state, { router: { currentRoute } });
}
