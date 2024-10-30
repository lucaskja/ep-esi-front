<template>
  <v-container
    class="login-container d-flex align-center flex-column"
  >
    <v-row
      class="login-row"
      justify="center"
      align-content="center"
    >
      <v-col
        cols="3"
      >
        <v-row
          justify="center"
          class="mb-12"
        >
          <v-col
            class="d-flex"
            cols="6"
          >
            <v-img
              src="@/assets/images/usp_logo.png"
              :width="300"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              hide-details="true"
              variant="solo-filled"
              clearable
              class="mb-5"
              v-model="username"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Password"
              hide-details="true"
              variant="solo-filled"
              clearable
              class="mb-5"
              v-model="password"
              :append-inner-icon="shouldShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="shouldShowPassword ? 'text' : 'password'"
              @click:append-inner="shouldShowPassword = !shouldShowPassword"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="d-flex justify-center"
          >
            <v-btn
              text="Login"
              @click="login"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppLogin',
  components: {

},
  data() {
    return {
      username: null,
      password: null,
      shouldShowPassword: false,
    }
  },
  methods: {
    async login() {
      const response = await axios.post(
        "/auth/login",
        {
          username: this.username,
          password: this.password,
        },
      )

      const {
        accessToken,
        role,
        userId,
      } = response.data

      localStorage.setItem("apiToken", JSON.stringify(accessToken))
      localStorage.setItem("role", JSON.stringify(role))
      localStorage.setItem("userId", JSON.stringify(userId))
    },
  },
}
</script>

<style lang="css">
.login-container {
  height: 100%;
}

.login-row {
  width: 100% !important;
}
</style>
