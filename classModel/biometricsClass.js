class Biometrics {
    constructor(
        biometric_id,
        file_name,
        month,
        year,
        branch_id,
        status,
        created_at,
        updated_at
    ) {
        this.biometric_id = biometric_id,
        this.file_name = file_name,
        this.month = month,
        this.year = year,
        this.branch_id = branch_id,
        this.status = status,
        this.created_at = created_at,
        this.updated_at = updated_at
    }
}

module.exports = {
    Biometrics: Biometrics
};