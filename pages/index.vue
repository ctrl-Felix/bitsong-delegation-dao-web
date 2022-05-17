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
          0
        </dd>
      </div>
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Total Amount
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          4M $BTSG
        </dd>
      </div>
    </dl>
    <div class="bg-white">
      <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
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
      'delegations': []
    }
  },
  async fetch(){
    let valreq = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=300')
    this.validators = valreq['data']['validators']
    this.$store.commit('title/change', "Dashboard" )
  }
}
</script>
