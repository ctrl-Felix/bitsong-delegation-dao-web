<template>
  <div class="rounded bg-white p-2">
    <div class="rounded w-full bg-white px-2">
      <p><label class="italic">Note:</label> 1% = 1</p>
    </div>
    <div v-if="showError" class="rounded w-full bg-red-500 mt-4 p-2">
      <p><label class="italic">Error:</label> {{error}}</p>
    </div>
    <form class="grid grid-cols-1 md:grid-cols-2 mt-2">
      <div class="flex flex-col">
        <label class="font-semibold p-2">Uptime</label>
        <input max="100" v-model.number="uptime" class="rounded p-2 border w-5/6 ml-2" placeholder="Uptime Score in percentage">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Validator Rank</label>
        <input v-model.number="rank" class="rounded p-2 border w-5/6 ml-2" placeholder="Rank">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Self delegation</label>
        <input v-model.number="selfDelegation" class="rounded p-2 border w-5/6 ml-2" placeholder="Self delegation">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Voting Power</label>
        <input v-model.number="votingPower" class="rounded p-2 border w-5/6 ml-2" placeholder="Voting Power">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Comission Restake</label>
        <input v-model.number="comissionRestake"  class="rounded p-2 border w-5/6 ml-2" placeholder="Comission restake ratio in percentage">
      </div>
      <div class="md:col-span-2 mt-4">
        <p class="font-semibold p-2 text-lg">Contributions</p>
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Participation in the BitSong ecosystem</label>
        <input v-model.number="participation" class="rounded p-2 border w-5/6 ml-2" placeholder="max 2000">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Core development </label>
        <input v-model.number="coreDevelopment" class="rounded p-2 border w-5/6 ml-2" placeholder="max 3000">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">None core development</label>
        <input v-model.number="noneCoreDevelopment" class="rounded p-2 border w-5/6 ml-2" placeholder="max 2500">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Running relayers</label>
        <input v-model.number="relayer" class="rounded p-2 border w-5/6 ml-2" placeholder="Uptime Score in percentage">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Running an archive node</label>
        <input v-model.number="archiveNode" class="rounded p-2 border w-5/6 ml-2" placeholder="Uptime Score in percentage">
      </div>
      <div class="flex flex-col">
        <label class="font-semibold p-2">Running an public rpc/api</label>
        <input v-model.number="api" class="rounded p-2 border w-5/6 ml-2" placeholder="Uptime Score in percentage">
      </div>
    </form>
    <div class="flex justify-between mx-2">
      <button @click="calculate" class="bg-blue-700 p-2 rounded mt-4 text-gray-50">Calculate</button>
      <button @click="generateLink" class="bg-cyan-700 py-2 px-4 rounded mt-4 text-gray-50">Share</button>
    </div>
    <div v-if="score !== null" class="mt-2 w-full flex flex-col px-2 justify-center items-center">
      <div class="flex flex-col w-full font-semibold text-lg">
        <div class="grid grid-cols-2 text-center p-2 bg-gray-100 rounded">
          <p>Uptime Score</p>
          <p>{{Math.floor(results.uptime)}}</p>
        </div>
        <div class="grid grid-cols-2 text-center p-2">
          <p>Self delegation score</p>
          <p>{{Math.floor(results.selfDelegation)}}</p>
        </div>
        <div class="grid grid-cols-2 text-center p-2 bg-gray-100 rounded">
          <p>Comission restake score</p>
          <p>{{Math.floor(results.comissionRestake)}}</p>
        </div>
        <div class="grid grid-cols-2 text-center p-2">
          <p>Ecosystem score</p>
          <p>{{results.ecosystem}}</p>
        </div>
        <div class="grid grid-cols-2 text-center p-2 bg-gray-100 rounded">
        <p>Core development score</p>
        <p>{{results.coreDevelopment}}</p>
      </div>
      <div class="grid grid-cols-2 text-center p-2">
        <p>None core development score</p>
        <p>{{results.noneCoreDevelopment}}</p>
      </div>
      <div class="grid grid-cols-2 text-center p-2 bg-gray-100 rounded">
        <p>Relayer score</p>
        <p>{{results.relayer}}</p>
      </div>
      <div class="grid grid-cols-2 text-center p-2">
        <p>Archive node score</p>
        <p>{{results.archive}}</p>
      </div>
      <div class="grid grid-cols-2 text-center p-2 bg-gray-100 rounded">
        <p>API/RPC score</p>
        <p>{{results.api}}</p>
      </div>
       <div class="grid grid-cols-2 text-center p-2">
        <p>Rank multiplier</p>
        <p>{{results.multiplier}}</p>
      </div>
        <div class="grid grid-cols-2 text-center p-2 bg-yellow-100 rounded">
          <p>Total</p>
          <p>{{ Math.floor(score)}}</p>
        </div>

      </div>
    </div>
  </div>


</template>
<script>
import Notification from "/components/ui/Notification";
export default {
  components: {Notification},
  data() {
    return {
      'showError': false,
      'error': "",
      'uptime': this.$route.query.uptime || null,
      'rank': this.$route.query.rank || null,
      'selfDelegation': this.$route.query.selfDelegation || null,
      'votingPower': this.$route.query.votingPower || null,
      'comissionRestake': this.$route.query.comissionRestake || null,
      'participation': this.$route.query.participation || null,
      'coreDevelopment': this.$route.query.coreDevelopment || null,
      'noneCoreDevelopment': this.$route.query.noneCoreDevelopment || null,
      'relayer': this.$route.query.relayer || null,
      'archiveNode': this.$route.query.archiveNode || null,
      'api': this.$route.query.api || null,
      'score': this.$route.query.score || null,
      'results': {
        'uptime': null,
        'rank': null,
        'selfDelegation': null,
        'votingPower': null,
        'comissionRestake': null,
        'participation': null,
        'coreDevelopment': null,
        'noneCoreDevelopment': null,
        'relayer': null,
        'archiveNode': null,
        'api': null,
        'score': null,
      }


    }
  },
  async fetch() {
    this.$store.commit("title/change", "Calculator")
    console.log(this.$route.query.calculate)
    if (this.$route.query.calculate) {
      this.calculate()
    }
  },
  methods: {
    calculate() {
      let score = 0;

      // Uptime Score
      const maxUptimeScore = 1000
      const uptimeScore = Math.max((1 - (1 - this.pV(this.uptime) / 100) / 0.02) * maxUptimeScore, 0)
      if (uptimeScore > maxUptimeScore) {
        this.showError = true
        this.error = "Uptime score can't be greater than 100"
      }
      score += uptimeScore
      this.results.uptime = uptimeScore

      // self Delegation Score
      const maxDelegationScore = 1000
      let selfDelegationScore

      if (this.pV(this.selfDelegation) < 500) {
        selfDelegationScore = 0
      } else if (this.pV(this.selfDelegation) < 1000) {
        const sm = 5
        selfDelegationScore = Math.max(this.pV(this.selfDelegation) / this.pV(this.votingPower) * maxDelegationScore * sm, 0)
      } else if (this.pV(this.selfDelegation) >= 1000) {
        const sm = 10
        selfDelegationScore = Math.max(this.pV(this.selfDelegation) / this.pV(this.votingPower) * maxDelegationScore * sm, 0)
      }
      if (selfDelegationScore > maxDelegationScore) {
        this.showError = true
        this.error = "Delegation score can't be greater than 1000"
      }
      score += selfDelegationScore
      this.results.selfDelegation = selfDelegationScore


      // Restake Score
      const maxComissionRestake = 1000;
      const comissionRestakeScore = Math.max(this.pV(this.comissionRestake) * 10, 0)
      if (comissionRestakeScore > maxComissionRestake) {
        this.showError = true
        this.error = "Comission Restake can't be greater than 100%"
      }
      score += comissionRestakeScore
      this.results.comissionRestake = comissionRestakeScore


      // Participation in the Ecosystem
      const maxEcosystemScore = 2000
      const EcosystemScore = Math.min(this.pV(this.participation), maxEcosystemScore) // Ensure the ecosystem score is not bigger than the max score
      score += EcosystemScore
      this.results.ecosystem = EcosystemScore


      // Core development
      const maxCoreDevelopment = 3000
      const coreDevelopment = Math.min(this.pV(this.coreDevelopment), maxCoreDevelopment) // Ensure the ecosystem score is not bigger than the max score
      score += coreDevelopment
      this.results.coreDevelopment = coreDevelopment


      // None Core development
      const maxNoneCoreDevelopment = 2500
      const noneCoreDevelopment = Math.min(this.pV(this.noneCoreDevelopment), maxNoneCoreDevelopment) // Ensure the ecosystem score is not bigger than the max score
      score += noneCoreDevelopment
      this.results.noneCoreDevelopment = noneCoreDevelopment


      // API Uptime Score
      const maxApiScore = 1000
      const apiScore = Math.max((1 - (1 - this.pV(this.api) / 100) / 0.02) * maxApiScore, 0)
      if (uptimeScore > maxApiScore) {
        this.showError = true
        this.error = "API Uptime can't be greater than 100"
      }
      score += apiScore
      this.results.api = apiScore


      // Relayer Score
      const maxRelayerScore = 2000
      const relayerScore = Math.max((1 - (1 - this.pV(this.relayer) / 100) / 0.02) * maxRelayerScore, 0)
      if (relayerScore > maxRelayerScore) {
        this.showError = true
        this.error = "Relayer Uptime can't be greater than 100"
      }
      score += relayerScore
      this.results.relayer = relayerScore


      // Archive Score
      const maxArchiveScore = 1500
      const archiveScore = Math.max((1 - (1 - this.pV(this.archiveNode) / 100) / 0.02) * maxArchiveScore, 0)
      if (archiveScore > maxArchiveScore) {
        this.showError = true
        this.error = "Archive uptime can't be greater than 100"
      }
      score += archiveScore
      this.results.archive = archiveScore


      //Rank multiplier
      const multiplier = this.pV(this.rank) / 100
      score = score * multiplier
      this.results.multiplier = multiplier

      this.score = score
      this.$nuxt.refresh()


    },
    pV(v) {
      return v || 0
    },
    generateLink() {
      let data = {
        'calculate': true,
        'uptime': this.uptime,
        'rank': this.rank || null,
        'selfDelegation': this.selfDelegation || null,
        'votingPower': this.votingPower || null,
        'comissionRestake': this.comissionRestake || null,
        'participation': this.participation || null,
        'coreDevelopment': this.coreDevelopment || null,
        'noneCoreDevelopment': this.noneCoreDevelopment || null,
        'relayer': this.relayer || null,
        'archiveNode': this.archiveNode || null,
        'api': this.api || null,
        'score': this.score || null,
      }
      const parsed = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== null))
      const params = new URLSearchParams(parsed)
      const uri = location.protocol + '//' + location.host + location.pathname + '?' + params


      this.$axios.post(this.$config.BASE_API_URL + "/short/create", {
        uri: uri,
      })
        .then(function (response) {
          navigator.clipboard.writeText(response.data.url)
          alert("Link copied to clipboard")
        })
        .catch(function (error) {
          alert("A error occured")
          console.log(error)
        });
    }
  }
}
</script>
