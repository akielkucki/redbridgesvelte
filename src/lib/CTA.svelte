<!--<script>-->
<!--    import { onMount } from 'svelte';-->
<!--    import { animate, inView } from 'motion';-->

<!--    let ctaRef = $state();-->

<!--    function animateSection() {-->
<!--        if (!ctaRef) return;-->

<!--        // base section-->
<!--        animate(ctaRef, {-->
<!--            opacity: [0, 1],-->
<!--            transform: ['translateY(50px) scale(0.95)', 'translateY(0px) scale(1)']-->
<!--        }, { duration: 0.8 });-->

<!--        // title-->
<!--        animate(ctaRef.querySelector('.cta-title'), {-->
<!--            transform: ['scale(0.9)', 'scale(1)']-->
<!--        }, { duration: 0.5, delay: 0.2 });-->

<!--        // description-->
<!--        animate(ctaRef.querySelector('.cta-description'), {-->
<!--            opacity: [0, 1]-->
<!--        }, { duration: 0.6, delay: 0.4 });-->

<!--        // buttons-->
<!--        ctaRef.querySelectorAll('.cta-button').forEach((btn, i) => {-->
<!--            animate(btn, {-->
<!--                opacity: [0, 1],-->
<!--                transform: ['translateY(20px)', 'translateY(0px)']-->
<!--            }, { duration: 0.4, delay: 0.6 + i * 0.1 });-->
<!--        });-->
<!--    }-->

<!--    onMount(() => {-->
<!--        if (!ctaRef) return;-->

<!--        // once the section hits 30% visibility, fire your animation and stop observing-->
<!--        console.log(ctaRef.querySelector('.cta-title'))-->
<!--        const stop = inView(ctaRef,-->
<!--            (el) => {-->
<!--                animateSection();-->
<!--                stop();-->
<!--            },-->
<!--            { amount: 0.3 }-->
<!--        );-->
<!--    });-->

<!--    function handleButtonHover(e) {-->
<!--        animate(e.currentTarget, { scale: 1.05 }, { duration: 0.2 });-->
<!--    }-->
<!--    function handleButtonLeave(e) {-->
<!--        animate(e.currentTarget, { scale: 1 }, { duration: 0.2 });-->
<!--    }-->
<!--</script>-->

<!--<section-->
<!--        bind:this={ctaRef}-->
<!--        class="py-16 bg-gradient-to-r from-red-800 to-red-900 mx-4 rounded-xl shadow-lg"-->
<!--        style="opacity: 0;"-->
<!--&gt;-->
<!--    <div class="container mx-auto px-4 text-center">-->
<!--        <h2 class="cta-title text-4xl md:text-5xl font-extrabold text-white mb-4">-->
<!--            Ready to Start Your Project?-->
<!--        </h2>-->
<!--        <p class="cta-description text-lg text-white/80 mb-8 max-w-2xl mx-auto" style="opacity: 0;">-->
<!--            Contact us today for a consultation and free estimate on your Bucks County construction project.-->
<!--        </p>-->
<!--        <div class="flex flex-col sm:flex-row justify-center gap-4">-->
<!--            <button-->
<!--                    class="cta-button bg-white text-red-800 font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"-->
<!--                    style="opacity: 0;"-->
<!--                    onmouseenter={handleButtonHover}-->
<!--                    onmouseleave={handleButtonLeave}-->
<!--            >-->
<!--                Get a Free Quote-->
<!--            </button>-->
<!--            <button-->
<!--                    class="cta-button border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"-->
<!--                    style="opacity: 0;"-->
<!--                    onmouseenter={handleButtonHover}-->
<!--                    onmouseleave={handleButtonLeave}-->
<!--            >-->
<!--                View Our Process-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->
