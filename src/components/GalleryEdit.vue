<template>
    <div>
        <div class="col-lg-12 mb-4 d-inline-flex">
            <div class="card shadow mb-12 col-lg-12 p-1 gallery-item">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{ currentGallery.title }}</h6>
                </div>
                <div class="card-body">
                    <div class="image-item" v-for="image in currentGallery.images" :key="image.id">
                        <img :src="`${url}/storage/${image.thumbnail_url}`" class="image" :alt="image.title"/>
                        <img src="../assets/delete.svg" alt="Deletar Imagem" class="delete-icon" @click="deleteImage(image.id)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttons">
            <button class="btn btn-primary" @click="isOpenModal = true">Enviar Imagem</button>
        </div>
        <div>
            <ModalBox id="modal" title="Enviar Imagem" :open="isOpenModal" @close="modalClose">
                <div class="inner-modal">
                    <Uploader
                      @change="changeMedia"
                      :galleryId="currentGallery.id"
                    />
                    <div class="modal-button"><button @click="modalClose">Finalizar</button></div>
                  </div>
            </ModalBox>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import Uploader from "./Uploader/UploaderTool.vue";
import { useGalleryStore } from '../store/gallery/gallery'
import ModalBox from './ModalBox.vue'
import { apiUrl } from '../configs'

export default {
  name: 'GalleryEdit',
    components: {
        ModalBox,
        Uploader
    },
  setup() {
    const url = apiUrl
    const galleryStore = useGalleryStore()
    const { currentGallery } = storeToRefs(galleryStore)
    const isOpenModal = ref(false)
    const mediaImages = ref([])
    const changeMedia = (media) => {
        mediaImages.value = media
    }
    const loadGalleryImages = async (gallery_id) => {
        try {
            await galleryStore.actionGetGalleryImages(gallery_id)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível carregar as imagens',
                })
            console.log(error)
        }
    }
    const deleteImage = async (imageId) => {
        try {
            Swal.fire({
                title: 'Confirmar exclusão da imagem?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await galleryStore.actionDeleteImage(imageId).then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Imagem excluída com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        loadGalleryImages(currentGallery.value.id)
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
    const modalClose = async () => {
        isOpenModal.value = false
        await loadGalleryImages(currentGallery.value.id)
    }
    return {
        currentGallery,
        isOpenModal,
        modalClose,
        loadGalleryImages,
        deleteImage,
        mediaImages,
        changeMedia,
        url
    }
  },
  mounted() {
    this.loadGalleryImages(this.currentGallery.id)
  }
}


</script>

<style scoped>
.image-item {
    cursor: pointer;
    margin: 10px;
    display: inline-block;
    position: relative;
}
.image {
    max-height: 200px;
    border-radius: 20px;
}
.delete-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  
  .image-item:hover > .delete-icon {
    opacity: 1;
  }
  .image-item:hover > .image {
    opacity: 0.5;
  }
  .buttons {
    display: flex;
    justify-content: center;
}

#modal button {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 0.5rem;
}
  
#modal button:hover {
    background-color: #45a049;
}

#modal .inner-modal {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f2f2f2;
}

.modal-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}
</style>