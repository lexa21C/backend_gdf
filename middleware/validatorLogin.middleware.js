// Middleware personalizado para validar la solicitud de inicio de sesión
const { check, validationResult } = require('express-validator');

const validateLoginMiddleware = (req, res, next) => {
    const { email, password } = req.body;
  
    // Verifica que se proporcionen email y password en la solicitud
    if (!email || !password) {
      return res.status(400).json({ error: 'Debe proporcionar un email y una contraseña.' });
    }
  
    // Verifica que no se proporcionen campos adicionales
    const unexpectedFields = Object.keys(req.body).filter(field => field !== 'email' && field !== 'password');
    if (unexpectedFields.length > 0) {
      return res.status(400).json({ error: 'No se permiten campos adicionales en la solicitud.' });
    }

    // Si todo está en orden, pasa al siguiente middleware
    next();
};


function validate(req, res, next) {
    
    // Define aquí tus reglas de validación personalizadas
    const customValidationRules = [
      check("email")
        .notEmpty().withMessage('El campo "email" es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido'),
      check("password")
        .notEmpty().withMessage('El campo "type_profile" es obligatorio')
    ];
  
    // Ejecuta las reglas de validación personalizadas
    Promise.all(customValidationRules.map(validation => validation.run(req)))
      .then(() => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          return res.status(400).json({ errors: errorMessages });
        }
        
        next(); // Si no hay errores de validación, pasa al siguiente middleware o al controlador
      });
  }
  
  module.exports = {
    validateLoginMiddleware,
    validate,
  };
  
