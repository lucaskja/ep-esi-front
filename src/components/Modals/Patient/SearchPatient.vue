<template>
  <v-dialog
    :model-value="true"
    max-width="800"
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
                Pacientes
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
          v-for="patient in patients"
          class="mb-5"
          :key="patient.idPatient"
        >
          <v-container>
            <v-row>
              <v-col
                cols="8"
              >
                <p><b>Nome:</b> {{patient.patientName}} </p>
                <p><b>CPF:</b> {{patient.cpf}} </p>
                <p><b>Telefone:</b> {{patient.patientPhone}} </p>
                <p><b>Endereço:</b> {{patient.address}} </p>
                <p><b>Idade:</b> {{patient.age}} </p>
                <p><b>Sexo:</b> {{translatePatientGender(patient.gender)}} </p>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Editar Paciente"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="#18435A"
                      icon="mdi-pencil"
                      v-bind="props"
                      @click="openEditPatientModal(patient)"
                    />
                  </template>
                </v-tooltip>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Excluir Paciente"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="red"
                      icon="mdi-delete"
                      v-bind="props"
                      @click="deletePatient(patient)"
                    />
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>

  <create-patient
    v-if="shouldEditPatient"
    :patient="selectedPatient"
    :is-edit="shouldEditPatient"
    @close-modal="closePatientModal"
    @update-patients="getPatients"
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
import CreatePatient from "@/components/Modals/Patient/CreatePatient.vue";

export default {
  name: 'MostAwardedPerson',
  components: {
    CreatePatient
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      shouldEditPatient: false,
      selectedPatient: null,
      patients: [],
      shouldShowSnackBar: false,
      snackBarMessage: null,
    }
  },
  async mounted() {
    await this.getPatients()
  },
  methods: {
    closeModal() {
			this.$emit('closeModal')
    },
    closePatientModal() {
      this.shouldEditPatient = false
    },
    closeSnackBar() {
      this.shouldShowSnackBar = false
    },
    openEditPatientModal(patient) {
      this.selectedPatient = patient
      this.shouldEditPatient = true
    },
    async getPatients() {
      const responsePatients = await axios.get('/patients')
      this.patients = responsePatients.data
    },
    translatePatientGender(gender) {
      const genders = {
        'MALE': 'Masculino',
        'FEMALE': 'Feminino',
      }

      return genders[gender]
    },
    async deletePatient(patient) {
      try {
        await axios.delete(`/patients/${patient.idPatient}`)

        await this.getPatients()

        this.snackBarMessage = 'Paciente excluido com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Paciente!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
