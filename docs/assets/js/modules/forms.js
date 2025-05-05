/**
 * Forms Module
 * Maneja la validación y envío de formularios
 */

export function initForms() {
  const forms = document.querySelectorAll('form[data-form="validate"]');

  if (forms.length === 0) return;

  forms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

/**
 * Maneja el envío del formulario
 */
function handleFormSubmit(event) {
  const form = event.currentTarget;

  // Detener el envío si el formulario no es válido
  if (!validateForm(form)) {
    event.preventDefault();
    return;
  }

  // Aquí puedes agregar lógica para envío AJAX si es necesario
  // Por ahora, dejamos que el formulario se envíe normalmente
}

/**
 * Valida todos los campos del formulario
 */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach((input) => {
    // Limpiar errores previos
    clearError(input);

    // Validar campo según el tipo y requisitos
    if (input.hasAttribute('required') && !validateRequired(input)) {
      isValid = false;
      showError(input, 'Este campo es obligatorio');
    } else if (
      input.type === 'email' &&
      input.value &&
      !validateEmail(input.value)
    ) {
      isValid = false;
      showError(input, 'Por favor, introduce un email válido');
    }
  });

  return isValid;
}

/**
 * Valida si un campo requerido tiene valor
 */
function validateRequired(input) {
  return input.value.trim() !== '';
}

/**
 * Valida formato de email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Muestra mensaje de error para un campo
 */
function showError(input, message) {
  // Crear elemento de error si no existe
  let errorElement = input.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('form-error')) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }

  // Añadir mensaje y estilo de error
  errorElement.textContent = message;
  input.classList.add('input-error');
}

/**
 * Elimina mensaje de error de un campo
 */
function clearError(input) {
  // Remover clase de error
  input.classList.remove('input-error');

  // Eliminar mensaje de error si existe
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('form-error')) {
    errorElement.remove();
  }
}
