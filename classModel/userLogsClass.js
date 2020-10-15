class UserLogs{
    constructor(
        id,
        user_id,
        first_name,
        last_name,
        email,
        xelp_email,
        reporting_to,
        emp_id,
        designation,
        role_id,
        password,
        phone,
        mobile,
        user_type,
        branch_id,
        emer_contact_no,
        emer_contact_name,
        dob, 
        doj,
        city,
        address,
        p_address,
        c_address,
        bg,
        profile_pic,
        resume_url,
        current_salary,
        email_varified_at,
        status,
        dol,
        resignation_date,
        appointment_date,
        other_document,
        created_at,
        updated_at
    ){
        this.id = id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.xelp_email = xelp_email;
        this.reporting_to = reporting_to;
        this.emp_id = emp_id;
        this.designation = designation;
        this.role_id = role_id;
        this.password = password;
        this.phone = phone;
        this.mobile = mobile;
        this.user_type = user_type;
        this.branch_id = branch_id;
        this.emer_contact_no = emer_contact_no;
        this.emer_contact_name = emer_contact_name;
        this.dob = dob;
        this.doj = doj;
        this.city = city;
        this.address = address;
        this.p_address = p_address;
        this.c_address = c_address;
        this.bg = bg;
        this.profile_pic = profile_pic;
        this.resume_url = resume_url;
        this.current_salary = current_salary;
        this.email_varified_at = email_varified_at;
        this.status = status;
        this.dol = dol;
        this.resignation_date = resignation_date;
        this.appointment_date = appointment_date;
        this.other_document = other_document;
        this.created_at = created_at;
        this.updated_at = updated_at;
      }
}

module.exports = {
    UserLogs: UserLogs
  };