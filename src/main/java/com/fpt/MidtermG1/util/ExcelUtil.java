package com.fpt.MidtermG1.util;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Product;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtil {
    public static List<Product> parseProductFile(InputStream inputStream) throws IOException {
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);
        List<Product> products = new ArrayList<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }

            String name = row.getCell(0).getStringCellValue();
            BigDecimal price = BigDecimal.valueOf(row.getCell(1).getNumericCellValue());
            String statusStr = row.getCell(2).getStringCellValue();
            Status status = Status.valueOf(statusStr.toUpperCase());
            Timestamp createdTime = new Timestamp(row.getCell(3).getDateCellValue().getTime());
            Timestamp updatedTime = new Timestamp(row.getCell(4).getDateCellValue().getTime());

            Product product = Product.builder()
                    .name(name)
                    .price(price)
                    .status(status)
                    .createdTime(createdTime)
                    .updatedTime(updatedTime)
                    .build();

            products.add(product);
        }

        workbook.close();
        return products;
    }
}
