class SalaryStructures{
    constructor(
        salary_structure_id,
        user_id,
        earnings,
        employer_contribution,
        deduction,
        ctc,
        month_total,
        year_total,
        status,
        created_at,
        updated_at
    ){
        this.salary_structure_id = salary_structure_id;
        this.user_id = user_id;
        this.earnings = earnings;
        this.employer_contribution = employer_contribution;
        this.deduction = deduction;
        this.ctc = ctc;
        this.month_total = month_total;
        this.year_total = year_total;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
      }
}

module.exports = {
    SalaryStructures: SalaryStructures
  };