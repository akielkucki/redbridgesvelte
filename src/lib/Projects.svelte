<script>
    import { onMount } from 'svelte';
    import {animate, inView, scroll} from 'motion';
    import { MapPin, ArrowRight, Sparkles, Building2, Home, Hammer } from 'lucide-svelte';

    // Props
    export let projects = [];
    export let onSelect;

    // State
    let activeFilter = 'all';
    let hoveredProject = null;

    // Elements
    let projectsRef;
    let isInView = false;

    const filters = [
        { id: 'all', label: 'All Projects', icon: Sparkles },
        { id: 'residential', label: 'Residential', icon: Home },
        { id: 'commercial', label: 'Commercial', icon: Building2},
        {id: 'restoration', label: 'Restoration', icon: Hammer}
    ];

    $: filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    onMount(() => {
            if (projectsRef) {
                // Parallax background animation
                scroll(({y}) => {
                    const backgroundElements = projectsRef.querySelectorAll('.background-element');
                    backgroundElements.forEach((el, i) => {
                        const speed = (i + 1) * 0.5;
                        animate(el, {
                            transform: `translateY(${y.progress * speed * -100}px)`
                        }, {duration: 0});
                    });
                });

               inView(projectsRef, () => {
                    isInView = true;
                    animateSection();
                })
            }

        });



    function animateSection() {
        if (!projectsRef) return;

        // Animate header
        const header = document.querySelector('.header');
        if (header) {
            animate(header,
                {opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)']},
                {duration: 0.6}
            );
        }

        // Animate filters
        const filters = document.querySelectorAll('.filter-btn');
        filters.forEach((filter, i) => {
            animate(filter,
                {opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)']},
                {duration: 0.5, delay: 0.1 + i * 0.05}
            );
        });

        // Animate project cards
        animateProjectCards();

        // Animate CTA
        const cta = document.querySelector('.cta-section');
        if (cta) {
            animate(cta,
                {opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)']},
                {duration: 0.6, delay: 0.8}
            );
        }
    }

    function animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            animate(card,
                {
                    opacity: [0, 1],
                    transform: ['translateY(10px)', 'translateY(0px)']
                },
                {duration: 0.3, delay: i * 0.05}
            );
        });
    }

    function handleFilterChange(filterId) {
        activeFilter = filterId;

        // Re-animate cards when filter changes
        setTimeout(() => {
            animateProjectCards();
        }, 50);
    }

    function handleCardHover(event, projectId) {
        hoveredProject = projectId;
        const card = event.currentTarget;
        animate(card, {
            transform: 'translateY(-8px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }, {duration: 0.3});
    }

    function handleCardLeave(event) {
        hoveredProject = null;
        const card = event.currentTarget;
        animate(card, {
            transform: 'translateY(0px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }, {duration: 0.3});
    }

    function handleImageHover(event) {
        const img = event.currentTarget;
        animate(img, {transform: 'scale(1.1)'}, {duration: 0.6});
    }

    function handleImageLeave(event) {
        const img = event.currentTarget;
        animate(img, {transform: 'scale(1)'}, {duration: 0.6});
    }
</script>

<section
        bind:this={projectsRef}
        id="projects"
        class="relative py-24 overflow-hidden"
>
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

    <div class="absolute inset-0 opacity-10">
        <div class="background-element absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div class="background-element absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="header opacity-0 text-center mb-16">
            <div class="inline-flex items-center gap-2 bg-red-50 text-brick-red rounded-full px-4 py-2 mb-6 hover:scale-105 transition-transform">
                <Sparkles class="h-4 w-4"/>
                <span class="text-sm font-medium">Portfolio Showcase</span>
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Our Projects
            </h2>

            <p class="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                Showcasing our finest work in New Hope and throughout Bucks County.
                Each project reflects our commitment to excellence and attention to detail.
            </p>
        </div>

        <!-- Modern Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-16">
            {#each filters as filter}
                <button
                        class={`filter-btn opacity-1 relative px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
                        on:click={() => handleFilterChange(filter.id)}
                >
          <span class="flex items-center gap-2">
            <svelte:component this={filter.icon} class="h-4 w-4"/>
              {filter.label}
          </span>

                    {#if activeFilter === filter.id}
                        <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl -z-10"></div>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- Projects Grid with Animation -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each filteredProjects as project, index (project.id)}
                <div
                        class="project-card opacity-0"
                        on:mouseenter={(e) => handleCardHover(e, project.id)}
                        on:mouseleave={handleCardLeave}
                >
                    <div class="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-lg">
                        <!-- Image Container with Overlay -->
                        <div class="relative h-64 overflow-hidden">
                            <div class={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div
                                    class="relative h-full w-full"
                                    on:mouseenter={handleImageHover}
                                    on:mouseleave={handleImageLeave}
                            >
                                <img
                                        src={project.image}
                                        alt={project.title}
                                        class="w-full h-full object-cover"
                                />
                            </div>

                            <!-- Category Badge -->
                            <div class="absolute top-4 left-4 z-20">
                <span class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {project.category}
                </span>
                            </div>

                            <!-- Hover Content -->
                            {#if hoveredProject === project.id}
                                <div class="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <p class="text-white text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            {/if}
                        </div>

                        <div class="relative z-10 p-6">
                            <h3 class="text-xl font-bold text-gray-900 group-hover:text-brick-red transition-colors duration-300 mb-2">
                                {project.title}
                            </h3>
                            <div class="flex items-center text-gray-600 mt-2 mb-4">
                                <MapPin class="h-4 w-4 mr-1 text-brick-red"/>
                                {project.location}
                            </div>
                        </div>

                        <div class="relative z-10 px-6 pb-6">
                            <button
                                    on:click={() => onSelect(project)}
                                    class="w-full group/btn hover:bg-red-50 hover:text-brick-red transition-all duration-300 p-3 rounded-md"
                            >
                                <span>View Project Details</span>
                                <ArrowRight
                                        class="ml-2 h-4 w-4 group-hover/btn:text-brick-red inline transition-transform group-hover/btn:translate-x-1"/>
                            </button>
                        </div>

                        <!-- Decorative Corner -->
                        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/10 to-transparent"></div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if filteredProjects.length === 0}
            <div class="text-center py-20">
                <p class="text-gray-500 text-lg">
                    No projects found in this category.
                </p>
            </div>
        {/if}

        <!-- Bottom CTA -->
        <div class="cta-section opacity-0 text-center mt-16">
            <button class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-xl shadow-red-600/25 rounded-md hover:scale-105 transition-transform">
                <span>Start Your Project</span>
                <ArrowRight class="ml-2 h-5 w-5 inline" />
            </button>
        </div>
    </div>

    <!-- Floating Decorative Elements -->
    <div class="absolute bottom-10 left-10 w-20 h-20 bg-red-500/5 rounded-full blur-xl floating-decoration"></div>
    <div class="absolute top-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl floating-decoration"></div>
</section>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .floating-decoration {
        animation: float 4s ease-in-out infinite;
    }

    .floating-decoration:nth-child(2) {
        animation-delay: 1s;
        animation-duration: 5s;
    }

    @keyframes float {
        0%, 100% { transform: scale(1) translateY(0px); opacity: 0.5; }
        50% { transform: scale(1.2) translateY(-10px); opacity: 0.8; }
    }
</style>