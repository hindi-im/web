<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
export default {
  name: 'App',
 preFetch ({ store }) {
      store.commit('auth/setUserData', (data) => { 
      console.log(data)
      return { id: data.id } })

    /**
     * Login callbacks
     */
    store.commit('auth/addLoginCallback', () => console.log('Custom login calback'))
 }
}
</script>
