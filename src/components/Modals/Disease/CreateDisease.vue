<template>
	<v-dialog
		max-width="750"
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
              {{isEdit ? 'Editar Doença' : 'Cadastrar Doença'}}
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
								v-model="diseaseName"
								label="Nome da Doença"
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
                @click="handleCreateOrEditDisease"
              >
                {{isEdit ? 'Editar Doença' : 'Cadastrar Doença'}}
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
	name: 'CreateDisease',
  props: {
    disease: Object,
    isEdit: Boolean,
  },
	data() {
		return {
			diseaseName: null,
			shouldShowSnackBar: false,
			snackBarMessage: '',
		}
	},
  mounted() {
    this.loadDisease()
  },
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
    closeSnackbar() {
      this.shouldShowSnackBar = false
    },
    loadDisease() {
      this.diseaseName = this.disease.diseaseName
    },
		async handleCreateOrEditDisease() {
      try {
        if(this.isEdit) {
          await axios.patch(`/diseases/${this.disease.idDisease}`, {
            diseaseName: this.diseaseName
          })

          this.snackBarMessage = 'Doença atualizada com sucesso'
          this.shouldShowSnackBar = true
        } else {
          await axios.post('/diseases', {
            diseaseName: this.diseaseName
          })

          this.snackBarMessage = 'Doença cadastrada com sucesso'
          this.shouldShowSnackBar = true
        }
      } catch (e) {
        this.snackBarMessage = 'Erro ao cadastrar doença, verifique os campos!'
        this.shouldShowSnackBar = true
      }
		},
	}
}
</script>
