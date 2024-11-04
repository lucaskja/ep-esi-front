<template>
  <v-dialog
    :model-value="true"
    max-width="1350"
  >
    <v-card>
      <v-card-title><h3>Avaliação do Aluno</h3></v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-textarea
              label="Sua Opinião"
              hide-details="true"
              variant="solo-filled"
              clearable
              class="mb-5"
              v-model="professorOpinion"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-chip-group
              selected-class="chip--active"
              class="d-flex justify-center"
              v-model="professorFinalOpinion"
            >
              <v-chip
                value="ADEQUATE"
              >
                Adequado
              </v-chip>

              <v-chip
                value="ADEQUATE_WITH_CAVEATS"
              >
                Adequado com Ressalvas
              </v-chip>

              <v-chip
                value="UNSATISFYING"
              >
                Não Satisfatório
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="d-flex justify-center"
          >
            <v-btn
              text="Enviar"
              variant="text"
              @click="sendProfessorOpinion"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row
            justify="end"
          >
            <v-col
              cols="1"
            >
              <v-btn
                color="primary"
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
  name: 'ReportDialogs',
  props: {
    studentInformation: Object,
    performanceReportId: Number,
    professorId: Number,
  },
  data() {
    return {
      professorOpinion: null,
      professorFinalOpinion: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async sendProfessorOpinion() {
      try {
        await axios.post(
          `/performance-report/professor/opinion/${this.performanceReportId}`,
          {
            professorId: this.professorId,
            professorOpinion: this.professorOpinion,
            professorFinalOpinion: this.professorFinalOpinion,
          }
        )

        this.$emit("closeAll")
      } catch (e) {
        console.log(e)
      }
    }
  },
};
</script>

<style lang="css" scoped>
.chip--active {
  color: #FFB500;
}
</style>
