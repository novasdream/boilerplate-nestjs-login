import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserRegisterDTO {
  @IsEmail({}, { message: 'Voce precisa utilizar um email valido.' })
  @Matches(/.*@(?:taking|infoa2)\.com\.br/, {
    message: 'Utilize o email corporativo, taking ou infoa2.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;
}
