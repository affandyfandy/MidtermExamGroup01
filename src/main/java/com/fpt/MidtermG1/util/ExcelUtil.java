package com.fpt.MidtermG1.util;

import com.fpt.MidtermG1.data.entity.Product;
import com.fpt.MidtermG1.common.Status;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ExcelUtil {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static List<Product> parseProductFile(InputStream is) throws Exception {
        List<Product> products = new ArrayList<>();

        try (XSSFWorkbook workbook = new XSSFWorkbook(is)) {
            XSSFSheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                Product product = new Product();
                product.setName(getCellValueAsString(row.getCell(0)));
                product.setPrice(getCellValueAsBigDecimal(row.getCell(1)));
                product.setStatus(getCellValueAsStatus(row.getCell(2)));
                product.setCreatedTime(getCellValueAsTimestamp(row.getCell(3)));
                product.setUpdatedTime(getCellValueAsTimestamp(row.getCell(4)));
                products.add(product);
            }
        }

        return products;
    }

    private static int getCellValueAsInt(Cell cell) {
        if (cell == null) {
            return 0;
        }
        switch (cell.getCellType()) {
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case STRING:
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return 0;
                }
            default:
                return 0;
        }
    }

    private static String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf(cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }

    private static BigDecimal getCellValueAsBigDecimal(Cell cell) {
        if (cell == null) {
            return BigDecimal.ZERO;
        }
        switch (cell.getCellType()) {
            case NUMERIC:
                return BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING:
                try {
                    return new BigDecimal(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return BigDecimal.ZERO;
                }
            default:
                return BigDecimal.ZERO;
        }
    }

    private static Status getCellValueAsStatus(Cell cell) {
        if (cell == null) {
            return Status.ACTIVE;
        }
        String value = getCellValueAsString(cell);
        try {
            return Status.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Status.ACTIVE;
        }
    }

    private static Timestamp getCellValueAsTimestamp(Cell cell) throws ParseException {
        if (cell == null) {
            return new Timestamp(System.currentTimeMillis());
        }
        String value = getCellValueAsString(cell);
        try {
            Date date = DATE_FORMAT.parse(value);
            return new Timestamp(date.getTime());
        } catch (ParseException e) {
            return new Timestamp(System.currentTimeMillis());
        }
    }
}
