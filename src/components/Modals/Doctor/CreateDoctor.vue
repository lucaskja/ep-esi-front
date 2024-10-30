<template>
  <v-dialog
    max-width="800"
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
                {{ isEdit ? 'Editar Doutor(a)' : 'Cadastrar Doutor(a)' }}
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
                v-model="crm"
                label="CRM"
                :clearable="true"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="doctorName"
                label="Nome"
                :clearable="true"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="doctorPhone"
                label="Telefone"
                :clearable="true"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="percentage"
                label="Percentual"
                :clearable="true"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-autocomplete
                v-model="idSpecialities"
                label="Especialidade"
                item-title="specialityName"
                item-value="idSpeciality"
                no-data-text="Nenhuma especialidade econtrada"
                :multiple="true"
                :clearable="true"
                :items="specialities"
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
                @click="handleCreateOrEditDoctor"
              >
                {{ isEdit ? 'Editar Doutor(a)' : 'Cadastrar Doutor(a)' }}
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
  name: 'CreateDoctor',
  props: {
    doctor: Object,
    isEdit: Boolean,
  },
  emits: [
    'closeModal',
  ],
  data() {
    return {
      doctorName: '',
      percentage: '',
      doctorPhone: null,
      crm: '',
      idSpecialities: null,
      specialities: [],
      shouldShowSnackBar: false,
      snackBarMessage: ''
    }
  },
  async mounted() {
    if(this.isEdit) await this.loadDoctor()

    const specialitiesResponse = await axios.get('/specialities')
    this.specialities = specialitiesResponse.data
  },
  methods: {
    async loadDoctor() {
      if(this.doctor) {
        this.doctorName = this.doctor.doctorName
        this.percentage = this.doctor.percentage
        this.doctorPhone = this.doctor.doctorPhone
        this.crm = this.doctor.crm

        const exertSpecialitiesResponse = await axios.get(`/exert-specialities/${this.doctor.crm}`)
        this.idSpecialities = exertSpecialitiesResponse.data.map((speciality) => speciality.idSpeciality)
      }
    },
    closeModal() {
      this.$emit('closeModal')
    },
    async handleCreateOrEditDoctor() {
      try {
        if(this.isEdit) {
          await axios.patch(`/doctors/${this.crm}`, {
            doctorName: this.doctorName,
            percentage: this.percentage,
            doctorPhone: this.doctorPhone,
            idSpecialities: this.idSpecialities
          })

          this.snackBarMessage = 'Doutor(a) editado com sucesso'
          this.shouldShowSnackBar = true
        } else {
          await axios.post('/doctors', {
            doctorName: this.doctorName,
            percentage: this.percentage,
            doctorPhone: this.doctorPhone,
            crm: this.crm,
            idSpecialities: this.idSpecialities
          })

          this.snackBarMessage = 'Doutor(a) cadastrado com sucesso'
          this.shouldShowSnackBar = true
        }
      } catch (e) {
        if(this.isEdit) this.snackBarMessage = 'Erro ao editar doutor(a), verifique os campos!'

        this.snackBarMessage = 'Erro ao cadastrar doutor(a), verifique os campos!'
        this.shouldShowSnackBar = true
      }
    },
    closeSnackbar() {
      this.shouldShowSnackBar = false
    },
  }
}
</script>
