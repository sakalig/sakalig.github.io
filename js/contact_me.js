/*!
 * Vanilla JS for Contact Form (PHP version)
 * Replaces jQuery-dependent contact_me.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm'); // Ensure your form has this ID
    const successDiv = document.getElementById('success'); // Ensure this div exists for messages

    if (contactForm && successDiv) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault(); // Prevent default submit behaviour

            // Basic HTML5 validation check
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated'); // Trigger Bootstrap 5 validation styles
                return;
            }
            // Add .was-validated for styling after first submit attempt, or keep it if you prefer immediate validation styling
            contactForm.classList.add('was-validated');


            const formData = new FormData(contactForm);
            // const name = formData.get('name'); // Example if you need individual fields

            fetch("././mail/contact_me.php", { // Make sure this path is correct for your setup
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    // Attempt to get text for more detailed error, but provide a generic one if it fails
                    return response.text().then(text => { 
                        throw new Error(text || 'Server error or non-OK response'); 
                    });
                }
                return response.text(); // Or response.json() if your PHP script is set to return JSON
            })
            .then(data => {
                successDiv.innerHTML = `<div class='alert alert-success alert-dismissible fade show' role='alert'>
                                            <strong>Your message has been sent.</strong>
                                            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                        </div>`;
                contactForm.reset();
                contactForm.classList.remove('was-validated'); // Reset validation styling
            })
            .catch(error => {
                let errorMessage = "Sorry, it seems that the mail server is not responding. Please try again later!";
                if (error && error.message) {
                    // Potentially display a more specific error if it's not too technical
                    // For now, keeping it generic for the user. Log detailed error to console.
                    console.error("Form submission error:", error.message);
                }
                successDiv.innerHTML = `<div class='alert alert-danger alert-dismissible fade show' role='alert'>
                                            ${errorMessage}
                                            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                                        </div>`;
                // contactForm.reset(); // Optional: reset form on error too
                contactForm.classList.remove('was-validated'); // Reset validation styling
            });
        });
    }

    // Clear success/error messages when user starts typing in the name field again
    const nameInput = document.getElementById('name');
    if (nameInput && successDiv) {
        nameInput.addEventListener('focus', () => {
            successDiv.innerHTML = '';
        });
    }

    // Bootstrap 5 tab functionality is typically handled by data-bs-* attributes in HTML.
    // If there was specific jQuery '.tab("show")' logic not covered by data attributes,
    // it would need to be re-implemented using `new bootstrap.Tab(element).show()`.
    // For now, assuming data attributes are sufficient for any tab behavior.
    // Example:
    // document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tabEl => {
    //     tabEl.addEventListener('click', event => {
    //         event.preventDefault();
    //         const tab = new bootstrap.Tab(event.target);
    //         tab.show();
    //     });
    // });
});
