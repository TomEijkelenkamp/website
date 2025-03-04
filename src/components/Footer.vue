<template>
    <p>© 2025 Tom Eijkelenkamp</p>
    <div class="social-buttons">
      <a href="https://www.linkedin.com/in/tom-eijkelenkamp-924a66198/" target="_blank" aria-label="LinkedIn">
        <img src="/icons/linkedin.svg" alt="LinkedIn" class="icon">
      </a>
      <a href="https://github.com/TomEijkelenkamp" target="_blank" aria-label="GitHub">
        <img src="/icons/github.svg" alt="GitHub" class="icon">
      </a>
      <a href="mailto:tomeijkelenkamp@hotmail.com" aria-label="Email">
        <img src="/icons/email.svg" alt="Email" class="icon">
      </a>
    </div>
</template>

<style scoped>  
  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }
  
  /* Icon size */
  .icon {
    width: 30px;
    height: 30px;
    filter: var(--icon-color);
    transition: filter 0.2s ease-in-out;
  }
</style>