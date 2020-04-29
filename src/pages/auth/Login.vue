<template>
  <q-page class="flex flex-center">
    <q-card
      square
      style="width: 400px; padding:50px"
    >
      <q-card-section>
        <div class="text-h6">
          {{ lang.auth.login.login }}
        </div>
      </q-card-section>

      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card-section>
          <q-input
            v-if="identifierField === 'email'"
            id="email"
            v-model.trim="data.body.email"
            type="email"
            :label="lang.auth.fields.email"
            :rules="validations['email']"
            lazy-rules
            autofocus
          />
          <q-input
            v-if="identifierField === 'username'"
            v-model.trim="data.body.username"
            type="text"
            :label="lang.auth.fields.username"
            :rules="validations['username']"
            lazy-rules
          />
          <q-input
            id="password"
            v-model="data.body.password"
            :type="showPassword ? 'text' : 'password'"
            :label="lang.auth.fields.password"
            :rules="validations['password']"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <br>
          <q-checkbox
            id="rememberMe"
            v-model="data.rememberMe"
            :label="lang.auth.login.rememberMe"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            :label="lang.auth.login.login"
            color="primary"
            :loading="loading"
            type="submit"
          />
        </q-card-actions>
      </q-form>
      <router-link to="/password/forgot">
        <a>{{ lang.auth.login.passwordForgot }}</a>
      </router-link>

      <q-card-section>
        <a>{{ lang.auth.login.registerMessage }} </a>
        <router-link to="/register">
          <a>{{ lang.auth.login.register }}</a>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import prompts from 'app/quasar.extensions.json'
import { Notify } from 'quasar'
import isEmail from 'validator/es/lib/isEmail'
import { onLogin } from '../../vue-apollo'

export default {
  name: 'Login',
  data () {
    return {
      lang: {
        auth: {}
      },
      data: {
        body: {
          email: '',
          password: ''
        },
        rememberMe: false
      },
      loading: false,
      validations: {
        email: [
          val => !!val || this.lang.auth.validations.required,
          val => isEmail(val) || this.lang.auth.validations.email
        ],
        username: [
          val => !!val || this.lang.auth.validations.required
        ],
        password: [val => !!val || this.lang.auth.validations.required]
      },
      identifierField: prompts['http-authentication'].identifierField,
      showPassword: false
    }
  },
  watch: {
    '$q.lang.isoName' (val) {
      this.__setupLang()
    }
  },
  beforeMount () {
    this.__setupLang()
  },
  methods: {
    __setupLang () {
      const isoName = this.$q.lang.isoName || 'en-us'
      let lang
      try {
        lang = require(`http-authentication/lang/${isoName}`)
      } catch (e) { }

      if (lang !== void 0) {
        this.lang.auth = { ...lang.default.auth }
      }
    },
    async onSubmit () {
      this.loading = true
      const that = this;
      try {
          const resp = await this.$auth.login(this.data);
          Notify.create('Loggedin successfully, you will be redirected now');
          this.$router.push('/')
          this.$store.dispatch('auth/loginCallback')
      } catch (error) {
            Notify.create('Incorrect username or password. Kindly try again.');
          if (error.response) {
            if (error.response.status === 401) {
              this.$q.dialog({
                message: this.lang.auth.login.verificationRequired
              })
            } else if (error.response.status === 403) {
              this.$q.dialog({
                message: this.lang.auth.login.invalidCredentials
              })
            } else {
              console.error(error)
            }
          }
      }
          console.log(this.$auth.user());
          this.loading = false;
            const apolloClient = this.$apollo.provider.defaultClient;
            await onLogin(apolloClient, this.$auth.user())


        // .then((response, data) => {

        // })
        // .catch(error => {
        //   console.log(error);
         
        // })
        // .finally(() => {
        //   console.log('dfinaklkly')
        //   this.loading = false
        // })
    }
  }
}
</script>
