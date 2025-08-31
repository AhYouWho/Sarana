using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

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
                    CARTID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PROID = table.Column<int>(type: "integer", nullable: false),
                    USERID = table.Column<int>(type: "integer", nullable: false),
                    QTY = table.Column<int>(type: "integer", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CART_TBL", x => x.CARTID);
                });

            migrationBuilder.CreateTable(
                name: "CATEGORY_TBL",
                columns: table => new
                {
                    CATEID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CATENAME = table.Column<string>(type: "text", nullable: false),
                    CATEDESC = table.Column<string>(type: "text", nullable: false),
                    STATUS = table.Column<int>(type: "integer", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DELETEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY_TBL", x => x.CATEID);
                });

            migrationBuilder.CreateTable(
                name: "ORDER_TBL",
                columns: table => new
                {
                    ORDERID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    USERID = table.Column<int>(type: "integer", nullable: false),
                    PROID = table.Column<int>(type: "integer", nullable: false),
                    QTY = table.Column<int>(type: "integer", nullable: false),
                    PRICE = table.Column<float>(type: "real", nullable: false),
                    TOTAL = table.Column<float>(type: "real", nullable: false),
                    ORDERNUMBER = table.Column<string>(type: "text", nullable: false),
                    STATUS = table.Column<string>(type: "text", nullable: false),
                    ADDRESSLINE = table.Column<string>(type: "text", nullable: false),
                    CITY = table.Column<string>(type: "text", nullable: false),
                    COUNTRY = table.Column<string>(type: "text", nullable: false),
                    ZIPCODE = table.Column<string>(type: "text", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MODIFIEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ORDER_TBL", x => x.ORDERID);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCT_TBL",
                columns: table => new
                {
                    PROID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PRONAME = table.Column<string>(type: "text", nullable: false),
                    PRODESC = table.Column<string>(type: "text", nullable: false),
                    PRICE = table.Column<decimal>(type: "numeric", nullable: false),
                    QTY = table.Column<int>(type: "integer", nullable: false),
                    IMAGE = table.Column<string>(type: "text", nullable: false),
                    STATUS = table.Column<int>(type: "integer", nullable: false),
                    CATEID = table.Column<int>(type: "integer", nullable: false),
                    SUBCATEID = table.Column<int>(type: "integer", nullable: false),
                    PROSPECID = table.Column<int>(type: "integer", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DELETEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT_TBL", x => x.PROID);
                });

            migrationBuilder.CreateTable(
                name: "PRODUCTSPECIFICATION_TBL",
                columns: table => new
                {
                    PROSPECID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PROCESSOR = table.Column<string>(type: "text", nullable: true),
                    MEMORY = table.Column<string>(type: "text", nullable: true),
                    DISPLAY = table.Column<string>(type: "text", nullable: true),
                    STORAGE = table.Column<string>(type: "text", nullable: true),
                    WIFI = table.Column<string>(type: "text", nullable: true),
                    VIDEOCARD = table.Column<string>(type: "text", nullable: true),
                    BATTERY = table.Column<string>(type: "text", nullable: true),
                    WEIGHT = table.Column<string>(type: "text", nullable: true),
                    HEIGHT = table.Column<string>(type: "text", nullable: true),
                    WIDTH = table.Column<string>(type: "text", nullable: true),
                    DEPTH = table.Column<string>(type: "text", nullable: true),
                    CABLELENGTH = table.Column<string>(type: "text", nullable: true),
                    CONNECTIVITY = table.Column<string>(type: "text", nullable: true),
                    SYSREQUIREMENT = table.Column<string>(type: "text", nullable: true),
                    CHIPSET = table.Column<string>(type: "text", nullable: true),
                    ONBOARDGRAPHICS = table.Column<string>(type: "text", nullable: true),
                    AUDIO = table.Column<string>(type: "text", nullable: true),
                    LAN = table.Column<string>(type: "text", nullable: true),
                    WIRELESSCONECT = table.Column<string>(type: "text", nullable: true),
                    EXPANSIONSLOT = table.Column<string>(type: "text", nullable: true),
                    STORAGEINTERFACE = table.Column<string>(type: "text", nullable: true),
                    USB = table.Column<string>(type: "text", nullable: true),
                    INTERNALIO = table.Column<string>(type: "text", nullable: true),
                    BACKPANELCONNECTOR = table.Column<string>(type: "text", nullable: true),
                    IOCONTROLLER = table.Column<string>(type: "text", nullable: true),
                    BIOS = table.Column<string>(type: "text", nullable: true),
                    UNIQUEFEATURE = table.Column<string>(type: "text", nullable: true),
                    OS = table.Column<string>(type: "text", nullable: true),
                    DPI = table.Column<string>(type: "text", nullable: true),
                    REFRESH_RATE = table.Column<string>(type: "text", nullable: true),
                    PANEL_TYPE = table.Column<string>(type: "text", nullable: true),
                    RESOLUTION = table.Column<string>(type: "text", nullable: true),
                    BRIGHTNESS = table.Column<string>(type: "text", nullable: true),
                    WARRANTY = table.Column<string>(type: "text", nullable: true),
                    BARCODE = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTSPECIFICATION_TBL", x => x.PROSPECID);
                });

            migrationBuilder.CreateTable(
                name: "SUBCATEGORY_TBL",
                columns: table => new
                {
                    SUBCATEID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CATEID = table.Column<int>(type: "integer", nullable: false),
                    SUBCATEGORY = table.Column<string>(type: "text", nullable: false),
                    STATUS = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SUBCATEGORY_TBL", x => x.SUBCATEID);
                });

            migrationBuilder.CreateTable(
                name: "USER_TBL",
                columns: table => new
                {
                    USERID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    USERNAME = table.Column<string>(type: "text", nullable: false),
                    EMAIL = table.Column<string>(type: "text", nullable: false),
                    PASSWORD = table.Column<string>(type: "text", nullable: false),
                    GENDER = table.Column<string>(type: "text", nullable: false),
                    DOB = table.Column<string>(type: "text", nullable: false),
                    PHONE = table.Column<string>(type: "text", nullable: false),
                    USERTYPE = table.Column<string>(type: "text", nullable: false),
                    CREATEDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MODIFIEDDATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER_TBL", x => x.USERID);
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
                name: "PRODUCT_TBL");

            migrationBuilder.DropTable(
                name: "PRODUCTSPECIFICATION_TBL");

            migrationBuilder.DropTable(
                name: "SUBCATEGORY_TBL");

            migrationBuilder.DropTable(
                name: "USER_TBL");
        }
    }
}
