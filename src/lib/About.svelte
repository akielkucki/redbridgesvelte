<script>
    import {onMount} from 'svelte';
    import {Award, Clock, MapPin, Shield, Users, Trophy} from 'lucide-svelte';

    export let scrollToSection;

    let aboutRef = null;
    let show = false;

    onMount(() => {
        if (!aboutRef) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    show = true;
                    io.disconnect();
                }
            },
            {threshold: 0.25}
        );
        io.observe(aboutRef);
    });

    const years = new Date().getFullYear() - 1998;
</script>

<section
        id="about"
        bind:this={aboutRef}
        class="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100"
>
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div
                class="text-center mb-16 transition-all duration-700 ease-out opacity-0 translate-y-8"
                class:opacity-100={show}
                class:translate-y-0={show}
        >
            <span class="inline-flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin class="h-4 w-4"/> About Our Company
            </span>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span class="bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
                    About Red Bridge Construction
                </span>
            </h2>

            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Serving New Hope and Bucks County with
                <span class="font-semibold text-red-800">excellence and integrity</span> since 1998
            </p>
        </div>

        <!-- Two-column grid -->
        <div class="grid lg:grid-cols-2 gap-16">
            <!-- Image block -->
            <div
                    class="transition-all duration-700 ease-out opacity-0 translate-x-0 lg:translate-x-12"
                    class:opacity-100={show}
                    class:translate-x-0={show}
            >
                <div class="sticky top-[7rem] h-96 rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                            src="/about.jpg"
                            alt="Construction team at work"

                            loading="lazy"
                            decoding="async"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute top-4 left-4 bg-red-800/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        <Trophy class="inline h-4 w-4 mr-1"/>
                        Award Winning
                    </div>
                    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </div>

            <!-- Content block -->
            <div
                    class="space-y-8 transition-all duration-700 ease-out opacity-0 -translate-x-12"
                    class:opacity-100={show}
                    class:translate-x-0={show}
            >
                <h3 class="text-3xl md:text-4xl font-bold text-gray-900">
                    Your Trusted Builder in
                    <span class="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        Bucks County
                    </span>
                </h3>

                <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                        Rob Kielkucki founded Red Bridge Construction with a simple yet powerful mission:
                        to deliver exceptional construction services across New Hope and Bucks County.
                        For over {years} years we’ve been the trusted partner for homeowners
                        and business owners who demand excellence in every detail.
                    </p>

                    <p>
                        <strong class="text-gray-900">
                            How do you find the right general contractor in Bucks County?
                        </strong>
                        We make the process painless—working closely with you from initial vision to final walkthrough.
                    </p>

                    <p>
                        Experience matters. Our {years} years on the leading edge of building
                        and renovation mean rock-solid project delivery and superior results.
                    </p>

                    <p>
                        Based in New Hope, PA, we’ve earned a reputation for craftsmanship,
                        transparent communication, and finishing on time and on budget.
                    </p>
                </div>

                <!-- Feature cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {#each [
                        {txt: 'Licensed & Insured', icon: Shield, desc: 'Fully certified and protected'},
                        {txt: 'Quality Materials', icon: Award, desc: 'Only premium-grade supplies'},
                        {txt: 'Expert Craftsmen', icon: Users, desc: 'Skilled professional team'},
                        {txt: 'On-Time Completion', icon: Clock, desc: 'Deadlines you can trust'}
                    ] as f }
                        <div class="flex items-start p-4 rounded-xl bg-white/90 shadow border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-red-200">
                            <div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-100 transition-colors">
                                <svelte:component this={f.icon} class="h-6 w-6 text-red-800"/>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">{f.txt}</h4>
                                <p class="text-sm text-gray-600">{f.desc}</p>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- CTA buttons -->
                <div class="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                            on:click={() => scrollToSection && scrollToSection('#contact')}
                            class="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 font-semibold rounded-lg transition-transform hover:scale-105 hover:from-red-700 hover:to-red-900"
                    >
                        Contact Us
                    </button>
                    <button
                            on:click={() => scrollToSection && scrollToSection('#projects')}
                            class="border-2 border-gray-300 px-8 py-4 font-semibold rounded-lg text-gray-700 transition-transform hover:scale-105 hover:border-red-600 hover:bg-red-50 hover:text-red-800"
                    >
                        View Our Portfolio
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* no extra CSS needed—visibility controlled via class binding */
</style>
