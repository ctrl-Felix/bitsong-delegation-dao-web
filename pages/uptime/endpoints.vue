<template>
  <div class="flex flex-col">
    <div v-for="type in Object.keys(endpoints)" class="flex flex-col">
      <h2 class="text-xl font-semibold mt-2">{{ matchTitle(type) }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4">
        <div v-for="(url, valoper) in endpoints[type]" class="flex flex-col divide-y rounded shadow bg-gray-50 py-2">
          <div v-if="!loading" class="flex justify-between w-full mb-2 px-4">
            <a target="_blank" :href="url">{{ url.replace(/(^\w+:|^)\/\//, '') }}</a>
            <span  v-bind:class="{
              'bg-green-200': getStatus(url) === 'Up',
              'bg-yellow-300': getStatus(url) === 'Stuck',
              'bg-red-300': getStatus(url) === 'Down',
              'bg-gray-300': getStatus(url) === 'Error',


            }" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"> {{ getStatus(url) }} </span>
          </div>
          <div v-if="!loading" class="flex flex-col w-full mt-2">
            <div class="flex justify-between w-full mb-2 px-4">
              <p>Last day</p>
              <p class="px-1">{{ calculateUptime(history[url].day) }} %</p>
            </div>
            <div class="flex justify-between w-full mb-2 px-4">
                <p>Last week</p>
              <p class="px-1">{{ calculateUptime(history[url].week) }} %</p>
            </div>
            <div class="flex justify-between w-full mb-2 px-4">
                <p>Last month</p>
              <p class="px-1">{{ calculateUptime(history[url].month) }} %</p>
              </div>
            <div class="flex justify-between w-full mb-2 px-4">
                <p>Last 3 months</p>
              <p class="px-1">{{ calculateUptime(history[url]['3months']) }} %</p>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  data(){
    return {
      'loading': true,
      'endpoints': this.$store.state.monitor.endpoints,
      'history': {},
      'status': {}
    }
  },
  async fetch() {
    this.$store.commit('title/change', 'Endpoints')

    let h = await this.$axios.get(this.$config.BASE_API_URL + "/uptime/endpoints/historic")
    this.history = h.data

    let sr = await this.$axios.get(this.$config.BASE_API_URL + "/uptime/endpoints/current")
    this.status = sr.data
    this.loading = false


  },
  methods: {
    matchTitle(title){
      switch (title){
        case 'rpc':
          return 'RPC';
        case 'api':
          return 'API';
        case 'rpcarchive':
          return 'RPC Archive';
        case 'apiarchive':
          return 'API Archive';
      }
    },
    calculateUptime(obj){
      const total = obj.up + obj.down + obj.stuck
      return Math.floor(obj.up / total *100)
    },
    getStatus(url){
      if(this.status.up.indexOf(url) >= 0){
        return 'Up'
      } else if (this.status.stuck.indexOf(url) >= 0){
        return 'Stuck'
      } else if (this.status.down.indexOf(url) >= 0) {
        return 'Down'
      } else {
        return 'Error'
      }
    }
  }
}
</script>
