// src/utils/generatePDFReport.js

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generatePDFReport = async (data, startDate, endDate) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = fontSize, isBold = false) => {
        page.drawText(text, { x, y, size, font: isBold ? boldFont : font, color: rgb(0, 0, 0) });
    };

    const drawLine = (x1, y1, x2, y2) => {
        page.drawLine({
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            thickness: 1,
            color: rgb(0.75, 0.75, 0.75),
        });
    };

    let y = height - 40;
    drawText('Laporan Keuangan', 50, y, fontSize + 2, true);
    y -= 20;
    drawText(`Periode: ${startDate} - ${endDate}`, 50, y);
    y -= 20;
    drawLine(50, y, width - 50, y);
    y -= 20;

    const drawSection = (title, items, total) => {
        drawText(title, 50, y, fontSize + 1, true);
        y -= 20;
        items.forEach(item => {
            drawText(`${item[0]}:`, 50, y);
            drawText(`${item[1]}`, width - 150, y);
            y -= 20;
        });
        drawLine(50, y, width - 50, y);
        y -= 10;
        drawText(`Total ${title}:`, 50, y, fontSize, true);
        drawText(`${total}`, width - 150, y, fontSize, true);
        y -= 30;
    };

    let openingBalance = 0;
    const openingDetails = [];
    data.cash_or_bank.forEach(item => {
        openingBalance += item.opening_debit - item.opening_credit;
        openingDetails.push([item.account_name, (item.opening_debit - item.opening_credit).toLocaleString()]);
    });

    let totalDonations = 0;
    const donationDetails = [];
    data.donation.forEach(item => {
        totalDonations += item.debit - item.credit;
        donationDetails.push([item.account_name, (item.debit - item.credit).toLocaleString()]);
    });

    let totalPurchase = 0;
    const purchaseDetails = [];
    data.purchase.forEach(item => {
        totalPurchase += item.debit - item.credit;
        purchaseDetails.push([item.account_name, (item.debit - item.credit).toLocaleString()]);
    });

    let totalExpense = 0;
    const expenseDetails = [];
    data.expense.forEach(item => {
        totalExpense += item.debit - item.credit;
        expenseDetails.push([item.account_name, (item.debit - item.credit).toLocaleString()]);
    });

    let closingBalance = 0;
    const closingDetails = [];
    data.cash_or_bank.forEach(item => {
        closingBalance += item.closing_debit - item.closing_credit;
        closingDetails.push([item.account_name, (item.closing_debit - item.closing_credit).toLocaleString()]);
    });

    drawSection('Saldo Awal', openingDetails, openingBalance.toLocaleString());
    drawSection('Penerimaan', donationDetails, totalDonations.toLocaleString());
    drawSection('Pembelian', purchaseDetails, totalPurchase.toLocaleString());
    drawSection('Pengeluaran', expenseDetails, totalExpense.toLocaleString());
    drawSection('Saldo Akhir', closingDetails, closingBalance.toLocaleString());

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Laporan_Keuangan.pdf';
    link.click();
};
