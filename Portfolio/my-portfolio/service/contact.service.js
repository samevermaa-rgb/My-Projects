// services/contact.service.js

export const sendContactMessage = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Service Error:", error);

    throw error;
  }
};