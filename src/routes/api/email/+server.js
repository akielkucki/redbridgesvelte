import { Resend } from 'resend';

import { RESEND_API_KEY} from "$env/static/private";

const resend = new Resend(RESEND_API_KEY);

const allowedOrigins = [
    'https://redbridgeconstructionllc.com',
    'https://www.redbridgeconstructionllc.com',
    'http://localhost:5173',
    'http://localhost:3000'
];

export const POST = async ({ request }) => {
    const origin = request.headers.get('origin');

    if (!allowedOrigins.includes(origin)) {
        return new Response('CORS policy: Access denied', {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'null'
            }
        });
    }

    const { businessEmail, clientEmail } = await request.json();

    try {
        // Send business notification
        await resend.emails.send({
            from: 'rob@redbridgeconstructionllc.com',
            to: businessEmail.to,
            cc: 'redbridgeconstructionllc@gmail.com',
            subject: businessEmail.subject,
            html: businessEmail.html,
            text: businessEmail.text,
            replyTo: businessEmail.replyTo
        });

        // Send client confirmation
        await resend.emails.send({
            from: 'rob@redbridgeconstructionllc.com',
            to: clientEmail.to,
            subject: clientEmail.subject,
            html: clientEmail.html,
            text: clientEmail.text,
            replyTo: clientEmail.replyTo
        });

        return new Response('Emails Sent Successfully!', {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': origin
            }
        });
    }
};

export const OPTIONS = async ({ request }) => {
    const origin = request.headers.get('origin');

    if (!allowedOrigins.includes(origin)) {
        return new Response('CORS policy: Access denied', {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'null'
            }
        });
    }

    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
};
