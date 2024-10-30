<template>
  <v-dialog
    :model-value="true"
    max-width="750"
    :persistent="true"
  >
    <v-card>
      <v-card-title>
        <v-container>
          <v-row>
            <v-col
              cols="11"
            >
              <h2>
                Diagnósticos
              </h2>
            </v-col>

            <v-col
              cols="1"
              justify="end"
            >
              <v-btn
                variant="text"
                density="comfortable"
                icon="mdi-close"
                @click="closeModal"
              />
            </v-col>
          </v-row>

          <v-row
            justify="center"
          >
            <v-col>
              <v-autocomplete
                v-model="selectedPatient"
                label="Pacientes"
                item-title="patientName"
                item-value="idPatient"
                hide-details
                no-data-text="Nenhum paciente encontrado"
                :return-object="true"
                :clearable="true"
                :items="patients"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>

      <v-card-text>
        <v-card
          v-for="diagnose in diagnoses"
          class="mb-5"
          :key="diagnose.idDiagnose"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <h3>Doutor(a)</h3>
                    <p
                      class="ml-5"
                    >
                      <b>Nome:</b> {{diagnose.appointment.doctor.doctorName}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>CRM: </b> {{diagnose.appointment.doctor.crm}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>Especilidade:</b> {{diagnose.appointment.speciality.specialityName}}
                    </p>

                    <h3
                      class="mt-4"
                    >
                      Paciente
                    </h3>
                    <p
                      class="ml-5"
                    >
                      <b>Nome:</b> {{diagnose.appointment.patient.patientName}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>CPF:</b> {{diagnose.appointment.patient.cpf}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>Idade:</b> {{diagnose.appointment.patient.age}}
                    </p>

                    <h3
                      class="mt-4"
                    >
                      Consulta
                    </h3>
                    <p
                      class="ml-5"
                    >
                      <b>Data:</b> {{diagnose.appointment.startHour}} - {{diagnose.appointment.endHour}} | {{diagnose.appointment.date}}
                    </p>

                    <h3
                      class="mt-4"
                    >
                      Diagnóstico
                    </h3>
                    <p
                      class="ml-5"
                    >
                      <b>Doença(s): </b>
                      <span
                        v-for="disease in diagnose.diseases"
                        :key="disease.idDisease"
                      >
                        {{disease.diseaseName}}
                      </span>
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>Tratamento Recomendado:</b> {{diagnose.recommendedTreatment}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>Medicações prescritas:</b> {{diagnose.prescriptionMedicines}}
                    </p>
                    <p
                      class="ml-5"
                    >
                      <b>Observações:</b> {{diagnose.observations}}
                    </p>
                  </v-col>

                  <v-col
                    class="d-flex align-center"
                    cols="auto"
                  >
                    <v-tooltip
                      text="Editar Doença"
                      location="top"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          variant="flat"
                          color="#18435A"
                          icon="mdi-pencil"
                          v-bind="props"
                          @click="openEditDiagnoseModal(diagnose)"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>

                  <v-col
                    class="d-flex align-center"
                    cols="auto"
                  >
                    <v-tooltip
                      text="Excluir Doença"
                      location="top"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          variant="flat"
                          color="red"
                          icon="mdi-delete"
                          v-bind="props"
                          @click="deleteDiagnose(diagnose)"
                        />
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>

  <create-diagnose
    v-if="shouldEditDiagnose"
    :diagnose="selectedDiagnose"
    :is-edit="shouldEditDiagnose"
    @close-modal="closeDiagnoseModal"
  />

  <v-snackbar
    v-model="shouldShowSnackBar"
    color="#FAC95F"
    elevation="24"
    :timeout="2000"
    location="center"
  >
    <p>{{ snackBarMessage }}</p>

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="closeSnackBar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import axios from 'axios'
import CreateDiagnose from "@/components/Modals/Diagnose/CreateDiagnose.vue"

export default {
  name: 'SearchDiagnose',
  components: {
    CreateDiagnose,
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      patients: [],
      diagnoses: [],
      shouldEditDiagnose: false,
      selectedDiagnose: null,
      selectedPatient: null,
      shouldShowSnackBar: false,
      snackBarMessage: null,
    }
  },
  watch: {
    selectedPatient: {
      async handler(patient) {
        if(!patient) this.diagnoses = []

        await this.getPatientDiagnose()
      },
    },
  },
  async mounted() {
    await this.getPatients()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    closeDiagnoseModal() {
      this.shouldEditDiagnose = false
    },
    closeSnackBar() {
      this.shouldShowSnackBar = false
    },
    openEditDiagnoseModal(diagnose) {
      this.selectedDiagnose = diagnose
      this.shouldEditDiagnose = true
    },
    async getPatientDiagnose() {
      const responseDiagnoses = await axios.get(`/diagnostics/patient/${this.selectedPatient.idPatient}`)
      this.diagnoses = responseDiagnoses.data
    },
    async getPatients() {
      const responsePatients = await axios.get('/patients')
      this.patients = responsePatients.data
    },
    async deleteDiagnose(diagnose) {
      try {
        await axios.delete(`/diagnostics/${diagnose.idDiagnostic}`)

        this.snackBarMessage = 'Diagnóstico excluido com sucesso'
        this.shouldShowSnackBar = true

        await this.getPatientDiagnose()
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Doença!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
