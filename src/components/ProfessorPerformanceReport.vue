<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="pa-5 usp-card" elevation="3" width="1110">
          <v-row class="px-5">
            <v-col>
              <h2 class="text-center usp-title">Estudantes</h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-data-table
                v-model:expanded="expanded"
                :items="students"
                :headers="headers"
                item-value="uspNumber"
                class="elevation-1 usp-table"
                show-expand
                dense
              >
                <template v-slot:expanded-row="{ item }">
                  <v-container
                    fluid
                  >
                    <v-row
                      v-for="report in item.reports"
                      :key="report.id"
                      class="pl-10"
                      justify="center"
                    >
                      <v-col
                        cols="auto"
                        class="d-flex align-center"
                      >
                        Relatório {{ formatDate(report.createdAt) }}
                      </v-col>

                      <v-col
                        class="d-flex align-center justify-center"
                        cols="auto"
                      >
                        <v-btn
                          v-if="canRegisterOpinion(report)"
                          text="Avaliar Relatório"
                          cols="auto"
                          class="usp-btn"
                          small
                          @click="openRegisterStudentPerformanceReport(report)"
                        />
                      </v-col>

                      <v-col
                        class="d-flex align-center justify-center"
                        cols="auto"
                      >
                        <v-btn
                          text="Ver relatório"
                          cols="auto"
                          class="usp-btn"
                          small
                          @click="openStudentPerformanceReportModal(report)"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <RegisterStudentPerformanceReport
    v-if="shouldOpenRegisterStudentPerformanceReportModal"
    :professor-id="professorId"
    :performance-report-id="selectedPerformanceReportId"
    @closeModal="shouldOpenRegisterStudentPerformanceReportModal = false"
  />

  <StudentPerformanceReportDialog
    v-if="shouldOpenStudentPerformanceReportModal"
    :report="selectedStudentReport"
    @closeModal="shouldOpenStudentPerformanceReportModal = false"
  />
</template>

<script>
import axios from 'axios';
import RegisterStudentPerformanceReport from "@/components/Modals/professor/RegisterStudentPerformanceReport.vue";
import StudentPerformanceReportDialog from "@/components/Modals/student/StudentPerformanceReportDialog.vue";

export default {
  name: 'ProfessorPerformanceReport',
  components: {
    RegisterStudentPerformanceReport,
    StudentPerformanceReportDialog,
  },
  data() {
    return {
      expanded: [],
      students: [],
      shouldOpenRegisterStudentPerformanceReportModal: false,
      shouldOpenStudentPerformanceReportModal: false,
      professorId: null,
      selectedPerformanceReportId: null,
      selectedStudentReport: null,
      report: {
        professorOpinion: '',
        professorFinalOpinion: '',
        ccpOpinion: '',
        ccpFinalOpinion: '',
        academicEventsResume: '',
        researchResume: '',
        studentObservation: ''
      },
      isDialogOpen: false,
      isEditMode: false,
      headers: [
        { title: 'Número USP', value: 'uspNumber', key: 'uspNumber' },
        { title: 'Nome', value: 'studentName' },
        { title: '', value: 'actions', sortable: false }
      ]
    };
  },
  async mounted() {
    await this.fetchStudents();
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
    async fetchStudents() {
      const professorId = localStorage.getItem('userId');
      const response = await axios.get(`/professor/${professorId}/students`);
      this.students = response.data.map(student => ({
        ...student,
        studentName: student.studentName,
        reports: student.reports
      }));
    },
    openRegisterStudentPerformanceReport(report) {
      this.professorId = report.student.professor.id
      this.selectedPerformanceReportId = report.id
      this.shouldOpenRegisterStudentPerformanceReportModal = true
    },
    openStudentPerformanceReportModal(report){
      this.shouldOpenStudentPerformanceReportModal = true
      this.selectedStudentReport = {
        ...report,
        qualificationExamDate: this.formatDate(report.student.exam.qualificationExamDate),
        qualificationExamDeadline: this.formatDate(report.student.exam.qualificationExamDeadline),
        languageProficiencyExamDate: this.formatDate(report.student.exam.languageProficiencyExamDate),
        languageProficiencyDeadline: this.formatDate(report.student.exam.languageProficiencyDeadline),
        assigmentDeadline: this.formatDate(report.student.exam.languageProficiencyExamDate),
        writingArticles: report.student.article.writingArticles,
        reviewingArticles: report.student.article.reviewingArticles,
        approvedArticles: report.student.article.approvedArticles
      }
      this.selectedStu
    },
    canRegisterOpinion(report) {
      if (
        (report.professorOpinion === null || report.professorOpinion === undefined)
        || (report.professorFinalOpinion === null || report.professorFinalOpinion === undefined)
      ) return true

      return false
    }
  }
};
</script>

<style scoped>
/* USP Style Colors */
.usp-title {
  color: #FFB500;
}

.usp-card {
  border-top: 5px solid #1094ab;
  background-color: #f7f7f7;
}

.usp-table thead th {
  background-color: #1094ab;
  color: white;
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

.student-report {
  width: 100%;
}
</style>
