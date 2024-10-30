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
               Agendas
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

            <v-col
              v-if="selectedDoctor"
            >
              <v-autocomplete
                v-model="selectedWeekDay"
                label="Dias da Semana"
                :clearable="true"
                hide-details
                :items="weekDays"
              />
            </v-col>
          </v-row>
				</v-container>
			</v-card-title>

      <v-card-text>
        <v-card
          v-for="schedule in schedules"
          class="mb-5"
          :key="schedule.idSchedule"
        >
          <v-container>
            <v-row>
              <v-col
                cols="8"
              >
                <p><b>Doutor(a):</b> {{schedule.doctor.doctorName}} </p>
                <p><b>Hora Início:</b> {{schedule.startHour}} </p>
                <p><b>Hora Fim:</b> {{schedule.endHour}} </p>
                <p><b>Dia da Semana:</b> {{handleWeekDay(schedule.weekDay)}} </p>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Editar Agenda"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="#18435A"
                      icon="mdi-pencil"
                      v-bind="props"
                      @click="openEditScheduleModal(schedule)"
                    />
                  </template>
                </v-tooltip>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Excluir Agenda"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="red"
                      icon="mdi-delete"
                      v-bind="props"
                      @click="deleteSchedule(schedule)"
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

  <create-schedule
    v-if="shouldEditSchedule"
    :schedule="selectedSchedule"
    :is-edit="shouldEditSchedule"
    @close-modal="closeScheduleModal"
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
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import axios from 'axios'
import CreateSchedule from "@/components/Modals/Schedule/CreateSchedule.vue"
import weekDays from "@/enums/weekDays"

export default {
  name: 'SearchSchedule',
  emits: [
    'closeModal'
  ],
  components: {
    CreateSchedule
  },
  data()  {
    return {
      selectedSchedule: null,
      selectedDoctor: null,
      shouldEditSchedule: false,
      selectedWeekDay: null,
      weekDays,
      doctors: [],
      schedules: [],
      shouldShowSnackBar: false,
      snackBarMessage: '',
    }
  },
  watch: {
    selectedDoctor: {
      async handler(doctor) {
        if(!doctor) {
          this.schedules = []
          this.selectedWeekDay = null
          return
        }

        await this.getSchedules()
      },
    },
    selectedWeekDay: {
      async handler(weekDay) {
        if(!weekDay) {
          this.selectedWeekDay = null
          await this.getSchedules()
          return
        }

        await this.getSchedulesByWeekDay()
      },
    },
  },
  async mounted() {
    await this.getDoctors()
  },
  methods: {
    closeModal() {
			this.$emit('closeModal')
    },
    closeScheduleModal() {
      this.shouldEditSchedule = false
    },
    closeSnackbar() {
      this.shouldShowSnackBar = false
    },
    openEditScheduleModal(schedule) {
      this.selectedSchedule = schedule
      this.shouldEditSchedule = true
    },
    async getDoctors() {
      const doctorsResponse = await axios.get('/doctors')
      this.doctors = doctorsResponse.data
    },
    async getSchedules() {
      const schedulesResponse = await axios.get(`/schedules/${this.selectedDoctor.crm}`)
      this.schedules = schedulesResponse.data
    },
    async getSchedulesByWeekDay() {
      const schedulesResponse = await axios.get(`/schedules/${this.selectedDoctor.crm}/${this.selectedWeekDay}`)
      this.schedules = schedulesResponse.data
    },
    handleWeekDay(weekDay) {
      const weekDays = {
        'MONDAY': 'Segunda-Feira',
        'TUESDAY': 'Terça-Feira',
        'WEDNESDAY': 'Quarta-Feira',
        'THURSDAY': 'Quinta-feira',
        'FRIDAY': 'Sexta-Feira',
        'SATURDAY': 'Sábado',
        'SUNDAY': 'Domingo',
      }

      return weekDays[weekDay]
    },
    async deleteSchedule(schedule) {
      try {
        await axios.delete(`/schedules/${schedule.idSchedule}`)

        await this.getSchedules()

        this.snackBarMessage = 'Agenda excluida com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Agenda!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
