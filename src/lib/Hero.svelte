<script>
    import { onMount } from 'svelte';
    import { animate, scroll } from 'motion';
    import {
        ChevronDown,
        Play,
        ArrowRight,
        Star,
        Award,
        Phone,
        MapPin
    } from 'lucide-svelte';

    // Props
    export let scrollToSection;

    // State
    let isLoaded = false;

    // Elements
    let heroRef;
    let contentRef;

    onMount(() => {
        isLoaded = true;

        // Hero animations
        if (heroRef && contentRef) {
            // Staggered animation for content
            animate(contentRef, { opacity: [0, 1] }, { duration: 1 });

            // Parallax scroll effect
            scroll(({ y }) => {
                if (heroRef) {
                    const progress = Math.min(y.progress, 0.3);
                    animate(heroRef, {
                        opacity: 1 - (progress * 3.33),
                        transform: `scale(${1 - progress * 0.1}) translateY(${-progress * 50}px)`
                    }, { duration: 0 });
                }
            });
        }

        // Floating animations
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((el, i) => {
            animate(el,
                { transform: ['translateY(-10px)', 'translateY(10px)', 'translateY(-10px)'] },
                { duration: 5, repeat: Infinity, delay: i * 1 }
            );
        });
    });
</script>

<section
        bind:this={heroRef}
        id="home"
        class="relative min-h-[80vh] h-screen flex items-center justify-center overflow-hidden"
        role="banner"
        aria-label="Hero section introducing Red Bridge Construction"
>
    <!-- Background -->
    <div class="absolute inset-0 z-0">

        <img
                src="/background.png"
                alt="background"
                class="absolute inset-0 w-full h-full object-cover object-center -z-10"
                aria-label="Construction site backdrop"
                style="filter: brightness(0.9) contrast(1.1); z-index: -1;"
        />

        <div class="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-red-900/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
    </div>

    <!-- Floating shapes -->
    <div class="floating absolute top-16 left-8 w-16 h-16 bg-brick-red/10 rounded-full blur-lg"></div>
    <div class="floating absolute bottom-24 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

    <!-- Content -->
    <div bind:this={contentRef} class="container mx-auto px-4 relative z-20 text-center text-white py-24 ">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-6 text-sm hover:scale-105 transition-transform">
            <MapPin class="h-4 w-4 text-brick-red" />
            <span>Licensed & Insured • Since 1997</span>
            <div class="flex items-center gap-1">
                {#each Array(5) as _, i}
                    <Star class="h-3 w-3 text-yellow-400 fill-current" />
                {/each}
            </div>
        </div>


        <!-- Headline -->
        <h1 class="text-6xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            Building Excellence
                <span class="block bg-gradient-to-r text-3xl bg-white bg-clip-text text-transparent hover:scale-105 transition-transform">
                <br>
                Serving Bucks County and surrounding areas.
            </span>
        </h1>


        <!-- Subtext -->
        <p class="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-100">
            Premier construction services for New Hope and Bucks County.
            <br class="hidden md:block" />
            <span class="font-semibold text-white">Quality craftsmanship, integrity, and exceptional results.</span>
        </p>

        <!-- Actions -->
        <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                        on:click={() => scrollToSection('#projects')}
                        class="bg-gradient-to-r from-[rgb(107,26,1)] to-[rgb(137,26,1)] hover:from-[rgb(107,26,1)] hover:to-[rgb(137,26,1)] text-white px-8 py-4 text-base font-semibold shadow-lg shadow-red-600/25 rounded-md transition-all hover:scale-105"
                >
                    View Our Projects
                    <ArrowRight class="inline ml-2 w-4 h-4" />
                </button>
                <button
                        on:click={() => scrollToSection('#contact')}
                        class="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 text-base font-semibold rounded-md transition-all hover:scale-105"
                >
                    <Phone class="inline mr-2 w-4 h-4" />
                    Get Free Quote
                </button>
            </div>

            <button class="text-white px-4 py-8 transition-all hover:scale-105">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 hover:scale-110">
                    <Play class="w-4 h-4 text-white" />
                </div>
                <span>Watch Our Story</span>
            </button>

        </div>

        <!-- Trust indicators -->
        <div class="flex justify-center items-center gap-6 mt-8 py-4 text-xs text-gray-300">
            <div class="flex items-center gap-1">
                <Award class="w-4 h-4 text-yellow-400" />
                <span>Award Winning</span>
            </div>
            <div class="w-px h-4 bg-gray-500"></div>
            <div class="flex items-center gap-1"><span>Licensed & Bonded</span></div>
            <div class="w-px h-4 bg-gray-500"></div>
            <div class="flex items-center gap-1"><span>100% Satisfaction</span></div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <button
            on:click={() => scrollToSection('#about')}
            class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-white/70 hover:text-white transition-colors animate-bounce"
    >
        <span class="text-sm font-medium mb-1">Discover More</span>
        <div class="w-7 h-7 border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/10">
            <ChevronDown class="w-4 h-4" />
        </div>
    </button>
</section>

<style>
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0,-8px,0);
        }
        70% {
            transform: translate3d(0,-4px,0);
        }
        90% {
            transform: translate3d(0,-2px,0);
        }
    }

    .animate-bounce {
        animation: bounce 2s infinite;
    }
</style>