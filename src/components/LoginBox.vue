<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Sample image">
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>     
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">E-mail</label>
                  <input type="email" id="email" class="form-control form-control-lg" v-model="email"
                    placeholder="Digite seu endereço de e-mail" />
                    <div class="error-message" v-if="loginErrors?.email">
                      <small class="text-danger">* {{ loginErrors.email }}</small>
                    </div>
                </div>
      
                <!-- Password input -->
                <div class="form-outline mb-3">
                  <label class="form-label" for="password">Senha</label>
                  <input type="password" id="password" class="form-control form-control-lg" v-model="password"
                    placeholder="Digite sua senha" />
                    <div class="error-message" v-if="loginErrors?.password">
                      <small class="text-danger">* {{ loginErrors.password }}</small>
                    </div>
                </div>
      
                <div class="d-flex justify-content-between align-items-center">
                  <a href="#!" class="text-body">Esqueceu a senha?</a>
                </div>
      
                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="button" class="btn btn-primary btn-lg" @click="login"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                </div>
                <div class="error-message" v-if="loginErrors?.default">
                  <small class="text-danger">* {{ loginErrors.default }}</small>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <!-- Copyright -->
          <div class="text-white mb-3 mb-md-0">
            Copyright © 2022 - Nazorek.com
          </div>
          <div>
            <a href="#!" class="text-white me-4">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#!" class="text-white me-4">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#!" class="text-white me-4">
              <i class="fab fa-google"></i>
            </a>
            <a href="#!" class="text-white">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
    </section>
</template>

<script lang="js">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../store/auth/auth'
export default {
  name: 'LoginBox',
  setup() {
    const authStore = useAuthStore()
    const { loginErrors } = storeToRefs(authStore)
    const email = ref('')
    const password = ref('')
    const login = async () => {
      const hasCpf = !!email.value.length
      const hasPassword = !!password.value.length
      
      const allDataInformed = hasCpf && hasPassword
      
      if (!allDataInformed) {
        Swal.fire({
          icon: 'error',
          text: 'Preencha todos os campos!',
        })
        return
      }
      loginErrors.value = {}
      await authStore.actionLogin({
        email: email.value,
        password: password.value
      }).catch((error) => {
        console.log(error)
      })
    }
    return {
      login,
      email,
      password,
      loginErrors,
    }
  }
}


</script>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
.h-custom {
    height: calc(100% - 73px);
}
.error-message {
    padding-top: 1rem;
    color: red;
}
@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>