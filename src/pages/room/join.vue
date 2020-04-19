<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-md"
    >
    <h5>Join an existing room</h5>
      <q-input
        filled
        type="text"
        v-model="meeting_id"
        label="Meeting ID"
      />
      <q-toggle v-model="accept" label="I accept the license and terms" />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'AccountHome',
    data () {
    return {
      meeting_id: "",
      accept: false
    }
  },
}
</script>
