<template>
  <div class="pdf-download">
    <img :src="imageSrc" alt="Master Thesis Front Page" />
    <a :href="pdfHref" :download="pdfDownloadName">
      <button>Download PDF</button>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      default: '/master_thesis_front_page.png'
    },
    pdfHref: {
      type: String,
      default: '/Master Thesis - Composition in AI Art - Tom Eijkelenkamp.pdf'
    },
    pdfDownloadName: {
      type: String,
      default: 'Master Thesis - Composition in AI Art - Tom Eijkelenkamp.pdf'
    }
  }
};
</script>

<style scoped>
  .pdf-download {
    background: var(--color-background);
    padding: 50px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 90%;
  }

  
a {
  margin: 10px;
}

a button {
  text-decoration: none;
  color: white;
  background-color: #0A5C50;
  border: none;
  padding: 15px 32px;
  margin: 5px;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

@media (hover: hover) {
  a:hover {
    background-color: var(--color-border-hover);
  }
}
</style>
