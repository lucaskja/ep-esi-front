<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          class="pa-5"
          elevation="3"
          max-height="750"
          width="1200"
        >
          <v-row class="px-5">
            <v-col>
              <h2 class="text-center">Estudantes</h2>
            </v-col>
          </v-row>

          <v-row>
            <v-data-table
              :items="flattenedStudents"
              :headers="headers"
              :group-by="groupBy"
              item-value="uspNumber"
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip text="Ver relatório">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      size="small"
                      @click="openStudentPerformanceReport(item)"
                    >
                      mdi-cursor-default-click
                    </v-icon>
                  </template>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <StudentPerformanceReportDialog
    v-if="isStudentPerformanceReportModalOpen"
    :report="studentReport"
    @closeModal="closeStudentPerformanceReportModal"
  />
</template>

<script>
import axios from "axios";

import StudentPerformanceReportDialog from "@/components/Modals/student/StudentPerformanceReportDialog.vue";

export default {
  name: 'ProfessorPerformanceReport',
  components: {
    StudentPerformanceReportDialog
  },
  data() {
    return {
      isStudentPerformanceReportModalOpen: false,
      studentReport: {},
      students: [],
      flattenedStudents: [],
      groupBy: [
        {
          key: "studentName"
        }
      ],
      headers: [
        {
          title: "Número USP",
          key: "uspNumber"
        },
        {
          title: "Nome",
          key: "studentName"
        },
        {
          title: '',
          key: 'actions',
          sortable: false
        },
      ]
    }
  },
  async mounted() {
    const professorId = localStorage.getItem("userId");
    const response = await axios.get(`/professor/${professorId}/students`);
    this.students = response.data;

    this.flattenedStudents = this.students.flatMap(student =>
      student.reports.map(report => ({
        uspNumber: student.uspNumber,
        studentName: student.studentName,
        ...report
      }))
    )
  },
  methods: {
    formatDate(dateVector) {
      if (dateVector === null || dateVector === undefined) return ""

      const [year, month, day] = dateVector;
      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    },
    openStudentPerformanceReport(item) {
      this.studentReport.professorOpinion = item.professorOpinion
      this.studentReport.professorFinalOpinion = item.professorFinalOpinion
      this.studentReport.ccpOpinion = item.ccpOpinion
      this.studentReport.ccpFinalOpinion = item.ccpFinalOpinion
      this.studentReport.academicEventsResume = item.academicEventsResume
      this.studentReport.researchResume = item.researchResume
      this.studentReport.studentObservation = item.studentObservation
      this.studentReport.qualificationExamDate = this.formatDate(item.student.exam.qualificationExamDate)
      this.studentReport.qualificationExamDeadline = this.formatDate(item.student.exam.qualificationExamDeadline)
      this.studentReport.languageProficiencyExamDate = this.formatDate(item.student.exam.languageProficiencyExamDate)
      this.studentReport.languageProficiencyExamDeadline = this.formatDate(item.student.exam.languageProficiencyExamDeadline)
      this.studentReport.assigmentDeadline = this.formatDate(item.student.exam.assigmentDeadline)
      this.studentReport.writingArticles = item.student.article.writingArticles
      this.studentReport.reviewingArticles = item.student.article.reviewingArticles
      this.studentReport.approvedArticles = item.student.article.approvedArticles

      this.isStudentPerformanceReportModalOpen = true
    },
    closeStudentPerformanceReportModal() {
      this.isStudentPerformanceReportModalOpen = false
    }
  },
}
</script>

<style scoped lang="css">

</style>
