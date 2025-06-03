<script>
    import { onMount } from 'svelte';
    import { animate } from 'motion';
    import { MapPin, Phone, Mail, Clock } from 'lucide-svelte';

    let scrollToSection; // if you need to scroll from parent

    let contactRef = $state();
    let submitted = $state(false);
    let errorMsg  = $state('');
    let hasAnimated = $state(false); // Prevent multiple animations

    let firstName = $state('');
    let lastName  = $state('');
    let email     = $state('');
    let phone     = $state('');
    let service   = $state('');
    let message   = $state('');

    const infoItems = [
        { icon: MapPin, label: 'Office', value: '231 Red Bridge Rd Kintnersville, PA 18930' },
        { icon: Phone,  label: 'Phone',  value: '(215) 534-1008'               },
        { icon: Mail,   label: 'Email',  value: 'rob@redbridgeconstruction.com' },
        { icon: Clock,  label: 'Hours',  value: 'Mon–Fri · 8 AM–5 PM'          }
    ];

    async function onsubmit(e) {
        e.preventDefault();
        errorMsg = '';
        if (![firstName, lastName, email, service, message].every(Boolean)) {
            errorMsg = 'Please fill out all required fields.';
            return;
        }

        const payload = {
            to: 'rob@redbridgeconstructionllc.com',
            subject: `[Website Inquiry] ${service} – ${firstName} ${lastName}`,
            text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
            html: `<p><strong>First Name:</strong> ${firstName}</p>
                   <p><strong>Last Name:</strong> ${lastName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <p><strong>Service:</strong> ${service}</p>
                   <hr/>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, '<br/>')}</p>`,
            replyTo: email
        };

        const clientPayload = {
            to: email,
            subject: `Thank you for contacting Red Bridge Construction - We've received your inquiry`,
            text: `Hi ${firstName},\n\nThank you for reaching out to Red Bridge Construction! We have received your inquiry regarding our ${service.toLowerCase()} services.\n\nHere's a summary of what you submitted:\n\nService Interest: ${service}\nMessage: ${message}\n\nWe will review your request and get back to you within 24 hours. If you have any urgent questions, please feel free to call us at (215) 555-7890.\n\nThank you for considering Red Bridge Construction for your project!\n\nBest regards,\nThe Red Bridge Construction Team\n123 Bridge St, New Hope, PA\n(215) 555-7890\ninfo@redbridgeconstruction.com`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
                    <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Red Bridge Construction</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your inquiry!</p>
                    </div>

                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0 0 20px 0; font-size: 16px;">Hi <strong>${firstName}</strong>,</p>

                        <p style="margin: 0 0 20px 0;">Thank you for reaching out to Red Bridge Construction! We have received your inquiry regarding our <strong>${service.toLowerCase()}</strong> services.</p>

                        <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
                            <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 16px;">Summary of your inquiry:</h3>
                            <p style="margin: 0 0 10px 0;"><strong>Service Interest:</strong> ${service}</p>
                            <p style="margin: 0;"><strong>Your Message:</strong></p>
                            <p style="margin: 5px 0 0 0; font-style: italic; color: #6b7280;">"${message}"</p>
                        </div>

                        <p style="margin: 20px 0;">We will review your request and get back to you within <strong>24 hours</strong>. If you have any urgent questions, please feel free to call us at <a href="tel:2155557890" style="color: #dc2626; text-decoration: none;">(215) 555-7890</a>.</p>

                        <p style="margin: 20px 0 0 0;">Thank you for considering Red Bridge Construction for your project!</p>

                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                        <div style="text-align: center; color: #6b7280; font-size: 14px;">
                            <p style="margin: 0 0 10px 0;"><strong>Red Bridge Construction Team</strong></p>
                            <p style="margin: 0;">123 Bridge St, New Hope, PA</p>
                            <p style="margin: 5px 0;">📞 <a href="tel:2155557890" style="color: #dc2626; text-decoration: none;">(215) 555-7890</a></p>
                            <p style="margin: 5px 0;">✉️ <a href="mailto:info@redbridgeconstruction.com" style="color: #dc2626; text-decoration: none;">info@redbridgeconstruction.com</a></p>
                        </div>
                    </div>
                </div>
            `,
            replyTo: 'rob@redbridgeconstructionllc.com'
        };

        try {
            const res = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessEmail: payload,
                    clientEmail: clientPayload
                })
            });

            if (res.ok) {
                submitted = true;
                firstName = lastName = email = phone = service = message = '';
            } else {
                const text = await res.text();
                errorMsg = `Submission failed: ${text}`;
            }
        } catch (err) {
            errorMsg = `Error: ${err.message}`;
        }
    }

    function handleButtonHover(e) {
        animate(e.currentTarget, { scale: 1.05 }, { duration: 0.2 });
    }
    function handleButtonLeave(e) {
        animate(e.currentTarget, { scale: 1 }, { duration: 0.2 });
    }

    function triggerAnimations() {
        if (hasAnimated || !contactRef) return;
        hasAnimated = true;

        // Animate section titles
        const titles = contactRef.querySelectorAll('.section-title');
        titles.forEach((title, i) => {
            const dir = i === 0 ? -50 : 50;
            animate(
                title,
                { opacity: [0, 1], transform: [`translateX(${dir}px)`, 'translateX(0)'] },
                { duration: 0.6, delay: i * 0.1 }
            );
        });

        // Animate info items
        const items = contactRef.querySelectorAll('.info-item');
        items.forEach((item, i) => {
            animate(
                item,
                { opacity: [0, 1], transform: ['translateX(-30px)', 'translateX(0)'] },
                { duration: 0.5, delay: 0.3 + i * 0.1 }
            );
        });

        // Animate form
        const formEl = contactRef.querySelector('.contact-form');
        if (formEl) {
            animate(formEl,
                { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
                { duration: 0.6, delay: 0.4 }
            );
        }
    }

    onMount(() => {
        if (!contactRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    triggerAnimations();
                    observer.disconnect(); // Stop observing after animation
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Trigger 50px before the element fully enters
            }
        );

        observer.observe(contactRef);

        // Fallback: if element is already in view on page load
        setTimeout(() => {
            const rect = contactRef.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            console.log('Fallback check - In view:', isInView, 'hasAnimated:', hasAnimated);
            if (isInView && !hasAnimated) {
                triggerAnimations();
            }
        }, 100);

        // Emergency fallback - force visibility after 2 seconds if nothing happened
        setTimeout(() => {
            if (!hasAnimated) {
                console.log('Emergency fallback triggered');
                triggerAnimations();
            }
        }, 2000);

        // Cleanup
        return () => {
            observer.disconnect();
        };
    });
</script>

<section id="contact" bind:this={contactRef} class="py-20 bg-white">
    <div class="max-w-[90vw] lg:max-w-[80vw] mx-auto px-4 grid md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div>
            <h3 class="text-3xl font-extrabold mb-6 text-gray-800">
                Contact Us
            </h3>
            <div>
                {#each infoItems as item}
                    <div class="flex items-start mb-6">
                        <div class="mr-4 bg-red-50 p-3 rounded-full">
                            <svelte:component this={item.icon} class="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h4 class="font-semibold text-lg text-gray-700">{item.label}</h4>
                            <p class="text-gray-600">{item.value}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Contact Form -->
        <div>
            <h3 class="text-3xl font-extrabold mb-6 text-gray-800">
                Send a Message
            </h3>

            {#if submitted}
                <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
                    ✓ Your message was sent successfully! We'll get back to you soon.
                </div>
            {/if}
            {#if errorMsg}
                <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                    ⚠ {errorMsg}
                </div>
            {/if}

            <form class="space-y-5" on:submit={onsubmit}>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                            type="text"
                            placeholder="First Name"
                            bind:value={firstName}
                            class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            required
                    />
                    <input
                            type="text"
                            placeholder="Last Name"
                            bind:value={lastName}
                            class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            required
                    />
                </div>

                <input
                        type="email"
                        placeholder="Email"
                        bind:value={email}
                        class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        required
                />

                <input
                        type="tel"
                        placeholder="Phone"
                        bind:value={phone}
                        class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />

                <select
                        bind:value={service}
                        class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all bg-white"
                        required
                >
                    <option value="" disabled selected>Select Service</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Restoration">Restoration</option>
                </select>

                <textarea
                        rows="4"
                        placeholder="Your message..."
                        bind:value={message}
                        class="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-vertical"
                        required
                ></textarea>

                <button
                        type="submit"
                        class="w-full py-3 bg-red-800 hover:bg-red-700 text-white font-bold rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        on:mouseenter={handleButtonHover}
                        on:mouseleave={handleButtonLeave}
                        disabled={submitted}
                >
                    {submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
            </form>
        </div>
    </div>
</section>

<style>
    .opacity-0 {
        opacity: 0;
    }

    /* Ensure animations work even if JS is disabled */
    @media (prefers-reduced-motion: reduce) {
        .opacity-0 {
            opacity: 1;
        }
    }
</style>