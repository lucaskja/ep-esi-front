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
          color="#FFB500"
          class="pa-5"
          elevation="3"
          height="250"
          width="750"
        >
          <v-row
            class="px-5"
            >
            <v-col>
              <h2
                class="text-center text-white"
              >
                Relatórios
              </h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              class="d-flex justify-center"
            >
              <div
                v-for="(studentPerformanceReport, i) in studentPerformanceReports"
                :key="i"
                class="mr-10"
              >
                <p
                  class="text-center"
                >
                  {{ studentPerformanceReport.createdAt }}
                </p>

                <v-btn
                  color="white"
                  @click="openModal(studentPerformanceReport)"
                  variant="text"
                  text="Ver Detalhes"
                />
              </div>
            </v-col>
          </v-row>

          <v-row
            class="mt-10"
          >
            <v-col
              class="d-flex justify-center"
            >
              <v-btn
                text="Cadastrar Relatório"
                @click="isRegisterModalOpen = true"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="isViewingModalOpen" max-width="600">
    <v-card>
      <v-card-title>
        <h3>Detalhes do Relatório</h3>
      </v-card-title>

      <v-card-text>
        <div
          class="mb-5"
        >
          <h4>Professor</h4>
          <p class="ml-2">Opinião do professor: {{ selectedReport.professorOpinion }}</p>
          <p class="ml-2">Opinião final do professor: {{ selectedReport.professorFinalOpinion }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>CCP</h4>
          <p class="ml-2">Opinião da CCP: {{ selectedReport.ccpOpinion }}</p>
          <p class="ml-2">Opinião final da CCP: {{ selectedReport.ccpFinalOpinion }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Aluno</h4>
          <p class="ml-2">Resumo acadêmico: {{ selectedReport.academicEventsResume }}</p>
          <p class="ml-2">Resumo da pesquisa: {{ selectedReport.researchResume }}</p>
          <p class="ml-2">Observação do estudante: {{ selectedReport.studentObservation }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Exames</h4>
          <p class="ml-2">Data do exame de qualificação: {{ selectedReport.qualificationExamDate }}</p>
          <p class="ml-2">Prazo para o exame de qualificação: {{ selectedReport.qualificationExamDeadline }}</p>
          <p class="ml-2">Data do exame de proficiência em idiomas: {{ selectedReport.languageProficiencyExamDate }}</p>
          <p class="ml-2">Prazo para o exame de proficiência em idiomas: {{ selectedReport.languageProficiencyDeadline }}</p>
          <p class="ml-2">Prazo para a entrega da atribuição: {{ selectedReport.assigmentDeadline }}</p>
        </div>

        <div
          class="mb-5"
        >
          <h4>Artigos</h4>
          <p class="ml-2">Artigos em escrita: {{ selectedReport.writingArticles }}</p>
          <p class="ml-2">Artigos em revisão: {{ selectedReport.reviewingArticles }}</p>
          <p class="ml-2">Artigos aprovados: {{ selectedReport.approvedArticles }}</p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isViewingModalOpen = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isRegisterModalOpen" max-width="1000">
    <v-card>
      <v-card-title>
        <h3>Cadastrar Novo Relatório</h3>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="reportForm"
          v-model="isFormValid"
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
              <v-text-field label="Prazo para a entrega da atribuição" v-model="assigmentDeadline" type="date"></v-text-field>
              <v-text-field label="Artigos em escrita" v-model="writingArticles" type="number"></v-text-field>
              <v-text-field label="Artigos em revisão" v-model="reviewingArticles" type="number"></v-text-field>
              <v-text-field label="Artigos aprovados" v-model="approvedArticles" type="number"></v-text-field>
              <v-text-field label="Prazo do exame de proficiência" v-model="languageProficiencyDeadline" type="date"></v-text-field>
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
        <v-btn color="primary" text @click="registerReport">Salvar</v-btn>
        <v-btn color="secondary" text @click="isRegisterModalOpen = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import axios from "axios";

export default {
  name: 'AppHome',
  components: {

},
  data() {
    return {
      studentPerformanceReports: [],
      isViewingModalOpen: false,
      selectedReport: null,
      isRegisterModalOpen: false,
      professorOpinion: null,
      professorFinalOpinion: null,
      ccpOpinion: null,
      ccpFinalOpinion: null,
      academicEventsResume: null,
      researchResume: null,
      studentObservation: null,
      qualificationExamDate: null,
      qualificationExamDeadline: null,
      languageProficiencyExamDate: null,
      languageProficiencyDeadline: null,
      assigmentDeadline: null,
      writingArticles: null,
      reviewingArticles: null,
      approvedArticles: null,
      isFormValid: false
    }
  },
  async beforeMount() {
    await this.getStudentReports()
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
    async getStudentReports() {
      const studentId = localStorage.getItem("userId")
      const response = await axios.get(`/performance-report/student/${studentId}`)

      const { data } = response

      this.studentPerformanceReports = data
    },
    openModal(report) {
      this.selectedReport = report;
      this.isViewingModalOpen = true;
    },
    async registerReport() {
      if (this.isFormValid) {
        const studentId = localStorage.getItem("userId");
        try {
          await axios.post(`/performance-report`,
            {
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
            },
          );
          await this.getStudentReports()
          this.isRegisterModalOpen = false;
          this.resetForm();
        } catch (error) {
          console.error("Error creating report:", error);
        }
      }
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
  },
}
</script>
