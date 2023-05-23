<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">{{ siteName }}</div>
    </a>
    <hr class="sidebar-divider my-0" />
    <li class="nav-item">
      <a class="nav-link" @click="setPage(pagesPage)">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Páginas</span></a
      >
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" @click="setPage(galleriesPage)">
        <i class="fas fa-fw fa-folder"></i>
        <span>Galeria</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" @click="setPage(contactsPage)">
        <i class="fas fa-fw fa-folder"></i>
        <span>Contatos</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" @click="setPage(usersPage)">
        <i class="fas fa-fw fa-folder"></i>
        <span>Usuários</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" @click="logout">
        <i class="fas fa-fw fa-folder"></i>
        <span>Sair</span>
      </a>
    </li>
  </ul>
</template>
<script>
import { useAuthStore } from "../store/auth/auth";
import { useDashboardStore } from "../store/dashboard/dashboard";
import { galleriesPage, contactsPage, usersPage, pagesPage, siteName } from "../configs";

export default {
  name: "MenuBox",

  setup() {
    const dashboardStore = useDashboardStore();

    const setPage = (page) => {
      dashboardStore.actionSetParams(page);
    };
    const authStore = useAuthStore()
    const logout = () => {
      authStore.actionLogout()
    }

    return {
      galleriesPage,
      contactsPage,
      usersPage,
      pagesPage,
      siteName,
      setPage,
      logout
    };
  },
};
</script>
