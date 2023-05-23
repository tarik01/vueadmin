<template>
    <div id="wrapper">
        <menu-box />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <span class="page-title">{{ pageTitle }}</span>
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ userName }}</span>
                                <img class="img-profile rounded-circle"
                                    src="../assets/profile.svg">
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="container-fluid">
                    <div class="row">
                        <component :is="componentToShow" />
                    </div>
                </div>
            </div>
            <footer-box />
        </div>
    </div>
</template>
<script>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth/auth'
import { useDashboardStore } from '../store/dashboard/dashboard'
import { pagesPage } from '../configs'
import PageBox from './PageBox.vue'
import FooterBox from './FooterBox.vue'
import MenuBox from './MenuBox.vue'
import GalleryBox from './GalleryBox.vue'
import GalleryEdit from './GalleryEdit.vue'
import ContactBox from './ContactBox.vue'
import UserBox from './UserBox.vue'

export default {
  name: 'DashboardBox',
  components: {
    PageBox,
    GalleryBox,
    GalleryEdit,
    ContactBox,
    UserBox,
    FooterBox,
    MenuBox
  },
  setup() {
    const dashboardStore = useDashboardStore()
    const componentToShow = computed(() => dashboardStore.component)
    const pageTitle = computed(() => dashboardStore.page.title)
    const authStore = useAuthStore()
    const userName = computed(() => authStore.currentUser.name)

    return {
      userName,
      componentToShow,
      pageTitle
    }
  },
  mounted() {
    const dashboardStore = useDashboardStore()
    dashboardStore.actionSetParams(pagesPage)
  },
}
</script>
