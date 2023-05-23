<template>
    <div>
        <div v-for="contact in contacts" :key="contact.slug" class="col-lg-4 mb-4 d-inline-flex">
            <div class="card shadow mb-4 col-lg-12 p-1 gallery-item">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{ contact.title }}</h6>
                </div>
                <div class="card-body image-item">
                    {{ contact.value }}
                </div>
                <div class="buttons">
                    <img src="../assets/edit.svg" alt="Editar Contato" @click="editContact(contact)" class="icon-global"/>
                </div>

            </div>
        </div>
        <div>
            <ModalBox id="modal" title="`Editar ${currentContact.slug}`" :open="isOpenModal" @close="isOpenModal = !isOpenModal">
                <form @submit.prevent="submitContact">
                    <div>
                      <label for="value">Valor:</label>
                      <input type="text" id="value" v-model="currentContact.value" required>
                    </div>
                    <small>{{ currentContact.error }}</small>
                    <div class="modal-button">
                      <button type="submit">Salvar</button>
                    </div>
                  </form>
            </ModalBox>
        </div>
    </div>
</template>
<script lang="js">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import ModalBox from './ModalBox.vue'
import { useContactStore } from '../store/contact/contact'

export default {
  name: 'ContactBox',
    components: {
        ModalBox
    },
  setup() {
    const contactStore = useContactStore()
    const { contacts } = storeToRefs(contactStore)
    const loadContacts = async () => {
        try {
            await contactStore.actionGetContacts()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível carregar os contatos',
                })
        }
    }
    const isOpenModal = ref(false)

    const currentContact = ref({
        slug: null,
        value: '',
        error: ''
    })

    const submitContact = async () => {
        try {
            await contactStore.actionUpdateContact(currentContact.value)
            currentContact.value = {
                slug: null,
                value: '',
                error: ''
            }
            isOpenModal.value = false
            await contactStore.actionGetContacts()
            Swal.fire({
                icon: "success",
                text: "Contato editada com sucesso",
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                text: 'Não foi possível salvar o contato',
                })
        }
    }
    
    const editContact = (contact) => {
        currentContact.value = {
            slug: contact.slug,
            value: contact.value,
            error: ''
        }
        isOpenModal.value = true
    }

    return {
        contacts,
        loadContacts,
        isOpenModal,
        currentContact,
        submitContact,
        editContact,
    }
  },
  mounted() {
    this.loadContacts()
  }
}


</script>

<style scoped>

#modal {
    font-size: 12px;
}
#modal form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
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
.modal-button {
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
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
   
</style>