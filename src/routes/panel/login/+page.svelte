<!-- src/routes/login/+page.svelte -->
<script>
    import { enhance } from '$app/forms';

    // if you want to show validation errors from your action:
    export let form;

    let isSubmitting = false;
</script>

<svelte:head>
    <title>Login - Construction Admin</title>
</svelte:head>

<div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-black mb-2">Construction Admin</h1>
            <p class="text-gray-600">Sign in to manage your projects</p>
        </div>

        <!-- Login Form -->
        <div class="border-2 border-black bg-white p-8">
            <form
                    method="POST"
                    use:enhance={() => {
                    isSubmitting = true;
                    return async ({ update }) => {
                        await update();
                        isSubmitting = false;
                    };
                }}
                    class="space-y-6"
            >
                <!-- Email Field -->
                <div class="space-y-2">
                    <label
                            for="email"
                            class="block text-sm font-semibold text-black uppercase tracking-wide"
                    >
                        Email Address
                    </label>
                    <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            class="w-full px-3 py-3 border-2 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                            placeholder="admin@company.com"
                            value={form?.email || ''}
                    />
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                    <label
                            for="password"
                            class="block text-sm font-semibold text-black uppercase tracking-wide"
                    >
                        Password
                    </label>
                    <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            class="w-full px-3 py-3 border-2 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                            placeholder="Enter your password"
                    />
                </div>

                <!-- Error Message -->
                {#if form?.error}
                    <div class="bg-gray-50 border-2 border-black p-3">
                        <p class="text-black font-semibold text-sm">{form.error}</p>
                    </div>
                {/if}

                <!-- Submit Button -->
                <button
                        type="submit"
                        disabled={isSubmitting}
                        class="w-full py-3 px-4 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white flex items-center justify-center"
                >
                    {#if isSubmitting}
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                            <span>Signing In...</span>
                        </div>
                    {:else}
                        Sign In
                    {/if}
                </button>
            </form>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
            <p class="text-sm text-gray-600">
                Secure admin access for construction project management
            </p>
        </div>
    </div>
</div>

<!-- Alternative minimal version without the box -->
<!--
<div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-black">Admin</h1>
        </div>

        <form
            method="POST"
            use:enhance={() => {
                isSubmitting = true;
                return async ({ update }) => {
                    await update();
                    isSubmitting = false;
                };
            }}
            class="space-y-8"
        >
            <div class="space-y-6">
                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        class="w-full px-0 py-3 border-0 border-b-2 border-black bg-transparent text-black placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                        placeholder="Email"
                        value={form?.email || ''}
                    />
                </div>

                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        class="w-full px-0 py-3 border-0 border-b-2 border-black bg-transparent text-black placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                        placeholder="Password"
                    />
                </div>
            </div>

            {#if form?.error}
                <div class="text-center text-black font-medium">
                    {form.error}
                </div>
            {/if}

            <button
                type="submit"
                disabled={isSubmitting}
                class="w-full py-4 border-2 border-black bg-black text-white font-bold hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50"
            >
                {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
        </form>
    </div>
</div>
-->