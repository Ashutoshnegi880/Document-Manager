import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { aadharFormDto, aadharId } from './dto/document.dto';

@Controller('document')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aadhar')
  getAadharDocument(@Body() form: aadharId) {
    return this.appService.getAadharDocument(form);
  }

  @Post('aadhar')
  createAadharDocument(@Body() form: aadharFormDto){
    return this.appService.createAadharDocument(form)
  }
}
