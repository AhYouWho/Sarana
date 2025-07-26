using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ecommerce_Back_End.Migrations
{
    /// <inheritdoc />
    public partial class neworder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PAYMENTID",
                table: "ORDER_TBL");

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

            migrationBuilder.AddColumn<int>(
                name: "PAYMENTID",
                table: "ORDER_TBL",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);
        }
    }
}
