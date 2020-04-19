<template>
  <q-page class="flex flex-center">
    <p>
      Welcome howdy {{ this.$auth.user().username }}
    </p>
  </q-page>
</template>

<script>
export default {
  name: 'AccountHome'
}
</script>
