import { defineStore } from 'pinia'

import { galleryServices } from './services'

export const useGalleryStore = defineStore({
    id: 'gallery',
    state: () => ({
        galleries: [],
        currentGallery: {},
        errors: {
            addGallery: null,
        }
    }),
    actions: {
        async actionGetGalleries() {
            try {
                const galleries = await galleryServices.getGalleries()
                this.galleries = galleries
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar obter as galerias'
                return Promise.reject()
            }
        },
        async actionGetGalleryImages(galleryId) {
            try {
                const gallery = await galleryServices.getGalleryImages(galleryId)
                this.currentGallery = gallery
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar obter as imagens da galeria'
                return Promise.reject()
            }
        },
        setCurrentGallery(gallery) {
            this.currentGallery = gallery
        },
        async actionDeleteImage(imageId) {
            try {
                await galleryServices.deleteImage(imageId)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar remover a imagem'
                return Promise.reject()
            }
        },
        async actionAddGallery(galleryData) {
            try {
                await galleryServices.createGallery(galleryData)
                return Promise.resolve()
            } catch (error) {
                error.response.data.errors.forEach(error => {
                    this.errors.addGallery = error
                })
                this.error = 'Ocorreu um erro ao tentar criar a galeria'
                return Promise.reject()
            }
        },
        async actionDeleteGallery(galleryId) {
            try {
                await galleryServices.deleteGallery(galleryId)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar remover a imagem'
                return Promise.reject()
            }
        },
        async actionUpdateGallery(galleryId, galleryData) {
            try {
                await galleryServices.updateGallery(galleryId, galleryData)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar atualizar a galeria'
                return Promise.reject()
            }
        },
        async actionInsertImage(imageData) {
            try {
                await galleryServices.insertImage(imageData)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar inserir a imagem'
                return Promise.reject()
            }
        }
    },
})