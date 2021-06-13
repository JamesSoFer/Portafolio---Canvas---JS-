// The code goes down here

// Form Validation

const form = document.querySelector("form");
const inputs = document.querySelectorAll('.required');
const somethingWrongmessage = document.createElement('p');
const script = document.querySelector('script');
const formSentMessage = document.createElement('p');
const parent = form.parentElement;
let redText = '';
let greenText = '';

form.addEventListener("submit", function(e) {
  e.preventDefault();

  inputs.forEach(input => {
    if(input.value !== ''){
      input.style.border = '2px solid green';
      redText = '';
      input.value = ''
      greenText = 'Su formulario ha sido enviado correctamente!';
      formSentMessage.style.width = '200px'
      formSentMessage.style.fontSize = '16px'
      formSentMessage.style.color = 'white'
      form.style.fontWeight = 'bold'
      somethingWrongmessage.style.border = 'none';
      somethingWrongmessage.style.backgroundColor = 'transparent';
      parent.insertBefore(formSentMessage, form)
    }else{
      input.style.border = '2px solid red';
      greenText = '';
      input.value = ''
      redText = 'Ocurrio un error, verifica los campos!!';
      somethingWrongmessage.style.width = '200px'
      somethingWrongmessage.style.fontSize = '16px'
      somethingWrongmessage.style.color = 'red'
      somethingWrongmessage.style.fontWeight = 'bold'
      formSentMessage.style.border = 'none';
      formSentMessage.style.backgroundColor = 'transparent';
      parent.insertBefore (somethingWrongmessage, form);
    }
  });

  somethingWrongmessage.innerHTML = redText;
  formSentMessage.innerHTML = greenText;
});
