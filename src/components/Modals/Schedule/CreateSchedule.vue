<template>
	<v-dialog
		:model-value="true"
		max-width="800"
    :persistent="true"
	>
		<v-card
      height="600"
    >
			<v-card-title>
				<v-container>
					<v-row>
						<v-col
							cols="11"
						>
							<h2>
                {{isEdit ? 'Editar Agenda' : 'Cadastrar Agenda'}}
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
				</v-container>
			</v-card-title>

			<v-card-text>
				<v-container>
					<v-row>
						<v-col>
							<v-autocomplete
								v-model="weekDay"
								label="Dias da Semana"
                hide-details
                :items="weekDays"
								:clearable="true"
							/>
						</v-col>

						<v-col
              class="d-flex align-center"
            >
							<VueDatePicker
								v-model="startHour"
                placeholder="Hora Início"
                time-picker
							/>
						</v-col>
					</v-row>

          <v-row>
            <v-col
              class="d-flex align-center"
            >
              <VueDatePicker
                v-model="endHour"
                placeholder="Hora Fim"
                time-picker
              />
            </v-col>

            <v-col>
              <v-autocomplete
                v-model="doctorCrm"
                label="Doutor"
                item-title="doctorName"
                item-value="crm"
                hide-details
                :clearable="true"
                :items="doctors"
              />
            </v-col>
          </v-row>

					<v-row
            justify="end"
          >
            <v-col
              cols="2"
            >
              <v-btn
                variant="flat"
                color="red"
                @click="closeModal"
              >
                Cancelar
              </v-btn>
            </v-col>

            <v-col
              cols="auto"
            >
              <v-btn
                variant="flat"
                color="#18435A"
                @click="handleCreateOrEditSchedule"
              >
                {{isEdit ? 'Editar Agenda' : 'Cadastrar Agenda'}}
              </v-btn>
            </v-col>
          </v-row>
				</v-container>
			</v-card-text>
		</v-card>

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
	</v-dialog>
</template>

<script>
import axios from 'axios'
import weekDays from "@/enums/weekDays"

export default {
	name: 'CreateSchedule',
  props: {
    schedule: Object,
    isEdit: Boolean,
  },
	emits: [
    'closeModal',
  ],
	data() {
		return {
			doctorCrm: null,
			doctors: [],
			startHour: null,
      weekDay: null,
			shouldShowSnackBar: false,
			snackBarMessage: '',
			endHour: null,
      weekDays,
      idSchedule: null,
    }
	},
	async mounted() {
    if(this.isEdit) this.loadSchedule()

		const response = await axios.get('/doctors')
		this.doctors = response.data
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
    closeSnackbar() {
      this.shouldShowSnackBar = false
    },
    formatHour(hour) {
      return `${String(hour.hours).padStart(2, '0')}:${String(hour.minutes).padStart(2, '0')}:${String(hour.seconds).padStart(2, '0')}`
    },
    convertHourToObject(hour) {
      const timeParts = hour.split(':')

      return {
        hours: parseInt(timeParts[0], 10),
        minutes: parseInt(timeParts[1], 10),
        seconds: parseInt(timeParts[2], 10)
      }
    },
    loadSchedule() {
      if(this.schedule) {
        this.idSchedule = this.schedule.idSchedule
        this.doctorCrm = this.schedule.doctor.crm
        this.startHour = this.convertHourToObject(this.schedule.startHour)
        this.endHour = this.convertHourToObject(this.schedule.endHour)
        this.weekDay = this.schedule.weekDay
      }
    },
		async handleCreateOrEditSchedule() {
			try {
        if(this.isEdit) {
          await axios.patch(`/schedules/${this.idSchedule}`, {
            crm: this.doctorCrm,
            weekDay: this.weekDay,
            startHour: this.formatHour(this.startHour),
            endHour: this.formatHour(this.endHour),
          })

          this.snackBarMessage = 'Agenda editada com sucesso'
          this.shouldShowSnackBar = true
        } else {
          await axios.post('/schedules', {
            crm: this.doctorCrm,
            weekDay: this.weekDay,
            startHour: this.formatHour(this.startHour),
            endHour: this.formatHour(this.endHour),
          })

          this.snackBarMessage = 'Agenda cadastrada com sucesso'
          this.shouldShowSnackBar = true
        }
      }catch (e) {
        if(this.isEdit) this.snackBarMessage = 'Erro ao editar Agenda, verifique os campos!'
        else this.snackBarMessage = 'Erro ao cadsatrar Agenda, verifique os campos!'
        this.shouldShowSnackBar = true
      }
		},
	}
}
</script>
