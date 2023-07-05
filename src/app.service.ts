import { Injectable } from '@nestjs/common';
import { aadharFormDto, aadharId } from './dto/document.dto';
import { createWriteStream } from 'fs';
import * as PDFDocument from 'pdfkit';
import { PrismaService } from './prisma/prisma.service';
import { Prisma} from "@prisma/client"

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createAadharDocument(form: aadharFormDto){

    //Add data to Db
    const dbPayload: Prisma.AadharFormCreateInput = {
      name: form.name,
      gender: form.gender,
      dob: form.dob,
      address: form.address,
      aadharNumber: form.aadharNumber
    }
    const { aadharNumber } = form;

  const existingAadharForm = await this.prisma.aadharForm.findUnique({
    where: {
      aadharNumber,
    },
  });

  if (existingAadharForm) {
    await this.prisma.aadharForm.update({
      where: {
        aadharNumber,
      },
      data: form,
    });
  } else {
    await this.prisma.aadharForm.create({
      data: form,
    });
  }


    return new Promise<string>((resolve, reject) => {
      // Create a new PDF document
      const doc = new PDFDocument();

      // Set the output file name
      // const fileName = `aadhar_card_${form.aadharNumber}.pdf`;
      const fileName = `aadhar_card.pdf`;

      // Pipe the PDF document to a file
      const writeStream = createWriteStream(fileName);
      doc.pipe(writeStream);

      // Set the Aadhaar card dimensions
      const width = 550; // in points (1 point = 1/72 inch)
      const height = 300;

      // Set the font size and style
      doc.fontSize(12);

      // Add Aadhaar card content
      doc.rect(10, 10, width - 20, height - 20).stroke(); // Outer border rectangle

      // Add logos
      const logoPath = 'C:/Users/NEGI/vscode/document/src/images/aadhaar-card.png'; // Replace with the path to your logo image
      doc.image(logoPath, 20, 20, { width: 510, height: 70});
      // Add person image
      const personImagePath = 'C:/Users/NEGI/vscode/document/src/images/person_photo.png'; // Replace with the path to your person image
      doc.image(personImagePath, 20, 100, { width: 100, height: 120 });
      
      doc.font('Helvetica-Bold').fontSize(14).text('Aadhaar Card', 150, 100);
      doc.font('Helvetica').fontSize(12).text('Name:', 150, 130).text(form.name, 280, 130);
      doc.font('Helvetica').fontSize(12).text('Aadhaar Number:', 150, 150).text(form.aadharNumber, 280, 150);
      doc.font('Helvetica').fontSize(12).text('Address:', 150, 170).text(form.address, 280, 170);
      doc.font('Helvetica').fontSize(12).text('Gender:', 150, 190).text(form.gender, 280, 190);
      doc.font('Helvetica').fontSize(12).text('Date of Birth:', 150, 210).text(form.dob, 280, 210);


      doc.font('Helvetica-Bold').fontSize(16).text(form.aadharNumber, 200, 245);
      // Add more fields as needed

      const lineY = height - 30; // 10 points above the bottom
      doc.moveTo(10, lineY).lineTo(width-10, lineY).strokeColor('red').stroke();
      
      // Finalize the PDF document
      
      doc.end();

      // Handle the completion event
      writeStream.on('finish', () => {
        resolve("file:///C:/Users/NEGI/vscode/document/aadhar_card.pdf");
      });

      // Handle any errors
      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  getAadharDocument(form: aadharId){
    const {aadharNumber} = form
    return this.prisma.aadharForm.findUnique({
      where :{aadharNumber}
    })
  }
}
