<template>
    <div class="introduction">
        <h1>Hello</h1>
        <p>I am Tom Eijkelenkamp, a computational artist and here on this website I show some of the works I have done.
        <br/>
        <br/>        
        In my computing science master's degree I did many art related projects. I studied compositional aesthetics in AI art for my thesis and light illumination in AI generated artworks for a research internship. In another research, I studied how patterns in artworks relate to whether it receives likes and comments on Pinterest. To continue, in the context of visual language, I did an analysis of iconic and symbolic language in an artwork of Picasso. Also I worked on projects developing an AI drum machine and melody sampler.
        <br/>
        <br/>
        <br/>
        </p>
        <span class="bold" style="font-weight: bold;">Some of the studies you can download >>></span>
        <p>
        <br/>
        <br/>
        Thesis:<br/>
        In artworks you can use many building blocks and theories to create effects and stories. These have been studied extensively in the past by artists. Many books and lectures have been made on composition. In my research I studied how well AI chatbots are able to replicate such talks. Then I trained an art generator with this chatbot generated data, in order for it to gain knowledge on all kinds of topics of composition.
        <br/>
        <br/>
        Internship:<br/>
        Art generators are trained on extensive amounts of data, containing scenes with all kinds of lighting properties. When generating visuals one important aspect is to create a professional illumination setting among the subjects. In this study we search for ways to evaluate the quality of light rendering in diffusion model generated images.
        <br/>
        <br/>
        <br/>
        I am always looking for collaborations for research in the field of computer generated art. Feel free to reach out.
        </p>   
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
    align-items: center;
    padding: 100px 0 0 100px;
}

.introduction h1 {
    font-family: 'New Amsterdam', sans-serif;
    font-size: 8em;
    margin-bottom: 10px;
    text-align: left;
}

.introduction p {
    font-family: "Signika", sans-serif;
    font-size: 1.2em;
    line-height: 1.6;
}

.bold {
    font-size: 2.0em;
    font-weight: bold;
}
</style>