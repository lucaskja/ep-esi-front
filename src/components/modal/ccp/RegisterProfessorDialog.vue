<template>
  <v-dialog
    :model-value="true"
    max-width="1350"
    @click:outside="closeModal"
  >
    <v-card class="usp-card">
      <v-card-title class="usp-title">
        <h3>Cadastrar professor</h3>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="professorName"
                label="Nome"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="professorEmail"
                label="Email"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="professorPassword"
                label="Senha"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="professorUspNumber"
                label="Número usp"
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
                text="Salvar professor"
                variant="outlined"
                class="usp-btn"
                @click="registerProfessor"
              />
            </v-col>

            <v-col cols="auto">
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
  name: 'CcpApproveStudentRegister',
  data() {
    return {
      professorName: null,
      professorEmail: null,
      professorPassword: null,
      professorUspNumber: null,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async registerProfessor() {
      await axios.post(
        "/ccp/register/professor",
        {
          name: this.professorName,
          email: this.professorEmail,
          password: this.professorPassword,
          role: "PROFESSOR",
          uspNumber: this.professorUspNumber
        }
      )

      this.closeModal()
    }
  },
};
</script>

<style scoped>
.usp-card {
  border-top: 5px solid #1094ab;
  background-color: #f7f7f7;
}

.usp-btn {
  color: #1094ab;
  border: 2px solid #1094ab;
}

.usp-btn:hover {
  color: #FFB500;
  border-color: #FFB500;
}

.usp-title h3 {
  color: #1094ab;
  font-weight: bold;
}

.usp-close-btn {
  color: #FFB500;
}
</style>
