<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">Overview</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Active Validators
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ validators.length }}
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Receiving Delegation
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ Object.keys(delegations).length }}
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Amount
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ nFormatter(total  / 10 ** 6, 0) }} $BTSG
        </dd>
      </div>
    </dl>
    <div class="bg-white">
      <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr class="">
              <th class="py-3.5 pl-4 pr-3 text-left">Validator</th>
              <th class="py-3.5 pl-4 pr-3 text-left">Delegation</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="delegation in delegations">
            <td class="py-3.5 pl-4 pr-3">{{getValidatorByAddress(delegation.delegation.validator_address).description.moniker}}</td>
            <td class="py-3.5 pl-4 pr-3">{{nFormatter(delegation.balance.amount  / 10 ** 6, 0)}} BTSG</td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</template>
<script>
export default {
  layout: 'default',
  data(){
    return {
      'validators':[],
      'delegations': [],
      'total': 0
    }
  },
  async fetch(){
    let valreq = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=300')
    let v = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/delegations/bitsong1nphhydjshzjevd03afzlce0xnlrnsm27hy9hgd')
    this.delegations = v.data.delegation_responses.filter((d => {
      return d.balance.amount > 0
    }))
    this.delegations.sort((a, b) => {
      return +b.balance.amount - +a.balance.amount
    })
    this.validators = valreq.data.validators
    this.total = this.delegations.reduce((pre, cur) => pre + +cur['balance']['amount'], 0)


    this.$store.commit('title/change', "Dashboard" )

  },
  mounted() {
  },
  methods: {
    getValidatorByAddress(address){
      return this.validators.find(v => v.operator_address === address)
    },
    nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

  }
}
</script>
