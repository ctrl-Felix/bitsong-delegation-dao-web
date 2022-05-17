export const state = () => ({
  'validators': []
})

export const mutations = {
  async getValidators(state) {
    const v = await this.$axios.$get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=300')
    state.validators = v.data.validators

  },
}
export const actions = {
  async nuxtServerInit({ dispatch }) {
  }
}

