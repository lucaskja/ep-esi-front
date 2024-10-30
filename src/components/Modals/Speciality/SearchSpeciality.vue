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
                v-model="selectedSpeciality"
                :clearable="true"
                item-title="specialityName"
                item-value="idSpeciality"
                hide-details
                no-data-text="Nenhuma especialidade encontrada"
                label="Especialidades"
                :return-object="true"
                :items="specialities"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>

      <v-card-text>
        <v-card
          v-for="speciality in specialities"
          class="mb-5"
          :key="speciality.idSpeciality"
        >
          <v-container>
            <v-row>
              <v-col
                cols="8"
              >
                <p><b>Especialidade:</b> {{speciality.specialityName}} </p>
                <p><b>Index:</b> {{speciality.index}} </p>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Editar Especialidade"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="#18435A"
                      icon="mdi-pencil"
                      v-bind="props"
                      @click="openEditSpecialityModal(speciality)"
                    />
                  </template>
                </v-tooltip>
              </v-col>

              <v-col
                class="d-flex align-center"
              >
                <v-tooltip
                  text="Excluir Especialidade"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="red"
                      icon="mdi-delete"
                      v-bind="props"
                      @click="deleteSpeciality(speciality)"
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

  <create-speciality
    v-if="shouldEditSpeciality"
    :speciality="selectedSpeciality"
    :is-edit="shouldEditSpeciality"
    @close-modal="closeSpecialityModal"
    @update-specialities="getSpecialities"
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
import CreateSpeciality from "@/components/Modals/Speciality/CreateSpeciality.vue";

export default {
  name: 'SearchSpeciality',
  components: {
    CreateSpeciality,
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      selectedSpeciality: null,
      shouldEditSpeciality: false,
      specialities: [],
      shouldShowSnackBar: false,
      snackBarMessage: '',
    }
  },
  async mounted() {
    await this.getSpecialities()
  },
  methods: {
    closeModal() {
			this.$emit('closeModal')
    },
    closeSnackBar() {
      this.shouldShowSnackBar = false
    },
    closeSpecialityModal() {
      this.shouldEditSpeciality = false
    },
    async getSpecialities() {
      const responseSpecialities = await axios.get('/specialities')
      this.specialities = responseSpecialities.data
    },
    openEditSpecialityModal(speciality) {
      this.selectedSpeciality = speciality
      this.shouldEditSpeciality = true
    },
    async deleteSpeciality(speciality) {
      try {
        await axios.delete(`/specialities/${speciality.idSpeciality}`)

        await this.getSpecialities()

        this.snackBarMessage = 'Especialidade excluida com sucesso'
        this.shouldShowSnackBar = true
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Especialidade!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
