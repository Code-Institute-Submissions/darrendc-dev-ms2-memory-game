function sendMail(contactForm){
    emailjs.send("service_ndp23n4","template_g04c9vt",{
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_ideas": contactForm.projectidea.value,
        })
    .then(
        function(response) {
            console.log("Success", response);
            contactForm.reset();
        },
        function(error){
            console.log("FAILED", error);
        });
    return false;
}