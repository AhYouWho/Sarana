using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Back_End.Model.Request
{
    public class ProductSpecificationRequest
    {
        [Key]
        public int PROSPECID { get; set; }
        public int PROID { get; set; }
        public string? PROCESSOR { get; set; }
        public string? MEMORY { get; set; }
        public string? DISPLAY { get; set; }
        public string? STORAGE { get; set; }
        public string? WIFI { get; set; }
        public string? VIDEOCARD { get; set; }
        public string? BATTERY { get; set; }
        public string? WEIGHT { get; set; }
        public string? HEIGHT { get; set; }
        public string? WIDTH { get; set; }
        public string? DEPTH { get; set; }
        public string? CABLELENGTH { get; set; }
        public string? CONNECTIVITY { get; set; }
        public string? SYSREQUIREMENT { get; set; }
        public string? CHIPSET { get; set; }
        public string? ONBOARDGRAPHICS { get; set; }
        public string? AUDIO { get; set; }
        public string? LAN { get; set; }
        public string? WIRELESSCONECT { get; set; }
        public string? EXPANSIONSLOT { get; set; }
        public string? STORAGEINTERFACE { get; set; }
        public string? USB { get; set; }
        public string? INTERNALIO { get; set; }
        public string? BACKPANELCONNECTOR { get; set; }
        public string? IOCONTROLLER { get; set; }
        public string? BIOS { get; set; }
        public string? UNIQUEFEATURE { get; set; }
        public string? OS { get; set; }
        public string? DPI { get; set; }
        public string? REFRESH_RATE { get; set; }
        public string? PANEL_TYPE { get; set; }
        public string? RESOLUTION { get; set; }
        public string? BRIGHTNESS { get; set; }
        public string? WARRANTY { get; set; }
        public string? BARCODE { get; set; }
    }
}
