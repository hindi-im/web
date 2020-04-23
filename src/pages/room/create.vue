<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
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
// import insert_room from '../../graphql/createRoom.gql'
import gql from 'graphql-tag'
import { Notify } from 'quasar'
const insert_room = gql`mutation insert_room($password: String, $userID: Int!, $members: jsonb) {
  insert_room(objects: [{members: $members, password: $password, created_by: $userID}]) {
    affected_rows 
    returning {
      id
    }
  }
}
`;
export default {
  name: 'AccountHome',
    data () {
    return {
      password: "",
      accept: false
    }
  },
    methods: {
    onSubmit: async function (event) {
      const apolloClient = this.$apollo.provider.defaultClient;
      const userID = this.$auth.user().id;
      try {
        await apolloClient.mutate({
          mutation: insert_room,
          variables: {
            password: this.password, userID ,
            members: [userID]
          }, update: (cache, { data: insert_room}) => {
            const { returning } = insert_room.insert_room;
            const roomID = returning[0].id;
            Notify.create('Room created successfully, you will be redirected now');
            this.$router.push(`/r/${roomID}`);
          }
      }) 
      } catch (error) {
        Notify.create('Issue creating room, kindly try again!');
      }
    }
  }
}
</script>
