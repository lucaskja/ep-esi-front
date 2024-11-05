<template>
  <v-app-bar color="#1094ab" dark dense>
    <v-container class="d-flex align-center" fluid>
      <v-row align="center">
        <v-col>
          <h1
            class="text-h5 font-weight-bold"
            style="color: #FFB500"
          >
            Universidade de São Paulo - Programa de Pós Graduação
          </h1>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <v-row
        v-if="isLogged"
        justify="end"
      >
        <v-col
          cols="auto"
        >
          <v-btn
            text
            color="white"
            class="mr-3"
            @click="home"
          >
            Home
          </v-btn>

          <v-btn
            text
            color="white"
            @click="logout"
          >
            Log Out
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import router from "@/router";

export default {
  name: 'AppBar',
  components: {
  },
  data() {
    return {
      reports: [],
      isStudentPerformanceReportModalOpen: false,
      isRegisterPerformanceReportModalOpen: false,
      selectedReport: null,
    }
  },
  computed: {
    isLogged() {
      return !(localStorage.getItem('userId') === null || localStorage.getItem('userId') === undefined);
    },
  },
  methods: {
    home() {
      router.push('/home')
    },
    logout() {
      localStorage.removeItem('apiToken')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')

      router.push('/login')
    },
  },
}
</script>

<style scoped>
.subtitle {
  font-size: 1.1em;
  color: #FFB500;
  font-weight: normal;
}

.v-btn:hover {
  color: #FFB500 !important;
}
</style>

