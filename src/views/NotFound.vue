<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-12 text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">
          La página que buscas no existe, estas en el lugar equivocado 😵.
        </div>
        <router-link to="/" class="btn btn-link" aria-label="Ir a Inicio">
          Vuelve al Home 🏠
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
