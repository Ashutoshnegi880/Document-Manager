import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { aadharFormDto, aadharId } from './dto/document.dto';

@Controller('document')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aadhar')
  getAadharDocument(@Body() form: aadharId) {
    // return this.appService.getAadharDocument(form);
  }

  @Post('aadhar/create')
  createAadharDocument(@Body() form: aadharFormDto){
    return this.appService.createAadharDocument(form)
  }

  @Put('aadhar/update')
  updateAadharDocument(@Body() form: aadharFormDto){
    return this.appService.updateAadharDocument(form)
  }
}
