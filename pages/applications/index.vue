<template>
  <div class="">
    <div v-if="!loading"  class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <NuxtLink :to="'/applications/'+application.number.toString()" :key="application.number" v-for="application in applications" class="text-gray-900 flex flex-col transition ease-in-out duration-300 bg-gray-50 hover:bg-gray-200 items-center shadow-lg rounded">
        <img class="inline-block h-14 w-14 rounded-full my-2" :src="application.user.avatar_url" alt="" />
        <h3 class="font-bold text-center p-3">{{ application.title }}</h3>
      </NuxtLink>
    </div>

  </div>

</template>
<script>
export default {
  pageTitle: 'Applications',
  data() {
    return {
      loading: true,
      applications: []
    }
  },
  async fetch() {
    this.applications = await this.$axios.$get('https://api.github.com/repos/bitsongofficial/delegation-program/issues')
    this.$store.commit('title/change', "Applications (" + this.applications.length.toString() + ")" )
    this.loading = false
  }
}
</script>
