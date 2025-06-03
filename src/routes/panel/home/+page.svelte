<script>
    import { invalidateAll } from '$app/navigation';

    let { data } = $props();
    let projects = $derived(data.projects || []);
    let error = $derived(data.error);

    // Modal states using Svelte 5 runes
    let showCreateModal = $state(false);
    let showEditModal = $state(false);
    let showDeleteModal = $state(false);
    let selectedProject = $state(null);
    let isSubmitting = $state(false);

    // Form data
    let formData = $state({
        name: '',
        description: '',
        location: '',
        status: 'planning',
        startDate: '',
        endDate: '',
        budget: ''
    });

    // Reset form
    function resetForm() {
        formData = {
            name: '',
            description: '',
            location: '',
            status: 'planning',
            startDate: '',
            endDate: '',
            budget: ''
        };
    }

    // Open create modal
    function openCreateModal() {
        resetForm();
        showCreateModal = true;
    }

    // Open edit modal
    function openEditModal(project) {
        selectedProject = project;
        formData = {
            name: project.name || '',
            description: project.description || '',
            location: project.location || '',
            status: project.status || 'planning',
            startDate: project.startDate || '',
            endDate: project.endDate || '',
            budget: project.budget?.toString() || ''
        };
        showEditModal = true;
    }

    // Open delete modal
    function openDeleteModal(project) {
        selectedProject = project;
        showDeleteModal = true;
    }

    // Close all modals
    function closeModals() {
        showCreateModal = false;
        showEditModal = false;
        showDeleteModal = false;
        selectedProject = null;
        resetForm();
    }

    // Create project
    async function createProject() {
        isSubmitting = true;
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    budget: formData.budget ? parseFloat(formData.budget) : null
                })
            });

            if (response.ok) {
                await invalidateAll();
                closeModals();
            } else {
                throw new Error('Failed to create project');
            }
        } catch (error) {
            console.error('Create failed:', error);
            alert('Failed to create project. Please try again.');
        } finally {
            isSubmitting = false;
        }
    }

    // Update project
    async function updateProject() {
        if (!selectedProject) return;

        isSubmitting = true;
        try {
            const response = await fetch(`/api/projects/${selectedProject.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    budget: formData.budget ? parseFloat(formData.budget) : null
                })
            });

            if (response.ok) {
                await invalidateAll();
                closeModals();
            } else {
                throw new Error('Failed to update project');
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update project. Please try again.');
        } finally {
            isSubmitting = false;
        }
    }

    // Delete project
    async function deleteProject() {
        if (!selectedProject) return;

        isSubmitting = true;
        try {
            const response = await fetch(`/api/projects/${selectedProject.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await invalidateAll();
                closeModals();
            } else {
                throw new Error('Failed to delete project');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete project. Please try again.');
        } finally {
            isSubmitting = false;
        }
    }

    // Handle form submission
    function handleSubmit(e, action) {
        e.preventDefault();
        if (action === 'create') {
            createProject();
        } else if (action === 'update') {
            updateProject();
        }
    }

    // Close modal on escape key
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    }
</script>

<svelte:head>
    <title>Construction Projects Admin</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b-2 border-black">
        <h1 class="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-0">Construction Projects</h1>
        <button
                onclick={openCreateModal}
                class="inline-flex items-center px-4 py-2 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200"
        >
            + Add New Project
        </button>
    </header>

    {#if error}
        <div class="bg-gray-50 border-2 border-black p-4 mb-8 text-black font-semibold">
            {error}
        </div>
    {/if}

    {#if projects.length === 0 && !error}
        <div class="text-center py-16 px-8 border-2 border-dashed border-black bg-gray-50">
            <h2 class="text-xl font-bold text-black mb-4">No Projects Found</h2>
            <p class="text-gray-600 mb-8">Get started by adding your first construction project.</p>
            <button
                    onclick={openCreateModal}
                    class="inline-flex items-center px-4 py-2 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200"
            >
                Add First Project
            </button>
        </div>
    {:else}
        <div class="overflow-x-auto border-2 border-black">
            <table class="w-full border-collapse bg-white">
                <thead>
                <tr class="bg-gray-50">
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Project Name</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Location</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Status</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Start Date</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">End Date</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Budget</th>
                    <th class="px-4 py-3 text-left font-bold text-black border-b-2 border-black">Actions</th>
                </tr>
                </thead>
                <tbody>
                {#each projects as project}
                    <tr class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-4 py-3 border-b border-black min-w-48">
                            <div class="font-semibold text-black mb-1">{project.name || 'Untitled Project'}</div>
                            {#if project.description}
                                <div class="text-sm text-gray-600 leading-tight hidden md:block">
                                    {project.description}
                                </div>
                            {/if}
                        </td>
                        <td class="px-4 py-3 border-b border-black text-gray-900">{project.location || 'N/A'}</td>
                        <td class="px-4 py-3 border-b border-black">
                                <span class="inline-block px-2 py-1 text-xs font-semibold uppercase border border-black
                                    {project.status?.toLowerCase() === 'planning' ? 'bg-white text-black' : ''}
                                    {project.status?.toLowerCase() === 'active' || project.status?.toLowerCase() === 'in-progress' ? 'bg-black text-white' : ''}
                                    {project.status?.toLowerCase() === 'completed' ? 'bg-gray-100 text-black' : ''}
                                    {project.status?.toLowerCase() === 'on-hold' || project.status?.toLowerCase() === 'cancelled' ? 'bg-white text-gray-600 border-gray-600' : ''}
                                    {!project.status || project.status?.toLowerCase() === 'unknown' ? 'bg-white text-black' : ''}
                                ">
                                    {project.status || 'Unknown'}
                                </span>
                        </td>
                        <td class="px-4 py-3 border-b border-black text-gray-900">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td class="px-4 py-3 border-b border-black text-gray-900">
                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td class="px-4 py-3 border-b border-black text-gray-900">
                            {#if project.budget}
                                ${project.budget.toLocaleString()}
                            {:else}
                                N/A
                            {/if}
                        </td>
                        <td class="px-4 py-3 border-b border-black">
                            <div class="flex items-center space-x-2">
                                <button
                                        class="w-8 h-8 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
                                        onclick={() => openEditModal(project)}
                                        title="Edit Project"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                </button>
                                <button
                                        class="w-8 h-8 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
                                        onclick={() => openDeleteModal(project)}
                                        title="Delete Project"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<!-- Create/Edit Modal -->
{#if showCreateModal || showEditModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white border-2 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="border-b-2 border-black p-4">
                <h2 class="text-xl font-bold text-black">
                    {showCreateModal ? 'Create New Project' : 'Edit Project'}
                </h2>
            </div>

            <form onsubmit={(e) => handleSubmit(e, showCreateModal ? 'create' : 'update')} class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            Project Name *
                        </label>
                        <input
                                id="name"
                                type="text"
                                bind:value={formData.name}
                                required
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                                placeholder="Enter project name"
                        />
                    </div>

                    <div class="space-y-2">
                        <label for="location" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            Location
                        </label>
                        <input
                                id="location"
                                type="text"
                                bind:value={formData.location}
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                                placeholder="Project location"
                        />
                    </div>

                    <div class="space-y-2">
                        <label for="status" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            Status
                        </label>
                        <select
                                id="status"
                                bind:value={formData.status}
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                        >
                            <option value="planning">Planning</option>
                            <option value="active">Active</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on-hold">On Hold</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label for="budget" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            Budget ($)
                        </label>
                        <input
                                id="budget"
                                type="number"
                                bind:value={formData.budget}
                                min="0"
                                step="0.01"
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                                placeholder="0.00"
                        />
                    </div>

                    <div class="space-y-2">
                        <label for="startDate" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            Start Date
                        </label>
                        <input
                                id="startDate"
                                type="date"
                                bind:value={formData.startDate}
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                        />
                    </div>

                    <div class="space-y-2">
                        <label for="endDate" class="block text-sm font-semibold text-black uppercase tracking-wide">
                            End Date
                        </label>
                        <input
                                id="endDate"
                                type="date"
                                bind:value={formData.endDate}
                                class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200"
                        />
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="description" class="block text-sm font-semibold text-black uppercase tracking-wide">
                        Description
                    </label>
                    <textarea
                            id="description"
                            bind:value={formData.description}
                            rows="4"
                            class="w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none focus:border-gray-600 transition-colors duration-200 resize-vertical"
                            placeholder="Project description and notes"
                    ></textarea>
                </div>

                <div class="flex justify-end space-x-4 pt-4 border-t-2 border-black">
                    <button
                            type="button"
                            onclick={closeModals}
                            class="px-4 py-2 border-2 border-black bg-white text-black font-semibold hover:bg-gray-50 transition-colors duration-200"
                            disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                            type="submit"
                            class="px-4 py-2 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            disabled={isSubmitting}
                    >
                        {#if isSubmitting}
                            <div class="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                            <span>{showCreateModal ? 'Creating...' : 'Updating...'}</span>
                        {:else}
                            <span>{showCreateModal ? 'Create Project' : 'Update Project'}</span>
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteModal && selectedProject}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white border-2 border-black w-full max-w-md">
            <div class="border-b-2 border-black p-4">
                <h2 class="text-xl font-bold text-black">Delete Project</h2>
            </div>

            <div class="p-6">
                <p class="text-black mb-4">
                    Are you sure you want to delete <strong>"{selectedProject.name}"</strong>?
                </p>
                <p class="text-gray-600 text-sm">
                    This action cannot be undone.
                </p>
            </div>

            <div class="flex justify-end space-x-4 p-4 border-t-2 border-black">
                <button
                        type="button"
                        onclick={closeModals}
                        class="px-4 py-2 border-2 border-black bg-white text-black font-semibold hover:bg-gray-50 transition-colors duration-200"
                        disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                        type="button"
                        onclick={deleteProject}
                        class="px-4 py-2 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        disabled={isSubmitting}
                >
                    {#if isSubmitting}
                        <div class="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                    {:else}
                        <span>Delete Project</span>
                    {/if}
                </button>
            </div>
        </div>
    </div>
{/if}