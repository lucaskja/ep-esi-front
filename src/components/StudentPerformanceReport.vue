<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card color="#FFB500" class="pa-5" elevation="3" height="250" width="750">
          <v-row class="px-5">
            <v-col>
              <h2 class="text-center text-white">Relatórios</h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-center">
              <div v-for="(report, i) in reports" :key="i" class="mr-10">
                <p class="text-center">{{ report.createdAt }}</p>
                <v-btn
                  color="white"
                  @click="openStudentPerformanceReportModal(report)"
                  variant="text"
                  text="Ver Detalhes"
                />
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col class="d-flex justify-center">
              <v-btn
                text="Cadastrar Relatório"
                @click="openRegisterModal"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

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
  </v-container>
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

</style>
