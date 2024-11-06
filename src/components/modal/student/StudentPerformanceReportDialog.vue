<template>
  <v-dialog
    :model-value="true"
    max-width="800"
    @click:outside="closeViewModal"
  >
    <v-card class="usp-card">
      <v-container>
        <v-row class="mt-4" justify="center">
          <v-col>
            <v-expansion-panels
              multiple
            >
              <v-container>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-row>
                      <v-col>
                        <h4
                          class="section-title"
                        >
                          Professor
                        </h4>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row>
                      <v-col>
                        <v-textarea
                          label="Opinião do professor"
                          :model-value="report.professorOpinion"
                          readonly
                          color="usp-accent"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Opinião final do professor"
                          :model-value="formatFinalOpinion(report.professorFinalOpinion)"
                          readonly
                          color="usp-accent"
                          hide-details="auto"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-container>

             <v-container>
               <v-expansion-panel>
                 <v-expansion-panel-title>
                   <v-row>
                     <v-col>
                       <h4
                         class="section-title"
                       >
                         CCP
                       </h4>
                     </v-col>
                   </v-row>
                 </v-expansion-panel-title>

                 <v-expansion-panel-text>
                   <v-row>
                     <v-col>
                       <v-textarea
                         label="Opinião da CCP"
                         :model-value="report.ccpOpinion"
                         readonly
                         color="usp-accent"
                         hide-details="auto"
                       />
                     </v-col>
                     <v-col>
                       <v-text-field
                         label="Opinião final da CCP"
                         :model-value="formatFinalOpinion(report.ccpFinalOpinion)"
                         readonly
                         color="usp-accent"
                         hide-details="auto"
                       />
                     </v-col>
                   </v-row>
                 </v-expansion-panel-text>
               </v-expansion-panel>
             </v-container>

              <v-container>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-row>
                      <v-col>
                        <h4
                          class="section-title"
                        >
                          Aluno
                        </h4>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Resumo acadêmico"
                          :model-value="report.academicEventsResume"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Resumo da pesquisa"
                          :model-value="report.researchResume"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Observação do estudante"
                          :model-value="report.studentObservation"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-container>

              <v-container>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-row>
                      <v-col>
                        <h4
                          class="section-title"
                        >
                          Exames
                        </h4>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="Data do exame de qualificação"
                          :model-value="report.qualificationExamDate"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Prazo para o exame de qualificação"
                          :model-value="report.qualificationExamDeadline"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Data do exame de proficiência em idiomas"
                          :model-value="report.languageProficiencyExamDate"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Prazo para exame de proeficiência em idiomas"
                          :model-value="report.languageProficiencyDeadline"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Prazo para a entrega da atribuição"
                          :model-value="report.assigmentDeadline"
                          readonly
                          color="usp-primary"
                          hide-details="auto"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-container>

              <v-container>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-row>
                      <v-col>
                        <h4
                          class="section-title"
                        >
                          Artigos
                        </h4>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Artigos em escrita"
                          :model-value="report.writingArticles"
                          readonly
                          color="usp-primary"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Artigos em revisão"
                          :model-value="report.reviewingArticles"
                          readonly
                          color="usp-primary"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Artigos aprovados"
                          :model-value="report.approvedArticles"
                          readonly
                          color="usp-primary"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-container>
            </v-expansion-panels>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn class="usp-btn" @click="closeViewModal">Fechar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>

  <RegisterStudentPerformanceReport
    v-if="shouldShowRegisterStudentPerformanceReport"
    :performance-report-id="report.id"
    :professor-id="report.professorId"
    @closeModal="shouldShowRegisterStudentPerformanceReport = false"
    @closeAll="close"
  />
</template>

<script>
import RegisterStudentPerformanceReport from '@/components/modal/RateStudentPerformanceReport.vue';

export default {
  name: 'ReportDialogs',
  components: {
    RegisterStudentPerformanceReport
  },
  props: {
    report: Object,
  },
  emits: [
    'closeModal',
    'updateReports'
  ],
  data() {
    return {
      isFormValid: false,
      shouldShowRegisterStudentPerformanceReport: false,
    };
  },
  methods: {
    closeViewModal() {
      this.$emit('closeModal');
    },
    close() {
      this.shouldShowRegisterStudentPerformanceReport = false
      this.closeViewModal()
      this.$emit('updateReports')
    },
    formatFinalOpinion(opinion) {
      if (opinion === "ADEQUATE") return "Adequado"

      if (opinion === "ADEQUATE_WITH_CAVEATS") return "Adequando com ressalvas"

      if (opinion === "UNSATISFYING") return "Insatisfatório"

      return ""
    }
  },
};
</script>

<style scoped>
.usp-card {
  border-top: 5px solid #1094ab;
  background-color: #f7f7f7;
}

.section-title {
  color: #FFB500;
  font-weight: bold;
}

.usp-btn {
  background-color: #1094ab;
  color: white;
}

.usp-btn:hover {
  background-color: #FFB500;
  color: white;
}

.v-text-field__details, .v-textarea__details {
  color: #1094ab;
}

.v-text-field--readonly .v-label,
.v-textarea--readonly .v-label {
  color: #1094ab !important;
}
</style>
