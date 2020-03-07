<template>
  <div>
    <span v-on:click="authenticate">
      <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
    </span>
    <span>{{ key }}</span>
    <button v-on:click="checkAuth">Check</button>
    <span>{{ authenticated }}</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      key: "222",
      authenticated: "false"
    };
  },
  methods: {
    checkAuth: function() {
      axios.get("/auth/secure").then(res => {
        this.authenticated = res.data;
      });
    },
    authenticate: function() {
      let vm = this;
      window.open(
        (process.env.VUE_APP_API_BASE_URL || "http://localhost:3000") +
          "/auth/steam",
        "PUG-Authentication",
        "height=600,width=800"
      );

      window.addEventListener("message", event => receiveMessage(event), false);

      const receiveMessage = event => {
        if (
          event.origin !==
          (process.env.VUE_APP_API_BASE_URL || "http://localhost:3000")
        ) {
          return;
        }
        const { data } = event;
        vm.key = data;
        this.$store.dispatch("login", data);
      };
    }
  }
};
</script>

<style>
</style>