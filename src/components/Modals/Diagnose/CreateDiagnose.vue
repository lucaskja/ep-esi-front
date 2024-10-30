<template>
	<v-dialog
		max-width="1250"
		:model-value="true"
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
							Cadastrar Diagnóstico
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
							<v-text-field
								v-model="diagnoseRecommendedTreatment"
								label="Tratamento Recomendado"
                :clearable="true"
							/>
						</v-col>

            <v-col>
              <v-text-field
                v-model="diagnosePrescriptionMedicines"
								label="Remédios Receitados"
								:clearable="true"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="diagnoseObservations"
                label="Observações"
                :clearable="true"
              />
            </v-col>
					</v-row>

          <v-row>
						<v-col>
							<v-autocomplete
								v-model="diagnoseAppointment"
								label="Consulta"
                item-value="idAppointment"
                no-data-text="Nenhuma consulta encontrada"
                :return-object="true"
                :item-title="getAppointmentItem"
								:clearable="true"
								:items="appointments"
							/>
						</v-col>

            <v-col>
              <v-autocomplete
                v-model="diagnoseDiseases"
                label="Doença"
                item-title="diseaseName"
                item-value="idDisease"
                :multiple="true"
                :clearable="true"
                :items="diseases"
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
                color="#FA7654"
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
                color="#FAC95F"
                @click="handleCreateDiagnose"
              >
                Cadastrar Premiação para Pessoa
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

export default {
	name: 'CreateDiagnose',
	data() {
		return {
      appointments: [],
      diseases: [],
      diagnoseDiseases: null,
      diagnoseAppointment: null,
      diagnosePrescriptionMedicines: null,
      diagnoseRecommendedTreatment: null,
      diagnoseObservations: null,
			shouldShowSnackBar: false,
			snackBarMessage: '',
		}
	},
  props: {
    diagnose: Object,
    isEdit: Boolean,
  },
	async mounted() {
    this.loadDiagnostics()

		const [appointmentsResponse, diseaseResponse] = await Promise.all([
      axios.get('/appointments'),
      axios.get('/diseases'),
    ])

    this.appointments = appointmentsResponse.data
    this.diseases = diseaseResponse.data
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
    getAppointmentItem(item) {
      return `${item.startHour} - ${item.endHour} - ${item.date} | ${item.doctor.doctorName}`
    },
    loadDiagnostics() {
      if(this.diagnose) {
        console.log(this.diagnose)
        this.diagnoseDiseases = this.diagnose.diseases.map((disease) => disease.idDisease)
        this.diagnoseAppointment = this.diagnose.appointment
        this.diagnosePrescriptionMedicines = this.diagnose.prescriptionMedicines
        this.diagnoseRecommendedTreatment = this.diagnose.recommendedTreatment
        this.diagnoseObservations = this.diagnose.observations
      }
    },
		async handleCreateDiagnose() {
			try {
        await axios.post('/diagnostics', {
          recommendedTreatment: this.diagnoseRecommendedTreatment,
          prescriptionMedicines: this.diagnosePrescriptionMedicines,
          observations: this.diagnoseObservations,
          idAppointment: this.diagnoseAppointment.idAppointment,
          idDiseases: this.diagnoseDiseases,
        })

        this.snackBarMessage = 'Diagnóstico cadastrado com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Erro ao cadastrar diagnóstico, verifique os campos'
        this.shouldShowSnackBar = true
      }
		},
	}
}
</script>
