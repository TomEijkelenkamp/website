<script setup>
import Introduction from './components/Introduction.vue';
import PdfDownload from './components/PdfDownload.vue'
</script>

<template>
  <header>
    <Introduction />
  </header>

  <main>
    <PdfDownload imageSrc="/master_thesis_front_page.png" pdfHref="/Master Thesis - Composition in AI Art - Tom Eijkelenkamp.pdf" pdfDownloadName="Master Thesis - Composition in AI Art - Tom Eijkelenkamp.pdf" />
    <PdfDownload imageSrc="/research_internship_front_page.png" pdfHref="/Research Internship - Light Illumination in AI Art - Tom Eijkelenkamp.pdf" pdfDownloadName="Research Internship - Light Illumination in AI Art - Tom Eijkelenkamp.pdf" />
    <PdfDownload imageSrc="/correlations_to_popularity_front_page.png" pdfHref="/Bayesian Graphs - Correlations in Artworks to Popularity on Pinterest - Tom Eijkelenkamp.pdf" pdfDownloadName="Bayesian Graphs - Correlations in Artworks to Popularity on Pinterest - Tom Eijkelenkamp.pdf" />
  </main>
</template>

<style scoped>
</style>
