<template>
  <q-layout view="lhh lpR lFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="48">
      <q-toolbar>
        <q-toolbar-title>
          Hindi.im
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer overlay elevated> -->
    <q-drawer
      v-model="right"
      side="left"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="height: calc(100% - 98px); margin-top: 98px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="login" v-if="!this.$auth.user()">
              <q-item-section avatar>
                <q-icon name="Account" />
              </q-item-section>
              <q-item-section>
                Login
              </q-item-section>
            </q-item>
             <q-item clickable v-ripple to="account" v-if="this.$auth.user() && this.$auth.user().id">
              <q-item-section avatar>
                <q-icon name="Account" />
              </q-item-section>
              <q-item-section>
                Account
              </q-item-section>
            </q-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 98px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="96px" class="q-mb-sm">
            <q-icon name="face" />
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      right: false
    };
  }
};
</script>
