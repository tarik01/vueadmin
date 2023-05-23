<template>
  <component :is="componentToShow" />
</template>
<script>
import { computed } from 'vue'
import { useAuthStore } from './store/auth/auth'
import LoginBox from './components/LoginBox.vue'
import DashboardBox from './components/DashboardBox.vue'

export default {
  components: {
    LoginBox,
    DashboardBox
  },
  setup() {
      const authStore = useAuthStore()
      const getCurrentUser = computed(() => authStore.currentUser.id)
      const componentToShow = computed(() => !getCurrentUser.value ? 'LoginBox' : 'DashboardBox')
      return {
          getCurrentUser,
          componentToShow
      }
  },
  mounted() {
    const authStore = useAuthStore()
    authStore.actionLoadTokenFromStorage()
  }
}
</script>