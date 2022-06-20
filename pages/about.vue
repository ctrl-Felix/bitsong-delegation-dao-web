<template>
  <div class="flex flex-col">
    <div class="bg-gray-50 rounded p-4">
      <p>The Bitsong delegation program was created to encourage and support contributions from validators for which the Bitsong S.r.l. allocated a special fund.<br><br>In order to ensure a fair distribution a special delegation DAO has been created which will work independently in the evaluation of the final delegations.</p>
    </div>
    <h2 class="mt-4 font-semibold text-lg">Current rules/prerequisites</h2>
    <div class="bg-gray-50 rounded p-4 mt-2">
      <ul class="list-disc px-4 py-2">
        <li>Basic information is set on chain: Contact information (website, twitter, telegram, etc.), details, avatar/logo.</li>
        <li>No delegation without application. To receive the uptime or self stake delegation validators will also need to apply.</li>
        <li>Maximum commission is 10%.</li>
        <li>A validator must be live on mainnet for at least 1 month (active or inactive).</li>
        <li>Governance participation score of 90% or higher. SCORE: Validator voted / total proposals during validator in active set. 0/0 is considered as 100%. To allow everyone a fair start we will not take proposals before #11 into account.</li>
        <li>1 soft slash is allowed during 1 epoch, when the 2nd soft slash happens the validator will lose their BitSong Delegation and can't submit for a delegation next epoch.</li>
        <li>When a validator suffers from a hard slash the validator will lose their BitSong Delegation and can't submit for a delegation for at least 6 month (duration decided by the BitSong Delegation DAO).</li>
        <li>The Delegation DAO reserves the right to completely exclude validators from the program if valid evidence of harmful behaviour is presented.</li>
        <li>One delegation per organisation is allowed. Therefore, the term validator in the following also refers to the respective organisation/brand and not only to the specific on-chain validator.</li>
      </ul>
    </div>
    <h2 class="mt-4 font-semibold text-lg">How does it work</h2>
    <div class="bg-gray-50 rounded p-4 mt-2">
      <p>The delegations are calculated on a point system. Every validator can apply for a delegation in pre-defined categories.<br>
        The DAO will then evaluate each application for each new delegation epoch (3 months) and assign points according to the category the validator will contribute.<br><br>
        The current categories and their point allocation can be found in the <a target="_blank" class="text-blue-400 hover:text-blue-500" href="https://github.com/bitsongofficial/delegation-program#delegation-criteria">delegation criteria</a> section of the github repository.<br><br>
        Once all applications are evaluated all points are added up and each validator receives a delegation according to its score.<br><br>
        Please visit the <a target="_blank" class="text-blue-400 hover:text-blue-500" href="https://github.com/bitsongofficial/delegation-program">github repository</a> for the most up to date information, examples and further explanations.</p>
    </div>
    </div>
</template>
<script>
export default {
  async fetch(){
    this.$store.commit('title/change', "About")
  }
}
</script>
