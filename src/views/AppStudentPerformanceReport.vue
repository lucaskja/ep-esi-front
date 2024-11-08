<template>
  <v-container>
    <v-card
      class="mx-auto"
      color="#1094ab"
      dark
    >
      <v-card-title
        class="text-h5"
      >
        Relatórios dos Estudantes
      </v-card-title>
    </v-card>

    <v-row
      v-for="(report, index) in reports"
      :key="index"
      class="mt-4"
      justify="center"
    >
      <v-col
        cols="auto"
      >
        <v-expansion-panels
          class="panel"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              Relatório {{ index + 1 }} - {{report.createdAt}}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card-subtitle>
                <strong>
                  Professor
                </strong>
              </v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-textarea
                      label="Opinião do professor"
                      :model-value="report.professorOpinion"
                      readonly
                      color="#FFB500"
                      hide-details="auto"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Opinião final do professor"
                      :model-value="report.professorFinalOpinion"
                      readonly
                      color="#FFB500"
                      hide-details="auto"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-subtitle>
                <strong>
                  CCP
                </strong>
              </v-card-subtitle>
              <v-card-text
                class="mb-10"
              >
                <v-row>
                  <v-col>
                    <v-textarea
                      label="Opinião da CCP"
                      :model-value="report.ccpOpinion"
                      readonly
                      color="#FFB500"
                      hide-details="auto"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Opinião final da CCP"
                      :model-value="report.ccpFinalOpinion"
                      readonly
                      color="#FFB500"
                      hide-details="auto"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-subtitle>
                <strong>
                  Aluno
                </strong>
              </v-card-subtitle>
              <v-card-text
                class="mb-10"
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Resumo acadêmico"
                      :model-value="report.academicEventsResume"
                      readonly
                      color="#00c5d4"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Resumo da pesquisa"
                      :model-value="report.researchResume"
                      readonly
                      color="#00c5d4"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Observação do estudante"
                      :model-value="report.studentObservation"
                      readonly
                      color="#00c5d4"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
      >
        <v-expansion-panels
          class="panel"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              Exames
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-card-text
                class="mb-10"
              >
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      label="Data do exame de qualificação"
                      :model-value="reports[0]?.qualificationExamDate"
                      readonly
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      label="Prazo para o exame de qualificação"
                      :model-value="reports[0]?.qualificationExamDeadline"
                      readonly
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      label="Data do exame de proficiência em idiomas"
                      :model-value="reports[0]?.languageProficiencyExamDate"
                      readonly
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      label="Prazo para exame de proeficiência em idiomas"
                      :model-value="reports[0]?.languageProficiencyDeadline"
                      readonly
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Prazo para a entrega da atribuição"
                      :model-value="reports[0]?.assigmentDeadline"
                      readonly
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
      >
        <v-expansion-panels
          class="panel"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              Artigos
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Artigos em escrita"
                      :model-value="reports[0]?.writingArticles"
                      readonly>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      label="Artigos em revisão"
                      :model-value="reports[0]?.reviewingArticles"
                      readonly>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      label="Artigos aprovados"
                      :model-value="reports[0]?.approvedArticles"
                      readonly>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-expansion-panel-text>

          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="d-flex justify-center mt-10"
      >
        <v-btn
          v-if="lastReportIsAlreadyFinished"
          text="Cadastrar Relatório"
          @click="openRegisterModal"
        />
      </v-col>
    </v-row>
  </v-container>

      <StudentPerformanceReportDialog
        v-if="isStudentPerformanceReportModalOpen"
        :report="selectedReport"
        @closeModal="closeStudentPerformanceReportModal"
      />

      <RegisterPerformanceReport
        v-if="isRegisterPerformanceReportModalOpen"
        @refreshReports="fetchReports"
        @closeModal="closeRegisterPerformanceReportModal"
      />
</template>

<script>
import StudentPerformanceReportDialog from "@/components/modal/student/StudentPerformanceReportDialog.vue";
import RegisterPerformanceReport from "@/components/modal/student/RegisterStudentPerformanceReportDialog.vue";
import axios from "axios";

export default {
  name: 'AppStudentPerformanceReport',
  components: {
    StudentPerformanceReportDialog,
    RegisterPerformanceReport,
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
    lastReportIsAlreadyFinished() {
      const reportsLength = this.reports.length

      const ccpOpinion = this.reports[reportsLength - 1]?.ccpOpinion
      const ccpFinalOpinion = this.reports[reportsLength - 1]?.ccpFinalOpinion
      const professorOpinion = this.reports[reportsLength - 1]?.professorOpinion
      const professorFinalOpinion = this.reports[reportsLength - 1]?.professorFinalOpinion

      if (
        (ccpOpinion === null || ccpOpinion === undefined)
        || (ccpFinalOpinion === null || ccpFinalOpinion === undefined)
        || (professorOpinion === null || professorOpinion !== undefined)
        || (professorFinalOpinion === null || professorFinalOpinion === undefined)
      ) return false

      return true
    },
  },
  async mounted() {
    await this.fetchReports()
  },
  methods: {
    closeStudentPerformanceReportModal() {
      this.isStudentPerformanceReportModalOpen = false
    },
    closeRegisterPerformanceReportModal() {
      this.isRegisterPerformanceReportModalOpen = false
    },
    openRegisterModal() {
      this.isRegisterPerformanceReportModalOpen = true
    },
    async fetchReports() {
      const studentId = localStorage.getItem('userId')
      const response = await axios.get(`/performance-report/student/${studentId}`)
      this.reports = response.data
    },
  },
}
</script>

<style scoped lang="css">
.panel {
  width: 800px !important;
}
</style>
