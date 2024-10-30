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
                Consultas
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
                v-model="selectedDoctor"
                label="Doutores(as)"
                item-title="doctorName"
                item-value="crm"
                hide-details
                no-data-text="Nenhum doutor(a) encontrado(a)"
                :return-object="true"
                :clearable="true"
                :items="doctors"
              />
            </v-col>

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
          v-for="appointment in appointments"
          class="mb-5"
          :key="appointment.idAppointment"
        >
          <v-container>
            <v-row>
              <v-col
                cols="8"
              >
                <h3>Doutor(a)</h3>
                <p
                  class="ml-5"
                >
                  <b>Nome:</b> {{appointment.doctor.doctorName}}
                </p>
                <p
                  class="ml-5"
                >
                  <b>CRM: </b> {{appointment.doctor.crm}}
                </p>
                <p
                  class="ml-5"
                >
                  <b>Especilidade:</b> {{appointment.speciality.specialityName}}
                </p>

                <h3
                  class="mt-4"
                >
                  Paciente
                </h3>
                <p
                  class="ml-5"
                >
                  <b>Nome:</b> {{appointment.patient.patientName}}
                </p>
                <p
                  class="ml-5"
                >
                  <b>CPF:</b> {{appointment.patient.cpf}}
                </p>
                <p
                  class="ml-5"
                >
                  <b>Idade:</b> {{appointment.patient.age}}
                </p>

                <h3
                  class="mt-4"
                >
                  Consulta
                </h3>
                <p
                  class="ml-5"
                >
                  <b>Data:</b> {{appointment.startHour}} - {{appointment.endHour}} | {{appointment.date}}
                </p>
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
                      @click="openEditAppointmentModal(appointment)"
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
                      @click="deleteAppointment(appointment)"
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

  <create-appointment
    v-if="shouldEditAppointment"
    :appointment="selectedAppointment"
    :is-edit="shouldEditAppointment"
    @close-modal="closeAppointmentModal"
    @update-patients="getAppointments"
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
import CreateAppointment from "@/components/Modals/Appointment/CreateAppointment.vue"

export default {
  name: 'SearchAppointment',
  components: {
    CreateAppointment
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      appointments: [],
      shouldEditAppointment: false,
      selectedAppointment: null,
      doctors: [],
      selectedDoctor: null,
      shouldShowSnackBar: false,
      snackBarMessage: null,
      selectedPatient: null,
      patients: []
    }
  },
  watch: {
    selectedDoctor: {
      async handler() {
        await this.getAppointments()
      },
    },
    selectedPatient: {
      async handler() {
        await this.getAppointments()
      },
    },
  },
  async mounted() {
    await Promise.all([
      await this.getDoctors(),
      await this.getPatients(),
    ])
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    closeAppointmentModal() {
      this.shouldEditAppointment = false
    },
    closeSnackBar() {
      this.shouldShowSnackBar = false
    },
    openEditAppointmentModal(appointment) {
      this.selectedAppointment = appointment
      this.shouldEditAppointment = true
    },
    async getAppointments() {
      if(!this.selectedDoctor && !this.selectedPatient) this.appointments = []
      if(this.selectedDoctor && !this.selectedPatient) await this.getAppointmentsByDoctor()
      if(!this.selectedDoctor && this.selectedPatient) await this.getAppointmentsByPatient()
    },
    async getAppointmentsByDoctor() {
      const responseAppointments = await axios.get(`/appointments/doctor/${this.selectedDoctor.crm}`)
      this.appointments = responseAppointments.data
    },
    async getAppointmentsByPatient() {
      const responseAppointments = await axios.get(`/appointments/patient/${this.selectedPatient.idPatient}`)
      this.appointments = responseAppointments.data
    },
    async getDoctors() {
      const responseDoctors = await axios.get('/doctors')
      this.doctors = responseDoctors.data
    },
    async getPatients() {
      const responsePatients = await axios.get('/patients')
      this.patients = responsePatients.data
    },
    async deleteAppointment(appointment) {
      try {
        await axios.delete(`/appointments/${appointment.idAppointment}`)

        this.snackBarMessage = 'Consulta excluida com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Consulta!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
