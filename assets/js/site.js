const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const message = [
            "Hola, quisiera consultar una salida en buggy en Macao.",
            `Nombre: ${formData.get("name")}`,
            `Fecha tentativa: ${formData.get("date") || "Por definir"}`,
            `Personas: ${formData.get("people")}`,
            `Mensaje: ${formData.get("message") || "Sin mensaje adicional"}`
        ].join("\n");
        const status = contactForm.querySelector("[data-form-status]");

        try {
            if (navigator.share) {
                await navigator.share({ title: "Consulta de salida en buggy", text: message });
                status.textContent = "Consulta compartida. Elige el canal del rancho para enviarla.";
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(message);
                status.textContent = "Consulta copiada. Pégala en tu canal de contacto con el rancho.";
            } else {
                throw new Error("Este navegador no permite compartir ni copiar el mensaje automáticamente.");
            }
        } catch (error) {
            if (error.name === "AbortError") return;
            status.textContent = error.message;
        }
    });
}
