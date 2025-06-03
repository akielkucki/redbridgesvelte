export async function load({ fetch }) {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();

        return {
            projects: projects || []
        };
    } catch (error) {
        console.error('Failed to load projects:', error);
        return {
            projects: [],
            error: 'Failed to load projects'
        };
    }
}