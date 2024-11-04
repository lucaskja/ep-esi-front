<template>
  <v-dialog
    :model-value="true"
    max-width="600"
  >
    <v-card>
      <v-card-title><h3>Detalhes do Relatório</h3></v-card-title>
      <v-card-text>
        <div
          class="mb-5"
        >
          <h4>Professor</h4>
          <p class="ml-2">Opinião do professor: {{ report.professorOpinion }}</p>
          <p class="ml-2">Opinião final do professor: {{ report.professorFinalOpinion }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>CCP</h4>
          <p class="ml-2">Opinião da CCP: {{ report.ccpOpinion }}</p>
          <p class="ml-2">Opinião final da CCP: {{ report.ccpFinalOpinion }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Aluno</h4>
          <p class="ml-2">Resumo acadêmico: {{ report.academicEventsResume }}</p>
          <p class="ml-2">Resumo da pesquisa: {{ report.researchResume }}</p>
          <p class="ml-2">Observação do estudante: {{ report.studentObservation }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Exames</h4>
          <p class="ml-2">Data do exame de qualificação: {{ report.qualificationExamDate }}</p>
          <p class="ml-2">Prazo para o exame de qualificação: {{ report.qualificationExamDeadline }}</p>
          <p class="ml-2">Data do exame de proficiência em idiomas: {{ report.languageProficiencyExamDate }}</p>
          <p class="ml-2">Prazo para o exame de proficiência em idiomas: {{ report.languageProficiencyDeadline }}</p>
          <p class="ml-2">Prazo para a entrega da atribuição: {{ report.assigmentDeadline }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Artigos</h4>
          <p class="ml-2">Artigos em escrita: {{ report.writingArticles }}</p>
          <p class="ml-2">Artigos em revisão: {{ report.reviewingArticles }}</p>
          <p class="ml-2">Artigos aprovados: {{ report.approvedArticles }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text="Fechar"
          @click="closeViewModal"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReportDialogs',
  props: {
    report: Object,
  },
  data() {
    return {
      isFormValid: false,
    };
  },
  methods: {
    closeViewModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
