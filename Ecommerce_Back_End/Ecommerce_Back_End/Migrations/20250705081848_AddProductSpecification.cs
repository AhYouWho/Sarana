using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ecommerce_Back_End.Migrations
{
    /// <inheritdoc />
    public partial class AddProductSpecification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "PRICE",
                table: "PRODUCT_TBL",
                type: "DECIMAL(18, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "PROSPECID",
                table: "PRODUCT_TBL",
                type: "NUMBER(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PRODUCTSPECIFICATION_TBL",
                columns: table => new
                {
                    PROSPECID = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    PROCESSOR = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    MEMORY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    DISPLAY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    STORAGE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    WIFI = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    VIDEOCARD = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    BATTERY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    WEIGHT = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    HEIGHT = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    WIDTH = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    DEPTH = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CABLELENGTH = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CONNECTIVITY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    SYSREQUIREMENT = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CHIPSET = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ONBOARDGRAPHICS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    AUDIO = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    LAN = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    WIRELESSCONECT = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    EXPANSIONSLOT = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    STORAGEINTERFACE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    USB = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    INTERNALIO = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    BACKPANELCONNECTOR = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    IOCONTROLLER = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    BIOS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    UNIQUEFEATURE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    OS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    DPI = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    REFRESH_RATE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    PANEL_TYPE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    RESOLUTION = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    BRIGHTNESS = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    WARRANTY = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    BARCODE = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTSPECIFICATION_TBL", x => x.PROSPECID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PRODUCTSPECIFICATION_TBL");

            migrationBuilder.DropColumn(
                name: "PROSPECID",
                table: "PRODUCT_TBL");

            migrationBuilder.AlterColumn<decimal>(
                name: "PRICE",
                table: "PRODUCT_TBL",
                type: "DECIMAL(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18, 2)");
        }
    }
}
