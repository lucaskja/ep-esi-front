<template>
  <v-dialog
    :model-value="true"
    max-width="1350"
    @click:outside="closeModal"
  >
    <v-card class="usp-card">
      <v-card-title class="usp-title">
        <h3>Avaliação do Aluno</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-textarea
              label="Sua Opinião"
              hide-details="true"
              variant="solo-filled"
              clearable
              class="usp-textarea mb-5"
              v-model="opinion"
              color="usp-primary"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-chip-group
              selected-class="chip--active"
              class="d-flex justify-center"
              v-model="finalOpinion"
            >
              <v-chip value="ADEQUATE" class="usp-chip">
                Adequado
              </v-chip>

              <v-chip value="ADEQUATE_WITH_CAVEATS" class="usp-chip">
                Adequado com Ressalvas
              </v-chip>

              <v-chip value="UNSATISFYING" class="usp-chip">
                Não Satisfatório
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center mt-4">
          <v-btn
            class="usp-btn"
            variant="text"
            @click="sendOpinion"
          >
            Enviar
          </v-btn>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="1">
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
  name: 'RateStudentPerformanceReport',
  props: {
    performanceReportId: Number,
  },
  data() {
    return {
      opinion: null,
      finalOpinion: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async sendOpinion() {
      const role = localStorage.getItem('role').replace(/"/g, '')
      const id = localStorage.getItem('userId')
      const isProfessorOrCcp = role === 'CCP' ? 'ccp' : 'professor'

      try {
        await axios.post(
          `/performance-report/${isProfessorOrCcp}/opinion/${this.performanceReportId}`,
          {
            [`${isProfessorOrCcp}Id`]: id,
            ccpOpinion: this.opinion,
            ccpFinalOpinion: this.finalOpinion,
          }
        )
        this.closeModal()
      } catch (e) {
        console.log(e)
      }
    }
  },
};
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

.usp-textarea .v-label {
  color: #1094ab !important;
}

.chip--active {
  color: #FFB500!important;
}

.usp-chip {
  color: #1094ab;
  border-color: #1094ab;
}

.usp-chip.chip--active {
  background-color: #FFB500 !important;
  color: white !important;
}

.usp-btn {
  color: white;
  background-color: #1094ab;
  border: 1px solid #1094ab;
}

.usp-btn:hover {
  background-color: #FFB500;
}

.usp-close-btn {
  color: #FFB500;
}
</style>
