<!--<template>-->
<!--  <v-container class="mt-5">-->
<!--    <v-row justify="center">-->
<!--      <v-col cols="auto">-->
<!--        <v-card color="#FFB500" class="pa-5" elevation="3" height="250" width="750">-->
<!--          <v-row class="px-5">-->
<!--            <v-col>-->
<!--              <h2 class="text-center text-white">Relatórios</h2>-->
<!--            </v-col>-->
<!--          </v-row>-->

<!--          <v-row>-->
<!--            <v-col class="d-flex justify-center">-->
<!--              <div v-for="(report, i) in reports" :key="i" class="mr-10">-->
<!--                <p class="text-center">{{ report.createdAt }}</p>-->
<!--                <v-btn-->
<!--                  color="white"-->
<!--                  @click="openStudentPerformanceReportModal(report)"-->
<!--                  variant="text"-->
<!--                  text="Ver Detalhes"-->
<!--                />-->
<!--              </div>-->
<!--            </v-col>-->
<!--          </v-row>-->

<!--          <v-row class="mt-10">-->
<!--            <v-col class="d-flex justify-center">-->
<!--              <v-btn-->
<!--                text="Cadastrar Relatório"-->
<!--                @click="openRegisterModal"-->
<!--              />-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--    <StudentPerformanceReportDialog-->
<!--      v-if="isStudentPerformanceReportModalOpen"-->
<!--      :report="selectedReport"-->
<!--      @closeModal="closeStudentPerformanceReportModal"-->
<!--    />-->

<!--    <RegisterPerformanceReport-->
<!--      v-if="isRegisterPerformanceReportModalOpen"-->
<!--      @refreshReports="fetchReports"-->
<!--      @closeModal="closeRegisterPerformanceReportModal"-->
<!--    />-->
<!--  </v-container>-->
<!--</template>-->

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
      <v-expansion-panels
        class="panel"
      >
        <v-expansion-panel>
          <v-expansion-panel-title>
            Relatório {{ index + 1 }} - {{report.createdAt}}
          </v-expansion-panel-title>
          <v-expansion-panel-text>

            <v-card-subtitle class="subtitle">Professor</v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Opinião do professor"
                  :model-value="report.professorOpinion"
                  readonly
                  color="#FFB500">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Opinião final do professor"
                  :model-value="report.professorFinalOpinion"
                  readonly
                  color="#FFB500">
                </v-text-field>
              </v-col>
            </v-row>

            <v-card-subtitle class="subtitle">CCP</v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Opinião da CCP"
                  :model-value="report.ccpOpinion"
                  readonly
                  color="#FFB500">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Opinião final da CCP"
                  :model-value="report.ccpFinalOpinion"
                  readonly
                  color="#FFB500">
                </v-text-field>
              </v-col>
            </v-row>

            <v-card-subtitle class="subtitle">Aluno</v-card-subtitle>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Resumo acadêmico"
                  :model-value="report.academicEventsResume"
                  readonly
                  color="#00c5d4">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Resumo da pesquisa"
                  :model-value="report.researchResume"
                  readonly
                  color="#00c5d4">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Observação do estudante"
                  :model-value="report.studentObservation"
                  readonly
                  color="#00c5d4">
                </v-text-field>
              </v-col>
            </v-row>

            <!-- Exams Section -->
            <v-card-subtitle class="subtitle">Exames</v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Data do exame de qualificação"
                  :model-value="report.qualificationExamDate"
                  readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Prazo para o exame de qualificação"
                  :model-value="report.qualificationExamDeadline"
                  readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Data do exame de proficiência em idiomas"
                  :model-value="report.languageProficiencyExamDate"
                  readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Prazo para a entrega da atribuição"
                  :model-value="report.assigmentDeadline"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>

            <v-card-subtitle class="subtitle">Artigos</v-card-subtitle>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Artigos em escrita"
                  :model-value="report.writingArticles"
                  readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Artigos em revisão"
                  :model-value="report.reviewingArticles"
                  readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Artigos aprovados"
                  :model-value="report.approvedArticles"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>

          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row>
      <v-col
        class="d-flex justify-center mt-10"
      >
        <v-btn
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
import StudentPerformanceReportDialog from "@/components/Modals/student/StudentPerformanceReportDialog.vue";
import RegisterPerformanceReport from "@/components/Modals/student/RegisterPerformanceReport.vue";
import axios from "axios";

export default {
  name: 'StudentPerformanceReport',
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
  async mounted() {
    await this.fetchReports()
  },
  methods: {
    closeStudentPerformanceReportModal() {
      this.isStudentPerformanceReportModalOpen = false
    },
    openStudentPerformanceReportModal(report) {
      this.selectedReport = report
      this.isStudentPerformanceReportModalOpen = true
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
