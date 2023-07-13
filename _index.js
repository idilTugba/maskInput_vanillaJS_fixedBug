(function() { // Immediately Invoked Function Expression to encapsulate the code
    let cursorPosition; // variable to store the cursor position

    function maskMobileInput(input){ // function to apply the masking logic to the input value
        const val = input.value.replace(/\D+/g, ""); // extract only the digits from the input value
        let maskVal = ""; // variable to store the masked value

        for (let i = 0; i < val.length; i++) { // iterate over each character in the value
            if(i==0) maskVal += '('; // add opening parenthesis as the first character
            if(i==3) maskVal += ') '; // add closing parenthesis with a space after the third character
            if(i==6) maskVal += '-'; // add hyphen after the sixth character
            maskVal += val[i]; // append the current character to the masked value
        }
        input.value= maskVal; // set the masked value back to the input
    }

    function handleKeyDown(event) { // function to handle keyboard events
        cursorPosition = event.target.selectionStart; // store the current cursor position
        const isNumber = /^[0-9]$/i.test(event.key); // check if the pressed key is a digit

        if (isNumber) { // if the key is a digit
            setTimeout(()=>{ // use setTimeout to allow the natural cursor behavior then u can manipulate
                switch(cursorPosition){
                    case 0:
                        cursorPosition += 2; // move the cursor two positions forward after the "(" character
                        console.log(cursorPosition)
                        break;
                    case 4:
                        cursorPosition += 3; // move the cursor three positions forward after the ") " character
                        console.log(cursorPosition)
                        break;
                    case 9:
                        cursorPosition += 2; // move the cursor two positions forward after the "-" character
                        break;
                    default: 
                        cursorPosition++; // move the cursor one position forward for other characters
                }
                event.target.setSelectionRange(cursorPosition, cursorPosition, "forward"); // set the new cursor position
            },1);
        }

        if (event.key === 'Backspace' && cursorPosition) { // if the pressed key is Backspace and the cursor is not at the beginning
            setTimeout(()=>{
                cursorPosition--; // move the cursor one position backward
                event.target.setSelectionRange(cursorPosition, cursorPosition, "backward"); // set the new cursor position
            },1);
        }
    }

    const telInputs = document.querySelectorAll('input[type="tel"]'); // get all input elements with type "tel"

    telInputs.forEach(function(input){ // add event listeners to each input element
        input.addEventListener('input', function(){ // listen for input changes
            maskMobileInput(this); // call the masking function with the current input element
        });
        input.addEventListener('click', function(){ // listen for click events on the input
            cursorPosition = this.selectionStart; // store the cursor position
        });
        input.addEventListener('keydown', handleKeyDown); // listen for keyboard events
    });

    // Test scenario
    const phoneInput = document.getElementById('phone');
    phoneInput.value = '1234567890'; // set phone number
    phoneInput.dispatchEvent(new Event('input')); // trigger input event to apply masking
    console.log('Phone Number:', phoneInput.value); // expected: (123) 456-7890

})();