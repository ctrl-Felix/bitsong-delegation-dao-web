export const state = () => ({
  'validators': [],
  'delegations': []
})

export const mutations = {
  setValidators(state, valdiators) {
    state.validators = valdiators.sort(function(a, b){
      return b.tokens - a.tokens
    })
  },
  setDelegations(state, delegations) {
    delegations.sort((a, b) => {
      return +b.balance.amount - +a.balance.amount
    })
    state.delegations = delegations.filter((d => {
      return d.balance.amount > 0
    }))
  },
  addDelegations(state, delegations) {
    for (const entry of delegations){
      let obj = state.delegations.find(x => x.delegation.validator_address === entry.delegation.validator_address)
      if (obj){
        obj.balance.amount = +obj.balance.amount + +entry.balance.amount
      } else {
        state.delegations.push(entry)
      }

      state.delegations.sort((a, b) => {
        return +b.balance.amount - +a.balance.amount
      })

      state.delegations = state.delegations.filter((d => {
        return d.balance.amount > 0
      }))



    }
  }
}

