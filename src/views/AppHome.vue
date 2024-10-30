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
          color="#18435A"
          class="pa-5"
          elevation="3"
          height="500"
          width="350"
        >
          <v-row
            class="px-5"
            >
              <v-col>
                <h2
                  class="text-center"
                >
                  Cadastro
                </h2>
              </v-col>
            </v-row>

            <v-row
              v-for="option in configurationOptions"
              :key="option.title"
              class="px-5"
            >
              <v-col>
                <v-btn
                  rounded="xl"
                  @click="openModal(option.component)"
                >
                  {{ option.title }}
                </v-btn>
              </v-col>
            </v-row>
        </v-card>
      </v-col>

      <v-col
        cols="auto"
      >
        <v-card
          color="#18435A"
          class="pa-5"
          elevation="3"
          height="500"
          width="350"
        >
          <v-row>
            <v-col>
              <h2
                class="text-center"
              >
                Consulta
              </h2>
            </v-col>
          </v-row>

          <v-row
            v-for="option in consultOptions"
            :key="option.title"
            class="px-5"
          >
            <v-col>
              <v-btn
                rounded="xl"
                @click="openModal(option.component)"
              >
                {{ option.title }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <component
    :is="currentModal"
    v-if="currentModal"
    @closeModal="closeModal"
  />
</template>

<script>
import SearchDoctor from '@/components/Modals/Doctor/SearchDoctor.vue'
import SearchPatient from '@/components/Modals/Patient/SearchPatient.vue'
import CreateSchedule from '@/components/Modals/Schedule/CreateSchedule.vue'
import CreateSpeciality from '@/components/Modals/Speciality/CreateSpeciality.vue'
import CreatePatient from '@/components/Modals/Patient/CreatePatient.vue'
import CreateAppointment from '@/components/Modals/Appointment/CreateAppointment.vue'
import CreateDisease from '@/components/Modals/Disease/CreateDisease.vue'
import CreateDoctor from '@/components/Modals/Doctor/CreateDoctor.vue'
import CreateDiagnose from '@/components/Modals/Diagnose/CreateDiagnose.vue'
import SearchSchedule from '@/components/Modals/Schedule/SearchSchedule.vue'
import SearchSpeciality from '@/components/Modals/Speciality/SearchSpeciality.vue'
import SearchAppointment from '@/components/Modals/Appointment/SearchAppointment.vue'
import SearchDisease from '@/components/Modals/Disease/SearchDisease.vue'
import SearchDiagnose from '@/components/Modals/Diagnose/SearchDiagnose.vue'

export default {
  name: 'AppHome',
  components: {
    SearchDoctor,
    SearchPatient,
    CreateSchedule,
    CreateSpeciality,
    CreatePatient,
    CreateAppointment,
    CreateDisease,
    CreateDoctor,
    CreateDiagnose,
    SearchSchedule,
    SearchSpeciality,
    SearchAppointment,
    SearchDisease,
    SearchDiagnose,
},
  data() {
    return {
      currentModal: null,
      configurationOptions: [
        {
          title: 'Inserir Médico',
          component: 'CreateDoctor',
        },
        {
          title: 'Inserir Agenda',
          component: 'CreateSchedule',
        },
        {
          title: 'Inserir Especialidade',
          component: 'CreateSpeciality',
        },
        {
          title: 'Inserir Paciente',
          component: 'CreatePatient',
        },
        {
          title: 'Inserir Consulta',
          component: 'CreateAppointment',
        },
        {
          title: 'Inserir Doença',
          component: 'CreateDisease',
        },
        {
          title: 'Inserir Diagnostico',
          component: 'CreateDiagnose',
        },
      ],
      consultOptions: [
        {
          title: 'Médicos',
          component: 'SearchDoctor',
        },
        {
          title: 'Agendas',
          component: 'SearchSchedule',
        },
        {
          title: 'Especialidade',
          component: 'SearchSpeciality',
        },
        {
          title: 'Paciente',
          component: 'SearchPatient',
        },
        {
          title: 'Consulta',
          component: 'SearchAppointment',
        },
        {
          title: 'Doença',
          component: 'SearchDisease',
        },
        {
          title: 'Diagnóstico',
          component: 'SearchDiagnose',
        },
      ]
    }
  },
  methods: {
    openModal(modalName) {
      this.currentModal = modalName
    },
    closeModal() {
      this.currentModal = null
    },
  },
}
</script>
