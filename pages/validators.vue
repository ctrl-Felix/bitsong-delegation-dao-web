<template>
  <div class="">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rank</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Voting Power</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Uptime</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Website</span>
                </th>
              </tr>
              </thead>
              <tbody class="bg-white">
              <tr v-for="(validator, id) in validators" :key="validator.operator_address" :class="id % 2 === 0 ? undefined : 'bg-gray-50'">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 font-bold">{{ id + 1 }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ validator.description.moniker }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ validator.tokens / 10 ** 6 }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Soon</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a target="_blank" class="text-indigo-600 hover:text-indigo-700 border rounded px-3 py-2 hover:bg-gray-200" :href="validator.description.website">Website</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      'validators': [],
      'images': {},
    'people': [{ name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' }]
    }
  },
  async fetch(){
    this.$store.commit('title/change', 'Validators')
    let v = await this.$axios.get('https://lcd.explorebitsong.com/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=300')
    this.validators = v.data.validators
    this.validators.sort(function(a, b){
      return b.tokens - a.tokens
    })
    /*for (let x in this.validators) {
      console.log(this.validators[x].description.identity)
      if (this.validators[x].description.identity){
        let c = await this.$axios.get('https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=' + this.validators[x].description.identity)
        this.images[this.validators[x].operator_address] = c.data.them[0].pictures.primary.url

      }
    }*/
  },
  methods: {
  }
}
</script>
