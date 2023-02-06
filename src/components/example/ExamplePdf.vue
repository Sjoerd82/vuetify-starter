<template>
    <v-card title="PDF download">
        <v-card-text>
            <v-btn
                color="primary"
                class="ma-4"
                @click="generateDownload()"
            >
                Download PDF
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { PDFDocument, StandardFonts, PageSizes } from 'pdf-lib';
    import download from 'downloadjs'
    //import fontkit from '@pdf-lib/fontkit';

    async function generateDownload() {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        let page = pdfDoc.addPage(PageSizes.A4);
        const { width, height } = page.getSize() ;
        const fontSize = 12;
        const marginX = 45;

        page.drawText("A very basic example!", {
            x: marginX,
            y: height-4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            maxWidth: width-(marginX*2),
            lineHeight: 12,
        })

        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, "example.pdf", "application/pdf");
    }
</script>