// src/routes/api/projects/+server.js

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const projects = [
        {
            id: 1,
            title: 'Modern Bathroom Renovation',
            location: 'New Hope, PA',
            type: 'Bathroom',
            description: 'Complete remodel with walk-in shower, marble tiles, and modern fixtures.',
            images: [
                '/images/projects/bathroom1.jpg',
                '/images/projects/bathroom2.jpg'
            ]
        },
        {
            id: 2,
            title: 'Deck Expansion with Pergola',
            location: 'New Hope, PA',
            type: 'Deck',
            description: 'Expanded outdoor deck with weather-resistant materials and a custom pergola.',
            images: [
                '/images/projects/deck1.jpg',
                '/images/projects/deck2.jpg'
            ]
        },
        {
            id: 3,
            title: 'Rustic Bathroom Update',
            location: 'New Hope, PA',
            type: 'Bathroom',
            description: 'Rustic styling with wooden accents, freestanding tub, and bronze fixtures.',
            images: [
                '/images/projects/bathroom3.jpg',
                '/images/projects/bathroom4.jpg'
            ]
        }
    ];

    return new Response(JSON.stringify({ projects }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

// This is a placeholder for future updates to project data
/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
    const body = await request.json();
    // You would update your DB here.
    console.log('Update request received:', body);

    return new Response(JSON.stringify({ message: 'Project updated successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
