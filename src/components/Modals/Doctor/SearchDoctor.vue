<template>
	<v-dialog
		:model-value="true"
		max-width="600"
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
                Médicos
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
            <v-col
              cols="6"
            >
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
          </v-row>
				</v-container>
			</v-card-title>

			<v-card-text>
        <v-card
          v-for="doctor in doctors"
          class="mb-5"
          :key="doctor.crm"
        >
          <v-container>
            <v-row>
              <v-col
                cols="8"
              >
                <p><b>Crm:</b> {{ doctor.crm }}</p>
                <p><b>Nome:</b> {{ doctor.doctorName }}</p>
                <p><b>Telefone:</b> {{ doctor.doctorPhone }}</p>
                <p><b>Porcentagem:</b> {{ doctor.percentage }}</p>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Editar Doutor"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="#18435A"
                      icon="mdi-pencil"
                      v-bind="props"
                      @click="openEditDoctorModal(doctor)"
                    />
                  </template>
                </v-tooltip>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Excluir Doutor"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="red"
                      icon="mdi-delete"
                      v-bind="props"
                      @click="deleteDoctor(doctor)"
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

  <create-doctor
    v-if="shouldEditDoctor"
    :doctor="selectedDoctor"
    :is-edit="shouldEditDoctor"
    @close-modal="closeDoctorModal"
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
import CreateDoctor from "@/components/Modals/Doctor/CreateDoctor.vue";

export default {
  name: 'SearchDoctor',
  components: {
    CreateDoctor,
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      selectedDoctor: null,
      doctors: [],
      shouldEditDoctor: false,
      shouldShowSnackBar: false,
      snackBarMessage: '',
      doctorsTableheaders: [
        { title: 'Crm', key: 'crm' },
        { title: 'Nome', key: 'doctorName' },
        { title: 'Telefone', key: 'doctorPhone' },
        { title: 'Porcentagem', key: 'percentage'},
      ],
    }
  },
  async mounted() {
    await this.getDoctors()
  },
  watch: {
    selectedDoctor: {
      async handler(doctor) {
        if(!doctor) {
          const doctorsResponse = await axios.get('/doctors')
          this.doctors = doctorsResponse.data
          return
        }

        const doctorsResponse = await axios.get(`doctors/${doctor.crm}`)
        this.doctors = [doctorsResponse.data]
      },
    },
  },
  methods: {
    closeModal() {
			this.$emit('closeModal')
    },
    closeDoctorModal() {
      this.shouldEditDoctor = false
    },
    openEditDoctorModal(doctor) {
      this.selectedDoctor = doctor
      this.shouldEditDoctor = true
    },
    async getDoctors() {
      const doctorsResponse = await axios.get('/doctors')
      this.doctors = doctorsResponse.data
    },
    async deleteDoctor(doctor) {
      try {
        await axios.delete(`/doctors/${doctor.crm}`)

        await this.getDoctors()

        this.snackBarMessage = 'Doutor(a) excluido com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir o(a) Doutor(a)'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
