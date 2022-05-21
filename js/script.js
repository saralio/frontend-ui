function validateEmail(text) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
        return (true)
    } else {
        return (false)
    }
}


async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData['isActive'] = true
    plainFormData['emailSendFrequency'] = "daily"
    const formDataJsonString = JSON.stringify(plainFormData);

    var subscribeButton = document.getElementById("registerLink")
    var registerSuccessText = document.getElementById("registerSuccessText")
    var registerUnsuccessText = document.getElementById("registerUnSuccessfulText")
    var emailCheck = document.getElementById("emailCheck")

    if (!validateEmail(plainFormData.emailId)) {
        emailCheck.style.display = "block"
        // subscribeButton.style.display = "none"
        throw new Error("incorrect email provided, can't register")
    }

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (response.ok) {
        subscribeButton.style.display = "none"
        registerSuccessText.style.display = "block"
        registerUnsuccessText.style.display = "none"
        emailCheck.style.display = "none"
        return response.json();
    } else {
        subscribeButton.style.display = "none"
        registerSuccessText.style.display = "none"
        registerUnsuccessText.style.display = "block"
        emailCheck.style.display = "none"
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    
}


async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("register-new-user");
    const url = "https://4ry8btjfrk.execute-api.ap-south-1.amazonaws.com/create/user";

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });


        console.log({ responseData });
    } catch (error) {
        console.error(error);
    }
}

const subscribeEvent = document.getElementsByClassName('subscribe');
subscribeEvent.item(0).addEventListener("click", handleFormSubmit);


