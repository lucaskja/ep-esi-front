<template>
  <v-dialog
    :model-value="true"
    max-width="1350"
    @click:outside="closeModal"
  >
    <v-card class="usp-card">
      <v-card-title class="usp-title">
        <h3>Cadastrar Estudante</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="uspNumber"
                label="Número USP"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="name"
                label="Nome"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="dob"
                label="Data de Nascimento"
                type="date"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="birthPlace"
                label="Local de Nascimento"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="nationality"
                label="Nacionalidade"
              />
            </v-col>

            <v-col
              cols="6"
            >
              <v-autocomplete
                v-model="selectedProgram"
                :items="programs"
                item-title="title"
                item-value="value"
                label="Programa"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="lattes"
                label="Lattes"
              />
            </v-col>

            <v-col>
              <v-autocomplete
                v-model="selectedProfessor"
                :items="professors"
                item-title="professorName"
                item-value="professorId"
                label="Professor Responsável"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col
              cols="auto"
            >
              <v-btn
                class="usp-submit-btn"
                color="primary"
                text="Cadastrar"
                @click="registerStudent"
              />
            </v-col>

            <v-col
              cols="auto"
            >
              <v-btn
                class="usp-close-btn"
                text="Fechar"
                @click="closeModal"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegisterStudent',
  data() {
    return {
      email: null,
      password: null,
      uspNumber: null,
      name: null,
      dob: null,
      birthPlace: null,
      nationality: null,
      selectedProgram: null,
      programs: [
        {
          title:"Mestrado",
          value: "MASTER"
        },
        {
          title: "Doutorado",
          value: "PHD"
        },
      ],
      lattes: null,
      professor: null,
      professors: [],
      selectedProfessor: null,
    }
  },
  async mounted() {
    const response = await axios.get("/professor/all")

    this.professors = response.data
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    closeModal() {
      this.$emit("closeModal")
    },
    registerStudent() {
      axios.post(
        "/auth/register",
        {
          email: this.email,
          password: this.password,
          uspNumber: this.uspNumber,
          role: "STUDENT",
          name: this.name,
          dob: this.formatDate(this.dob),
          birthPlace: this.birthPlace,
          nationality: this.nationality,
          program: this.selectedProgram.toUpperCase(),
          lattes: this.lattes,
          professorId: this.selectedProfessor
        },

        this.closeModal()
      )
    },
  }
}
</script>

<style scoped>
.usp-card {
  border-top: 5px solid #1094ab;
  background-color: #f7f7f7;
}

.usp-title h3 {
  color: #1094ab;
  font-weight: bold;
}

.usp-close-btn {
  color: #FFB500;
}
</style>
