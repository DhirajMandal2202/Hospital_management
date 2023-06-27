using HospitalManagement.Models;
using HospitalManagement.MyDbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        public readonly MyAppDbContext _context;

        public PharmacyController(MyAppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPut("stockUpdate")]
        public IActionResult updateStock(medicinesStockUpdate updateData)
        {
            try
            {
                if (updateData == null)
                {
                    return BadRequest(new { message = "Empty Field !!" });
                }

                var medicineById = _context.medicines_list.Find(updateData.id);
                var initialInstock = medicineById.instock;

                if (medicineById == null)
                {
                    return BadRequest(new { message = "Record Not Found !!" });
                }

                medicineById.instock = (medicineById.instock) - (updateData.quantity);

                if (medicineById.instock < 0)
                {
                    return BadRequest(new { message = $"Enter Quantity Exceed InStock Quantity --- Available Stock Quantity = {initialInstock}" });
                }

                var amount = (medicineById.per_price) * (updateData.quantity);

                _context.SaveChanges();

                return Ok(new { message = "Updated Successfully", amount = amount, instock = medicineById.instock });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }

        }



        [Authorize]
        [HttpPost("addMedicines")]
        public IActionResult addmedicines([FromBody] Medicines_List med)
        {

            try
            {
                if (med == null)
                {
                    return BadRequest(new { message = "Empty Field!!" });
                }
                _context.Add(med);
                _context.SaveChanges();
                return Ok(new { message = "Added Successfully !!", status = 1 });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("medicinesList")]
        public IActionResult medicinesList()
        {
            try
            {
                var list = _context.medicines_list.ToList(); ;
                if (list == null)
                {
                    return BadRequest(new { message = "Empty Field!!" });
                }

                return Ok(list);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpPost("createBill")]
        public IActionResult createBill([FromBody] PharmacyBill bill)
        {
            try
            {
                if (bill == null)
                {
                    return BadRequest(new { message = "Empty Field!!" });
                }

                var quantity = bill.quantity;

                var fetchMedicineById = _context.medicines_list.Find(bill.medicine_id);

                fetchMedicineById.instock = fetchMedicineById.instock - quantity;

                if (fetchMedicineById.instock < 0)
                {
                    return Ok(new { error = "Input quantity more than instock quantity", status = -1 });
                }
                _context.SaveChanges();

                _context.Add(bill);
                _context.SaveChanges();
                return Ok(new { message = "Successfully Added!!", status = 1 });
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet("medicinesBill")]
        public IActionResult medicinesbill()
        {
            var list = _context.medicines_bill.ToList();

            if (list == null)
            {
                return BadRequest(new { error = "Empty Field" });
            }

            return Ok(list);
        }

        [Authorize]
        [HttpPost("pharmacyBillAmount")]
        public IActionResult billAmount(Amount amount)
        {

            try
            {
                if (amount == null)
                {
                    return Ok(new { message = "Empty Field!!" });
                }

                var med_id = amount.id;

                var data = _context.medicines_list.Find(med_id);

                var totalAmount = (amount.amount) * (data.per_price);

                return Ok(totalAmount);
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }




        }
    }
}
