const textArray = ["Junior Developer ", "OOP lover ", "Video game player ", "Pen Pineapple Apple Pen"]; // Array of texts to display
    const typingSpeed = 150; // Speed of typing
    const deletingSpeed = 100; // Speed of deleting
    const delayBetweenTexts = 1000; // Delay before typing new text

    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typedTextElement = document.getElementById("typed-text");

    function type() {
        const currentText = textArray[currentTextIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenTexts); // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % textArray.length;
            setTimeout(type, typingSpeed); // Start typing the next text
        } else {
            setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        type();
    });