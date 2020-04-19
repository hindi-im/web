<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-md"
    >
    <h5>Create a new Room</h5>
      <q-input
        filled
        type="password"
        v-model="password"
        label="Meeting Password (Optional)"
      />
      <q-toggle v-model="accept" label="I accept the license and terms" />
      <div>
        <q-btn label="Start" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'AccountHome',
    data () {
    return {
      password: "",
      accept: false
    }
  },
}
</script>
