class ResetAdminAccounts
  def self.process
    new.process
  end

  def process
    delete_fake_admin_accounts
    create_or_update_admins
  end

  private

  def delete_fake_admin_accounts
    User.where("email LIKE ?", "%+%").destroy_all
  end

  def create_or_update_admins
    admin_emails = %w[dh@trendiamo.com tds@trendiamo.com alena@frekkls.com dw@trendiamo.com]
    admin_emails.each do |admin_email|
      admin_user = User.find_by(email: admin_email)
      admin_user.update!(admin: true, account: nil)
    end
  end
end
