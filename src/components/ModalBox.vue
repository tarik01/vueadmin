<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <div class="close-button" @click="close">x</div>
            <div class="modal-inner">
            <slot />

            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
  
<script>
import { onMounted, onUnmounted } from "vue";

export default {
    props: {
        open: {
        type: Boolean,
        required: true,
        },
    },
    setup(_, { emit }) {
        const close = () => {
        emit("close");
        };

        const handleKeyup = (event) => {
        if (event.keyCode === 27) {
            close();
        }
        };

        onMounted(() => document.addEventListener("keyup", handleKeyup));
        onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

        return { close };
    },
};
</script>
  
<style scoped>
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  
  .vue-modal-inner {
    max-width: 60rem;
    margin: 2rem auto;
  }

  .modal-inner {
    padding: 1rem;
  }
  
  .vue-modal-content {
    position: relative;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    border-radius: 0.3rem;
    padding: 1rem;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .drop-in-enter-active,
  .drop-in-leave-active {
    transition: all 0.3s ease-out;
  }
  
  .drop-in-enter-from,
  .drop-in-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
  .close-button {
    position: absolute;
    top: 0.1rem;
    right: 0.5rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
  }
</style>