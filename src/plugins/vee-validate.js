import {extend, validate, localize} from "vee-validate";
import {required, email, min, max, numeric, alpha} from "vee-validate/dist/rules";

extend("required", {
    ...required,
    message: "Обязателно для заполнения"
});

extend("email", {
    ...email,
    message: 'Неправильный формат адреса почты'
});

extend("validateMaxIIN", {
    async validate(value, {max}) {
        const res = await validate(value, `max:${max}`,)
        return res.valid;
    },
    params: ['max'],
    message: 'ИИН должен содержать {max} символов'
});

extend("documentIDMax", {
    async validate(value, { max }) {
        const res = await validate(value, `max:${max}`,)
        return res.valid;
    },
    params: ['max'],
    message: 'Только {max} символов'
});


extend("numberOnly", {
    ...numeric,
    message: "Только цифры"
});

extend("max", max);
extend("min", min);