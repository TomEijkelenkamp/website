<template>
    <div class="introduction">
        <p>Hello, I am Tom Eijkelenkamp, a computational arts enthousiast and here on this website I show some of the works I have done.
        <br/>
        <br/>        
        In my computing science master's degree I did many art related projects. There I studied compositional aesthetics in AI art for my thesis. In artworks you can use many building blocks and theories to create effects and stories. These have been studied extensively in the past by artists. Many books and lectures have been made on composition. In my research I studied how well AI chatbots are able to replicate such talks. Then I trained an art generator with this chatbot generated data, in order for it to gain knowledge on all kinds of topics of composition.
        <br/>
        <br/>
        Appart from the thesis I did a research internship studying light illumination in AI generated images. In another course I studied how patterns in artworks relate to whether it receives likes and comments on Pinterest. Also I worked on projects developing an AI drum machine as well as a melody sampler.
        <br/>
        <br/>
        Some of the studies you can download here.</p>
    </div>
</template>

<script>
export default {
    name: 'Introduction'
}
</script>

<style scoped>


.introduction {
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 50px;
}

.introduction h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

.introduction p {
    font-size: 1.2em;
    line-height: 1.6;
}
</style>