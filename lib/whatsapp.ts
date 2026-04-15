export const openWhatsAppPayment = (plan: string, price: string) => {
  const phoneNumber = "2347017838958"; 

  const message = `
Hello 👋

I want to enroll for your *${plan} Mentorship Plan*.

💰 Price: ${price}

Please send me payment details and how to proceed.

Thank you.
  `;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};
