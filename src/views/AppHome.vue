<template>
  <CcpSideBar
    v-if="shouldShowCcpSideBar"
  />

  <StudentPerformanceReport
    v-if="shouldShowStudentView"
  />

  <AppPerformanceReport
    v-if="shouldShowPerformanceReport"
  />
</template>

<script>
import StudentPerformanceReport from "@/views/AppStudentPerformanceReport.vue";
import AppPerformanceReport from "@/views/AppPerformanceReport.vue";
import CcpSideBar from "@/components/CcpSideBar.vue";

export default {
  name: 'AppHome',
  components: {
    StudentPerformanceReport,
    AppPerformanceReport,
    CcpSideBar,
  },
  beforeMount() {
    this.witchViewRender()
  },
  data() {
    return {
      shouldShowStudentView: false,
      shouldShowPerformanceReport: false,
      shouldShowCcpSideBar: false
    }
  },
  methods: {
    witchViewRender() {
      const role = localStorage.getItem('role').replace(/"/g, '')

      if (role === 'STUDENT') this.shouldShowStudentView = true

      if (role === 'PROFESSOR' || role === 'CCP') this.shouldShowPerformanceReport = true

      if (role === 'CCP') this.shouldShowCcpSideBar = true
    }
  },
}
</script>
