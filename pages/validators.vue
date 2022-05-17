<template>
  <div class="">
    <div class="flex flex-col">
      <div class="mb-2 -mt-2">
        <button v-if="adjusted" @click="toggle()" class="rounded p-2 bg-gray-200 w-48 text-center hover:bg-gray-400" >Switch to Default</button>
        <button v-else @click="toggle()" class="rounded p-2 bg-gray-200 w-48 text-center hover:bg-gray-400" >Switch to Adjusted</button>

      </div>
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
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-semibold">{{ validator.description.moniker }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ nFormatter(validator.tokens / 10 ** 6, 4) }} BTSG</td>
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
      'validators_default': [],
      'validators_adj': [],
      'images': {},
      'adjusted': false,
    }
  },
  async fetch(){
    this.$store.commit('title/change', 'Validators')

    this.validators_default = this.$store.state.validators.validators
    let delegations = this.$store.state.validators.delegations

    this.validators = this.validators_default

    this.validators_adj = this.validators.map(x => {
      let f = delegations.find(d => d.delegation.validator_address === x.operator_address)
      if (f){
        let m = {...x}
        m.tokens -= +f.balance.amount
        return m
        } else {
        return x
      }
    })
    this.validators_adj.sort(function(a, b){
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
    toggle(){
      this.adjusted = !this.adjusted
      if(this.adjusted){
        this.validators = this.validators_adj
      } else {
        this.validators = this.validators_default
      }
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
