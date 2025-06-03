<script>
    import { onMount } from 'svelte';
    import { animate } from 'motion';
    import { MapPin } from 'lucide-svelte';

    // Props
    export let testimonials = [];

    // Elements
    let testimonialsRef;
    let isInView = false;

    onMount(() => {
        if (testimonialsRef) {
            // Intersection Observer for animations
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            isInView = true;
                            animateSection();
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '-100px' }
            );

            observer.observe(testimonialsRef);

            return () => observer.disconnect();
        }
    });

    function animateSection() {
        if (!testimonialsRef) return;

        // Animate header
        const header = testimonialsRef.querySelector('.header');
        if (header) {
            animate(header,
                { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
                { duration: 0.6 }
            );
        }

        // Animate testimonial cards with stagger
        const cards = testimonialsRef.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
            animate(card,
                {
                    opacity: [0, 1],
                    transform: ['translateY(50px) scale(0.95)', 'translateY(0px) scale(1)']
                },
                { duration: 0.6, delay: 0.2 + i * 0.1 }
            );
        });
    }

    function handleCardHover(event) {
        const card = event.currentTarget;
        animate(card, {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)'
        }, { duration: 0.3 });
    }

    function handleCardLeave(event) {
        const card = event.currentTarget;
        animate(card, {
            transform: 'translateY(0px) scale(1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }, { duration: 0.3 });
    }
</script>

<section
        bind:this={testimonialsRef}
        id="testimonials"
        class="py-20"
>
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="header opacity-0 text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
            <p class="text-gray-700 text-lg text-center mb-8">Trusted by homeowners and businesses across Bucks County</p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid md:grid-cols-3 gap-8">
            {#each testimonials as testimonial, index}
                <div
                        class="testimonial-card opacity-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
                        on:mouseenter={handleCardHover}
                        on:mouseleave={handleCardLeave}
                >
                    <div class="mb-4">
                        <h4 class="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                        <div class="flex items-center text-gray-600 mt-1">
                            <MapPin class="h-4 w-4 mr-1 text-brick-red" />
                            {testimonial.location}
                        </div>
                    </div>

                    <blockquote class="italic mb-4 text-gray-700 leading-relaxed">
                        "{testimonial.text}"
                    </blockquote>

                    <div class="border-t border-gray-100 pt-4">
                        <p class="text-sm text-gray-500 font-medium">{testimonial.position}</p>
                    </div>

                    <!-- Decorative Quote Mark -->
                    <div class="absolute top-4 right-4 text-brick-red text-4xl font-serif">"</div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .testimonial-card {
        position: relative;
    }
</style>