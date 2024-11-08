<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :subtitle="ccp.username"
        :title="ccp.name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account-check" title="Aprovar cadastro" value="myfiles" @click="shouldOpenCcpApproveStudentRegisterDialog = true"/>
      <v-list-item prepend-icon="mdi-account-plus" title="Cadastrar professor" value="shared" @click="shouldOpenRegisterProfessorDialog = true"/>
    </v-list>
  </v-navigation-drawer>

  <CcpApproveStudentRegister
    v-if="shouldOpenCcpApproveStudentRegisterDialog"
    @closeModal="shouldOpenCcpApproveStudentRegisterDialog = false"
  />

  <RegisterProfessorDialog
    v-if="shouldOpenRegisterProfessorDialog"
    @closeModal="shouldOpenRegisterProfessorDialog = false"
  />
</template>

<script>
import axios from "axios";

import CcpApproveStudentRegister from "@/components/modal/ccp/CcpApproveStudentRegisterDialog.vue";
import RegisterProfessorDialog from "@/components/modal/ccp/RegisterProfessorDialog.vue";

export default {
  name: 'CcpSideBar',
  components: {
    CcpApproveStudentRegister,
    RegisterProfessorDialog,
  },
  data() {
    return {
      ccp: {},
      shouldOpenCcpApproveStudentRegisterDialog: false,
      shouldOpenRegisterProfessorDialog: false,
    }
  },
  async beforeMount() {
    this.ccp = await this.getCcpInformation()
  },
  methods: {
    async getCcpInformation() {
      const userId = localStorage.getItem("userId")
      const response = await axios.get(`/ccp/${userId}`)

      return response.data
    }
  },
}
</script>

<style scoped>

</style>
