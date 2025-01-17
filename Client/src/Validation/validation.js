import joi from "joi";

const registerValidation = joi.object({
  firstname: joi.string().required().messages({
    "string.empty": "First name is required",
  }),

  lastname: joi.string().required().messages({
    "string.empty": "Last name is required",
  }),

  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),

  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
});

const loginValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),

  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
});

const recoveryValidation = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),
});

const newPasswordValidation = joi.object({
  password: joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
  confirm: joi.string().valid(joi.ref("password")).min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
    "any.only": "Passwords do not match",
  }),
});

const editProfileValidation = joi.object({
  firstname: joi.string().trim().pattern(new RegExp("^[A-Za-z]+$")).messages({
    "string.empty": "*First name is required.",
    "string.pattern.base": "*First name must contain only letters.",
  }),
  lastname: joi.string().trim().pattern(new RegExp("^[A-Za-z]+$")).messages({
    "string.empty": "*Last name is required.",
    "string.pattern.base": "*Last name must contain only letters.",
  }),
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "*Email is required.",
      "string.email": "*Invalid email address.",
    }),
});

const editPasswordValidation = joi.object({
  // TBD - validation for current password ?
  password : joi
  .string().trim()
  .messages({
    "string.empty": "*Current password is required.",
  }),
  newpassword: joi
    .string()
    .trim()
    .min(8)
    .messages({
      "string.empty": "*Password is required.",
      "string.min": "*Password must be at least 8 characters long.",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.message(
          "*Password must contain at least one uppercase letter."
        );
      }
      if (!/[a-z]/.test(value)) {
        return helpers.message(
          "*Password must contain at least one lowercase letter."
        );
      }
      if (!/\d/.test(value)) {
        return helpers.message("*Password must contain at least one number.");
      }
      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.message(
          "*Password must contain at least one special character."
        );
      }

      return value;
    }),
  confirm: joi
    .string()
    .trim()
    .messages({
      "string.empty": "*Password confirmation is required.",
    })
    .custom((value, helpers) => {
      const { password } = helpers.prefs.context;
      if (value !== password) {
        return helpers.message("*Passwords do not match.");
      }
      return value;
    }),
});

export {
  registerValidation,
  loginValidation,
  recoveryValidation,
  newPasswordValidation,
  editPasswordValidation,
  editProfileValidation,
};
