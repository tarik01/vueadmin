<template>
  <div>
    <div
      v-for="page in pages"
      :key="page.id"
      class="col-lg-12 mb-12 d-inline-flex"
    >
      <div class="card shadow mb-4 col-lg-12 p-1">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">{{ page.title }}</h6>
        </div>
        <div class="card-body" v-html="page.content ">
        </div>
        <div class="buttons">
          <img
            src="../assets/edit.svg"
            alt="Editar Galeria"
            class="editButton"
            @click="editPage(page)"
          />
        </div>
      </div>
    </div>
    <div>
      <ModalBox
        id="modal"
        title="Adicionar Galeria"
        :open="isOpenModal"
        @close="closeModal"
      >
        <form @submit.prevent="submitPage">
          <div>
            <label for="title">Título:</label>
            <input type="text" id="title" v-model="page.title" required />
          </div>
          <div>
            <label for="title">Conteúdo:</label>
            <ckeditor :editor="ckEditor.editor" v-model="page.content" class="content" :config="ckEditor.editorConfig"></ckeditor>
          </div>
          <small>{{ page.error }}</small>
          <div class="modal-button">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </ModalBox>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import { usePageStore } from "../store/page/page";
import ModalBox from "./ModalBox.vue";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "PageBox",
  components: {
    ModalBox,
    ckeditor: CKEditor.component
  },
  setup() {
    const pageStore = usePageStore();
    const { pages } = storeToRefs(pageStore);
    const page = ref({
      id: null,
      title: "",
      content: "",
      error: "",
    });
    const isOpenModal = ref(false);
    const ckEditor = {
      editor: ClassicEditor,
      editorConfig:{
        toolbar: {
          items: [
          'undo', 'redo',
          'bold', 'italic',
        ]}
      }
    }
    const editPage = (p) => {
        page.value = {
            id: p.id,
            title: p.title,
            content: p.content,
            error: ''
        }
        isOpenModal.value = true
    }
    const submitPage = async () => {
      try {
        await pageStore.actionUpdatePage(page.value);
        closeModal();
        Swal.fire({
          icon: "success",
          text: "Página editada com sucesso",
        });
        loadPages()
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Não foi possível editar a página",
        });
        console.log(error);
      }
    };
    const loadPages = async () => {
      try {
        await pageStore.actionGetPages();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Não foi possível carregar as páginas",
        });
        console.log(error);
      }
    };
    const closeModal = () => {
      isOpenModal.value = false;
      page.value = {
        id: null,
        title: "",
        content: "",
        error: "",
      };
    };
    return {
      pages,
      page,
      isOpenModal,
      ckEditor,
      loadPages,
      closeModal,
      submitPage,
      editPage,
    };
  },
  mounted() {
    this.loadPages();
  },
};
</script>

<style scoped>
.buttons {
  text-align: right;
}
.editButton {
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
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

#modal input[type="text"]{
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