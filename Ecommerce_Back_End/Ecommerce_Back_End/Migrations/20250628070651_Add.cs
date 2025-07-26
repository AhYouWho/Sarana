using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ecommerce_Back_End.Migrations
{
    /// <inheritdoc />
    public partial class Add : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CART_TBL",
                columns: table => new
                {
                    CARTID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    PROID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    USERID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    QTY = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CART_TBL", x => x.CARTID);
                });

            migrationBuilder.CreateTable(
                name: "CATEGORY_TBL",
                columns: table => new
                {
                    CATEID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CATENAME = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CATEDESC = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    STATUS = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DELETEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY_TBL", x => x.CATEID);
                });

            migrationBuilder.CreateTable(
                name: "ORDER_TBL",
                columns: table => new
                {
                    ORDERID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    USERID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    PROID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    QTY = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    PRICE = table.Column<float>(type: "BINARY_FLOAT", nullable: false),
                    TOTAL = table.Column<float>(type: "BINARY_FLOAT", nullable: false),
                    ORDERNUMBER = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    PAYMENTID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    STATUS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    ADDRESSLINE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CITY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    COUNTRY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    ZIPCODE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ORDER_TBL", x => x.ORDERID);
                });

            migrationBuilder.CreateTable(
                name: "PAYMENTDETAIL_TBL",
                columns: table => new
                {
                    PAYID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    AMOUNT = table.Column<float>(type: "BINARY_FLOAT", nullable: false),
                    PROVIDER = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    STATUS = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PAYMENTDETAIL_TBL", x => x.PAYID);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCT_TBL",
                columns: table => new
                {
                    PROID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    PRONAME = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    PRODESC = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    PRICE = table.Column<decimal>(type: "DECIMAL(18, 2)", nullable: false),
                    QTY = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    IMAGE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    STATUS = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CATEID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    SUBCATEID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    DELETEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT_TBL", x => x.PROID);
                });

            migrationBuilder.CreateTable(
                name: "SUBCATEGORY_TBL",
                columns: table => new
                {
                    SUBCATEID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CATEID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    SUBCATEGORY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    STATUS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SUBCATEGORY_TBL", x => x.SUBCATEID);
                });

            migrationBuilder.CreateTable(
                name: "USER_TBL",
                columns: table => new
                {
                    USERID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    USERNAME = table.Column<string>(type: "NVARCHAR2(450)", nullable: false),
                    EMAIL = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    PASSWORD = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    GENDER = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    DOB = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    PHONE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    USERTYPE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_TBL", x => x.USERID);
                });

            migrationBuilder.CreateTable(
                name: "WISHLIST_TBL",
                columns: table => new
                {
                    WISHLISTID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    PROID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    USERID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WISHLIST_TBL", x => x.WISHLISTID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_USER_TBL_USERNAME",
                table: "USER_TBL",
                column: "USERNAME",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CART_TBL");

            migrationBuilder.DropTable(
                name: "CATEGORY_TBL");

            migrationBuilder.DropTable(
                name: "ORDER_TBL");

            migrationBuilder.DropTable(
                name: "PAYMENTDETAIL_TBL");

            migrationBuilder.DropTable(
                name: "PRODUCT_TBL");

            migrationBuilder.DropTable(
                name: "SUBCATEGORY_TBL");

            migrationBuilder.DropTable(
                name: "USER_TBL");

            migrationBuilder.DropTable(
                name: "WISHLIST_TBL");
        }
    }
}
