<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!--<div class="flex flex-col rounded shadow bg-gray-50 p-2">
      <h2 class="font-semibold w-full border-b">Validator Uptime</h2>
      <div class="flex justify-between mt-2">
        <div class="border-green-300 border rounded-full px-2 bg-green-200">
          Active 1
        </div>
        <div class="border-yellow-400 border rounded-full px-2 bg-yellow-300">
          Missing 3
        </div>
        <div class="border-red-400 border rounded-full px-2 bg-red-300">
          Jailed 3
        </div>
      </div>
      <div class="flex mt-2">
        <NuxtLink to="/uptime" class="rounded border border-gray-200 text-indigo-500 hover:bg-gray-200 rounded p-2">Overview</NuxtLink>
      </div>
    </div>-->
    <div class="flex flex-col rounded shadow bg-gray-50 p-2">
      <h2 class="font-semibold w-full border-b">Endpoint Uptime (API/RPC)</h2>
      <div class="flex justify-between mt-2">
        <div class="border-green-300 border rounded-full px-2 bg-green-200">
          Up {{endpoints.up.length}}
        </div>
        <div class="border-yellow-400 border rounded-full px-2 bg-yellow-300">
          Stuck {{endpoints.stuck.length}}
        </div>
        <div class="border-red-400 border rounded-full px-2 bg-red-300">
          Down {{endpoints.down.length}}
        </div>
      </div>
      <div class="flex mt-2">
        <NuxtLink to="/uptime/endpoints" class="rounded border border-gray-200 text-indigo-500 hover:bg-gray-200 rounded p-2">Overview</NuxtLink>
      </div>
    </div>
    <!--<div class="flex flex-col rounded shadow bg-gray-50 p-2">
      <h2 class="font-semibold w-full border-b">Relayer Uptime</h2>
      <div class="flex justify-between mt-2">
        <div class="border-green-300 border rounded-full px-2 bg-green-200">
          Running 1
        </div>
        <div class="border-gray-400 border rounded-full px-2 bg-gray-300">
          Unknown 3
        </div>
        <div class="border-red-400 border rounded-full px-2 bg-red-300">
          Down 3
        </div>
      </div>
      <div class="flex mt-2">
        <NuxtLink to="/uptime" class="rounded border border-gray-200 text-indigo-500 hover:bg-gray-200 rounded p-2">Overview</NuxtLink>
      </div>
    </div>-->

  </div>
</template>
<script>
export default {
  data() {
    return {
      'endpoints': {
        'up': [],
        'down': [],
        'stuck': []
      }
    }
  },
  async fetch(){
    this.$store.commit('title/change', 'Uptime')
    let eur = await this.$axios.get(this.$config.BASE_API_URL + "/uptime/endpoints/current")
    this.endpoints = eur.data



  }
}
</script>
