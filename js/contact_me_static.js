/*!
 * Vanilla JS for Static Contact Form
 * Replaces jQuery-dependent contact_me_static.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // This script assumes that the static form (e.g., submitting to Formspree or Netlify)
    // will largely rely on HTML5 built-in validation and Bootstrap 5's styling for that validation.
    // The main purpose of this JS for a static form is to trigger Bootstrap's validation display
    // if client-side feedback is desired before the browser's own submission attempt.

    const staticContactForm = document.getElementById('contactFormStatic'); // Ensure your static form has this ID

    if (staticContactForm) {
        staticContactForm.addEventListener('submit', event => {
            // If the form is not valid according to HTML5 constraints,
            // prevent submission (though the browser might do this anyway)
            // and add 'was-validated' to trigger Bootstrap's styles.
            if (!staticContactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            staticContactForm.classList.add('was-validated');
            
            // Note: No AJAX submission here. This form should have an 'action' attribute
            // pointing to the static form handler (e.g., Formspree endpoint).
            // If submission is successful, the user will navigate to the service's thank you page,
            // or the service might redirect them back.
            // If there are errors (e.g. from Formspree), the service usually handles displaying them.
        });
    }

    // Clear any pre-existing server-side error messages (if they were somehow injected into #success)
    // when user starts typing in the name field again.
    // This is less relevant for purely static forms unless there's a custom setup.
    const nameInput = document.getElementById('name'); // Assuming the name input has id="name"
    const successDiv = document.getElementById('success'); // Assuming a div with id="success" for messages

    if (nameInput && successDiv) {
        nameInput.addEventListener('focus', () => {
            // Only clear if it's an error message specific to this form.
            // For static forms, #success might not be used by this script directly.
            // If Formspree shows errors on the page itself, this might not be needed.
            // successDiv.innerHTML = ''; // Be cautious with this if external services manage this div.
        });
    }

    // Bootstrap 5 tab functionality is typically handled by data-bs-* attributes in HTML.
    // The old jQuery `$(this).tab("show")` is not needed if using data attributes.
    // If any advanced tab control was intended, it would require specific vanilla JS:
    // document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tabEl => {
    //     tabEl.addEventListener('click', event => {
    //         event.preventDefault();
    //         const tab = new bootstrap.Tab(event.target);
    //         tab.show();
    //     });
    // });
    // For now, assuming no such advanced control is needed beyond what data attributes provide.
});
