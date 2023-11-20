import { IsEmail, IsNotEmpty, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @MinLength(5, {
        message: 'Логин должен быть не меньше 5 символов'
    })
    @MaxLength(30, {
        message: 'Логин должен быть не больше 30 символов'
    })
    @Matches(/[a-zA-Z0-9]/, {
        message: 'Логин состоит из латинских букв в верхнем и нижнем регистрах, а также из цифр'
    })
    login: string

    @MinLength(5, {
        message: 'Пароль должен быть не меньше 5 символов'
    })
    @MaxLength(30, {
        message: 'Пароль должен быть не больше 30 символов'
    })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])/g, {
        message: 'Минимум одна буква в нижнем регистре и одна в верхнем'
    })
    password: string
    
    @IsEmail({}, {
        message: 'Должна быть указана электронная почта'
    })
    email: string
}