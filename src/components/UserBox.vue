<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      class="col-lg-3 mb-3 d-inline-flex"
    >
      <div class="card shadow mb-4 col-lg-12 p-1">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary" v-if="currentUser.isAdmin">{{ user.name }}</h6>
          <h6 class="m-0 font-weight-bold text-primary" v-else>Minha Conta</h6>
        </div>
        <div class="card-body">
          <ul class="user-info">
            <li><span>Nome</span>: {{ user.name }}</li>
            <li><span>E-mail</span>: {{ user.email }}</li>
          </ul>
        </div>
        <div class="common-buttons">
          <img
            src="../assets/edit.svg"
            alt="Editar Usuário"
            class="editButton"
            @click="editUser(user)"
          />
        </div>
      </div>
    </div>
    <div class="buttons" v-if="currentUser.isAdmin">
      <button class="btn btn-primary" @click="isOpenModal = true">Novo Usuário</button>
    </div>
    <div>
      <ModalBox
        id="modal"
        title="Usuário"
        :open="isOpenModal"
        @close="closeModal"
      >
        <form @submit.prevent="submitUser">
          <div>
            <label for="name">Nome:</label>
            <input type="text" id="name" v-model="userData.name" required />
          </div>
          <div>
            <label for="email">E-mail:</label>
            <input type="text" id="email" v-model="userData.email" required />
          </div>
          <div v-if="needCurrentPassword">
            <label for="current_password">Senha atual:</label>
            <input type="password" id="current_password" v-model="userData.currentPassword" required />
          </div>
          <div>
            <label for="password">Nova Senha:</label>
            <input type="password" id="password" v-model="userData.password" required />
          </div>
          <div>
            <label for="password_confirmation">Confirmação de Senha:</label>
            <input type="password" id="password_confirmation" v-model="userData.passwordConfirmation" required />
          </div>
          <small>{{ userData.error }}</small>
          <div class="modal-button">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </ModalBox>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import ModalBox from "./ModalBox.vue";
import { useAuthStore } from '../store/auth/auth'
import { useUserStore } from "../store/user/user";

export default {
  name: "PageBox",
  components: {
    ModalBox,
  },
  setup() {
    const authStore = useAuthStore()
    const currentUser = authStore.currentUser
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const userData = ref({
      id: null,
      name: "",
      email: "",
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    });
    const isOpenModal = ref(false);
    const needCurrentPassword = computed(() => {
      if(userData.value.id && currentUser.id === userData.value.id) return true
      return false
    });

    const editUser = (u) => {
        userData.value = {
            id: u.id,
            name: u.name,
            email: u.email,
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
            error: ''
        }
        isOpenModal.value = true
    }
    const submitUser = async () => {
      try {
        const sanitizedUser = {
          id: userData.value.id,
          name: userData.value.name,
          email: userData.value.email,
          current_password: userData.value.currentPassword,
          password: userData.value.password,
          password_confirmation: userData.value.passwordConfirmation,
        };
        if (sanitizedUser.id) {
          await userStore.actionUpdateUser(sanitizedUser);
        } else {
          await userStore.actionCreateUser(sanitizedUser);
        }
        closeModal();
        Swal.fire({
          icon: "success",
          text: "Usuário adicionado/editado com sucesso",
        });
        loadUsers()
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Não foi possível executar a ação",
        });
        console.log(error);
      }
    };
    const loadUsers = async () => {
      try {
        await userStore.actionGetUsers();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Não foi possível carregar os usuários",
        });
        console.log(error);
      }
    };
    const closeModal = () => {
      isOpenModal.value = false;
      userData.value = {
        id: null,
        name: "",
        email: "",
        password: "",
        currentPassword: "",
        passwordConfirmation: "",
        error: ""
      };
    };
    return {
      currentUser,
      users,
      userData,
      isOpenModal,
      needCurrentPassword,
      loadUsers,
      closeModal,
      submitUser,
      editUser,
    };
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped>
.common-buttons {
  text-align: right;
}
.buttons {
  display: flex;
  justify-content: center;
}
.editButton {
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
}
.user-info {
  list-style: none;
  padding: 0;
}
.user-info li {
  margin-bottom: 0.8rem;
}
.user-info li span {
  font-weight: bold;
}


#modal {
  font-size: 1.2rem;
}

#modal form {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
  background-color: #f2f2f2;
}

#modal label {
  font-weight: bold;
}

#modal input[type="text"], input[type="password"]{
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  box-sizing: border-box;
}

#modal button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  cursor: pointer;
}

#modal button[type="submit"]:hover {
  background-color: #45a049;
}

#modal .modal-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>