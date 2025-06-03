<script>
    import { onMount } from 'svelte';
    import { animate } from 'motion';
    import { MapPin, X } from 'lucide-svelte';

    // Props
    export let project = null;
    export let open = false;
    export let onClose;

    // Elements
    let modalRef;
    let contentRef;

    $: if (open && modalRef && contentRef) {
        animateModalOpen();
    }

    function animateModalOpen() {
        // Animate backdrop
        animate(modalRef, { opacity: [0, 1] }, { duration: 0.3 });

        // Animate modal content
        animate(contentRef, {
            opacity: [0, 1],
            transform: ['scale(0.95) translateY(-50%) translateX(-50%)', 'scale(1) translateY(-50%) translateX(-50%)']
        }, { duration: 0.3, delay: 0.1 });
    }

    function handleClose() {
        if (!modalRef || !contentRef) {
            onClose();
            return;
        }

        // Animate out
        animate(contentRef, {
            opacity: [1, 0],
            transform: ['scale(1) translateY(-50%) translateX(-50%)', 'scale(0.95) translateY(-50%) translateX(-50%)']
        }, { duration: 0.2 });

        animate(modalRef, { opacity: [1, 0] }, { duration: 0.2, delay: 0.1 });

        // Close after animation
        setTimeout(() => {
            onClose();
        }, 300);
    }

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            handleClose();
        }
    }

    onMount(() => {
        function handleGlobalKeydown(event) {
            if (open && event.key === 'Escape') {
                handleClose();
            }
        }

        document.addEventListener('keydown', handleGlobalKeydown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeydown);
        };
    });
</script>

{#if open && project}
    <div
            bind:this={modalRef}
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 opacity-0"
            on:click={handleBackdropClick}
            on:keydown={handleKeydown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
    >
        <div
                bind:this={contentRef}
                class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
                on:click|stopPropagation
        >
            <!-- Header -->
            <div class="relative p-6 border-b border-gray-200">
                <button
                        on:click={handleClose}
                        class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close modal"
                >
                    <X class="w-5 h-5 text-gray-500" />
                </button>

                <div class="pr-10">
                    <h3 id="modal-title" class="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div class="flex items-center text-gray-600">
                        <MapPin class="h-4 w-4 mr-1 text-brick-red" />
                        {project.location}
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6">
                <img
                        src={project.image}
                        alt={project.title}
                        class="w-full h-64 object-cover mb-6 rounded-lg shadow-sm"
                />

                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Project Overview</h4>
                    <p class="text-gray-700 leading-relaxed">{project.description}</p>
                </div>

                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul class="space-y-2">
                        {#each ['Custom design', 'High-quality materials', 'Sustainable practices', 'On schedule delivery'] as feature}
                            <li class="flex items-center text-gray-700">
                                <div class="w-2 h-2 bg-brick-red rounded-full mr-3 flex-shrink-0"></div>
                                <span>{feature}</span>
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="flex gap-4">
                    <button class="flex-1 bg-brick-red text-white py-3 rounded-md font-semibold hover:bg-brick-red transition-colors hover:scale-105 transform">
                        Contact About Project
                    </button>
                    <button
                            on:click={handleClose}
                            class="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}