using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class DataUnitPuschartDelViewModel
    {
        public Guid? UnitID { get; set; }
    }
    public class DataUnitPuschartViewModel
    {
        public Guid? BuildingId { get; set; }
        public string MapNumber { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string Number { get; set; }
        public Guid? UnitID { get; set; }
        public Guid? MapID { get; set; }
        public decimal? OrigSquare { get; set; }
        public decimal? ExtSquare { get; set; }
        public decimal? FacSquare { get; set; }
        public decimal? RentSquare { get; set; }
        public Guid? UnitNameId { get; set; }
        public bool? PlnFlag { get; set; }
        public string KwhMeter { get; set; }
        public decimal? Power { get; set; }
        public bool? PamFlag { get; set; }
        public string PamMeter { get; set; }
        public Guid? PipeID { get; set; }
        public bool? GasFlag { get; set; }
        public string GasMeter { get; set; }
        public bool? TelpFlag { get; set; }
        public string TelpNumber { get; set; }
        public Guid? StatusId { get; set; }
        public int? CTFactor { get; set; }
        public decimal? BasicPrice { get; set; }
        public Guid? PressureID { get; set; }
        public int? Phasa { get; set; }
        public string Remarks { get; set; }
        public int? SubId { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsPosted { get; set; }
        public string Reason { get; set; }
        public string PostedUser { get; set; }
        public DateTime? PostedDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string DeleteUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public decimal? OthersSquare { get; set; }
        public decimal? CertifySquare { get; set; }
        public Guid? ZonaId { get; set; }
        public int? Editable { get; set; }
        public string BuildingName { get; set; }
        public string StatusDesc { get; set; }
        public string PipeType { get; set; }
        public string PressureType { get; set; }
    }

    public class DataUnitPuschartListViewModel
    {
        public Guid? UnitID { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string Number { get; set; }
        public decimal? OrigSquare { get; set; }
        public decimal? ExtSquare { get; set; }
        public decimal? FacSquare { get; set; }
        public decimal? OthersSquare { get; set; }
        public decimal? RentSquare { get; set; }
        public string StatusDesc { get; set; }
    }
}
