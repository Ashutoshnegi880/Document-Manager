import { Transform } from "class-transformer";
import { IsNumberString, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class aadharFormDto{
    @IsString()
    name: string;

    @IsString()
    gender: string; //TODO: make enum

    @IsString()
    dob: string;

    @IsString()
    @MaxLength(50)
    address: string;

    // @IsNumberString()
    // @Length(10,10)
    // phoneNumber: string;

    // @IsNumberString()
    // @Length(12,12)
    @IsString()
    @Transform(({ value }) => value.replace(/\s/g, '').match(/.{1,4}/g).join(' '))
    @MaxLength(14, {message: "Invalid Aadhar number"})
    @MinLength(14, {message: "Invalid Aadhar number"})
    aadharNumber: string;
}

export class aadharId{
    @IsString()
    @Transform(({ value }) => value.replace(/\s/g, '').match(/.{1,4}/g).join(' '))
    @MaxLength(14, {message: "Invalid Aadhar number"})
    @MinLength(14, {message: "Invalid Aadhar number"})
    aadharNumber: string;
}