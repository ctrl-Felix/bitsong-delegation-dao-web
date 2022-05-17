export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const v = await $axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=300')
    commit('validators/setValidators', v.data.validators)

    const d = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/delegations/bitsong1nphhydjshzjevd03afzlce0xnlrnsm27hy9hgd')
    commit('validators/setDelegations', d.data.delegation_responses)

    const d2 = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/delegations/bitsong166d42nyufxrh3jps5wx3egdkmvvg7jl6k33yut')
    commit('validators/addDelegations', d2.data.delegation_responses)


  }
}
