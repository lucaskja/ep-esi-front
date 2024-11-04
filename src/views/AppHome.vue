<template>
  <StudentPerformanceReport
    v-if="shouldShowStudentView"
  />

  <ProfessorPerformanceReport
    v-if="shouldShowProfessorView"
  />
</template>

<script>
import StudentPerformanceReport from "@/components/StudentPerformanceReport.vue";
import ProfessorPerformanceReport from "@/components/ProfessorPerformanceReport.vue";

export default {
  name: 'ReportList',
  components: {
    StudentPerformanceReport,
    ProfessorPerformanceReport,
  },
  beforeMount() {
    this.witchViewRender()
  },
  data() {
    return {
      shouldShowStudentView: false,
      shouldShowProfessorView: false,
      shouldShowCcpView: false,
    }
  },
  methods: {
    witchViewRender() {
      const role = localStorage.getItem("role").replace(/"/g, '')

      if (role === "STUDENT") this.shouldShowStudentView = true

      if (role === "PROFESSOR") this.shouldShowProfessorView = true

      if (role === "CCP") this.shouldShowCcpView = true
    }
  },
}
</script>
