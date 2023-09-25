import { useEffect, useState } from "react";

type ErrorType<T> = {
  [k in keyof T]: string;
};

type Rule =
  | { required: boolean }
  | { email: boolean }
  | { onlyLetters: boolean }
  | { validator: (value: any, values: any) => string | undefined };

function validateRules(rules: any, values: any) {
  const inputs = Object.keys(values);

  const errors: Partial<ErrorType<any>> = {};

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const inputRules = rules[input] || [];
    const inputValue = values[input];

    for (let i = 0; i < inputRules.length; i += 1) {
      const rule = inputRules[i] as any;

      if (rule.required) {
        if (!inputValue === undefined || inputValue === "") {
          errors[input] = "Is Required";
          break;
        }
      }

      if (rule.email) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
          errors[input] = "Email not valid";
          break;
        }
      }

      if (rule.onlyLetters) {
        if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
          errors[input] = "Not valid";
          break;
        }
      }

      if (rule.validator) {
        const message = rule.validator(inputValue, values);
        if (message !== undefined) {
          errors[input] = message;
          break;
        }
      }
    }
  }

  if (Object.keys(errors).length === 0) {
    return undefined;
  }

  return errors;
}

/**
 * Simple form validator hook.
 *
 * @param config
 * @returns
 */
export function useForm<Form extends Record<string, any>>(
  config: {
    defaultValues?: Form;
    rules?: Partial<{
      [k in keyof Form]: Rule[];
    }>;
    defaultErrors?: ErrorType<Form>;
  } = {}
) {
  const { defaultValues = {}, rules = {}, defaultErrors } = config;

  const [errors, setErrors] = useState<Partial<ErrorType<Form>>>(
    defaultErrors || {}
  );
  const [values, setValues] = useState(defaultValues);
  const [hasErrors, setHasErrors] = useState(
    validateRules(rules, values) !== undefined
  );

  useEffect(() => {
    const _errors = validateRules(rules, values);
    setHasErrors(_errors !== undefined);
  }, [errors]);

  function setValue<Input extends keyof Form = keyof Form>(
    input: Input,
    value?: Form[Input]
  ) {
    setValues({ ...values, [input as string]: value });

    // @ts-ignore
    const inputRules = rules[input];

    if (inputRules) {
      // reset input errors
      const newErrors = { ...errors };
      delete newErrors[input];

      setErrors({
        ...newErrors,
        ...validateRules(rules, { [input]: value }),
      });
    }
  }

  return {
    errors,
    values,
    setValue,
    hasErrors,
  };
}

export function delay(cb: any, t: number) {
  let timer: NodeJS.Timeout | undefined;

  return function () {
    const args = arguments;

    clearTimeout(timer);

    if (args[0] && args[0].persist) {
      args[0].persist();
    }

    timer = setTimeout(() => {
      // @ts-ignore
      cb.apply(this, args);
    }, t || 0);
  };
}
