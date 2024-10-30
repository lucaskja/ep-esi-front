<template>
  <v-dialog
    :model-value="true"
    max-width="750"
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
                Doenças
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
                v-model="selectedDisease"
                label="Doenças"
                item-title="diseaseName"
                item-value="idDisease"
                hide-details
                no-data-text="Nenhuma doença encontrada"
                :return-object="true"
                :clearable="true"
                :items="diseases"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>

      <v-card-text>
        <v-card
          v-for="disease in diseases"
          class="mb-5"
          :key="disease.idDisease"
        >
          <v-container>
            <v-row>
              <v-col
                cols="9"
                class="d-flex align-center"
              >
                <p><b>Nome:</b> {{disease.diseaseName}}</p>
              </v-col>

              <v-col
                class="d-flex align-center"
                cols="auto"
              >
                <v-tooltip
                  text="Editar Doença"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="#18435A"
                      icon="mdi-pencil"
                      v-bind="props"
                      @click="openEditDiseaseModal(disease)"
                    />
                  </template>
                </v-tooltip>
              </v-col>

              <v-col
                class="d-flex align-center"
                cols="auto"
              >
                <v-tooltip
                  text="Excluir Doença"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="flat"
                      color="red"
                      icon="mdi-delete"
                      v-bind="props"
                      @click="deleteDisease(disease)"
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

  <create-disease
    v-if="shouldEditDisease"
    :disease="selectedDisease"
    :is-edit="shouldEditDisease"
    @close-modal="closeDiseaseModal"
    @update-patients="getDiseases"
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
import CreateDisease from "@/components/Modals/Disease/CreateDisease.vue"

export default {
  name: 'SearchDisease',
  components: {
    CreateDisease,
  },
  emits: [
    'closeModal',
  ],
  data()  {
    return {
      diseases: [],
      shouldEditDisease: false,
      selectedDisease: null,
      shouldShowSnackBar: false,
      snackBarMessage: null,
    }
  },
  async mounted() {
    await this.getDiseases()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    closeDiseaseModal() {
      this.shouldEditDisease = false
    },
    closeSnackBar() {
      this.shouldShowSnackBar = false
    },
    openEditDiseaseModal(disease) {
      this.selectedDisease = disease
      this.shouldEditDisease = true
    },
    async getDiseases() {
      const responseDiseases = await axios.get('/diseases')
      this.diseases = responseDiseases.data
    },
    async deleteDisease(disease) {
      try {
        await axios.delete(`/diseases/${disease.idDisease}`)

        this.snackBarMessage = 'Doença excluida com sucesso'
        this.shouldShowSnackBar = true

        await this.getDiseases()
      } catch (e) {
        this.snackBarMessage = 'Falha ao excluir Doença!'
        this.shouldShowSnackBar = true
      }
    },
  },
}
</script>
