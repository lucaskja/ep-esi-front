<template>
	<v-dialog
		:model-value="true"
		max-width="800"
		persistent
	>
		<v-card>
			<v-card-title>
				<v-container>
					<v-row>
						<v-col
							cols="11"
						>
							<h2>
                {{isEdit ? 'Editar Paciente' : 'Cadastrar Paciente'}}
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
								v-model="patientName"
								label="Nome"
								:clearable="true"
							/>
						</v-col>

						<v-col>
							<v-text-field
								v-model="patientCpf"
								label="CPF"
                :disabled="isEdit"
								:clearable="true"
							/>
						</v-col>

            <v-col>
              <v-text-field
                v-model="patientPhone"
                label="Telefone"
                :clearable="true"
              />
            </v-col>
					</v-row>

					<v-row>
						<v-col>
							<v-text-field
								v-model="patientAddress"
								label="Endereço"
								:clearable="true"
							/>
						</v-col>

            <v-col>
              <v-text-field
                v-model="patientAge"
                label="Idade"
                :clearable="true"
              />
            </v-col>

            <v-col>
              <v-autocomplete
                v-model="patientGender"
                label="Gênero"
                :items="genders"
                :clearable="true"
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
                @click="handleCreatePatientOrEdit"
              >
                {{isEdit ? 'Editar Paciente' : 'Cadastrar Paciente'}}
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
	name: 'CreatePatient',
  props: {
    patient: Object,
    isEdit: Boolean,
  },
	emits: [
    'closeModal',
    'updatePatients',
  ],
	data() {
		return {
      genders: [
        {
          title: 'Masculino',
          value: 'MALE',
        },
        {
          title: 'Feminino',
          value: 'FEMALE',
        },
      ],
			patientName: null,
			patientCpf: null,
			patientPhone: null,
      patientAddress: null,
      patientAge: null,
      patientGender: null,
			snackBarMessage: '',
			shouldShowSnackBar: false,
		}
	},
  mounted() {
    this.loadPatient()
  },
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
    closeSnackbar() {
      this.shouldShowSnackBar = false
    },
    loadPatient() {
      if(this.patient) {
        this.patientName = this.patient.patientName
        this.patientCpf = this.patient.cpf
        this.patientPhone = this.patient.patientPhone
        this.patientAddress = this.patient.address
        this.patientAge = this.patient.age
        this.patientGender= this.patient.gender
      }
    },
		async handleCreatePatientOrEdit() {
      try {
        if(this.isEdit) {
          await axios.patch(`/patients/${this.patient.idPatient}`, {
            patientName: this.patientName,
            cpf: this.patientCpf,
            patientPhone: this.patientPhone,
            address: this.patientAddress,
            age: parseInt(this.patientAge),
            gender: this.patientGender,
          })

          this.snackBarMessage = 'Paciente atualizado com sucesso'
          this.shouldShowSnackBar = true
          this.$emit('updatePatients')
        } else {
          await axios.post('/patients', {
            patientName: this.patientName,
            cpf: this.patientCpf,
            patientPhone: this.patientPhone,
            address: this.patientAddress,
            age: parseInt(this.patientAge),
            gender: this.patientGender,
          })

          this.snackBarMessage = 'Paciente cadastrado com sucesso'
          this.shouldShowSnackBar = true
        }
      } catch (e) {
        this.snackBarMessage = 'Erro ao cadastrar usuário, verifique os campos!'
        this.shouldShowSnackBar = true
      }
		},
	}
}
</script>
]
