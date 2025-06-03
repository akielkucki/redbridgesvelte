<!-- Services.svelte -->
<script>
    import { onMount } from 'svelte';
    import { animate, inView } from 'motion';
    import { ArrowRight, Home, Building2, Landmark, Hammer } from 'lucide-svelte';

    let servicesRef;
    let hasAnimated = false;

    const services = [
        {
            title: 'Residential Construction',
            description: 'Custom homes and renovations that bring your vision to life',
            icon: Home,
            features: [
                'Custom Home Design',
                'Kitchen & Bath Remodels',
                'Home Additions',
                'Outdoor Living Spaces'
            ],
            color: 'from-red-500 to-orange-500',
            borderColor: 'border-t-red-500'
        },
        {
            title: 'Commercial Construction',
            description: 'Professional spaces designed for business success',
            icon: Building2,
            features: [
                'Office Buildings',
                'Retail Spaces',
                'Warehouses',
                'Healthcare Facilities'
            ],
            color: 'from-blue-500 to-cyan-500',
            borderColor: 'border-t-blue-500'
        },
        {
            title: 'Historic Restoration',
            description: "Preserving Bucks County's architectural heritage",
            icon: Landmark,
            features: [
                'Period-Accurate Restoration',
                'Structural Reinforcement',
                'Heritage Preservation',
                'Modern Integration'
            ],
            color: 'from-emerald-500 to-teal-500',
            borderColor: 'border-t-emerald-500'
        }
    ];

    onMount(() => {
        inView(
            servicesRef,
            () => {
                if (!hasAnimated) {
                    hasAnimated = true;
                    animateSection();
                }
            },
            { rootMargin: '0px 0px -20%' }
        );
    });

    function animateSection() {
        const header = servicesRef.querySelector('.header');

        // fade in everything
        servicesRef.querySelectorAll('*').forEach(el => {
            el.classList.remove('opacity-0');
            animate(el, { opacity: [0, 1] }, { duration: 0.6 });
        });

        // header slide-up
        if (header) {
            animate(
                header,
                { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
                { duration: 0.6 }
            );
        }

        // cards stagger
        servicesRef.querySelectorAll('.service-card').forEach((card, i) => {
            animate(
                card,
                {
                    opacity: [0, 1],
                    transform: ['translateY(50px) scale(0.9)', 'translateY(0) scale(1)']
                },
                { duration: 0.6, delay: 0.2 + i * 0.2 }
            );
        });

        // CTA fade-in
        const cta = servicesRef.querySelector('.cta-section');
        if (cta) {
            animate(
                cta,
                { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
                { duration: 0.6, delay: 0.8 }
            );
        }
    }

    function handleCardHover(e) {
        animate(
            e.currentTarget,
            {
                translateY: -8,
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            },
            { duration: 0.2 }
        );
    }

    function handleCardLeave(e) {
        animate(
            e.currentTarget,
            {
                translateY: 0,
                scale: 1,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            },
            { duration: 0.2 }
        );
    }

    function handleIconHover(e) {
        animate(
            e.currentTarget,
            { scale: 1.1, rotate: 5, translateY: -5 },
            { duration: 0.2 }
        );
    }

    function handleIconLeave(e) {
        animate(
            e.currentTarget,
            { scale: 1, rotate: 0, translateY: 0 },
            { duration: 0.2 }
        );
    }
</script>

<section
        bind:this={servicesRef}
        id="services"
        class="py-20 bg-white relative overflow-hidden"
>
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="header opacity-0 text-center mb-16">
            <div
                    class="inline-flex items-center gap-2 bg-red-100 text-brick-red px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform"
            >
                <Hammer class="h-4 w-4" />
                Our Expertise
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span class="text-brick-red">Services</span>
            </h2>

            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive construction solutions tailored to your vision, delivered
                with <span class="font-semibold text-brick-red">precision and excellence</span>
            </p>
        </div>

        <!-- Services Grid -->
        <div class="grid lg:grid-cols-3 gap-8 mb-16">
            {#each services as svc}
                <div
                        class="service-card group relative opacity-0 transition-opacity"
                        onmouseenter={handleCardHover}
                        onmouseleave={handleCardLeave}
                >
                    <div
                            class={`h-full bg-white rounded-xl shadow-lg ${svc.borderColor} p-8 transition-all duration-300`}
                    >
                        <div class="mb-6">
                            <div
                                    class={`icon-container w-16 h-16 bg-gradient-to-br ${svc.color} rounded-2xl flex items-center justify-center mb-6`}
                                    onmouseenter={handleIconHover}
                                    onmouseleave={handleIconLeave}
                            >
                                <svelte:component this={svc.icon} class="h-8 w-8 text-white" />
                            </div>

                            <h3 class="text-2xl font-bold text-gray-900 mb-4">{svc.title}</h3>
                            <p class="text-gray-600 leading-relaxed mb-6">{svc.description}</p>
                        </div>

                        <ul class="space-y-3 mb-8">
                            {#each svc.features as feat}
                                <li class="flex items-center text-gray-700">
                                    <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                    <span class="text-sm font-medium">{feat}</span>
                                </li>
                            {/each}
                        </ul>

                        <button class="text-brick-red hover:text-brick-red font-semibold flex items-center">
                            Learn More
                            <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Bottom CTA -->
        <div class="cta-section opacity-0 text-center">
            <button
                    class="bg-red-800 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg rounded-md hover:scale-105 transition-transform"
            >
                Discuss Your Project
                <ArrowRight class="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    </div>
</section>
