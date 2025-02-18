
export const validation = (values, masterData) => {
    const errors = {};
  
    const isValidName = (name) => {
      if (!name) return false;
      return /^[A-Za-z\s'-]{2,50}$/.test(name.trim());
    };
  
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^(?:\+91)?[6-9]\d{9}$/.test(phone);
    const isValidIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
    const isValidZipCode = (zip) => /^\d{6}$/.test(zip);
    const isValidBankAccount = (acc) => /^\d{9,18}$/.test(acc);
    const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  
    // Required fields validation
    const requiredFields = [
      "name", "email", "phone", "designation_id", "department_id",
      "gender", "date_of_birth", "address", "city", "state",
      "zip_code", "country", "employee_code", "employment_type_id",
      "joining_date", "salary", "bank_account_number", "ifsc_code",
      "emergency_contact"
    ];
  
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "This field is required";
      }
    });
  
    if (values.name) {
      console.log("Name value:", values.name);
      console.log("Is valid name:", isValidName(values.name));
    }
  
    // Field-specific validations
    if (values.name && !isValidName(values.name)) {
      errors.name = "Name should only contain alphabets, spaces, hyphens, or apostrophes and be 2-50 characters long.";
    }
  
    if (values.email && !isValidEmail(values.email)) {
      errors.email = "Invalid email format";
    }
  
    if (values.phone && !isValidPhone(values.phone)) {
      errors.phone = "Invalid phone number format";
    }
  
    if (values.gender && !["1", "2", "3"].includes(String(values.gender))) {
      errors.gender = "Invalid gender selection";
    }
  
    const today = new Date().toISOString().split("T")[0]; 
  
    if (values.date_of_birth) {
      if (!isValidDate(values.date_of_birth)) {
        errors.date_of_birth = "Invalid date format (YYYY-MM-DD required)";
      } else if (values.date_of_birth > today) {
        errors.date_of_birth = "Date of birth cannot be in the future";
      }
    }
  
    if (values.joining_date) {
      if (!isValidDate(values.joining_date)) {
        errors.joining_date = "Invalid date format (YYYY-MM-DD required)";
      } else if (values.joining_date > today) {
        errors.joining_date = "Joining date cannot be in the future";
      }
    }
  
    if (values.zip_code && !isValidZipCode(values.zip_code)) {
      errors.zip_code = "Zip code must be exactly 6 digits";
    }
  
    if (values.salary && (isNaN(values.salary) || values.salary < 0)) {
      errors.salary = "Salary must be a positive number";
    }
  
    if (values.bank_account_number && !isValidBankAccount(values.bank_account_number)) {
      errors.bank_account_number = "Invalid bank account number (9-18 digits required)";
    }
  
    if (values.ifsc_code && !isValidIFSC(values.ifsc_code)) {
      errors.ifsc_code = "Invalid IFSC code format";
    }
  
    if (values.emergency_contact && !isValidPhone(values.emergency_contact)) {
      errors.emergency_contact = "Invalid emergency contact format";
    }
  
    // Profile picture validation with better null checking
    if (values.profile_picture && typeof values.profile_picture !== "string") {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
      const fileName = values.profile_picture.name?.toLowerCase() || '';
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
  
      // Check MIME type
      if (!allowedFormats.includes(values.profile_picture.type)) {
        errors.profile_picture = "Invalid file format (JPEG, PNG, JPG only)";
      }
  
      // Check file extension
      if (!allowedExtensions.some((ext) => fileName.endsWith(ext))) {
        errors.profile_picture = "Invalid file extension (JPEG, PNG, JPG only)";
      }
  
      // Check file size (2MB max)
      if (values.profile_picture.size > 2 * 1024 * 1024) {
        errors.profile_picture = "File size must be less than 2MB";
      }
    }
  
    // Master data validation with proper null checking
    if (
      masterData?.employmentTypes &&
      values.employment_type_id &&
      !masterData.employmentTypes.some((type) => type.id === values.employment_type_id)
    ) {
      errors.employment_type_id = "Invalid employment type selection";
    }
  
    if (
      masterData?.designations &&
      values.designation_id &&
      !masterData.designations.some((desig) => desig.id === values.designation_id)
    ) {
      errors.designation_id = "Invalid designation selection";
    }
  
    if (
      masterData?.departments &&
      values.department_id &&
      !masterData.departments.some((dept) => dept.id === values.department_id)
    ) {
      errors.department_id = "Invalid department selection";
    }
  
    return errors;
  };
  
  // Improved validateField function with better error handling and debugging
  export const validateField = (field, values, masterData) => {
    // Debug logging for specific field validation
    if (field === 'name' && values.name !== undefined) {
      console.log(`Validating name: "${values.name}"`);
    }
    
    const errors = validation(values, masterData);
    return errors[field];
  };