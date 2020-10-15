class PasswordResets {
    constructor(
        id,
        email,
        token,
        created_at
    ){
        this.id = id;
        this.email = email;
        this.token = token;
        this.created_at = created_at;

    }
}

module.exports = {
    PasswordResets: PasswordResets
  };