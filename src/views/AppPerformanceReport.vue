<template>
  <v-container
    class="mt-5"
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
      >
        <v-card
          class="pa-5 usp-card"
          elevation="3"
          width="1110"
        >
          <v-row class="px-5">
            <v-col>
              <h2
                class="text-center usp-title"
              >
                {{ titleName }}
              </h2>
            </v-col>
          </v-row>

          <v-row
            justify="center"
          >
            <v-col
              cols="6"
            >
              <v-autocomplete
                :items="students"
                item-value="studentId"
                item-title="studentName"
                label="Buscar aluno"
                v-model="selectedSearchStudent"
                no-data-text="Aluno não encontrado"
                clearable
                @click:clear="fetchAllStudents"
                @update:modelValue="fetchSelectedStudent"
              />
            </v-col>

            <v-col
              v-if="!isProfessor"
              cols="6"
            >
              <v-autocomplete
                :items="professors"
                item-title="professorName"
                item-value="professorId"
                v-model="selectedSearchProfessor"
                label="Buscar alunos por professor"
                no-data-text="Professor não encontrado"
                clearable
                @update:modelValue="fetchSelectedStudent"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card
                v-for="student in students"
                :key="student.uspNumber"
                elevation="3"
              >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <h4
                        class="panel-title"
                      >
                        {{ student.uspNumber }} - {{ student.studentName }}
                      </h4>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text
                      v-for="report in student.reports"
                      :key="report.id"
                    >
                      <v-row>
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
                            text="Ver relatório"
                            cols="auto"
                            class="usp-btn"
                            small
                            @click="openStudentPerformanceReportModal(report)"
                          />
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
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <RegisterStudentPerformanceReport
    v-if="shouldOpenRegisterStudentPerformanceReportModal"
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
import RegisterStudentPerformanceReport from "@/components/modal/RateStudentPerformanceReport.vue";
import StudentPerformanceReportDialog from "@/components/modal/student/StudentPerformanceReportDialog.vue";
import appLogin from "@/views/AppLogin.vue";
import {Logger} from "sass";

export default {
  name: 'AppPerformanceReport',
  components: {
    RegisterStudentPerformanceReport,
    StudentPerformanceReportDialog,
  },
  data() {
    return {
      selectedSearchStudent: null,
      students: [],
      professors: [],
      shouldOpenRegisterStudentPerformanceReportModal: false,
      shouldOpenStudentPerformanceReportModal: false,
      selectedPerformanceReportId: null,
      selectedStudentReport: null,
      selectedSearchProfessor: null,
      report: {
        professorOpinion: '',
        professorFinalOpinion: '',
        ccpOpinion: '',
        ccpFinalOpinion: '',
        academicEventsResume: '',
        researchResume: '',
        studentObservation: ''
      },
    };
  },
  computed: {
    titleName() {
      const role = localStorage.getItem('role').replace(/"/g, '')

      return role === 'PROFESSOR' ? 'Alunos' : 'Estudantes'
    },
    isProfessor() {
      const role = localStorage.getItem('role').replace(/"/g, '')

      return role === 'PROFESSOR'
    }
  },
  async mounted() {
    const role = localStorage.getItem('role').replace(/"/g, '')

    if (role === 'PROFESSOR') {
      await this.fetchStudentsByProfessorId()
      return
    }

    await this.fetchAllStudents()
    await this.fetchAllProfessors()
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${day}/${month}/${year}`
    },
    async fetchSelectedStudent() {
      if (
        (this.selectedSearchStudent === null || this.selectedSearchStudent === undefined)
        && (this.selectedSearchProfessor === null || this.selectedSearchProfessor === undefined)
      ) {
        await this.fetchAllStudents()
        return
      }

      if (
        (this.selectedSearchProfessor === null || this.selectedSearchProfessor === undefined)
        && (this.selectedSearchStudent != null || this.selectedSearchStudent != undefined)
      ) {
        const response = await axios.get(`/student/${this.selectedSearchStudent}`)
        console.log(this.selectedSearchStudent)

        this.students = [
          {
            uspNumber: response.data.uspNumber,
            studentName: response.data.studentInformation.name,
            reports: response.data.performanceReports
          }
        ]
        return
      }

      const response = await axios.get(`/professor/${this.selectedSearchProfessor}/students`)

      this.students = response.data.map(student => ({
        ...student,
        studentName: student.studentName,
        reports: student.reports
      }))
    },
    async fetchAllStudents() {
      const response = await axios.get('/student/all')

      this.students = response.data.map(student => ({
        ...student,
        studentName: student.studentName,
        reports: student.reports
      }))
    },
    async fetchStudentsByProfessorId() {
      const professorId = localStorage.getItem('userId')
      const response = await axios.get(`/professor/${professorId}/students`)

      this.students = response.data.map(student => ({
        ...student,
        studentName: student.studentName,
        reports: student.reports
      }))
    },
    async fetchAllProfessors() {
      const response = await axios.get('/professor/all')

      this.professors = response.data
    },
    openRegisterStudentPerformanceReport(report) {
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
    },
    canRegisterOpinion(report) {
      return (report.ccpOpinion === null || report.ccpOpinion === undefined)
        || (report.ccpFinalOpinion === null || report.ccpFinalOpinion === undefined)
    },
  }
}
</script>

<style scoped>
.panel-title {
  color: #1094ab;
}

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

<script setup>
</script>
