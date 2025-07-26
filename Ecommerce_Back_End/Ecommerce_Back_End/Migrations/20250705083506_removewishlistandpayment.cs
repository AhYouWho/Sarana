using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ecommerce_Back_End.Migrations
{
    /// <inheritdoc />
    public partial class removewishlistandpayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PAYMENTDETAIL_TBL");

            migrationBuilder.DropTable(
                name: "WISHLIST_TBL");

            migrationBuilder.AlterColumn<decimal>(
                name: "PRICE",
                table: "PRODUCT_TBL",
                type: "DECIMAL(18, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "PRICE",
                table: "PRODUCT_TBL",
                type: "DECIMAL(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18, 2)");

            migrationBuilder.CreateTable(
                name: "PAYMENTDETAIL_TBL",
                columns: table => new
                {
                    PAYID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    AMOUNT = table.Column<float>(type: "BINARY_FLOAT", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    PROVIDER = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    STATUS = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PAYMENTDETAIL_TBL", x => x.PAYID);
                });

            migrationBuilder.CreateTable(
                name: "WISHLIST_TBL",
                columns: table => new
                {
                    WISHLISTID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CREATEDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    PROID = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    USERID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WISHLIST_TBL", x => x.WISHLISTID);
                });
        }
    }
}
