<template>
  <StudentPerformanceReport
    v-if="shouldShowStudentView"
  />

  <PerformanceReport
    v-if="shouldShowPerformanceReport"
  />
</template>

<script>
import StudentPerformanceReport from "@/views/AppStudentPerformanceReport.vue";
import PerformanceReport from "@/views/AppPerformanceReport.vue";

export default {
  name: 'ReportList',
  components: {
    StudentPerformanceReport,
    PerformanceReport
  },
  beforeMount() {
    this.witchViewRender()
  },
  data() {
    return {
      shouldShowStudentView: false,
      shouldShowPerformanceReport: false,
    }
  },
  methods: {
    witchViewRender() {
      const role = localStorage.getItem("role").replace(/"/g, '')

      if (role === "STUDENT") this.shouldShowStudentView = true

      if (role === "PROFESSOR" || role === "CCP") this.shouldShowPerformanceReport = true
    }
  },
}
</script>
