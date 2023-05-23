import { $fetchHttp } from '@/http/requests'
const servicesUrl = {
    baseUrl: '/galleries',
    baseUrlImages: '/images'
}

export const galleryServices = {
    async getGalleries() {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'GET',
        })
    },
    async getGalleryImages(galleryId) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${galleryId}`,
            method: 'GET',
        })
    },
    async deleteImage(imageId) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrlImages}/${imageId}`,
            method: 'DELETE',
        })
    },
    async createGallery(galleryData) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'POST',
            data: galleryData
        })
    },
    async deleteGallery(galleryId) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${galleryId}`,
            method: 'DELETE',
        })
    },
    async updateGallery(galleryId, galleryData) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${galleryId}`,
            method: 'POST',
            data: galleryData
        })
    },
    async insertImage(imageData) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrlImages}`,
            method: 'POST',
            data: imageData
        })
    }
}
