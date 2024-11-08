<template>
  <v-dialog
    :model-value="true"
    max-width="1350"
    @click:outside="closeModal"
  >
    <v-card class="usp-card">
      <v-card-title class="usp-title">
        <h3>Aprovar cadastro</h3>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :items="students"
          item-value="id"
          item-title="uspNumber"
          :headers="header"
        >
          <template v-slot:item.approve="{ item }">
            <v-icon
              class="me-2"
              @click="approveStudent(item)"
            >
              mdi-check-circle-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="1">
              <v-btn
                class="usp-close-btn"
                text="Fechar"
                @click="closeModal"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: 'CcpApproveStudentRegister',
  data() {
    return {
      students: [],
      header: [
        {
          title: 'Nome',
          key: 'studentInformation.name'
        },
        {
          title: 'Número USP',
          key: 'uspNumber'
        },
        {
          title: "Professor",
          key: "professor.name"
        },
        {
          title: '',
          key: 'approve',
        }
      ],
    }
  },
  async beforeMount() {
    await this.getStudentsWithPendentStatus()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async getStudentsWithPendentStatus() {
      const response = await axios.get('/student/pendent-students')

      this.students = response.data
    },
    async approveStudent(student) {
      await axios.patch(`/ccp/register/approve/student/${student.id}`)
      await this.getStudentsWithPendentStatus()
    },
  },
};
</script>

<style scoped>
.usp-card {
  border-top: 5px solid #1094ab;
  background-color: #f7f7f7;
}

.usp-title h3 {
  color: #1094ab;
  font-weight: bold;
}

.usp-close-btn {
  color: #FFB500;
}
</style>
