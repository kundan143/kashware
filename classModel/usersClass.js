class Users {
  constructor(
    id,
    first_name,
    last_name,
    email,
    xelp_email,
    password,
    role_id,
    phone,
    mobile,
    emer_contact_no,
    emer_contact_name,
    designation,
    dob,
    doj,
    dol,
    emp_id,
    city,
    address,
    p_address,
    c_address,
    reporting_to,
    bg,
    profile_pic,
    resume_url,
    branch_id,
    current_salary,
    user_type,
    email_verified_at,
    status,
    remember_token,
    created_at,
    updated_at,
    resignation_date,
    appointment_date,
    other_document
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.xelp_email = xelp_email;
    this.email_verified_at = email_verified_at;
    this.password = password;
    this.role_id = role_id;
    this.phone = phone;
    this.mobile = mobile;
    this.emer_contact_no = emer_contact_no;
    this.emer_contact_name = emer_contact_name;
    this.designation = designation;
    this.dob = dob;
    this.doj = doj;
    this.dol = dol;
    this.emp_id = emp_id;
    this.city = city;
    this.address = address;
    this.p_address = p_address;
    this.c_address = c_address;
    this.reporting_to = reporting_to;
    this.bg = bg;
    this.profile_pic = profile_pic;
    this.resume_url = resume_url;
    this.branch_id = branch_id;
    this.current_salary = current_salary;
    this.user_type = user_type;
    this.status = status;
    this.remember_token = remember_token;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.resignation_date = resignation_date;
    this.appointment_date = appointment_date;
    this.other_document = other_document;
  }
}

module.exports = {
  Users: Users
};
