<template>
    <v-dialog
      :model-value="true"
      max-width="1000"
    >
      <v-card>
        <v-card-title><h3>Cadastrar Novo Relatório</h3></v-card-title>
        <v-card-text>
          <v-form
            ref="reportForm"
          >
            <v-row>
              <v-col>
                <v-text-field label="Resumo da pesquisa" v-model="researchResume" required></v-text-field>
                <v-text-field label="Observação do estudante" v-model="studentObservation"></v-text-field>
                <v-text-field label="Data do exame de qualificação" v-model="qualificationExamDate" type="date"></v-text-field>
                <v-text-field label="Prazo do exame de qualificação" v-model="qualificationExamDeadline" type="date"></v-text-field>
                <v-text-field label="Data do exame de proficiência" v-model="languageProficiencyExamDate" type="date"></v-text-field>
              </v-col>

              <v-col>
                <v-text-field label="Prazo do exame de proficiência" v-model="languageProficiencyDeadline" type="date"></v-text-field>
                <v-text-field label="Prazo para a entrega da atribuição" v-model="assigmentDeadline" type="date"></v-text-field>
                <v-text-field label="Artigos em escrita" v-model="writingArticles" type="number"></v-text-field>
                <v-text-field label="Artigos em revisão" v-model="reviewingArticles" type="number"></v-text-field>
                <v-text-field label="Artigos aprovados" v-model="approvedArticles" type="number"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field label="Resumo acadêmico" v-model="academicEventsResume" required></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            text="Salvar"
            @click="registerReport"
          />
          <v-btn
            color="secondary"
            variant="text"
            text="Cancelar"
            @click="closeModal"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: 'ReportDialogs',
  data() {
    return {
      researchResume: null,
      studentObservation: null,
      qualificationExamDate: null,
      qualificationExamDeadline: null,
      languageProficiencyExamDate: null,
      assigmentDeadline: null,
      writingArticles: null,
      reviewingArticles: null,
      approvedArticles: null,
      languageProficiencyDeadline: null,
      academicEventsResume: null,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    resetForm() {
      this.professorOpinion = null
      this.professorFinalOpinion = null
      this.ccpOpinion = null
      this.ccpFinalOpinion = null
      this.academicEventsResume = null
      this.researchResume = null
      this.studentObservation = null
      this.qualificationExamDate = null
      this.qualificationExamDeadline = null
      this.languageProficiencyExamDate = null
      this.languageProficiencyDeadline = null
      this.assigmentDeadline = null
      this.writingArticles = null
      this.reviewingArticles = null
      this.approvedArticles = null
    },
    async registerReport() {
      const studentId = localStorage.getItem('userId');
      try {
        await axios.post('/performance-report', {
          studentId,
          academicEventsResume: this.academicEventsResume,
          researchResume: this.researchResume,
          studentObservation: this.studentObservation,
          qualificationExam: this.formatDate(this.qualificationExamDate),
          qualificationExamDeadline: this.formatDate(this.qualificationExamDeadline),
          languageProficiencyExamDate: this.formatDate(this.languageProficiencyExamDate),
          languageProficiencyDeadline: this.formatDate(this.languageProficiencyDeadline),
          assigmentDeadline: this.formatDate(this.assigmentDeadline),
          writingArticles: this.writingArticles,
          reviewingArticles: this.reviewingArticles,
          approvedArticles: this.approvedArticles
        });
        this.closeModal();
        this.resetForm()
        this.$emit("refreshReports")
      } catch (error) {
        console.error('Error creating report:', error);
      }
    },
  }
}
</script>

<style scoped lang="css">

</style>
