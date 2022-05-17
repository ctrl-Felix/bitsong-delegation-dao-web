export const state = () => ({
  title: 'Dashboard'
})
export const mutations = {
  change(state, text) {
    state.title = text
  },
}
