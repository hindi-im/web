<template>
  <q-page class="flex flex-center">
    <p>
      Welcome howdy {{ this.$auth.user().username }} <br/>
      Room id is {{ $route.params.id}}
    </p>
  </q-page>
</template>

<script>
export default {
  name: 'AccountHome'
}
</script>
