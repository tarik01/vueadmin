<template>
    <div>
        <div v-for="gallery in galleries" :key="gallery.id" class="col-lg-3 mb-4 d-inline-flex">
            <div class="card shadow mb-4 col-lg-12 p-1 gallery-item">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{ gallery.title }}</h6>
                </div>
                <div class="card-body image-item" @click="openGallery(gallery)">
                    <img :src="`${url}/storage/${gallery.cover_image}`" class="image" :alt="gallery.title" />
                    <img src="../assets/open.svg" alt="Abrir Galeria" class="open-icon" />
                </div>
                <div class="buttons-gallery">
                    <div class="common-buttons">
                        <img src="../assets/open.svg" alt="Abrir Galeria" @click="openGallery(gallery)"/>
                        <img src="../assets/edit.svg" alt="Editar Galeria" @click="editGallery(gallery)"/>
                    </div>
                    <img src="../assets/delete.svg" alt="Deletar Imagem" @click="deleteGallery(gallery.id)" v-if="gallery.deletable"/>
                </div>

            </div>
        </div>
        <div class="buttons">
            <button class="btn btn-primary" @click="isOpenModal = true">Nova Galeria</button>
        </div>
        <div>
            <ModalBox id="modal" title="Adicionar Galeria" :open="isOpenModal" @close="closeModal">
                <form @submit.prevent="submitGallery" enctype="multipart/form-data">
                    <div>
                      <label for="title">Título:</label>
                      <input type="text" id="title" v-model="galleryData.title" required>
                    </div>
                    <div>
                      <label for="cover-image">Imagem de Capa:</label>
                      <input type="file" ref="inputFileRef" @change="handleCoverImageChange" accept="image/*" capture>
                    </div>
                    <div v-if="galleryData.coverImagePreview" class="preview">
                      <img :src="galleryData.coverImagePreview" alt="Preview da Imagem de Capa">
                    </div>
                    <small>{{ galleryData.error }}</small>
                    <div class="modal-button">
                      <button type="submit" v-if="!galleryData.id">Adicionar</button>
                      <button type="submit" v-else>Salvar</button>
                    </div>
                  </form>
            </ModalBox>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import ModalBox from './ModalBox.vue'
import { useGalleryStore } from '../store/gallery/gallery'
import { useDashboardStore } from '../store/dashboard/dashboard'
import { apiUrl } from '../configs'

export default {
  name: 'GalleryBox',
    components: {
        ModalBox
    },
  setup() {
    const url = apiUrl
    const galleryStore = useGalleryStore()
    const { galleries } = storeToRefs(galleryStore)
    const loadGallery = async () => {
        try {
            await galleryStore.actionGetGalleries()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível carregar as galerias',
                })
        }
    }
    const openGallery = (gallery) => {
        galleryStore.setCurrentGallery(gallery)
        const dashboardStore = useDashboardStore()
        dashboardStore.actionSetParams({
            title: `Editar Galeria - ${gallery.title}`,
            component: 'GalleryEdit',
        })
    }
    const isOpenModal = ref(false)
    const closeModal = () => {
        isOpenModal.value = false
        galleryData.value = {
          id: null,
          title: '',
          coverImage: null,
          coverImagePreview: null,
          error: '',
        }
        if (inputFileRef.value) {
            inputFileRef.value.value = '';
        }
    }

    const galleryData = ref({
        id: null,
        title: '',
        coverImage: null,
        coverImagePreview: null,
        error: '',
    })
    const inputFileRef = ref(null);
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            galleryData.value.coverImage = file;
            galleryData.value.coverImagePreview = reader.result;
        };
        }
    }
    const submitGallery = async () => {
        try {
            const galleryForm = new FormData();
            galleryForm.append('title', galleryData.value.title);
            galleryForm.append('cover_image', galleryData.value.coverImage);
            if (galleryData.value.id) {
                await galleryStore.actionUpdateGallery(galleryData.value.id, galleryForm)
            } else {
                await galleryStore.actionAddGallery(galleryForm)
            }
            isOpenModal.value = false
            galleryData.value = {
                id: null,
                title: '',
                coverImage: null,
                coverImagePreview: null,
                error: ''
            }
            await galleryStore.actionGetGalleries()
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar a galeria',
                })
        }
    }
    const deleteGallery = async (galleryId) => {
        try {
            Swal.fire({
                title: 'Confirmar exclusão da galeria?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await galleryStore.actionDeleteGallery(galleryId).then(async () => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Galeria excluída com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        await galleryStore.actionGetGalleries()
                    })
                }
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível deletar a imagem',
                })
            console.log(error)
        }
    }
    const editGallery = (gallery) => {
        galleryData.value = {
            id: gallery.id,
            title: gallery.title,
            coverImage: null,
            coverImagePreview: `${url}/storage/${gallery.cover_image}`,
            error: ''
        }
        isOpenModal.value = true
    }

    return {
        galleries,
        loadGallery,
        openGallery,
        isOpenModal,
        galleryData,
        handleCoverImageChange,
        submitGallery,
        deleteGallery,
        editGallery,
        url,
        closeModal,
        inputFileRef
    }
  },
  mounted() {
    this.loadGallery()
  }
}


</script>

<style scoped>
.gallery-item {
    cursor: pointer;
}
.image-item {
    width: 100%;
    height: 200px;
    min-height: 200px;
    object-fit: cover;
}
.buttons {
    display: flex;
    justify-content: center;
}

.preview {
    margin-bottom: 1rem;
}

#modal {
    font-size: 1.2rem;
}
#modal form {
    max-width: 60rem;
    margin: 0 auto;
    padding: 2rem;
    border: 0.1rem solid #ccc;
    border-radius: 4px;
    background-color: #f2f2f2;
}
  
#modal label {
    font-weight: bold;
}
  
#modal input[type="text"],
#modal input[type="file"] {
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
  
#modal input[type="file"] {
    margin-bottom: 20px;
}
  
#modal button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
  
#modal button[type="submit"]:hover {
    background-color: #45a049;
}
  
#modal img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}
#modal .modal-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}
.open-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  
.image-item:hover > .open-icon {
    opacity: 1;
}
.image-item:hover > .image {
    opacity: 0.5;
}
.buttons-gallery {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
.buttons-gallery img {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    opacity: 0.5;
}
.buttons-gallery img:hover {
    opacity: 1;
}
.image {
    width: 100%;
    height: 180px;
    max-height: 200px;
    object-fit: cover;
    transition: opacity 0.2s ease-in-out;
}

</style>