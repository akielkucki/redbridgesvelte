<script>
    import { onMount, onDestroy } from 'svelte';
    import { animate, scroll } from 'motion';
    import { Phone, X, Menu, ArrowRight } from 'lucide-svelte';

    // Props
    export let scrollToSection;

    // State
    let isScrolled = false;
    let mobileMenuOpen = false;
    let scrollY = 0;
    let backgroundOpacity = 0;
    let backgroundBlur = 0;

    // Elements
    let navRef;

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" }
    ];

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    function handleNavClick(href) {
        scrollToSection(href);
        mobileMenuOpen = false;
    }

    function handleScroll() {
        isScrolled = window.scrollY > 20;
        scrollY = window.scrollY;
        backgroundOpacity = Math.min(scrollY / 100, 0.95);
        backgroundBlur = Math.min(scrollY / 100 * 20, 20);
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        // Animate navbar on mount
        if (navRef) {
            animate(navRef, { y: [-20, 0], opacity: [0, 1] }, { duration: 0.6 });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<!-- Mobile menu backdrop -->
{#if mobileMenuOpen}
    <div
            class="fixed inset-0 bg-black/50 z-40 md:hidden"
            on:click={() => mobileMenuOpen = false}
            on:keydown={(e) => e.key === 'Escape' && (mobileMenuOpen = false)}
            role="button"
            tabindex="0"
    ></div>
{/if}

<header
        bind:this={navRef}
        class="fixed w-full z-50 transition-all duration-700"
        style="background-color: rgba(255, 255, 255, {backgroundOpacity}); backdrop-filter: blur({backgroundBlur}px);"
>
    <!-- Enhanced backdrop blur and border -->
    <div class={`absolute inset-0 transition-all duration-700 ${
    isScrolled
      ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5'
      : 'bg-gradient-to-b from-black/10 to-transparent'
  }`}></div>

    <div class="relative container mx-auto px-4 lg:px-6 py-4">
        <div class="flex justify-between items-center">
            <!-- Enhanced Logo -->
            <div class="flex items-center gap-3">
                <div class="relative">
                    <div class={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg relative overflow-hidden transition-all hover:scale-105 ${
            isScrolled ? 'bg-brick-red shadow-lg shadow-red-600/25' : 'bg-brick-red/90 backdrop-blur-sm'
          }`}>
                        <div class="absolute inset-0 bg-gradient-to-br from-[rgb(207,26,1)] to-[rgb(107,26,1)]"></div>
                        <span class="relative z-10">RC</span>
                    </div>
                </div>
                <div>
                    <h1 class={`text-xl lg:text-2xl font-bold transition-colors duration-500 ${
            isScrolled || mobileMenuOpen ? 'text-gray-900' : 'text-white'
          }`}>
                        Red Bridge Construction
                    </h1>
                    <div class={`h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 ${
            isScrolled ? 'w-0' : 'w-full'
          }`}></div>
                </div>
            </div>

            <!-- Enhanced Desktop Navigation -->
            <nav class="hidden lg:flex gap-1">
                {#each navLinks as link, index}
                    <button
                            on:click={() => handleNavClick(link.href)}
                            class={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
              isScrolled
                ? 'text-gray-700 hover:text-brick-red'
                : 'text-white/90 hover:text-white'
            }`}
                    >
                        <div class={`absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 hover:opacity-100 ${
              isScrolled
                ? 'bg-gray-100'
                : 'bg-white/10 backdrop-blur-sm'
            }`}></div>
                        <span class="relative z-10">{link.label}</span>
                    </button>
                {/each}
            </nav>

            <!-- Enhanced Action Buttons -->
            <div class="flex items-center gap-3">
                <div class="hidden lg:block">
                    <button class="bg-brick-red hover:bg-brick-red text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 group px-4 py-2 rounded-md font-medium hover:scale-105"
                    on:click={() => scrollToSection('#contact')}
                    >
                        <Phone class="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 inline" />
                        Get a Quote
                        <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 inline" />
                    </button>
                </div>

                <!-- Enhanced Mobile Menu Button -->
                <div class="lg:hidden">
                    <button
                            class={`relative px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 ${
              isScrolled
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            } backdrop-blur-sm`}
                            on:click={toggleMobileMenu}
                    >
                        <div class="transition-transform duration-300" style="transform: rotate({mobileMenuOpen ? 180 : 0}deg);">
                            {#if mobileMenuOpen}
                                <X class="h-5 w-5" />
                            {:else}
                                <Menu class="h-5 w-5" />
                            {/if}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Enhanced Mobile Navigation -->
{#if mobileMenuOpen}
    <div class="fixed left-0 right-0 z-40 lg:hidden top-20">
        <div class="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
            <div class="container mx-auto px-4 py-6">
                <nav class="flex flex-col space-y-2">
                    {#each navLinks as link, index}
                        <button
                                on:click={() => handleNavClick(link.href)}
                                class="relative font-medium text-gray-900 hover:text-brick-red transition-all duration-300 py-4 px-4 text-left rounded-xl group hover:translate-x-2 hover:bg-brick-red"
                        >
                            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-brick-red rounded-full group-hover:h-16 transition-all duration-200"></div>
                            <span class="relative z-10 text-lg">{link.label}</span>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <ArrowRight class="h-4 w-4 text-brick-red" />
                            </div>
                        </button>
                    {/each}

                    <div class="pt-4">
                        <button
                                class="w-full bg-brick-red hover:bg-brick-red text-white py-4 text-lg shadow-lg shadow-red-600/25 group rounded-md font-medium hover:scale-105 transition-all"
                                on:click={() => mobileMenuOpen = false}
                        >
                            <Phone class="mr-3 h-5 w-5 transition-transform group-hover:rotate-12 inline" />
                            Get a Quote
                            <ArrowRight class="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 inline" />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    </div>
{/if}

<style>
    :global(html) {
        scroll-behavior: smooth;
    }
</style>