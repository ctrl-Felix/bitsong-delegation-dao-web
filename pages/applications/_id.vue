<template>
  <div>
    <div v-if="!loading" class="flex flex-col w-full mt-6">
      <div class="w-full sm:w-5/6 lg:w-2/3 shadow rounded float-left bg-gray-50 p-4">
        <div class="flex border-b items-center">
          <img class="inline-block h-14 w-14 rounded-full my-2" :src="application.user.avatar_url" alt="" />
          <h2 class="font-bold text-lg ml-5">{{application.user.login}}</h2>
        </div>
        <div v-html="parseMarkdown(application.body)" ></div>
      </div>
      <div v-bind:class="comment.user.id === application.user.id ? 'place-self-start' : 'place-self-end'" v-for="comment in comments" class="w-full sm:w-5/6 lg:w-2/3 shadow rounded bg-gray-50 p-4 mt-2">
        <div class="flex border-b items-center mb-4">
          <img class="inline-block h-14 w-14 rounded-full my-2" :src="comment.user.avatar_url" alt="" />
          <h2 class="font-bold text-lg ml-5">{{comment.user.login}}</h2>
        </div>
        <div v-html="parseMarkdown(comment.body)" ></div>
      </div>


    </div>


  </div>
</template>
<script>
import {marked} from 'marked';
export default {

  data(){
    return {
      loading: true,
      application: {},
      comments: {}
    }
  },
  async fetch(){
    const { $content, route } = this.$nuxt.context;
    const { params } = route;
    let t = await this.$axios.get('https://api.github.com/repos/bitsongofficial/delegation-program/issues/' + params.id)
    this.application =t.data
    let c = await this.$axios.get('https://api.github.com/repos/bitsongofficial/delegation-program/issues/'+ params.id + '/comments')
    this.comments = c.data
    this.$store.commit('title/change', this.application.title)
    this.loading = false
  },
  computed: {
  },
  methods: {
    parseMarkdown(markdown){
      marked.setOptions({
        breaks: true
      })
      return marked(markdown);

    }
  }
}
</script>
<style>
h3 {
  font-size: larger;
  font-weight: bold;
}
a {
  color: #0000EE;
}
p {
  margin-bottom: 8px;
}
</style>
