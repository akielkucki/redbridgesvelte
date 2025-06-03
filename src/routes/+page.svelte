<script>
    import {createBubbler, stopPropagation} from 'svelte/legacy';
    import {onMount} from 'svelte';
    import {animate, inView, scroll} from 'motion';
    import {Clock, Mail, MapPin, Phone, ChevronLeft, ChevronRight, X} from 'lucide-svelte';
    import Navbar from "$lib/Navbar.svelte";
    import Hero from "$lib/Hero.svelte";
    import About from "$lib/About.svelte";
    import Services from "$lib/Services.svelte";
    import CTA from "$lib/CTA.svelte";
    import Contact from "$lib/Contact.svelte";

    const bubble = createBubbler();

    // State management
    let selectedProject = $state(null);
    let openModal = $state(false);
    let currentImageIndex = $state(0);
    let modalRef = $state();
    let isLoaded = false;
    let servicesInView = $state(false);
    let servicesRef = $state();

    // Elements for animations
    let heroRef = $state();
    let aboutRef = $state();
    let contactRef = $state();

    // Motion controls for hero parallax – created once, mutated every frame
    let heroControls;

    const projects = [
        {
            id: 1,
            title: "Shed Remodeling",
            location: "New Hope, PA",
            description:
                "Modernized outdoor shed with enhanced functionality and aesthetic appeal. This project involved complete structural renovation, modern insulation, electrical upgrades, and custom storage solutions.",
            image: [
                "/Shed/IMG_5547.png",
                "/Shed/IMG_5568.png",
                "/Shed/5569.png",
                "/Shed/IMG_5573.png",
                "/Shed/IMG_5574.png",
                "/Shed/IMG_5576.png",
                "/Shed/IMG_5578.png"
            ],
            category: "residential"
        },
        {
            id: 2,
            title: "Bathroom Remodel #1",
            location: "New Hope, PA",
            description:
                "Complete master bathroom renovation: replaced tilework, installed new frameless glass enclosure, updated plumbing fixtures in brushed brass, and added custom niche shelving for modern storage.",
            image: [
                "/Bathroom1/IMG_5846.png",
                "/Bathroom1/IMG_5962.png",
                "/Bathroom1/IMG_5997.png"
            ],
            category: "residential"
        },
        {
            id: 3,
            title: "Bathroom Remodel #2",
            location: "New Hope, PA",
            description:
                "Secondary bathroom upgrade featuring full wall tile installation with patterned marble mosaic, recessed ceiling lighting, new rainfall showerhead, and a floating vanity with under‑cabinet LED accents.",
            image: [
                "/Bathroom2/IMG_6005.png",
                "/Bathroom2/IMG_6006.png",
                "/Bathroom2/IMG_6007.png"
            ],
            category: "residential"
        }
    ];

    const infoItems = [
        { icon: MapPin, label: 'Office', value: '123 Bridge St, New Hope, PA' },
        { icon: Phone, label: 'Phone', value: '(215) 555-7890' },
        { icon: Mail, label: 'Email', value: 'info@redbridgeconstruction.com' },
        { icon: Clock, label: 'Hours', value: 'Mon–Fri: 8AM–5PM' }
    ];

    function handleProjectSelect(project) {
        selectedProject = project;
        currentImageIndex = 0;
        openModal = true;

        // Ensure the modal element exists before animating
        setTimeout(() => {
            if (modalRef) {
                animate(modalRef, {
                    opacity: [0, 1],
                    transform: ['scale(0.8)', 'scale(1)']
                }, {
                    duration: 0.3,
                    easing: [0.25, 0.46, 0.45, 0.94]
                });
            }
        }, 10);
    }

    function closeModal() {
        openModal = false;
        selectedProject = null;
    }

    function nextImage() {
        if (selectedProject?.image) {
            currentImageIndex = (currentImageIndex + 1) % selectedProject.image.length;
        }
    }

    function prevImage() {
        if (selectedProject?.image) {
            currentImageIndex = currentImageIndex === 0
                ? selectedProject.image.length - 1
                : currentImageIndex - 1;
        }
    }

    const goToImage = (index) => currentImageIndex = index;

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    onMount(() => {
        isLoaded = true;

        // One‑time hero animation instance – mutated on scroll
        if (heroRef) {
            heroControls = animate(heroRef, {
                opacity: 1,
                transform: 'translateY(0) scale(1)'
            }, {
                duration: 0,
                autoplay: false
            });

            scroll(({ y }) => {
                const p = Math.min(y.progress, 0.3);
                heroControls.applyStyles({
                    opacity: 1 - p * 3.33,
                    transform: `scale(${1 - p * 0.1}) translateY(${-p * 50}px)`
                });
            });
        }

        // Throttled in‑view detection for Services section
        inView(servicesRef, () => {
            servicesInView = true;
        }, {amount: 0.2});

        // About fade‑in
        aboutRef && animate(aboutRef, {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0)']
        }, { duration: 0.6, delay: 0.1 });

        // Gentle float on decorative elements
        const floating = document.querySelectorAll('.floating');
        floating.forEach((el, i) => {
            animate(el, {
                transform: ['translateY(-10px)', 'translateY(10px)', 'translateY(-10px)']
            }, {duration: 5, repeat: Infinity, delay: i});
        });
    });
</script>

<svelte:head>
    <title>Red Bridge Construction</title>
    <!-- Preload hero & first project image for fast first paint -->
    {#each projects as project}
        <link rel="preload" href={project.image[0]} as="image"/>
    {/each}
</svelte:head>

<!-- Navbar Component -->
<Navbar scrollToSection={scrollToSection}/>

<!-- Hero Section -->
<Hero bind:this={heroRef} class="hero-will-change"/>

<!-- About Section -->
<About bind:this={aboutRef}/>

<!-- Services Section -->
<Services bind:this={servicesRef}/>

<!-- Projects Section -->
<section id="projects" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">Featured Projects</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each projects as project}
                <div
                        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onclick={() => handleProjectSelect(project)}
                        onkeydown={(e) => e.key === 'Enter' && handleProjectSelect(project)}
                        role="button"
                        tabindex="0"
                >
                    <img
                            src={project.image[0]}
                            alt={project.title}
                            class="w-full h-48 object-cover"
                            loading="lazy" decoding="async"
                    />
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">{project.title}</h3>
                        <p class="text-gray-600 mb-2 flex items-center">
                            <MapPin class="h-4 w-4 mr-1"/> {project.location}
                        </p>
                        <p class="text-gray-700">{project.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<CTA/>

<!-- Contact Section -->
<Contact bind:this={contactRef}/>

<!-- Enhanced Project Modal with Carousel -->
{#if openModal && selectedProject}
    <div
            class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onclick={()=>closeModal()} onkeydown={(e) => e.key === 'Escape' && closeModal()}
            role="dialog" aria-modal="true"
    >
    <div
            bind:this={modalRef}
            class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl modal-content"
            onclick={stopPropagation(bubble('click'))}
    >
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
                <h3 class="text-2xl font-bold text-gray-800">{selectedProject.title}</h3>
                <div class="flex items-center text-gray-600 mt-1">
                    <MapPin class="h-4 w-4 mr-1"/> {selectedProject.location}
                </div>
            </div>
            <button onclick={()=>closeModal()} class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal">
                <X class="h-6 w-6 text-gray-500"/>
            </button>
        </div>

        <div class="flex flex-col lg:flex-row">
            <!-- Image Carousel -->
            <div class="lg:w-2/3 relative">
                <div class="relative h-80 lg:h-96 overflow-hidden">
                    <!-- Main Image -->
                    <img
                            src={selectedProject.image[currentImageIndex]}
                            alt={`${selectedProject.title} – Image ${currentImageIndex + 1}`}
                            class="w-full h-full object-cover transition-all duration-500 ease-in-out" loading="lazy"
                            decoding="async"
                    />

                    {#if selectedProject.image.length > 1}
                        <!-- Navigation Arrows -->
                        <button onclick={prevImage}
                                class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                                aria-label="Previous image">
                            <ChevronLeft class="h-5 w-5 text-gray-700"/>
                        </button>
                        <button onclick={nextImage}
                                class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                                aria-label="Next image">
                            <ChevronRight class="h-5 w-5 text-gray-700"/>
                        </button>
                    {/if}

                    <!-- Image Counter -->
                    <div class="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedProject.image.length}
                    </div>
                </div>

                {#if selectedProject.image.length > 1}
                    <!-- Thumbnail Navigation -->
                    <div class="flex gap-2 p-4 overflow-x-auto">
                        {#each selectedProject.image as image, index}
                            <button onclick={() => goToImage(index)}
                                    class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all {index === currentImageIndex ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 hover:border-gray-300'}">
                                <img src={image} alt={`Thumbnail ${index + 1}`} class="w-full h-full object-cover"
                                     loading="lazy" decoding="async"/>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Project Details -->
            <div class="lg:w-1/3 p-6 bg-gray-50 overflow-y-auto">
                <div class="space-y-6">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Project Details</h4>
                        <p class="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                        <ul class="space-y-2">
                            {#each ['Custom design', 'High-quality materials', 'Sustainable practices', 'On schedule delivery', 'Expert craftsmanship', '5-year warranty'] as feature}
                                <li class="flex items-center text-gray-600"><span
                                        class="w-2 h-2 bg-red-500 rounded-full mr-3"></span>{feature}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="pt-4 border-t border-gray-200">
                        <button class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg">
                            Contact About This Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
{/if}

<style>
    /* Make hero cheap to animate */
    .hero-will-change {
        will-change: transform, opacity;
    }

    /* Smooth image transitions */
    .carousel-image {
        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Custom scrollbar for thumbnails */
    .overflow-x-auto::-webkit-scrollbar {
        height: 4px;
    }

    .overflow-x-auto::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }

    .overflow-x-auto::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 2px;
    }

    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
        background: #d1d5db;
    }
</style>
